import { Link, usePage } from '@inertiajs/react'; // Tambahkan usePage di sini
import { Search, Bell, ShoppingBag, User } from 'lucide-react';
import { login, register } from '@/routes';

export function NavBar() {
    const { auth } = usePage().props as any;
    const { url } = usePage(); 
    const isActive = (path: string) => url.startsWith(path);

    return (
        <nav className="flex items-center justify-between px-12 py-6">
            <Link href="/home" className="text-xl font-extrabold italic text-[#C34A15]">
                Food Rescue Banua
            </Link>

            <div className="flex gap-8 font-medium text-sm">
                <Link 
                    href="/home" 
                    className={isActive('/home') || isActive('/rescue/') ? 'text-[#C34A15] font-bold' : 'hover:text-[#C34A15]'}
                >
                    Home
                </Link>
                <Link 
                    href="/orders" 
                    className={isActive('/orders') ? 'text-[#C34A15] font-bold' : 'hover:text-[#C34A15]'}
                >
                    Orders
                </Link>
                <Link 
                    href="/profile" 
                    className={isActive('/profile') ? 'text-[#C34A15] font-bold' : 'hover:text-[#C34A15]'}
                >
                    Profile
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-[#F2EDE5] px-4 py-2 rounded-full w-64">
                <Search size={18} className="text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for merchant or dish"
                    className="bg-transparent border-none text-sm w-full outline-none"
                />
            </div>

            <div className="flex gap-4 items-center">
                {auth.user ? (
                    <>
                        <Bell size={20} className="cursor-pointer hover:text-[#C34A15]" />
                        <ShoppingBag size={20} className="cursor-pointer hover:text-[#C34A15]" />
                        <Link href="/profile">
                            <User size={20} className={`cursor-pointer ${isActive('/profile') ? 'text-[#C34A15]' : ''}`} />
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