import { cn } from "@/lib/utils";

type BadgeVariant = "primary" | "accent" | "neutral" | "success" | "warning";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary dark:bg-primary/20 dark:text-violet-300",
  accent:  "bg-accent-light text-accent-dark dark:bg-pink-900/30 dark:text-pink-300",
  neutral: "bg-surface-3 text-body dark:bg-surface-3 dark:text-muted",
  success: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
