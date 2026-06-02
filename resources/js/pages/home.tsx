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
                    className="relative h-[450px] w-full cursor-default overflow-hidden rounded-[32px] bg-neutral-900 select-none"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={() => {
                        if (dragging) {
                            setDragOffset(0);
                            setDragging(false);
                            startX.current = null;
                        }
                    }}
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
                                    transition: dragging
                                        ? 'none'
                                        : 'transform 0.45s ease',
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
                                            className="pointer-events-none h-full w-full object-cover opacity-80"
                                            draggable={false}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-center bg-gradient-to-r from-black/60 to-transparent px-12">
                                            <span className="mb-4 w-fit rounded-md bg-yellow-400 px-3 py-1 text-xs font-bold tracking-widest uppercase">
                                                Limited Offer
                                            </span>
                                            <h1 className="text-5xl leading-tight font-bold text-white">
                                                {item.shop_name}
                                            </h1>
                                            <p className="mt-2 text-sm text-white/80">
                                                {item.address}
                                            </p>
                                            <p className="mt-3 font-medium text-white">
                                                Save{' '}
                                                <span className="font-bold text-yellow-300">
                                                    Rp
                                                    {Number(
                                                        item.price,
                                                    ).toLocaleString('id-ID')}
                                                    ,00
                                                </span>{' '}
                                                · {item.weight_kg} kg available
                                            </p>
                                            <Link
                                                href={showRescue.url(item.id)}
                                                className="pointer-events-auto mt-8 w-fit rounded-full bg-yellow-300 px-8 py-4 font-bold text-black transition-colors hover:bg-yellow-400"
                                                draggable={false}
                                                onClick={(e) => {
                                                    if (
                                                        Math.abs(dragOffset) > 5
                                                    )
                                                        e.preventDefault();
                                                }}
                                            >
                                                ORDER NOW
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
                                        className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={() => goTo(current + 1)}
                                        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Dots */}
                            {total > 1 && (
                                <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
                            <img
                                src="/images/hero-bg.jpg"
                                className="pointer-events-none h-full w-full object-cover opacity-30 grayscale"
                                draggable={false}
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/40 to-transparent px-12 text-center">
                                <span className="mb-4 w-fit rounded-md bg-neutral-600/80 px-3 py-1 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-sm">
                                    Out of Stock
                                </span>
                                <h1 className="text-5xl leading-tight font-bold text-white md:text-6xl">
                                    All Food
                                    <br />
                                    Has Been Rescued.
                                </h1>
                                <p className="mt-4 max-w-lg text-sm text-neutral-300 md:text-base">
                                    There are currently no surprise bags
                                    available. Our partners are preparing new
                                    portions. Please check back in a moment.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="pointer-events-auto mt-8 flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-black transition-colors hover:bg-neutral-200"
                                >
                                    <RefreshCw size={18} />
                                    REFRESH PAGE
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Active Rescues */}
                <section className="py-12">
                    <div className="mb-8 flex items-center justify-between">
                        <h2 className="text-3xl font-bold">Active Rescues</h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {total > 0 ? (
                            activeRescues.map((item) => (
                                <Link
                                    key={item.id}
                                    href={showRescue.url(item.id)}
                                    className="block transition-transform duration-300 hover:-translate-y-2"
                                >
                                    <RestaurantCard
                                        name={item.shop_name}
                                        distance={item.address}
                                        discount={`Save Rp${Number(item.price).toLocaleString('id-ID')},00`}
                                        price={`${item.weight_kg} kg`}
                                        image={item.image}
                                    />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-300 bg-white py-16 text-center">
                                <p className="text-lg font-medium text-neutral-500">
                                    No active rescues at the moment.
                                </p>
                                <p className="mt-1 text-sm text-neutral-400">
                                    We will display the list of restaurants as
                                    soon as stock becomes available!
                                </p>
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
