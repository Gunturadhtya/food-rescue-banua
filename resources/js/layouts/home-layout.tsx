export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FDF8F0] font-sans text-[#1B1B18]">
            {children}
        </div>
    );
}