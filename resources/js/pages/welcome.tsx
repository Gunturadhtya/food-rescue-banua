import { Head, Link } from '@inertiajs/react';
import { Leaf, Heart, ShieldCheck, ArrowRight, Store, TrendingDown } from 'lucide-react';

export default function Welcome() {
    return (
        <div className="flex min-h-screen lg:h-screen w-full flex-col lg:flex-row bg-[#FDF8F0] font-sans antialiased overflow-y-auto lg:overflow-hidden">
            <Head title="Welcome" />

            {/* Left Column: Brand & Hero CTA */}
            <div className="flex w-full flex-col justify-between p-8 sm:p-12 lg:w-1/2 xl:p-16">
                {/* Header Logo */}
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C34A15]/10 text-[#C34A15]">
                        <Leaf className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-extrabold tracking-tight text-[#C34A15] italic">
                        Food Rescue Banua
                    </span>
                </div>

                {/* Main Hero Content Area */}
                <div className="my-auto py-6 lg:py-4 xl:py-8 max-w-lg">
                    {/* Welcome Pill */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#C34A15]/10 px-4 py-1.5 text-xs font-semibold text-[#C34A15] mb-6 border border-[#C34A15]/20 transition-all hover:bg-[#C34A15]/15">
                        <span>🌱</span> Reducing Food Waste Together
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#C34A15] leading-tight">
                        Rescue Surplus Food, <br className="hidden sm:inline" />
                        <span className="text-gray-900">Help the Community</span>
                    </h1>

                    <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
                        Get high-quality food from your favorite local merchants at more affordable prices, while playing an active role in reducing food waste in Banua.
                    </p>

                    {/* Features Grid */}
                    <div className="mt-6 xl:mt-8 space-y-3 xl:space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C34A15]/10 text-[#C34A15]">
                                <Store className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">From Trusted Merchants</h3>
                                <p className="text-xs text-gray-500 mt-0.5">High-quality surplus products from selected local bakeries, cafes, and restaurants.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C34A15]/10 text-[#C34A15]">
                                <TrendingDown className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Save Money</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Enjoy discounts of up to 50% or more on perfectly delicious and safe-to-eat meals.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C34A15]/10 text-[#C34A15]">
                                <ShieldCheck className="h-4.5 w-4.5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Reduce Food Waste</h3>
                                <p className="text-xs text-gray-500 mt-0.5">Small steps lead to a massive collective impact for a greener, cleaner earth.</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="mt-6 xl:mt-10 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#C34A15] px-8 py-3.5 text-base font-bold text-white transition-all shadow-[0_4px_14px_rgba(195,74,21,0.35)] hover:bg-[#A33D10] hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Log In
                            <ArrowRight className="h-5 w-5" />
                        </Link>

                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center rounded-full border-2 border-[#C34A15] px-8 py-3.5 text-base font-bold text-[#C34A15] transition-all hover:bg-[#C34A15]/5 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>

                {/* Footer Message */}
                <div className="text-xs text-gray-400 mt-auto pt-4">
                    &copy; {new Date().getFullYear()} Food Rescue Banua. All rights reserved.
                </div>
            </div>

            {/* Right Column: Beautiful Image & Status Banner */}
            <div className="relative hidden w-1/2 lg:block">
                <img
                    src="/images/welcome-hero.png"
                    alt="Food Rescue Banua Hero"
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Rich Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-[#C34A15]/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>

                {/* Floating Content / Widgets */}
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    <div className="self-end rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white shadow-lg flex items-center gap-2">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        <span>Sustainable Banua</span>
                    </div>

                    <div className="mb-8 max-w-md space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
                                Save Food, <br />
                                Reduce Waste.
                            </h2>
                            <p className="text-sm text-gray-200 font-medium">
                                "Every meal rescued makes a real difference in reducing greenhouse gases and saving our environment."
                            </p>
                        </div>

                        {/* Floating Impact Card */}
                        <div className="rounded-2xl border border-white/10 bg-black/45 p-5 backdrop-blur-lg shadow-2xl flex items-center gap-4 max-w-xs">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C34A15] text-white">
                                <Store className="h-5.5 w-5.5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Active Partners</p>
                                <p className="text-lg font-black text-[#EAB308] mt-0.5">50+ Local Merchants</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Welcome.layout = (page: any) => page;

