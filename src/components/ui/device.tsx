import React, { useState } from 'react';
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

  const Toolbar = ({ isDialogOpen }: { isDialogOpen: boolean }) => (
    <div className="flex justify-between items-center rounded-t-lg p-1 pb-0">
      <div className="flex ml-1">
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 m-0.5 bg-text/20 hover:bg-green-500 rounded-full"></div>
      </div>
      {title && <div className="text-sm text-text/60">{title}</div>}
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

  const DeviceContent = () => (
    <div className="p-0.5">
      {variant === 'default' && (
        <Image
          src={beforeSrc}
          alt={beforeAlt}
          width={width}
          height={height}
          className={imgStyle}
        />
      )}

      {variant === 'slider' && (
        <div className="relative w-full h-full">
          <Image
            src={beforeSrc}
            alt={beforeAlt}
            width={width}
            height={height}
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
          />
          {afterSrc && afterAlt && (
            <Image
              src={afterSrc}
              alt={afterAlt}
              width={width}
              height={height}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
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
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value="before">Before</TabsTrigger>
            <TabsTrigger value="after">After</TabsTrigger>
          </TabsList>
          <TabsContent value="before">
            <Image
              src={beforeSrc}
              alt={beforeAlt}
              width={width}
              height={height}
              className="w-full h-full object-cover"
            />
          </TabsContent>
          {afterSrc && afterAlt && (
            <TabsContent value="after">
              <Image
                src={afterSrc}
                alt={afterAlt}
                width={width}
                height={height}
                className="w-full h-full object-cover"
              />
            </TabsContent>
          )}
        </Tabs>
      )}
    </div>
  );

  return (
    <Dialog onOpenChange={setIsDialogOpen}>
      <div className={cn('relative', className, browserStyle)}>
        {toolbar && <Toolbar isDialogOpen={false} />}
        <DeviceContent />
      </div>
      <DialogOverlay className="bg-black/50 fixed inset-0 z-40" />
      <DialogContent
        hideDefaultClose
        className={cn(
          'max-w-[95vw] w-max max-h-[95vh] h-auto p-0 overflow-auto border-none gap-0',
          browserStyle
        )}
      >
        {toolbar && <Toolbar isDialogOpen={true} />}
        <DeviceContent />
      </DialogContent>
    </Dialog>
  );
};

export default Device;
