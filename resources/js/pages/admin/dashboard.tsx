// resources/js/pages/admin/dashboard.tsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Store, Package, Ticket } from 'lucide-react';
import ProfileLayout from '@/layouts/profile-layouts';

interface Stats {
    total_users: number;
    total_sellers: number;
    total_shops: number;
    active_rescues: number;
    total_tickets: number;
}

interface RecentUser {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
}

interface Props {
    stats: Stats;
    recent_users: RecentUser[];
}

export default function AdminDashboard({ stats, recent_users }: Props) {
    return (
        <div className="space-y-6">
            <Head title="Admin Dashboard" />

            <div className="flex flex-col gap-1 mb-8">
                <h1 className="text-3xl font-bold font-jakarta text-gray-900">System Overview</h1>
                <p className="text-sm text-neutral-500">Monitor and manage all platform activity.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-neutral-100 shadow-sm rounded-[20px]">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                            <Users size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-500">Total Users</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_users}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-neutral-100 shadow-sm rounded-[20px]">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-[#C34A15] flex items-center justify-center shrink-0">
                            <Store size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-500">Registered Shops</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_shops}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-neutral-100 shadow-sm rounded-[20px]">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                            <Package size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-500">Active Rescues</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.active_rescues}</h3>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-neutral-100 shadow-sm rounded-[20px]">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                            <Ticket size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-neutral-500">Tickets Issued</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.total_tickets}</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Access Table */}
            <Card className="border-neutral-100 shadow-sm mt-8 rounded-[24px]">
                <CardHeader className="flex flex-row items-center justify-between border-b border-neutral-100 pb-4">
                    <CardTitle className="text-lg">Recent Registrations</CardTitle>
                    <Link href="/admin/users" className="text-sm font-semibold text-[#C34A15] hover:underline">
                        View All
                    </Link>
                </CardHeader>
                <CardContent className="pt-0 px-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold">Role</th>
                                    <th className="px-6 py-4 font-semibold">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100 text-gray-900">
                                {recent_users.map(user => (
                                    <tr key={user.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium">{user.name}</td>
                                        <td className="px-6 py-4 text-neutral-500">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                user.role === 'seller' ? 'bg-orange-100 text-orange-800' :
                                                    'bg-blue-100 text-blue-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

AdminDashboard.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;