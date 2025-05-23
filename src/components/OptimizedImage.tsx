import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

export default function OptimizedImage({ src, alt, className = '', width = 200, height = 200 }: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [error, setError] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc('/images/default-avatar.png'); // Fallback to a default image
    }
  };

  return (
    <div className={className}>
      <Image
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-cover rounded-full shadow-2xl"
        onError={handleError}
        unoptimized={src.startsWith('http')} // Skip optimization for external URLs
      />
    </div>
  );
} 