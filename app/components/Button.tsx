import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export function Button({ className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx('rounded bg-lime-500 p-2', className)} {...rest}>
      {children}
    </button>
  );
}
