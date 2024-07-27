import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogOverlay,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, throttle } from '@/lib/utils';
import { Minimize2, Maximize2, MoveHorizontal } from 'lucide-react';

interface DeviceProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt?: string;
  beforeVideo?: string;
  afterVideo?: string;
  title?: string;
  caption?: string;
  width: number;
  height: number;
  className?: string;
  variant?: 'default' | 'slider' | 'tabs';
  toolbar?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  pauseTimeout?: number;
}

const Device: React.FC<DeviceProps> = ({
  beforeSrc,
  beforeLabel,
  afterLabel,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeVideo,
  afterVideo,
  caption,
  width,
  height,
  title,
  className,
  variant = 'default',
  toolbar = true,
  autoplay = false,
  loop = false,
  pauseTimeout = 20000,
}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const beforeVideoRef = useRef<HTMLVideoElement>(null);
  const afterVideoRef = useRef<HTMLVideoElement>(null);
  const pauseTimeoutRef = useRef<number | undefined>(undefined);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'before' | 'after');
  };

  const imgStyle = 'rounded-b-md';
  const browserStyle =
    'bg-card rounded-lg outline outline-1 outline-text/20 -outline-offset-1';
  const label =
    'small-caps font-mono text-xs px-2 py-1 m-2 text-text/90 rounded-sm bg-background/30 backdrop-blur-lg absolute bottom-0';

  const Toolbar = ({
    isDialogOpen,
    tabsList,
  }: {
    isDialogOpen: boolean;
    tabsList?: React.ReactNode;
  }) => (
    <div className="flex justify-between items-center rounded-t-lg p-1 pb-0 select-none">
      <div className="flex ml-1">
        <div className="w-2 h-2 m-0.5 bg-text/20  hover:bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:cursor-pointer hover:bg-green-500 rounded-full"></div>
      </div>
      {title && <div className="text-sm text-text/60">{title}</div>}
      {tabsList}
      {isDialogOpen ? (
        <DialogClose asChild>
          <Button
            className="w-6 h-6 p-1 text-text/60 hover:text-text hover:bg-card"
            variant="ghost"
          >
            <Minimize2 />
          </Button>
        </DialogClose>
      ) : (
        <DialogTrigger asChild>
          <Button
            className="w-6 h-6 p-1 text-text/60 hover:text-text hover:bg-card"
            variant="ghost"
          >
            <Maximize2 />
          </Button>
        </DialogTrigger>
      )}
    </div>
  );

  const renderMedia = (
    src: string,
    alt: string,
    videoSrc?: string,
    videoRef?: React.RefObject<HTMLVideoElement>
  ) => {
    return videoSrc ? (
      <video
        ref={videoRef}
        width={width}
        height={height}
        controls
        poster={src}
        className={imgStyle}
        autoPlay={autoplay}
        loop={loop}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={imgStyle}
        priority
      />
    );
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = throttle((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const newValue = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderValue(newValue);
    }
  }, 16);

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        beforeVideoRef.current?.pause();
        afterVideoRef.current?.pause();
      } else {
        if (autoplay) {
          beforeVideoRef.current?.play();
          afterVideoRef.current?.play();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [autoplay]);

  useEffect(() => {
    if (pauseTimeout > 0) {
      pauseTimeoutRef.current = window.setTimeout(() => {
        beforeVideoRef.current?.pause();
        afterVideoRef.current?.pause();
      }, pauseTimeout);

      return () => {
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
      };
    }
  }, [pauseTimeout]);

  const DeviceContent = () => (
    <div className="p-0.5 relative select-none">
      {variant === 'default' &&
        renderMedia(beforeSrc, beforeAlt, beforeVideo, beforeVideoRef)}

      {variant === 'slider' && (
        <div
          className="relative w-full h-full"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          ref={sliderRef}
        >
          {afterSrc && afterAlt && (
            <div
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${sliderValue}%)` }}
            >
              {renderMedia(afterSrc, afterAlt, afterVideo, afterVideoRef)}
            </div>
          )}
          {renderMedia(beforeSrc, beforeAlt, beforeVideo, beforeVideoRef)}
          <div className={label}>{beforeLabel ? beforeLabel : 'Before'}</div>
          <div className={cn(label, 'right-0')}>
            {afterLabel ? afterLabel : 'After'}
          </div>
          <div
            className={`absolute top-0 bottom-0 w-px bg-text/30 ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ left: `${sliderValue}%` }}
          >
            <div className="bg-text/30 outline outline-1 outline-text/50 p-2 rounded-full absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2">
              <MoveHorizontal className="text-background" strokeWidth="1" />
            </div>
          </div>
        </div>
      )}

      {variant === 'tabs' && (
        <>
          <TabsContent className="mt-0" value="before">
            {renderMedia(beforeSrc, beforeAlt, beforeVideo, beforeVideoRef)}
          </TabsContent>
          {afterSrc && afterAlt && (
            <TabsContent className="mt-0" value="after">
              {renderMedia(afterSrc, afterAlt, afterVideo, afterVideoRef)}
            </TabsContent>
          )}
        </>
      )}
    </div>
  );

  const TabsWrapper: React.FC<{
    isDialogOpen: boolean;
    children: React.ReactNode;
    className?: string;
    browserStyle: string;
  }> = ({ isDialogOpen, children, className, browserStyle }) => {
    return isDialogOpen ? (
      <DialogContent
        hideDefaultClose
        className={cn(
          'max-w-[95vw] w-max max-h-[95vh] h-auto p-0 overflow-auto border-none gap-0',
          browserStyle
        )}
      >
        {children}
      </DialogContent>
    ) : (
      <figure className={cn('relative', className, browserStyle)}>
        {children}
        {caption && (
          <figcaption className="absolute text-pretty mt-4 max-w-[70ch] text-text/70 italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  };

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <TabsWrapper
        isDialogOpen={isDialogOpen}
        className={className}
        browserStyle={browserStyle}
      >
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          {toolbar && (
            <Toolbar
              isDialogOpen={isDialogOpen}
              tabsList={
                variant === 'tabs' && (
                  <TabsList className="mx-auto py-0 h-auto w-full">
                    <TabsTrigger className="w-full" value="after">
                      {afterLabel ? afterLabel : 'After'}
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="before">
                      {beforeLabel ? beforeLabel : 'Before'}
                    </TabsTrigger>
                  </TabsList>
                )
              }
            />
          )}
          <DeviceContent />
        </Tabs>
      </TabsWrapper>
      {isDialogOpen && (
        <DialogOverlay className="bg-black/50 fixed inset-0 z-40" />
      )}
    </Dialog>
  );
};

export default Device;
