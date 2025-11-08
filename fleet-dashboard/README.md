# Fleet Tracking Dashboard

A real-time fleet tracking dashboard built with Next.js 15, displaying 5 simultaneous vehicle trips across the United States.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **React Leaflet** - Interactive maps

## Features

- 📍 Real-time vehicle tracking on interactive map
- 📊 Fleet-wide metrics and statistics
- 🚗 Individual trip monitoring with progress tracking
- ⏯️ Playback controls with adjustable speed (1x, 5x, 10x, 50x)
- 📱 Responsive design

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
fleet-dashboard/
├── app/
│   ├── page.tsx          # Main dashboard page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── FleetMap.tsx      # Interactive map
│   ├── FleetMetrics.tsx  # Metrics display
│   ├── TripList.tsx      # Trip details
│   └── SimulationControls.tsx  # Playback controls
├── store/
│   └── fleetStore.ts     # Zustand state management
├── types/
│   └── fleet.ts          # TypeScript types
└── public/
    └── data/             # Trip JSON files
```

## How It Works

1. Loads 5 trip JSON files with fleet tracking events
2. Processes events chronologically using intervals
3. Updates map, metrics, and trip details in real-time
4. Allows speed control for simulation playback

## Deployment

Deploy to Vercel:

```bash
npm install -g vercel
vercel
```

Or push to GitHub and deploy via [Vercel Dashboard](https://vercel.com)

## License

MIT
