import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Eye, EyeOff } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function AdminUserCreate() {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user', 
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users'); 
    };

    return (
        <div className="space-y-6">
            <Head title="Add New User" />

            <div className="flex flex-col gap-1 mb-8">
                <Link href="/admin/users" className="text-sm text-[#C34A15] hover:underline mb-2 w-fit font-medium transition-all">
                    &larr; Back to Users
                </Link>
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">Add New User</h1>
                <p className="text-sm text-neutral-500">Fill in the form below to manually register a new user.</p>
            </div>

            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm p-6 md:p-8">
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" autoComplete="off">
                    
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Full Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            autoComplete="off"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20 focus:border-[#C34A15] transition-all text-sm"
                            placeholder="John Doe"/>
                        {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Email Address</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            autoComplete="off"
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20 focus:border-[#C34A15] transition-all text-sm"
                            placeholder="johndoe@example.com"/>
                        {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                autoComplete="new-password"
                                className="w-full px-4 py-3 pr-12 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20 focus:border-[#C34A15] transition-all text-sm"
                                placeholder="Minimum 8 characters"/>
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none transition-colors">
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-xs font-medium">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">Role</label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger className="w-full px-4 py-6 bg-neutral-50 border border-neutral-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20 focus:border-[#C34A15] transition-all text-sm cursor-pointer">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-neutral-200 rounded-xl shadow-lg">
                                <SelectItem value="user" className="cursor-pointer font-medium hover:bg-neutral-50">User / Buyer</SelectItem>
                                <SelectItem value="seller" className="cursor-pointer font-medium hover:bg-neutral-50">Seller / Shop Owner</SelectItem>
                                <SelectItem value="admin" className="cursor-pointer font-medium hover:bg-neutral-50">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && <p className="text-red-500 text-xs font-medium">{errors.role}</p>}
                    </div>

                    <div className="md:col-span-2 pt-4 flex items-center justify-end border-t border-neutral-100 mt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-[#C34A15] text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-[#A33D10] transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto mt-4">
                            {processing ? 'Saving...' : 'Save User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

AdminUserCreate.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;