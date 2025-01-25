import Link from "next/link";

export default function HomePage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6">
            <h1 className="text-4xl font-bold">Excel Data Importer</h1>
            <Link
                href="/import"
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
                Start Importing
            </Link>
        </div>
    );
}
