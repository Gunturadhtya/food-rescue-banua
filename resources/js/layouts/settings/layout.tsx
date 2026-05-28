import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';
import ProfileLayout from '@/layouts/profile-layouts';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: edit(),
        icon: null,
    },
    {
        title: 'Security',
        href: editSecurity(),
        icon: null,
    },
    {
        title: 'Appearance',
        href: editAppearance(),
        icon: null,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <ProfileLayout>
            <div className="flex w-full max-w-4xl flex-col gap-6 px-4 py-6">
                
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                {/* Navbar Horizontal (Menggantikan Sidebar Bawaan) */}
                <nav
                    className="flex flex-row space-x-4 border-b border-gray-200 overflow-x-auto"
                    aria-label="Settings"
                >
                    {sidebarNavItems.map((item, index) => (
                        <Button
                            key={`${toUrl(item.href)}-${index}`}
                            variant="ghost"
                            asChild
                            className={cn(
                                'justify-center whitespace-nowrap rounded-none border-b-2 px-1 pb-3 pt-2 transition-colors hover:bg-transparent',
                                {
                                    'border-[#C34A15] text-[#C34A15] hover:text-[#C34A15] hover:border-[#C34A15] font-bold': isCurrentOrParentUrl(item.href),
                                    'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 font-medium': !isCurrentOrParentUrl(item.href),
                                }
                            )}
                        >
                            <Link href={item.href}>
                                {item.icon && (
                                    <item.icon className="mr-2 h-4 w-4" />
                                )}
                                {item.title}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {/* Area Konten Form */}
                <div className="flex-1 md:max-w-2xl py-4">
                    <section className="max-w-xl space-y-12">
                        {children}
                    </section>
                </div>
                
            </div>
        </ProfileLayout>
    );
}