import React, { useState, useRef, useEffect } from 'react';
import type { CampaignBlock, BlockType, TextBlock, ButtonBlock, ChoiceBlock, RatingBlock, InputBlock } from '../types';
import { 
    HeadingIcon, TextIcon, ImageIcon, ButtonIcon, DividerIcon, ShortTextIcon, 
    LongTextIcon, MultipleChoiceIcon, CampaignIcon, MoveIcon, TrashIcon,
    DesktopIcon, MobileIcon, AlignLeftIcon, AlignCenterIcon, AlignRightIcon, XIcon,
    PlusIcon, SearchIcon, PhoneIcon, AddressIcon, WebsiteIcon, DropdownIcon,
    CheckboxIcon, RatingIcon, DateIcon, NumberIcon, GridIcon
} from '../components/icons';

const initialBlocks: CampaignBlock[] = [
  {
    id: '1',
    type: 'heading',
    content: { text: 'Join Our Developer Network', level: 1, alignment: 'center', color: '#000000' }
  },
  {
    id: '2',
    type: 'text',
    content: { text: "We're building a global network of skilled developers who know how to use AI tools to work faster, smarter, and deliver top-quality results.", alignment: 'center', color: '#333333' }
  },
  {
    id: '3',
    type: 'email',
    content: { label: "What's your email address?", placeholder: 'name@example.com' }
  },
  {
    id: '4',
    type: 'button',
    content: { text: 'Join the waitlist', url: '#', alignment: 'center', backgroundColor: '#6C63FF', textColor: '#FFFFFF' }
  },
];

const LOCAL_STORAGE_KEY = 'leadGenieCampaignBlocks';

// FIX: Change `keyof JSX.IntrinsicElements` to `React.ElementType` to resolve namespace error.
const EditableText: React.FC<{ value: string; onUpdate: (newValue: string) => void; className?: string; tagName?: React.ElementType, style?: React.CSSProperties }> = ({ value, onUpdate, className, tagName = 'p', style }) => {
    const elRef = useRef<HTMLElement>(null);
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleBlur = () => {
        if (elRef.current && elRef.current.innerText !== value) {
            onUpdate(elRef.current.innerText);
        }
    };
    
    const handleInput = (e: React.FormEvent<HTMLElement>) => {
        setCurrentValue(e.currentTarget.innerText);
    }

    const Tag = tagName;

    return (
        <Tag
            ref={elRef as any}
            contentEditable
            suppressContentEditableWarning
            onBlur={handleBlur}
            onInput={handleInput}
            className={`outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm ${className}`}
            dangerouslySetInnerHTML={{ __html: currentValue }}
            style={style}
        />
    );
};

const getBlockComponent = (block: CampaignBlock, onUpdate: (id: string, newContent: any) => void) => {
    const handleUpdate = (newContent: any) => onUpdate(block.id, newContent);
    const textStyle = (block.type === 'heading' || block.type === 'text') ? { textAlign: block.content.alignment, color: block.content.color } : {};

    switch(block.type) {
        case 'heading':
            return <EditableText
                tagName={`h${block.content.level || 1}` as 'h1' | 'h2' | 'h3'}
                value={block.content.text}
                onUpdate={(text) => handleUpdate({ ...block.content, text })}
                className={`font-bold ${block.content.level === 1 ? 'text-4xl' : 'text-2xl'}`}
                style={textStyle}
            />;
        case 'text':
            return <EditableText value={block.content.text} onUpdate={(text) => handleUpdate({ ...block.content, text })} className="text-base" style={textStyle} />;
        case 'image':
            return <img src={block.content.src} alt={block.content.alt} className="w-full h-auto object-cover rounded-lg" />;
        case 'button':
            return <div className="py-2" style={{ textAlign: block.content.alignment }}>
                <EditableText
                    tagName="button"
                    value={block.content.text}
                    onUpdate={(text) => handleUpdate({ ...block.content, text })}
                    className="font-semibold py-3 px-8 rounded-lg"
                    style={{ backgroundColor: block.content.backgroundColor, color: block.content.textColor }}
                />
            </div>
        case 'divider':
            return <hr className="border-t border-light-border dark:border-dark-border my-4" />;
        case 'email':
        case 'short_text':
        case 'long_text':
        case 'phone_number':
        case 'address':
        case 'website':
        case 'number':
        case 'date':
             const inputType = {
                'email': 'email', 'website': 'url', 'number': 'number', 'date': 'date', 'phone_number': 'tel'
            }[block.type] || 'text';
            return <div className="py-2">
                <EditableText tagName="label" value={block.content.label} onUpdate={(label) => handleUpdate({ ...block.content, label })} className="font-medium text-sm mb-1 block" />
                <input type={inputType} placeholder={block.content.placeholder} className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg p-3 text-sm" />
            </div>
        case 'multiple_choice':
             return <div className="py-2">
                <EditableText tagName="label" value={block.content.label} onUpdate={(label) => handleUpdate({ ...block.content, label })} className="font-medium text-sm mb-2 block" />
                <div className="space-y-2">
                    {block.content.choices.map(choice => (
                        <div key={choice.id} className="flex items-center">
                            <input type="radio" name={block.id} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary" />
                            <label className="ml-2 text-sm">{choice.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        case 'checkbox':
             return <div className="py-2">
                <EditableText tagName="label" value={block.content.label} onUpdate={(label) => handleUpdate({ ...block.content, label })} className="font-medium text-sm mb-2 block" />
                <div className="space-y-2">
                    {block.content.choices.map(choice => (
                        <div key={choice.id} className="flex items-center">
                            <input type="checkbox" name={block.id} className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary" />
                            <label className="ml-2 text-sm">{choice.label}</label>
                        </div>
                    ))}
                </div>
            </div>
        case 'dropdown':
             return <div className="py-2">
                <EditableText tagName="label" value={block.content.label} onUpdate={(label) => handleUpdate({ ...block.content, label })} className="font-medium text-sm mb-2 block" />
                <select className="w-full bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg p-3 text-sm">
                    {block.content.choices.map(choice => (
                        <option key={choice.id}>{choice.label}</option>
                    ))}
                </select>
            </div>
        case 'rating':
            return <div className="py-2">
                 <EditableText tagName="label" value={block.content.label} onUpdate={(label) => handleUpdate({ ...block.content, label })} className="font-medium text-sm mb-2 block" />
                 <div className="flex gap-1 text-yellow-400">
                    {Array.from({ length: block.content.steps }).map((_, i) => (
                        <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    ))}
                 </div>
            </div>
        default:
            return <div className="p-4 bg-red-100 text-red-700 rounded-lg">Unknown block type</div>;
    }
}

const TOOLBOX_ITEMS: { type: BlockType, label: string, icon: React.ReactNode }[] = [
    { type: 'heading', label: 'Heading', icon: <HeadingIcon /> },
    { type: 'text', label: 'Text', icon: <TextIcon /> },
    { type: 'image', label: 'Image', icon: <ImageIcon /> },
    { type: 'button', label: 'Button', icon: <ButtonIcon /> },
    { type: 'divider', label: 'Divider', icon: <DividerIcon /> },
    { type: 'email', label: 'Email Field', icon: <CampaignIcon /> },
];

const MORE_BLOCKS = [
    {
        category: 'Contact info',
        items: [
            { type: 'email', label: 'Email', icon: <CampaignIcon />},
            { type: 'phone_number', label: 'Phone Number', icon: <PhoneIcon />},
            { type: 'address', label: 'Address', icon: <AddressIcon />},
            { type: 'website', label: 'Website', icon: <WebsiteIcon />},
        ]
    },
    {
        category: 'Choice',
        items: [
            { type: 'multiple_choice', label: 'Multiple Choice', icon: <MultipleChoiceIcon />},
            { type: 'dropdown', label: 'Dropdown', icon: <DropdownIcon />},
            { type: 'checkbox', label: 'Checkbox', icon: <CheckboxIcon />},
        ]
    },
    {
        category: 'Rating & ranking',
        items: [
           { type: 'rating', label: 'Rating', icon: <RatingIcon />},
        ]
    },
     {
        category: 'Other',
        items: [
           { type: 'number', label: 'Number', icon: <NumberIcon />},
           { type: 'date', label: 'Date', icon: <DateIcon />},
        ]
    }
];

const InspectorPanel: React.FC<{ block: CampaignBlock | null; onUpdate: (id: string, newContent: any) => void; onDelete: (id: string) => void }> = ({ block, onUpdate, onDelete }) => {
    if (!block) {
        return <div className="p-4 text-sm text-light-subtle dark:text-dark-subtle">Select a block to edit its properties.</div>;
    }

    const handleContentChange = (field: string, value: any) => {
        onUpdate(block.id, { ...block.content, [field]: value });
    }
    
    const handleChoiceChange = (choiceId: string, newLabel: string) => {
        const choiceBlock = block as ChoiceBlock;
        const newChoices = choiceBlock.content.choices.map(c => c.id === choiceId ? {...c, label: newLabel} : c);
        handleContentChange('choices', newChoices);
    }
    
    const addChoice = () => {
        const choiceBlock = block as ChoiceBlock;
        const newChoices = [...choiceBlock.content.choices, {id: new Date().getTime().toString(), label: `New Choice`}];
        handleContentChange('choices', newChoices);
    }

    const renderControls = () => {
        switch(block.type) {
            case 'heading':
            case 'text':
                const textBlock = block as TextBlock;
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium">Alignment</label>
                            <div className="flex items-center gap-1 mt-1 p-1 bg-light-bg dark:bg-dark-bg rounded-lg">
                                {(['left', 'center', 'right'] as const).map(align => (
                                    <button key={align} onClick={() => handleContentChange('alignment', align)} className={`w-full p-2 rounded-md ${textBlock.content.alignment === align ? 'bg-white dark:bg-dark-surface shadow-sm' : ''}`}>
                                        {align === 'left' && <AlignLeftIcon />}
                                        {align === 'center' && <AlignCenterIcon />}
                                        {align === 'right' && <AlignRightIcon />}
                                    </button>
                                ))}
                            </div>
                        </div>
                         <div>
                            <label className="text-xs font-medium">Color</label>
                            <input type="color" value={textBlock.content.color} onChange={(e) => handleContentChange('color', e.target.value)} className="w-full h-8 mt-1 p-0 border-none rounded-md cursor-pointer bg-transparent" />
                        </div>
                    </div>
                )
            case 'button':
                const buttonBlock = block as ButtonBlock;
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-medium">Button Link (URL)</label>
                            <input type="url" value={buttonBlock.content.url} onChange={(e) => handleContentChange('url', e.target.value)} className="mt-1 w-full input-field" />
                        </div>
                        <div>
                            <label className="text-xs font-medium">Alignment</label>
                            <div className="flex items-center gap-1 mt-1 p-1 bg-light-bg dark:bg-dark-bg rounded-lg">
                                {(['left', 'center', 'right'] as const).map(align => (
                                    <button key={align} onClick={() => handleContentChange('alignment', align)} className={`w-full p-2 rounded-md ${buttonBlock.content.alignment === align ? 'bg-white dark:bg-dark-surface shadow-sm' : ''}`}>
                                        {align === 'left' && <AlignLeftIcon />}
                                        {align === 'center' && <AlignCenterIcon />}
                                        {align === 'right' && <AlignRightIcon />}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                             <div>
                                <label className="text-xs font-medium">Background</label>
                                <input type="color" value={buttonBlock.content.backgroundColor} onChange={(e) => handleContentChange('backgroundColor', e.target.value)} className="w-full h-8 mt-1 p-0 border-none rounded-md cursor-pointer bg-transparent" />
                            </div>
                             <div>
                                <label className="text-xs font-medium">Text Color</label>
                                <input type="color" value={buttonBlock.content.textColor} onChange={(e) => handleContentChange('textColor', e.target.value)} className="w-full h-8 mt-1 p-0 border-none rounded-md cursor-pointer bg-transparent" />
                            </div>
                        </div>
                    </div>
                )
            case 'image':
                return (
                     <div>
                        <label className="text-xs font-medium">Alt Text</label>
                        <input type="text" value={block.content.alt} onChange={(e) => handleContentChange('alt', e.target.value)} className="mt-1 w-full input-field" />
                    </div>
                )
            case 'multiple_choice':
            case 'dropdown':
            case 'checkbox':
                const choiceBlock = block as ChoiceBlock;
                return (
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Choices</label>
                        {choiceBlock.content.choices.map(choice => (
                             <input key={choice.id} type="text" value={choice.label} onChange={(e) => handleChoiceChange(choice.id, e.target.value)} className="w-full input-field text-sm" />
                        ))}
                        <button onClick={addChoice} className="text-sm text-primary font-medium">+ Add choice</button>
                    </div>
                )
            case 'rating':
                 const ratingBlock = block as RatingBlock;
                 return (
                    <div>
                        <label className="text-xs font-medium">Steps</label>
                         <div className="flex items-center gap-1 mt-1 p-1 bg-light-bg dark:bg-dark-bg rounded-lg">
                            <button onClick={() => handleContentChange('steps', 5)} className={`w-full p-2 rounded-md ${ratingBlock.content.steps === 5 ? 'bg-white dark:bg-dark-surface shadow-sm' : ''}`}>5</button>
                            <button onClick={() => handleContentChange('steps', 10)} className={`w-full p-2 rounded-md ${ratingBlock.content.steps === 10 ? 'bg-white dark:bg-dark-surface shadow-sm' : ''}`}>10</button>
                        </div>
                    </div>
                 )
            default:
                return <p className="text-xs text-light-subtle dark:text-dark-subtle">No specific properties to edit for this block.</p>;
        }
    }
    
    return (
        <div className="flex flex-col h-full">
            <div className="p-4 border-b border-light-border dark:border-dark-border">
                <h3 className="font-semibold capitalize">{block.type.replace(/_/g, ' ')}</h3>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {renderControls()}
            </div>
            <div className="p-4 border-t border-light-border dark:border-dark-border">
                 <button onClick={() => onDelete(block.id)} className="w-full bg-red-500/10 text-red-600 font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
                     <TrashIcon /> Delete Block
                 </button>
            </div>
        </div>
    );
};

const MoreBlocksModal: React.FC<{ onClose: () => void; onAddBlock: (type: BlockType) => void; }> = ({ onClose, onAddBlock }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBlocks = MORE_BLOCKS.map(category => ({
        ...category,
        items: category.items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase()))
    })).filter(category => category.items.length > 0);

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-light-surface dark:bg-dark-surface rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                <header className="p-4 border-b border-light-border dark:border-dark-border flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-light-text dark:text-dark-text">Add form elements</h3>
                        {/* Other tabs can be added here */}
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-light-bg dark:hover:bg-dark-bg">
                        <XIcon />
                    </button>
                </header>
                <div className="p-4 border-b border-light-border dark:border-dark-border flex-shrink-0">
                    <div className="relative">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-light-subtle dark:text-dark-subtle" />
                        <input 
                            type="search" 
                            placeholder="Search form elements" 
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg pl-10 pr-4 py-2"
                        />
                    </div>
                </div>
                <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                    {filteredBlocks.map(category => (
                        <div key={category.category}>
                            <h4 className="font-semibold text-sm mb-3">{category.category}</h4>
                            <div className="space-y-2">
                                {category.items.map(item => (
                                    <button 
                                        key={item.type} 
                                        onClick={() => { onAddBlock(item.type); onClose(); }}
                                        className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg text-left transition-colors"
                                    >
                                        <span className="text-primary">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const CampaignBuilder: React.FC = () => {
    const [blocks, setBlocks] = useState<CampaignBlock[]>(() => {
        try {
            const savedBlocks = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedBlocks ? JSON.parse(savedBlocks) : initialBlocks;
        } catch (error) {
            console.error("Failed to parse blocks from localStorage", error);
            return initialBlocks;
        }
    });
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [view, setView] = useState<'desktop' | 'mobile'>('desktop');
    const [isMoreBlocksModalOpen, setIsMoreBlocksModalOpen] = useState(false);
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    useEffect(() => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(blocks));
        } catch (error) {
            console.error("Failed to save blocks to localStorage", error);
        }
    }, [blocks]);

    const updateBlockContent = (id: string, newContent: any) => {
        setBlocks(blocks.map(b => b.id === id ? {...b, content: newContent} : b));
    };
    
    const deleteBlock = (id: string) => {
        setBlocks(blocks.filter(b => b.id !== id));
        if (selectedBlockId === id) {
            setSelectedBlockId(null);
        }
    };
    
    const handleSort = () => {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const newBlocks = [...blocks];
        const [reorderedItem] = newBlocks.splice(dragItem.current, 1);
        newBlocks.splice(dragOverItem.current, 0, reorderedItem);
        dragItem.current = null;
        dragOverItem.current = null;
        setBlocks(newBlocks);
    };

    const addBlock = (type: BlockType) => {
        const newBlock: CampaignBlock = {
            id: new Date().getTime().toString(),
            type,
            content: {}
        } as CampaignBlock;

        switch(type) {
            case 'heading': newBlock.content = { text: 'New Heading', level: 2, alignment: 'left', color: '#000000' }; break;
            case 'text': newBlock.content = { text: 'This is a new paragraph. Click to edit.', alignment: 'left', color: '#333333' }; break;
            case 'image': newBlock.content = { src: 'https://picsum.photos/600/300', alt: 'Placeholder' }; break;
            case 'button': newBlock.content = { text: 'Click Me', url: '#', alignment: 'center', backgroundColor: '#6C63FF', textColor: '#FFFFFF' }; break;
            case 'divider': newBlock.content = {}; break;
            case 'email': newBlock.content = { label: 'Email', placeholder: 'Enter your email' }; break;
            case 'short_text': newBlock.content = { label: 'Short Text', placeholder: 'Your answer' }; break;
            case 'phone_number': newBlock.content = { label: 'Phone Number', placeholder: '(555) 123-4567' }; break;
            case 'address': newBlock.content = { label: 'Address', placeholder: '123 Main St, Anytown, USA' }; break;
            case 'website': newBlock.content = { label: 'Website', placeholder: 'https://example.com' }; break;
            case 'multiple_choice':
            case 'dropdown':
            case 'checkbox':
                 newBlock.content = { label: 'Question Label', choices: [{id: '1', label: 'Option 1'}, {id: '2', label: 'Option 2'}] }; break;
            case 'rating': newBlock.content = { label: 'Rate your experience', steps: 5 }; break;
            case 'date': newBlock.content = { label: 'Select a date' }; break;
            case 'number': newBlock.content = { label: 'Enter a number', placeholder: '0' }; break;
        }

        setBlocks([...blocks, newBlock]);
        setSelectedBlockId(newBlock.id);
    }

    return (
        <div className="flex h-full -m-8">
            <style>{`.input-field { background-color: transparent; border: 1px solid; border-radius: 0.5rem; padding: 0.5rem 0.75rem; } .dark .input-field { border-color: #30363D; } .light .input-field { border-color: #E5E7EB; } .input-field:focus { outline: 2px solid #6C63FF; border-color: transparent; }`}</style>
            
            {isMoreBlocksModalOpen && <MoreBlocksModal onClose={() => setIsMoreBlocksModalOpen(false)} onAddBlock={addBlock} />}
            
            {/* Left Sidebar: Toolbox */}
            <aside className="w-72 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border flex flex-col">
                <div className="p-4 border-b border-light-border dark:border-dark-border">
                    <h3 className="font-semibold">Toolbox</h3>
                </div>
                <div className="flex-1 p-4 space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        {TOOLBOX_ITEMS.map(item => (
                             <button key={item.type} onClick={() => addBlock(item.type)} className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border transition-colors text-center">
                                <span className="text-light-subtle dark:text-dark-subtle">{item.icon}</span>
                                <span className="font-medium text-xs">{item.label}</span>
                            </button>
                        ))}
                    </div>
                     <button onClick={() => setIsMoreBlocksModalOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border transition-colors">
                        <PlusIcon />
                        <span className="font-medium text-sm">More blocks</span>
                     </button>
                </div>
            </aside>

            {/* Main Canvas */}
            <main className="flex-1 flex flex-col items-center p-8 bg-light-bg dark:bg-dark-bg overflow-y-auto">
                 <div className="flex items-center gap-2 mb-4 p-1 bg-light-surface dark:bg-dark-surface rounded-lg shadow-sm">
                     <button onClick={() => setView('desktop')} className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${view === 'desktop' ? 'bg-primary text-white' : 'text-light-subtle dark:text-dark-subtle'}`}>
                         <DesktopIcon /> Desktop
                     </button>
                      <button onClick={() => setView('mobile')} className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 ${view === 'mobile' ? 'bg-primary text-white' : 'text-light-subtle dark:text-dark-subtle'}`}>
                         <MobileIcon /> Mobile
                     </button>
                </div>

                <div className={`bg-white dark:bg-dark-surface shadow-lg rounded-lg transition-all duration-300 ${view === 'desktop' ? 'w-full max-w-3xl' : 'w-full max-w-sm'}`}>
                    <div className="p-8 md:p-12 space-y-4">
                        {blocks.map((block, index) => (
                             <div
                                key={block.id}
                                draggable
                                onClick={() => setSelectedBlockId(block.id)}
                                onDragStart={() => dragItem.current = index}
                                onDragEnter={() => dragOverItem.current = index}
                                onDragEnd={handleSort}
                                onDragOver={(e) => e.preventDefault()}
                                className={`relative group p-2 rounded-lg border-2 ${selectedBlockId === block.id ? 'border-primary' : 'border-transparent hover:border-primary/20'}`}
                            >
                                <div className="absolute -left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                                    <MoveIcon />
                                </div>
                                {getBlockComponent(block, updateBlockContent)}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Sidebar: Inspector */}
            <aside className="w-80 bg-light-surface dark:bg-dark-surface border-l border-light-border dark:border-dark-border">
                <InspectorPanel block={blocks.find(b => b.id === selectedBlockId) || null} onUpdate={updateBlockContent} onDelete={deleteBlock} />
            </aside>
        </div>
    );
};

export default CampaignBuilder;