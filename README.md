# Dynamic Dashboard Assignment

A dynamic cybersecurity dashboard built with React, TypeScript, and modern UI components. This application allows users to dynamically add and remove widgets across different dashboard categories.

## 🎯 Assignment Requirements Implemented

- ✅ **JSON Structure**: Dynamic dashboard built from JSON configuration with categories and widgets
- ✅ **Add/Remove Widgets**: Users can dynamically add and remove widgets from categories
- ✅ **Random Text Content**: Widgets display random text content for assignment purposes
- ✅ **Add Widget Modal**: Custom widget creation with name and text input
- ✅ **Remove Functionality**: Cross icon on each widget for easy removal
- ✅ **Search Functionality**: Search through available widgets in the add modal
- ✅ **React + State Management**: Built with React and Context API for local state management

## 🚀 Features

### Dynamic Widget Management

- **Category-based Organization**: Widgets are organized into categories (CNAPP Dashboard, CSPM Executive Dashboard, CWPP Dashboard, Registry Scan)
- **Add Widgets**: Click "+ Add Widget" to open a modal with available widgets
- **Remove Widgets**: Hover over any widget and click the X icon to remove it
- **Search Widgets**: Search through available widgets by name or description
- **Persistent State**: All changes are maintained locally using React Context

### Modern UI Components

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Interactive Charts**: Donut charts for data visualization
- **Modern Modal**: Tabbed interface for widget selection and creation
- **Hover Effects**: Smooth transitions and hover states
- **Professional Styling**: Clean, modern design matching the provided mockups

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: TailwindCSS + Radix UI Components
- **State Management**: React Context API + useReducer
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Development**: Hot reload with Vite dev server

## 📁 Project Structure

```
client/
├── components/
│   ├── ui/                    # Reusable UI components (buttons, dialogs, etc.)
│   ├── Dashboard.tsx          # Main dashboard layout
│   ├── DashboardHeader.tsx    # Header with search and controls
│   ├── Sidebar.tsx           # Navigation sidebar
│   ├── AddWidgetModal.tsx    # Modal for adding widgets
│   ├── DynamicWidget.tsx     # Widget component with remove functionality
│   └── DonutChart.tsx        # Chart visualization component
├── contexts/
│   └── DashboardContext.tsx  # State management with React Context
├── data/
│   └── dashboardConfig.ts    # JSON configuration for dashboard
└── pages/
    └── Index.tsx             # Main page entry point
```

## 🔧 Setup Instructions

### Prerequisites

- Node.js (version 18 or higher)
- npm (comes with Node.js)

### Installation Steps

1. **Clone/Download the project**

   ```bash
   # If you have git access:
   git clone [repository-url]

   # Or extract from the provided zip file
   ```

2. **Navigate to project directory**


3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to: http://localhost:8080
   ```

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run typecheck  # Run TypeScript validation
npm test          # Run tests
```

## 🎮 How to Use

### Adding Widgets

1. Click the "+ Add Widget" button in any category section
2. Browse available widgets in the modal
3. Use the search bar to find specific widgets
4. Check/uncheck widgets to add/remove them from the category
5. Or create a custom widget in the "CWPP" tab with name and text
6. Click "Confirm" to save changes

### Removing Widgets

1. Hover over any widget card
2. Click the X icon that appears in the top-right corner
3. The widget will be removed from the category

### Navigation

- Use the sidebar to navigate between different dashboard sections
- The dashboard displays all categories with their respective widgets
- Each category has its own "+ Add Widget" functionality

## 📊 Dashboard Categories

1. **CNAPP Dashboard** - Cloud-Native Application Protection Platform
2. **CSPM Executive Dashboard** - Cloud Security Posture Management
3. **CWPP Dashboard** - Cloud Workload Protection Platform
4. **Registry Scan** - Container registry security scanning

## 🎨 Widget Types

- **Chart Widgets**: Display donut charts with data visualization
- **Metric Widgets**: Show progress bars and statistical data
- **Text Widgets**: Display informational content with icons

## 🔍 Search Functionality

The search feature allows you to:

- Search widgets by name
- Filter by description content
- Real-time search results
- Case-insensitive matching

## 💾 State Management

The application uses React Context API with useReducer for:

- Managing widget configurations
- Handling add/remove operations
- Modal state management
- Search functionality
- Persistent local state

## 🎯 Assignment Compliance

This implementation fully satisfies all assignment requirements:

1. ✅ **JSON Configuration**: `client/data/dashboardConfig.ts` contains the complete JSON structure
2. ✅ **Dynamic Widgets**: Users can add/remove widgets from any category
3. ✅ **Random Text**: All widgets contain sample text content
4. ✅ **Add Widget Feature**: Modal interface for adding widgets with name and text
5. ✅ **Remove Feature**: Cross icons on widgets for removal
6. ✅ **Search Feature**: Search functionality in the add widget modal
7. ✅ **React Implementation**: Built with modern React and TypeScript
8. ✅ **State Management**: React Context for local state management

## 🚀 Production Deployment

To build for production:

```bash
npm run build
npm run start
```

The application will be optimized and ready for deployment.

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge


