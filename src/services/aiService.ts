import { Incident, IncidentType } from '@/types/incident';
import { UserProfileType } from '@/types/user';
import { WeatherCondition } from '@/types/weather';

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sourceCitations?: string[];
  suggestedPrompts?: string[];
}

class AIService {
  public classifyImage(
    fileName: string,
    inferredType?: IncidentType
  ): { label: string; confidence: number; model: string } {
    const fn = fileName.toLowerCase();
    if (fn.includes('tree') || fn.includes('branch') || inferredType === 'fallen_tree') {
      return {
        label: 'Fallen Tree / Road Obstruction',
        confidence: 0.92,
        model: 'MausamAI-Vision-v1 (Demo AI)',
      };
    }
    if (fn.includes('water') || fn.includes('flood') || fn.includes('rain') || inferredType === 'waterlogging') {
      return {
        label: 'Urban Waterlogging / Submerged Pavement',
        confidence: 0.89,
        model: 'MausamAI-Vision-v1 (Demo AI)',
      };
    }
    if (fn.includes('accident') || fn.includes('car') || inferredType === 'accident') {
      return {
        label: 'Vehicular Collision / Lane Blockage',
        confidence: 0.87,
        model: 'MausamAI-Vision-v1 (Demo AI)',
      };
    }
    if (fn.includes('wire') || fn.includes('pole') || inferredType === 'fallen_electric_pole') {
      return {
        label: 'Downed Electrical Infrastructure',
        confidence: 0.94,
        model: 'MausamAI-Vision-v1 (Demo AI)',
      };
    }
    return {
      label: 'General Civic Hazard / Obstruction',
      confidence: 0.82,
      model: 'MausamAI-Vision-v1 (Demo AI)',
    };
  }

  public generateAssistantResponse(
    query: string,
    context: {
      profile: UserProfileType;
      weather: WeatherCondition;
      incidents: Incident[];
      locationName: string;
    }
  ): { text: string; sourceCitations: string[]; suggestedPrompts: string[] } {
    const q = query.toLowerCase();
    const activeIncidentsCount = context.incidents.filter((i) => i.verificationStatus !== 'resolved').length;
    const hasBanerIncident = context.incidents.some(
      (i) => i.id === 'inc-001' && i.verificationStatus !== 'resolved'
    );

    let text = '';
    const sourceCitations: string[] = [
      `IMD Automated Weather Station (${context.locationName})`,
      `MausamAI Live Civic Telemetry (${activeIncidentsCount} active events)`,
    ];
    let suggestedPrompts: string[] = [
      'What are the route risks toward Hinjawadi?',
      'Is evening jogging recommended today?',
      'Show agricultural irrigation advisory',
    ];

    if (q.includes('travel') || q.includes('route') || q.includes('commute') || q.includes('hinjawadi') || q.includes('road')) {
      if (hasBanerIncident) {
        text = `⚠️ **Commute Advisory for ${context.locationName}**:\n\nThere is an active high-severity obstacle on **Baner Road near Balewadi Phata** (a large fallen banyan branch blocking 2 lanes toward Hinjawadi, verified by 6 citizen confirmations). \n\n• **Recommendation**: Consider taking **Route B via Pashan-Sus Bypass** which is currently clear, or delay your departure until municipal teams finish clearing.\n• **Weather impact**: Convective afternoon showers (68% probability) may also cause slick pavement.`;
      } else {
        text = `All major corridors in ${context.locationName} are currently operating normally without severe blockages. Wet road conditions are expected between 2:00 PM and 5:00 PM due to incoming showers.`;
      }
      sourceCitations.push('Pune Traffic Police & Citizen Verification Layer');
    } else if (q.includes('exercise') || q.includes('fitness') || q.includes('jog') || q.includes('workout') || q.includes('run')) {
      text = `🏃 **Outdoor Workout Guidance (${context.locationName})**:\n\n• **Current AQI**: ${context.weather.aqi} (${context.weather.aqiCategory}) — Acceptable for most people.\n• **UV Index**: ${context.weather.uvIndex} (High) — Peak sun exposure is harsh right now.\n• **Rain Radar**: Convective storm cells expected around 2:30 PM.\n\n**Best window**: We recommend planning your outdoor workout **after 5:30 PM** when temperatures cool to ~26°C and UV index subsides to low levels.`;
      sourceCitations.push('CPCB Air Quality Monitor & Solar Radiation Index');
    } else if (q.includes('farmer') || q.includes('farm') || q.includes('crop') || q.includes('irrigation') || q.includes('field')) {
      text = `🌾 **Agricultural Weather Briefing for ${context.locationName} Area**:\n\n• **Rainfall**: ~14.5 mm expected today with peak rainfall between 2:00 PM and 4:00 PM.\n• **Wind**: West-South-West gusts up to 28 km/h.\n• **Advisory**: **Postpone planned foliar chemical sprays** as showers will cause pesticide run-off. Clear field furrows to prevent water stagnation in vegetable and legume beds.`;
      sourceCitations.push('IMD Agromet Advisory Division');
    } else if (q.includes('why') || q.includes('reason') || q.includes('explain')) {
      text = `ℹ️ **Explainable Intelligence Breakdown**:\n\nMausamAI dynamically personalizes recommendations because:\n1. **Your active profile** is set to **${context.profile.toUpperCase()}**.\n2. **Current localized rain probability** is high (${context.weather.rainProbability}%).\n3. **Active Civic Events**: ${activeIncidentsCount} hazards are currently active within a 10 km radius.\n4. Decisions prioritize verified public safety data over raw forecasts.`;
    } else {
      text = `Currently in **${context.locationName}**, the temperature is **${context.weather.temp}°C** (feels like ${context.weather.feelsLike}°C) with **${context.weather.condition}**. Humidity is at ${context.weather.humidity}% with a ${context.weather.rainProbability}% probability of rain this afternoon. \n\nThere are **${activeIncidentsCount} active civic alerts** in the area. How can I assist your specific journey or daily routine?`;
    }

    return { text, sourceCitations, suggestedPrompts };
  }
}

export const aiService = new AIService();
