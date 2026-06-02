import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LogOut,
    LayoutDashboard,
    ShoppingBag,
    Settings,
    Users,
    Store,
    Package,
    Ticket,
} from 'lucide-react';
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
                {
                    name: 'Dashboard',
                    href: '/admin/dashboard',
                    icon: LayoutDashboard,
                },
                { name: 'Manage Users', href: '/admin/users', icon: Users },
                { name: 'Manage Shops', href: '/admin/shops', icon: Store },
                {
                    name: 'Rescue Records',
                    href: '/admin/rescues',
                    icon: Package,
                },
                {
                    name: 'Pickup Tickets',
                    href: '/admin/tickets',
                    icon: Ticket,
                },
                { name: 'Settings', href: '/settings', icon: Settings },
            ];
        }

        if (user?.role === 'seller') {
            return [
                {
                    name: 'Dashboard',
                    href: '/seller/dashboard',
                    icon: LayoutDashboard,
                },
                {
                    name: 'My Orders',
                    href: '/seller/orders',
                    icon: ShoppingBag,
                },
                { name: 'Settings', href: '/settings', icon: Settings },
            ];
        }

        // Default User
        return [
            { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
            { name: 'My Orders', href: '/orders', icon: ShoppingBag },
            { name: 'Settings', href: '/settings', icon: Settings },
        ];
    };

    const navItems = getNavItems();

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFBF7] font-instrument text-gray-900">
            <NavBar />

            <div className="flex w-full flex-1 gap-8 px-12 py-8">
                <aside className="flex w-64 shrink-0 flex-col justify-between border-r border-neutral-200/80 pr-6 pb-8">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive =
                                url === item.href ||
                                url.startsWith(`${item.href}/`);
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 border-l-4 py-3 pr-4 pl-3 transition-all duration-200 ${
                                        isActive
                                            ? 'rounded-r-xl border-l-[#C34A15] bg-orange-50/50 font-bold text-[#C34A15]'
                                            : 'rounded-r-xl border-l-transparent text-neutral-500 hover:bg-neutral-50 hover:text-gray-900'
                                    }`}
                                >
                                    {Icon && (
                                        <Icon
                                            className={`h-5 w-5 shrink-0 ${
                                                isActive
                                                    ? 'text-[#C34A15]'
                                                    : 'text-neutral-400 group-hover:text-gray-700'
                                            }`}
                                        />
                                    )}
                                    <span className="font-semibold tracking-tight">
                                        {item.name}
                                    </span>
                                </Link>
                            );
                        })}
                        <Link
                            href={logout()}
                            method="post"
                            as="button"
                            className="flex w-full items-center gap-3 rounded-r-xl border-l-4 border-l-transparent py-3 pr-4 pl-3 text-left text-red-600 transition-all duration-200 hover:bg-red-50/50 hover:text-red-700"
                        >
                            <LogOut className="h-5 w-5 shrink-0 text-red-500" />
                            <span className="font-bold">Log Out</span>
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
