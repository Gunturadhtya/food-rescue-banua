import React, { FormEvent, useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import { QrCode, Landmark, ArrowRight, AlertCircle, ShoppingBag, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

interface CheckoutProps {
    rescue: {
        id: number;
        shop_name: string;
        address: string;
        price: number;
        weight_kg: number;
        image: string;
        pcs: number;
    };
}

export default function Checkout({ rescue }: CheckoutProps) {
    // Extract quantity from URL parameters, defaulting to 1
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const initialQuantity = parseInt(params.get('quantity') || '1', 10);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        payment_method: 'qris',
        // Bind quantity to the form state to pass it dynamically on POST
        quantity: initialQuantity > 0 && initialQuantity <= rescue.pcs ? initialQuantity : 1,
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

    // Derived calculated values based on quantity
    const mysteryBoxPrice = Number(rescue.price) * data.quantity;
    const serviceFee = 3000;
    const total = mysteryBoxPrice + serviceFee;
    const totalWeight = Number(rescue.weight_kg) * data.quantity;

    return (
        <div className="min-h-screen bg-white flex flex-col font-['Inter',sans-serif] text-[#1E1B13]">
            <Head title="Complete Rescue - Food Rescue Banua" />

            <NavBar />

            <main className="mx-auto max-w-7xl px-4 sm:px-8 py-10 flex-grow w-full">

                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold font-['Plus_Jakarta_Sans',sans-serif] tracking-tight mb-2">
                        Complete Rescue
                    </h1>
                    <p className="text-[#5C4037] text-lg">
                        Review your order and secure your food
                    </p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl flex items-start gap-3 mb-8">
                        <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                        <div className="text-sm font-medium">
                            {Object.values(errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column - Order Details */}
                    <div className="lg:col-span-7 flex flex-col gap-8">

                        {/* Order Summary Card */}
                        <div className="bg-[#FBF3E4] p-6 sm:p-8 rounded-[24px] flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-6 w-6 text-[#A93100]" />
                                <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif]">Order Summary</h2>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6">
                                <div className="w-full sm:w-1/4 aspect-square rounded-lg overflow-hidden bg-white shrink-0">
                                    <img
                                        src={rescue.image || "/images/mystery-box.png"}
                                        alt={rescue.shop_name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = '/images/mystery-box.png';
                                        }}
                                    />
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans',sans-serif] mb-1">Surprise Bag - {rescue.shop_name}</h3>
                                        <p className="text-[#5C4037] text-sm mb-2">{rescue.address}</p>
                                    </div>

                                    <div className="text-xl font-bold text-[#A93100] mb-3">
                                        Rp{Number(mysteryBoxPrice).toLocaleString('id-ID')},00
                                    </div>

                                    <div className="flex gap-4">
                                        <span className="bg-[#E9E2D3] px-4 py-1 text-xs font-medium tracking-wide uppercase text-[#5C4037] rounded-full">
                                            Quantity: {data.quantity}
                                        </span>
                                        <span className="bg-[#FCD400] px-4 py-1 text-xs font-medium tracking-wide uppercase text-[#6E5C00] rounded-full">
                                            Flash Sale
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs text-[#5C4037] font-medium">
                                        Total Weight: {totalWeight.toFixed(2)} kg
                                    </div>
                                </div>
                            </div>

                            {/* Warning Box */}
                            <div className="bg-white border-2 border-[#D43F00] rounded-[24px] p-6 flex items-start gap-4 mt-2">
                                <Clock className="h-6 w-6 text-[#A93100] shrink-0 mt-1" />
                                <div>
                                    <h4 className="text-[#A93100] font-bold text-lg tracking-tight uppercase mb-1">Strictly Self-Pickup Window</h4>
                                    <p className="text-xl font-medium mb-1">20:00 - 21:30</p>
                                    <p className="text-[#5C4037] text-sm">
                                        Food must be picked up within this window. No refunds for missed pickups.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pickup Point Card */}
                        <div className="bg-[#FBF3E4] p-6 sm:p-8 rounded-[24px] flex flex-col gap-4">
                            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif]">Pickup Point</h2>
                            <p className="text-[#5C4037]">{rescue.address}</p>
                            <div className="w-full h-48 bg-[#E9E2D3]/60 rounded-xl overflow-hidden mt-2 flex items-center justify-center relative">
                                <MapPin className="h-8 w-8 text-[#A93100] absolute z-10" />
                                <img
                                    src="/images/map-preview.png"
                                    alt="Map Location"
                                    className="w-full h-full object-cover opacity-50"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Right Column - Payment & Checkout */}
                    <div className="lg:col-span-5 sticky top-8">
                        <div className="bg-white p-8 rounded-[24px] border border-[#E6BEB2]/20 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)]">
                            <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] mb-6">Payment Details</h2>

                            {/* Payment Methods */}
                            <div className="flex flex-col gap-4 mb-8">
                                <button
                                    type="button"
                                    onClick={() => setData('payment_method', 'qris')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${data.payment_method === 'qris'
                                        ? 'border-[#A93100] bg-[#A93100]/5'
                                        : 'border-[#E6BEB2]/50 bg-[#FBF3E4] hover:border-[#A93100]/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <QrCode className={`h-6 w-6 ${data.payment_method === 'qris' ? 'text-[#A93100]' : 'text-[#5C4037]'}`} />
                                        <span className={`font-bold ${data.payment_method === 'qris' ? 'text-[#1E1B13]' : 'text-[#5C4037]'}`}>QRIS</span>
                                    </div>
                                    <div className={`h-5 w-5 rounded-full border-4 flex items-center justify-center ${data.payment_method === 'qris' ? 'border-[#A93100] bg-white' : 'border-[#E6BEB2] bg-white'}`}></div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setData('payment_method', 'transfer')}
                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${data.payment_method === 'transfer'
                                        ? 'border-[#A93100] bg-[#A93100]/5'
                                        : 'border-[#E6BEB2]/50 bg-[#FBF3E4] hover:border-[#A93100]/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Landmark className={`h-6 w-6 ${data.payment_method === 'transfer' ? 'text-[#A93100]' : 'text-[#5C4037]'}`} />
                                        <span className={`font-bold ${data.payment_method === 'transfer' ? 'text-[#1E1B13]' : 'text-[#5C4037]'}`}>Bank Transfer</span>
                                    </div>
                                    <div className={`h-5 w-5 rounded-full border-4 flex items-center justify-center ${data.payment_method === 'transfer' ? 'border-[#A93100] bg-white' : 'border-[#E6BEB2] bg-white'}`}></div>
                                </button>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center text-[#5C4037] font-bold">
                                    <span>Mystery Box Price ({data.quantity}x)</span>
                                    <span>Rp{Number(mysteryBoxPrice).toLocaleString('id-ID')},00</span>
                                </div>
                                <div className="flex justify-between items-center text-[#5C4037] font-bold">
                                    <span>Service Fee</span>
                                    <span>Rp{Number(serviceFee).toLocaleString('id-ID')},00</span>
                                </div>

                                <div className="border-t-2 border-[#E6BEB2]/30 mt-2 pt-4 flex justify-between items-end">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold text-[#5C4037] tracking-[1.2px] uppercase">Total Payment</span>
                                        <span className="text-3xl font-bold tracking-tight text-[#1E1B13]">Rp{Number(total).toLocaleString('id-ID')},00</span>
                                    </div>
                                    <div className="bg-[#FFE16D] px-2 py-1 rounded text-[10px] font-medium text-[#221B00] flex items-center gap-1 mb-1">
                                        <ShieldCheck className="w-3 h-3" /> SECURE
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Actions */}
                            <form onSubmit={handleCheckout} className="flex flex-col gap-4 mt-8">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#A93100] text-lg font-bold text-white transition-all hover:bg-[#8A2800] disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_8px_10px_-6px_rgba(0,0,0,0.5)] hover:shadow-[0_12px_15px_-5px_rgba(0,0,0,0.5)]"
                                >
                                    {processing ? (
                                        <>
                                            <Spinner className="mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Pay Now
                                            <ArrowRight className="h-6 w-6" />
                                        </>
                                    )}
                                </Button>

                                <p className="text-xs text-center text-[#5C4037] mt-2 px-4 leading-relaxed">
                                    By clicking Pay Now, you agree to the <br />
                                    <a href="#" className="text-[#D13F02] underline font-medium hover:text-[#A93100]">Self-Pickup Policy</a>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>
            </main>

            <SiteFooter />
        </div>
    );
}

Checkout.layout = (page: React.ReactNode) => <HomeLayout>{page}</HomeLayout>;