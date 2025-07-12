import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DynamicWidget, AddWidgetPlaceholder } from "./DynamicWidget";
import { AddWidgetModal } from "./AddWidgetModal";
import { useDashboard, useDashboardActions } from "@/contexts/DashboardContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Dashboard() {
  const { state } = useDashboard();
  const { openAddWidgetModal } = useDashboardActions();

  const renderContent = () => {
    if (state.activeNavigation === "settings") {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Settings
            </h2>
            <p className="text-gray-600">Settings page coming soon...</p>
          </div>
        </div>
      );
    }

    // Always show all categories in one unified dashboard
    return (
      <div className="space-y-8">
        {state.config.categories.map((category) => (
          <section
            key={category.id}
            id={`section-${category.id}`}
            className="space-y-4 scroll-mt-24"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {category.name}
              </h2>
              <Button
                onClick={() => openAddWidgetModal(category.id)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Widget</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {category.widgets.map((widget) => (
                <DynamicWidget
                  key={widget.id}
                  widget={widget}
                  categoryId={category.id}
                />
              ))}

              {/* Always show add widget placeholder */}
              <AddWidgetPlaceholder categoryId={category.id} />
            </div>
          </section>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
      <AddWidgetModal />
    </div>
  );
}
