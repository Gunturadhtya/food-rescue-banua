import React from 'react';
import { Head } from '@inertiajs/react';
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
    return (
        <ProfileLayout>
            <Head title="Profile Dashboard" />

            <section className="flex flex-col gap-2">
                <h1 className="text-4xl font-bold font-jakarta text-text-primary">Your Impact</h1>
                <p className="text-text-secondary text-lg">Thank you for helping reduce food waste.</p>
            </section>

            <section className="flex flex-wrap gap-6">
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