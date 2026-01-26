type Props = { label: string };

export default function Badge({ label }: Props) {
    return (
        <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
            {label}
        </span>
    );
}
