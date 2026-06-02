import { Form } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ShopProps {
    shop: {
        name: string;
        address: string;
        description: string | null;
    };
}

export default function EditShop({ shop }: ShopProps) {
    return (
        <div className="max-w-2xl rounded-3xl border border-neutral-200 bg-white p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Shop Profile
                </h1>
                <p className="mt-1 text-neutral-500">
                    Update your shop's public information.
                </p>
            </div>

            <Form action="/seller/shop" method="put">
                {({ errors, processing }) => (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Shop Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                defaultValue={shop.name}
                                required
                            />
                            {errors.name && (
                                <span className="text-sm font-medium text-red-500">
                                    {errors.name}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                defaultValue={shop.address}
                                required
                            />
                            {errors.address && (
                                <span className="text-sm font-medium text-red-500">
                                    {errors.address}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                defaultValue={shop.description || ''}
                                rows={4}
                                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.description && (
                                <span className="text-sm font-medium text-red-500">
                                    {errors.description}
                                </span>
                            )}
                        </div>

                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-fit bg-[#C34A15] text-white hover:bg-[#A33D10]"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
}

EditShop.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
