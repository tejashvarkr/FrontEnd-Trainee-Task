import {
  Home,
  Shield,
  Cloud,
  Database,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useDashboard, useDashboardActions } from "@/contexts/DashboardContext";

interface SidebarProps {
  className?: string;
}

const navigationItems = [
  { id: "cnapp", name: "CNAPP Dashboard", icon: Home },
  { id: "cspm", name: "CSPM Executive Dashboard", icon: BarChart3 },
  { id: "cloud", name: "Cloud Accounts", icon: Cloud },
  { id: "cwpp", name: "CWPP Dashboard", icon: Shield },
  { id: "registry", name: "Registry Scan", icon: Database },
  { id: "settings", name: "Settings", icon: Settings },
];

export function Sidebar({ className }: SidebarProps) {
  const { state } = useDashboard();
  const { setActiveNavigation } = useDashboardActions();

  const handleNavigation = (navId: string) => {
    // Scroll to the specific section instead of filtering
    const element = document.getElementById(`section-${navId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className={cn("w-64 bg-white border-r border-gray-200 h-full", className)}
    >
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-8">
          Dashboard V2
        </h1>
        <nav className="space-y-2">
          {navigationItems.slice(0, -1).map(
            (
              item, // Exclude settings for now
            ) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md transition-colors w-full text-left hover:bg-gray-100 hover:text-gray-900",
                  "text-gray-600",
                )}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.name}
              </button>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
