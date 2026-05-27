type Props = { name: string; distance: string; discount: string; price: string; image: string };

export function RestaurantCard({ name, distance, discount, price, image }: Props) {
    return (
        <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-2xl">
                <img src={image} alt={name} className="h-full w-full object-cover" />
                <span className="absolute top-3 left-3 rounded-full bg-yellow-300 px-3 py-1 text-[10px] font-bold uppercase">
                    {discount}
                </span>
            </div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-sm text-gray-400 mb-4">{distance}</p>
            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#C34A15]">{price}</span>
                <button className="rounded-full bg-gray-100 px-3 py-2 text-[10px] font-bold">WAITING FOR 5 PM</button>
            </div>
        </div>
    );
}