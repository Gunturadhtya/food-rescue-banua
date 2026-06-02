import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Store, User, Mail, Calendar, Info } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface ShopOwner {
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
    user?: ShopOwner;
}

interface Props {
    shop: Shop;
}

export default function AdminShopEdit({ shop }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        status: shop.status || 'pending',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/shops/${shop.id}`);
    };

    return (
        <div className="space-y-6">
            <Head title={`Shop Detail: ${shop.name}`} />

            <div className="mb-8 flex flex-col gap-1">
                <Link
                    href="/admin/shops"
                    className="mb-2 w-fit text-sm font-medium text-[#C34A15] transition-all hover:underline"
                >
                    &larr; Back to Shops
                </Link>
                <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                    Shop Details
                </h1>
                <p className="text-sm text-neutral-500">
                    Review shop information and manage its verification status.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-[24px] border border-neutral-100 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <Store className="text-[#C34A15]" size={20} />
                            Shop Information
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <p className="mb-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    Shop Name
                                </p>
                                <p className="text-base font-medium text-gray-900">
                                    {shop.name}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    Description
                                </p>
                                <p className="text-sm leading-relaxed text-gray-700">
                                    {shop.description || (
                                        <span className="text-neutral-400 italic">
                                            No description provided.
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <p className="mb-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                    Registered Date
                                </p>
                                <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                    <Calendar
                                        size={16}
                                        className="text-neutral-400"
                                    />
                                    {new Date(
                                        shop.created_at,
                                    ).toLocaleDateString('id-ID', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>

                        <hr className="my-6 border-neutral-100" />

                        <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-gray-900">
                            <User className="text-blue-600" size={20} />
                            Owner Information
                        </h2>

                        {shop.user ? (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <p className="mb-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                        Owner Name
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {shop.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="mb-1 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                        Email Address
                                    </p>
                                    <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <Mail
                                            size={16}
                                            className="text-neutral-400"
                                        />
                                        {shop.user.email}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
                                <Info size={18} />
                                Owner account not found (possibly deleted).
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-6 rounded-[24px] border border-neutral-100 bg-white p-6 shadow-sm md:p-8">
                        <h2 className="mb-2 text-lg font-bold text-gray-900">
                            Shop Status
                        </h2>
                        <p className="mb-6 text-sm text-neutral-500">
                            Change this shop's verification status.
                        </p>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-900">
                                    Current Status
                                </label>

                                <Select
                                    value={data.status}
                                    onValueChange={(value) =>
                                        setData('status', value)
                                    }
                                >
                                    <SelectTrigger
                                        className={`w-full rounded-xl border px-4 py-6 font-bold transition-all ${
                                            data.status === 'approved' ||
                                            data.status === 'active'
                                                ? 'border-green-200 bg-green-50 text-green-700'
                                                : data.status === 'pending'
                                                  ? 'border-amber-200 bg-amber-50 text-amber-700'
                                                  : 'border-red-200 bg-red-50 text-red-700'
                                        }`}
                                    >
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-neutral-200 bg-white shadow-lg">
                                        <SelectItem
                                            value="pending"
                                            className="cursor-pointer font-medium hover:bg-neutral-50"
                                        >
                                            Pending (Menunggu)
                                        </SelectItem>
                                        <SelectItem
                                            value="approved"
                                            className="cursor-pointer font-medium hover:bg-neutral-50"
                                        >
                                            Approved (Disetujui)
                                        </SelectItem>
                                        <SelectItem
                                            value="rejected"
                                            className="cursor-pointer font-medium hover:bg-neutral-50"
                                        >
                                            Rejected (Ditolak)
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.status && (
                                    <p className="text-xs font-medium text-red-500">
                                        {errors.status}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-xl bg-[#C34A15] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A33D10] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

AdminShopEdit.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
