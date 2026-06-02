import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Shop {
    id: number;
    name: string;
    description: string;
    status: string;
    created_at: string;
    user?: User;
}

interface Props {
    shops: {
        data: Shop[];
    };
}

export default function AdminShopIndex({ shops }: Props) {
    const handleDeleteShop = (id: number, name: string) => {
        if (window.confirm(`Are you sure you want to delete shop "${name}"?`)) {
            router.delete(`/admin/shops/${id}`);
        }
    };

    return (
        <div className="space-y-6">
            <Head title="Manage Shops" />

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                        Manage Shops
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Verify, approve, and manage all food merchant partners.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-neutral-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Shop Name
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Owner / Seller
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Email
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Registered
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {shops.data.map((shop) => (
                                <tr
                                    key={shop.id}
                                    className="transition-colors hover:bg-neutral-50/50"
                                >
                                    <td className="px-6 py-4 font-bold text-gray-900">
                                        {shop.name}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-neutral-700">
                                        {shop.user ? (
                                            shop.user.name
                                        ) : (
                                            <span className="text-red-400 italic">
                                                No Owner
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {shop.user ? shop.user.email : '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        {/* Badge Status Toko */}
                                        <span
                                            className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                                shop.status === 'approved' ||
                                                shop.status === 'active'
                                                    ? 'bg-green-100 text-green-800'
                                                    : shop.status === 'pending'
                                                      ? 'bg-amber-100 text-amber-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {shop.status || 'pending'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {new Date(
                                            shop.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="space-x-4 px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/shops/${shop.id}/edit`}
                                            className="font-semibold text-blue-600 transition-colors hover:text-blue-800"
                                        >
                                            Detail
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDeleteShop(
                                                    shop.id,
                                                    shop.name,
                                                )
                                            }
                                            className="font-semibold text-red-600 transition-colors hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {shops.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-neutral-500"
                                    >
                                        No registered shops available.
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

AdminShopIndex.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
