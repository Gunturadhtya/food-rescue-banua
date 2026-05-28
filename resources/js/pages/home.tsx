import { Head } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { RestaurantCard } from '@/components/frontend/restaurant-card';

// Define the shape of the data coming from Laravel
interface ActiveRescue {
    id: number;
    shop_name: string;
    address: string;
    savings_amount: number;
    weight_kg: number;
    image: string;
}

interface Props {
    activeRescues: ActiveRescue[];
}

export default function Home({ activeRescues }: Props) {
    return (
        <HomeLayout>
            <Head title="Home" />
            <NavBar />

            <main className="px-12 py-6">
                <section className="relative h-[450px] w-full overflow-hidden rounded-[32px] bg-orange-700">
                    <img src="/images/hero-bg.jpg" className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex flex-col justify-center px-12 bg-gradient-to-r from-black/60 to-transparent">
                        <span className="bg-yellow-400 w-fit px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest mb-4">Penawaran Terbatas</span>
                        <h1 className="text-6xl font-bold text-white leading-tight">The Golden Hour<br />Of Dining.</h1>
                        <p className="text-white mt-4 font-medium">Flash sale mulai dalam: <span className="font-bold">02 : 15 : 30</span></p>
                        <button className="mt-8 w-fit rounded-full bg-yellow-300 px-8 py-4 font-bold text-black hover:bg-yellow-400">PESAN SEKARANG</button>
                    </div>
                </section>

                <section className="py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold">Active Rescues</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {activeRescues.length > 0 ? (
                            activeRescues.map((item) => (
                                <RestaurantCard
                                    key={item.id}
                                    name={item.shop_name}
                                    distance={item.address}
                                    discount={`Save Rp ${item.savings_amount.toLocaleString('id-ID')}`}
                                    price={`${item.weight_kg} kg`}
                                    image={item.image}
                                />
                            ))
                        ) : (
                            <div className="col-span-full py-12 text-center text-neutral-500 bg-white rounded-3xl border border-dashed border-gray-200">
                                No active rescues available right now. Check back later!
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