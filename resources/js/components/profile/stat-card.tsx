import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    borderColor?: string;
    iconBg?: string;
}

export default function StatCard({
    title,
    value,
    icon,
    borderColor = 'border-t-orange-500',
    iconBg = 'bg-orange-50',
}: StatCardProps) {
    return (
        <div
            className={`flex min-w-[200px] flex-1 flex-col gap-4 rounded-2xl border border-t-4 border-orange-100 ${borderColor} bg-gradient-to-br from-white via-orange-50/5 to-white p-6 shadow-xs transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
        >
            <div className="flex items-center gap-4">
                {icon && (
                    <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${iconBg}`}
                    >
                        {icon}
                    </div>
                )}
                <div className="flex flex-col">
                    <span className="font-instrument text-sm font-semibold text-neutral-500">
                        {title}
                    </span>
                    <span className="font-jakarta text-2xl font-bold text-neutral-800">
                        {value}
                    </span>
                </div>
            </div>
        </div>
    );
}
