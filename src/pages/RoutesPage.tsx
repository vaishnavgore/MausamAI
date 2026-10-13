import React from 'react';
import { RouteRiskPlanner } from '@/components/route/RouteRiskPlanner';
import { CivicMap } from '@/components/civic/CivicMap';

export const RoutesPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <RouteRiskPlanner />
      <div className="space-y-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Corridor Map Projection & Active Hazard Polylines
        </h3>
        <CivicMap heightClass="h-[480px]" showRoutePolyline={true} />
      </div>
    </div>
  );
};
