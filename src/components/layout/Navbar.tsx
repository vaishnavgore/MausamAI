import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudSun, 
  MapPin, 
  AlertTriangle, 
  Bot, 
  Compass, 
  FileText, 
  PlusCircle, 
  ChevronDown, 
  Car, 
  Wheat, 
  Activity, 
  GraduationCap,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { USER_PROFILES } from '@/data/demoProfiles';
import { UserProfileType } from '@/types/user';

interface NavbarProps {
  onOpenReportModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenReportModal }) => {
  const { profile, setProfile, location, setLocation, alerts, theme, toggleTheme } = useApp();
  const routerLocation = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: CloudSun },
    { name: 'Weather', path: '/weather', icon: Compass },
    { name: 'Live Map', path: '/map', icon: MapPin },
    { name: 'Route Risk', path: '/routes', icon: Car },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Alerts', path: '/alerts', icon: AlertTriangle, badgeCount: alerts.length },
    { name: 'Ask AI', path: '/assistant', icon: Bot, isAi: true },
  ];

  const currentProfileInfo = USER_PROFILES[profile];

  const profileIcons: Record<UserProfileType, React.ElementType> = {
    commuter: Car,
    farmer: Wheat,
    fitness: Activity,
    student_parent: GraduationCap,
    traveler: Compass,
  };

  const CurrentIcon = profileIcons[profile] || Car;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Station Selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:bg-blue-700 transition">
                <CloudSun className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    Mausam<span className="text-blue-600 dark:text-blue-400">AI</span>
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block leading-none mt-0.5">
                  Urban Weather & Hazard Intelligence
                </p>
              </div>
            </Link>

            {/* Station Selector Dropdown */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 text-slate-700 dark:text-slate-200 transition"
              >
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>{location.city}, {location.state}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {cityDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-52 rounded-xl dropdown-clean p-1.5 z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                      Select Meteorological Station
                    </div>
                    {['Pune', 'Mumbai', 'Bengaluru', 'New Delhi', 'Nagpur'].map((cityName) => (
                      <button
                        key={cityName}
                        onClick={() => {
                          setLocation({
                            city: cityName,
                            district: cityName,
                            state: cityName === 'Bengaluru' ? 'Karnataka' : cityName === 'New Delhi' ? 'Delhi' : 'Maharashtra',
                            lat: cityName === 'Pune' ? 18.5204 : cityName === 'Mumbai' ? 19.0760 : 12.9716,
                            lng: cityName === 'Pune' ? 73.8567 : cityName === 'Mumbai' ? 72.8777 : 77.5946,
                          });
                          setCityDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg flex items-center justify-between transition ${
                          location.city === cityName
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span>{cityName}</span>
                        {location.city === cityName && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Navigation Links with Framer Motion Sliding Pill */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = routerLocation.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                    isActive
                      ? 'text-slate-900 dark:text-white font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-slate-100 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 rounded-lg -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badgeCount !== undefined && link.badgeCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {link.badgeCount}
                    </span>
                  )}
                  {link.isAi && (
                    <Sparkles className="w-2.5 h-2.5 text-blue-500" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-xs"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </motion.button>

            {/* Persona Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 transition"
              >
                <div className="w-5 h-5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                  <CurrentIcon className="w-3 h-3" />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider leading-none">
                    Role
                  </p>
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                    {currentProfileInfo.title.split(' ')[0]}
                  </p>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>

              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 rounded-xl dropdown-clean p-2 z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800/80 mb-1">
                      Adaptive User Profiles
                    </div>
                    {(Object.keys(USER_PROFILES) as UserProfileType[]).map((pKey) => {
                      const info = USER_PROFILES[pKey];
                      const PIcon = profileIcons[pKey];
                      const isSelected = profile === pKey;
                      return (
                        <button
                          key={pKey}
                          onClick={() => {
                            setProfile(pKey);
                            setProfileDropdownOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded-lg flex items-start gap-2.5 transition ${
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'
                          }`}
                        >
                          <div className={`mt-0.5 p-1.5 rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                            <PIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-900 dark:text-slate-100">{info.title}</span>
                              {isSelected && <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">Active</span>}
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">{info.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Citizen Incident Reporting Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenReportModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report Hazard</span>
              <span className="sm:hidden">Report</span>
            </motion.button>

          </div>
        </div>
      </div>
    </header>
  );
};
