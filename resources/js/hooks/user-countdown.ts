import { useState, useEffect } from 'react';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
    isExpired: boolean;
}

export function useCountdown(expiresAt: string | null): TimeLeft {
    const calculateTimeLeft = (): TimeLeft => {
        if (!expiresAt)
            return { hours: 0, minutes: 0, seconds: 0, isExpired: true };

        const difference = new Date(expiresAt).getTime() - new Date().getTime();

        if (difference <= 0) {
            return { hours: 0, minutes: 0, seconds: 0, isExpired: true };
        }

        return {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isExpired: false,
        };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        if (!expiresAt || timeLeft.isExpired) return;

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [expiresAt]);

    return timeLeft;
}
