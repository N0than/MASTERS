import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sidebar } from './components/Sidebar';
import { SearchBar } from './components/SearchBar';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { UserAuth } from './components/UserAuth';
import { LogOut } from 'lucide-react';
import { Home } from './pages/Home';
import { Rankings } from './pages/Rankings';
import { Predictions } from './pages/Predictions';
import { Community } from './pages/Community';
import { Leaderboard } from './pages/Leaderboard';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { Sun, Moon, Menu, ChevronDown, List, PlusCircle } from 'lucide-react';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ email: string; username: string } | null>(null);
  const [authError, setAuthError] = useState<string>();
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const handleAdminLogin = (email: string, password: string) => {
    if (email === 'admin@audiencemasters.com' && password === 'AudienceMaster2025!') {
      setIsAdmin(true);
      setAuthError(undefined);
    } else {
      setAuthError('Email ou mot de passe incorrect');
    }
  };

  const handleUserLogin = (email: string, password: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ email, username: email.split('@')[0] });
    setAuthError(undefined);
  };

  const handleUserRegister = (email: string, password: string, username: string) => {
    setIsAuthenticated(true);
    setCurrentUser({ email, username });
    setAuthError(undefined);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');
  };

  return (
    <Router>
      <div className={theme === 'dark' ? 'dark' : 'light'}>
        <Routes>
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <MainApp
                  isAdmin={isAdmin}
                  isAuthenticated={isAuthenticated}
                  currentUser={currentUser}
                  authError={authError}
                  theme={theme}
                  handleLogout={handleLogout}
                  toggleTheme={toggleTheme}
                />
              ) : (
                <UserAuth
                  onLogin={handleUserLogin}
                  onRegister={handleUserRegister}
                  error={authError}
                />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isAdmin ? (
                <AdminDashboard />
              ) : (
                <AdminLogin onLogin={handleAdminLogin} error={authError} />
              )
            }
          />
          <Route path="/admin/programs" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

function MainApp({ isAdmin, isAuthenticated, currentUser, authError, theme, handleLogout, toggleTheme }) {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const location = useLocation();

  const toggleAdminMenu = () => {
    setShowAdminMenu(!showAdminMenu);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <Sidebar />

      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <SearchBar />
            <div className="flex items-center gap-4">
              {isAdmin && (
                <button
                  onClick={toggleAdminMenu}
                  className={`flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 light-bg-gray-200 light:hover:bg-gray-300 transition-colors`}
                >
                  <Menu className="w-5 h-5" />
                  Gérer les programmes
                  <ChevronDown className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-gray-800 dark:hover:bg-gray-200 light-hover:bg-gray-300 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-800 dark:hover:bg-gray-200 light-hover:bg-gray-300 rounded-lg transition-colors"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {showAdminMenu && (
            <div className="absolute right-20 top-20 bg-gray-800 dark:bg-gray-200 light-bg-gray-200 text-white dark:text-gray-900 light-text-gray-900 rounded-lg shadow-lg p-4">
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 light-hover:bg-gray-300 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    Ajouter un nouveau programme
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/programs"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 light-hover:bg-gray-300 transition-colors"
                  >
                    <List className="w-5 h-5" />
                    Voir les programmes
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/rankings" element={<Rankings />} />
              <Route path="/predictions" element={<Predictions />} />
              <Route path="/community" element={<Community />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default App;
