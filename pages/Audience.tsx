
import React, { useState } from 'react';
import type { Lead } from '../types';
import { MOCK_LEADS } from '../constants';
import { PlusIcon } from '../components/icons';

const Audience: React.FC = () => {
    const [leads] = useState<Lead[]>(MOCK_LEADS);

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Audience</h2>
                <p className="text-light-subtle dark:text-dark-subtle">Manage your contacts and leads.</p>
            </div>
            <div className="flex items-center gap-4">
                 <button className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border font-medium py-2.5 px-5 rounded-lg">
                    Filters
                </button>
                <button className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                    <PlusIcon />
                    Add Lead
                </button>
            </div>
        </div>

        <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-soft overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-light-subtle dark:text-dark-subtle uppercase bg-light-bg dark:bg-dark-bg">
                    <tr>
                        <th scope="col" className="p-4">
                            <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </th>
                        <th scope="col" className="py-3 px-6">Email</th>
                        <th scope="col" className="py-3 px-6">Name</th>
                        <th scope="col" className="py-3 px-6">Status</th>
                        <th scope="col" className="py-3 px-6">Tags</th>
                        <th scope="col" className="py-3 px-6">Date Added</th>
                        <th scope="col" className="py-3 px-6"></th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map(lead => (
                        <tr key={lead.id} className="border-b border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg">
                            <td className="w-4 p-4">
                                <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            </td>
                            <td className="py-4 px-6 font-medium text-light-text dark:text-dark-text">{lead.email}</td>
                            <td className="py-4 px-6">{lead.name}</td>
                            <td className="py-4 px-6">
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                    lead.status === 'Subscribed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    lead.status === 'Unsubscribed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}>
                                    {lead.status}
                                </span>
                            </td>
                            <td className="py-4 px-6 flex items-center gap-1.5">
                                {lead.tags.map(tag => (
                                    <span key={tag} className="px-2 py-0.5 text-xs font-medium rounded-full bg-light-border dark:bg-dark-border">
                                        {tag}
                                    </span>
                                ))}
                            </td>
                            <td className="py-4 px-6">{lead.dateAdded}</td>
                             <td className="py-4 px-6 text-right">
                                <button className="text-primary font-medium text-sm">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Audience;
