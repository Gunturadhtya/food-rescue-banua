import { Form } from '@inertiajs/react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function CreateShop() {
    return (
        <div className="max-w-2xl rounded-3xl border border-neutral-200 bg-white p-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                    Create Your Shop
                </h1>
                <p className="mt-1 text-neutral-500">
                    Set up your shop details to start rescuing food.
                </p>
            </div>

            <Form action="/seller/shop" method="post">
                {({ errors, processing }) => (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Shop Name</Label>
                            <Input id="name" name="name" type="text" required />
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
                                rows={4}
                                placeholder="Tell customers what kind of surplus food you offer..."
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
                            {processing ? 'Creating...' : 'Create Shop'}
                        </Button>
                    </div>
                )}
            </Form>
        </div>
    );
}

CreateShop.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
