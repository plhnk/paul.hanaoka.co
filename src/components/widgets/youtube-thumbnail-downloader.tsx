'use client';

import React, { useState } from 'react';
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

const YouTubeThumbnailDownloader: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [channelUrl, setChannelUrl] = useState('');
  const [includeOcr, setIncludeOcr] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { trackEvent } = useFathomEvent();

  const isInputEmpty = channelUrl.trim() === '';

  const handleExport = async () => {
    setError(null);
    setStatus('Preparing export...');
    setLoading(true);
    trackEvent('YouTube Channel Export Click');

    try {
      const res = await fetch('/api/youtube-channel-export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelUrl: channelUrl.trim(),
          includeOcr,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const message =
          data?.message || `Export failed (${res.status})`;
        setError(message);
        setStatus('');
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition');
      const filenameMatch = disposition?.match(/filename="?([^";]+)"?/);
      const filename =
        filenameMatch?.[1]?.trim() || 'youtube-channel-export.zip';

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus('Export downloaded successfully.');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Export failed. Try again.';
      setError(message);
      setStatus('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className={cn('bg-card/40', className)}>
      <CardHeader>
        <CardTitle>YouTube channel thumbnail metadata</CardTitle>
        <CardDescription className="italic">
          Paste a YouTube channel URL to export a zip containing metadata.json
          with video titles, thumbnail URLs, view counts, and durations.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label className="small-caps">Channel URL</Label>
        <Input
          type="url"
          className="w-full text-text/90"
          placeholder="https://www.youtube.com/@ChannelHandle/videos"
          value={channelUrl}
          onChange={(e) => setChannelUrl(e.target.value)}
          disabled={loading}
        />
        <div className="flex items-center gap-2">
          <Switch
            id="youtube-ocr-switch"
            checked={includeOcr}
            onCheckedChange={setIncludeOcr}
            disabled={loading}
          />
          <Label
            htmlFor="youtube-ocr-switch"
            className="text-nowrap text-text/80"
          >
            Include OCR of thumbnails (slower, first 20 videos)
          </Label>
        </div>
        {status && (
          <p className="text-right text-sm text-text/70">{status}</p>
        )}
        {error && (
          <Alert
            variant="destructive"
            className="rounded-md p-3 font-mono text-sm w-full border-red-500 bg-red-500/5 text-red-100"
          >
            <AlertTitle className="small-caps text-red-500 font-bold tracking-wider">
              Export failed
            </AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:pt-0 items-start w-full">
        <Button
          onClick={handleExport}
          variant="secondary"
          className="w-full"
          disabled={isInputEmpty || loading}
        >
          {loading ? 'Exporting…' : 'Export zip'}
        </Button>
        {loading && (
          <Progress value={66} className="w-full mt-4 animate-pulse" />
        )}
      </CardFooter>
    </Card>
  );
};

export default YouTubeThumbnailDownloader;
