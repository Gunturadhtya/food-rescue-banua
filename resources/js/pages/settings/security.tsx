import { Form, Head } from '@inertiajs/react';
import { useRef } from 'react';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import InputError from '@/components/input-error';
import SettingsLayout from '@/layouts/settings/layout';
import type { Props as ManagePasskeysProps } from '@/components/manage-passkeys';
import ManagePasskeys from '@/components/manage-passkeys';
import type { Props as ManageTwoFactorProps } from '@/components/manage-two-factor';
import ManageTwoFactor from '@/components/manage-two-factor';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { edit } from '@/routes/security';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Lock, Save } from 'lucide-react';

type Props = {
    passwordRules: string;
} & ManagePasskeysProps &
    ManageTwoFactorProps;

export default function Security(props: Props) {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    return (
        <>
            <Head title="Security settings" />

            <h1 className="sr-only">Security settings</h1>

            <div className="space-y-8">
                <Card className="border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white shadow-xs">
                    <CardHeader className="border-b border-neutral-50 pb-4">
                        <CardTitle className="flex items-center gap-2 font-jakarta text-lg font-bold text-neutral-800">
                            <Lock className="h-5 w-5 text-orange-600" />
                            Update password
                        </CardTitle>
                        <CardDescription>
                            Ensure your account is using a long, random password
                            to stay secure.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Form
                            {...SecurityController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            resetOnError={[
                                'password',
                                'password_confirmation',
                                'current_password',
                            ]}
                            resetOnSuccess
                            onError={(errors) => {
                                if (errors.password) {
                                    passwordInput.current?.focus();
                                }

                                if (errors.current_password) {
                                    currentPasswordInput.current?.focus();
                                }
                            }}
                            className="space-y-6"
                        >
                            {({ errors, processing }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="current_password"
                                            className="text-sm font-semibold text-neutral-700"
                                        >
                                            Current password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                            <PasswordInput
                                                id="current_password"
                                                ref={currentPasswordInput}
                                                name="current_password"
                                                className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                autoComplete="current-password"
                                                placeholder="Current password"
                                            />
                                        </div>
                                        <InputError
                                            message={errors.current_password}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password"
                                            className="text-sm font-semibold text-neutral-700"
                                        >
                                            New password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                            <PasswordInput
                                                id="password"
                                                ref={passwordInput}
                                                name="password"
                                                className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                autoComplete="new-password"
                                                placeholder="New password"
                                                passwordrules={
                                                    props.passwordRules
                                                }
                                            />
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="password_confirmation"
                                            className="text-sm font-semibold text-neutral-700"
                                        >
                                            Confirm password
                                        </Label>
                                        <div className="relative">
                                            <Lock className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                            <PasswordInput
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                autoComplete="new-password"
                                                placeholder="Confirm password"
                                                passwordrules={
                                                    props.passwordRules
                                                }
                                            />
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    <div className="flex items-center justify-end border-t border-neutral-100 pt-4">
                                        <Button
                                            disabled={processing}
                                            data-test="update-password-button"
                                            className="bg-[#C34A15] px-6 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Password
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>

                <ManageTwoFactor
                    canManageTwoFactor={props.canManageTwoFactor}
                    requiresConfirmation={props.requiresConfirmation}
                    twoFactorEnabled={props.twoFactorEnabled}
                />

                <ManagePasskeys
                    canManagePasskeys={props.canManagePasskeys}
                    passkeys={props.passkeys}
                />
            </div>
        </>
    );
}

Security.layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;
