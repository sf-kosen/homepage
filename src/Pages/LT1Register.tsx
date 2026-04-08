import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Components/ui/Button";

type AuthUser = {
    id: string;
    username: string;
    globalName?: string | null;
};

const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s]+/i;
const DOMAIN_PATTERN = /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i;
const AT_SIGN_PATTERN = /@/;
const DISCORD_CHANNEL_REF_PATTERN = /<#\d{5,}>/;
const INVISIBLE_CHAR_PATTERN = /[\u00AD\u200B-\u200D\u2060\uFEFF]/g;
const DOT_VARIANT_PATTERN = /[\u3002\uFF0E\uFF61]/g;

const normalizeForValidation = (value: string) =>
    value
        .normalize("NFKC")
        .replace(INVISIBLE_CHAR_PATTERN, "")
        .replace(DOT_VARIANT_PATTERN, ".");

const findForbidden = (value: string) => {
    const normalized = normalizeForValidation(value.trim());
    if (!normalized) {
        return null;
    }
    if (AT_SIGN_PATTERN.test(normalized) || DISCORD_CHANNEL_REF_PATTERN.test(normalized)) {
        return "Mentions (@) are not allowed.";
    }
    if (URL_PATTERN.test(normalized) || DOMAIN_PATTERN.test(normalized)) {
        return "URLs (including short links) are not allowed.";
    }
    return null;
};

export default function LT1Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [authLoading, setAuthLoading] = useState(true);
    const [user, setUser] = useState<AuthUser | null>(null);

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
                if (active) {
                    setUser(null);
                }
            })
            .finally(() => {
                if (active) {
                    setAuthLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const titleIssue = findForbidden(title);
    const descriptionIssue = findForbidden(description);

    const handleLogin = () => {
        window.location.href = "/api/auth/login";
    };

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        setUser(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!user) {
            setError("送信する前にDiscordでログインしてください。");
            return;
        }
        if (!trimmedTitle) {
            setError("タイトルは必須です。");
            return;
        }
        if (trimmedTitle.length > 100) {
            setError("タイトルが長すぎます。");
            return;
        }
        if (trimmedDescription.length > 1000) {
            setError("概要が長すぎます。");
            return;
        }
        if (findForbidden(trimmedTitle) || findForbidden(trimmedDescription)) {
            setError("URLやメンションは使用できません。");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch("/api/lt1/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title: trimmedTitle,
                    description: trimmedDescription,
                }),
            });

            const data = (await response.json().catch(() => ({}))) as { error?: string };
            if (!response.ok) {
                throw new Error(data.error || "送信に失敗しました。");
            }

            setIsSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "送信に失敗しました。");
        } finally {
            setIsSubmitting(false);
        }
    };

    const displayName = user?.globalName
        ? `${user.globalName} (${user.username})`
        : user?.username;

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center px-4">
                    <div className="text-5xl mb-4">✅</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        登録を受け付けました
                    </h1>
                    <p className="text-gray-600 mb-6">
                        必要に応じてDiscordでご連絡します。
                    </p>
                    <div className="mb-6 flex flex-col gap-3">
                        <Button variant="primary" to="/join">
                            Discordに参加する
                        </Button>
                        <Link
                            to="/events/lt-1"
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            イベントページに戻る
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-900">
                            LT登壇登録
                        </div>
                        <div className="text-xs text-gray-600">
                            登壇者を確認するため、Discordでサインインしてください。
                        </div>
                    </div>
                    <Link className="text-sm text-gray-600 hover:text-gray-900" to="/events/lt-1">
                        戻る
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-2xl px-4 py-10">
                <div className="rounded-xl border border-gray-200 p-4">
                    <div className="text-sm font-semibold text-gray-900">Discord連携</div>
                    {authLoading ? (
                        <p className="mt-1 text-sm text-gray-600">セッションを確認中…</p>
                    ) : user ? (
                        <p className="mt-1 text-sm text-gray-600">
                            ログイン中: <span className="font-medium">{displayName}</span>
                        </p>
                    ) : (
                        <p className="mt-1 text-sm text-gray-600">
                            登録にはサインインが必要です。
                        </p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-2">
                        {user ? (
                            <Button variant="secondary" onClick={handleLogout}>
                                ログアウト
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleLogin}>
                                Discordでログイン
                            </Button>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            発表タイトル <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="簡潔なタイトルを入力"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        {titleIssue && (
                            <p className="mt-2 text-xs text-red-600">{titleIssue}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            概要 (任意)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            maxLength={1000}
                            placeholder="発表内容の簡単なまとめ"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                        />
                        {descriptionIssue && (
                            <p className="mt-2 text-xs text-red-600">{descriptionIssue}</p>
                        )}
                    </div>

                    <div className="rounded-xl bg-indigo-50 p-4">
                        <p className="text-sm text-indigo-800">
                            URLやメンション（@）は入力できません。
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-xl bg-red-50 p-4">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <Button type="submit" disabled={isSubmitting || !user || !!titleIssue || !!descriptionIssue}>
                        {isSubmitting ? "送信中…" : "LTに応募する"}
                    </Button>
                </form>

                <p className="mt-6 text-center text-xs text-gray-500">
                    投稿者の確認のため、OAuth2経由でDiscordアカウントが記録されます。
                </p>
            </main>
        </div>
    );
}
