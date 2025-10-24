import React, { useState, useRef } from 'react';
import type { AutomationCategory, AutomationCategoryType, AutomationNode, Connection } from '../types';
import EmptyState from '../components/EmptyState';
import { 
    PlusIcon, BehavioralIcon, DripIcon, TransactionalIcon, CustomLogicIcon, ReEngagementIcon, 
    TrashIcon, SplitIcon, PlayIcon
} from '../components/icons';

const AUTOMATION_CATEGORIES: AutomationCategoryType[] = [
    { id: 'behavioral', name: 'Behavioral Automation', description: 'Based on user behavior', icon: <BehavioralIcon />, actions: [ {type: 'trigger:link_click', label: 'Trigger: Link Click'}, {type: 'action:add_tag', label: 'Action: Add Tag'}, {type: 'condition:if_else', label: 'Condition: If/Else'} ] },
    { id: 'drip', name: 'Drip / Sequence', description: 'Scheduled series of emails', icon: <DripIcon />, actions: [ {type: 'trigger:on_subscribe', label: 'Trigger: On Subscribe'}, {type: 'action:send_email', label: 'Action: Send Email'}, {type: 'action:wait', label: 'Action: Wait'} ] },
    { id: 'transactional', name: 'Transactional Automation', description: 'System-triggered messages', icon: <TransactionalIcon />, actions: [ {type: 'trigger:api_event', label: 'Trigger: API Event'}, {type: 'action:send_confirmation', label: 'Action: Send Confirmation'} ] },
    { id: 'custom', name: 'Custom Logic', description: 'Webhooks or developer workflows', icon: <CustomLogicIcon />, actions: [ {type: 'action:post_webhook', label: 'Action: Post Webhook'} ] },
    { id: 'retention', name: 'Re-engagement', description: 'Win-back inactive users', icon: <ReEngagementIcon />, actions: [ {type: 'trigger:inactive_days', label: 'Trigger: Inactive'}, {type: 'action:send_winback', label: 'Action: Send Win-back'} ] },
];


const AutomationFlow: React.FC = () => {
    const [hasStarted, setHasStarted] = useState(false);
    const [nodes, setNodes] = useState<AutomationNode[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<AutomationCategory | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

    const canvasRef = useRef<HTMLDivElement>(null);
    const [drawingLine, setDrawingLine] = useState<{ x1: number, y1: number, x2: number, y2: number } | null>(null);
    const [sourceNode, setSourceNode] = useState<{nodeId: string, handle: string} | null>(null);
    
    const addNode = (type: string, label: string) => {
        const newNode: AutomationNode = {
            id: `node_${Date.now()}`,
            type: type as any,
            label,
            position: { x: 300, y: 150 + nodes.length * 80 },
            data: {},
        };
        setNodes([...nodes, newNode]);
    };

    const getNodeById = (id: string) => nodes.find(n => n.id === id);

    const handleStartConnection = (e: React.MouseEvent, nodeId: string, handle: string) => {
        e.stopPropagation();
        const node = getNodeById(nodeId);
        const canvasRect = canvasRef.current?.getBoundingClientRect();
        if (!node || !canvasRect) return;

        const x1 = node.position.x + (handle.includes('output') ? 180 : 0);
        const y1 = node.position.y + 20;
        
        setSourceNode({nodeId, handle});
        setDrawingLine({ x1, y1, x2: e.clientX - canvasRect.left, y2: e.clientY - canvasRect.top });
    };
    
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!drawingLine || !canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        setDrawingLine({ ...drawingLine, x2: e.clientX - canvasRect.left, y2: e.clientY - canvasRect.top });
    };

    const handleEndConnection = (e: React.MouseEvent, targetNodeId: string, targetHandle: string) => {
        e.stopPropagation();
        if(!sourceNode) return;
        
        const newConnection: Connection = {
            id: `conn_${Date.now()}`,
            sourceId: sourceNode.nodeId,
            targetId: targetNodeId,
            sourceHandle: sourceNode.handle,
            targetHandle: targetHandle
        };

        setConnections([...connections, newConnection]);
        setDrawingLine(null);
        setSourceNode(null);
    };

    if (!hasStarted) {
        return (
            <EmptyState
              illustration={
                <svg viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                    <rect x="30" y="50" width="40" height="40" rx="8" className="fill-current text-light-border dark:text-dark-border"/>
                    <rect x="130" y="50" width="40" height="40" rx="8" className="fill-current text-light-border dark:text-dark-border"/>
                    <path d="M70 70 L 130 70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="text-light-subtle dark:text-dark-subtle" />
                    <circle cx="100" cy="70" r="10" className="fill-current text-primary" />
                    <path d="M96 68 L 100 72 L 104 68" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
              title="Create Automated Flows"
              description="Automate your marketing and sales processes with visual workflows."
              actionButton={
                  <button onClick={() => setHasStarted(true)} className="bg-primary text-white font-medium py-2.5 px-5 rounded-lg flex items-center gap-2 hover:bg-primary-dark transition-colors">
                      <PlusIcon />
                      New Automation
                  </button>
              }
            />
          );
    }
    
    const selectedCategoryData = AUTOMATION_CATEGORIES.find(c => c.id === selectedCategory);
    
  return (
    <div className="flex h-full -m-8">
        {/* Left Sidebar: Toolbox */}
        <aside className="w-72 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border flex flex-col">
            <div className="p-4 border-b border-light-border dark:border-dark-border">
                <h3 className="font-semibold">Automation Types</h3>
            </div>
            <div className="flex-1 p-4 space-y-2">
                {AUTOMATION_CATEGORIES.map(cat => (
                    <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`w-full text-left p-3 rounded-lg flex items-start gap-3 transition-colors ${selectedCategory === cat.id ? 'bg-primary/10' : 'hover:bg-light-bg dark:hover:bg-dark-bg'}`}>
                        <span className="text-primary mt-0.5">{cat.icon}</span>
                        <div>
                            <h4 className="font-semibold text-sm">{cat.name}</h4>
                            <p className="text-xs text-light-subtle dark:text-dark-subtle">{cat.description}</p>
                        </div>
                    </button>
                ))}
            </div>
             <div className="p-4 border-t border-light-border dark:border-dark-border">
                <button className="w-full bg-primary/10 text-primary font-medium py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/20 transition-colors">
                     <PlayIcon /> Run Simulation
                 </button>
            </div>
        </aside>

        {/* Main Canvas */}
        <main ref={canvasRef} onMouseMove={handleMouseMove} onMouseUp={() => { setDrawingLine(null); setSourceNode(null); }} className="flex-1 bg-light-bg dark:bg-dark-bg overflow-hidden relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {connections.map(conn => {
                    const source = getNodeById(conn.sourceId);
                    const target = getNodeById(conn.targetId);
                    if(!source || !target) return null;
                    const x1 = source.position.x + 180;
                    const y1 = source.position.y + 20;
                    const x2 = target.position.x;
                    const y2 = target.position.y + 20;
                    return <path key={conn.id} d={`M ${x1} ${y1} C ${x1 + 50} ${y1}, ${x2 - 50} ${y2}, ${x2} ${y2}`} stroke="#9CA3AF" strokeWidth="2" fill="none" />;
                })}
                {drawingLine && <path d={`M ${drawingLine.x1} ${drawingLine.y1} L ${drawingLine.x2} ${drawingLine.y2}`} stroke="#6C63FF" strokeWidth="2" fill="none" />}
            </svg>
            
            {selectedCategoryData && (
                <div className="absolute top-4 left-4 bg-light-surface dark:bg-dark-surface rounded-lg shadow-lg p-4 w-60 z-10">
                    <h4 className="font-semibold text-sm mb-2">{selectedCategoryData.name}</h4>
                    <div className="space-y-1">
                        {selectedCategoryData.actions.map(action => (
                            <button key={action.type} onClick={() => addNode(action.type, action.label)} className="w-full text-left text-sm p-2 rounded hover:bg-light-bg dark:hover:bg-dark-bg">
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {nodes.map(node => (
                <div 
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`absolute bg-light-surface dark:bg-dark-surface w-48 rounded-lg shadow-md border-2 cursor-pointer ${selectedNodeId === node.id ? 'border-primary' : 'border-light-border dark:border-dark-border'}`}
                    style={{ left: node.position.x, top: node.position.y, zIndex: 1 }}
                >
                    <div className="p-3">
                        <p className="text-sm font-medium">{node.label}</p>
                    </div>
                    {/* Input Handle */}
                    <div 
                        onMouseUp={(e) => handleEndConnection(e, node.id, 'default-input')}
                        className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-light-subtle dark:bg-dark-subtle rounded-full border-2 border-light-surface dark:border-dark-surface" 
                    />
                    {/* Output Handle */}
                    <div 
                        onMouseDown={(e) => handleStartConnection(e, node.id, 'default-output')}
                        className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-light-subtle dark:bg-dark-subtle rounded-full border-2 border-light-surface dark:border-dark-surface"
                    />
                </div>
            ))}
        </main>

        {/* Right Sidebar: Inspector */}
        <aside className="w-80 bg-light-surface dark:bg-dark-surface border-l border-light-border dark:border-dark-border">
            <div className="p-4 border-b border-light-border dark:border-dark-border">
                <h3 className="font-semibold">Configuration</h3>
            </div>
            <div className="p-4">
                {selectedNodeId && nodes.find(n => n.id === selectedNodeId) ? (
                    <div>
                        <p className="text-sm font-medium">Editing: {nodes.find(n => n.id === selectedNodeId)?.label}</p>
                        {/* Configuration fields would go here */}
                    </div>
                ) : (
                    <p className="text-sm text-light-subtle dark:text-dark-subtle">Select a node to configure it.</p>
                )}
            </div>
        </aside>
    </div>
  );
};

export default AutomationFlow;