import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Search, Bell, ShoppingBag, User } from 'lucide-react';
import { login, register } from '@/routes';

export function NavBar() {
    const { auth } = usePage().props as any;
    const { url } = usePage(); 
    const isActive = (path: string) => url.startsWith(path);
    const isSeller = auth?.user?.role === 'seller';
    const ordersLink = isSeller ? '/seller/orders' : '/orders';
    const dashboardLink = isSeller ? '/seller/dashboard' : '/dashboard';

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
        <nav className="flex items-center justify-between px-12 py-6 w-full">
            <Link href="/home" className="text-xl font-extrabold italic text-[#C34A15]">
                Food Rescue Banua
            </Link>

            <div className="flex gap-8 font-medium text-sm">
                <Link 
                    href="/home" 
                    className={`group relative pb-1 transition-colors duration-200 ${
                        isActive('/home') ? 'text-[#C34A15] font-bold' : 'text-neutral-600 hover:text-[#C34A15]'
                    }`}
                >
                    Home
                    <span 
                        className={`absolute bottom-0 left-0 h-[2.5px] bg-[#C34A15] rounded-full transition-all duration-300 ${
                            isActive('/home') ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} 
                    />
                </Link>
                <Link 
                    href={ordersLink} 
                    className={`group relative pb-1 transition-colors duration-200 ${
                        isActive(ordersLink) ? 'text-[#C34A15] font-bold' : 'text-neutral-600 hover:text-[#C34A15]'
                    }`}
                >
                    Orders
                    <span 
                        className={`absolute bottom-0 left-0 h-[2.5px] bg-[#C34A15] rounded-full transition-all duration-300 ${
                            isActive(ordersLink) ? 'w-full' : 'w-0 group-hover:w-full'
                        }`} 
                    />
                </Link>
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
                        className="bg-transparent border-none text-sm w-full outline-none"
                    />
                </form>

                {isFocused && (
                    <div className="absolute top-12 left-0 w-full bg-white border border-neutral-100 shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-2xl p-4 z-50 flex flex-col gap-4">
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
                        <Bell size={20} className="cursor-pointer hover:text-[#C34A15]" />
                        <ShoppingBag size={20} className="cursor-pointer hover:text-[#C34A15]" />
                        <Link href={dashboardLink}>
                            <User size={20} className={`cursor-pointer ${isActive(dashboardLink) ? 'text-[#C34A15]' : ''}`} />
                        </Link>
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