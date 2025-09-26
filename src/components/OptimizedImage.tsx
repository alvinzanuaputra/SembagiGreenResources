import React, { useState, useRef, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
}) => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isInView, setIsInView] = useState<boolean>(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate WebP versions
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
  const avifSrc = src.replace(/\.(jpg|jpeg|png)$/i, ".avif");

  useEffect(() => {
    if (!priority) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1, rootMargin: "50px" }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return () => observer.disconnect();
    }
  }, [priority]);

  useEffect(() => {
    if (isInView && !imageLoaded) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setImageLoaded(true);
      };
      img.src = src;
    }
  }, [isInView, src, imageLoaded]);

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height }}
      />
    );
  }

  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        className={`transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
};

export default OptimizedImage;
