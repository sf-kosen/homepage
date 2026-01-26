import React from "react";

type Props = {
    id?: string;
    title: string;
    description?: string;
    children: React.ReactNode;
};

export default function Section({ id, title, description, children }: Props) {
    return (
        <section id={id} className="py-14 scroll-mt-24">
            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                        {title}
                    </h2>
                    {description && (
                        <p className="mt-2 text-sm leading-6 text-gray-600">
                            {description}
                        </p>
                    )}
                </div>
                {children}
            </div>
        </section>
    );
}
