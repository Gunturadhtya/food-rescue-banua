import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';
import { QrCode, Clock, CheckCircle } from 'lucide-react';
import { useCountdown } from '@/hooks/user-countdown';

interface ActiveTicket {
    id: number;
    code: string;
    buyer_name: string;
    quantity: number;
    total_price: number;
    expires_at: string;
}

interface Props {
    activeTickets: {
        data: ActiveTicket[];
    };
}

// Helper component to render a live countdown for each ticket
function ExpiryCountdown({ expiresAt }: { expiresAt: string }) {
    const { hours, minutes, isExpired } = useCountdown(expiresAt);
    if (isExpired) return <span className="text-red-500 font-bold">Expired</span>;
    return <span className="text-yellow-600 font-mono">{hours}h {minutes}m</span>;
}

export default function SellerOrders({ activeTickets }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });

    const handleRedeem = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/orders/redeem', {
            onSuccess: () => reset('code'),
        });
    };

    return (
        <div className="space-y-6">
            <Head title="Manage Orders" />

            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">Manage Orders</h1>
                <p className="text-sm text-neutral-500">Verify and redeem buyer pickup tickets.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* REDEEM TICKET FORM */}
                <Card className="lg:col-span-1 border-[#C34A15]/20 shadow-sm bg-[#FDFBF7]">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <QrCode className="text-[#C34A15] w-5 h-5" />
                            Redeem Ticket
                        </CardTitle>
                        <CardDescription>
                            Enter the 9-character code (e.g., FRB-XXXXXX) provided by the buyer upon arrival.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRedeem} className="space-y-4">
                            <div>
                                <Input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value.toUpperCase())}
                                    placeholder="FRB-XXXXXX"
                                    className="font-mono text-center text-lg h-12 uppercase tracking-widest"
                                    maxLength={10}
                                    autoComplete="off"
                                />
                                <InputError message={errors.code} className="mt-2 text-center" />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#C34A15] hover:bg-[#A33D10] text-white font-bold h-12 rounded-xl"
                                disabled={processing || !data.code}
                            >
                                {processing ? <Spinner className="mr-2" /> : <CheckCircle className="mr-2 w-5 h-5" />}
                                Verify & Redeem
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* ACTIVE TICKETS LEDGER */}
                <Card className="lg:col-span-2 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Clock className="w-5 h-5 text-neutral-500" />
                            Pending Pickups
                        </CardTitle>
                        <CardDescription>
                            Active tickets currently waiting to be collected by buyers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Expected Code</th>
                                        <th className="px-6 py-3 font-semibold">Buyer</th>
                                        <th className="px-6 py-3 font-semibold text-center">Qty</th>
                                        <th className="px-6 py-3 font-semibold text-right">To Pay / Paid</th>
                                        <th className="px-6 py-3 font-semibold text-right">Expires In</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-gray-900">
                                    {!activeTickets.data || activeTickets.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-neutral-400">
                                                No pending pickups at the moment.
                                            </td>
                                        </tr>
                                    ) : (
                                        activeTickets.data.map((ticket) => (
                                            <tr key={ticket.id} className="hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4 font-mono font-bold text-[#C34A15]">
                                                    {ticket.code}
                                                </td>
                                                <td className="px-6 py-4 font-medium">{ticket.buyer_name}</td>
                                                <td className="px-6 py-4 text-center font-bold">
                                                    {ticket.quantity}x
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    Rp {ticket.total_price.toLocaleString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <ExpiryCountdown expiresAt={ticket.expires_at} />
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

SellerOrders.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;