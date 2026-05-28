import React from 'react';
import { useCountdown } from '../../hooks/user-countdown';

interface TicketProps {
    ticket: {
        code: string;
        title: string;
        address: string;
        expires_at: string;
    } | null;
}

export default function ActiveTicket({ ticket }: TicketProps) {
    const { hours, minutes, seconds, isExpired } = useCountdown(ticket?.expires_at ?? null);

    if (!ticket) {
        return (
            <div className="p-8 border border-dashed border-gray-300 rounded-3xl text-center">
                <p className="text-text-muted">No active rescue tickets.</p>
            </div>
        );
    }

    return (
        <div className="bg-brand-surface border border-border-warning rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-brand-primary tracking-wider uppercase">Active Rescue</span>
                <h3 className="text-xl font-bold text-text-primary">{ticket.title}</h3>
                <p className="text-text-secondary">{ticket.address}</p>
                <div className="mt-2 text-sm font-mono bg-white px-3 py-1 rounded-md border inline-block">
                    Code: {ticket.code}
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-text-secondary">Expires In</span>
                {isExpired ? (
                    <span className="text-lg font-bold text-red-600">Expired</span>
                ) : (
                    <div className="flex gap-2 text-xl font-bold font-mono text-brand-primary">
                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm">{hours.toString().padStart(2, '0')}h</div>
                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm">{minutes.toString().padStart(2, '0')}m</div>
                        <div className="bg-white px-3 py-2 rounded-lg shadow-sm">{seconds.toString().padStart(2, '0')}s</div>
                    </div>
                )}
            </div>
        </div>
    );
}