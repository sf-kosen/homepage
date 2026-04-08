import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function FaqSection() {
    return (
        <LandingSection
            id="faq"
            eyebrow="FAQ"
            title="参加前によくある質問"
            description="初参加のハードルを下げるために、気になりやすいポイントを先にまとめています。"
        >
            <div className="space-y-4">
                {lt2Event.faqs.map((item) => (
                    <details
                        key={item.question}
                        className="group lt-surface-soft rounded-[1.6rem] px-5 py-5"
                    >
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                            <span className="font-medium text-[var(--text-strong)]">{item.question}</span>
                            <span
                                aria-hidden="true"
                                className="font-display text-xl text-[var(--accent)] transition-transform group-open:rotate-45"
                            >
                                +
                            </span>
                        </summary>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-muted)]">
                            {item.answer}
                        </p>
                    </details>
                ))}
            </div>
        </LandingSection>
    );
}
