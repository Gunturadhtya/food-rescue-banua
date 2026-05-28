import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { QrCode, Landmark, ArrowRight, ShoppingBag, AlertCircle, MapPin } from 'lucide-react';

export default function Checkout({ id }: { id: string }) {
    const [paymentMethod, setPaymentMethod] = useState('qris');

    return (
        <div className="min-h-screen bg-[#FDFBF7]">
            <Head title="Selesaikan Rescue - Food Rescue Banua" />
            <NavBar />

            <main className="mx-auto max-w-7xl px-8 py-10">
                <div className="mb-10">
                    <h1 className="font-jakarta text-4xl font-bold text-gray-900">Selesaikan Rescue</h1>
                    <p className="mt-2 text-sm font-medium text-neutral-500">Tinjau ulang pesanan Mu dan amankan makanan Mu</p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
                    
                    {/* BAGIAN KIRI: Ringkasan & Map */}
                    <div className="flex flex-col gap-6 lg:col-span-7">
                        {/* Inline Ringkasan Pesanan */}
                        <div className="rounded-[32px] bg-[#F6F4F0] p-8">
                            <div className="mb-6 flex items-center gap-2 text-gray-800">
                                <ShoppingBag className="h-5 w-5 text-[#C34A15]" />
                                <h2 className="text-xl font-bold">Ringkasan Pesanan</h2>
                            </div>
                            <div className="flex items-start gap-6">
                                <div className="h-24 w-24 rounded-2xl bg-[#1D2B36] flex items-center justify-center p-2">
                                    <img src="/images/mystery-box.png" alt="Mystery Box" className="object-contain h-full" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">Crystal Bakery Mystery Box</h3>
                                    <p className="text-sm text-neutral-500">Jl. Bumi Mas Raya No.3, Pemurus Baru • 1.2km away</p>
                                    <div className="mt-3 flex gap-2">
                                        <span className="bg-neutral-200/60 px-2 py-1 text-[10px] font-bold uppercase text-neutral-600 rounded-md">Jumlah: 1</span>
                                        <span className="bg-yellow-400 px-2 py-1 text-[10px] font-bold uppercase text-yellow-900 rounded-md">Flash Sale</span>
                                    </div>
                                </div>
                                <div className="text-xl font-bold text-[#C34A15]">Rp 25.000</div>
                            </div>
                            <div className="mt-8 rounded-2xl border border-[#C34A15] bg-white p-5">
                                <div className="flex gap-4">
                                    <AlertCircle className="h-6 w-6 text-[#C34A15]" />
                                    <div>
                                        <h4 className="text-[11px] font-bold uppercase text-[#C34A15]">Strictly Self-Pickup Window</h4>
                                        <p className="text-xl font-extrabold text-gray-900">20:00 - 21:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inline Pickup Point */}
                        <div className="rounded-[32px] bg-[#F6F4F0] p-8">
                            <h2 className="text-xl font-bold text-gray-900">Pickup Point</h2>
                            <p className="mb-6 mt-2 text-sm font-medium text-neutral-600">Jl. Bumi Mas Raya No.3, Pemurus Baru</p>
                            <div className="h-48 w-full overflow-hidden rounded-[24px] bg-neutral-300">
                                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80" className="h-full w-full object-cover" alt="Map" />
                            </div>
                        </div>
                    </div>

                    {/* BAGIAN KANAN: Detail Pembayaran (TIDAK STICKY) */}
                    <div className="lg:col-span-5">
                        <div className="rounded-[32px] bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                            <h2 className="mb-6 font-jakarta text-2xl font-bold text-gray-900">Detail Pembayaran</h2>
                            
                            <div className="mb-8 flex flex-col gap-3">
                                <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${paymentMethod === 'qris' ? 'border-[#C34A15] bg-[#FFF8F5]' : 'border-transparent bg-[#F6F4F0]'}`}>
                                    <div className="flex items-center gap-3 font-bold"><QrCode size={20}/> QRIS</div>
                                    <input type="radio" className="hidden" onChange={() => setPaymentMethod('qris')} checked={paymentMethod === 'qris'} />
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === 'qris' ? 'border-[#C34A15]' : 'border-neutral-300'}`}>
                                        {paymentMethod === 'qris' && <div className="h-2.5 w-2.5 rounded-full bg-[#C34A15]"></div>}
                                    </div>
                                </label>

                                <label className={`flex cursor-pointer items-center justify-between rounded-2xl border-2 p-4 transition-all ${paymentMethod === 'bank' ? 'border-[#C34A15] bg-[#FFF8F5]' : 'border-transparent bg-[#F6F4F0]'}`}>
                                    <div className="flex items-center gap-3 font-bold"><Landmark size={20}/> Transfer Bank</div>
                                    <input type="radio" className="hidden" onChange={() => setPaymentMethod('bank')} checked={paymentMethod === 'bank'} />
                                    <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${paymentMethod === 'bank' ? 'border-[#C34A15]' : 'border-neutral-300'}`}>
                                        {paymentMethod === 'bank' && <div className="h-2.5 w-2.5 rounded-full bg-[#C34A15]"></div>}
                                    </div>
                                </label>
                            </div>

                            <div className="mb-6 flex flex-col gap-4 text-sm font-medium text-neutral-500">
                                <div className="flex justify-between"><span>Harga Mystery Box</span><span className="font-bold text-gray-900">Rp 25.000</span></div>
                                <div className="flex justify-between"><span>Biaya Layanan</span><span className="font-bold text-gray-900">Rp 3.000</span></div>
                            </div>

                            <div className="mb-8 border-t border-dashed border-neutral-300 pt-6">
                                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-500">Total Pembayaran</div>
                                <div className="flex items-center justify-between">
                                    <div className="text-3xl font-extrabold tracking-tight text-gray-900">Rp 28.000</div>
                                    <span className="rounded bg-yellow-300 px-2 py-1 text-[10px] font-bold uppercase text-yellow-900">Secure</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 text-center">
                                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#C34A15] py-4 text-base font-bold text-white transition-colors hover:bg-[#A33D10]">
                                    Bayar Sekarang <ArrowRight className="h-5 w-5" />
                                </button>
                                <p className="px-4 text-[10px] font-medium leading-relaxed text-neutral-400">
                                    Dengan mengklik Bayar Sekarang, Anda menyetujui <a href="#" className="text-[#C34A15] underline">Kebijakan Pengambilan Sendiri</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            
            <SiteFooter />
        </div>
    );
}

Checkout.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;