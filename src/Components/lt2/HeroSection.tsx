import Button from "../ui/Button";
import { lt2Event } from "../../content/lt2Event";

function EditorPreview({ compact = false }: { compact?: boolean }) {
    return (
        <div className="lt-hero-visual">
            <div
                className={[
                    "lt-editor-stage relative w-full rounded-xl border border-[var(--line)] bg-[#fafafa] overflow-hidden",
                    "flex items-start justify-center",
                    compact ? "h-[176px] px-4 pb-4 pt-5" : "h-[232px] px-5 pb-5 pt-7",
                ].join(" ")}
            >
                <div className="absolute inset-0 bg-[radial-gradient(var(--line)_1px,transparent_1px)] [background-size:16px_16px] opacity-60" />

                <div
                    className={[
                        "lt-editor-card relative z-10 w-full rounded-xl border border-[var(--line)] bg-white overflow-hidden",
                        "transform transition-transform duration-500 hover:scale-[1.02]",
                        compact
                            ? "max-w-[16rem] shadow-[0_14px_28px_rgba(0,0,0,0.07)]"
                            : "max-w-[18.5rem] shadow-[0_18px_36px_rgba(0,0,0,0.08)]",
                    ].join(" ")}
                >
                    <div className="flex items-center gap-2 border-b border-[var(--line)] bg-[#fafafa] px-4 py-3">
                        <div className="flex gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full border border-[#e0443e] bg-[#ff5f56]" />
                            <div className="h-2.5 w-2.5 rounded-full border border-[#dea123] bg-[#ffbd2e]" />
                            <div className="h-2.5 w-2.5 rounded-full border border-[#1aab29] bg-[#27c93f]" />
                        </div>
                        <div className="ml-4 font-mono text-[10px] uppercase tracking-widest text-[#888]">main.tsx</div>
                    </div>

                    <div className={compact ? "p-3.5" : "p-4"}>
                        <div className={compact ? "flex items-start gap-2.5" : "flex items-start gap-3"}>
                            <div className="flex w-4 select-none flex-col gap-2.5 text-right font-mono text-[10px] text-[#ccc]">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                                <span>5</span>
                            </div>

                            <div className="lt-code-stack flex-1 space-y-2.5">
                                <div className="lt-code-line flex gap-2">
                                    <div className="h-2 w-12 rounded bg-purple-400 opacity-30" />
                                    <div className="h-2 w-24 rounded bg-blue-400 opacity-30" />
                                    <div className="h-2 w-8 rounded bg-[#f0f0f0]" />
                                </div>
                                <div className="lt-code-line flex gap-2 pl-4">
                                    <div className="h-2 w-16 rounded bg-blue-400 opacity-30" />
                                    <div className="h-2 w-28 rounded bg-green-400 opacity-30" />
                                </div>
                                <div className="lt-code-line flex gap-2 pl-4">
                                    <div className="h-2 w-32 rounded bg-[#f0f0f0]" />
                                    <div className="lt-cursor-dot h-2 w-1.5 rounded-full bg-[#0070f3]" />
                                </div>
                                <div className="lt-code-line flex gap-2">
                                    <div className="h-2 w-10 rounded bg-purple-400 opacity-30" />
                                    <div className="h-2 w-16 rounded bg-[#f0f0f0]" />
                                </div>
                                <div className="lt-code-line h-2 w-2/3 rounded bg-[#f0f0f0]" />
                            </div>
                        </div>

                        <div className={compact ? "mt-6 flex items-center justify-between border-t border-[var(--line)] pt-3 opacity-60" : "mt-8 flex items-center justify-between border-t border-[var(--line)] pt-4 opacity-60"}>
                            <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                                <div className="font-mono text-[9px] uppercase tracking-wider text-[#888]">TypeScript</div>
                            </div>
                            <div className="font-mono text-[9px] text-[#888]">UTF-8</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MobileFactGrid() {
    return (
        <div className="grid gap-3 sm:grid-cols-2">
            {lt2Event.heroFacts.map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-[var(--line)] bg-white px-4 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <p className="font-display text-[10px] uppercase tracking-[0.22em] text-[#888]">{fact.label}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-[var(--text-strong)]">{fact.value}</p>
                </div>
            ))}
        </div>
    );
}

export default function HeroSection() {
    const titlePrefix = lt2Event.name.replace(/\s*LT会$/, "");

    return (
        <section id="top" className="lt-hero-stage relative overflow-hidden border-b border-[var(--line)]">
            <div className="lt-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
            <div
                className="pointer-events-none absolute inset-x-0 top-[-20rem] h-[50rem] bg-[radial-gradient(ellipse_at_top,_rgba(150,150,150,0.06),_transparent_60%)]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute right-[10%] top-[-10rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,_rgba(0,112,243,0.05),_transparent_70%)] blur-[100px]"
                aria-hidden="true"
            />

            <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-8 lg:py-9">
                <div className="grid items-start gap-12 lg:min-h-[calc(100svh-73px)] lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.92fr)]">
                    <div className="relative z-10">
                        <div className="lg:hidden">
                            <p className="lt-kicker opacity-0 animate-slide-in-left" style={{ animationDelay: "0ms" }}>
                                KOSEN LIGHTNING TALKS
                            </p>
                            <h1
                                className="lt-hero-title mt-5 max-w-none font-display text-[3.25rem] font-bold leading-[0.98] tracking-tight text-[var(--text-strong)] opacity-0 animate-slide-in-left sm:text-[4rem]"
                                style={{ animationDelay: "100ms" }}
                            >
                                <span className="lt-title-primary whitespace-nowrap">{titlePrefix}</span>
                                <br />
                                <span className="lt-title-secondary inline-block">LT会</span>
                            </h1>
                            <p
                                className="mt-6 max-w-[18rem] text-[1.9rem] font-medium leading-[1.25] tracking-tight text-[var(--text-strong)] opacity-0 animate-slide-in-left sm:max-w-xl sm:text-[2.2rem]"
                                style={{ animationDelay: "180ms" }}
                            >
                                {lt2Event.tagline}
                            </p>
                            <p
                                className="mt-5 max-w-xl text-base leading-8 text-[var(--text-muted)] opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "260ms" }}
                            >
                                {lt2Event.description}
                            </p>

                            <div
                                className="mt-8 flex flex-col gap-3 opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "340ms" }}
                            >
                                <Button
                                    to={lt2Event.registerPath}
                                    variant="primary"
                                    size="lg"
                                    className="w-full font-semibold"
                                >
                                    登壇エントリー
                                </Button>
                                <Button
                                    href={lt2Event.joinUrl}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full font-semibold"
                                >
                                    参加案内を見る
                                </Button>
                            </div>

                            <div
                                className="lt-mobile-hero-panel mt-8 rounded-[1.6rem] border border-[var(--line)] bg-white p-4 opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "420ms" }}
                            >
                                <div className="flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                                    <span>{lt2Event.eventCode}</span>
                                    <span className="text-right">{lt2Event.audienceLine}</span>
                                </div>

                                <div className="mt-4">
                                    <MobileFactGrid />
                                </div>

                                <div className="mt-5">
                                    <EditorPreview compact />
                                </div>

                                <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">{lt2Event.dateNote}</p>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <p className="lt-kicker opacity-0 animate-slide-in-left" style={{ animationDelay: "0ms" }}>
                                KOSEN LIGHTNING TALKS
                            </p>
                            <h1
                                className="lt-hero-title mt-5 max-w-4xl font-display text-[3.5rem] font-bold leading-[1.05] tracking-tight text-[var(--text-strong)] opacity-0 animate-slide-in-left sm:text-6xl lg:text-[4.5rem]"
                                style={{ animationDelay: "100ms" }}
                            >
                                <span className="lt-title-primary whitespace-nowrap">{titlePrefix}</span>
                                <br />
                                <span className="lt-title-secondary inline-block">LT会</span>
                            </h1>
                            <p
                                className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-[var(--text-strong)] opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "200ms" }}
                            >
                                {lt2Event.tagline}
                            </p>
                            <p
                                className="mt-4 max-w-xl text-base leading-8 text-[var(--text-muted)] opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "300ms" }}
                            >
                                {lt2Event.description}
                            </p>

                            <div className="mt-10 max-w-2xl opacity-0 animate-slide-in-left" style={{ animationDelay: "400ms" }}>
                                {lt2Event.heroFacts.map((fact) => (
                                    <div key={fact.label} className="lt-meta-row py-3">
                                        <span className="font-display text-[10px] uppercase tracking-widest text-[#888]">{fact.label}</span>
                                        <span className="text-sm font-medium leading-7 text-[var(--text-strong)]">{fact.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div
                                className="mt-10 flex flex-col gap-4 opacity-0 animate-slide-in-left sm:flex-row sm:items-center"
                                style={{ animationDelay: "500ms" }}
                            >
                                <Button
                                    to={lt2Event.registerPath}
                                    variant="primary"
                                    size="lg"
                                    className="min-w-[180px] font-semibold transition-transform duration-300 hover:scale-105"
                                >
                                    登壇エントリー
                                </Button>
                                <Button
                                    href={lt2Event.joinUrl}
                                    variant="secondary"
                                    size="lg"
                                    className="min-w-[180px] font-semibold transition-transform duration-300 hover:scale-105"
                                >
                                    参加案内を見る
                                </Button>
                            </div>

                            <p
                                className="mt-8 max-w-lg text-sm leading-7 text-[#888888] opacity-0 animate-slide-in-left"
                                style={{ animationDelay: "600ms" }}
                            >
                                話してみたいことがある人も、面白い発表を聞きたい人も、同じ熱量で集まれる校内イベントを目指します。
                            </p>
                        </div>
                    </div>

                    <div className="lt-panel-float relative z-10 mt-2 hidden opacity-0 animate-slide-in-right lg:mt-4 lg:block" style={{ animationDelay: "400ms" }}>
                        <div className="lt-hero-panel relative overflow-hidden bg-white px-6 pb-6 pt-7 sm:px-8 sm:pb-8 sm:pt-9">
                            <div className="relative flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">
                                <span>{lt2Event.eventCode}</span>
                                <span className="text-right">{lt2Event.audienceLine}</span>
                            </div>

                            <div className="relative mt-6">
                                <EditorPreview />
                            </div>

                            <div className="relative mt-6 border-b border-[var(--line)] pb-7">
                                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--text-muted)]">Save the Date</p>
                                <div className="mt-2">
                                    <div className="lt-index-number text-[4.2rem] leading-none tracking-tighter text-[var(--text-strong)] sm:text-[5.2rem]">
                                        04/25
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="border-l-2 border-[var(--line)] pl-4">
                                            <p className="font-mono text-[10px] uppercase tracking-widest text-[#888]">April 2026</p>
                                            <p className="mt-2 pr-2 text-xs leading-relaxed text-[var(--text-muted)]">
                                                Discord内講堂で気軽に集まるライトニングトーク。
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">Saturday</p>
                                        <p className="mt-1 text-3xl font-bold tracking-tight text-[var(--text-strong)]">14:00</p>
                                        <p className="mt-1 text-xs text-[var(--text-muted)]">Open 13:30</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative mt-7 space-y-5">
                                <div>
                                    <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#888]">Venue</p>
                                    <p className="mt-2 text-lg font-medium text-[var(--text-strong)]">{lt2Event.venue}</p>
                                </div>
                                <div>
                                    <p className="font-display text-[11px] uppercase tracking-[0.24em] text-[#888]">Format</p>
                                    <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">{lt2Event.dateNote}</p>
                                </div>
                            </div>

                            <div className="relative mt-8 grid gap-4 text-sm text-[var(--text-muted)] sm:grid-cols-2">
                                <div className="lt-mini-note">
                                    <div className="font-medium text-[var(--text-strong)]">視聴のみ歓迎</div>
                                    <p className="mt-2 leading-7">まずは空気を見に来るだけでも大丈夫です。</p>
                                </div>
                                <div className="lt-mini-note">
                                    <div className="font-medium text-[var(--text-strong)]">初登壇歓迎</div>
                                    <p className="mt-2 leading-7">完成度よりも、今話したい熱量を優先します。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
