interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`sk-badge ${className}`}>{children}</span>;
}
