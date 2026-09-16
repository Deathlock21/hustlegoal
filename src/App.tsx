import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import batmanBg from './assets/batman_background.mp4';
import Navbar from './components/Layout/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import GoalList from './components/Goals/GoalList';
import NewGoalForm from './components/Goals/NewGoalForm';
import GoalDetail from './components/Goals/GoalDetail';
import Profile from './components/Profile/Profile';
import Library from './components/Library/Library';
import Onboarding from './components/Onboarding/Onboarding';
import WinScreen from './components/Overlays/WinScreen';
import RoastScreen from './components/Overlays/RoastScreen';
import { useAppStore } from './store/useAppStore';
import { getProfile } from './db/database';
import { useProfile } from './hooks/useProfile';

function AppShell() {
  const [onboardingDone, setOnboardingDone] = useState<boolean | null>(null);
  const { theme } = useAppStore();
  const profile = useProfile();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    getProfile().then(p => {
      setOnboardingDone(!!p?.onboarding_complete);
    });
  }, []);

  // After onboarding completes, check again
  useEffect(() => {
    if (profile) setOnboardingDone(!!profile.onboarding_complete);
  }, [profile]);

  if (onboardingDone === null) return null; // loading

  if (!onboardingDone) {
    return <Onboarding onComplete={() => setOnboardingDone(true)} />;
  }

  return (
    <>
      {theme === 'dark' && (
        <>
          <video
            key="dark-bg-video"
            className="dark-video-bg"
            src={batmanBg}
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="dark-video-scrim" />
        </>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/goals" element={<GoalList />} />
        <Route path="/goals/new" element={<NewGoalForm />} />
        <Route path="/goals/:id" element={<GoalDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Library />} />
      </Routes>
      <WinScreen />
      <RoastScreen profile={profile} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
