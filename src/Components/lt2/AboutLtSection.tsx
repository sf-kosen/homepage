import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function AboutLtSection() {
    return (
        <LandingSection
            id="about"
            eyebrow="About LT"
            title="LT会とは"
            description="準備しすぎなくても参加できて、聞くだけでも楽しい。そんな入り口としてのLT会を想定しています。"
            className="bg-[var(--surface-subtle)]"
        >
            <div className="grid gap-5 lg:grid-cols-3">
                {lt2Event.ltBasics.map((item) => (
                    <article
                        key={item.title}
                        className="lt-surface-soft rounded-[1.8rem] px-6 py-7"
                    >
                        <h3 className="font-display text-xl font-semibold text-[var(--text-strong)]">
                            {item.title}
                        </h3>
                        <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
                    </article>
                ))}
            </div>
        </LandingSection>
    );
}
