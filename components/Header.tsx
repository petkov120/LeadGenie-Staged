
import React from 'react';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-16 flex-shrink-0 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">{title}</h2>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="w-64 pl-4 pr-10 py-2 text-sm bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
          />
        </div>
        <ThemeToggle />
        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer">
          P
        </div>
      </div>
    </header>
  );
};

export default Header;
