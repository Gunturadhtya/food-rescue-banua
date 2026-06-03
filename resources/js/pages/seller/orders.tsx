import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
    if (isExpired)
        return <span className="font-bold text-red-500">Expired</span>;
    return (
        <span className="font-mono text-yellow-600">
            {hours}h {minutes}m
        </span>
    );
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

            <div className="mb-8 flex flex-col gap-1">
                <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                    Manage Orders
                </h1>
                <p className="text-sm text-neutral-500">
                    Verify and redeem volunteer pickup tickets.
                </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                {/* REDEEM TICKET FORM */}
                <Card className="border-[#C34A15]/20 bg-[#FDFBF7] shadow-sm lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <QrCode className="h-5 w-5 text-[#C34A15]" />
                            Redeem Ticket
                        </CardTitle>
                        <CardDescription>
                            Enter the 9-character code (e.g., FRB-XXXXXX)
                            provided by the volunteer upon arrival.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRedeem} className="space-y-4">
                            <div>
                                <Input
                                    id="code"
                                    type="text"
                                    value={data.code}
                                    onChange={(e) =>
                                        setData(
                                            'code',
                                            e.target.value.toUpperCase(),
                                        )
                                    }
                                    placeholder="FRB-XXXXXX"
                                    className="h-12 text-center font-mono text-lg tracking-widest uppercase"
                                    maxLength={10}
                                    autoComplete="off"
                                />
                                <InputError
                                    message={errors.code}
                                    className="mt-2 text-center"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="h-12 w-full rounded-xl bg-[#C34A15] font-bold text-white hover:bg-[#A33D10]"
                                disabled={processing || !data.code}
                            >
                                {processing ? (
                                    <Spinner className="mr-2" />
                                ) : (
                                    <CheckCircle className="mr-2 h-5 w-5" />
                                )}
                                Verify & Redeem
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* ACTIVE TICKETS LEDGER */}
                <Card className="shadow-sm lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Clock className="h-5 w-5 text-neutral-500" />
                            Pending Pickups
                        </CardTitle>
                        <CardDescription>
                            Active tickets currently waiting to be collected by
                            volunteers.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">
                                            Expected Code
                                        </th>
                                        <th className="px-6 py-3 font-semibold">
                                            Volunteer
                                        </th>
                                        <th className="px-6 py-3 text-center font-semibold">
                                            Qty
                                        </th>
                                        <th className="px-6 py-3 text-right font-semibold">
                                            To Pay / Paid
                                        </th>
                                        <th className="px-6 py-3 text-right font-semibold">
                                            Expires In
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-gray-900">
                                    {!activeTickets.data ||
                                    activeTickets.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-6 py-12 text-center text-neutral-400"
                                            >
                                                No pending pickups at the
                                                moment.
                                            </td>
                                        </tr>
                                    ) : (
                                        activeTickets.data.map((ticket) => (
                                            <tr
                                                key={ticket.id}
                                                className="transition-colors hover:bg-neutral-50/50"
                                            >
                                                <td className="px-6 py-4 font-mono font-bold text-[#C34A15]">
                                                    {ticket.code}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {ticket.buyer_name}
                                                </td>
                                                <td className="px-6 py-4 text-center font-bold">
                                                    {ticket.quantity}x
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-gray-900">
                                                    Rp
                                                    {Number(
                                                        ticket.total_price,
                                                    ).toLocaleString('id-ID')}
                                                    ,00
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <ExpiryCountdown
                                                        expiresAt={
                                                            ticket.expires_at
                                                        }
                                                    />
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

SellerOrders.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
