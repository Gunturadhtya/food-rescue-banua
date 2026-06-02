import React from 'react';
import { Head } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { ShoppingBag, Clock, CheckCircle, MapPin, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Order {
    id: number;
    shop_name: string;
    shop_address: string;
    weight_kg: number;
    price: number;
    quantity: number;
    status: 'claimed' | 'redeemed' | 'expired';
    created_at: string;
    pickup_code: string;
}

interface Props {
    orders?: {
        data: Order[];
    };
}

export default function BuyerOrders({ orders = { data: [] } }: Props) {
    const getStatusConfig = (status: Order['status']) => {
        switch (status) {
            case 'claimed':
                return {
                    color: 'bg-yellow-100 text-yellow-800',
                    icon: <Clock size={12} />,
                    label: 'Claimed (Pending Pickup)',
                };
            case 'redeemed':
                return {
                    color: 'bg-green-100 text-green-800',
                    icon: <CheckCircle size={12} />,
                    label: 'Redeemed',
                };
            case 'expired':
                return {
                    color: 'bg-red-100 text-red-800',
                    icon: <XCircle size={12} />,
                    label: 'Expired',
                };
            default:
                return {
                    color: 'bg-neutral-100 text-neutral-800',
                    icon: <Clock size={12} />,
                    label: status,
                };
        }
    };

    return (
        <div className="space-y-6">
            <Head title="My Orders" />
            <div className="flex flex-col gap-1">
                <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                    My Orders
                </h1>
                <p className="text-sm text-neutral-500">
                    History of the food you rescued along with their pickup
                    codes.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {!orders.data || orders.data.length === 0 ? (
                    <Card className="border-neutral-100 shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center gap-3 py-12 text-neutral-400">
                            <ShoppingBag
                                size={40}
                                className="text-neutral-300"
                            />
                            <p>You have not rescued any food yet.</p>
                        </CardContent>
                    </Card>
                ) : (
                    orders.data.map((order) => {
                        const config = getStatusConfig(order.status);
                        const totalWeight = order.weight_kg * order.quantity;
                        const totalPrice = order.price * order.quantity;

                        return (
                            <Card
                                key={order.id}
                                className="border-neutral-100 shadow-sm transition-all hover:border-neutral-200"
                            >
                                <CardContent className="flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-bold uppercase ${config.color}`}
                                            >
                                                {config.icon}
                                                {config.label}
                                            </span>
                                            <span className="text-xs text-neutral-400">
                                                {new Date(
                                                    order.created_at,
                                                ).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">
                                                {order.shop_name}
                                            </h3>
                                            <p className="mt-0.5 flex items-center gap-1 text-xs text-neutral-500">
                                                <MapPin size={14} />
                                                {order.shop_address}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 pt-1 text-sm">
                                            <p className="text-neutral-600">
                                                Quantity:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {order.quantity}x
                                                </span>
                                            </p>
                                            <p className="text-neutral-600">
                                                Total Weight:{' '}
                                                <span className="font-semibold text-gray-900">
                                                    {totalWeight.toFixed(2)} kg
                                                </span>
                                            </p>
                                            <p className="text-neutral-600">
                                                Total Price:{' '}
                                                <span className="font-bold text-[#C34A15]">
                                                    Rp
                                                    {Number(
                                                        totalPrice,
                                                    ).toLocaleString('id-ID')}
                                                    ,00
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {order.status === 'claimed' && (
                                        <div className="flex w-full shrink-0 flex-col items-center justify-center rounded-xl border border-dashed border-[#C34A15] bg-[#FFF8F5] px-4 py-3 md:w-auto">
                                            <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase">
                                                Pickup Code
                                            </span>
                                            <span className="font-mono text-xl font-extrabold tracking-widest text-[#C34A15]">
                                                {order.pickup_code}
                                            </span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}

BuyerOrders.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
