import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size    = "sm" | "md" | "lg";

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button";
  href?: never;
}

interface ButtonAsAnchor extends ButtonBaseProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  as: "a";
  href: string;
}

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md",
  secondary:
    "bg-accent text-white hover:bg-accent-dark shadow-sm hover:shadow-md",
  ghost:
    "text-primary hover:bg-primary-light dark:hover:bg-primary/10",
  outline:
    "border border-primary text-primary hover:bg-primary-light dark:hover:bg-primary/10",
};

const sizeStyles: Record<Size, string> = {
  sm:  "px-4 py-2 text-sm rounded-lg",
  md:  "px-6 py-3 text-base rounded-xl",
  lg:  "px-8 py-4 text-lg rounded-xl",
};

const base =
  "inline-flex items-center gap-2 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className, ...rest } = props;
  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  if (props.as === "a") {
    const anchorProps = rest as ButtonAsAnchor;
    delete (anchorProps as { as?: unknown }).as;
    return <a className={classes} {...anchorProps} />;
  }

  const buttonProps = rest as ButtonAsButton;
  delete (buttonProps as { as?: unknown }).as;
  return <button className={classes} {...buttonProps} />;
}
