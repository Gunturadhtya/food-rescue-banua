import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn, toUrl } from '@/lib/utils';
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
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    const { isCurrentOrParentUrl } = useCurrentUrl();

    return (
        <ProfileLayout>
            <div className="flex w-full flex-col gap-6 py-6">
                <Heading
                    title="Settings"
                    description="Manage your profile and account settings"
                />

                {/* Navbar Horizontal (Menggantikan Sidebar Bawaan) */}
                <nav
                    className="flex flex-row space-x-4 overflow-x-auto border-b border-gray-200"
                    aria-label="Settings"
                >
                    {sidebarNavItems.map((item, index) => (
                        <Button
                            key={`${toUrl(item.href)}-${index}`}
                            variant="ghost"
                            asChild
                            className={cn(
                                'justify-center rounded-none border-b-2 px-1 pt-2 pb-3 whitespace-nowrap transition-colors hover:bg-transparent',
                                {
                                    'border-[#C34A15] font-bold text-[#C34A15] hover:border-[#C34A15] hover:text-[#C34A15]':
                                        isCurrentOrParentUrl(item.href),
                                    'border-transparent font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700':
                                        !isCurrentOrParentUrl(item.href),
                                },
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
                <div className="w-full flex-1 py-4">
                    <section className="w-full space-y-12">{children}</section>
                </div>
            </div>
        </ProfileLayout>
    );
}
