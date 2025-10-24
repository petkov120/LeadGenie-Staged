
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import type { Campaign, Page } from '../types';
import { MOCK_CAMPAIGNS } from '../constants';
import { PlusIcon } from '../components/icons';
import EmptyState from '../components/EmptyState';

const data = [
  { name: 'Mon', leads: 400 },
  { name: 'Tue', leads: 300 },
  { name: 'Wed', leads: 600 },
  { name: 'Thu', leads: 450 },
  { name: 'Fri', leads: 700 },
  { name: 'Sat', leads: 600 },
  { name: 'Sun', leads: 900 },
];

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean }> = ({ title, value, change, isPositive }) => (
  <div className="bg-light-surface dark:bg-dark-surface p-5 rounded-2xl shadow-soft">
    <p className="text-sm text-light-subtle dark:text-dark-subtle">{title}</p>
    <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-1">{value}</p>
    <p className={`text-xs mt-1 font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
  </div>
);

const CampaignRow: React.FC<{ campaign: Campaign }> = ({ campaign }) => (
  <tr className="border-b border-light-border dark:border-dark-border">
    <td className="py-4 px-6 font-medium">{campaign.name}</td>
    <td className="py-4 px-6 text-light-subtle dark:text-dark-subtle">
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            campaign.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
            campaign.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
        }`}>
            {campaign.status}
        </span>
    </td>
    <td className="py-4 px-6 font-medium">{campaign.leads.toLocaleString()}</td>
    <td className="py-4 px-6 font-medium">{campaign.completionRate}%</td>
    <td className="py-4 px-6 text-light-subtle dark:text-dark-subtle">{campaign.lastEdited}</td>
    <td className="py-4 px-6 text-right"><button className="text-primary font-medium text-sm">View</button></td>
  </tr>
);


const Dashboard: React.FC<{ setPage: (page: Page) => void }> = ({ setPage }) => {

  const hasCampaigns = MOCK_CAMPAIGNS.length > 0;

  if (!hasCampaigns) {
    return (
      <EmptyState
        illustration={
          <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <rect x="20" y="50" width="160" height="80" rx="8" className="fill-current text-light-border dark:text-dark-border"/>
            <rect x="30" y="60" width="60" height="10" rx="2" className="fill-current text-light-bg dark:text-dark-bg"/>
            <rect x="30" y="80" width="140" height="4" rx="2" className="fill-current text-light-bg dark:text-dark-bg"/>
            <rect x="30" y="92" width="120" height="4" rx="2" className="fill-current text-light-bg dark:text-dark-bg"/>
            <path d="M100 10 C 120 10, 120 40, 140 40" stroke="currentColor" strokeWidth="2" className="text-light-subtle dark:text-dark-subtle" strokeLinecap="round"/>
            <circle cx="145" cy="42" r="4" className="fill-current text-primary"/>
          </svg>
        }
        title="Welcome to LeadGenie!"
        description="This is your dashboard. Once you create a campaign, you'll see your stats and recent activity here."
        actionButton={
            <button onClick={() => setPage('campaigns')} className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                <PlusIcon />
                Create First Campaign
            </button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Good morning!</h2>
          <p className="text-light-subtle dark:text-dark-subtle">Here's what's happening with your campaigns.</p>
        </div>
        <button onClick={() => setPage('campaigns')} className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
          <PlusIcon />
          New Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Leads" value="12,450" change="+12.5% this month" isPositive={true} />
        <StatCard title="Active Campaigns" value="6" change="-2 from last month" isPositive={false} />
        <StatCard title="Avg. Completion" value="82.4%" change="+3.2%" isPositive={true} />
        <StatCard title="New Subscribers" value="312" change="+5.1% this week" isPositive={true} />
      </div>

      <div className="bg-light-surface dark:bg-dark-surface p-6 rounded-2xl shadow-soft">
        <h3 className="text-lg font-semibold">Leads This Week</h3>
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#6C63FF" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
              <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backdropFilter: 'blur(5px)',
                }}
              />
              <Area type="monotone" dataKey="leads" stroke="#6C63FF" fillOpacity={1} fill="url(#colorLeads)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-light-surface dark:bg-dark-surface rounded-2xl shadow-soft overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold">Recent Campaigns</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-light-subtle dark:text-dark-subtle uppercase bg-light-bg dark:bg-dark-bg">
            <tr>
              <th scope="col" className="py-3 px-6">Name</th>
              <th scope="col" className="py-3 px-6">Status</th>
              <th scope="col" className="py-3 px-6">Leads</th>
              <th scope="col" className="py-3 px-6">Completion</th>
              <th scope="col" className="py-3 px-6">Last Edited</th>
              <th scope="col" className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_CAMPAIGNS.slice(0, 3).map(c => <CampaignRow key={c.id} campaign={c} />)}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
