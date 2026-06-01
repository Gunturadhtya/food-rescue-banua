import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { MapPin, ShoppingCart, Minus, Plus } from 'lucide-react';

interface Shop {
    id: number;
    name: string;
    address: string;
    description?: string;
    image_path?: string;
}

interface Rescue {
    id: number;
    shop: Shop;
    price: number;
    weight_kg: number;
    status: 'active' | 'claimed' | string;
    pcs: number;
}

interface Props {
    rescue: Rescue;
}

export default function RescueDetail({ rescue }: Props) {
    const [quantity, setQuantity] = useState<number>(1);

    const sellingPrice = Number(rescue.price);
    const totalPrice = sellingPrice * quantity;
    const totalWeight = Number(rescue.weight_kg) * quantity;

    const shopImage = rescue.shop.image_path || "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop";

    const increment = () => setQuantity((q) => (q < rescue.pcs ? q + 1 : q));
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const isSoldOut = rescue.pcs < 1 || rescue.status !== 'active';

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Head title={`${rescue.shop.name} - Food Rescue Banua`} />
            <NavBar />

            <main className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* KOLOM KIRI (7/12) */}
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        {/* Hero Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-neutral-200">
                            <img src={shopImage} className="h-full w-full object-cover" alt={rescue.shop.name} />
                            <div className="absolute bottom-8 left-8">
                                <span className="bg-yellow-400 text-yellow-900 px-3 py-1 text-[10px] font-bold uppercase rounded-full">Top Rated</span>
                                <h1 className="text-4xl font-extrabold text-white mt-2">{rescue.shop.name}</h1>
                            </div>
                        </div>

                        {/* GRID UNTUK ABOUT + PICKUP DI KIRI, DAN MAP DI KANAN */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                            {/* BLOK KIRI: About & Pickup Point */}
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-[#C34A15]">About the Baker</h2>
                                    <p className="mt-3 text-sm text-neutral-600 leading-relaxed">
                                        {rescue.shop.description || "A beloved local shop offering a variety of rescued food items."}
                                    </p>
                                </div>

                                {/* Kartu Vertikal (DITUMPUK) */}
                                <div className="flex flex-col gap-3">
                                    <div className="bg-white p-4 rounded-2xl flex items-center gap-3 border border-neutral-100 shadow-sm">
                                        <MapPin className="text-neutral-400 w-5 h-5" />
                                        <div>
                                            <p className="text-[9px] font-bold uppercase text-neutral-400">Pickup Point</p>
                                            <p className="text-xs font-bold text-gray-900">{rescue.shop.address}</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#FDEFE9] p-4 rounded-2xl flex items-center gap-3 border border-[#F5D5C6]">
                                        <ShoppingCart className="text-[#C34A15] w-5 h-5" />
                                        <div>
                                            <p className="text-[9px] font-bold uppercase text-[#C34A15]">Logistics</p>
                                            <p className="text-xs font-bold text-[#C34A15]">Self Pickup</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PETA (Di sebelah About) */}
                            <div className="w-full h-[320px] rounded-3xl overflow-hidden border border-neutral-100">
                                <img src="/images/map-preview.png" className="h-full w-full object-cover" alt="Map" />
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Sticky Purchase Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 bg-white p-8 rounded-[32px] border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            <h2 className="text-2xl font-bold text-gray-900">{rescue.shop.name}</h2>
                            <p className="text-xs text-neutral-500 mb-6">Mystery Box Selection</p>

                            <div className="bg-[#1D2B36] rounded-[24px] p-8 mb-6 flex justify-center">
                                <img src="/images/mystery-box.png" className="w-40 object-contain" alt="Mystery Box" />
                            </div>

                            {/* Quantity Selector */}
                            {!isSoldOut && (
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-neutral-100">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">Quantity</span>
                                        <span className="text-xs text-neutral-500">{rescue.pcs} bags available</span>
                                    </div>
                                    <div className="flex items-center gap-4 bg-neutral-50 rounded-full p-1 border border-neutral-200">
                                        <button
                                            onClick={decrement}
                                            disabled={quantity <= 1}
                                            className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 disabled:opacity-40 hover:bg-neutral-100 transition-colors shadow-sm"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <span className="font-bold w-6 text-center text-gray-900">{quantity}</span>
                                        <button
                                            onClick={increment}
                                            disabled={quantity >= rescue.pcs}
                                            className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 disabled:opacity-40 hover:bg-neutral-100 transition-colors shadow-sm"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900">Rp{Number(totalPrice).toLocaleString('id-ID')},00</p>
                                </div>
                                <p className="text-sm font-bold text-[#8C9B50]">{totalWeight.toFixed(2)} kg Rescued</p>
                            </div>

                            {isSoldOut ? (
                                <button
                                    disabled
                                    className="w-full block text-center bg-neutral-300 text-neutral-500 py-4 rounded-full font-bold cursor-not-allowed"
                                >
                                    Sold Out
                                </button>
                            ) : (
                                <Link
                                    href={`/checkout/${rescue.id}?quantity=${quantity}`}
                                    className="w-full block text-center bg-[#C34A15] text-white py-4 rounded-full font-bold hover:bg-[#A33D10] transition-colors"
                                >
                                    Pre-Order Mystery Box
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <SiteFooter />
        </div>
    );
}

RescueDetail.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;