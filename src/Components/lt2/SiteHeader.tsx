import Button from "../ui/Button";
import { lt2Event } from "../../content/lt2Event";

export default function SiteHeader() {
    return (
        <header className="lt-site-header sticky top-0 z-40 border-b border-[rgba(15,23,42,0.06)] bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(251,251,248,0.74))] shadow-[0_10px_30px_rgba(15,23,42,0.04)] backdrop-blur-2xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
                <a href="#top" className="min-w-0">
                    <div className="font-display text-xs font-semibold uppercase tracking-[0.28em] text-[var(--accent-2)]">
                        {lt2Event.eventCode}
                    </div>
                    <div className="mt-1 text-sm font-medium text-[var(--text-strong)] sm:text-base">
                        {lt2Event.name}
                    </div>
                </a>

                <nav className="hidden items-center gap-1 rounded-full border border-[rgba(15,23,42,0.07)] bg-[rgba(255,255,255,0.76)] px-2 py-1 shadow-[0_10px_24px_rgba(15,23,42,0.05)] backdrop-blur-xl lg:flex">
                    {lt2Event.navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="rounded-full px-3 py-2 text-sm text-[var(--text-muted)] transition hover:bg-[rgba(255,255,255,0.9)] hover:text-[var(--text-strong)]"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <Button
                    to={lt2Event.registerPath}
                    variant="primary"
                    size="sm"
                    className="font-semibold"
                >
                    登壇する
                </Button>
            </div>
        </header>
    );
}
