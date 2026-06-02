import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { logout } from '@/routes';
import { NavBar } from '@/components/frontend/nav-bar';

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const getNavItems = () => {
        if (user?.role === 'admin') {
            return [
                { name: 'Dashboard', href: '/admin/dashboard' },
                { name: 'Manage Users', href: '/admin/users' },
                { name: 'Manage Shops', href: '/admin/shops' },
                { name: 'Rescue Records', href: '/admin/rescues' },
                { name: 'Pickup Tickets', href: '/admin/tickets' },
                { name: 'Settings', href: '/settings' },
            ];
        }

        if (user?.role === 'seller') {
            return [
                { name: 'Dashboard', href: '/seller/dashboard' },
                { name: 'My Orders', href: '/seller/orders' },
                { name: 'Settings', href: '/settings' },
            ];
        }

        // Default User
        return [
            { name: 'Dashboard', href: '/dashboard' },
            { name: 'My Orders', href: '/orders' },
            { name: 'Settings', href: '/settings' },
        ];
    };

    const navItems = getNavItems();

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFBF7] font-instrument text-gray-900">
            <NavBar />

            <div className="flex w-full flex-1 gap-8 px-12 py-8">
                <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-neutral-200 pr-6 pb-8">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                url.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`rounded-xl px-4 py-3 transition-colors ${
                                        isActive
                                            ? 'bg-[#FFF8F5] font-bold text-[#C34A15]'
                                            : 'text-neutral-500 hover:bg-neutral-100 hover:text-gray-900'
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
                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-600 transition-colors hover:bg-red-50"
                        >
                            <LogOut className="h-5 w-5" />
                            <span className="font-semibold">Log Out</span>
                        </Link>
                    </div>
                </aside>

                <main className="flex flex-1 flex-col gap-8 pb-16">
                    {children}
                </main>
            </div>
        </div>
    );
}
