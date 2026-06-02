import React from 'react';
// 1. Add `Link` to the Inertia imports
import { Head, useForm, Link } from '@inertiajs/react';
// 2. Add `Settings` to the lucide-react imports
import { PlusCircle, History, Settings } from 'lucide-react';
import ProfileLayout from '@/layouts/profile-layouts';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import InputError from '@/components/input-error';

interface RescueRecord {
    id: number;
    status: string;
    buyer_name: string;
    price: number;
    weight_kg: number;
    pcs: number;
    created_at: string;
}

interface Props {
    shop: {
        id: number;
        name: string;
        address: string;
        // 3. Add description to the shop interface
        description?: string | null;
    };
    rescues: {
        data: RescueRecord[];
    };
}

export default function SellerDashboard({ shop, rescues }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        price: '',
        weight_kg: '',
        pcs: 1,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/dashboard/rescue', {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-6">
            <Head title="Seller Dashboard" />

            <div className="flex flex-col justify-between gap-4 rounded-3xl border border-neutral-200 bg-white p-6 md:flex-row md:items-start">
                <div className="flex flex-col gap-1">
                    <h1 className="font-jakarta text-3xl font-bold text-gray-900">
                        {shop?.name || 'Shop Name'}
                    </h1>
                    <p className="text-sm font-medium text-neutral-500">
                        {shop?.address || 'Address not set'}
                    </p>
                    {shop?.description && (
                        <p className="mt-2 max-w-xl text-sm text-neutral-600">
                            {shop.description}
                        </p>
                    )}
                </div>

                <Link
                    href="/seller/shop/edit"
                    className="flex shrink-0 items-center gap-2 rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-200"
                >
                    <Settings size={16} />
                    Edit Profile
                </Link>
            </div>

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                <Card className="border-border-warning lg:col-span-1">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <PlusCircle className="h-5 w-5 text-[#C34A15]" />
                            Publish Rescue Offer
                        </CardTitle>
                        <CardDescription>
                            Create a new unassigned rescue offer for users to
                            claim on the home page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="price">
                                    Price per Mystery Box (Rp)
                                </Label>
                                <div className="relative">
                                    <span className="absolute top-2.5 left-3 text-xs font-bold text-neutral-400">
                                        Rp
                                    </span>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        placeholder="e.g. 25000"
                                        className="pl-8"
                                    />
                                </div>
                                <InputError message={errors.price} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="weight_kg">
                                    Estimated Weight (kg)
                                </Label>
                                <Input
                                    id="weight_kg"
                                    type="number"
                                    step="0.01"
                                    value={data.weight_kg}
                                    onChange={(e) =>
                                        setData('weight_kg', e.target.value)
                                    }
                                    placeholder="e.g. 1.5"
                                />
                                <InputError message={errors.weight_kg} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="pcs">Quantity (Pieces)</Label>
                                <Input
                                    id="pcs"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={data.pcs}
                                    onChange={(e) =>
                                        setData(
                                            'pcs',
                                            parseInt(e.target.value) || 1,
                                        )
                                    }
                                    placeholder="e.g. 5"
                                />
                                <InputError message={errors.pcs} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 h-10 w-full rounded-xl bg-[#C34A15] font-bold text-white hover:bg-[#A33D10]"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2" />}
                                Publish Rescue
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <History className="h-5 w-5 text-[#C34A15]" />
                            Recent Store Rescues
                        </CardTitle>
                        <CardDescription>
                            A detailed ledger of recent food items published
                            from your facility.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-[#F6F4F0] text-xs tracking-wider text-neutral-500 uppercase">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 font-semibold">
                                            Date Logged
                                        </th>
                                        <th className="px-6 py-3 font-semibold">
                                            Claimed By
                                        </th>
                                        <th className="px-6 py-3 text-center font-semibold">
                                            Qty
                                        </th>
                                        <th className="px-6 py-3 text-right font-semibold">
                                            Weight
                                        </th>
                                        <th className="px-6 py-3 text-right font-semibold">
                                            Price
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-gray-900">
                                    {!rescues?.data ||
                                    rescues.data.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-6 py-8 text-center text-neutral-400"
                                            >
                                                No rescue records cataloged yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        rescues.data.map((record) => (
                                            <tr
                                                key={record.id}
                                                className="transition-colors hover:bg-neutral-50/50"
                                            >
                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`rounded-md px-2 py-1 text-xs font-bold uppercase ${record.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}
                                                    >
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-neutral-500">
                                                    {new Date(
                                                        record.created_at,
                                                    ).toLocaleDateString(
                                                        'id-ID',
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {record.buyer_name || '-'}
                                                </td>
                                                <td className="px-6 py-4 text-center font-mono text-neutral-600">
                                                    {record.pcs}
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-neutral-600">
                                                    {record.weight_kg} kg
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-[#C34A15]">
                                                    Rp
                                                    {Number(
                                                        record.price,
                                                    ).toLocaleString('id-ID')}
                                                    ,00
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

SellerDashboard.layout = (page: React.ReactNode) => (
    <ProfileLayout>{page}</ProfileLayout>
);
