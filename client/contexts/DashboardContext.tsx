import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  DashboardConfig,
  Widget,
  Category,
  initialDashboardConfig,
} from "@/data/dashboardConfig";

interface DashboardState {
  config: DashboardConfig;
  isAddWidgetModalOpen: boolean;
  selectedCategory: string | null;
  searchQuery: string;
  activeNavigation: string;
}

type DashboardAction =
  | { type: "ADD_WIDGET"; payload: { categoryId: string; widget: Widget } }
  | { type: "REMOVE_WIDGET"; payload: { categoryId: string; widgetId: string } }
  | { type: "OPEN_ADD_WIDGET_MODAL"; payload: { categoryId: string } }
  | { type: "CLOSE_ADD_WIDGET_MODAL" }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_ACTIVE_NAVIGATION"; payload: string }
  | {
      type: "TOGGLE_WIDGET_IN_CATEGORY";
      payload: { categoryId: string; widget: Widget };
    };

const initialState: DashboardState = {
  config: initialDashboardConfig,
  isAddWidgetModalOpen: false,
  selectedCategory: null,
  searchQuery: "",
  activeNavigation: "cnapp",
};

function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case "ADD_WIDGET": {
      const { categoryId, widget } = action.payload;
      const existingCategory = state.config.categories.find(
        (cat) => cat.id === categoryId,
      );

      if (existingCategory) {
        return {
          ...state,
          config: {
            ...state.config,
            categories: state.config.categories.map((category) =>
              category.id === categoryId
                ? {
                    ...category,
                    widgets: [...category.widgets, widget],
                  }
                : category,
            ),
          },
        };
      } else {
        // Create new category if it doesn't exist
        const categoryNames: { [key: string]: string } = {
          cspm: "CSPM Executive Dashboard",
          cwpp: "CWPP Dashboard",
          registry: "Registry Scan",
          cnapp: "CNAPP Dashboard",
        };

        const newCategory: Category = {
          id: categoryId,
          name: categoryNames[categoryId] || categoryId,
          widgets: [widget],
        };

        return {
          ...state,
          config: {
            ...state.config,
            categories: [...state.config.categories, newCategory],
          },
        };
      }
    }

    case "REMOVE_WIDGET": {
      const { categoryId, widgetId } = action.payload;
      return {
        ...state,
        config: {
          ...state.config,
          categories: state.config.categories.map((category) =>
            category.id === categoryId
              ? {
                  ...category,
                  widgets: category.widgets.filter(
                    (widget) => widget.id !== widgetId,
                  ),
                }
              : category,
          ),
        },
      };
    }

    case "OPEN_ADD_WIDGET_MODAL":
      return {
        ...state,
        isAddWidgetModalOpen: true,
        selectedCategory: action.payload.categoryId,
      };

    case "CLOSE_ADD_WIDGET_MODAL":
      return {
        ...state,
        isAddWidgetModalOpen: false,
        selectedCategory: null,
      };

    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SET_ACTIVE_NAVIGATION":
      return {
        ...state,
        activeNavigation: action.payload,
      };

    case "TOGGLE_WIDGET_IN_CATEGORY": {
      const { categoryId, widget } = action.payload;
      const category = state.config.categories.find(
        (cat) => cat.id === categoryId,
      );

      if (!category) return state;

      const widgetExists = category.widgets.some((w) => w.name === widget.name);

      if (widgetExists) {
        // Remove widget
        return {
          ...state,
          config: {
            ...state.config,
            categories: state.config.categories.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    widgets: cat.widgets.filter((w) => w.name !== widget.name),
                  }
                : cat,
            ),
          },
        };
      } else {
        // Add widget (ID should already be set in the modal)
        return {
          ...state,
          config: {
            ...state.config,
            categories: state.config.categories.map((cat) =>
              cat.id === categoryId
                ? {
                    ...cat,
                    widgets: [...cat.widgets, widget],
                  }
                : cat,
            ),
          },
        };
      }
    }

    default:
      return state;
  }
}

const DashboardContext = createContext<{
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
} | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

// Helper functions
export const useDashboardActions = () => {
  const { dispatch } = useDashboard();

  return {
    addWidget: (categoryId: string, widget: Widget) =>
      dispatch({ type: "ADD_WIDGET", payload: { categoryId, widget } }),

    removeWidget: (categoryId: string, widgetId: string) =>
      dispatch({ type: "REMOVE_WIDGET", payload: { categoryId, widgetId } }),

    openAddWidgetModal: (categoryId: string) =>
      dispatch({ type: "OPEN_ADD_WIDGET_MODAL", payload: { categoryId } }),

    closeAddWidgetModal: () => dispatch({ type: "CLOSE_ADD_WIDGET_MODAL" }),

    setSearchQuery: (query: string) =>
      dispatch({ type: "SET_SEARCH_QUERY", payload: query }),

    setActiveNavigation: (navigation: string) =>
      dispatch({ type: "SET_ACTIVE_NAVIGATION", payload: navigation }),

    toggleWidgetInCategory: (categoryId: string, widget: Widget) =>
      dispatch({
        type: "TOGGLE_WIDGET_IN_CATEGORY",
        payload: { categoryId, widget },
      }),
  };
};
