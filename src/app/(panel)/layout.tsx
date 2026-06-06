import { BottomNav } from "@/components/navigation/BottomNav";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-20">
        {" "}
        {/* pb-20 deja espacio al navbar */}
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
