'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { useFathomEvent } from '@/hooks/useFathom';
import { cn } from '@/lib/utils';

interface PngToHtmlTableProps {
  className?: string;
}

const DEFAULT_MAX_CELLS = 50000;

function getFilenameFromDisposition(header: string | null): string {
  const match = header?.match(/filename="?([^";]+)"?/i);
  return match?.[1]?.trim() || 'image-table.html';
}

export default function PngToHtmlTable({
  className,
}: PngToHtmlTableProps) {
  const [file, setFile] = useState<File | null>(null);
  const [cellSize, setCellSize] = useState('10');
  const [transparency, setTransparency] = useState<'preserve' | 'flatten'>(
    'preserve'
  );
  const [flattenBg, setFlattenBg] = useState('#ffffff');
  const [maxCells, setMaxCells] = useState(String(DEFAULT_MAX_CELLS));
  const [force, setForce] = useState(false);
  const [fragment, setFragment] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number } | null>(
    null
  );
  const { trackEvent } = useFathomEvent();

  const maxCellsNumber = Number.parseInt(maxCells, 10);
  const totalCells = dimensions ? dimensions.width * dimensions.height : null;

  useEffect(() => {
    setWarning(null);

    if (!file) {
      setDimensions(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      setDimensions({ width: image.width, height: image.height });
      URL.revokeObjectURL(objectUrl);
    };

    image.onerror = () => {
      setDimensions(null);
      setWarning('Could not inspect the image dimensions in the browser.');
      URL.revokeObjectURL(objectUrl);
    };

    image.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (!dimensions || !Number.isFinite(maxCellsNumber) || maxCellsNumber <= 0) {
      return;
    }

    const cells = dimensions.width * dimensions.height;

    if (cells > maxCellsNumber && !force) {
      setWarning(
        `This image is ${dimensions.width}x${dimensions.height} (${cells} cells), which exceeds the current max of ${maxCellsNumber}. Enable force to continue.`
      );
      return;
    }

    if (cells >= maxCellsNumber * 0.8) {
      setWarning(
        `Large image detected: ${dimensions.width}x${dimensions.height} will generate ${cells} table cells.`
      );
      return;
    }

    setWarning(null);
  }, [dimensions, force, maxCellsNumber]);

  const handleSubmit = async () => {
    if (!file) {
      setError('Choose a PNG file first.');
      return;
    }

    if (file.type && file.type !== 'image/png') {
      setError('Only PNG files are supported.');
      return;
    }

    setLoading(true);
    setError(null);
    setStatus('Converting PNG to HTML table...');
    trackEvent('PNG To HTML Table Convert');

    try {
      const formData = new FormData();
      formData.set('file', file);
      formData.set('cellSize', cellSize);
      formData.set('transparency', transparency);
      formData.set('flattenBg', flattenBg);
      formData.set('maxCells', maxCells);
      formData.set('force', String(force));
      formData.set('fragment', String(fragment));

      const response = await fetch('/api/png-to-table', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data?.message || `Conversion failed (${response.status})`);
      }

      const blob = await response.blob();
      const filename = getFilenameFromDisposition(
        response.headers.get('Content-Disposition')
      );
      const serverWarning = response.headers.get('X-Png-To-Table-Warning');

      if (serverWarning) {
        setWarning(serverWarning);
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('HTML downloaded successfully.');
    } catch (err) {
      setStatus('');
      setError(err instanceof Error ? err.message : 'Conversion failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn('bg-card/40', className)}>
      <CardHeader>
        <CardTitle>PNG to HTML table</CardTitle>
        <CardDescription className="italic">
          Upload a PNG and convert each pixel into a table cell with matching
          color output.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label className="small-caps">PNG file</Label>
          <Input
            type="file"
            accept="image/png"
            onChange={(event) => {
              setFile(event.target.files?.[0] ?? null);
              setError(null);
              setStatus('');
            }}
            disabled={loading}
          />
        </div>
        {dimensions && (
          <p className="text-sm text-text/70 font-mono">
            {dimensions.width} x {dimensions.height}
            {typeof totalCells === 'number' ? ` · ${totalCells} cells` : ''}
          </p>
        )}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="small-caps">Cell size</Label>
            <Input
              type="number"
              min="1"
              step="1"
              value={cellSize}
              onChange={(event) => setCellSize(event.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="small-caps">Max cells</Label>
            <Input
              type="number"
              min="1"
              step="1"
              value={maxCells}
              onChange={(event) => setMaxCells(event.target.value)}
              disabled={loading}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="small-caps">Transparency</Label>
            <div className="flex items-center justify-between rounded-md border border-element/30 bg-background px-3 py-2">
              <span className="text-sm text-text/80">
                {transparency === 'preserve'
                  ? 'Preserve alpha as rgba()'
                  : 'Flatten alpha into rgb()'}
              </span>
              <Switch
                checked={transparency === 'flatten'}
                onCheckedChange={(checked) =>
                  setTransparency(checked ? 'flatten' : 'preserve')
                }
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="small-caps">Flatten background</Label>
            <Input
              type="text"
              inputMode="text"
              value={flattenBg}
              onChange={(event) => setFlattenBg(event.target.value)}
              disabled={loading || transparency !== 'flatten'}
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between rounded-md border border-element/30 bg-background px-3 py-2">
            <Label htmlFor="png-force" className="text-text/80">
              Force large images
            </Label>
            <Switch
              id="png-force"
              checked={force}
              onCheckedChange={setForce}
              disabled={loading}
            />
          </div>
          <div className="flex items-center justify-between rounded-md border border-element/30 bg-background px-3 py-2">
            <Label htmlFor="png-fragment" className="text-text/80">
              Output fragment only
            </Label>
            <Switch
              id="png-fragment"
              checked={fragment}
              onCheckedChange={setFragment}
              disabled={loading}
            />
          </div>
        </div>
        {status && <p className="text-right text-sm text-text/70">{status}</p>}
        {warning && (
          <Alert className="border-amber-500/40 bg-amber-500/5 text-amber-200">
            <AlertTitle className="small-caps text-amber-300">
              Warning
            </AlertTitle>
            <AlertDescription>{warning}</AlertDescription>
          </Alert>
        )}
        {error && (
          <Alert
            variant="destructive"
            className="rounded-md p-3 font-mono text-sm w-full border-red-500 bg-red-500/5 text-red-100"
          >
            <AlertTitle className="small-caps text-red-500 font-bold tracking-wider">
              Conversion failed
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:pt-0 items-start w-full">
        <Button
          onClick={handleSubmit}
          variant="secondary"
          className="w-full"
          disabled={!file || loading}
        >
          {loading ? 'Converting…' : 'Convert and download HTML'}
        </Button>
        {loading && <Progress value={66} className="w-full mt-4 animate-pulse" />}
      </CardFooter>
    </Card>
  );
}
