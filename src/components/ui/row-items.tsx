import { cn } from "@/utils/libs/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function RowItems({ children, className }: Props) {
  return (
    <div className={cn("flex items-center gap-1", className)}>{children}</div>
  );
}
