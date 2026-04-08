import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function AccessSection() {
    return (
        <LandingSection
            id="access"
            eyebrow="Access"
            title="アクセス"
            description="当日どこへ行けばよいか、どう接続すればよいかをシンプルに整理しています。"
            className="bg-[var(--surface-subtle)]"
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
                <div className="lt-surface rounded-[2rem] px-6 py-7">
                    <p className="font-display text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Venue</p>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
                        {lt2Event.venue}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)]">
                        {lt2Event.accessNote}
                    </p>
                </div>

                <div className="lt-surface rounded-[2rem] px-6 py-7">
                    <p className="font-display text-xs uppercase tracking-[0.28em] text-[var(--accent)]">Guide</p>
                    <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                        {lt2Event.accessPoints.map((point) => (
                            <li key={point} className="flex gap-3">
                                <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-[var(--accent-2)]" aria-hidden="true" />
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </LandingSection>
    );
}
