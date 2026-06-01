import { Form, Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import SettingsLayout from '@/layouts/settings/layout';
import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { send } from '@/routes/verification';
import type { Auth } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
    User as UserIcon, 
    Mail, 
    Phone, 
    BookOpen, 
    Save, 
    Calendar, 
    Trophy, 
    Sparkles, 
    Camera,
    ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

type TierInfo = {
    currentTier: string;
    nextTier: string | null;
    rescuesNeeded: number;
    totalRescues: number;
};

type PageProps = {
    auth: Auth;
};

export default function Profile({
    mustVerifyEmail,
    status,
    tierInfo,
}: {
    mustVerifyEmail: boolean;
    status?: string;
    tierInfo: TierInfo;
}) {
    const { auth } = usePage<PageProps>().props;

    // Get initials for Avatar
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Calculate progress to next tier
    const total = tierInfo.totalRescues;
    let progressPercent = 100;
    let tierRangeLabel = '';

    if (total < 10) {
        progressPercent = (total / 10) * 100;
        tierRangeLabel = `${total} / 10 rescues`;
    } else if (total < 25) {
        progressPercent = ((total - 10) / 15) * 100;
        tierRangeLabel = `${total} / 25 rescues`;
    } else if (total < 50) {
        progressPercent = ((total - 25) / 25) * 100;
        tierRangeLabel = `${total} / 50 rescues`;
    } else {
        progressPercent = 100;
        tierRangeLabel = `${total} rescues`;
    }

    // Role display styling
    const roleColors: Record<string, string> = {
        admin: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/50',
        seller: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/50',
        user: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50',
    };

    const roleLabels: Record<string, string> = {
        admin: 'Administrator',
        seller: 'Seller',
        user: 'Buyer',
    };

    const userRole = (auth.user.role as string) || 'user';

    return (
        <>
            <Head title="Profile settings" />
            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-8">
                {/* 1. Gorgeous Profile Header Card */}
                <Card className="border border-orange-100 border-t-4 border-t-[#C34A15] bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white shadow-xs md:col-span-3 transition-all duration-300">
                    
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            {/* Avatar Bubble */}
                            <div className="group relative h-24 w-24 shrink-0 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-[#C34A15] text-white font-bold text-3xl flex items-center justify-center shadow-md border-4 border-white transition-transform duration-300 hover:scale-105">
                                {getInitials(auth.user.name)}
                                {/* Mock Photo Camera Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            </div>

                            <div className="text-center sm:text-left space-y-1.5">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <h2 className="text-2xl font-bold text-neutral-800 tracking-tight font-jakarta">
                                        {auth.user.name}
                                    </h2>
                                    <span className={cn(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider w-fit mx-auto sm:mx-0",
                                        roleColors[userRole] || roleColors.user
                                    )}>
                                        {roleLabels[userRole] || 'Buyer'}
                                    </span>
                                </div>
                                <p className="text-sm text-neutral-600 flex items-center justify-center sm:justify-start gap-1.5 font-medium">
                                    <Mail className="h-4 w-4 shrink-0 text-orange-600" />
                                    {auth.user.email}
                                </p>
                                <p className="text-xs text-neutral-500 flex items-center justify-center sm:justify-start gap-1">
                                    <Calendar className="h-3.5 w-3.5 text-orange-500" />
                                    Member since {new Date(auth.user.created_at).toLocaleDateString('id-ID', {
                                        month: 'long', year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Beautiful Form Card */}
                <Card className="border border-orange-100 border-t-4 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white shadow-xs">
                    <CardHeader className="border-b border-neutral-50 pb-4">
                        <CardTitle className="text-lg font-bold text-neutral-800 font-jakarta flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-orange-600" />
                            Profile Details
                        </CardTitle>
                        <CardDescription>
                            Update your basic contact information and profile bio.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <Form
                            {...ProfileController.update.form()}
                            options={{
                                preserveScroll: true,
                            }}
                            className="space-y-6"
                        >
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Name Field */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="name" className="text-sm font-semibold text-neutral-700">
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <UserIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500 pointer-events-none" />
                                                <Input
                                                    id="name"
                                                    className="pl-10 h-10 border-neutral-200 focus-visible:ring-[#C34A15]/20 focus-visible:border-[#C34A15]"
                                                    defaultValue={auth.user.name}
                                                    name="name"
                                                    required
                                                    autoComplete="name"
                                                    placeholder="Full name"
                                                />
                                            </div>
                                            <InputError message={errors.name} />
                                        </div>

                                        {/* Phone Field */}
                                        <div className="grid gap-2">
                                            <Label htmlFor="phone" className="text-sm font-semibold text-neutral-700">
                                                Phone Number
                                            </Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500 pointer-events-none" />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    className="pl-10 h-10 border-neutral-200 focus-visible:ring-[#C34A15]/20 focus-visible:border-[#C34A15]"
                                                    defaultValue={(auth.user.phone as string) || ''}
                                                    name="phone"
                                                    placeholder="e.g. 08123456789"
                                                    autoComplete="tel"
                                                />
                                            </div>
                                            <InputError message={errors.phone} />
                                        </div>

                                        {/* Email Field */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="email" className="text-sm font-semibold text-neutral-700">
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500 pointer-events-none" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="pl-10 h-10 border-neutral-200 focus-visible:ring-[#C34A15]/20 focus-visible:border-[#C34A15]"
                                                    defaultValue={auth.user.email}
                                                    name="email"
                                                    required
                                                    autoComplete="username"
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <InputError message={errors.email} />
                                        </div>

                                        {/* Bio Field */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label htmlFor="bio" className="text-sm font-semibold text-neutral-700">
                                                Short Bio
                                            </Label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-3.5 top-3 h-4 w-4 text-orange-500 pointer-events-none" />
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    defaultValue={(auth.user.bio as string) || ''}
                                                    placeholder="Describe yourself, your passion for reducing food waste, or your favorite local bakeries..."
                                                    className={cn(
                                                        "border-input placeholder:text-neutral-400 selection:bg-[#C34A15] selection:text-white flex min-h-[100px] w-full rounded-md border bg-transparent pl-10 pr-3 py-2 text-sm !text-gray-900 shadow-xs transition-colors outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 border-neutral-200 resize-none",
                                                        "focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20 focus-visible:ring-[3px]"
                                                    )}
                                                    rows={3}
                                                    maxLength={1000}
                                                />
                                            </div>
                                            <InputError message={errors.bio} />
                                        </div>
                                    </div>

                                    {/* Email Verification Box */}
                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm text-neutral-600 space-y-1">
                                            <p className="font-semibold text-amber-800">Your email address is unverified.</p>
                                            <p className="text-xs text-neutral-500">
                                                To receive updates, please verify your email.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="font-bold text-[#C34A15] underline underline-offset-2 hover:text-orange-700 transition-colors"
                                                >
                                                    Click here to resend the verification email.
                                                </Link>
                                            </p>

                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded w-fit">
                                                    A new verification link has been sent to your email address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Save Button */}
                                    <div className="flex items-center justify-end pt-4 border-t border-neutral-100">
                                        <Button
                                            disabled={processing}
                                            data-test="update-profile-button"
                                            className="px-6 bg-[#C34A15] hover:bg-orange-700 text-white font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Save className="h-4 w-4 mr-2" />
                                            Save Changes
                                        </Button>
                                    </div>
                                </>
                            )}
                        </Form>
                    </CardContent>
                </Card>
            </div>

            {/* 3. Account Deletion Section */}
            <div className="mt-8">
                <DeleteUser />
            </div>
        </>
    );
}

Profile.layout = (page: any) => <SettingsLayout>{page}</SettingsLayout>;