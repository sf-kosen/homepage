import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function TimetableSection() {
    return (
        <LandingSection
            id="timetable"
            eyebrow="Timetable"
            title="タイムテーブル"
            description="仮のタイムテーブルですが、初参加でも不安になりにくいように、進行イメージを先に共有します。"
            className="bg-[var(--surface-subtle)]"
        >
            <div className="lt-surface overflow-hidden rounded-[2rem]">
                {lt2Event.timeline.map((item, index) => (
                    <div
                        key={`${item.time}-${item.title}`}
                        className={[
                            "grid gap-3 px-5 py-5 sm:grid-cols-[120px_minmax(0,1fr)] sm:px-8 sm:py-6",
                            index !== lt2Event.timeline.length - 1 ? "border-b border-[var(--line)]" : "",
                        ].join(" ")}
                    >
                        <div className="font-display text-sm font-semibold tracking-[0.18em] text-[var(--accent)]">
                            {item.time}
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-[var(--text-strong)]">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </LandingSection>
    );
}
