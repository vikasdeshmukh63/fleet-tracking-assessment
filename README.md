# MapUp - Fleet Tracking Dashboard Assessment

## Overview

The objective of this assessment is to build a **real-time fleet tracking dashboard** using realistic vehicle trip data. You'll work with comprehensive fleet tracking events to create an interactive dashboard that visualizes vehicle movements, metrics, and operational insights. This assessment tests your skills in real-time data processing, dashboard design, and fleet management visualization.

### We encourage the use of AI and LLM tools for this assessment! However, you must understand what you're building and be able to explain your implementation decisions.

## Dataset

You have two options for obtaining your assessment data:

### Option 1: Generate Your Own Unique Data (Highly Recommended)
Generate your own unique trip data using our fleet tracking simulator. This ensures you have a completely unique dataset and demonstrates technical proficiency.

**📖 [HOW_TO_GENERATE_DATA.md](./HOW_TO_GENERATE_DATA.md)** - Complete instructions for generating your assessment data

### Option 2: Use Pre-generated Fallback Data
If you encounter issues with data generation, pre-generated sample data is available in the `assessment-fallback-data/` folder.

## Data Structure

Your dataset contains **5 simultaneous trips** being driven by different drivers across the United States:

1. **Cross-Country Long Haul** - Transcontinental freight delivery (10,000+ events)
2. **Urban Dense Delivery** - Dense urban route with frequent updates (500+ events) 
3. **Mountain Route Cancelled** - Trip cancelled due to weather conditions (100+ events)
4. **Southern Technical Issues** - Route with device and technical problems (1,000+ events)
5. **Regional Logistics** - Regional route with fuel management events (2,000+ events)

Each trip progresses independently with its own timeline, events, and challenges. Your dashboard should handle monitoring all trips simultaneously while providing both individual trip details and fleet-wide insights.

**📖 [FLEET_TRACKING_EVENT_TYPES.md](./FLEET_TRACKING_EVENT_TYPES.md)** - Complete reference for all 27 event types in your dataset

## Tasks

### Dashboard Creation:

Build a comprehensive fleet tracking dashboard that displays:

- **Individual Trip Data**: Show detailed metrics and progress for each of the 5 concurrent trips
- **Collective Fleet Metrics**: Display overall fleet insights (e.g., how many trips completed 50%, 80%, etc.)
- **Real-time Simulation**: Use event timestamps to simulate live fleet tracking

You have complete creative freedom in choosing what metrics to display, how to visualize the data, and what insights to highlight. Focus on creating a dashboard that would be valuable for fleet managers monitoring multiple simultaneous trips.

### Real-time Data Simulation:

Since the trip data contains timestamps, you'll need to simulate real-time behavior. Here are some implementation hints (feel free to use any other approach you prefer):

- **Local Interval Function**: Use `setInterval()` or similar to process events based on their timestamps
- **Streaming API**: Create a mock API endpoint that serves events in real-time sequence
- **Playback Controls**: Allow users to control the simulation speed (1x, 5x, 10x speed)
- **Time-based Processing**: Filter and display events as if they're happening "now" based on simulation time

These are just suggestions - you're welcome to implement real-time simulation using any method that works best for your chosen tech stack and demonstrates your skills effectively.

### Technical Requirements:

- **Event Stream Processing**: Process events chronologically to simulate real-time data
- **State Management**: Track vehicle status, trip progress, and alert states
- **Performance**: Efficiently handle datasets with 10,000+ events
- **Responsive Design**: Ensure dashboard works across different screen sizes
- **User Experience**: Create intuitive navigation and information hierarchy

### Deployment:

- Deploy your fleet tracking dashboard to a hosting platform of your choice
- Make sure the dashboard is publicly accessible
- Ensure it can load and process the generated trip data files

## Evaluation Criteria

Your submission will be evaluated based on:

- **Real-time Processing**: Effectiveness in simulating real-time fleet tracking
- **Dashboard Design**: Clarity, aesthetics, and usability of the interface
- **Technical Implementation**: Code quality, performance, and architecture decisions
- **Data Insights**: Ability to present meaningful trip and fleet insights
- **User Experience**: Intuitive navigation and information presentation

## What Your Dashboard Should Handle

Your dashboard will work with 5 different trip types, each with unique characteristics:

1. **Long Haul Trip** - Extended cross-country delivery with many events
2. **Urban Trip** - Dense city delivery with frequent location updates  
3. **Cancelled Trip** - Trip that gets cancelled partway through
4. **Technical Issues Trip** - Trip with device problems and signal issues
5. **Logistics Trip** - Regional delivery with fuel and operational events

Focus on creating a clean, intuitive interface that displays trip progress, basic metrics, and handles the different event types present in your data.

## Submission Guidelines

- Fork this repository to your GitHub account
- Complete your fleet tracking dashboard implementation
- Deploy the dashboard to a hosting platform
- Update this README with the URL to your live dashboard
- **Repository Access:** Keep your repository private to avoid visibility by other candidates. Add the following email addresses as collaborators:
  - vedantp@mapup.ai
  - ajayap@mapup.ai  
  - atharvd@mapup.ai
- Finally, please fill out the google form that you received via email to submit the assessment for review

## Getting Started

1. **Generate Your Data**: Follow [HOW_TO_GENERATE_DATA.md](./HOW_TO_GENERATE_DATA.md) to create your unique dataset
2. **Study Event Types**: Review [FLEET_TRACKING_EVENT_TYPES.md](./FLEET_TRACKING_EVENT_TYPES.md) to understand the data structure
3. **Plan Your Dashboard**: Design your approach for real-time visualization and event processing
4. **Build & Deploy**: Implement your solution and deploy to a hosting platform

## Technical Stack Flexibility

Feel free to use any technology stack you prefer:
- **Frontend**: React, Vue, Angular, Svelte, or vanilla JavaScript
- **Mapping**: Leaflet, Mapbox, Google Maps, or OpenStreetMap
- **Charts**: D3.js, Chart.js, Recharts, or any visualization library
- **Deployment**: Vercel, Netlify, AWS, or any hosting platform

---

**Ready to build your fleet tracking dashboard? Start by generating your unique assessment data!**

📖 **Next Step**: [HOW_TO_GENERATE_DATA.md](./HOW_TO_GENERATE_DATA.md)

---

## Technical Documentation

For technical details about the data generator implementation, see [data-generator/TECHNICAL_README.md](./data-generator/TECHNICAL_README.md)
