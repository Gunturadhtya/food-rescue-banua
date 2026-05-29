import React from 'react';
import { Head } from '@inertiajs/react';
import SellerLayout from '@/layouts/seller-layout';
import { Package, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface Order {
    id: number;
    buyer_name: string;
    weight_kg: number;
    savings_amount: number;
    status: 'pending' | 'completed';
    created_at: string;
}

interface Props {
    orders?: {
        data: Order[];
    };
}

export default function SellerOrders({ orders = { data: [] } }: Props) {
    return (
        <div className="space-y-6">
            <Head title="Rescue Orders" />

            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">Rescue Orders</h1>
                <p className="text-sm text-neutral-500">Daftar pelanggan yang mengklaim dan akan mengambil makanan.</p>
            </div>

            <Card className="border-neutral-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Package className="w-5 h-5 text-[#C34A15]" />
                        Incoming Rescues
                    </CardTitle>
                    <CardDescription>
                        Kelola pesanan masuk dan tandai jika makanan sudah diambil oleh pelanggan.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto rounded-xl border border-gray-100">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                                <tr>
                                    <th className="px-6 py-3 font-semibold">Pelanggan</th>
                                    <th className="px-6 py-3 font-semibold">Tanggal & Waktu</th>
                                    <th className="px-6 py-3 font-semibold text-right">Berat</th>
                                    <th className="px-6 py-3 font-semibold text-center">Status</th>
                                    <th className="px-6 py-3 font-semibold text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-gray-900">
                                {!orders.data || orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-neutral-400">
                                            Belum ada pesanan masuk saat ini.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                                            <td className="px-6 py-4 font-medium">{order.buyer_name}</td>
                                            <td className="px-6 py-4 text-neutral-500">
                                                {new Date(order.created_at).toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono text-neutral-600">
                                                {order.weight_kg} kg
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                    {order.status === 'pending' ? <Clock size={14} /> : <CheckCircle size={14} />}
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {order.status === 'pending' && (
                                                    <button className="text-sm bg-[#C34A15] text-white px-3 py-1.5 rounded-lg hover:bg-[#A33D10] font-medium transition-colors">
                                                        Selesai
                                                    </button>
                                                )}
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
    );
}

SellerOrders.layout = (page: React.ReactNode) => <SellerLayout>{page}</SellerLayout>;