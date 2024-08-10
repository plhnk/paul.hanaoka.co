import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ComponentProps, useId } from 'react';

interface MaskedImageProps {
  svgPath: string;
  imageSrc: string;
  className?: string;
  width: string;
  height: string;
  variant: 'mask' | 'clip';
  imagePosition?: string;
  maskPosition?: string;
  style?: React.CSSProperties;
}

const MaskedImage: React.FC<MaskedImageProps & ComponentProps<'div'>> = ({
  svgPath,
  imageSrc,
  className,
  width,
  height,
  variant,
  style,
  imagePosition = 'center',
  maskPosition = 'center',
  ...rest
}) => {
  const clipPathId = useId();

  const widthNum = parseInt(width, 10);
  const heightNum = parseInt(height, 10);

  const maskOrClipStyle =
    variant === 'mask'
      ? {
          WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            svgPath
          )}")`,
          maskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(
            svgPath
          )}")`,
          WebkitMaskSize: 'cover',
          maskSize: 'cover',
          WebkitMaskPosition: maskPosition,
          maskPosition: maskPosition,
        }
      : {
          clipPath: `url(#${clipPathId})`,
        };

  return (
    <div
      {...rest}
      className={cn('relative overflow-hidden', className)}
      style={{
        width,
        height,
        ...maskOrClipStyle,
        ...style,
      }}
    >
      {variant === 'clip' && (
        <svg
          className="absolute"
          width="100%"
          height="100%"
          viewBox={`0 0 ${widthNum} ${heightNum}`}
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
              <path
                d={svgPath}
                transform={`scale(${widthNum / 100}, ${heightNum / 120})`}
              />
            </clipPath>
          </defs>
        </svg>
      )}
      <Image
        src={imageSrc}
        alt="Masked or Clipped Image"
        layout="fill"
        objectFit="cover"
        objectPosition={imagePosition}
      />
    </div>
  );
};

export default MaskedImage;
