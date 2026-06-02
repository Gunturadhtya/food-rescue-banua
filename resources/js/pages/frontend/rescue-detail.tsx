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

    const shopImage =
        rescue.shop.image_path ||
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop';

    const increment = () => setQuantity((q) => (q < rescue.pcs ? q + 1 : q));
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    const isSoldOut = rescue.pcs < 1 || rescue.status !== 'active';

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Head title={`${rescue.shop.name} - Food Rescue Banua`} />
            <NavBar />

            <main className="mx-auto max-w-7xl px-8 py-10">
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    {/* KOLOM KIRI (7/12) */}
                    <div className="flex flex-col gap-8 lg:col-span-7">
                        {/* Hero Image */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-neutral-200">
                            <img
                                src={shopImage}
                                className="h-full w-full object-cover"
                                alt={rescue.shop.name}
                            />
                            <div className="absolute bottom-8 left-8">
                                <span className="rounded-full bg-yellow-400 px-3 py-1 text-[10px] font-bold text-yellow-900 uppercase">
                                    Top Rated
                                </span>
                                <h1 className="mt-2 text-4xl font-extrabold text-white">
                                    {rescue.shop.name}
                                </h1>
                            </div>
                        </div>

                        {/* GRID UNTUK ABOUT + PICKUP DI KIRI, DAN MAP DI KANAN */}
                        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                            {/* BLOK KIRI: About & Pickup Point */}
                            <div className="flex flex-col gap-8">
                                <div>
                                    <h2 className="text-[10px] font-bold tracking-widest text-[#C34A15] uppercase">
                                        About the Baker
                                    </h2>
                                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                                        {rescue.shop.description ||
                                            'A beloved local shop offering a variety of rescued food items.'}
                                    </p>
                                </div>

                                {/* Kartu Vertikal (DITUMPUK) */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm">
                                        <MapPin className="h-5 w-5 text-neutral-400" />
                                        <div>
                                            <p className="text-[9px] font-bold text-neutral-400 uppercase">
                                                Pickup Point
                                            </p>
                                            <p className="text-xs font-bold text-gray-900">
                                                {rescue.shop.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 rounded-2xl border border-[#F5D5C6] bg-[#FDEFE9] p-4">
                                        <ShoppingCart className="h-5 w-5 text-[#C34A15]" />
                                        <div>
                                            <p className="text-[9px] font-bold text-[#C34A15] uppercase">
                                                Logistics
                                            </p>
                                            <p className="text-xs font-bold text-[#C34A15]">
                                                Self Pickup
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PETA (Di sebelah About) */}
                            <div className="h-[320px] w-full overflow-hidden rounded-3xl border border-neutral-100">
                                <img
                                    src="/images/map-preview.png"
                                    className="h-full w-full object-cover"
                                    alt="Map"
                                />
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: Sticky Purchase Card */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-10 rounded-[32px] border border-neutral-100 bg-white p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {rescue.shop.name}
                            </h2>
                            <p className="mb-6 text-xs text-neutral-500">
                                Mystery Box Selection
                            </p>

                            <div className="mb-6 flex justify-center rounded-[24px] bg-[#1D2B36] p-8">
                                <img
                                    src="/images/mystery-box.png"
                                    className="w-40 object-contain"
                                    alt="Mystery Box"
                                />
                            </div>

                            {/* Quantity Selector */}
                            {!isSoldOut && (
                                <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-6">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">
                                            Quantity
                                        </span>
                                        <span className="text-xs text-neutral-500">
                                            {rescue.pcs} bags available
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 rounded-full border border-neutral-200 bg-neutral-50 p-1">
                                        <button
                                            onClick={decrement}
                                            disabled={quantity <= 1}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-100 disabled:opacity-40"
                                        >
                                            <Minus className="h-4 w-4" />
                                        </button>
                                        <span className="w-6 text-center font-bold text-gray-900">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={increment}
                                            disabled={quantity >= rescue.pcs}
                                            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-600 shadow-sm transition-colors hover:bg-neutral-100 disabled:opacity-40"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="mb-6 flex items-end justify-between">
                                <div>
                                    <p className="text-3xl font-extrabold text-gray-900">
                                        Rp
                                        {Number(totalPrice).toLocaleString(
                                            'id-ID',
                                        )}
                                        ,00
                                    </p>
                                </div>
                                <p className="text-sm font-bold text-[#8C9B50]">
                                    {totalWeight.toFixed(2)} kg Rescued
                                </p>
                            </div>

                            {isSoldOut ? (
                                <button
                                    disabled
                                    className="block w-full cursor-not-allowed rounded-full bg-neutral-300 py-4 text-center font-bold text-neutral-500"
                                >
                                    Sold Out
                                </button>
                            ) : (
                                <Link
                                    href={`/checkout/${rescue.id}?quantity=${quantity}`}
                                    className="block w-full rounded-full bg-[#C34A15] py-4 text-center font-bold text-white transition-colors hover:bg-[#A33D10]"
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

RescueDetail.layout = (page: React.ReactNode) => (
    <HomeLayout>{page}</HomeLayout>
);
