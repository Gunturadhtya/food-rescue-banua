import { Head, Link } from '@inertiajs/react';
import { Store, Bell, User, Leaf, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[#FDF8F0] font-sans antialiased flex flex-col">
            <Head title="Food Rescue Banua - Save Food, Save Money" />

            {/* --- GUEST / LANDING PAGE NAVBAR --- */}
            <nav className="w-full bg-[#FDF8F0] px-6 py-5 flex items-center justify-between sticky top-0 z-50 border-b border-neutral-200/50 transition-all">
                {/* Brand Logo */}
                <Link href="/" className="text-xl md:text-2xl font-extrabold text-[#C34A15] font-jakarta tracking-tight italic transition-transform hover:scale-[1.02]">
                    Food Rescue Banua
                </Link>

                {/* Right Actions (Tanpa Donate) */}
                <div className="flex items-center gap-5">
                    <Link href="/login" className="text-sm font-bold text-neutral-700 hover:text-[#C34A15] transition-colors hidden md:block">
                        Log In
                    </Link>
                    <Link href="/register" className="bg-[#C34A15] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#A33D10] transition-colors shadow-sm">
                        Sign Up
                    </Link>
                </div>
            </nav>

            {/* --- MAIN CONTENT --- */}
            <main className="flex-grow">
                {/* 1. HERO SECTION */}
                <section className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
                    {/* Menggunakan tag img agar gambar hero muncul */}
                    <img
                        src="/images/welcome-hero.png"
                        alt="Food Rescue Hero"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>

                    <div className="relative z-10 max-w-4xl text-white mt-10">
                        <h1 className="text-sm md:text-base font-semibold tracking-widest uppercase mb-4 text-neutral-300">
                            Food rescue organization landing page
                        </h1>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-jakarta">
                            Mystery Box: Save 50-70%
                        </h2>
                        <p className="text-lg md:text-xl text-neutral-200 mb-8 max-w-2xl mx-auto">
                            Join our community in Banjarmasin & Banjarbaru. Grab high-quality surplus food mystery boxes from your favorite local UMKM.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/home" className="bg-[#C34A15] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#A33D10] transition-transform hover:scale-105">
                                Explore Mystery Boxes
                            </Link>
                            <a href="#how-it-works" className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-neutral-100 transition-transform hover:scale-105">
                                How It Works
                            </a>
                        </div>
                    </div>
                </section>

                {/* 2. VALUE PROPOSITION SECTION */}
                <section id="about" className="py-20 px-4 md:px-12 bg-[#FCFAF8]">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#8C3411] mb-6 font-jakarta">
                            Our Value Proposition
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            We prioritize Food Safety & Quality through a strict UMKM integrity pact, providing highly price-sensitive solutions perfect for students. Together, we create a sustainable ecosystem that honors every meal.
                        </p>
                    </div>
                </section>

                {/* 3. HOW IT WORKS SECTION */}
                <section id="how-it-works" className="py-12 px-4 md:px-12 bg-[#FCFAF8] pb-24">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#8C3411] text-center mb-16 font-jakarta">
                            How It Works Daily
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-[#C34A15] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                    <Store size={24} />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-gray-900">1. Merchant Uploads</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Local UMKM partners securely upload their surplus food inventory between <strong className="text-gray-900">15:00 - 17:00</strong>.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-[#C34A15]/20 text-[#C34A15] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                    <Bell size={24} />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-gray-900">2. Flash Sale</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Flash Sale opens! Browse and claim mystery boxes from <strong className="text-gray-900">17:00 - 19:30</strong> via broadcast notifications.
                                </p>
                            </div>

                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 text-center hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-[#8C3411] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                    <User size={24} />
                                </div>
                                <h4 className="text-xl font-bold mb-4 text-gray-900">3. Self-Pickup</h4>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Head directly to the merchant for self-pickup between <strong className="text-gray-900">20:00 - 21:30</strong> and enjoy your fresh meal!
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. IMPACT BANNER SECTION */}
                <section className="bg-[#4C754A] py-16 px-4">
                    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-white text-center md:text-left">
                        <div className="w-24 h-24 bg-[#A3CC9E] rounded-full flex items-center justify-center text-[#2A4429] shrink-0 shadow-lg">
                            <Leaf size={48} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-5xl md:text-6xl font-black mb-2 tracking-tight">50kg</h2>
                            <p className="text-xl md:text-2xl opacity-90 font-medium">Reducing Organic Waste in Banua</p>
                        </div>
                    </div>
                </section>

                {/* 5. ACTIVE RESCUES SECTION (Sesuai dengan Seeder) */}
                <section id="merchants" className="py-24 px-4 md:px-12 bg-white">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                            <div>
                                <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-2">Available Nearby</p>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-jakarta">Active Rescues</h2>
                            </div>
                            <Link href="/home" className="text-[#C34A15] font-bold hover:text-[#8C3411] flex items-center gap-2 transition-colors">
                                View All <ArrowRight size={18} />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Merchant 1: Harlina Bakery */}
                            <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <div className="h-48 relative bg-neutral-100">
                                    <img src="/images/harlina-bakery.png" alt="Harlina Bakery" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-[#8C3411] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        Available Now
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">Harlina Bakery</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4 truncate">
                                        <MapPin size={16} className="shrink-0" /> Jl. Hasan Basri, Kayutangi
                                    </p>
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <span className="bg-neutral-100 text-gray-600 px-3 py-1 rounded-md">Bakery</span>
                                        <span className="text-[#8C3411]">Est. 1.2kg</span>
                                    </div>
                                </div>
                            </div>

                            {/* Merchant 2: RM Wong Solo */}
                            <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <div className="h-48 relative bg-neutral-100">
                                    <img src="/images/wong-solo.png" alt="RM Wong Solo" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-[#8C3411] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        Available Now
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">RM Wong Solo</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4 truncate">
                                        <MapPin size={16} className="shrink-0" /> Jl. A. Yani Km 4.5
                                    </p>
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <span className="bg-neutral-100 text-gray-600 px-3 py-1 rounded-md">Meals</span>
                                        <span className="text-[#8C3411]">Est. 2.5kg</span>
                                    </div>
                                </div>
                            </div>

                            {/* Merchant 3: Kopi Janji Banua */}
                            <div className="bg-white rounded-[24px] border border-neutral-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <div className="h-48 relative bg-neutral-100">
                                    <img src="/images/kopi-janji.png" alt="Kopi Janji Banua" className="w-full h-full object-cover" />
                                    <div className="absolute top-4 right-4 bg-[#8C3411] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                                        Available Now
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">Kopi Janji Banua</h3>
                                    <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4 truncate">
                                        <MapPin size={16} className="shrink-0" /> Jl. Lambung Mangkurat
                                    </p>
                                    <div className="flex justify-between items-center text-sm font-semibold">
                                        <span className="bg-neutral-100 text-gray-600 px-3 py-1 rounded-md">Snacks</span>
                                        <span className="text-[#8C3411]">Est. 0.8kg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. BOTTOM CTA SECTION */}
                <section id="volunteers" className="bg-[#C34A15] py-24 px-4 text-center text-white">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-jakarta leading-tight">
                            Join the Food Rescue Movement
                        </h2>
                        <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                            Whether you're a student looking for affordable meals or an UMKM merchant looking to reduce waste, there's a place for you here.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/register" className="w-full sm:w-auto bg-white text-[#C34A15] px-8 py-4 rounded-full font-bold shadow-lg hover:bg-neutral-100 transition-transform hover:scale-105">
                                Join as Mahasiswa/Buyer
                            </Link>
                            <Link href="/seller/shop/create" className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-transform hover:scale-105">
                                Partner as UMKM Merchant
                            </Link>
                        </div>
                        <div className="mt-8 flex flex-col items-center justify-center gap-2 text-sm text-white/80 font-medium">
                            <div className="flex items-center gap-2">
                                <ShieldCheck size={16} /> Secure payments via QRIS & Bank Transfer
                            </div>
                            <div className="flex items-center gap-2">
                                <Store size={16} /> Merchants enjoy Friday Weekly Settlements
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* --- CUSTOM LANDING PAGE FOOTER (DARI KODEMU) --- */}
            <footer className="border-t border-neutral-200 bg-[#FDF8F0] px-6 md:px-12 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <h3 className="mb-4 text-xl font-extrabold text-[#C34A15] italic font-jakarta">
                            Food Rescue Banua
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed pr-4">
                            Elevating surplus food into culinary discovery. Save more, waste less.
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-4 font-bold text-gray-900">Explore</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-sm text-gray-600 hover:text-[#C34A15] transition-colors">Merchant Map</Link>
                            <Link href="#" className="text-sm text-gray-600 hover:text-[#C34A15] transition-colors">Flash Sales</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 font-bold text-gray-900">Community</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-sm text-gray-600 hover:text-[#C34A15] transition-colors">Partner With Us</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="mb-4 font-bold text-gray-900">Support</h4>
                        <div className="flex flex-col gap-2">
                            <Link href="#" className="text-sm text-gray-600 hover:text-[#C34A15] transition-colors">Help Center</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

Welcome.layout = (page: React.ReactNode) => page;