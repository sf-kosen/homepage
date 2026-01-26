import Button from "../Components/ui/Button";

export default function ComingSoon() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl font-serif mb-4">
                Coming Soon
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md">
                このページは現在準備中です。公開まで今しばらくお待ちください。
            </p>
            <Button variant="primary" to="/">
                トップページに戻る
            </Button>
        </div>
    );
}
