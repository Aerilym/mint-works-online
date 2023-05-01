import clsx from 'clsx';
import Image from 'next/image';
import { forwardRef, ImgHTMLAttributes } from 'react';

export const Avatar = forwardRef<HTMLImageElement, ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, alt, src }, ref) => {
    return (
      <div className="min-[]: h-full">
        <div className="relative aspect-square  h-full pt-[100%]">
          <Image
            src={src ?? '/images/default-avatar.png'}
            alt={alt ?? 'Avatar'}
            ref={ref}
            fill
            className={clsx(
              'left-0 top-0 aspect-square h-full w-full rounded-full object-cover',
              className
            )}
          />
        </div>
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
