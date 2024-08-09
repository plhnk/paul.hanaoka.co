import Image from 'next/image';

interface MaskedImageProps {
  svgPath: string;
  imageSrc: string;
  width: string;
  height: string;
}

const MaskedImage: React.FC<MaskedImageProps> = ({ svgPath, imageSrc, width, height }) => {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width,
        height,
        WebkitMaskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPath)}")`,
        maskImage: `url("data:image/svg+xml;utf8,${encodeURIComponent(svgPath)}")`,
        WebkitMaskSize: 'cover',
        maskSize: 'cover',
      }}
    >
      <Image src={imageSrc} alt="Masked Image" layout="fill" objectFit="cover" />
    </div>
  );
};

export default MaskedImage;