
import React from 'react';

interface EmptyStateProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  actionButton: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ illustration, title, description, actionButton }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 h-full">
        <div className="max-w-xs text-light-subtle dark:text-dark-subtle">
            {illustration}
        </div>
        <h3 className="mt-6 text-lg font-semibold text-light-text dark:text-dark-text">{title}</h3>
        <p className="mt-2 text-sm text-light-subtle dark:text-dark-subtle max-w-sm">
            {description}
        </p>
        <div className="mt-6">
            {actionButton}
        </div>
    </div>
  );
};

export default EmptyState;
