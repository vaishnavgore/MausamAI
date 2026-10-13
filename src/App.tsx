import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { DemoBar } from '@/components/layout/DemoBar';
import { Footer } from '@/components/layout/Footer';
import { ReportIncidentModal } from '@/components/civic/ReportIncidentModal';

import { LandingPage } from '@/pages/LandingPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { WeatherPage } from '@/pages/WeatherPage';
import { CivicMapPage } from '@/pages/CivicMapPage';
import { RoutesPage } from '@/pages/RoutesPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { AlertsPage } from '@/pages/AlertsPage';
import { AssistantPage } from '@/pages/AssistantPage';

export const App: React.FC = () => {
  const [reportModalOpen, setReportModalOpen] = useState(false);

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 flex flex-col antialiased relative selection:bg-blue-600 selection:text-white transition-colors duration-200">
          
          {/* Subtle Technical Dot Grid for Clean Modern Depth */}
          <div className="fixed inset-0 pointer-events-none z-0 bg-dot-grid-light dark:bg-dot-grid opacity-60" />

          <div className="relative z-10 flex flex-col flex-1">
            {/* Interactive Simulation Controller Bar */}
            <DemoBar />

            {/* Main Navigation */}
            <Navbar onOpenReportModal={() => setReportModalOpen(true)} />

            {/* Dynamic Page Views */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route
                  path="/map"
                  element={<CivicMapPage onOpenReportModal={() => setReportModalOpen(true)} />}
                />
                <Route path="/routes" element={<RoutesPage />} />
                <Route
                  path="/reports"
                  element={<ReportsPage onOpenReportModal={() => setReportModalOpen(true)} />}
                />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/assistant" element={<AssistantPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />

            {/* Global Report Hazard Modal */}
            <ReportIncidentModal
              isOpen={reportModalOpen}
              onClose={() => setReportModalOpen(false)}
            />
          </div>
        </div>
      </Router>
    </AppProvider>
  );
};
