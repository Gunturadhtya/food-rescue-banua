import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { logout } from '@/routes';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { url } = usePage();

    const navItems = [
        { name: 'Dashboard', href: '/profile' },
        { name: 'My Orders', href: '/profile/orders' },
        { name: 'Settings', href: '/settings/profile' },
    ];

    return (
        <div className="min-h-screen bg-white font-instrument text-text-primary flex flex-col">
            {/* Header / Navbar */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center">
                <div className="text-brand-primary font-bold text-xl">Food Rescue Banua</div>
                <nav className="flex gap-6">
                    <Link href="/home" className="text-text-primary hover:text-brand-primary transition">Home</Link>
                    <Link href="/orders" className="text-text-primary hover:text-brand-primary transition">Orders</Link>
                    <Link href="/profile" className="text-brand-primary font-semibold">Profile</Link>
                </nav>
            </header>

            <div className="flex flex-1 max-w-7xl w-full mx-auto p-8 gap-8">
                {/* Sidebar Navigation */}
                <aside className="w-64 shrink-0 flex flex-col justify-between border-r border-gray-100 pr-6 pb-8">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = url === item.href || url.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-3 rounded-xl transition ${isActive
                                        ? 'bg-brand-surface text-brand-primary font-semibold'
                                        : 'text-text-secondary hover:bg-gray-50'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        <Link
                            href={logout()}
                            method="post"
                            as="button"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold">Log Out</span>
                        </Link>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 flex flex-col gap-8 pb-16">
                    {children}
                </main>
            </div>
        </div>
    );
}