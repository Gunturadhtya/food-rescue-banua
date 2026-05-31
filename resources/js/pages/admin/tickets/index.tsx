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
        
        if (window.confirm(`Apakah kamu yakin ingin menghapus tiket #${identifier} ini?`)) {
            router.delete(`/admin/tickets/${ticket.id}`);
        }
    };

    const getStatusText = (status: any) => {
        if (!status) return 'pending';
        if (typeof status === 'object') return status.value || status.name || 'pending';
        return String(status);
    };

    return (
        <div className="space-y-6">
            <Head title="Pickup Tickets" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold font-jakarta text-gray-900">Pickup Tickets</h1>
                    <p className="text-sm text-neutral-500">Pantau semua tiket pengambilan pesanan yang dimiliki pembeli.</p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] border border-neutral-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Ticket ID / Code</th>
                                <th className="px-6 py-4 font-semibold">Buyer (User)</th>
                                <th className="px-6 py-4 font-semibold">Rescue Info</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                                <th className="px-6 py-4 font-semibold">Expires At</th>
                                <th className="px-6 py-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100 text-gray-900">
                            {tickets.data.map((ticket) => {
                                const statusText = getStatusText(ticket.status).toLowerCase();

                                return (
                                    <tr key={ticket.id} className="hover:bg-neutral-50/50 transition-colors">
                                        <td className="px-6 py-4 flex flex-col gap-1">
                                            <div className="font-bold text-gray-900 flex items-center gap-2">
                                                <TicketIcon size={16} className="text-[#C34A15]" />
                                                {ticket.code || `TK-${ticket.id}`}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {ticket.user?.name ?? 'Unknown Buyer'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">RC-{ticket.rescue?.id ?? '-'}</div>
                                            <div className="text-xs text-neutral-500">{ticket.rescue?.shop?.name ?? '-'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                statusText === 'redeemed' || statusText === 'claimed' ? 'bg-green-100 text-green-800' :
                                                statusText === 'active' ? 'bg-blue-100 text-blue-800' :
                                                statusText === 'expired' ? 'bg-red-100 text-red-800' :
                                                'bg-amber-100 text-amber-800'
                                            }`}>
                                                {statusText}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-500 text-xs">
                                            {ticket.expires_at 
                                                ? new Date(ticket.expires_at).toLocaleString('id-ID', {
                                                    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                                }) 
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-4">
                                            <button 
                                                onClick={() => handleDeleteTicket(ticket)}
                                                className="text-red-600 hover:text-red-800 font-semibold transition-colors">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {tickets.data.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-neutral-500">
                                        Belum ada data tiket.
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

AdminTicketIndex.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;