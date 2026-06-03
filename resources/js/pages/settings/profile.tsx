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
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
    ShieldCheck,
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
        seller: 'Merchant',
        user: 'Volunteer',
    };

    const userRole = (auth.user.role as string) || 'user';

    return (
        <>
            <Head title="Profile settings" />
            <h1 className="sr-only">Profile settings</h1>

            <div className="space-y-8">
                {/* 1. Gorgeous Profile Header Card */}
                <Card className="border border-t-4 border-orange-100 border-t-[#C34A15] bg-gradient-to-br from-amber-50/70 via-orange-50/30 to-white shadow-xs transition-all duration-300 md:col-span-3">
                    <CardContent className="p-6 md:p-8">
                        <div className="flex flex-col items-center gap-5 sm:flex-row">
                            {/* Avatar Bubble */}
                            <div className="group relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-tr from-amber-400 via-orange-500 to-[#C34A15] text-3xl font-bold text-white shadow-md transition-transform duration-300 hover:scale-105">
                                {getInitials(auth.user.name)}
                                {/* Mock Photo Camera Overlay */}
                                <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <Camera className="h-6 w-6 text-white" />
                                </div>
                            </div>

                            <div className="space-y-1.5 text-center sm:text-left">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                    <h2 className="font-jakarta text-2xl font-bold tracking-tight text-neutral-800">
                                        {auth.user.name}
                                    </h2>
                                    <span
                                        className={cn(
                                            'mx-auto inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-bold tracking-wider uppercase sm:mx-0',
                                            roleColors[userRole] ||
                                                roleColors.user,
                                        )}
                                    >
                                        {roleLabels[userRole] || 'Volunteer'}
                                    </span>
                                </div>
                                <p className="flex items-center justify-center gap-1.5 text-sm font-medium text-neutral-600 sm:justify-start">
                                    <Mail className="h-4 w-4 shrink-0 text-orange-600" />
                                    {auth.user.email}
                                </p>
                                <p className="flex items-center justify-center gap-1 text-xs text-neutral-500 sm:justify-start">
                                    <Calendar className="h-3.5 w-3.5 text-orange-500" />
                                    Member since{' '}
                                    {new Date(
                                        auth.user.created_at,
                                    ).toLocaleDateString('id-ID', {
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* 2. Beautiful Form Card */}
                <Card className="border border-t-4 border-orange-100 border-t-orange-500 bg-gradient-to-br from-white via-orange-50/5 to-white shadow-xs">
                    <CardHeader className="border-b border-neutral-50 pb-4">
                        <CardTitle className="flex items-center gap-2 font-jakarta text-lg font-bold text-neutral-800">
                            <ShieldCheck className="h-5 w-5 text-orange-600" />
                            Profile Details
                        </CardTitle>
                        <CardDescription>
                            Update your basic contact information and profile
                            bio.
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
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        {/* Name Field */}
                                        <div className="grid gap-2">
                                            <Label
                                                htmlFor="name"
                                                className="text-sm font-semibold text-neutral-700"
                                            >
                                                Full Name
                                            </Label>
                                            <div className="relative">
                                                <UserIcon className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                                <Input
                                                    id="name"
                                                    className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                    defaultValue={
                                                        auth.user.name
                                                    }
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
                                            <Label
                                                htmlFor="phone"
                                                className="text-sm font-semibold text-neutral-700"
                                            >
                                                Phone Number
                                            </Label>
                                            <div className="relative">
                                                <Phone className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                    defaultValue={
                                                        (auth.user
                                                            .phone as string) ||
                                                        ''
                                                    }
                                                    name="phone"
                                                    placeholder="e.g. 08123456789"
                                                    autoComplete="tel"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.phone}
                                            />
                                        </div>

                                        {/* Email Field */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label
                                                htmlFor="email"
                                                className="text-sm font-semibold text-neutral-700"
                                            >
                                                Email Address
                                            </Label>
                                            <div className="relative">
                                                <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-500" />
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    className="h-10 border-neutral-200 pl-10 focus-visible:border-[#C34A15] focus-visible:ring-[#C34A15]/20"
                                                    defaultValue={
                                                        auth.user.email
                                                    }
                                                    name="email"
                                                    required
                                                    autoComplete="username"
                                                    placeholder="Email address"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.email}
                                            />
                                        </div>

                                        {/* Bio Field */}
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label
                                                htmlFor="bio"
                                                className="text-sm font-semibold text-neutral-700"
                                            >
                                                Short Bio
                                            </Label>
                                            <div className="relative">
                                                <BookOpen className="pointer-events-none absolute top-3 left-3.5 h-4 w-4 text-orange-500" />
                                                <textarea
                                                    id="bio"
                                                    name="bio"
                                                    defaultValue={
                                                        (auth.user
                                                            .bio as string) ||
                                                        ''
                                                    }
                                                    placeholder="Describe yourself, your passion for reducing food waste, or your favorite local bakeries..."
                                                    className={cn(
                                                        'flex min-h-[100px] w-full resize-none rounded-md border border-input border-neutral-200 bg-transparent py-2 pr-3 pl-10 text-sm !text-gray-900 shadow-xs transition-colors outline-none selection:bg-[#C34A15] selection:text-white placeholder:text-neutral-400 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                                                        'focus-visible:border-[#C34A15] focus-visible:ring-[3px] focus-visible:ring-[#C34A15]/20',
                                                    )}
                                                    rows={3}
                                                    maxLength={1000}
                                                />
                                            </div>
                                            <InputError message={errors.bio} />
                                        </div>
                                    </div>

                                    {/* Email Verification Box */}
                                    {mustVerifyEmail &&
                                        auth.user.email_verified_at ===
                                            null && (
                                            <div className="space-y-1 rounded-xl border border-amber-100 bg-amber-50/50 p-4 text-sm text-neutral-600">
                                                <p className="font-semibold text-amber-800">
                                                    Your email address is
                                                    unverified.
                                                </p>
                                                <p className="text-xs text-neutral-500">
                                                    To receive updates, please
                                                    verify your email.{' '}
                                                    <Link
                                                        href={send()}
                                                        as="button"
                                                        className="font-bold text-[#C34A15] underline underline-offset-2 transition-colors hover:text-orange-700"
                                                    >
                                                        Click here to resend the
                                                        verification email.
                                                    </Link>
                                                </p>

                                                {status ===
                                                    'verification-link-sent' && (
                                                    <div className="mt-2 w-fit rounded bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                                                        A new verification link
                                                        has been sent to your
                                                        email address.
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                    {/* Save Button */}
                                    <div className="flex items-center justify-end border-t border-neutral-100 pt-4">
                                        <Button
                                            disabled={processing}
                                            data-test="update-profile-button"
                                            className="bg-[#C34A15] px-6 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-orange-700 active:scale-[0.98]"
                                        >
                                            <Save className="mr-2 h-4 w-4" />
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
