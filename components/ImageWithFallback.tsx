'use client';

import clsx from 'clsx';
import Image, { ImageProps } from 'next/image';
import React, { useState } from 'react';
import { forwardRef } from 'react';

interface ImageWithFallbackAttributes extends ImageProps {
  fallbackSrc: string;
}

export const ImageWithFallback = forwardRef<HTMLImageElement, ImageWithFallbackAttributes>(
  ({ src, alt, fallbackSrc, ...rest }, ref) => {
    if (!src && !fallbackSrc)
      throw new Error('ImageWithFallback requires an src or fallbackSrc prop!');

    const [imgSrc, setImgSrc] = useState(src ?? fallbackSrc);

    return (
      <Image
        {...rest}
        src={imgSrc}
        alt={alt ?? ''}
        className={clsx(rest.className)}
        onError={() => {
          setImgSrc(fallbackSrc);
        }}
        ref={ref}
      />
    );
  }
);

ImageWithFallback.displayName = 'ImageWithFallback';
