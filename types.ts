import React from 'react';

// App-wide types
export type Page = 'dashboard' | 'campaigns' | 'automations' | 'audience' | 'templates';
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

// Data model types
export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Draft';
  leads: number;
  completionRate: number;
  lastEdited: string;
}

export interface Lead {
  id: string;
  email: string;
  name: string;
  status: 'Subscribed' | 'Unsubscribed';
  tags: string[];
  dateAdded: string;
}

export interface Template {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
}

// Campaign Builder types
export type BlockType =
  | 'heading'
  | 'text'
  | 'image'
  | 'button'
  | 'divider'
  | 'email'
  | 'short_text'
  | 'long_text'
  | 'phone_number'
  | 'address'
  | 'website'
  | 'number'
  | 'date'
  | 'multiple_choice'
  | 'checkbox'
  | 'dropdown'
  | 'rating';

export type Alignment = 'left' | 'center' | 'right';

interface BaseBlock {
  id: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  content: {
    text: string;
    level: 1 | 2 | 3;
    alignment: Alignment;
    color: string;
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: {
    text: string;
    alignment: Alignment;
    color: string;
  };
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
  };
}

export interface ButtonBlock extends BaseBlock {
  type: 'button';
  content: {
    text: string;
    url: string;
    alignment: Alignment;
    backgroundColor: string;
    textColor: string;
  };
}

export interface DividerBlock extends BaseBlock {
    type: 'divider';
    content: {};
}

export interface InputBlock extends BaseBlock {
    type: 'email' | 'short_text' | 'long_text' | 'phone_number' | 'address' | 'website' | 'number' | 'date';
    content: {
        label: string;
        placeholder?: string;
    }
}

export interface Choice {
    id: string;
    label: string;
}

export interface ChoiceBlock extends BaseBlock {
    type: 'multiple_choice' | 'checkbox' | 'dropdown';
    content: {
        label: string;
        choices: Choice[];
    }
}

export interface RatingBlock extends BaseBlock {
    type: 'rating';
    content: {
        label: string;
        steps: 5 | 10;
    }
}


export type CampaignBlock = HeadingBlock | TextBlock | ImageBlock | ButtonBlock | DividerBlock | InputBlock | ChoiceBlock | RatingBlock;


// AI Form Generation types
export interface WelcomeScreenBlock {
    id: string;
    type: 'welcome_screen';
    content: {
        title: string;
        description: string;
        buttonText: string;
    };
}

export interface ShortTextBlock {
    id: string;
    type: 'short_text';
    content: {
        title: string;
    };
}

export interface EmailBlock {
    id: string;
    type: 'email';
    content: {
        title: string;
    };
}

export interface EndScreenBlock {
    id: string;
    type: 'end_screen';
    content: {
        title: string;
        description: string;
    };
}

export type FormBlock = WelcomeScreenBlock | ShortTextBlock | EmailBlock | EndScreenBlock;

// Automation Flow Types
export type AutomationCategory = 'behavioral' | 'drip' | 'transactional' | 'custom' | 'retention';

export interface AutomationCategoryType {
    id: AutomationCategory;
    name: string;
    description: string;
    icon: React.ReactNode;
    actions: { type: AutomationNodeType; label: string }[];
}

export type AutomationNodeType = 
  | 'trigger:link_click' 
  | 'trigger:email_open'
  | 'trigger:on_subscribe'
  | 'trigger:api_event'
  | 'trigger:inactive_days'
  | 'action:send_email' 
  | 'action:add_tag' 
  | 'action:wait'
  | 'action:send_confirmation'
  | 'action:send_invoice'
  | 'action:post_webhook'
  | 'action:send_winback'
  | 'condition:if_else';

interface BaseAutomationNode {
    id: string;
    type: AutomationNodeType;
    label: string;
    position: { x: number, y: number };
}

export interface WaitNode extends BaseAutomationNode {
    type: 'action:wait';
    data: {
        duration: number;
        unit: 'days' | 'hours' | 'minutes';
    };
}

export interface AddTagNode extends BaseAutomationNode {
    type: 'action:add_tag';
    data: {
        tagName: string;
    };
}

export interface SendEmailNode extends BaseAutomationNode {
    type: 'action:send_email' | 'action:send_confirmation' | 'action:send_winback';
    data: {
        templateId: string;
    }
}

export interface GenericNode extends BaseAutomationNode {
    type: Exclude<AutomationNodeType, 'action:wait' | 'action:add_tag' | 'action:send_email' | 'action:send_confirmation' | 'action:send_winback'>;
    data: Record<string, any>;
}

export type AutomationNode = WaitNode | AddTagNode | SendEmailNode | GenericNode;


export interface Connection {
    id: string;
    sourceId: string;
    targetId: string;
    sourceHandle: string; // e.g., 'yes-output', 'no-output', 'default-output'
    targetHandle: string; // e.g., 'default-input'
}