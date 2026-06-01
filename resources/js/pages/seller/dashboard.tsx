import React from 'react';
// 1. Add `Link` to the Inertia imports
import { Head, useForm, Link } from '@inertiajs/react';
// 2. Add `Settings` to the lucide-react imports
import { PlusCircle, History, Settings } from 'lucide-react';
import ProfileLayout from '@/layouts/profile-layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold font-jakarta text-gray-900">{shop?.name || 'Shop Name'}</h1>
                    <p className="text-sm text-neutral-500 font-medium">{shop?.address || 'Address not set'}</p>
                    {shop?.description && (
                        <p className="mt-2 text-sm text-neutral-600 max-w-xl">{shop.description}</p>
                    )}
                </div>

                <Link
                    href="/seller/shop/edit"
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-sm font-semibold rounded-xl transition-colors shrink-0"
                >
                    <Settings size={16} />
                    Edit Profile
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <Card className="lg:col-span-1 border-border-warning">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <PlusCircle className="text-[#C34A15] w-5 h-5" />
                            Publish Rescue Offer
                        </CardTitle>
                        <CardDescription>
                            Create a new unassigned rescue offer for users to claim on the home page.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="price">Price per Mystery Box (Rp)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-xs text-neutral-400 font-bold">Rp</span>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        placeholder="e.g. 25000"
                                        className="pl-8"
                                    />
                                </div>
                                <InputError message={errors.price} />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="weight_kg">Estimated Weight (kg)</Label>
                                <Input
                                    id="weight_kg"
                                    type="number"
                                    step="0.01"
                                    value={data.weight_kg}
                                    onChange={(e) => setData('weight_kg', e.target.value)}
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
                                    onChange={(e) => setData('pcs', parseInt(e.target.value) || 1)}
                                    placeholder="e.g. 5"
                                />
                                <InputError message={errors.pcs} />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#C34A15] hover:bg-[#A33D10] text-white font-bold h-10 rounded-xl mt-2"
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
                        <CardTitle className="text-xl flex items-center gap-2">
                            <History className="w-5 h-5 text-[#C34A15]" />
                            Recent Store Rescues
                        </CardTitle>
                        <CardDescription>
                            A detailed ledger of recent food items published from your facility.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto rounded-xl border border-gray-100">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs uppercase bg-[#F6F4F0] text-neutral-500 tracking-wider">
                                    <tr>
                                        <th className="px-6 py-3 font-semibold">Status</th>
                                        <th className="px-6 py-3 font-semibold">Date Logged</th>
                                        <th className="px-6 py-3 font-semibold">Claimed By</th>
                                        <th className="px-6 py-3 font-semibold text-center">Qty</th>
                                        <th className="px-6 py-3 font-semibold text-right">Weight</th>
                                        <th className="px-6 py-3 font-semibold text-right">Price</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-gray-900">
                                    {!rescues?.data || rescues.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-neutral-400">
                                                No rescue records cataloged yet.
                                            </td>
                                        </tr>
                                    ) : (
                                        rescues.data.map((record) => (
                                            <tr key={record.id} className="hover:bg-neutral-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase ${record.status === 'active' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-neutral-500 whitespace-nowrap">
                                                    {new Date(record.created_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 font-medium">{record.buyer_name || '-'}</td>
                                                <td className="px-6 py-4 text-center font-mono text-neutral-600">
                                                    {record.pcs}
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-neutral-600">
                                                    {record.weight_kg} kg
                                                </td>
                                                <td className="px-6 py-4 text-right font-bold text-[#C34A15]">
                                                    Rp {record.price.toLocaleString('id-ID')}
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

SellerDashboard.layout = (page: React.ReactNode) => <ProfileLayout>{page}</ProfileLayout>;