import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aether-primary focus-visible:ring-offset-2 focus-visible:ring-offset-aether-container-lowest disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-aether-primary/50 bg-aether-primary/15 text-aether-primary shadow-[0_0_20px_-6px_rgba(0,242,255,.5)] hover:bg-aether-primary/25",
        solid: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-white/15 bg-white/3 text-aether-on-surface hover:bg-white/7 hover:text-white",
        ghost:
          "text-aether-on-surface-variant hover:bg-white/5 hover:text-white",
      },
      size: {
        sm: "h-9 px-3",
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}
