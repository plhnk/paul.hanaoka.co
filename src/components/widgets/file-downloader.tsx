import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useFathomEvent } from '@/hooks/useFathom';
import { cn } from '../../lib/utils';
import { extractImageUrls } from '@/lib/utils';

interface DownloadError {
  url: string;
  error: string | undefined;
}

const FileDownloader: React.FC<{ className?: string }> = ({ className }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<DownloadError[]>([]);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0);
  const [duplicateUrls, setDuplicateUrls] = useState<string[]>([]);
  const [filesDownloaded, setFilesDownloaded] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [urlList, setUrlList] = useState<string[]>([]);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { trackEvent } = useFathomEvent();

  const isInputEmpty = input.trim() === '';

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const removeDuplicates = (urls: string[]): string[] => {
    const uniqueUrls = new Set<string>();
    const duplicates: string[] = [];
    urls.forEach((url) => {
      if (uniqueUrls.has(url)) {
        duplicates.push(url);
      } else {
        uniqueUrls.add(url);
      }
    });
    setDuplicatesRemoved(duplicates.length);
    setDuplicateUrls(duplicates);
    return Array.from(uniqueUrls);
  };

  const downloadFile = async (url: string) => {
    try {
      const response = await fetch('/api/downloader', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Download failed');
      }

      const blob = await response.blob();
      const filename =
        response.headers.get('Content-Disposition')?.split('filename=')[1] ||
        'download';
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = filename.replace(/['"]/g, '');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(objectUrl), 100);

      return { success: true, url };
    } catch (error) {
      console.error(`Failed to download ${url}:`, error);
      return {
        success: false,
        url,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  };
  const processInput = () => {
    let urls: string[];

    if (/<[a-z][\s\S]*>/i.test(input)) {
      urls = extractImageUrls(input);
      const urlCount = urls.length;
      setStatus(
        `Extracted ${urlCount} image URL${
          urlCount !== 1 ? 's' : ''
        } from HTML content.`
      );
    } else {
      urls = input.split('\n').filter((url) => url.trim() !== '');
      const urlCount = urls.length;
      setStatus(
        `Processed ${urlCount} URL${
          urlCount !== 1 ? 's' : ''
        } from plain text input.`
      );
    }

    return removeDuplicates(urls);
  };
  const handlePreview = () => {
    trackEvent('Preview Download List Click');
    const urls = processInput();
    setUrlList(urls);
  };

  const handleDownload = async () => {
    trackEvent('File Downloader Click');
    setStatus('Preparing downloads...');
    setProgress(0);
    setErrors([]);
    setFilesDownloaded(0);

    const urls = urlList.length > 0 ? urlList : processInput();
    const totalUrls = urls.length;

    let successCount = 0;

    for (let i = 0; i < totalUrls; i++) {
      const url = urls[i];
      setStatus(`Downloading file ${i + 1} of ${totalUrls}...`);
      const result = await downloadFile(url);
      if (result.success) {
        successCount++;
      } else {
        setErrors((prev) => [
          ...prev,
          { url, error: result.error || 'Unknown error' },
        ]);
      }
      setProgress(Math.round(((i + 1) / totalUrls) * 100));
    }

    setFilesDownloaded(successCount);
    setStatus(`${successCount} files downloaded successfully.`);
  };

  return (
    <Card className={cn('bg-card/40', className)}>
      <CardHeader>
        <CardTitle>File Downloader</CardTitle>
        <CardDescription className="italic">
          Paste a list of file URLs or HTML containing image URLs. The Machine
          will automatically detect the input type and process accordingly.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pb-0 sm:pb-0">
        <Label className="small-caps">File URLs or HTML</Label>
        <Textarea
          ref={textAreaRef}
          className="w-full text-text/90"
          placeholder="Paste or enter file URLs or HTML"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
        />
        <div className="flex items-center">
          {duplicatesRemoved > 0 && (
            <Popover>
              <PopoverTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                <Button variant="ghost"  className={status ? 'w-1/2' : 'w-full'}>
                  {duplicatesRemoved} redundant URLs removed
                </Button>
              </PopoverTrigger>
              <PopoverContent
                asChild
                side="top"
                align="start"
                className="mb-8 p-0"
              >
                <Card className="bg-card/40 w-full backdrop-blur-lg border-card/90 outline outline-card/90 outline-1 shadow-elevate">
                  <CardContent>
                    <ul className="list-none pl-3 font-mono mt-2">
                      {duplicateUrls.map((url, index) => (
                        <li key={index} className="text-sm text-text/70">
                          {url}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          )}
          {status && (
            <p
              className={
                'text-right text-sm text-text/70 ' +
                (duplicatesRemoved > 0 ? 'w-1/2' : 'w-full')
              }
            >
              {status}
            </p>
          )}
        </div>
        {errors.length > 0 && (
          <Alert variant="destructive" className="rounded-md p-3 font-mono text-sm w-full mt-4 border-red-500 bg-red-500/5 text-red-100">
            <AlertTitle className='small-caps text-red-500 font-bold tracking-wider'>Errors occurred during download</AlertTitle>
            <AlertDescription>
              <ul className="list-none">
                {errors.map((error, index) => (
                  <li className='mt-2 font-normal' key={index}>
                    {error.error}: {error.url}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full">
        <div className="flex w-full gap-2 mb-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-1/2"
                variant="ghost"
                onClick={handlePreview}
                disabled={isInputEmpty}
              >
                Preview Download List
              </Button>
            </PopoverTrigger>
            <PopoverContent
              asChild
              side="top"
              align="start"
              className="w-80 mb-8 p-0"
            >
              <Card className="bg-card/40 w-full backdrop-blur-lg border-card/90 outline outline-card/90 outline-1 shadow-elevate">
                <CardHeader>
                  <CardTitle>Files that will be downloaded</CardTitle>
                  <CardDescription>
                    This is the list of files that will be downloaded &mdash;
                    duplicates have automatically been removed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-none pl-0">
                    {urlList.map((url, index) => (
                      <li key={index} className="text-sm mb-1 break-all">
                        {url}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </PopoverContent>
          </Popover>
          <Button
            onClick={handleDownload}
            variant="secondary"
            className="w-1/2"
            disabled={isInputEmpty}
          >
            Download Files
          </Button>
        </div>
        {progress > 0 && <Progress value={progress} className="w-full mt-4" />}
      </CardFooter>
    </Card>
  );
};

export default FileDownloader;
