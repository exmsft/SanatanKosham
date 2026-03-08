import Link from "next/link";

interface CardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ href, className = "", children }: CardProps) {
  const base = `sk-card ${className}`;
  if (href) {
    return (
      <Link href={href} className={base} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
        {children}
      </Link>
    );
  }
  return <div className={base}>{children}</div>;
}
