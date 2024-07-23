import React, { useState, ReactNode } from 'react';
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
import { cn } from '@/lib/utils';
import { Minimize2, Maximize2 } from 'lucide-react';

interface DeviceProps {
  beforeSrc: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt?: string;
  beforeVideo?: string;
  afterVideo?: string;
  title?: string;
  width: number;
  height: number;
  className?: string;
  variant?: 'default' | 'slider' | 'tabs';
  toolbar?: boolean;
}

const Device: React.FC<DeviceProps> = ({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeVideo,
  afterVideo,
  width,
  height,
  title,
  className,
  variant = 'default',
  toolbar = true,
}) => {
  const [sliderValue, setSliderValue] = useState(50);
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('after');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'before' | 'after');
  };

  const imgStyle = 'rounded-md';
  const browserStyle =
    'bg-card rounded-lg outline outline-1 outline-text/20 -outline-offset-1';

  const Toolbar = ({
    isDialogOpen,
    tabsList,
  }: {
    isDialogOpen: boolean;
    tabsList?: React.ReactNode;
  }) => (
    <div className="flex justify-between items-center rounded-t-lg p-1 pb-0">
      <div className="flex ml-1">
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-green-500 rounded-full"></div>
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

  const renderMedia = (src: string, alt: string, videoSrc?: string) => {
    return videoSrc ? (
      <video
        width={width}
        height={height}
        controls
        poster={src}
        className={imgStyle}
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
      />
    );
  };

  const DeviceContent = () => (
    <div className="p-0.5">
      {variant === 'default' && renderMedia(beforeSrc, beforeAlt, beforeVideo)}

      {variant === 'slider' && (
        <div className="relative w-full h-full">
          {renderMedia(beforeSrc, beforeAlt, beforeVideo)}
          {afterSrc && afterAlt && afterVideo && (
            <video
              width={width}
              height={height}
              controls
              poster={afterSrc}
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
            >
              <source src={afterVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="absolute bottom-2 left-1/2 transform -translate-x-1/2"
          />
        </div>
      )}

      {variant === 'tabs' && (
        <>
          <TabsContent value="before">
            {renderMedia(beforeSrc, beforeAlt, beforeVideo)}
          </TabsContent>
          {afterSrc && afterAlt && afterVideo && (
            <TabsContent value="after">
              {renderMedia(afterSrc, afterAlt, afterVideo)}
            </TabsContent>
          )}
        </>
      )}
    </div>
  );

  const TabsWrapper: React.FC<{
    isDialogOpen: boolean;
    children: ReactNode;
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
      <div className={cn('relative', className, browserStyle)}>{children}</div>
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
                  <TabsList className="mx-auto w-full">
                    <TabsTrigger value="before">Before</TabsTrigger>
                    <TabsTrigger value="after">After</TabsTrigger>
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
