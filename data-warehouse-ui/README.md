# Data Warehouse Workspace UI

A modern, interactive frontend mockup for a data warehouse workspace built with React, TypeScript, and Tailwind CSS.

## Key Features

### Dashboard System
- Customizable grid layout with draggable widgets
- Quick-action tiles for common operations
- Resource usage metrics and visualizations
- Recent activity feed
- Cluster status monitoring

### Cost Management
- Real-time compute cost tracking
- Daily spend visualization
- Budget threshold alerts
- Detailed cost breakdown by cluster/job
- 7-day trend analysis

### Navigation
- Modern collapsible sidebar
- Workspace tree navigation
- Global search functionality
- Quick access to notebooks and jobs

### User Interface
- Clean, modern design with Databricks branding
- Dark/light mode support
- Responsive layout
- Interactive notifications system
- User profile management

## Technical Stack

- React 18
- TypeScript
- Tailwind CSS
- Lucide React Icons
- Vite

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/    # Dashboard grid and widgets
│   ├── layout/       # Core layout components
│   └── widgets/      # Individual widget components
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```