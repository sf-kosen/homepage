import { lt2Event } from "../../content/lt2Event";

export default function SiteFooter() {
    return (
        <footer className="border-t border-[var(--line)] bg-[rgba(248,249,244,0.9)]">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
                <div>
                    <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
                        {lt2Event.eventCode}
                    </p>
                    <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--text-strong)]">
                        {lt2Event.name}
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-muted)]">
                        学内で気軽に集まって、話して、聞いて、次の挑戦につなげるための LT 会。仮情報は後から差し替えやすいように整理しています。
                    </p>
                    <p className="mt-3 text-sm text-[var(--text-muted)]">
                        連絡先: <a className="underline decoration-[var(--line-strong)] underline-offset-4" href={`mailto:${lt2Event.contact}`}>{lt2Event.contact}</a>
                    </p>
                </div>

                <div className="flex flex-col gap-3 text-sm text-[var(--text-muted)]">
                    {lt2Event.footerLinks.map((item) =>
                        item.external ? (
                            <a
                                key={item.label}
                                href={item.href}
                                target="_blank"
                                rel="noreferrer"
                                className="transition hover:text-[var(--text-strong)]"
                            >
                                {item.label}
                            </a>
                        ) : (
                            <a
                                key={item.label}
                                href={item.href}
                                className="transition hover:text-[var(--text-strong)]"
                            >
                                {item.label}
                            </a>
                        ),
                    )}
                </div>
            </div>
        </footer>
    );
}
