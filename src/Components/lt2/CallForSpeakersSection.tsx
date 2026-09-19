import Button from "../ui/Button";
import LandingSection from "./LandingSection";
import { lt2Event } from "../../content/lt2Event";

export default function CallForSpeakersSection() {
    return (
        <LandingSection
            id="speakers"
            eyebrow="Call For Speakers"
            title="登壇募集"
            description="企画途中のもの、授業で見つけた工夫、個人制作で悩んだことなど、今の熱量があるテーマを歓迎します。"
        >
            <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div className="lt-surface rounded-[2rem] px-6 py-7">
                    <h3 className="font-display text-2xl font-semibold text-[var(--text-strong)]">
                        登壇のハードルを上げすぎない運営を想定しています。
                    </h3>
                    <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--text-muted)]">
                        {lt2Event.speakerAppeal.map((item) => (
                            <li key={item} className="flex gap-3">
                                <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-[var(--accent)]" aria-hidden="true" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <Button
                            to={lt2Event.registerPath}
                            variant="primary"
                            size="md"
                            className="font-semibold"
                        >
                            登壇登録へ進む
                        </Button>
                        <Button
                            href={lt2Event.joinUrl}
                            variant="secondary"
                            size="md"
                            className="font-semibold"
                        >
                            Discordで相談する
                        </Button>
                    </div>
                </div>

                <div className="space-y-4">
                    {lt2Event.speakerSteps.map((item) => (
                        <article
                            key={item.title}
                            className="lt-surface-soft rounded-[1.6rem] px-6 py-6"
                        >
                            <p className="font-display text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                                Step
                            </p>
                            <h3 className="mt-2 font-display text-xl font-semibold text-[var(--text-strong)]">{item.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">{item.description}</p>
                        </article>
                    ))}
                </div>
            </div>
        </LandingSection>
    );
}
