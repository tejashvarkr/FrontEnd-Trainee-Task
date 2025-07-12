import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { useDashboard, useDashboardActions } from "@/contexts/DashboardContext";
import { availableWidgets, Widget } from "@/data/dashboardConfig";

export function AddWidgetModal() {
  const { state } = useDashboard();
  const {
    closeAddWidgetModal,
    addWidget,
    toggleWidgetInCategory,
    setSearchQuery,
  } = useDashboardActions();

  const [newWidgetName, setNewWidgetName] = useState("");
  const [newWidgetText, setNewWidgetText] = useState("");
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const isOpen = state.isAddWidgetModalOpen;
  const selectedCategory = state.selectedCategory;

  // Filter available widgets based on search
  const filteredWidgets = useMemo(() => {
    if (!localSearchQuery) return availableWidgets;
    return availableWidgets.filter(
      (widget) =>
        widget.name.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
        widget.text.toLowerCase().includes(localSearchQuery.toLowerCase()),
    );
  }, [localSearchQuery]);

  // Get widgets already in the selected category
  const categoryWidgets = useMemo(() => {
    if (!selectedCategory) return [];
    const category = state.config.categories.find(
      (cat) => cat.id === selectedCategory,
    );
    return category?.widgets || [];
  }, [state.config.categories, selectedCategory]);

  // Check if a widget is already in the category
  const isWidgetInCategory = (widgetName: string) => {
    return categoryWidgets.some((widget) => widget.name === widgetName);
  };

  const handleCreateCustomWidget = () => {
    if (!newWidgetName.trim() || !newWidgetText.trim() || !selectedCategory)
      return;

    const newWidget: Widget = {
      id: `${newWidgetName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      name: newWidgetName,
      text: newWidgetText,
      type: "text",
    };

    addWidget(selectedCategory, newWidget);
    setNewWidgetName("");
    setNewWidgetText("");
    closeAddWidgetModal();
  };

  const handleToggleWidget = (widget: Omit<Widget, "id">) => {
    if (!selectedCategory) return;
    const widgetWithId: Widget = {
      ...widget,
      id: `${widget.name.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
    };
    toggleWidgetInCategory(selectedCategory, widgetWithId);
  };

  const handleClose = () => {
    setNewWidgetName("");
    setNewWidgetText("");
    setLocalSearchQuery("");
    closeAddWidgetModal();
  };

  const selectedCategoryName = state.config.categories.find(
    (cat) => cat.id === selectedCategory,
  )?.name;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Personalise your dashboard by adding the following widget
          </p>
        </DialogHeader>

        <Tabs defaultValue="preset" className="flex-1 overflow-hidden">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="preset">CSPM</TabsTrigger>
            <TabsTrigger value="cwpp">CWPP</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="ticket">Ticket</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4 overflow-y-auto max-h-96">
            <TabsContent value="preset" className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search widgets..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {selectedCategoryName && (
                <div className="text-sm text-muted-foreground">
                  Adding to:{" "}
                  <Badge variant="outline">{selectedCategoryName}</Badge>
                </div>
              )}

              <div className="space-y-3">
                {filteredWidgets.map((widget, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 border rounded-lg"
                  >
                    <Checkbox
                      checked={isWidgetInCategory(widget.name)}
                      onCheckedChange={() => handleToggleWidget(widget)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{widget.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {widget.text}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {widget.type}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cwpp" className="space-y-4">
              <div className="space-y-4">
                <Label htmlFor="widget-name">Widget Name</Label>
                <Input
                  id="widget-name"
                  placeholder="Enter widget name"
                  value={newWidgetName}
                  onChange={(e) => setNewWidgetName(e.target.value)}
                />

                <Label htmlFor="widget-text">Widget Text</Label>
                <Textarea
                  id="widget-text"
                  placeholder="Enter widget description or data"
                  value={newWidgetText}
                  onChange={(e) => setNewWidgetText(e.target.value)}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <p>Image widgets coming soon...</p>
              </div>
            </TabsContent>

            <TabsContent value="ticket" className="space-y-4">
              <div className="text-center text-muted-foreground py-8">
                <p>Ticket widgets coming soon...</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCustomWidget}
            disabled={!newWidgetName.trim() || !newWidgetText.trim()}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
