import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ src, alt, className = '', width = 200, height = 200 }: OptimizedImageProps) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  );
} 