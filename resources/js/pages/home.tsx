import { Head, Link } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { RestaurantCard } from '@/components/frontend/restaurant-card';
import { show as showRescue } from '@/actions/App/Http/Controllers/RescueController';
import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface ActiveRescue {
    id: number;
    shop_name: string;
    address: string;
    price: number;
    weight_kg: number;
    image: string;
    description: string;
}

interface Props {
    activeRescues: ActiveRescue[];
}

export default function Home({ activeRescues }: Props) {
    const [current, setCurrent] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragging, setDragging] = useState(false);
    const startX = useRef<number | null>(null);
    const total = activeRescues.length;

    const goTo = (i: number) => {
        setCurrent((i + total) % total);
        setDragOffset(0);
    };

    // Mouse
    const onMouseDown = (e: React.MouseEvent) => {
        startX.current = e.clientX;
        setDragging(true);
    };
    const onMouseMove = (e: React.MouseEvent) => {
        if (!dragging || startX.current === null) return;
        setDragOffset(e.clientX - startX.current);
    };
    const onMouseUp = (e: React.MouseEvent) => {
        if (startX.current === null) return;
        const diff = startX.current - e.clientX;
        if (diff > 60) goTo(current + 1);
        else if (diff < -60) goTo(current - 1);
        else setDragOffset(0);
        startX.current = null;
        setDragging(false);
    };

    // Touch
    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };
    const onTouchMove = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        setDragOffset(e.touches[0].clientX - startX.current);
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (startX.current === null) return;
        const diff = startX.current - e.changedTouches[0].clientX;
        if (diff > 60) goTo(current + 1);
        else if (diff < -60) goTo(current - 1);
        else setDragOffset(0);
        startX.current = null;
    };

    return (
        <HomeLayout>
            <Head title="Home" />
            <NavBar />

            <main className="px-12 py-6">
                {/* Hero Carousel */}
                <div
                    className="relative h-[450px] w-full overflow-hidden rounded-[32px] cursor-default select-none bg-neutral-900"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={() => { if (dragging) { setDragOffset(0); setDragging(false); startX.current = null; } }}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {total > 0 ? (
                        <>
                            <div
                                className="flex h-full"
                                style={{
                                    width: `${total * 100}%`,
                                    transform: `translateX(calc(${-(current * 100) / total}% + ${dragOffset}px))`,
                                    transition: dragging ? 'none' : 'transform 0.45s ease',
                                }}
                            >
                                {activeRescues.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative h-full bg-orange-700"
                                        style={{ width: `${100 / total}%` }}
                                    >
                                        <img
                                            src={item.image}
                                            className="h-full w-full object-cover opacity-80 pointer-events-none"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-center px-12 bg-gradient-to-r from-black/60 to-transparent">
                                            <span className="bg-yellow-400 w-fit px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                                                Penawaran Terbatas
                                            </span>
                                            <h1 className="text-5xl font-bold text-white leading-tight">
                                                {item.shop_name}
                                            </h1>
                                            <p className="text-white/80 mt-2 text-sm">{item.address}</p>
                                            <p className="text-white mt-3 font-medium">
                                                Hemat{' '}
                                                <span className="font-bold text-yellow-300">
                                                    Rp {item.price.toLocaleString('id-ID')}
                                                </span>{' '}
                                                · {item.weight_kg} kg tersedia
                                            </p>
                                            <Link
                                                href={showRescue.url(item.id)}
                                                className="mt-8 w-fit rounded-full bg-yellow-300 px-8 py-4 font-bold text-black hover:bg-yellow-400 transition-colors pointer-events-auto"
                                                draggable={false}
                                                onClick={(e) => { if (Math.abs(dragOffset) > 5) e.preventDefault(); }}
                                            >
                                                PESAN SEKARANG
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Prev / Next */}
                            {total > 1 && (
                                <>
                                    <button
                                        onClick={() => goTo(current - 1)}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition z-10"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={() => goTo(current + 1)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition z-10"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Dots */}
                            {total > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {activeRescues.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => goTo(i)}
                                            className={`h-2 rounded-full transition-all ${i === current ? 'w-6 bg-yellow-300' : 'w-2 bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="relative h-full bg-neutral-800">
                            <img src="/images/hero-bg.jpg" className="h-full w-full object-cover opacity-30 pointer-events-none grayscale" draggable={false} />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <span className="bg-neutral-600/80 backdrop-blur-sm text-white w-fit px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4">
                                    Stok Kosong
                                </span>
                                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                                    Semua Makanan<br />Telah Diselamatkan.
                                </h1>
                                <p className="text-neutral-300 mt-4 max-w-lg text-sm md:text-base">
                                    Saat ini tidak ada surprise bag yang tersedia. Mitra kami sedang mempersiapkan porsi baru. Silakan cek kembali beberapa saat lagi.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="mt-8 flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black hover:bg-neutral-200 transition-colors pointer-events-auto"
                                >
                                    <RefreshCw size={18} />
                                    REFRESH HALAMAN
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Active Rescues */}
                <section className="py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Active Rescues</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {total > 0 ? (
                            activeRescues.map((item) => (
                                <Link key={item.id} href={showRescue.url(item.id)} className="block transition-transform duration-300 hover:-translate-y-2">
                                    <RestaurantCard
                                        name={item.shop_name}
                                        distance={item.address}
                                        discount={`Save Rp ${item.price.toLocaleString('id-ID')}`}
                                        price={`${item.weight_kg} kg`}
                                        image={item.image}
                                    />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-3xl border border-dashed border-neutral-300">
                                <p className="text-neutral-500 font-medium text-lg">Belum ada rescue aktif saat ini.</p>
                                <p className="text-neutral-400 text-sm mt-1">Kami akan menampilkan daftar restoran segera setelah stok tersedia!</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <SiteFooter />
        </HomeLayout>
    );
}

Home.layout = (page: any) => page;