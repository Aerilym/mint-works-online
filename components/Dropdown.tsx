'use client';
import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, useState } from 'react';

type DropdownProps = React.HTMLProps<HTMLDivElement> & DropdownButtonProps;

type DropdownButtonProps =
  | {
      buttonChildren: React.ReactNode;
    }
  | {
      buttonText: string;
    };

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ className, children, ...rest }, ref) => {
    const [expanded, setExpanded] = useState(false);

    const dropdownText = 'buttonText' in rest ? rest.buttonText : undefined;
    const buttonChildren = 'buttonChildren' in rest ? rest.buttonChildren : undefined;

    return (
      <div className={clsx('relative h-9 w-9', className)} ref={ref} {...rest}>
        {dropdownText && (
          <DropdownButton onClick={() => setExpanded(!expanded)}>{dropdownText}</DropdownButton>
        )}
        <div
          onClick={() => setExpanded(!expanded)}
          role="button"
          tabIndex={0}
          onKeyDown={() => setExpanded(!expanded)}
        >
          {buttonChildren}
        </div>
        {expanded && <DropdownMenu>{children}</DropdownMenu>}
      </div>
    );
  }
);

const DropdownButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
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

const DropdownMenu = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div
      className={clsx('absolute flex flex-col rounded border bg-lime-50 p-4', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </div>
  )
);

export const DropdownItem = forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  ({ className, children, ...rest }, ref) => (
    <div className={clsx('p-2', className)} ref={ref} {...rest}>
      {children}
    </div>
  )
);

DropdownButton.displayName = 'DropdownButton';
DropdownMenu.displayName = 'DropdownMenu';
DropdownItem.displayName = 'DropdownItem';

Dropdown.displayName = 'Dropdown';
