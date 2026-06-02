import { usePasskeyRegister } from '@laravel/passkeys/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type Props = {
    onSuccess: () => void;
};

export default function PasskeyRegistration({ onSuccess }: Props) {
    const [name, setName] = useState(() => {
        const ua = navigator.userAgent;

        const browser = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'].find(
            (browser) => new RegExp(browser).test(ua),
        );

        const os = ['iPhone', 'iPad', 'Android', 'Mac', 'Windows'].find((os) =>
            new RegExp(os).test(ua),
        );

        return [browser, os].filter(Boolean).join(' on ') || '';
    });

    const [showForm, setShowForm] = useState(false);
    const { register, isLoading, error, isSupported } = usePasskeyRegister({
        onSuccess: () => {
            setName('');
            setShowForm(false);
            onSuccess();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            return;
        }

        await register(name);
    };

    const handleCancel = () => {
        setShowForm(false);
        setName('');
    };

    if (!isSupported) {
        return (
            <div className="text-sm text-muted-foreground">
                Passkeys are not supported in this browser.
            </div>
        );
    }

    if (!showForm) {
        return (
            <Button
                variant="outline"
                onClick={() => setShowForm(true)}
                className="cursor-pointer border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
            >
                Add passkey
            </Button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-xl border border-orange-100 bg-orange-50/10 p-4"
        >
            <div className="grid gap-2">
                <Label
                    htmlFor="passkey-name"
                    className="text-sm font-semibold text-neutral-700"
                >
                    Passkey name
                </Label>
                <Input
                    id="passkey-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., MacBook Pro, iPhone"
                    className="mt-1 block w-full border-neutral-200 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                    autoFocus
                />
                <p className="text-xs text-neutral-500">
                    A name helps you identify this passkey later.
                </p>
            </div>

            {error && <InputError message={error} />}

            <div className="flex gap-2">
                <Button
                    type="submit"
                    disabled={isLoading || !name.trim()}
                    className="cursor-pointer bg-[#C34A15] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                >
                    {isLoading ? 'Registering...' : 'Register passkey'}
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={handleCancel}
                    className="cursor-pointer text-neutral-600 transition-colors hover:text-neutral-900"
                >
                    Cancel
                </Button>
            </div>
        </form>
    );
}
