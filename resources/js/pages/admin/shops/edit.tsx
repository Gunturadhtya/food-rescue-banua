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
} from "@/components/ui/select";

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

            <div className="flex flex-col gap-1 mb-8">
                <Link href="/admin/shops" className="text-sm text-[#C34A15] hover:underline mb-2 w-fit font-medium transition-all">
                    &larr; Back to Shops
                </Link>
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">Shop Details</h1>
                <p className="text-sm text-neutral-500">Tinjau informasi toko dan kelola status verifikasinya.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Store className="text-[#C34A15]" size={20} />
                            Shop Information
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Shop Name</p>
                                <p className="text-base font-medium text-gray-900">{shop.name}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Description</p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    {shop.description || <span className="italic text-neutral-400">Tidak ada deskripsi yang disertakan.</span>}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Registered Date</p>
                                <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                    <Calendar size={16} className="text-neutral-400" />
                                    {new Date(shop.created_at).toLocaleDateString('id-ID', {
                                        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <hr className="my-6 border-neutral-100" />

                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <User className="text-blue-600" size={20} />
                            Owner Information
                        </h2>

                        {shop.user ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Owner Name</p>
                                    <p className="text-sm font-medium text-gray-900">{shop.user.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Email Address</p>
                                    <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                        <Mail size={16} className="text-neutral-400" />
                                        {shop.user.email}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                                <Info size={18} />
                                Akun pemilik tidak ditemukan (mungkin sudah dihapus).
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 md:p-8 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-2">Shop Status</h2>
                        <p className="text-sm text-neutral-500 mb-6">Ubah status verifikasi toko ini.</p>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-900">Current Status</label>
                                
                                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                    <SelectTrigger 
                                        className={`w-full px-4 py-6 border rounded-xl font-bold transition-all ${
                                            data.status === 'approved' || data.status === 'active' ? 'bg-green-50 border-green-200 text-green-700' :
                                            data.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                            'bg-red-50 border-red-200 text-red-700'
                                        }`}>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-neutral-200 rounded-xl shadow-lg">
                                        <SelectItem value="pending" className="cursor-pointer font-medium hover:bg-neutral-50">Pending (Menunggu)</SelectItem>
                                        <SelectItem value="approved" className="cursor-pointer font-medium hover:bg-neutral-50">Approved (Disetujui)</SelectItem>
                                        <SelectItem value="rejected" className="cursor-pointer font-medium hover:bg-neutral-50">Rejected (Ditolak)</SelectItem>
                                    </SelectContent>
                                </Select>

                                {errors.status && <p className="text-red-500 text-xs font-medium">{errors.status}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-[#C34A15] text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-[#A33D10] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                {processing ? 'Updating...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

AdminShopEdit.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;