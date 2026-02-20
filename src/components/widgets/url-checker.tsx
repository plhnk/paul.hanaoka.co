import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useFathomEvent } from '@/hooks/useFathom';
import { cn } from '@/lib/utils';
import { extractImageUrls } from '@/lib/utils';

interface UrlResult {
  url: string;
  status?: number;
  finalUrl?: string;
  redirectCode?: number;
}

interface UrlCheckError extends UrlResult {
  error: string | undefined;
}

const UrlChecker: React.FC<{ className?: string }> = ({ className }) => {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [successful, setSuccessful] = useState<UrlResult[]>([]);
  const [errors, setErrors] = useState<UrlCheckError[]>([]);
  const [duplicatesRemoved, setDuplicatesRemoved] = useState(0);
  const [duplicateUrls, setDuplicateUrls] = useState<string[]>([]);
  const [urlList, setUrlList] = useState<string[]>([]);
  const [showBaseUrlInput, setShowBaseUrlInput] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [baseUrlUsed, setBaseUrlUsed] = useState(false);
  const [showUrlError, setShowUrlError] = useState(false);
  const [activeTab, setActiveTab] = useState<'successful' | 'broken'>('broken');
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [hasResults, setHasResults] = useState(false);

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

  const baseUrlValidationTimer = useRef<number | null>(null);

  useEffect(() => {
    if (baseUrlValidationTimer.current !== null) {
      window.clearTimeout(baseUrlValidationTimer.current);
    }

    if (baseUrl) {
      baseUrlValidationTimer.current = window.setTimeout(() => {
        setShowUrlError(!isValidUrl(baseUrl));
      }, 300);
    } else {
      setShowUrlError(false);
    }

    return () => {
      if (baseUrlValidationTimer.current !== null) {
        window.clearTimeout(baseUrlValidationTimer.current);
      }
    };
  }, [baseUrl]);

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const resolveUrl = (url: string, base: string): string => {
    if (isValidUrl(url)) return url;

    const baseUrlObj = new URL(base);
    baseUrlObj.pathname = baseUrlObj.pathname.replace(/\/?$/, '/');
    return new URL(url, baseUrlObj).toString();
  };

  const processUrls = (urls: string[]): string[] => {
    let baseUrlUsedFlag = false;
    const processed = urls.map((url) => {
      if (showBaseUrlInput && baseUrl && !isValidUrl(url)) {
        baseUrlUsedFlag = true;
        return new URL(url, baseUrl).toString();
      }
      return url;
    });
    setBaseUrlUsed(baseUrlUsedFlag);
    return processed;
  };

  const processInput = () => {
    let urls: string[];

    if (/<[a-z][\s\S]*>/i.test(input)) {
      urls = extractImageUrls(input);
      const urlCount = urls.length;
      setStatus(
        `Extracted ${urlCount} image URL${
          urlCount !== 1 ? 's' : ''
        } from HTML content.`,
      );
    } else {
      urls = input.split('\n').filter((u) => u.trim() !== '');
      const urlCount = urls.length;
      setStatus(
        `Processed ${urlCount} URL${
          urlCount !== 1 ? 's' : ''
        } from plain text input.`,
      );
    }

    return processUrls(removeDuplicates(urls));
  };

  const checkSingleUrl = async (url: string) => {
    try {
      const res = await fetch('/api/url-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Request failed');
      }
      const data = await res.json();
      return {
        success: data.ok === true,
        url,
        status: data.status,
        finalUrl: data.finalUrl,
        redirectCode: data.redirectCode,
        error: data.error,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        url,
        error: message,
      };
    }
  };

  const handlePreview = () => {
    trackEvent('URL Checker Preview');
    const urls = processInput();
    setUrlList(urls);
  };

  const handleCheck = async () => {
    trackEvent('URL Checker Run');
    setStatus('Checking URLs...');
    setProgress(0);
    setErrors([]);
    setSuccessful([]);
    setActiveTab('broken');

    const urls = urlList.length > 0 ? urlList : processInput();
    const total = urls.length;
    const successList: UrlResult[] = [];
    const errorList: UrlCheckError[] = [];

    for (let i = 0; i < total; i++) {
      const url = urls[i];
      setStatus(`Checking ${i + 1} of ${total}...`);
      const result = await checkSingleUrl(url);
      if (result.success) {
        successList.push({
          url,
          status: result.status,
          finalUrl: result.finalUrl,
          redirectCode: result.redirectCode,
        });
      } else {
        errorList.push({
          url,
          error: result.error || 'Invalid',
          status: result.status,
        });
      }
      setProgress(Math.round(((i + 1) / total) * 100));
    }

    setSuccessful(successList);
    setErrors(errorList);
    setStatus(`${successList.length} successful, ${errorList.length} broken.`);
    setHasResults(true);
  };

  const copyCurrentResults = () => {
    let text = '';
    if (activeTab === 'broken') {
      text = errors
        .map((err) => {
          const code = err.status || 'ERR';
          return `${err.url} - ${code}`;
        })
        .join('\n');
    } else {
      text = successful
        .map((result) => {
          if (result.redirectCode) {
            return `${result.url} - ${result.finalUrl} - ${result.redirectCode}`;
          }
          return result.url;
        })
        .join('\n');
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  };

  const handleReset = () => {
    setInput('');
    setSuccessful([]);
    setErrors([]);
    setHasResults(false);
    setStatus('');
    setProgress(0);
    setDuplicatesRemoved(0);
    setDuplicateUrls([]);
    setUrlList([]);
    setBaseUrl('');
    setShowBaseUrlInput(false);
    setBaseUrlUsed(false);
    setActiveTab('broken');
    setCopyFeedback(false);
  };

  return (
    <Card className={cn('bg-card/40', className)}>
      <CardHeader>
        <CardTitle>URL Checker</CardTitle>
        <CardDescription className="italic">
          Paste a bunch of links and the machine will report which ones appear
          broken. Relative paths can be resolved with a base URL.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {!hasResults ? (
          <>
            <Label className="small-caps">URLs</Label>
            <Textarea
              ref={textAreaRef}
              className="w-full text-text/90"
              placeholder="Paste or enter URLs (one per line)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={5}
            />
            <div className="flex items-center justify-between space-x-3 h-10">
              <div className="flex items-center gap-2">
                <Switch
                  id="base-url-switch"
                  checked={showBaseUrlInput}
                  onCheckedChange={setShowBaseUrlInput}
                />
                <Label
                  htmlFor="base-url-switch"
                  className="text-nowrap text-text/80"
                >
                  Base URL for relative paths
                </Label>
              </div>
              {showBaseUrlInput && (
                <Input
                  type="url"
                  className="text-text/90"
                  placeholder="Enter base URL"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                />
              )}
            </div>
            {showBaseUrlInput && showUrlError && baseUrl !== '' && (
              <p className="text-red-500 text-sm">Please enter a valid URL</p>
            )}
            {(duplicatesRemoved > 0 || status) && (
              <div className="flex items-center">
                {duplicatesRemoved > 0 && (
                  <Popover>
                    <PopoverTrigger asChild onClick={() => setUrlList(urlList)}>
                      <Button
                        variant="ghost"
                        className={status ? 'w-1/2' : 'w-full'}
                      >
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
            )}
          </>
        ) : (
          <>
            <div className="flex gap-2 border-b border-card/50">
              <button
                onClick={() => setActiveTab('broken')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'broken'
                    ? 'text-red-400 border-b-2 border-red-500'
                    : 'text-text/60 hover:text-text/80'
                }`}
              >
                Broken ({errors.length})
              </button>
              <button
                onClick={() => setActiveTab('successful')}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === 'successful'
                    ? 'text-green-400 border-b-2 border-green-500'
                    : 'text-text/60 hover:text-text/80'
                }`}
              >
                Successful ({successful.length})
              </button>
            </div>

            {activeTab === 'broken' && errors.length > 0 && (
              <Alert
                variant="destructive"
                className="rounded-md p-3 font-mono text-sm w-full border-red-500 bg-red-500/5 text-red-100"
              >
                <AlertTitle className="sr-only">Broken URLs</AlertTitle>
                <AlertDescription>
                  <ul className="list-none space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-xs">
                        {error.url} - {error.status || 'ERR'}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {activeTab === 'broken' && errors.length === 0 && (
              <p className="text-text/60 text-sm italic">All URLs passed!</p>
            )}

            {activeTab === 'successful' && successful.length > 0 && (
              <Alert className="rounded-md p-3 font-mono text-sm w-full border-green-500/30 bg-green-500/5">
                <AlertTitle className="sr-only">Successful URLs</AlertTitle>
                <AlertDescription>
                  <ul className="list-none space-y-1">
                    {successful.map((result, index) => (
                      <li
                        key={index}
                        className="text-xs text-text/80 break-all"
                      >
                        {result.redirectCode
                          ? `${result.url} - ${result.finalUrl} - ${result.redirectCode}`
                          : result.url}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {activeTab === 'successful' && successful.length === 0 && (
              <p className="text-text/60 text-sm italic">
                No successful URLs to display.
              </p>
            )}
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:pt-0 items-start w-full">
        <div className="flex w-full gap-2 mb-1">
          {!hasResults ? (
            <Button
              onClick={handleCheck}
              variant="secondary"
              className="w-full"
              disabled={isInputEmpty}
            >
              Check URLs
            </Button>
          ) : (
            <>
              <Button
                onClick={handleReset}
                variant="ghost"
                className="w-1/2"
              >
                Reset
              </Button>
              <Button
                onClick={copyCurrentResults}
                variant="secondary"
                className="w-1/2"
              >
                {copyFeedback ? '✓ Copied' : 'Copy'}
              </Button>
            </>
          )}
        </div>
        {progress > 0 && <Progress value={progress} className="w-full mt-4" />}
      </CardFooter>
    </Card>
  );
};

export default UrlChecker;
