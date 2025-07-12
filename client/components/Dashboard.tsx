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

  // Filter widgets based on search query
  const getFilteredWidgets = (widgets: any[]) => {
    if (!state.searchQuery.trim()) return widgets;
    return widgets.filter(
      (widget) =>
        widget.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        widget.text.toLowerCase().includes(state.searchQuery.toLowerCase()),
    );
  };

  // Filter categories based on search query (show category if it has matching widgets or no search)
  const getFilteredCategories = () => {
    if (!state.searchQuery.trim()) return state.config.categories;
    return state.config.categories.filter((category) => {
      const filteredWidgets = getFilteredWidgets(category.widgets);
      return (
        filteredWidgets.length > 0 ||
        category.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    });
  };

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

    const filteredCategories = getFilteredCategories();

    // Show no results message if search query exists but no results
    if (state.searchQuery.trim() && filteredCategories.length === 0) {
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h2>
            <p className="text-gray-600">
              Try adjusting your search to find what you're looking for.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {state.searchQuery.trim() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Showing results for:{" "}
              <span className="font-medium">"{state.searchQuery}"</span>
            </p>
          </div>
        )}

        {filteredCategories.map((category) => {
          const filteredWidgets = getFilteredWidgets(category.widgets);

          return (
            <section
              key={category.id}
              id={`section-${category.id}`}
              className="space-y-4 scroll-mt-24"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {category.name}
                  {state.searchQuery.trim() && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({filteredWidgets.length} result
                      {filteredWidgets.length !== 1 ? "s" : ""})
                    </span>
                  )}
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
                {filteredWidgets.map((widget) => (
                  <DynamicWidget
                    key={widget.id}
                    widget={widget}
                    categoryId={category.id}
                  />
                ))}

                {/* Show add widget placeholder only if no search or category has results */}
                {(!state.searchQuery.trim() || filteredWidgets.length > 0) && (
                  <AddWidgetPlaceholder categoryId={category.id} />
                )}
              </div>
            </section>
          );
        })}
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
