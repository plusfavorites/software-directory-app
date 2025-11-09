import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

type ButtonProps = {
  asChild?: boolean;
  variant?: 'default' | 'ghost';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition focus:outline-none focus-visible:ring-2 focus-visible:ring-hippo focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-60',
          variant === 'default'
            ? 'bg-hippo text-white hover:bg-hippo-dark'
            : 'bg-transparent text-slate-200 hover:bg-slate-800',
          className
        )}
        ref={ref as any}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
