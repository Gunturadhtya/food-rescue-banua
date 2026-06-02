import React, { FormEvent, useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import HomeLayout from '@/layouts/home-layout';
import { NavBar } from '@/components/frontend/nav-bar';
import { SiteFooter } from '@/components/frontend/site-footer';
import {
    QrCode,
    Landmark,
    ArrowRight,
    AlertCircle,
    ShoppingBag,
    MapPin,
    Clock,
    ShieldCheck,
} from 'lucide-react';
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
    const params = new URLSearchParams(
        typeof window !== 'undefined' ? window.location.search : '',
    );
    const initialQuantity = parseInt(params.get('quantity') || '1', 10);

    const { data, setData, post, processing, errors, clearErrors } = useForm({
        payment_method: 'qris',
        // Bind quantity to the form state to pass it dynamically on POST
        quantity:
            initialQuantity > 0 && initialQuantity <= rescue.pcs
                ? initialQuantity
                : 1,
    });

    const handleCheckout = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        post(`/checkout/${rescue.id}`, {
            preserveScroll: true,
            onError: () => {
                console.error('Checkout failed', errors);
            },
        });
    };

    // Derived calculated values based on quantity
    const mysteryBoxPrice = Number(rescue.price) * data.quantity;
    const serviceFee = 3000;
    const total = mysteryBoxPrice + serviceFee;
    const totalWeight = Number(rescue.weight_kg) * data.quantity;

    return (
        <div className="flex min-h-screen flex-col bg-white font-['Inter',sans-serif] text-[#1E1B13]">
            <Head title="Complete Rescue - Food Rescue Banua" />

            <NavBar />

            <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-10 sm:px-8">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="mb-2 font-['Plus_Jakarta_Sans',sans-serif] text-4xl font-bold tracking-tight md:text-5xl">
                        Complete Rescue
                    </h1>
                    <p className="text-lg text-[#5C4037]">
                        Review your order and secure your food
                    </p>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="mb-8 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                        <div className="text-sm font-medium">
                            {Object.values(errors).map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                    {/* Left Column - Order Details */}
                    <div className="flex flex-col gap-8 lg:col-span-7">
                        {/* Order Summary Card */}
                        <div className="flex flex-col gap-6 rounded-[24px] bg-[#FBF3E4] p-6 sm:p-8">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="h-6 w-6 text-[#A93100]" />
                                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold">
                                    Order Summary
                                </h2>
                            </div>

                            <div className="flex flex-col gap-6 sm:flex-row">
                                <div className="aspect-square w-full shrink-0 overflow-hidden rounded-lg bg-white sm:w-1/4">
                                    <img
                                        src={
                                            rescue.image ||
                                            '/images/mystery-box.png'
                                        }
                                        alt={rescue.shop_name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src =
                                                '/images/mystery-box.png';
                                        }}
                                    />
                                </div>

                                <div className="flex flex-1 flex-col justify-between">
                                    <div>
                                        <h3 className="mb-1 font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold">
                                            Surprise Bag - {rescue.shop_name}
                                        </h3>
                                        <p className="mb-2 text-sm text-[#5C4037]">
                                            {rescue.address}
                                        </p>
                                    </div>

                                    <div className="mb-3 text-xl font-bold text-[#A93100]">
                                        Rp
                                        {Number(mysteryBoxPrice).toLocaleString(
                                            'id-ID',
                                        )}
                                        ,00
                                    </div>

                                    <div className="flex gap-4">
                                        <span className="rounded-full bg-[#E9E2D3] px-4 py-1 text-xs font-medium tracking-wide text-[#5C4037] uppercase">
                                            Quantity: {data.quantity}
                                        </span>
                                        <span className="rounded-full bg-[#FCD400] px-4 py-1 text-xs font-medium tracking-wide text-[#6E5C00] uppercase">
                                            Flash Sale
                                        </span>
                                    </div>
                                    <div className="mt-2 text-xs font-medium text-[#5C4037]">
                                        Total Weight: {totalWeight.toFixed(2)}{' '}
                                        kg
                                    </div>
                                </div>
                            </div>

                            {/* Warning Box */}
                            <div className="mt-2 flex items-start gap-4 rounded-[24px] border-2 border-[#D43F00] bg-white p-6">
                                <Clock className="mt-1 h-6 w-6 shrink-0 text-[#A93100]" />
                                <div>
                                    <h4 className="mb-1 text-lg font-bold tracking-tight text-[#A93100] uppercase">
                                        Strictly Self-Pickup Window
                                    </h4>
                                    <p className="mb-1 text-xl font-medium">
                                        20:00 - 21:30
                                    </p>
                                    <p className="text-sm text-[#5C4037]">
                                        Food must be picked up within this
                                        window. No refunds for missed pickups.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pickup Point Card */}
                        <div className="flex flex-col gap-4 rounded-[24px] bg-[#FBF3E4] p-6 sm:p-8">
                            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold">
                                Pickup Point
                            </h2>
                            <p className="text-[#5C4037]">{rescue.address}</p>
                            <div className="relative mt-2 flex h-48 w-full items-center justify-center overflow-hidden rounded-xl bg-[#E9E2D3]/60">
                                <MapPin className="absolute z-10 h-8 w-8 text-[#A93100]" />
                                <img
                                    src="/images/map-preview.png"
                                    alt="Map Location"
                                    className="h-full w-full object-cover opacity-50"
                                    onError={(e) => {
                                        (
                                            e.target as HTMLImageElement
                                        ).style.display = 'none';
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Payment & Checkout */}
                    <div className="sticky top-8 lg:col-span-5">
                        <div className="rounded-[24px] border border-[#E6BEB2]/20 bg-white p-8 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.05)]">
                            <h2 className="mb-6 font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold">
                                Payment Details
                            </h2>

                            {/* Payment Methods */}
                            <div className="mb-8 flex flex-col gap-4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('payment_method', 'qris')
                                    }
                                    className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                                        data.payment_method === 'qris'
                                            ? 'border-[#A93100] bg-[#A93100]/5'
                                            : 'border-[#E6BEB2]/50 bg-[#FBF3E4] hover:border-[#A93100]/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <QrCode
                                            className={`h-6 w-6 ${data.payment_method === 'qris' ? 'text-[#A93100]' : 'text-[#5C4037]'}`}
                                        />
                                        <span
                                            className={`font-bold ${data.payment_method === 'qris' ? 'text-[#1E1B13]' : 'text-[#5C4037]'}`}
                                        >
                                            QRIS
                                        </span>
                                    </div>
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border-4 ${data.payment_method === 'qris' ? 'border-[#A93100] bg-white' : 'border-[#E6BEB2] bg-white'}`}
                                    ></div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setData('payment_method', 'transfer')
                                    }
                                    className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                                        data.payment_method === 'transfer'
                                            ? 'border-[#A93100] bg-[#A93100]/5'
                                            : 'border-[#E6BEB2]/50 bg-[#FBF3E4] hover:border-[#A93100]/50'
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Landmark
                                            className={`h-6 w-6 ${data.payment_method === 'transfer' ? 'text-[#A93100]' : 'text-[#5C4037]'}`}
                                        />
                                        <span
                                            className={`font-bold ${data.payment_method === 'transfer' ? 'text-[#1E1B13]' : 'text-[#5C4037]'}`}
                                        >
                                            Bank Transfer
                                        </span>
                                    </div>
                                    <div
                                        className={`flex h-5 w-5 items-center justify-center rounded-full border-4 ${data.payment_method === 'transfer' ? 'border-[#A93100] bg-white' : 'border-[#E6BEB2] bg-white'}`}
                                    ></div>
                                </button>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="mb-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between font-bold text-[#5C4037]">
                                    <span>
                                        Mystery Box Price ({data.quantity}x)
                                    </span>
                                    <span>
                                        Rp
                                        {Number(mysteryBoxPrice).toLocaleString(
                                            'id-ID',
                                        )}
                                        ,00
                                    </span>
                                </div>
                                <div className="flex items-center justify-between font-bold text-[#5C4037]">
                                    <span>Service Fee</span>
                                    <span>
                                        Rp
                                        {Number(serviceFee).toLocaleString(
                                            'id-ID',
                                        )}
                                        ,00
                                    </span>
                                </div>

                                <div className="mt-2 flex items-end justify-between border-t-2 border-[#E6BEB2]/30 pt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-bold tracking-[1.2px] text-[#5C4037] uppercase">
                                            Total Payment
                                        </span>
                                        <span className="text-3xl font-bold tracking-tight text-[#1E1B13]">
                                            Rp
                                            {Number(total).toLocaleString(
                                                'id-ID',
                                            )}
                                            ,00
                                        </span>
                                    </div>
                                    <div className="mb-1 flex items-center gap-1 rounded bg-[#FFE16D] px-2 py-1 text-[10px] font-medium text-[#221B00]">
                                        <ShieldCheck className="h-3 w-3" />{' '}
                                        SECURE
                                    </div>
                                </div>
                            </div>

                            {/* Checkout Actions */}
                            <form
                                onSubmit={handleCheckout}
                                className="mt-8 flex flex-col gap-4"
                            >
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex h-16 w-full items-center justify-center gap-3 rounded-full bg-[#A93100] text-lg font-bold text-white shadow-[0_8px_10px_-6px_rgba(0,0,0,0.5)] transition-all hover:bg-[#8A2800] hover:shadow-[0_12px_15px_-5px_rgba(0,0,0,0.5)] disabled:cursor-not-allowed disabled:opacity-70"
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

                                <p className="mt-2 px-4 text-center text-xs leading-relaxed text-[#5C4037]">
                                    By clicking Pay Now, you agree to the <br />
                                    <a
                                        href="#"
                                        className="font-medium text-[#D13F02] underline hover:text-[#A93100]"
                                    >
                                        Self-Pickup Policy
                                    </a>
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
