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
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useFathomEvent } from '@/hooks/useFathom';

interface DownloadError {
  url: string;
  error: string;
}

const FileDownloader = () => {
  const [urls, setUrls] = useState('');
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState<DownloadError[]>([]);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0);
  const [duplicateUrls, setDuplicateUrls] = useState<string[]>([]);
  const [filesDownloaded, setFilesDownloaded] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { trackEvent } = useFathomEvent();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [urls]);

  const removeDuplicates = (urlList: string[]): string[] => {
    const uniqueUrls = new Set<string>();
    const duplicates: string[] = [];
    urlList.forEach((url) => {
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

  const handleDownload = async () => {
    trackEvent('File Downloader Click');
    setStatus('Preparing downloads...');
    setProgress(0);
    setErrors([]);
    setFilesDownloaded(0);
    let urlList = urls.split('\n').filter((url) => url.trim() !== '');
    urlList = removeDuplicates(urlList);
    const totalUrls = urlList.length;

    let successCount = 0;

    for (let i = 0; i < totalUrls; i++) {
      const url = urlList[i];
      setStatus(`Downloading file ${i + 1} of ${totalUrls}...`);
      const result = await downloadFile(url);
      if (result.success) {
        successCount++;
      } else {
        setErrors((prev) => [...prev, { url, error: result.error }]);
      }
      setProgress(Math.round(((i + 1) / totalUrls) * 100));
    }

    setFilesDownloaded(successCount);
    setStatus(`${successCount} files downloaded successfully.`);
  };

  return (
    <Card className="my-32 !col-start-2 !col-span-4 bg-card/40">
      <CardHeader>
        <CardTitle>File Downloader</CardTitle>
        <CardDescription>
          Pretty self-explanatory &mdash; paste in a bunch of URLs that lead to
          files, click download, and then check your default downloads folder.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Label>File URLs</Label>
        <Textarea
          ref={textAreaRef}
          className="w-full text-text/90"
          placeholder="Enter file URLs (one per line)"
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          rows={5}
        />
        {duplicatesRemoved > 0 && (
          <Collapsible className="w-full">
            <CollapsibleTrigger asChild onClick={() => setIsOpen(!isOpen)}>
              <Button variant="ghost" className="w-full flex justify-between">
                {duplicatesRemoved} redundant URLs removed
                {isOpen ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <ul className="list-none pl-3 font-mono mt-2">
                {duplicateUrls.map((url, index) => (
                  <li key={index} className="text-sm text-text/70">
                    {url}
                  </li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start w-full">
        <Button
          onClick={handleDownload}
          variant="secondary"
          className="w-full mb-4"
        >
          Download Files
        </Button>
        {status && <p className="mb-2 text-center w-full">{status}</p>}
        {progress > 0 && <Progress value={progress} className="w-full mb-4" />}
        {errors.length > 0 && (
          <Alert variant="destructive" className="w-full">
            <AlertTitle>Errors occurred during download:</AlertTitle>
            <AlertDescription>
              <ul className="list-none pl-3">
                {errors.map((error, index) => (
                  <li key={index}>
                    {error.url}: {error.error}
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}
      </CardFooter>
    </Card>
  );
};

export default FileDownloader;
