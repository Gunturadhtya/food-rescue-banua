import React from 'react';
import { Head, Link } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { MapPin, ShoppingCart, Leaf, ChevronDown } from 'lucide-react';

export default function RescueDetail({ id }: { id: string }) {
    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Head title="Crystal Bakery - Food Rescue Banua" />
            <NavBar />

            <main className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* KOLOM KIRI (7/12) */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Hero Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-neutral-200">
                            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop" className="h-full w-full object-cover" alt="Crystal Bakery" />
                            <div className="absolute bottom-8 left-8">
                                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 text-[10px] font-bold uppercase rounded-full">Top Rated</span>
                                <h1 className="text-4xl font-extrabold text-white mt-2">Crystal Bakery</h1>
                            </div>
                        </div>

                        {/* GRID UNTUK ABOUT + PICKUP DI KIRI, DAN MAP DI KANAN */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* BLOK KIRI: About & Pickup Point */}
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#C34A15]">About the Baker</h2>
                                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                                        Crystal Bakery is a beloved cake shop that has established multiple branches, becoming a go-to destination for locals in Banjarmasin seeking an array of delightful pastries and baked goods.
                                    </p>
                                </div>

                                {/* Kartu Vertikal (DITUMPUK) */}
                                <div className="flex flex-col gap-3">
                                    <div className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-neutral-100 shadow-sm">
                                        <MapPin className="text-neutral-400 w-5 h-5" />
                                        <div>
                                            <p className="text-[9px] font-bold uppercase text-neutral-400">Pickup Point</p>
                                            <p className="text-xs font-bold text-gray-900">Jl. Bumi Mas Raya No.3, Pemurus Baru</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#FDEFE9] p-4 rounded-2xl flex items-center gap-3 border border-[#F5D5C6]">
                                        <ShoppingCart className="text-[#C34A15] w-5 h-5" />
                                        <div>
                                            <p className="text-[9px] font-bold uppercase text-[#C34A15]">Logistics</p>
                                            <p className="text-xs font-bold text-[#C34A15]">Ambil Sendiri</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* PETA (Di sebelah About) */}
                            <div className="w-full h-[320px] rounded-3xl overflow-hidden border border-neutral-100">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80" className="h-full w-full object-cover" alt="Map" />
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Sticky Purchase Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 bg-white p-8 rounded-[32px] border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            {/* ... (isi kartu kanan tetap sama) ... */}
                            <h2 className="text-2xl font-bold text-gray-900">Crystal Bakery</h2>
                            <p className="text-xs text-neutral-500 mb-6">Mystery Box Selection</p>
                            <div className="bg-[#1D2B36] rounded-[24px] p-8 mb-6 flex justify-center">
                                <img src="/images/mystery-box.png" className="w-40 object-contain" alt="Mystery Box" />
                            </div>
                            <div className="flex justify-between items-end mb-6">
                                <div><p className="text-xs line-through text-neutral-400">Rp 35.000</p><p className="text-3xl font-extrabold text-gray-900">Rp 25.000</p></div>
                                <p className="text-sm font-bold text-[#8C9B50]">600g Rescued</p>
                            </div>
                            <Link href={`/checkout/${id}`} className="w-full block text-center bg-[#C34A15] text-white py-4 rounded-full font-bold hover:bg-[#A33D10]">Pre-Order Mystery Box</Link>
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}

RescueDetail.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;