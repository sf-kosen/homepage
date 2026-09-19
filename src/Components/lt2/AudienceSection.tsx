import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function AudienceSection() {
    return (
        <LandingSection
            id="audience"
            eyebrow="For You"
            title="こんな人におすすめ"
            description="強い実績がある人だけの場ではなく、何かを試している人、これから動きたい人にも開いたイベントです。"
        >
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="lt-surface rounded-[2rem] bg-[linear-gradient(160deg,rgba(139,233,255,0.12),rgba(141,245,166,0.08))] px-6 py-8">
                    <p className="font-display text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
                        参加しやすさを最優先
                    </p>
                    <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
                        「まだ何者でもない」状態でも、
                        <br />
                        来ていいイベントにする。
                    </h3>
                    <p className="mt-5 max-w-md text-base leading-8 text-[var(--text-muted)]">
                        発表経験の有無よりも、いま興味があることや、ちょっと話してみたいことがあるかどうかを大切にします。
                    </p>
                </div>

                <div className="space-y-4">
                    {lt2Event.audienceGroups.map((item) => (
                        <article
                            key={item.title}
                            className="lt-surface-soft rounded-[1.6rem] px-6 py-6"
                        >
                            <h3 className="font-display text-xl font-semibold text-[var(--text-strong)]">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </LandingSection>
    );
}
