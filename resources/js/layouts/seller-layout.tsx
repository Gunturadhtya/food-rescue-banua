import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { NavBar } from '@/components/frontend/nav-bar';
import { LogOut } from 'lucide-react';

export default function SellerLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <NavBar />

            <main className="px-12 py-10">
                <div className="flex flex-col md:flex-row gap-10 items-start">

                    <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
                        <Link
                            href="/seller/dashboard"
                            className={`px-5 py-3 rounded-xl transition-colors ${url.startsWith('/seller/dashboard')
                                ? 'bg-[#FFF8F5] text-[#C34A15] font-bold'
                                : 'text-neutral-500 hover:bg-neutral-100 hover:text-gray-900'
                                }`}
                        >
                            Dashboard
                        </Link>

                        <Link
                            href="/seller/orders"
                            className={`px-5 py-3 rounded-xl transition-colors ${url.startsWith('/seller/orders')
                                ? 'bg-[#FFF8F5] text-[#C34A15] font-bold'
                                : 'text-neutral-500 hover:bg-neutral-100 hover:text-gray-900'
                                }`}
                        >
                            My Orders
                        </Link>

                        <Link
                            href="/settings"
                            className={`px-5 py-3 rounded-xl transition-colors ${url.startsWith('/seller/settings')
                                ? 'bg-[#FFF8F5] text-[#C34A15] font-bold'
                                : 'text-neutral-500 hover:bg-neutral-100 hover:text-gray-900'
                                }`}
                        >
                            Settings
                        </Link>

                        <div className="mt-4 pt-4 border-t border-neutral-200">
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-[#C34A15] font-bold hover:bg-[#FFF8F5] transition-colors text-left"
                            >
                                <LogOut size={18} /> Log Out
                            </Link>
                        </div>
                    </aside>

                    <div className="flex-1 w-full">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}