# Metal Price Tracker - Frontend

[![Angular](https://img.shields.io/badge/Angular-18.2-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue.svg)](https://www.typescriptlang.org/)
[![Chart.js](https://img.shields.io/badge/Chart.js-4.4-orange.svg)](https://www.chartjs.org/)

A modern, responsive Angular 18 application for real-time precious metals price tracking and visualization.

## ✨ Features

- **Real-time Price Dashboard**: Current prices for Gold, Silver, Platinum, and Copper
- **Interactive Charts**: Historical price analysis with multiple time periods
- **Professional Visualizations**: Logarithmic bar charts and smooth line charts using Chart.js
- **Statistical Analysis**: Min, max, average, and percentage change calculations
- **Responsive Design**: Modern glass-effect UI with mobile-first approach
- **Standalone Components**: Built with Angular 18's latest standalone architecture

## 🚀 Tech Stack

- **Framework**: Angular 18.2 with Standalone Components
- **Language**: TypeScript 5.4
- **Charts**: Chart.js 4.4
- **Styling**: SCSS with modern CSS features
- **HTTP Client**: Angular's built-in HttpClient
- **Routing**: Angular Router with lazy loading support

## 📦 Project Structure

```
src/
├── app/
│   ├── models/              # TypeScript interfaces and types
│   ├── services/            # HTTP services and business logic
│   ├── pages/
│   │   ├── dashboard/       # Current prices page
│   │   └── chart/          # Historical charts page
│   ├── app.config.ts       # Angular 18 application configuration
│   ├── app.routes.ts       # Routing configuration
│   └── app.ts             # Root component
└── styles.scss            # Global styles
```

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Angular CLI 18+

### Installation

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Navigate to http://localhost:4200
```

### Build

```bash
# Production build
ng build

# Development build with watch
ng build --watch
```

## 🎨 Key Components

### Dashboard Component
- Displays current metal prices in an interactive bar chart
- Logarithmic scaling for better price comparison
- Real-time data updates from backend API

### Chart Component
- Historical price visualization with line charts
- Dynamic period selection (Week, Month, 6 Months, Year)
- Statistical calculations and trend analysis

## 📊 Data Models

```typescript
interface MetalPrice {
  metal: MetalType;
  currentPrice: number;
  previousPrice: number;
  changeAmount: number;
  changePercent: number;
  lastUpdated: string;
}

interface PriceHistory {
  metal: MetalType;
  period: TimePeriod;
  data: PricePoint[];
  generatedAt: string;
}
```

## 🔧 Configuration

The application uses Angular 18's new configuration system:

- **app.config.ts**: Providers configuration (HttpClient, Router, etc.)
- **app.routes.ts**: Route definitions with components
- **Environment**: Configurable API endpoints

## 📱 Responsive Design

- **Mobile-first**: Optimized for all device sizes
- **Glass Effects**: Modern UI with backdrop-filter and transparency
- **Professional Styling**: Inter font family with clean typography
- **Smooth Animations**: CSS transitions and Chart.js animations

## 🔗 API Integration

Connects to a .NET backend API for:
- Current metal prices retrieval
- Historical price data
- Real-time updates and statistics

## 🏗️ Angular 18 Features

- **Standalone Components**: No NgModules required
- **Signals Support**: Ready for reactive programming
- **Modern Build System**: Vite-based development server
- **Improved Performance**: Tree-shaking and optimized bundles

## 📈 Charts & Visualization

- **Chart.js Integration**: Professional charts with animations
- **Dynamic Color Schemes**: Metal-specific color coding
- **Responsive Charts**: Automatically adjust to container size
- **Statistical Overlays**: Real-time calculations display

---

*Built with Angular 18 and modern web standards for optimal performance and developer experience.*

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
