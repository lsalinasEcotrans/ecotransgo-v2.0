import { AppHeader } from "@/components/shared/AppHeader";
import { UserGreeting } from "@/components/home/UserGreeting";

export default function HomePage() {
  return (
    <div>
      <AppHeader>
        <UserGreeting />
      </AppHeader>
      <div className="p-6">
        <p className="text-muted-foreground">Contenido del home</p>
      </div>
    </div>
  );
}
