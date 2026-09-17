import { NavLink, useNavigate } from 'react-router-dom';
import { Target, BarChart2, BookOpen, User, Plus, Moon, Flame } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import type { Theme } from '../../types';
import './Navbar.css';

const THEMES: Theme[] = ['mythic', 'dark'];
const THEME_ICONS = { mythic: <Flame size={16} />, dark: <Moon size={16} /> };

export default function Navbar() {
  const { theme, setTheme } = useAppStore();
  const navigate = useNavigate();

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    setTheme(next);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-logo">
          <span className="navbar-logo-icon">⚡</span>
          <span className="navbar-logo-text">HUSTLE<span className="logo-accent">GOAL</span></span>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <BarChart2 size={16} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/goals" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <Target size={16} />
            <span>Goals</span>
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <User size={16} />
            <span>Profile</span>
          </NavLink>
        </div>

        <div className="navbar-actions">
          <button
            id="theme-toggle"
            className="btn btn-ghost btn-sm theme-btn"
            onClick={cycleTheme}
            title={`Theme: ${theme}`}
          >
            {THEME_ICONS[theme]}
            <span className="theme-label">{theme}</span>
          </button>
          <button
            id="new-goal-btn"
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/goals/new')}
          >
            <Plus size={16} />
            New Goal
          </button>
        </div>
      </div>
    </nav>
  );
}
