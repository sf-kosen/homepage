import React from "react";

type LandingSectionProps = {
    id: string;
    eyebrow: string;
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
};

export default function LandingSection({
    id,
    eyebrow,
    title,
    description,
    children,
    className = "",
}: LandingSectionProps) {
    return (
        <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
            <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                    <p className="font-display text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--accent)]">
                        {eyebrow}
                    </p>
                    <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--text-strong)] sm:text-4xl">
                        {title}
                    </h2>
                    {description ? (
                        <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-muted)]">
                            {description}
                        </p>
                    ) : null}
                </div>
                <div className="mt-10 sm:mt-14">{children}</div>
            </div>
        </section>
    );
}
