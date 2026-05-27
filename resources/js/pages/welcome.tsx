import { Head, Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDF8F0] px-6 text-center">
            <Head title="Welcome" />

            <h1 className="text-6xl font-bold text-[#C34A15]">
                Food Rescue Banua
            </h1>

            <p className="mt-4 max-w-xl text-lg text-gray-600">
                Rescue surplus food from local merchants and reduce food waste
                together.
            </p>

            <div className="mt-8 flex gap-4">
                <Link
                    href="/login"
                    className="rounded-full bg-[#C34A15] px-6 py-3 font-bold text-white"
                >
                    Log In
                </Link>

                <Link
                    href="/register"
                    className="rounded-full border border-[#C34A15] px-6 py-3 font-bold text-[#C34A15]"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
}

Welcome.layout = (page: any) => page;