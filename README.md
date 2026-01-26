# Railway Management Dashboard

A modern, real-time railway traffic management system built with React, TypeScript, and shadcn/ui. This application provides comprehensive monitoring and AI-powered optimization for railway operations.

## Features

### 🚂 Real-Time Monitoring
- Live tracking of active trains across the network
- Real-time performance metrics and KPIs
- Section utilization and throughput monitoring
- On-time performance tracking

### 🤖 AI-Powered Optimization
- Intelligent precedence recommendations
- Crossing sequence optimization
- Strategic holding suggestions
- Predictive delay prevention

### 📊 Analytics & Insights
- Performance analytics and trends
- Historical data visualization
- Custom reporting capabilities
- System health monitoring

### 🎛️ Control Features
- Interactive railway visualization
- Train scheduling and optimization
- Alert management system
- Simulation capabilities

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd railway-management-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
bun run build
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── ActiveTrainsTable.tsx
│   │   ├── AIRecommendationPanel.tsx
│   │   ├── DashboardHeader.tsx
│   │   ├── MetricCard.tsx
│   │   └── RailwayVisualization.tsx
│   └── ui/                 # Reusable UI components (shadcn/ui)
├── contexts/               # React contexts
│   ├── ThemeContext.tsx
│   └── TimeContext.tsx
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── pages/                  # Application pages
│   ├── Analytics.tsx
│   ├── Dashboard.tsx
│   ├── Landing.tsx
│   ├── Logs.tsx
│   ├── Notifications.tsx
│   ├── Optimizer.tsx
│   ├── Settings.tsx
│   └── Simulation.tsx
└── assets/                 # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Components

### Dashboard
The main control interface featuring:
- Real-time metrics overview
- AI recommendation panel
- Active trains monitoring
- System status indicators

### AI Recommendations
Intelligent suggestions for:
- **Precedence**: Priority adjustments between trains
- **Crossing**: Optimal crossing sequences
- **Holding**: Strategic delays to prevent cascading issues
- **Rerouting**: Alternative path suggestions

### Analytics
Comprehensive data visualization including:
- Performance trends
- Historical comparisons
- Predictive analytics
- Custom reporting

## Configuration

### Theme Support
The application supports both light and dark themes through the `ThemeContext`. Theme preference is automatically saved and restored.

### Time Context
Real-time clock functionality is provided through the `TimeContext` for synchronized time display across components.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [shadcn/ui](https://ui.shadcn.com/) for beautiful, accessible components
- Icons provided by [Lucide React](https://lucide.dev/)
- Charts powered by [Recharts](https://recharts.org/)