
import React from 'react';
import type { Campaign, Lead, Template } from './types';
import { DashboardIcon, CampaignIcon, AutomationIcon, AudienceIcon, TemplateIcon } from './components/icons';

export const NAV_LINKS = [
  { id: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
  { id: 'campaigns', name: 'Campaigns', icon: <CampaignIcon /> },
  { id: 'automations', name: 'Automations', icon: <AutomationIcon /> },
  { id: 'audience', name: 'Audience', icon: <AudienceIcon /> },
  { id: 'templates', name: 'Templates', icon: <TemplateIcon /> },
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: '1', name: 'Q3 Developer Newsletter', status: 'Active', leads: 1256, completionRate: 88, lastEdited: '2 days ago' },
  { id: '2', name: 'New Feature Waitlist', status: 'Completed', leads: 840, completionRate: 92, lastEdited: '1 week ago' },
  { id: '3', name: 'React Conf Feedback', status: 'Draft', leads: 0, completionRate: 0, lastEdited: '3 hours ago' },
  { id: '4', name: 'SaaS Onboarding Flow', status: 'Active', leads: 234, completionRate: 76, lastEdited: '5 days ago' },
];

export const MOCK_LEADS: Lead[] = [
  { id: '1', email: 'hello@react.dev', name: 'React Team', status: 'Subscribed', tags: ['Developer', 'VIP'], dateAdded: '2023-10-26' },
  { id: '2', email: 'info@vuejs.org', name: 'Evan You', status: 'Subscribed', tags: ['Developer'], dateAdded: '2023-10-25' },
  { id: '3', email: 'team@svelte.dev', name: 'Rich Harris', status: 'Subscribed', tags: ['Developer', 'Early Adopter'], dateAdded: '2023-10-24' },
  { id: '4', email: 'angular@google.com', name: 'Angular Team', status: 'Unsubscribed', tags: [], dateAdded: '2023-10-22' },
  { id: '5', email: 'sales@tailwind.com', name: 'Adam Wathan', status: 'Subscribed', tags: ['Designer', 'Partner'], dateAdded: '2023-10-20' },
];

export const MOCK_TEMPLATES: Template[] = [
    { id: '1', title: 'Registration Form', category: 'Lead Gen', description: 'A simple form for user registration.', imageUrl: 'https://picsum.photos/seed/template1/400/300' },
    { id: '2', title: 'Contact Form', category: 'Lead Gen', description: 'Collect inquiries from your website visitors.', imageUrl: 'https://picsum.photos/seed/template2/400/300' },
    { id: '3', title: 'Feedback Survey', category: 'Feedback', description: 'Gather feedback about your product or service.', imageUrl: 'https://picsum.photos/seed/template3/400/300' },
    { id: '4', title: 'Job Application', category: 'HR', description: 'Streamline your hiring process.', imageUrl: 'https://picsum.photos/seed/template4/400/300' },
    { id: '5', title: 'Event RSVP', category: 'Events', description: 'Manage RSVPs for your next event.', imageUrl: 'https://picsum.photos/seed/template5/400/300' },
    { id: '6', title: 'Newsletter Signup', category: 'Lead Gen', description: 'Grow your mailing list with a simple signup form.', imageUrl: 'https://picsum.photos/seed/template6/400/300' },
];
