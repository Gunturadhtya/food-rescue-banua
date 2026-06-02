import React from 'react';

interface TierProps {
    currentTier: string;
    nextTier: string | null;
    rescuesNeeded: number;
    totalRescues: number;
}

export default function TierProgress({
    currentTier,
    nextTier,
    rescuesNeeded,
    totalRescues,
}: TierProps) {
    // Assuming 20 rescues is the gap between tiers for visual calculation
    const progressPercentage = nextTier
        ? Math.max(0, 100 - (rescuesNeeded / 20) * 100)
        : 100;

    return (
        <div className="flex flex-col gap-6 rounded-3xl border bg-white p-8 shadow-sm">
            <div className="flex items-end justify-between">
                <div>
                    <h3 className="font-jakarta text-2xl font-bold text-text-primary">
                        {currentTier}
                    </h3>
                    {nextTier && (
                        <p className="mt-2 text-text-secondary">
                            Just{' '}
                            <span className="font-bold text-brand-primary">
                                {rescuesNeeded}
                            </span>{' '}
                            more rescues to unlock {nextTier}.
                        </p>
                    )}
                </div>
            </div>

            <div className="relative h-4 w-full overflow-hidden rounded-full bg-brand-surface">
                <div
                    className="absolute top-0 left-0 h-full rounded-full bg-bg-warning transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}
