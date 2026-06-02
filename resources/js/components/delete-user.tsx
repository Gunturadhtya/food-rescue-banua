import { Form } from '@inertiajs/react';
import { useRef } from 'react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Trash2 } from 'lucide-react';
import React from 'react';

export default function DeleteUser() {
    const passwordInput = useRef<HTMLInputElement>(null);

    return (
        <Card className="border border-red-200 border-t-4 border-t-red-500 bg-gradient-to-br from-white via-rose-50/5 to-white shadow-xs overflow-hidden">
            
            <CardHeader className="border-b border-neutral-50 pb-4">
                <CardTitle className="text-lg font-bold text-red-700 font-jakarta flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Danger Zone
                </CardTitle>
                <CardDescription>
                    Permanently delete your account and all associated data.
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-4 rounded-xl border border-red-100 bg-red-50/50">
                    <div className="space-y-1">
                        <p className="font-semibold text-red-800 text-sm">Once you delete your account, there is no going back.</p>
                        <p className="text-xs text-red-600">
                            All your claimed food rescues, tickets, and history will be permanently wiped from the database. Please proceed with caution.
                        </p>
                    </div>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                variant="destructive"
                                data-test="delete-user-button"
                                className="shrink-0 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Account
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="flex items-center gap-2 text-red-700 font-bold font-jakarta">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                Are you absolutely sure?
                            </DialogTitle>
                            <DialogDescription className="text-neutral-500">
                                This action cannot be undone. This will permanently delete your account and remove your data from our servers. Please enter your password to confirm.
                            </DialogDescription>

                            <Form
                                {...ProfileController.destroy.form()}
                                options={{
                                    preserveScroll: true,
                                }}
                                onError={() => passwordInput.current?.focus()}
                                resetOnSuccess
                                className="space-y-6"
                            >
                                {({ resetAndClearErrors, processing, errors }) => (
                                    <>
                                        <div className="grid gap-2 pt-2">
                                            <Label
                                                htmlFor="password"
                                                className="text-sm font-semibold text-neutral-700"
                                            >
                                                Confirm Password
                                            </Label>

                                            <PasswordInput
                                                id="password"
                                                name="password"
                                                ref={passwordInput}
                                                placeholder="Enter password to confirm account deletion"
                                                autoComplete="current-password"
                                                className="border-neutral-200 focus-visible:ring-red-500/20 focus-visible:border-red-500"
                                            />

                                            <InputError message={errors.password} />
                                        </div>

                                        <DialogFooter className="gap-2 pt-2 border-t border-neutral-100">
                                            <DialogClose asChild>
                                                <Button
                                                    variant="secondary"
                                                    onClick={() =>
                                                        resetAndClearErrors()
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </DialogClose>

                                            <Button
                                                variant="destructive"
                                                disabled={processing}
                                                asChild
                                            >
                                                <button
                                                    type="submit"
                                                    data-test="confirm-delete-user-button"
                                                    className="font-bold flex items-center justify-center cursor-pointer text-white"
                                                >
                                                    Yes, Delete My Account
                                                </button>
                                            </Button>
                                        </DialogFooter>
                                    </>
                                )}
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardContent>
        </Card>
    );
}
