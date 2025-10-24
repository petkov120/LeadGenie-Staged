import React from 'react';
import type { Page } from '../types';
import { NAV_LINKS } from '../constants';
import { LogoIcon } from './icons';

interface SidebarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {
  return (
    <aside className="w-64 flex-shrink-0 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-light-border dark:border-dark-border">
        <LogoIcon />
        <h1 className="text-xl font-bold ml-2 text-light-text dark:text-dark-text tracking-tight">LeadGenie</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={(e) => {
              e.preventDefault();
              setPage(link.id as Page);
            }}
            className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
              currentPage === link.id
                ? 'bg-primary text-white'
                : 'text-light-subtle dark:text-dark-subtle hover:bg-light-bg dark:hover:bg-dark-bg'
            }`}
          >
            <span className="mr-3">{link.icon}</span>
            {link.name}
          </a>
        ))}
      </nav>
       <div className="px-6 py-4 border-t border-light-border dark:border-dark-border">
            <div className="p-4 rounded-lg bg-light-bg dark:bg-dark-bg text-center">
                <h3 className="font-semibold text-sm text-light-text dark:text-dark-text">Upgrade your Plan</h3>
                <p className="text-xs text-light-subtle dark:text-dark-subtle mt-1 mb-3">Unlock powerful new features and remove limits.</p>
                <button className="w-full bg-primary text-white text-sm font-medium py-2 rounded-lg hover:bg-primary-dark transition-colors">Upgrade</button>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;