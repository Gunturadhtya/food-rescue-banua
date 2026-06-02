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
} from '@/components/ui/select';
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

            <div className="mb-8 flex flex-col gap-1">
                <Link
                    href="/admin/users"
                    className="mb-2 w-fit text-sm font-medium text-[#C34A15] transition-all hover:underline"
                >
                    &larr; Back to Users
                </Link>
                <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                    Add New User
                </h1>
                <p className="text-sm text-neutral-500">
                    Fill in the form below to manually register a new user.
                </p>
            </div>

            <div className="rounded-[24px] border border-neutral-100 bg-white p-6 shadow-sm md:p-8">
                <form
                    onSubmit={submit}
                    className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2"
                    autoComplete="off"
                >
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            autoComplete="off"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-[#C34A15] focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20"
                            placeholder="John Doe"
                        />
                        {errors.name && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoComplete="off"
                            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm transition-all focus:border-[#C34A15] focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20"
                            placeholder="johndoe@example.com"
                        />
                        {errors.email && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={data.password}
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                autoComplete="new-password"
                                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 pr-12 text-sm transition-all focus:border-[#C34A15] focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20"
                                placeholder="Minimum 8 characters"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-4 -translate-y-1/2 text-neutral-400 transition-colors hover:text-neutral-600 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-900">
                            Role
                        </label>
                        <Select
                            value={data.role}
                            onValueChange={(value) => setData('role', value)}
                        >
                            <SelectTrigger className="w-full cursor-pointer rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-6 text-sm transition-all focus:border-[#C34A15] focus:bg-white focus:ring-2 focus:ring-[#C34A15]/20">
                                <SelectValue placeholder="Pilih Role" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-neutral-200 bg-white shadow-lg">
                                <SelectItem
                                    value="user"
                                    className="cursor-pointer font-medium hover:bg-neutral-50"
                                >
                                    User / Buyer
                                </SelectItem>
                                <SelectItem
                                    value="seller"
                                    className="cursor-pointer font-medium hover:bg-neutral-50"
                                >
                                    Seller / Shop Owner
                                </SelectItem>
                                <SelectItem
                                    value="admin"
                                    className="cursor-pointer font-medium hover:bg-neutral-50"
                                >
                                    Admin
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.role && (
                            <p className="text-xs font-medium text-red-500">
                                {errors.role}
                            </p>
                        )}
                    </div>

                    <div className="mt-2 flex items-center justify-end border-t border-neutral-100 pt-4 md:col-span-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-4 w-full rounded-xl bg-[#C34A15] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A33D10] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
                        >
                            {processing ? 'Saving...' : 'Save User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

AdminUserCreate.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
