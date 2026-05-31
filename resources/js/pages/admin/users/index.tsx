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
        if (window.confirm(`Apakah kamu yakin ingin menghapus user "${name}" secara permanen?`)) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <div className="space-y-6">
            <Head title="Manage Users" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold font-jakarta text-gray-900">Manage Users</h1>
                    <p className="text-sm text-neutral-500">Kelola semua akun pembeli, penjual, dan admin.</p>
                </div>
                <button className="bg-[#C34A15] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#A33D10] transition-colors shrink-0">
                    + Add New User
                </button>
            </div>

            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Name</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Role</th>
                                <th className="px-6 py-4 font-semibold">Joined Date</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-neutral-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                            user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                            user.role === 'seller' ? 'bg-orange-100 text-orange-800' :
                                            'bg-blue-100 text-blue-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {new Date(user.created_at).toLocaleDateString('id-ID', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(user.id, user.name)}
                                            className="text-red-600 hover:text-red-800 font-semibold transition-colors">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data user.
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

AdminUserIndex.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;