import clsx from 'clsx';
import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, children, ...rest }, ref) => (
    <input className={clsx('rounded border bg-lime-50 p-2', className)} ref={ref} {...rest}>
      {children}
    </input>
  )
);

Input.displayName = 'Input';
