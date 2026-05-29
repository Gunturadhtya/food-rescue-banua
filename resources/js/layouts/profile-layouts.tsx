import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { logout } from '@/routes';
import { NavBar } from '@/components/frontend/nav-bar';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const user = props.auth?.user;
    const dashboardLink = user?.role === 'seller' ? '/seller/dashboard' : '/dashboard';
    
    const navItems = [
        { name: 'Dashboard', href: dashboardLink },
        { name: 'My Orders', href: '/orders' },
        { name: 'Settings', href: '/profile' },
    ];

    return (
        <div className="min-h-screen bg-[#FDFBF7] font-instrument text-gray-900 flex flex-col">
            <NavBar />
            
            <div className="flex flex-1 w-full px-12 py-8 gap-8">
                <aside className="w-64 shrink-0 flex flex-col justify-between border-r border-neutral-200 pr-6 pb-8">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => {
                            const isActive = url === item.href || url.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-[#FFF8F5] text-[#C34A15] font-bold'
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
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                            <LogOut className="w-5 h-5" />
                            <span className="font-semibold">Log Out</span>
                        </Link>
                    </div>
                </aside>

                <main className="flex-1 flex flex-col gap-8 pb-16">
                    {children}
                </main>
            </div>
        </div>
    );
}