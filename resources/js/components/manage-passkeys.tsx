import { router } from '@inertiajs/react';
import { KeyRound } from 'lucide-react';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';
import PasskeyItem from '@/components/passkey-item';
import PasskeyRegistration from '@/components/passkey-register';
import type { Passkey } from '@/types/auth';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

const EmptyState = () => {
    return (
        <div className="bg-orange-50/10 p-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-orange-500">
                <KeyRound className="h-7 w-7" />
            </div>
            <p className="font-semibold text-neutral-800">No passkeys yet</p>
            <p className="mt-1 text-sm text-neutral-500">
                Add a passkey to sign in without a password
            </p>
        </div>
    );
};

export default function ManagePasskeys(props: Props) {
    const passkeys = props.passkeys ?? [];

    const handleDelete = (id: number, onError: () => void) => {
        router.delete(destroy.url(id), {
            preserveScroll: true,
            onError,
        });
    };

    const handleRegisterSuccess = () => {
        router.reload();
    };

    if (!(props.canManagePasskeys ?? false)) {
        return null;
    }

    return (
        <Card className="border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white shadow-xs">
            <CardHeader className="border-b border-neutral-50 pb-4">
                <CardTitle className="flex items-center gap-2 font-jakarta text-lg font-bold text-neutral-800">
                    <KeyRound className="h-5 w-5 text-orange-600" />
                    Passkeys
                </CardTitle>
                <CardDescription>
                    Manage your passkeys for passwordless sign-in.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
                <div className="overflow-hidden rounded-xl border border-neutral-200">
                    {passkeys.length > 0 ? (
                        passkeys.map((passkey) => (
                            <PasskeyItem
                                key={passkey.id}
                                passkey={passkey}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <EmptyState />
                    )}
                </div>

                <PasskeyRegistration onSuccess={handleRegisterSuccess} />
            </CardContent>
        </Card>
    );
}
