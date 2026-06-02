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
        if (
            window.confirm(
                `Are you sure you want to delete rescue post #RC-${id}?`,
            )
        ) {
            router.delete(`/admin/rescues/${id}`);
        }
    };

    const formatRupiah = (value: any) => {
        const num = Number(value);
        return !isNaN(num)
            ? `Rp${num.toLocaleString('id-ID')},00`
            : `Rp${value}`;
    };

    const getStatusText = (status: any) => {
        if (!status) return 'active';
        if (typeof status === 'object')
            return status.value || status.name || 'active';
        return String(status);
    };

    return (
        <div className="space-y-6">
            <Head title="Rescue Records" />

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                        Rescue Records
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Monitor all active and past rescued food data.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-neutral-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Rescue ID / Shop
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Quantity / Weight
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Price
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Expires At
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {rescues.data.map((rescue) => {
                                const statusText = getStatusText(
                                    rescue.status,
                                ).toLowerCase();

                                return (
                                    <tr
                                        key={rescue.id}
                                        className="transition-colors hover:bg-neutral-50/50"
                                    >
                                        <td className="flex flex-col gap-1 px-6 py-4">
                                            <div className="flex items-center gap-2 font-bold text-gray-900">
                                                <Package
                                                    size={16}
                                                    className="text-[#C34A15]"
                                                />
                                                RC-{rescue.id}
                                            </div>
                                            <div className="text-xs font-medium text-neutral-500">
                                                {rescue.shop?.name ??
                                                    'Unknown Shop'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {rescue.pcs} pcs
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                {rescue.weight_kg} kg
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-green-600">
                                            {formatRupiah(rescue.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                                    statusText === 'active' ||
                                                    statusText === 'available'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : statusText ===
                                                                'completed' ||
                                                            statusText ===
                                                                'sold'
                                                          ? 'bg-green-100 text-green-800'
                                                          : 'bg-amber-100 text-amber-800'
                                                }`}
                                            >
                                                {statusText}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-neutral-500">
                                            {rescue.expires_at
                                                ? new Date(
                                                      rescue.expires_at,
                                                  ).toLocaleString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })
                                                : '-'}
                                        </td>
                                        <td className="space-x-4 px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    handleDeleteRescue(
                                                        rescue.id,
                                                    )
                                                }
                                                className="font-semibold text-red-600 transition-colors hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {rescues.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-neutral-500"
                                    >
                                        No rescue post data available.
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

AdminRescueIndex.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
