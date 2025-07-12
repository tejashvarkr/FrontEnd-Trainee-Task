export interface Widget {
  id: string;
  name: string;
  text: string;
  type: "chart" | "text" | "metric";
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardConfig {
  categories: Category[];
}

export const initialDashboardConfig: DashboardConfig = {
  categories: [
    {
      id: "cnapp",
      name: "CNAPP Dashboard",
      widgets: [
        {
          id: "cloud-accounts",
          name: "Cloud Accounts",
          text: "Connected (2) | Not Connected (2)",
          type: "chart",
        },
        {
          id: "cloud-risk-assessment",
          name: "Cloud Account Risk Assessment",
          text: "Failed (1689) | Warning (681) | Not available (36) | Passed (7253)",
          type: "chart",
        },
      ],
    },
    {
      id: "cspm",
      name: "CSPM Executive Dashboard",
      widgets: [],
    },
    {
      id: "cwpp",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "namespace-alerts",
          name: "Top 5 Namespace Specific Alerts",
          text: "No Graph data available!",
          type: "text",
        },
        {
          id: "workload-alerts",
          name: "Workload Alerts",
          text: "No Graph data available!",
          type: "text",
        },
      ],
    },
    {
      id: "registry",
      name: "Registry Scan",
      widgets: [
        {
          id: "image-risk-assessment",
          name: "Image Risk Assessment",
          text: "1470 Total Vulnerabilities | Critical (9) | High (150)",
          type: "metric",
        },
        {
          id: "image-security-issues",
          name: "Image Security Issues",
          text: "2 Total Images | Critical (2) | High (2)",
          type: "metric",
        },
      ],
    },
  ],
};

// Available widgets that can be added
export const availableWidgets: Omit<Widget, "id">[] = [
  {
    name: "Cloud Accounts",
    text: "Monitor your cloud account connections and status",
    type: "chart",
  },
  {
    name: "Cloud Account Risk Assessment",
    text: "Comprehensive risk analysis of your cloud infrastructure",
    type: "chart",
  },
  {
    name: "Top 5 Namespace Specific Alerts",
    text: "Critical alerts from your Kubernetes namespaces",
    type: "text",
  },
  {
    name: "Workload Alerts",
    text: "Security alerts from your running workloads",
    type: "text",
  },
  {
    name: "Image Risk Assessment",
    text: "Vulnerability assessment of container images",
    type: "metric",
  },
  {
    name: "Image Security Issues",
    text: "Security issues found in container images",
    type: "metric",
  },
  {
    name: "Network Security",
    text: "Monitor network traffic and security policies",
    type: "chart",
  },
  {
    name: "Compliance Status",
    text: "Track compliance across all your resources",
    type: "metric",
  },
  {
    name: "Threat Detection",
    text: "Real-time threat detection and monitoring",
    type: "text",
  },
  {
    name: "Access Control",
    text: "Identity and access management overview",
    type: "chart",
  },
];
