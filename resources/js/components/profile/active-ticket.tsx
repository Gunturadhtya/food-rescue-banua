import React from 'react';
import { useCountdown } from '../../hooks/user-countdown';
import { Ticket, MapPin, Clock } from 'lucide-react';

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
            <div className="rounded-2xl border-2 border-dashed border-orange-100 bg-orange-50/10 p-8 text-center">
                <Ticket className="mx-auto mb-3 h-8 w-8 text-orange-400" />
                <p className="font-semibold text-neutral-800">
                    No active rescue tickets
                </p>
                <p className="mt-1 text-sm text-neutral-500">
                    Claim a food rescue item to generate a ticket!
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white p-6 shadow-xs md:flex-row md:items-center">
            <div className="flex flex-col gap-2">
                <span className="w-fit rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-xs font-bold tracking-wider text-orange-700 uppercase">
                    Active Rescue
                </span>
                <h3 className="flex items-center gap-2 text-xl font-bold text-neutral-800">
                    <Ticket className="h-5 w-5 text-orange-600" />
                    {ticket.title}
                </h3>
                <p className="flex items-center gap-1.5 text-sm font-medium text-neutral-600">
                    <MapPin className="h-4 w-4 shrink-0 text-orange-500" />
                    {ticket.address}
                </p>
                <div className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-xl border border-orange-200 bg-orange-50/30 px-3.5 py-1.5 font-mono text-sm font-bold text-[#C34A15]">
                    Code: {ticket.code}
                </div>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                <span className="flex items-center gap-1 text-xs font-bold tracking-wider text-neutral-500 uppercase">
                    <Clock className="h-3.5 w-3.5 text-orange-500" />
                    Expires In
                </span>
                {isExpired ? (
                    <span className="rounded-xl border border-red-100 bg-red-50 px-3 py-1.5 text-lg font-bold text-red-600">
                        Expired
                    </span>
                ) : (
                    <div className="flex gap-2 font-mono text-lg font-bold text-[#C34A15]">
                        <div className="rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2 shadow-xs">
                            {hours.toString().padStart(2, '0')}h
                        </div>
                        <div className="rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2 shadow-xs">
                            {minutes.toString().padStart(2, '0')}m
                        </div>
                        <div className="rounded-xl border border-orange-100 bg-orange-50/50 px-3 py-2 shadow-xs">
                            {seconds.toString().padStart(2, '0')}s
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
