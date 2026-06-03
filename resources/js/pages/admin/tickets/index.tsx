import React from 'react';
import { Head, router } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Ticket as TicketIcon } from 'lucide-react';

interface User {
    id: number;
    name: string;
}

interface Shop {
    id: number;
    name: string;
}

interface Rescue {
    id: number;
    price: any;
    shop?: Shop;
}

interface Ticket {
    id: number;
    status?: any;
    code?: string;
    expires_at: string | null;
    created_at: string;
    user?: User;
    rescue?: Rescue;
}

interface Props {
    tickets: {
        data: Ticket[];
    };
}

export default function AdminTicketIndex({ tickets }: Props) {
    const handleDeleteTicket = (ticket: Ticket) => {
        const identifier = ticket.code || `TK-${ticket.id}`;

        if (
            window.confirm(
                `Are you sure you want to delete ticket #${identifier}?`,
            )
        ) {
            router.delete(`/admin/tickets/${ticket.id}`);
        }
    };

    const getStatusText = (status: any) => {
        if (!status) return 'pending';
        if (typeof status === 'object')
            return status.value || status.name || 'pending';
        return String(status);
    };

    return (
        <div className="space-y-6">
            <Head title="Pickup Tickets" />

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                        Pickup Tickets
                    </h1>
                    <p className="text-sm text-neutral-500">
                        Monitor all order pickup tickets owned by volunteers.
                    </p>
                </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-neutral-100 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-semibold">
                                    Ticket ID / Code
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Volunteer (User)
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Rescue Info
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold">
                                    Expires At
                                </th>
                                <th className="px-6 py-4 text-right font-semibold">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {tickets.data.map((ticket) => {
                                const statusText = getStatusText(
                                    ticket.status,
                                ).toLowerCase();

                                return (
                                    <tr
                                        key={ticket.id}
                                        className="transition-colors hover:bg-neutral-50/50"
                                    >
                                        <td className="flex flex-col gap-1 px-6 py-4">
                                            <div className="flex items-center gap-2 font-bold text-gray-900">
                                                <TicketIcon
                                                    size={16}
                                                    className="text-[#C34A15]"
                                                />
                                                {ticket.code ||
                                                    `TK-${ticket.id}`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {ticket.user?.name ??
                                                    'Unknown Volunteer'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                RC-{ticket.rescue?.id ?? '-'}
                                            </div>
                                            <div className="text-xs text-neutral-500">
                                                {ticket.rescue?.shop?.name ??
                                                    '-'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`rounded-md px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                                    statusText === 'redeemed' ||
                                                    statusText === 'claimed'
                                                        ? 'bg-green-100 text-green-800'
                                                        : statusText ===
                                                            'active'
                                                          ? 'bg-blue-100 text-blue-800'
                                                          : statusText ===
                                                              'expired'
                                                            ? 'bg-red-100 text-red-800'
                                                            : 'bg-amber-100 text-amber-800'
                                                }`}
                                            >
                                                {statusText}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-neutral-500">
                                            {ticket.expires_at
                                                ? new Date(
                                                      ticket.expires_at,
                                                  ).toLocaleString('id-ID', {
                                                      day: 'numeric',
                                                      month: 'short',
                                                      year: 'numeric',
                                                      hour: '2-digit',
                                                      minute: '2-digit',
                                                  })
                                                : '-'}
                                        </td>
                                        <td className="space-x-4 px-6 py-4 text-right">
                                            <button
                                                onClick={() =>
                                                    handleDeleteTicket(ticket)
                                                }
                                                className="font-semibold text-red-600 transition-colors hover:text-red-800"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {tickets.data.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="px-6 py-8 text-center text-neutral-500"
                                    >
                                        No ticket data available.
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

AdminTicketIndex.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
