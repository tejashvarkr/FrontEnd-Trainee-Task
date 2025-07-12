import { Dashboard } from "@/components/Dashboard";
import { DashboardProvider } from "@/contexts/DashboardContext";

export default function Index() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
