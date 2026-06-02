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
    const { hours, minutes, seconds, isExpired } = useCountdown(
        ticket?.expires_at ?? null,
    );

    if (!ticket) {
        return (
            <div className="rounded-3xl border border-dashed border-gray-300 p-8 text-center">
                <p className="text-text-muted">No active rescue tickets.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border-warning bg-brand-surface p-6 md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold tracking-wider text-brand-primary uppercase">
                    Active Rescue
                </span>
                <h3 className="text-xl font-bold text-text-primary">
                    {ticket.title}
                </h3>
                <p className="text-text-secondary">{ticket.address}</p>
                <div className="mt-2 inline-block rounded-md border bg-white px-3 py-1 font-mono text-sm">
                    Code: {ticket.code}
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span className="text-sm text-text-secondary">Expires In</span>
                {isExpired ? (
                    <span className="text-lg font-bold text-red-600">
                        Expired
                    </span>
                ) : (
                    <div className="flex gap-2 font-mono text-xl font-bold text-brand-primary">
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                            {hours.toString().padStart(2, '0')}h
                        </div>
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                            {minutes.toString().padStart(2, '0')}m
                        </div>
                        <div className="rounded-lg bg-white px-3 py-2 shadow-sm">
                            {seconds.toString().padStart(2, '0')}s
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
