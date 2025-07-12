import { useState } from "react";
import { Search, Plus, MoreHorizontal, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardActions } from "@/contexts/DashboardContext";

interface DashboardHeaderProps {
  className?: string;
}

const timeframeOptions = [
  { label: "Last 24 hours", value: "24h" },
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 2 days", value: "2d" },
];

export function DashboardHeader({ className }: DashboardHeaderProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState("2d");
  const { openAddWidgetModal } = useDashboardActions();

  const currentTimeframe = timeframeOptions.find(
    (option) => option.value === selectedTimeframe,
  );

  return (
    <div className={`bg-white border-b border-gray-200 px-6 py-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <nav className="text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">Dashboard V2</span>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search anything..." className="pl-10 w-80" />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => openAddWidgetModal("cnapp")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Widget
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Refresh Dashboard</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <span className="text-sm text-gray-600">
                  {currentTimeframe?.label}
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timeframeOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setSelectedTimeframe(option.value)}
                  className={
                    selectedTimeframe === option.value
                      ? "bg-accent text-accent-foreground"
                      : ""
                  }
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
