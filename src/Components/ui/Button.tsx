import React from "react";
import { Link } from "react-router-dom";


type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
    variant?: Variant;
    size?: Size;
    href?: string;
    to?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
};

const base =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap";

const sizeStyles: Record<Size, string> = {
    sm: "h-9 rounded-lg px-3.5 py-1.5 text-xs",
    md: "h-10 rounded-lg px-4 py-2 text-sm",
    lg: "h-12 rounded-xl px-6 py-3 text-base",
};

const styles: Record<Variant, string> = {
    primary:
        "border border-[#101828] bg-[linear-gradient(180deg,#111827_0%,#0f172a_100%)] text-white shadow-[0_12px_30px_rgba(15,23,42,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] hover:-translate-y-[1px] hover:shadow-[0_18px_38px_rgba(15,23,42,0.24),inset_0_1px_0_rgba(255,255,255,0.16)] focus:ring-[#2563eb]",
    secondary:
        "border border-[rgba(15,23,42,0.08)] bg-[rgba(255,255,255,0.82)] text-[#0f172a] shadow-[0_10px_24px_rgba(15,23,42,0.05),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-md hover:-translate-y-[1px] hover:bg-white focus:ring-[#2563eb]",
    ghost: "text-[#5b6472] hover:text-[#0f172a] hover:bg-[rgba(255,255,255,0.7)] focus:ring-[#2563eb]",
};

export default function Button({
    variant = "primary",
    size = "md",
    href,
    to,
    onClick,
    type = "button",
    disabled = false,
    children,
    className: extraClassName = "",
}: Props) {
    const className = [
        base,
        sizeStyles[size],
        styles[variant],
        disabled ? "opacity-60 cursor-not-allowed" : "",
        extraClassName,
    ]
        .filter(Boolean)
        .join(" ");

    // Internal navigation using React Router
    if (to) {
        return (
            <Link className={className} to={to}>
                {children}
            </Link>
        );
    }

    // External link
    if (href) {
        return (
            <a className={className} href={href} target="_blank" rel="noreferrer">
                {children}
            </a>
        );
    }

    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
}
