import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <div 
      onClick={onClick}
      className={twMerge(clsx("relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl", className))}
    >
      {children}
    </div>
  );
}
