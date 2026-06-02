import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';

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
        <div className="flex flex-col gap-6 rounded-2xl border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                        <Trophy className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="font-jakarta text-2xl font-bold tracking-tight text-neutral-800">
                            {currentTier}
                        </h3>
                        {nextTier ? (
                            <p className="mt-2 text-sm font-medium text-neutral-600">
                                Just{' '}
                                <span className="font-bold text-[#C34A15]">
                                    {rescuesNeeded}
                                </span>{' '}
                                more rescues to unlock {nextTier}.
                            </p>
                        ) : (
                            <p className="mt-2 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                                <Sparkles className="h-4 w-4" />
                                You've reached the highest membership tier!
                            </p>
                        )}
                    </div>
                </div>
                <div className="shrink-0 text-right">
                    <span className="text-xs font-bold tracking-wider text-neutral-400 uppercase">
                        Progress
                    </span>
                    <p className="font-mono text-lg font-bold text-[#C34A15]">
                        {Math.round(progressPercentage)}%
                    </p>
                </div>
            </div>

            <div className="relative h-4 w-full overflow-hidden rounded-full bg-amber-50">
                <div
                    className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-[#C34A15] transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}
