
import React, { useState, createContext, useMemo, useEffect } from 'react';
import type { Page, Theme, ThemeContextType } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CampaignBuilder from './pages/CampaignBuilder';
import AutomationFlow from './pages/AutomationFlow';
import Audience from './pages/Audience';
import TemplateGallery from './pages/TemplateGallery';


export const ThemeContext = createContext<ThemeContextType | null>(null);

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [page, setPage] = useState<Page>('dashboard');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const themeContextValue = useMemo(() => ({ theme, setTheme }), [theme]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard setPage={setPage} />;
      case 'campaigns':
        return <CampaignBuilder />;
      case 'automations':
        return <AutomationFlow />;
      case 'audience':
        return <Audience />;
      case 'templates':
        return <TemplateGallery />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  };
  
  const pageTitle: Record<Page, string> = {
    dashboard: "Dashboard",
    campaigns: "Campaign Builder",
    automations: "Automation Flow",
    audience: "Audience",
    templates: "Templates",
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="flex h-screen bg-light-bg dark:bg-dark-bg font-sans text-light-text dark:text-dark-text">
        <Sidebar currentPage={page} setPage={setPage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header title={pageTitle[page]} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
