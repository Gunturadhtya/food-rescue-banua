import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Package } from 'lucide-react';

interface User {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    name: string;
}

interface Rescue {
    id: number;
    status: any; 
    pcs: number;
    price: any; 
    weight_kg: any;
    expires_at: string | null;
    created_at: string;
    user?: User; 
    shop?: Shop;
}

interface Props {
    rescues: {
        data: Rescue[];
    };
}

export default function AdminRescueIndex({ rescues }: Props) {
    
    const handleDeleteRescue = (id: number) => {
        if (window.confirm(`Apakah kamu yakin ingin menghapus postingan rescue #RC-${id} ini?`)) {
            router.delete(`/admin/rescues/${id}`);
        }
    };

    const formatRupiah = (value: any) => {
        return `Rp ${value}`; 
    };

    const getStatusText = (status: any) => {
        if (!status) return 'active';
        if (typeof status === 'object') return status.value || status.name || 'active';
        return String(status);
    };

    return (
        <div className="space-y-6">
            <Head title="Rescue Records" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold font-jakarta text-gray-900">Rescue Records</h1>
                    <p className="text-sm text-neutral-500">Pantau semua data makanan yang sedang dan telah di-rescue.</p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Rescue ID / Shop</th>
                                <th className="px-6 py-4 font-semibold">Quantity / Weight</th>
                                <th className="px-6 py-4 font-semibold">Price</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Expires At</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {rescues.data.map((rescue) => {
                                const statusText = getStatusText(rescue.status).toLowerCase();
                                
                                return (
                                    <tr key={rescue.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4 flex flex-col gap-1">
                                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                                <Package size={16} className="text-[#C34A15]" />
                                                RC-{rescue.id}
                                            </div>
                                            <div className="text-xs text-neutral-500 font-medium">
                                                {rescue.shop?.name ?? 'Unknown Shop'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{rescue.pcs} pcs</div>
                                            <div className="text-xs text-neutral-500">{rescue.weight_kg} kg</div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-green-600">
                                            {formatRupiah(rescue.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                statusText === 'active' || statusText === 'available' ? 'bg-blue-100 text-blue-800' :
                                                statusText === 'completed' || statusText === 'sold' ? 'bg-green-100 text-green-800' :
                                                'bg-amber-100 text-amber-800'
                                            }`}>
                                                {statusText}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500 text-xs">
                                            {rescue.expires_at 
                                                ? new Date(rescue.expires_at).toLocaleString('id-ID', {
                                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                }) 
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <button 
                                                onClick={() => handleDeleteRescue(rescue.id)}
                                                className="text-red-600 hover:text-red-800 font-semibold transition-colors">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {rescues.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data postingan rescue.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

AdminRescueIndex.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;