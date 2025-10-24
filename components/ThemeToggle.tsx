
import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import type { ThemeContextType } from '../types';
import { SunIcon, MoonIcon } from './icons';

const ThemeToggle: React.FC = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    return null;
  }

  const { theme, setTheme } = context;

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-light-surface dark:bg-dark-surface text-light-subtle dark:text-dark-subtle hover:bg-light-border dark:hover:bg-dark-border transition-colors duration-200"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggle;
