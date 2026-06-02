export function SiteFooter() {
    return (
        <footer className="mt-20 border-t bg-[#FDF8F0] px-12 py-12">
            <div className="grid grid-cols-4 gap-8">
                <div>
                    <h3 className="mb-4 text-xl font-bold">
                        Food Rescue Banua
                    </h3>
                    <p className="text-sm text-gray-500">
                        Elevating surplus food into culinary discovery. Save
                        more, waste less.
                    </p>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Explore</h4>
                    <p className="mb-2 text-sm">Merchant Map</p>
                    <p className="mb-2 text-sm">Flash Sales</p>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Community</h4>
                    <p className="mb-2 text-sm">Partner With Us</p>
                </div>
                <div>
                    <h4 className="mb-4 font-bold">Support</h4>
                    <p className="mb-2 text-sm">Help Center</p>
                </div>
            </div>
        </footer>
    );
}
