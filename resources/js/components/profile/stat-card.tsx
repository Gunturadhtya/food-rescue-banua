import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="flex min-w-[200px] flex-1 flex-col gap-4 rounded-2xl border border-border-warning bg-white p-6">
            <div className="flex items-center gap-4">
                {icon && (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-surface">
                        {icon}
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="font-instrument text-sm font-medium text-text-secondary">
                        {title}
                    </span>
                    <span className="font-jakarta text-2xl font-semibold text-text-primary">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}
