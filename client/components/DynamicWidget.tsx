import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DonutChart } from "./DonutChart";
import { X, Plus, TrendingUp, BarChart3 } from "lucide-react";
import { Widget } from "@/data/dashboardConfig";
import { useDashboardActions } from "@/contexts/DashboardContext";

interface DynamicWidgetProps {
  widget: Widget;
  categoryId: string;
  showRemove?: boolean;
}

export function DynamicWidget({
  widget,
  categoryId,
  showRemove = true,
}: DynamicWidgetProps) {
  const { removeWidget } = useDashboardActions();

  const handleRemove = () => {
    removeWidget(categoryId, widget.id);
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case "chart":
        if (widget.name === "Cloud Accounts") {
          const data = [
            { value: 2, color: "#6366f1", label: "Connected" },
            { value: 2, color: "#e5e7eb", label: "Not Connected" },
          ];
          return (
            <div className="flex items-center space-x-6">
              <DonutChart data={data} centerValue="2" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm text-gray-600">Connected (2)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                  <span className="text-sm text-gray-600">
                    Not Connected (2)
                  </span>
                </div>
              </div>
            </div>
          );
        }

        if (widget.name === "Cloud Account Risk Assessment") {
          const data = [
            { value: 1689, color: "#ef4444", label: "Failed" },
            { value: 681, color: "#f59e0b", label: "Warning" },
            { value: 36, color: "#6b7280", label: "Not available" },
            { value: 7253, color: "#10b981", label: "Passed" },
          ];
          return (
            <div className="flex items-center space-x-6">
              <DonutChart data={data} centerValue="9659" centerLabel="Total" />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Failed (1689)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm text-gray-600">Warning (681)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                  <span className="text-sm text-gray-600">
                    Not available (36)
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-600">Passed (7253)</span>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="flex items-center justify-center h-24 text-center">
            <div>
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-600">{widget.text}</p>
            </div>
          </div>
        );

      case "metric":
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-600">{widget.text}</div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>
        );

      case "text":
      default:
        return (
          <div className="flex items-center justify-center h-24 text-center">
            <div>
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm text-gray-600">{widget.text}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="relative group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{widget.name}</CardTitle>
          {showRemove && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>{renderWidgetContent()}</CardContent>
    </Card>
  );
}

// Empty widget placeholder for adding new widgets
interface AddWidgetPlaceholderProps {
  categoryId: string;
}

export function AddWidgetPlaceholder({
  categoryId,
}: AddWidgetPlaceholderProps) {
  const { openAddWidgetModal } = useDashboardActions();

  return (
    <Card
      className="border-dashed border-2 cursor-pointer transition-all duration-200 hover:shadow-md border-primary/50 bg-primary/5 hover:border-primary hover:bg-primary/10"
      onClick={() => openAddWidgetModal(categoryId)}
    >
      <CardContent className="flex items-center justify-center h-48">
        <div className="flex flex-col items-center space-y-3 p-8 rounded-lg transition-all duration-200 text-primary hover:text-primary">
          <div className="p-4 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
            <Plus className="h-8 w-8" />
          </div>
          <span className="text-base font-semibold">Add Widget</span>
          <span className="text-sm text-primary/70 text-center">
            Click to add a new widget
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
