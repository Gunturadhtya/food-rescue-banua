import React, { FormEvent } from 'react';
import { Head, useForm } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { QrCode, Landmark, ArrowRight, ShoppingBag, AlertCircle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface CheckoutProps {
    rescue: {
        id: number;
        shop_name: string;
        address: string;
        savings_amount: number;
        weight_kg: number;
        image: string;
    };
}

export default function Checkout({ rescue }: CheckoutProps) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        payment_method: 'qris',
    });

    const handleCheckout = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        post(`/checkout/${rescue.id}`, {
            preserveScroll: true,
            onError: () => {
                console.error("Checkout failed", errors);
            }
        });
    };

    const finalPrice = 25000;
    const serviceFee = 3000;
    const total = finalPrice + serviceFee;

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <Head title="Selesaikan Rescue - Food Rescue Banua" />

            <NavBar />

            <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10 flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column - Order Details */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                    <div className="flex items-center gap-2 text-[#C34A15] mb-2">
                        <ShoppingBag className="h-5 w-5" />
                        <h1 className="text-xl font-bold text-gray-900">Selesaikan Rescue Anda</h1>
                    </div>

                    {Object.keys(errors).length > 0 && (
                        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-start gap-3">
                            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <div className="text-sm font-medium">
                                {Object.values(errors).map((error, index) => (
                                    <p key={index}>{error}</p>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col sm:flex-row gap-6">
                        <div className="h-32 w-32 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                            <img
                                src={rescue.image}
                                alt={rescue.shop_name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/mystery-box.png';
                                }}
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Surprise Bag - {rescue.shop_name}</h3>

                            <div className="flex items-start gap-2 text-sm text-neutral-500 mb-4">
                                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                                <p>{rescue.address}</p>
                            </div>

                            <div className="flex gap-2">
                                <span className="bg-green-100 px-3 py-1.5 text-xs font-bold uppercase text-green-700 rounded-md">
                                    Hemat: Rp {rescue.savings_amount.toLocaleString('id-ID')}
                                </span>
                                <span className="bg-yellow-100 px-3 py-1.5 text-xs font-bold uppercase text-yellow-800 rounded-md">
                                    {rescue.weight_kg} kg
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100">
                        <h4 className="font-bold text-gray-900 mb-4">Metode Pembayaran</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setData('payment_method', 'qris')}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${data.payment_method === 'qris'
                                    ? 'border-[#C34A15] bg-[#C34A15]/5'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${data.payment_method === 'qris' ? 'bg-[#C34A15] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                                    <QrCode className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">QRIS</p>
                                    <p className="text-xs text-neutral-500">Gopay, OVO, Dana, LinkAja</p>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => setData('payment_method', 'transfer')}
                                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${data.payment_method === 'transfer'
                                    ? 'border-[#C34A15] bg-[#C34A15]/5'
                                    : 'border-neutral-200 hover:border-neutral-300 bg-white'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${data.payment_method === 'transfer' ? 'bg-[#C34A15] text-white' : 'bg-neutral-100 text-neutral-500'}`}>
                                    <Landmark className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">Transfer Bank</p>
                                    <p className="text-xs text-neutral-500">BCA, Mandiri, BNI, BRI</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 sticky top-8">
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Ringkasan Pesanan</h4>

                        <div className="flex flex-col gap-4 mb-6">
                            <div className="flex justify-between items-center text-sm text-neutral-600">
                                <span>Harga Surprise Bag</span>
                                <span className="font-medium text-gray-900">Rp {finalPrice.toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm text-neutral-600">
                                <span>Biaya Layanan</span>
                                <span className="font-medium text-gray-900">Rp {serviceFee.toLocaleString('id-ID')}</span>
                            </div>

                            <div className="h-px w-full bg-neutral-200 my-2" />

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900">Total Pembayaran</span>
                                <span className="font-bold text-xl text-[#C34A15]">Rp {total.toLocaleString('id-ID')}</span>
                            </div>
                        </div>

                        <form onSubmit={handleCheckout} className="flex flex-col gap-4 text-center">
                            <Button
                                type="submit"
                                disabled={processing}
                                className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#C34A15] py-4 text-base font-bold text-white transition-all hover:bg-[#A33D10] disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                {processing ? (
                                    <>
                                        <Spinner className="mr-2" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Bayar Sekarang
                                        <ArrowRight className="h-5 w-5 ml-1" />
                                    </>
                                )}
                            </Button>

                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-left flex gap-3 mt-2">
                                <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
                                <p className="text-xs font-medium leading-relaxed text-blue-800">
                                    Dengan mengklik Bayar Sekarang, Anda menyetujui <a href="#" className="text-blue-600 underline font-bold">Kebijakan Pengambilan Sendiri</a>. Pesanan yang sudah dibayar tidak dapat dibatalkan.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

            </main>

            <SiteFooter />
        </div>
    );
}

Checkout.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;