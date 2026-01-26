import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../Components/ui/Button";

type Presenter = {
    id: string;
    name: string;
    title: string;
};

const mockPresenters: Presenter[] = [
    { id: "tbd-1", name: "Coming Soon", title: "募集中" },
    { id: "tbd-2", name: "Coming Soon", title: "募集中" },
];

export default function VotePresenter() {
    const [selected, setSelected] = useState<string | null>(null);

    const submitVote = () => {
        if (!selected) return;
        alert(`投票しました: ${selected}`);
    };

    return (
        <div className="min-h-screen bg-white">
            <header className="border-b border-gray-200">
                <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-900">登壇者投票</div>
                        <div className="text-xs text-gray-600">
                            好きを語れ！湘南藤沢高専LT会！！
                        </div>
                    </div>
                    <Link className="text-sm text-gray-600 hover:text-gray-900" to="/events/lt-1">
                        イベントへ戻る
                    </Link>
                </div>
            </header>

            <main className="mx-auto max-w-4xl px-4 py-10">
                <h1 className="text-2xl font-semibold text-gray-900">
                    いちばん良かった登壇者に投票
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    1人を選んで投票してください（暫定）。
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {mockPresenters.map((p) => {
                        const active = selected === p.id;
                        return (
                            <button
                                key={p.id}
                                onClick={() => setSelected(p.id)}
                                className={[
                                    "rounded-2xl border p-6 text-left transition",
                                    active
                                        ? "border-gray-900 ring-2 ring-gray-900"
                                        : "border-gray-200 hover:bg-gray-50",
                                ].join(" ")}
                            >
                                <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                                <div className="mt-1 text-sm text-gray-600">{p.title}</div>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <Button variant="primary" onClick={submitVote}>
                        投票する
                    </Button>
                </div>
            </main>
        </div>
    );
}
