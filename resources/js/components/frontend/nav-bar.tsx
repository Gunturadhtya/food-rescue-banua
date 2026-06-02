import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Search, Bell, ShoppingBag, User, LogOut } from 'lucide-react';
import { login, register, logout } from '@/routes';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NavBar() {
    const { auth } = usePage().props as any;
    const { url } = usePage();
    const isActive = (path: string) =>
        url === path || url.startsWith(`${path}/`);

    const isSeller = auth?.user?.role === 'seller';
    const isAdmin = auth?.user?.role === 'admin';
    const ordersLink = isSeller ? '/seller/orders' : '/orders';

    const [search, setSearch] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setSearch(params.get('search') || '');
    }, [url]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.get('/home', { search }, { preserveState: true });
        } else {
            router.get('/home');
        }
        setIsFocused(false);
    };

    const handleSelectRecommendation = (query: string) => {
        setSearch(query);
        router.get('/home', { search: query }, { preserveState: true });
        setIsFocused(false);
    };

    const getNavItems = () => {
        if (isAdmin) {
            return [
                { name: 'Dashboard', href: '/admin/dashboard' },
                { name: 'Manage Users', href: '/admin/users' },
                { name: 'Manage Shops', href: '/admin/shops' },
                { name: 'Rescue Records', href: '/admin/rescues' },
                { name: 'Pickup Tickets', href: '/admin/tickets' },
                { name: 'Settings', href: '/settings' },
            ];
        }

        if (isSeller) {
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

    const recommendations = [
        { name: 'Harlina Bakery' },
        { name: 'Budi Pastry & Cafe' },
        { name: 'Kopi Janji Banua' },
    ];

    const categories = [
        { label: 'Bakery', query: 'Bakery' },
        { label: 'Coffee', query: 'Kopi' },
        { label: 'Fruit', query: 'Buah' },
        { label: 'Eatery', query: 'Warung' },
    ];

    return (
        <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-orange-100/40 bg-[#FDFBF7]/95 px-12 py-5 font-instrument backdrop-blur-md transition-all duration-200">
            <Link
                href="/home"
                className="text-xl font-extrabold text-[#C34A15] italic transition-transform duration-200 hover:scale-[1.02]"
            >
                Food Rescue Banua
            </Link>

            <div className="flex gap-8 text-sm font-semibold">
                <Link
                    href="/home"
                    className={`group relative pb-1 transition-colors duration-200 ${
                        isActive('/home')
                            ? 'font-bold text-[#C34A15]'
                            : 'text-neutral-600 hover:text-[#C34A15]'
                    }`}
                >
                    Home
                    <span
                        className={`absolute bottom-0 left-0 h-[2.5px] rounded-full bg-[#C34A15] transition-all duration-300 ${
                            isActive('/home')
                                ? 'w-full'
                                : 'w-0 group-hover:w-full'
                        }`}
                    />
                </Link>

                {!isAdmin && (
                    <Link
                        href={ordersLink}
                        className={`group relative pb-1 transition-colors duration-200 ${
                            isActive(ordersLink)
                                ? 'font-bold text-[#C34A15]'
                                : 'text-neutral-600 hover:text-[#C34A15]'
                        }`}
                    >
                        Orders
                        <span
                            className={`absolute bottom-0 left-0 h-[2.5px] rounded-full bg-[#C34A15] transition-all duration-300 ${
                                isActive(ordersLink)
                                    ? 'w-full'
                                    : 'w-0 group-hover:w-full'
                            }`}
                        />
                    </Link>
                )}
            </div>

            <div className="relative w-80">
                <form
                    onSubmit={handleSearchSubmit}
                    className="flex w-full items-center gap-3 rounded-full border border-orange-100/60 bg-[#FAF7F2]/80 px-4 py-2 shadow-xs transition-all duration-300 focus-within:border-[#C34A15] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#C34A15]/10"
                >
                    <Search size={16} className="shrink-0 text-neutral-500" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for merchant or dish"
                        className="w-full border-none bg-transparent font-sans text-sm text-neutral-800 outline-none placeholder:text-neutral-400"
                    />
                </form>

                {isFocused && (
                    <div className="absolute top-12 left-0 z-50 flex w-full flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-4 font-sans shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                        <div>
                            <h4 className="mb-2 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                                Merchant Recommendations
                            </h4>
                            <div className="flex flex-col gap-1">
                                {recommendations.map((item) => (
                                    <div
                                        key={item.name}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectRecommendation(
                                                item.name,
                                            );
                                        }}
                                        className="flex cursor-pointer items-center gap-2 rounded-xl p-2 text-xs font-semibold text-neutral-700 transition-colors hover:bg-[#FDF5F1] hover:text-[#C34A15]"
                                    >
                                        <Search
                                            size={14}
                                            className="text-neutral-400"
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-neutral-100" />

                        <div>
                            <h4 className="mb-2 text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                                Popular Categories
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.label}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectRecommendation(
                                                cat.query,
                                            );
                                        }}
                                        className="cursor-pointer rounded-full border-none bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-600 transition-colors outline-none hover:bg-[#FDF5F1] hover:text-[#C34A15]"
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-4">
                {auth?.user ? (
                    <>
                        <div className="flex cursor-pointer items-center justify-center rounded-full border border-orange-100/60 bg-[#FAF7F2]/60 p-2.5 text-neutral-600 shadow-xs transition-all duration-200 hover:scale-105 hover:border-[#C34A15]/40 hover:bg-orange-50 hover:text-[#C34A15]">
                            <Bell size={18} />
                        </div>

                        {!isAdmin && (
                            <Link href={ordersLink}>
                                <div
                                    className={`flex cursor-pointer items-center justify-center rounded-full border p-2.5 shadow-xs transition-all duration-200 hover:scale-105 hover:border-[#C34A15]/40 hover:bg-orange-50 hover:text-[#C34A15] ${
                                        isActive(ordersLink)
                                            ? 'border-[#C34A15]/40 bg-orange-50/50 text-[#C34A15]'
                                            : 'border-orange-100/60 bg-[#FAF7F2]/60 text-neutral-600'
                                    }`}
                                >
                                    <ShoppingBag size={18} />
                                </div>
                            </Link>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#C34A15]">
                                <div className="flex items-center justify-center rounded-full border border-orange-100/60 bg-[#FAF7F2]/60 p-2.5 text-neutral-600 shadow-xs transition-all duration-200 hover:scale-105 hover:border-[#C34A15]/40 hover:bg-orange-50 hover:text-[#C34A15]">
                                    <User size={18} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="mt-2 w-56 rounded-2xl border border-neutral-100 p-2 font-instrument shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                            >
                                <div className="mb-1 px-3 py-2">
                                    <p className="text-sm font-bold text-gray-900">
                                        {auth.user.name}
                                    </p>
                                    <p className="truncate text-xs text-neutral-500">
                                        {auth.user.email}
                                    </p>
                                </div>
                                <DropdownMenuSeparator className="mb-1 bg-neutral-100" />
                                <div className="flex flex-col gap-1">
                                    {getNavItems().map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                            <DropdownMenuItem
                                                key={item.name}
                                                asChild
                                                className="p-0 outline-none"
                                            >
                                                <Link
                                                    href={item.href}
                                                    className={`flex w-full cursor-pointer items-center rounded-xl px-3 py-2 text-sm transition-colors ${
                                                        active
                                                            ? 'bg-[#FFF8F5] font-bold text-[#C34A15]'
                                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-gray-900'
                                                    }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </div>
                                <DropdownMenuSeparator className="my-1 bg-neutral-100" />
                                <DropdownMenuItem
                                    asChild
                                    className="p-0 outline-none"
                                >
                                    <Link
                                        href={logout()}
                                        method="post"
                                        as="button"
                                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span className="font-semibold">
                                            Log Out
                                        </span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Link
                            href={login()}
                            className="text-sm font-bold text-neutral-700 transition-colors hover:text-[#C34A15]"
                        >
                            Log In
                        </Link>
                        <Link
                            href={register()}
                            className="rounded-full bg-[#C34A15] px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                        >
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
