import React from 'react';

interface TierProps {
    currentTier: string;
    nextTier: string | null;
    rescuesNeeded: number;
    totalRescues: number;
}

export default function TierProgress({ currentTier, nextTier, rescuesNeeded, totalRescues }: TierProps) {
    // Assuming 20 rescues is the gap between tiers for visual calculation
    const progressPercentage = nextTier ? Math.max(0, 100 - (rescuesNeeded / 20) * 100) : 100;

    return (
        <div className="bg-white border rounded-3xl p-8 flex flex-col gap-6 shadow-sm">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="text-2xl font-bold text-text-primary font-jakarta">{currentTier}</h3>
                    {nextTier && (
                        <p className="text-text-secondary mt-2">
                            Just <span className="font-bold text-brand-primary">{rescuesNeeded}</span> more rescues to unlock {nextTier}.
                        </p>
                    )}
                </div>
            </div>

            <div className="relative w-full h-4 bg-brand-surface rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-bg-warning rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}