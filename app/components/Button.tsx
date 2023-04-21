import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...rest }, ref) => {
    return (
      <button
        className={clsx('rounded bg-lime-500 p-2 transition-colors hover:bg-lime-400', className)}
        type="button"
        ref={ref}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
