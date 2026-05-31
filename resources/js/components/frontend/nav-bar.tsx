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
    const isActive = (path: string) => url === path || url.startsWith(`${path}/`);

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
        { label: 'Kopi', query: 'Kopi' },
        { label: 'Buah', query: 'Buah' },
        { label: 'Warung', query: 'Warung' },
    ];

    return (
        <nav className="flex items-center justify-between px-12 py-6 w-full font-instrument">
            <Link href="/home" className="text-xl font-extrabold italic text-[#C34A15]">
                Food Rescue Banua
            </Link>

            <div className="flex gap-8 font-medium text-sm">
                <Link
                    href="/home"
                    className={`group relative pb-1 transition-colors duration-200 ${isActive('/home') ? 'text-[#C34A15] font-bold' : 'text-neutral-600 hover:text-[#C34A15]'
                        }`}
                >
                    Home
                    <span
                        className={`absolute bottom-0 left-0 h-[2.5px] bg-[#C34A15] rounded-full transition-all duration-300 ${isActive('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                            }`}
                    />
                </Link>

                {!isAdmin && (
                    <Link
                        href={ordersLink}
                        className={`group relative pb-1 transition-colors duration-200 ${isActive(ordersLink) ? 'text-[#C34A15] font-bold' : 'text-neutral-600 hover:text-[#C34A15]'
                            }`}
                    >
                        Orders
                        <span
                            className={`absolute bottom-0 left-0 h-[2.5px] bg-[#C34A15] rounded-full transition-all duration-300 ${isActive(ordersLink) ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}
                        />
                    </Link>
                )}
            </div>

            <div className="relative w-80">
                <form onSubmit={handleSearchSubmit} className="flex items-center gap-4 bg-[#F2EDE5] px-4 py-2 rounded-full w-full">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search for merchant or dish"
                        className="bg-transparent border-none text-sm w-full outline-none font-sans"
                    />
                </form>

                {isFocused && (
                    <div className="absolute top-12 left-0 w-full bg-white border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl p-4 z-50 flex flex-col gap-4 font-sans">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Rekomendasi Merchant</h4>
                            <div className="flex flex-col gap-1">
                                {recommendations.map((item) => (
                                    <div
                                        key={item.name}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectRecommendation(item.name);
                                        }}
                                        className="flex items-center gap-2 p-2 rounded-xl text-xs font-semibold text-neutral-700 hover:bg-[#FDF5F1] hover:text-[#C34A15] transition-colors cursor-pointer"
                                    >
                                        <Search size={14} className="text-neutral-400" />
                                        <span>{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <hr className="border-neutral-100" />

                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2">Kategori Populer</h4>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.label}
                                        type="button"
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            handleSelectRecommendation(cat.query);
                                        }}
                                        className="px-3 py-1.5 rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 hover:bg-[#FDF5F1] hover:text-[#C34A15] transition-colors cursor-pointer border-none outline-none"
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center">
                {auth?.user ? (
                    <>
                        <Bell size={20} className="cursor-pointer text-neutral-600 hover:text-[#C34A15]" />

                        {!isAdmin && (
                            <Link href={ordersLink}>
                                <ShoppingBag size={20} className={`cursor-pointer ${isActive(ordersLink) ? 'text-[#C34A15]' : 'text-neutral-600 hover:text-[#C34A15]'}`} />
                            </Link>
                        )}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none focus-visible:ring-2 focus-visible:ring-[#C34A15] rounded-full">
                                <div className="p-2 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                    <User size={20} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 mt-2 rounded-2xl border-neutral-100 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)] font-instrument">
                                <div className="px-3 py-2 mb-1">
                                    <p className="text-sm font-bold text-gray-900">{auth.user.name}</p>
                                    <p className="text-xs text-neutral-500 truncate">{auth.user.email}</p>
                                </div>
                                <DropdownMenuSeparator className="bg-neutral-100 mb-1" />
                                <div className="flex flex-col gap-1">
                                    {getNavItems().map((item) => {
                                        const active = isActive(item.href);
                                        return (
                                            <DropdownMenuItem key={item.name} asChild className="p-0 outline-none">
                                                <Link
                                                    href={item.href}
                                                    className={`flex w-full items-center px-3 py-2 rounded-xl text-sm transition-colors cursor-pointer ${active
                                                            ? 'bg-[#FFF8F5] text-[#C34A15] font-bold'
                                                            : 'text-neutral-600 hover:bg-neutral-50 hover:text-gray-900'
                                                        }`}
                                                >
                                                    {item.name}
                                                </Link>
                                            </DropdownMenuItem>
                                        );
                                    })}
                                </div>
                                <DropdownMenuSeparator className="bg-neutral-100 my-1" />
                                <DropdownMenuItem asChild className="p-0 outline-none">
                                    <Link
                                        href={logout()}
                                        method="post"
                                        as="button"
                                        className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="font-semibold">Log Out</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </>
                ) : (
                    <>
                        <Link href={login()} className="text-sm font-bold hover:text-[#C34A15]">Log In</Link>
                        <Link href={register()} className="text-sm font-bold bg-[#C34A15] text-white px-5 py-2 rounded-full hover:bg-[#A33D10] transition-colors">
                            Sign Up
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}