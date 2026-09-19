import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function OverviewSection() {
    return (
        <LandingSection
            id="overview"
            eyebrow="Overview"
            title="開催概要"
            description="参加前に確認したい情報を、短く整理して置いています。雰囲気で惹かれつつ、判断材料はきちんと残す構成です。"
        >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="space-y-4">
                    {lt2Event.overviewFacts.map((fact) => (
                        <div key={fact.label} className="flex items-start justify-between gap-6 border-b border-[var(--line)] py-4">
                            <dt className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                                {fact.label}
                            </dt>
                            <dd className="max-w-sm text-right text-sm leading-7 text-[var(--text-strong)]">
                                {fact.value}
                            </dd>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <article className="lt-surface-soft rounded-[1.75rem] px-5 py-6">
                        <h3 className="font-display text-lg font-semibold text-[var(--text-strong)]">気軽に参加</h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            途中参加や視聴のみでも入りやすい雰囲気を前提に設計します。
                        </p>
                    </article>
                    <article className="lt-surface-soft rounded-[1.75rem] px-5 py-6">
                        <h3 className="font-display text-lg font-semibold text-[var(--text-strong)]">短く話せる</h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            発表時間は短め。まず一度話してみるためのハードルを下げます。
                        </p>
                    </article>
                    <article className="lt-surface-soft rounded-[1.75rem] px-5 py-6">
                        <h3 className="font-display text-lg font-semibold text-[var(--text-strong)]">刺激が残る</h3>
                        <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                            他の学生の熱量や工夫を知って、次の制作や学びにつながる場を目指します。
                        </p>
                    </article>
                </div>
            </div>
        </LandingSection>
    );
}
