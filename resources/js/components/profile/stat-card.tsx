import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="flex flex-col gap-4 p-6 border rounded-2xl border-border-warning bg-white flex-1 min-w-[200px]">
            <div className="flex items-center gap-4">
                {icon && <div className="w-12 h-12 bg-brand-surface rounded-full flex items-center justify-center">{icon}</div>}
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-text-secondary font-instrument">{title}</span>
                    <span className="text-2xl font-semibold text-text-primary font-jakarta">{value}</span>
                </div>
            </div>
        </div>
    );
}