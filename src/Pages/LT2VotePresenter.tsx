import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Components/ui/Button";
import { lt2Presenters } from "../../shared/lt2Presenters";
import { lt2Event } from "../content/lt2Event";

type AuthUser = {
    id: string;
    username: string;
    globalName?: string | null;
};

export default function LT2VotePresenter() {
    const eventPagePath = lt2Event.registerPath.replace("/register", "");
    const [selected, setSelected] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

    const activePresenters = lt2Presenters.filter((p) => p.status === "active");

    useEffect(() => {
        let active = true;
        setAuthLoading(true);

        fetch("/api/auth/status", { credentials: "include" })
            .then(async (res) => {
                if (!active) return;
                if (!res.ok) {
                    setUser(null);
                    return;
                }
                const data = (await res.json()) as { user?: AuthUser };
                setUser(data.user ?? null);
            })
            .catch(() => {
                if (active) setUser(null);
            })
            .finally(() => {
                if (active) setAuthLoading(false);
            });

        return () => {
            active = false;
        };
    }, []);

    const handleLogin = () => {
        window.location.href = "/api/auth/login";
    };

    const submitVote = async () => {
        if (!selected || !user) return;

        setIsSubmitting(true);
        setError(null);

        const presenter = activePresenters.find((p) => p.id === selected);
        if (!presenter) {
            setIsSubmitting(false);
            setError("Presenter not found.");
            return;
        }

        try {
            const res = await fetch("/api/lt2/vote", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    presenterId: presenter.id,
                    presenterName: presenter.name,
                }),
            });

            if (!res.ok) {
                const data = (await res.json().catch(() => ({}))) as { error?: string };
                throw new Error(data.error || "投票に失敗しました。");
            }

            setHasVoted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "投票に失敗しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (hasVoted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="text-5xl mb-4">🗳️</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        投票ありがとうございます！
                    </h1>
                    <p className="text-gray-600 mb-6">
                        LT2 を盛り上げる一票として受け付けました。
                    </p>
                    <Link
                        to={eventPagePath}
                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                        イベントページに戻る
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-900">LT2 登壇者投票</div>
                        <div className="text-xs text-gray-600">
                            {lt2Event.name}
                        </div>
                    </div>
                    <Link className="text-sm text-gray-600 hover:text-gray-900" to={eventPagePath}>
                        イベントへ戻る
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 py-10">
                <h1 className="text-2xl font-semibold text-gray-900">
                    いちばん良かった登壇者に投票
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    LT2 で「これだ！」と思った1人を選んで投票してください。
                </p>

                <div className="mt-6">
                    {authLoading ? (
                        <p className="text-sm text-gray-500">読み込み中...</p>
                    ) : user ? (
                        <p className="text-sm text-gray-600">
                            ログイン中: <span className="font-medium">{user.globalName || user.username}</span>
                        </p>
                    ) : (
                        <div className="rounded-xl bg-orange-50 p-4 border border-orange-100">
                            <p className="text-sm text-orange-800 mb-2">
                                投票するにはDiscordログインが必要です。
                            </p>
                            <Button variant="primary" onClick={handleLogin}>
                                Discordでログイン
                            </Button>
                        </div>
                    )}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {activePresenters.map((p) => {
                        const active = selected === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setSelected(p.id)}
                                disabled={!user || isSubmitting}
                                className={[
                                    "rounded-2xl border p-6 text-left transition",
                                    active
                                        ? "border-indigo-600 ring-2 ring-indigo-600 bg-indigo-50"
                                        : "border-gray-200 hover:bg-gray-50",
                                    !user ? "opacity-50 cursor-not-allowed" : "",
                                ].join(" ")}
                            >
                                <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                                <div className="mt-1 text-sm text-gray-600">{p.title}</div>
                            </button>
                        );
                    })}
                </div>

                {error && (
                    <div className="mt-6 rounded-xl bg-red-50 p-4">
                        <p className="text-sm text-red-800">{error}</p>
                    </div>
                )}

                <div className="mt-8">
                    <Button
                        variant="primary"
                        onClick={submitVote}
                        disabled={!selected || isSubmitting || !user}
                    >
                        {isSubmitting ? "送信中..." : "投票する"}
                    </Button>
                </div>
            </main>
        </div>
    );
}
