import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import StatCard from '@/components/profile/stat-card';
import ActiveTicket from '@/components/profile/active-ticket';
import TierProgress from '@/components/profile/tier-progress';

interface DashboardProps {
    stats: {
        totalSavings: number;
        totalKg: number;
        totalOrders: number;
        mealsSavedThisMonth: number;
    };
    activeTicket: {
        code: string;
        title: string;
        address: string;
        expires_at: string;
    } | null;
    tierProgress: {
        currentTier: string;
        nextTier: string | null;
        rescuesNeeded: number;
        totalRescues: number;
    };
}

export default function Dashboard({ stats, activeTicket, tierProgress }: DashboardProps) {
    // Retrieve the authenticated user from Inertia's shared props
    const { auth } = usePage().props as any;

    return (
        <ProfileLayout>
            <Head title="Profile Dashboard" />

            {/* Header Section */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold font-jakarta text-text-primary">Welcome, {auth.user.name}</h1>
                    <p className="text-text-secondary text-lg">Upaya kamu telah menyelamatkan {stats.mealsSavedThisMonth} porsi makanan bulan ini.</p>
                </div>
            </section>

            <section className="flex flex-wrap gap-6 mt-4">
                <StatCard
                    title="Total Savings"
                    value={`Rp ${stats.totalSavings.toLocaleString('id-ID')}`}
                />
                <StatCard
                    title="Food Rescued"
                    value={`${stats.totalKg} kg`}
                />
                <StatCard
                    title="Total Orders"
                    value={stats.totalOrders}
                />
            </section>

            <section className="mt-4">
                <h2 className="text-2xl font-bold font-jakarta mb-4">Active Rescue Ticket</h2>
                <ActiveTicket ticket={activeTicket} />
            </section>

            <section className="mt-4">
                <h2 className="text-2xl font-bold font-jakarta mb-4">Membership Tier</h2>
                <TierProgress {...tierProgress} />
            </section>
        </ProfileLayout>
    );
}

Dashboard.layout = (page: React.ReactNode) => page;