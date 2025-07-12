import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DonutChart } from "./DonutChart";
import { Plus, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CloudAccountsWidget() {
  const data = [
    { value: 2, color: "#6366f1", label: "Connected" },
    { value: 2, color: "#e5e7eb", label: "Not Connected" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Cloud Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <DonutChart data={data} centerValue="2" />
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-gray-600">Connected (2)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-600">Not Connected (2)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function RiskAssessmentWidget() {
  const data = [
    { value: 1689, color: "#ef4444", label: "Failed" },
    { value: 681, color: "#f59e0b", label: "Warning" },
    { value: 36, color: "#6b7280", label: "Not available" },
    { value: 7253, color: "#10b981", label: "Passed" },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">
          Cloud Account Risk Assessment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-6">
          <DonutChart data={data} centerValue="9659" centerLabel="Total" />
          <div className="space-y-2">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Failed (1689)</span>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm text-gray-600">Warning (681)</span>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="text-sm text-gray-600">
                  Not available (36)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Passed (7253)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CWPPDashboardWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">CWPP Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900">
              Top 5 Namespace Specific Alerts
            </h4>
            <div className="mt-8 flex items-center justify-center h-24 text-gray-500">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <span className="text-sm">No Graph data available!</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function WorkloadAlertsWidget() {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Workload Alerts</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Widget
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-24 text-gray-500">
          <TrendingUp className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <span className="text-sm">No Graph data available!</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function RegistryScanWidget() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Registry Scan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">
              Image Risk Assessment
            </h4>
            <div className="text-xs text-gray-600 mb-4">
              1470 Total Vulnerabilities
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-600">Critical (9)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-gray-600">High (150)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ImageSecurityWidget() {
  return (
    <Card>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">
          Image Security Issues
        </CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Widget
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-xs text-gray-600">2 Total Images</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-600">Critical (2)</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-600">High (2)</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
