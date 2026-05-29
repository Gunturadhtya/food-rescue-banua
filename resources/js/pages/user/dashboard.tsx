import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import StatCard from '@/components/profile/stat-card';
import ActiveTicket from '@/components/profile/active-ticket';
import TierProgress from '@/components/profile/tier-progress';

interface DashboardProps {
    stats?: {
        totalSavings?: number;
        totalKg?: number;
        totalOrders?: number;
        mealsSavedThisMonth?: number;
    };
    activeTicket?: {
        code: string;
        title: string;
        address: string;
        expires_at: string;
    } | null;
    tierProgress?: {
        currentTier?: string;
        nextTier?: string | null;
        rescuesNeeded?: number;
        totalRescues?: number;
    };
}

export default function Dashboard({ stats, activeTicket, tierProgress }: DashboardProps) {
    const { auth } = usePage().props as any;

    // EKSTRAKSI AMAN: Mencegah undefined.toLocaleString() crash
    const totalSavings = stats?.totalSavings ?? 0;
    const totalKg = stats?.totalKg ?? 0;
    const totalOrders = stats?.totalOrders ?? 0;
    const mealsSaved = stats?.mealsSavedThisMonth ?? 0;

    const currentTier = tierProgress?.currentTier ?? 'Earth Keeper';
    const nextTier = tierProgress?.nextTier ?? 'Waste Warrior';
    const rescuesNeeded = tierProgress?.rescuesNeeded ?? 6;
    const totalRescues = tierProgress?.totalRescues ?? 15;

    return (
        <>
            <Head title="Profile Dashboard" />

            {/* Header Section */}
            <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-bold font-jakarta text-gray-900">
                        Welcome, {auth?.user?.name || 'User'}
                    </h1>
                    <p className="text-neutral-500 text-lg">
                        Upaya kamu telah menyelamatkan {mealsSaved} porsi makanan bulan ini.
                    </p>
                </div>
            </section>

            <section className="flex flex-wrap gap-6 mt-6">
                <StatCard
                    title="Total Savings"
                    value={`Rp ${totalSavings.toLocaleString('id-ID')}`}
                />
                <StatCard
                    title="Food Rescued"
                    value={`${totalKg} kg`}
                />
                <StatCard
                    title="Total Orders"
                    value={totalOrders}
                />
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold font-jakarta mb-6 text-gray-900">Active Rescue Ticket</h2>
                <ActiveTicket ticket={activeTicket ?? null} />
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-bold font-jakarta mb-6 text-gray-900">Membership Tier</h2>
                <TierProgress 
                    currentTier={currentTier}
                    nextTier={nextTier}
                    rescuesNeeded={rescuesNeeded}
                    totalRescues={totalRescues}
                />
            </section>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;