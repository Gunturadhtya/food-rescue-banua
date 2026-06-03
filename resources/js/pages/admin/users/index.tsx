import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
    };
}

export default function AdminUserIndex({ users }: Props) {
    const handleDelete = (id: number, name: string) => {
        if (
            window.confirm(
                `Are you sure you want to permanently delete user "${name}"?`,
            )
        ) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <div className="space-y-6">
            <Head title="Manage Users" />

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                        Manage Users
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Manage all volunteer, merchant, and admin accounts.
                    </p>
                </div>
                <Link
                    href="/admin/users/create"
                    className="shrink-0 rounded-xl bg-[#C34A15] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A33D10]"
                >
                    + Add New User
                </Link>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-neutral-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Name
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Email
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Role
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Joined Date
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {users.data.map((user) => (
                                <tr
                                    key={user.id}
                                    className="transition-colors hover:bg-neutral-50/50"
                                >
                                    <td className="px-6 py-4 font-medium">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`rounded-md px-2 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                                user.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : user.role === 'seller'
                                                      ? 'bg-orange-100 text-orange-800'
                                                      : 'bg-blue-100 text-blue-800'
                                            }`}
                                        >
                                            {user.role === 'seller'
                                                ? 'merchant'
                                                : user.role === 'user'
                                                  ? 'volunteer'
                                                  : user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString('id-ID', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </td>
                                    <td className="space-x-4 px-6 py-4 text-right">
                                        <Link
                                            href={`/admin/users/${user.id}/edit`}
                                            className="font-semibold text-blue-600 transition-colors hover:text-blue-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id, user.name)
                                            }
                                            className="font-semibold text-red-600 transition-colors hover:text-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-8 text-center text-neutral-500"
                                    >
                                        No user data available.
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

AdminUserIndex.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
