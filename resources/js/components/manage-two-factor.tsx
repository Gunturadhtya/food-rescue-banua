import { Form } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TwoFactorRecoveryCodes from '@/components/two-factor-recovery-codes';
import TwoFactorSetupModal from '@/components/two-factor-setup-modal';
import { Button } from '@/components/ui/button';
import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth';
import { disable, enable } from '@/routes/two-factor';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

export default function ManageTwoFactor(props: Props) {
    const requiresConfirmation = props.requiresConfirmation ?? false;
    const twoFactorEnabled = props.twoFactorEnabled ?? false;

    const {
        qrCodeSvg,
        hasSetupData,
        manualSetupKey,
        clearSetupData,
        clearTwoFactorAuthData,
        fetchSetupData,
        recoveryCodesList,
        fetchRecoveryCodes,
        errors,
    } = useTwoFactorAuth();
    const [showSetupModal, setShowSetupModal] = useState<boolean>(false);
    const prevTwoFactorEnabled = useRef(twoFactorEnabled);

    useEffect(() => {
        if (prevTwoFactorEnabled.current && !twoFactorEnabled) {
            clearTwoFactorAuthData();
        }

        prevTwoFactorEnabled.current = twoFactorEnabled;
    }, [twoFactorEnabled, clearTwoFactorAuthData]);

    if (!(props.canManageTwoFactor ?? false)) {
        return null;
    }

    return (
        <Card className="border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white shadow-xs">
            <CardHeader className="border-b border-neutral-50 pb-4">
                <CardTitle className="flex items-center gap-2 font-jakarta text-lg font-bold text-neutral-800">
                    <ShieldCheck className="h-5 w-5 text-orange-600" />
                    Two-factor authentication
                </CardTitle>
                <CardDescription>
                    Manage your two-factor authentication settings.
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                {twoFactorEnabled ? (
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <p className="text-sm font-medium text-neutral-600">
                            You will be prompted for a secure, random pin during
                            login, which you can retrieve from the
                            TOTP-supported application on your phone.
                        </p>

                        <div className="relative inline">
                            <Form {...disable.form()}>
                                {({ processing }) => (
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        disabled={processing}
                                        className="cursor-pointer transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        Disable 2FA
                                    </Button>
                                )}
                            </Form>
                        </div>

                        <TwoFactorRecoveryCodes
                            recoveryCodesList={recoveryCodesList}
                            fetchRecoveryCodes={fetchRecoveryCodes}
                            errors={errors}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col items-start justify-start space-y-4">
                        <p className="text-sm font-medium text-neutral-600">
                            When you enable two-factor authentication, you will
                            be prompted for a secure pin during login. This pin
                            can be retrieved from a TOTP-supported application
                            on your phone.
                        </p>

                        <div>
                            {hasSetupData ? (
                                <Button
                                    onClick={() => setShowSetupModal(true)}
                                    className="cursor-pointer bg-[#C34A15] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                                >
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Continue setup
                                </Button>
                            ) : (
                                <Form
                                    {...enable.form()}
                                    onSuccess={() => setShowSetupModal(true)}
                                >
                                    {({ processing }) => (
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="cursor-pointer bg-[#C34A15] font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                                        >
                                            Enable 2FA
                                        </Button>
                                    )}
                                </Form>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>

            <TwoFactorSetupModal
                isOpen={showSetupModal}
                onClose={() => setShowSetupModal(false)}
                requiresConfirmation={requiresConfirmation}
                twoFactorEnabled={twoFactorEnabled}
                qrCodeSvg={qrCodeSvg}
                manualSetupKey={manualSetupKey}
                clearSetupData={clearSetupData}
                fetchSetupData={fetchSetupData}
                errors={errors}
            />
        </Card>
    );
}
