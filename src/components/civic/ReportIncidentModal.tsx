import React, { useState } from 'react';
import { 
  X, 
  Upload, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  Camera, 
  ChevronRight, 
  ArrowLeft 
} from 'lucide-react';
import { IncidentSeverity, IncidentType } from '@/types/incident';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';

interface ReportIncidentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INCIDENT_CATEGORIES: { type: IncidentType; label: string; icon: string }[] = [
  { type: 'fallen_tree', label: 'Fallen Tree / Branch', icon: '🌲' },
  { type: 'waterlogging', label: 'Waterlogging / Flood', icon: '💧' },
  { type: 'heavy_rain', label: 'Heavy Convective Rain', icon: '🌧' },
  { type: 'road_damage', label: 'Road Damage / Pothole', icon: '🕳' },
  { type: 'accident', label: 'Vehicle Accident', icon: '🚗' },
  { type: 'road_blockage', label: 'Road Blockage / Jam', icon: '⛔' },
  { type: 'storm_damage', label: 'Storm / Grid Issue', icon: '⚡' },
  { type: 'fallen_electric_pole', label: 'Downed Wire / Pole', icon: '🔌' },
  { type: 'landslide', label: 'Ghat Landslide', icon: '⛰' },
  { type: 'low_visibility', label: 'Dense Fog / Mist', icon: '🌫' },
  { type: 'other', label: 'Other Hazard', icon: '⚠' },
];

export const ReportIncidentModal: React.FC<ReportIncidentModalProps> = ({ isOpen, onClose }) => {
  const { reportIncident } = useApp();

  const [step, setStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<IncidentType>('fallen_tree');
  const [locationName, setLocationName] = useState<string>('Baner Road near Balewadi Phata, Pune');
  const [lat, setLat] = useState<number>(18.5590);
  const [lng, setLng] = useState<number>(73.7868);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
  );
  const [description, setDescription] = useState<string>(
    'Large banyan branch broken by strong thunderstorm gusts blocking two lanes toward Hinjawadi.'
  );
  const [severity, setSeverity] = useState<IncidentSeverity>('high');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const title = `${INCIDENT_CATEGORIES.find((c) => c.type === selectedType)?.label || 'Civic Obstruction'} at ${locationName.split(',')[0]}`;
      reportIncident({
        type: selectedType,
        title,
        description,
        latitude: lat,
        longitude: lng,
        locationName,
        severity,
        imageUrl: photoPreview || undefined,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      confetti({
        particleCount: 50,
        spread: 45,
        origin: { y: 0.6 },
      });
    }, 500);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-slate-800 dark:text-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
              Citizen Reporting System
            </span>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Report Civic Hazard or Obstruction
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Bar */}
        {!isSubmitted && (
          <div className="flex items-center justify-between my-4 text-xs font-semibold">
            {['Type', 'Location', 'Evidence', 'Details'].map((label, idx) => (
              <div key={label} className="flex items-center gap-1.5">
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step === idx + 1
                      ? 'bg-blue-600 dark:bg-cyan-500 text-white dark:text-slate-950'
                      : step > idx + 1
                      ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step > idx + 1 ? '✓' : idx + 1}
                </span>
                <span className={`text-[11px] ${step === idx + 1 ? 'text-slate-900 dark:text-white font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                  {label}
                </span>
                {idx < 3 && <span className="text-slate-300 dark:text-slate-700">──</span>}
              </div>
            ))}
          </div>
        )}

        {/* Submitted Success Screen */}
        {isSubmitted ? (
          <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Incident Successfully Registered</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
              Your report has been placed on the MausamAI Live Civic Map and queued for community cross-signal corroboration. Nearby commuters will receive real-time awareness alerts.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 max-w-sm mx-auto text-xs text-slate-700 dark:text-slate-300 space-y-1 text-left">
              <p><span className="text-slate-400 dark:text-slate-500">Hazard:</span> {INCIDENT_CATEGORIES.find((c) => c.type === selectedType)?.label}</p>
              <p><span className="text-slate-400 dark:text-slate-500">Location:</span> {locationName}</p>
              <p><span className="text-slate-400 dark:text-slate-500">AI Classification:</span> Verified via Demo Vision Service (91%)</p>
            </div>
            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/25 transition"
            >
              Back to Live Map
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Step 1: Category */}
            {step === 1 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Step 1: What happened? Select Hazard Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {INCIDENT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.type}
                      type="button"
                      onClick={() => setSelectedType(cat.type)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                        selectedType === cat.type
                          ? 'bg-blue-50 dark:bg-cyan-950/70 border-blue-600 dark:border-cyan-400 text-blue-950 dark:text-cyan-300 font-bold shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                          : 'bg-white dark:bg-slate-800/70 border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-xs">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Location */}
            {step === 2 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Step 2: Where is the incident located?
                </label>
                
                <div className="space-y-2">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-rose-500" />
                    <input
                      type="text"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      placeholder="e.g. Baner Road near Balewadi Phata, Pune"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setLocationName('Baner Road near Balewadi Phata, Pune');
                        setLat(18.5590);
                        setLng(73.7868);
                      }}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-left border border-slate-200 dark:border-slate-700"
                    >
                      📍 Baner Road (Balewadi)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLocationName('Shivajinagar Subway, Pune');
                        setLat(18.5308);
                        setLng(73.8475);
                      }}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 text-left border border-slate-200 dark:border-slate-700"
                    >
                      📍 Shivajinagar Subway
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Evidence & AI Classification */}
            {step === 3 && (
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Step 3: Upload Photo Evidence (Demo Vision Classification)
                </label>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center space-y-2">
                  {photoPreview ? (
                    <div className="relative aspect-video max-h-40 mx-auto rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="absolute top-2 right-2 p-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-rose-600 hover:text-white transition shadow-xs"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-4 space-y-2">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Upload photograph from your device (JPG, PNG, WEBP)
                      </p>
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white text-xs font-semibold cursor-pointer transition">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose Photo</span>
                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                      </label>
                    </div>
                  )}
                </div>

                {/* AI Classification Preview */}
                {photoPreview && (
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-cyan-950/50 border border-blue-200 dark:border-cyan-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-blue-900 dark:text-cyan-300">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                      <div>
                        <p className="font-bold">AI Computer Vision Classification:</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400">
                          Detected: {selectedType === 'waterlogging' ? 'Urban Water Accumulation' : 'Fallen Tree / Road Obstacle'}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-cyan-900/60 text-blue-800 dark:text-cyan-300 text-[10px] font-bold">
                      91% Match
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Details & Severity */}
            {step === 4 && (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    Step 4: Short Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Briefly describe what is happening..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 block">
                    Severity Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'low', label: 'Low', desc: 'Passable with caution' },
                      { id: 'moderate', label: 'Moderate', desc: 'Single lane blocked' },
                      { id: 'high', label: 'High', desc: 'Critical obstruction' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setSeverity(lvl.id as IncidentSeverity)}
                        className={`p-2.5 rounded-xl border text-left transition ${
                          severity === lvl.id
                            ? lvl.id === 'high'
                              ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 dark:border-rose-600 text-rose-900 dark:text-rose-200 font-bold'
                              : lvl.id === 'moderate'
                              ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-500 dark:border-amber-600 text-amber-900 dark:text-amber-200 font-bold'
                              : 'bg-blue-50 dark:bg-cyan-950/60 border-blue-500 dark:border-cyan-600 text-blue-900 dark:text-cyan-200 font-bold'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <p className="text-xs">{lvl.label}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500">{lvl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Footer Step Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
              ) : <div></div>}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center gap-1 shadow-md shadow-cyan-500/25 transition"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 transition flex items-center gap-1.5 active:scale-95"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit Citizen Report</span>
                    </>
                  )}
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
