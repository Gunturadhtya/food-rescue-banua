export function SiteFooter() {
    return (
        <footer className="mt-20 border-t bg-[#FDF8F0] px-12 py-12">
            <div className="grid grid-cols-4 gap-8">
                <div>
                    <h3 className="font-bold text-xl mb-4">Food Rescue Banua</h3>
                    <p className="text-sm text-gray-500">Elevating surplus food into culinary discovery. Save more, waste less.</p>
                </div>
                <div><h4 className="font-bold mb-4">Explore</h4><p className="text-sm mb-2">Merchant Map</p><p className="text-sm mb-2">Flash Sales</p></div>
                <div><h4 className="font-bold mb-4">Community</h4><p className="text-sm mb-2">Partner With Us</p></div>
                <div><h4 className="font-bold mb-4">Support</h4><p className="text-sm mb-2">Help Center</p></div>
            </div>
        </footer>
    );
}