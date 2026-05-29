import React from 'react';
import { Head } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { ShoppingBag, Clock, CheckCircle, MapPin, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Update the TypeScript union to strictly match the database Enum
interface Order {
    id: number;
    shop_name: string;
    shop_address: string;
    weight_kg: number;
    savings_amount: number;
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

    // Extracted configuration to handle UI variations cleanly
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
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">My Orders</h1>
                <p className="text-sm text-neutral-500">Riwayat makanan yang kamu rescue beserta kode pengambilannya.</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {!orders.data || orders.data.length === 0 ? (
                    <Card className="border-neutral-100 shadow-sm">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-neutral-400 gap-3">
                            <ShoppingBag size={40} className="text-neutral-300" />
                            <p>Kamu belum pernah melakukan rescue makanan.</p>
                        </CardContent>
                    </Card>
                ) : (
                    orders.data.map((order) => {
                        const config = getStatusConfig(order.status);

                        return (
                            <Card key={order.id} className="border-neutral-100 shadow-sm hover:border-neutral-200 transition-all">
                                <CardContent className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase ${config.color}`}>
                                                {config.icon}
                                                {config.label}
                                            </span>
                                            <span className="text-xs text-neutral-400">
                                                {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-gray-900">{order.shop_name}</h3>
                                            <p className="text-xs text-neutral-500 flex items-center gap-1 mt-0.5">
                                                <MapPin size={14} />
                                                {order.shop_address}
                                            </p>
                                        </div>
                                        <div className="flex gap-4 text-sm pt-1">
                                            <p className="text-neutral-600">Berat: <span className="font-semibold text-gray-900">{order.weight_kg} kg</span></p>
                                            <p className="text-neutral-600">Hemat: <span className="font-bold text-[#C34A15]">Rp {order.savings_amount.toLocaleString('id-ID')}</span></p>
                                        </div>
                                    </div>

                                    {/* Only display the pickup code if the food hasn't been collected or expired yet */}
                                    {order.status === 'claimed' && (
                                        <div className="bg-[#FFF8F5] border border-dashed border-[#C34A15] px-4 py-3 rounded-xl flex flex-col items-center justify-center shrink-0 w-full md:w-auto">
                                            <span className="text-[10px] uppercase tracking-wider text-neutral-500 font-bold">Kode Pick-up</span>
                                            <span className="text-xl font-mono font-extrabold text-[#C34A15] tracking-widest">{order.pickup_code}</span>
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

BuyerOrders.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;