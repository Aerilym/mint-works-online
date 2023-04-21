import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, children, ...rest }, ref) => (
    <input className={clsx('rounded bg-lime-50 p-2', className)} ref={ref} {...rest}>
      {children}
    </input>
  )
);

Input.displayName = 'Input';
