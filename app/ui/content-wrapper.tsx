import { ReactNode } from "react";

export default function Wrapper({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex gap-4 bg-background p-8 rounded-md border ${className}`}
    >
      {children}
    </div>
  );
}
