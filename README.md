# MausamAI — Personalized Weather + Civic Intelligence

> **Same Weather. Smarter Decisions. Safer Journeys.**
> Advanced Hyperlocal Meteorological Intelligence & Civic Incident Telemetry Platform.

---

## 🌟 Overview

Traditional weather applications provide uniform forecasts regardless of user context. **MausamAI** fuses:
- **IMD Meteorological Telemetry** (Temperature, Convective Rain Probabilities, Wind, UV, AQI, Doppler Radar Echoes)
- **User Lifestyle Personas** (Farmer, Commuter, Fitness Enthusiast, Parent/Student, Highway Traveler)
- **Citizen Incident Reporting** (Waterlogging, Fallen Trees, Road Closures with Geotagged Photo Evidence & AI Classification)
- **News Wire Cross-Signals** (Sakal, Lokmat, Pune Mirror, Indian Express)
- **Multi-Signal Trust Corroboration** (Transparent confidence scoring without black-box assumptions)
- **Route Risk Intersector** (Real-time "Incident Ahead" distance alerts and alternate corridor suggestions)

---

## 🚀 Live Demonstration & Scenario Flow

For project demonstration and evaluation:

1. **Launch Dashboard**: Open MausamAI with default **Pune, Maharashtra** station data.
2. **Select Persona**: Switch between **Commuter**, **Farmer**, and **Fitness Enthusiast** in the top navigation bar. Notice the instant adaptation of prioritized environmental metrics and the *"Recommended for You"* advisory.
3. **Explainable AI**: Click **"Why am I seeing this?"** to view the deterministic signals powering the advisory.
4. **Interactive Civic Map**: View real-time obstacles on Baner Road and Shivajinagar subway with Doppler radar overlays.
5. **Simulate Live Telemetry**: Use the sticky **Interactive Demo Simulation** bar:
   - Click `Simulate Heavy Rain` to trigger a sudden convective burst.
   - Click `Simulate Fallen Tree` to place an obstacle on Baner Road.
   - Click `News Signal` to receive breaking local news corroboration.
   - Click `+1 Confirm` to observe live community consensus.
6. **Route Risk & Incident Ahead**: Inspect the Pune Station ➔ Hinjawadi IT Park corridor. Observe the dynamic **"⚠ INCIDENT AHEAD (~700m)"** banner and 1-click alternate route recommendation (Route B via Pashan).
7. **Citizen Incident Reporting**: Click **"+ Report Incident"** to run the 5-step reporting flow with instant Demo Computer Vision classification.

---

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Glassmorphism, Custom Gov-Tech Color Palette
- **Mapping**: Leaflet with CartoDB & OpenStreetMap basemaps, SVG dynamic markers, and Doppler radar polygons
- **Data Visualizations**: Recharts
- **Icons & Motion**: Lucide React, Framer Motion, Canvas Confetti

---

## 💻 Local Setup & Execution

1. Clone the repository and navigate into the workspace:
   ```bash
   cd mausamai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 🛡 Responsible AI & Integrity

- **Non-Replacement**: MausamAI is an AI-assisted decision-support co-pilot; it does not supersede official NDMA or IMD disaster bulletins.
- **Explainability**: Every recommendation includes inspectable telemetry citations.
- **Anti-Hallucination**: Live meteorological facts are strictly grounded in active sensor feeds.

© 2026 MausamAI — Personalized Weather & Civic Intelligence
