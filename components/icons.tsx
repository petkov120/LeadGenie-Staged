import React from 'react';

const Icon: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "h-5 w-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        {children}
    </svg>
);

export const DashboardIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zm10 0v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zM9 7V5a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2zm10 0V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2z" /></Icon>;
export const CampaignIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
export const AutomationIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>;
export const AudienceIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></Icon>;
export const TemplateIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></Icon>;
export const SunIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></Icon>;
export const MoonIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></Icon>;
export const LogoIcon: React.FC = () => <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.61 5.34c.39.39.39 1.02 0 1.41L11.5 12.87c-.39.39-1.02.39-1.41 0l-2.47-2.47c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0l1.77 1.77 3.4-3.4c.39-.39 1.02-.39 1.41 0z"/></svg>;
export const PlusIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></Icon>;
export const HeadingIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" /><path d="M7 6V4h10v2M7 18v2h10v-2" /></Icon>;
export const TextIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></Icon>;
export const ImageIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>;
export const ButtonIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15 5H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2z" /></Icon>;
export const DividerIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" /></Icon>;
export const ShortTextIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 9h16v1H4z" /></Icon>;
export const LongTextIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h10" /></Icon>;
export const MultipleChoiceIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
export const MoveIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></Icon>;
export const TrashIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></Icon>;
export const DesktopIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></Icon>;
export const MobileIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></Icon>;
export const AlignLeftIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h10M4 14h16M4 18h10" /></Icon>;
export const AlignCenterIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M7 10h10M4 14h16M7 18h10" /></Icon>;
export const AlignRightIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M10 10h10M4 14h16M10 18h10" /></Icon>;
export const XIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>;
export const SearchIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></Icon>;
export const PhoneIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></Icon>;
export const AddressIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></Icon>;
export const WebsiteIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9M3 12a9 9 0 019-9m-9 9a9 9 0 009 9m-9-9h18" /></Icon>;
export const DropdownIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></Icon>;
export const CheckboxIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></Icon>;
export const RatingIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></Icon>;
export const DateIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>;
export const NumberIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M4 9h16M4 15h16" /></Icon>;
export const GridIcon: React.FC = () => <Icon className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></Icon>;

// Automation Icons
export const BehavioralIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></Icon>;
export const DripIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
export const TransactionalIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></Icon>;
export const CustomLogicIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></Icon>;
export const ReEngagementIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M4 4l16 16" /></Icon>;
export const SplitIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l-7-7 7-7m5 14l7-7-7-7" /></Icon>;
export const PlayIcon: React.FC = () => <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></Icon>;
