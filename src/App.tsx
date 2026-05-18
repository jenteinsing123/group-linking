import React, { useState } from 'react';
import { 
  Check, 
  X, 
  ArrowLeft,
  Info,
  CheckCircle2,
  PencilLine,
  Users,
  Search,
  ChevronDown,
  ChevronRight,
  Plus,
  UserPlus,
  Send,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Network,
  Filter,
  Layers,
  Scissors,
  UserPlus2,
  PlusCircle,
  Clock,
  RefreshCw,
  Quote,
  Zap,
  Calendar,
  MessageSquare,
  Palette,
  Eye,
  Activity,
  BarChart,
  BarChart3,
  FileText,
  Bell,
  CircleDashed,
  AlertCircle,
  Lightbulb,
  Home,
  Settings,
  Link
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- MOCK DATA ---

const managersDB = [
  { id: 1, first: 'Sarah', last: 'Johnson', role: 'Engineering Manager', color: 'bg-pink-500' },
  { id: 2, first: 'Mark', last: 'Davis', role: 'Product Lead', color: 'bg-blue-500' },
  { id: 3, first: 'Laura', last: 'Baker', role: 'HR Director', color: 'bg-purple-500' },
];

const structureTypes = ['Organizational Structure', 'Geographical Structure', 'Functional Structure'];

const initialTreeData = [
  {
    id: '1',
    name: 'Global Corp',
    hasChildren: true,
    links: [{ id: 'l1', name: 'Global Corp', status: 'auto' }],
    children: [
      { 
        id: '1.1', 
        name: 'Engineering', 
        hasChildren: true, 
        links: [{ id: 'l2', name: 'Engineering', status: 'auto' }],
        children: [
          { id: '1.1.1', name: 'Product Engineering', links: [{ id: 'l3', name: 'Engineering', status: 'suggested' }] },
          { id: '1.1.2', name: 'Platform Engineering', links: [{ id: 'l4', name: 'Engineering', status: 'suggested' }] },
          { id: '1.1.3', name: 'Core Engineering', links: [{ id: 'l5', name: 'Core Engineering', status: 'approved' }] }
        ]
      },
      { 
        id: '1.2', 
        name: 'Customer Success', 
        hasChildren: true, 
        links: [],
        children: [
          { id: '1.2.1', name: 'Global Customer Success', links: [{ id: 'l6', name: 'Customer Success NA', status: 'suggested' }, { id: 'l7', name: 'Customer Success EMEA', status: 'suggested' }] }
        ]
      },
      { 
        id: '1.3', 
        name: 'Product & Design', 
        hasChildren: true, 
        links: [],
        children: [
          { id: '1.3.1', name: 'UX Design', links: [{ id: 'l8', name: 'UX Design', status: 'suggested' }] },
          { id: '1.3.2', name: 'Product Analytics', links: [{ id: 'l9', name: 'Product Analytics', status: 'auto' }] }
        ]
      },
      {
        id: '1.4',
        name: 'Operations',
        hasChildren: true,
        links: [],
        children: [
          { id: '1.4.1', name: 'Workplace Experience', links: [{ id: 'l10', name: 'Workplace Services', status: 'suggested' }] },
          { id: '1.4.2', name: 'Security Operations', links: [{ id: 'l11', name: 'IT Security', status: 'approved' }] }
        ]
      },
      {
        id: '1.5',
        name: 'Research & Development',
        hasChildren: true,
        links: [],
        children: [
           { id: '1.5.1', name: 'AI Research Labs', links: [] }
        ]
      },
      {
        id: '1.6',
        name: 'Marketing',
        size: 42,
        hasChildren: true,
        links: [],
        children: [
          { id: '1.6.1', name: 'Product Marketing', size: 22, links: [] },
          { id: '1.6.2', name: 'Brand & Growth', size: 20, links: [] }
        ]
      }
    ]
  }
];

const geoTreeData = [
  {
    id: 'geo-1',
    name: 'Global Operations',
    links: [{ id: 'gl-0', name: 'Global Corp', status: 'auto' }],
    children: [
      {
        id: 'geo-1.1',
        name: 'North America',
        links: [{ id: 'gl-na', name: 'Sales North America', status: 'auto' }],
        children: [
          { id: 'geo-1.1.1', name: 'NA Engineering', links: [{ id: 'gl1', name: 'Engineering', status: 'auto' }] },
          { id: 'geo-1.1.2', name: 'NA Sales', links: [{ id: 'gl2', name: 'Sales North America', status: 'suggested' }] },
          { id: 'geo-1.1.3', name: 'NA Customer Success', links: [{ id: 'gl-cs-1', name: 'Customer Success NA', status: 'suggested' }] }
        ]
      },
      {
        id: 'geo-1.2',
        name: 'EMEA',
        links: [],
        children: [
          { id: 'geo-1.2.1', name: 'EMEA Customer Success', links: [{ id: 'gl3', name: 'Customer Success EMEA', status: 'suggested' }] },
          { id: 'geo-1.2.2', name: 'EMEA Engineering', links: [{ id: 'gl-de-1', name: 'Core Engineering', status: 'auto' }] },
          { id: 'geo-1.2.3', name: 'EMEA Design', links: [{ id: 'gl-fr-1', name: 'UX Design', status: 'suggested' }] }
        ]
      },
      {
        id: 'geo-1.3',
        name: 'APAC',
        links: [{ id: 'gl-apac', name: 'Product Engineering', status: 'auto' }],
        children: [
          { id: 'geo-1.3.1', name: 'APAC Sales', links: [{ id: 'gl-sg-1', name: 'Sales North America', status: 'auto' }] },
          { id: 'geo-1.3.2', name: 'APAC Analytics', links: [{ id: 'gl-au-1', name: 'Product Analytics', status: 'auto' }] }
        ]
      }
    ]
  }
];

const functionalTreeData = [
  {
    id: 'fun-1',
    name: 'Business Functions',
    children: [
      {
        id: 'fun-1.1',
        name: 'Product Excellence',
        children: [
          { id: 'fun-1.1.1', name: 'Core Product', links: [{ id: 'fl1', name: 'Product Engineering', status: 'approved' }] },
          { id: 'fun-1.1.2', name: 'Experience Design', links: [{ id: 'fl2', name: 'UX Design', status: 'approved' }] },
          { id: 'fun-1.1.3', name: 'Platform Innovation', links: [{ id: 'fl-pi-1', name: 'Platform Engineering', status: 'suggested' }] }
        ]
      },
      {
        id: 'fun-1.2',
        name: 'Revenue & Growth',
        children: [
          { id: 'fun-1.2.1', name: 'Global Sales', links: [{ id: 'fl3', name: 'Sales North America', status: 'suggested' }] },
          { 
            id: 'fun-1.2.2', 
            name: 'Marketing', 
            size: 42,
            hasChildren: true,
            children: [
              { id: 'fun-1.2.2.1', name: 'Product Marketing', size: 22, links: [{ id: 'fl4', name: 'Marketing Global', status: 'suggested' }] },
              { id: 'fun-1.2.2.2', name: 'Brand & Growth', size: 20, links: [{ id: 'fl6', name: 'Marketing Global', status: 'suggested' }] }
            ]
          }
        ]
      },
      {
        id: 'fun-1.3',
        name: 'Enablement',
        children: [
          { id: 'fun-1.3.1', name: 'Legal & Risk', links: [{ id: 'fl-l-1', name: 'Global Corp', status: 'auto' }] },
          { id: 'fun-1.3.2', name: 'People & Culture', links: [{ id: 'fl5', name: 'Workplace Services', status: 'suggested' }] }
        ]
      },
      {
        id: 'fun-1.4',
        name: 'Innovation',
        children: [
          { id: 'fun-1.4.1', name: 'AI Research Labs', links: [] }
        ]
      }
    ]
  }
];

const baseSuggestions = [
  { 
    id: 1, 
    type: 'MATCH', 
    status: 'auto_linked', 
    overlap: 93, 
    structures: ['Organizational Structure'], 
    oldTeams: [{ name: 'UX Design', size: 12 }], 
    newTeams: [{ name: 'UX Design', size: 14 }],
    insight: "Both names match perfectly, and 12 out of 14 people (93%) are the exact same in this team across both structures."
  },
  { 
    id: 2, 
    type: 'MERGE', 
    status: 'pending', 
    overlap: 89, 
    structures: ['Organizational Structure'], 
    oldTeams: [
      { name: 'Customer Success NA', size: 20 },
      { name: 'Customer Success EMEA', size: 15 }
    ], 
    newTeams: [{ name: 'Global Customer Success', size: 38 }],
    insight: "It looks like these regional teams have been brought together into one global team, as they share 89% of the same members."
  },
  { 
    id: 3, 
    type: 'SPLIT', 
    status: 'pending', 
    overlap: 85, 
    structures: ['Organizational Structure'], 
    oldTeams: [{ name: 'Engineering', size: 140 }], 
    newTeams: [
      { name: 'Product Engineering', size: 85 },
      { name: 'Platform Engineering', size: 62 }
    ],
    insight: "The original team seems to have split into these two new groups, with 85% of people moving into one of these specialized units."
  },
  { 
    id: 4, 
    type: 'NO_MATCH', 
    status: 'pending', 
    overlap: 0, 
    structures: ['Functional Structure'], 
    oldTeams: [], 
    newTeams: [{ name: 'AI Research Labs', size: 8 }],
    insight: "We couldn't find a historical match for this team (less than 5% overlap), so it looks like a brand new initiative."
  },
  { 
    id: 5, 
    type: 'MATCH', 
    status: 'auto_linked', 
    overlap: 78, 
    structures: ['Functional Structure'], 
    oldTeams: [{ name: 'Workplace Services', size: 10 }], 
    newTeams: [{ name: 'Workplace Experience', size: 12 }],
    insight: "Almost the entire original Workplace Services team is now here (78% overlap), so this appears to be a simple name update."
  },
  { 
    id: 6, 
    type: 'SPLIT', 
    status: 'pending', 
    overlap: 92, 
    structures: ['Functional Structure'], 
    oldTeams: [{ name: 'Marketing Global', size: 45 }], 
    newTeams: [
      { name: 'Product Marketing', size: 22 },
      { name: 'Brand & Growth', size: 20 }
    ],
    insight: "The global marketing team has been divided into strategic product and brand verticals. High confidence (92% overlap)."
  },
  { 
    id: 7, 
    type: 'MERGE', 
    status: 'pending', 
    overlap: 74, 
    structures: ['Geographical Structure'], 
    oldTeams: [
      { name: 'Sales North America', size: 40 },
      { name: 'Sales Europe', size: 30 }
    ], 
    newTeams: [{ name: 'Atlantic Enterprise Sales', size: 65 }],
    insight: "A consolidation of the Atlantic regions. Mostly the same staff, though some churn is detected."
  },
  { 
    id: 8, 
    type: 'MATCH', 
    status: 'pending', 
    overlap: 62, 
    structures: ['Functional Structure'], 
    oldTeams: [{ name: 'Core IT', size: 25 }], 
    newTeams: [{ name: 'IT Infrastructure', size: 28 }],
    insight: "Moderate overlap detected. Names have changed but core members remain the same."
  },
  { 
    id: 9, 
    type: 'SPLIT', 
    status: 'pending', 
    overlap: 81, 
    structures: ['Geographical Structure'], 
    oldTeams: [{ name: 'Global Finance', size: 60 }], 
    newTeams: [
      { name: 'APJ Finance', size: 25 },
      { name: 'Americas Finance', size: 32 }
    ],
    insight: "Finance is moving from a global model to a regional one. 81% of staff accounts for."
  },
  { 
    id: 10, 
    type: 'MATCH', 
    status: 'pending', 
    overlap: 55, 
    structures: ['Organizational Structure'], 
    oldTeams: [{ name: 'Human Resources', size: 15 }], 
    newTeams: [{ name: 'People Operations', size: 18 }],
    insight: "Overlap is lower than expected for a name change (55%), but members are statistically identical."
  },
  { 
    id: 11, 
    type: 'NO_MATCH', 
    status: 'pending', 
    overlap: 0, 
    structures: ['Functional Structure'], 
    oldTeams: [], 
    newTeams: [{ name: 'Diversity & Inclusion', size: 4 }],
    insight: "Appears to be a completely new team with no historical records in the system."
  },
  { 
    id: 12, 
    type: 'MERGE', 
    status: 'pending', 
    overlap: 88, 
    structures: ['Organizational Structure'], 
    oldTeams: [
      { name: 'Legal Ops', size: 8 },
      { name: 'Compliance', size: 12 }
    ], 
    newTeams: [{ name: 'Legal & Risk', size: 19 }],
    insight: "Legal and Compliance have merged. High confidence mapping based on employee IDs."
  }
];

const historicalTeamsDB = [
  { name: 'Engineering', size: 140 },
  { name: 'Core Engineering', size: 100 },
  { name: 'Customer Success NA', size: 20 },
  { name: 'Customer Success EMEA', size: 15 },
  { name: 'Workplace Services', size: 10 },
  { name: 'UX Design', size: 12 },
  { name: 'Product Analytics', size: 10 },
  { name: 'Sales North America', size: 40 },
  { name: 'Sales Europe', size: 30 },
  { name: 'Marketing Global', size: 45 },
  { name: 'Global Finance', size: 60 },
  { name: 'Core IT', size: 25 },
  { name: 'Human Resources', size: 15 },
  { name: 'Legal Ops', size: 8 },
  { name: 'Compliance', size: 12 },
  { name: 'Global Corp', size: 500 },
];

// --- COMPONENTS ---

const getConversationalTitle = (sug: any) => {
  const { type, oldTeams, newTeams, status } = sug;
  const isApproved = status === 'approved' || status === 'auto_linked';

  if (type === 'MATCH') {
    return isApproved 
      ? `${newTeams[0].name} is a direct match.`
      : `${newTeams[0].name} appears to be a direct match, is that correct?`;
  }
  if (type === 'MERGE') {
    const names = oldTeams.map((t: any) => t.name).join(' and ');
    return isApproved
      ? `${names} have merged into ${newTeams[0].name}.`
      : `${names} have merged into ${newTeams[0].name}, is that correct?`;
  }
  if (type === 'SPLIT') {
    return isApproved
      ? `${oldTeams[0].name} has been split into ${newTeams.length} groups.`
      : `${oldTeams[0].name} has been split into ${newTeams.length} groups, is that correct?`;
  }
  if (type === 'NO_MATCH') {
    return isApproved
      ? `${newTeams[0].name} is a new team.`
      : `${newTeams[0].name} appears to be a new team, is that correct?`;
  }
  return isApproved ? "Confirmed mapping." : "Is this mapping correct?";
};

const getSuggestionInsight = (sug: any) => {
  const { type, overlap, oldTeams, newTeams } = sug;
  
  const isNameExact = oldTeams.length === 1 && newTeams.length === 1 && oldTeams[0].name === newTeams[0].name;
  const oldNames = oldTeams.map((t: any) => t.name).join(', ');
  const totalOld = oldTeams.reduce((acc: number, t: any) => acc + (t.size || 0), 0);
  const matchCount = Math.round((totalOld * overlap) / 100);
  const isPluralNew = newTeams.length > 1;

  switch (type) {
    case 'MATCH':
      if (isNameExact && overlap >= 90) {
        return `This looks like a direct match. The group name is identical and ${matchCount} out of ${totalOld} employees remained in the same group.`;
      }
      if (overlap >= 75) {
        return `Most employees from ${oldNames} (${matchCount} people) are now in this group. This suggests a direct transition or rebranding.`;
      }
      return `${matchCount} of the people in the original ${oldNames} team have moved here, making it the most likely match.`;
    
    case 'MERGE':
      if (overlap >= 80) {
        return `It looks like ${oldTeams.length} teams were combined into this new group. We found ${matchCount} of the original ${totalOld} employees here.`;
      }
      return `This is likely a consolidation where ${matchCount} out of ${totalOld} members from ${oldNames} were merged into this single group.`;
      
    case 'SPLIT':
      if (isPluralNew) {
        return `These groups were split off from ${oldNames}. Together they retain ${matchCount} of the ${totalOld} original team members.`;
      }
      return `This group was split off from ${oldNames}. It still retains ${matchCount} of the ${totalOld} original team members.`;
      
    case 'NO_MATCH':
      return `This appears to be a completely new group. We couldn't find any significant employee overlap from the previous structure.`;
      
    default:
      return "The system suggested this link based on shifts in team members and general structural patterns.";
  }
};

const SurveyOverview = ({ onNavigateToLinking, mappedCount, totalCount, unreviewedCount }: { onNavigateToLinking: () => void, mappedCount: number, totalCount: number, unreviewedCount: number }) => {
  return (
    <div className="max-w-5xl mx-auto py-12 px-6 pb-24 animate-in fade-in duration-700">
      <div className="mb-10">
        <div className="text-[10px] font-black tracking-[0.2em] text-slate-400 uppercase mb-2">Pulse 2026</div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">2026 Engagement Survey</h1>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-10">
        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 bg-white relative overflow-hidden gap-4">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200/50 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">Your survey is running!</h3>
              <p className="text-sm text-slate-500 font-medium mt-0.5">Check out the current response rates to see how it's going</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-300 px-5 py-2 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm text-sm shrink-0">
            <BarChart3 className="w-4 h-4" /> View response
          </button>
        </div>

        {/* Timeline Section */}
        <div className="flex relative items-start h-64">
          {/* Background Zones */}
          <div className="flex-1 bg-white h-full p-6 border-r border-slate-100 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-4">
               <CircleDashed className="w-4 h-4" /> Planned
             </div>
          </div>
          <div className="flex-[2] bg-amber-50/30 h-full p-6 border-r border-slate-100 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
               <Clock className="w-4 h-4" /> Running
             </div>
             <div className="text-xs font-bold text-slate-600 ml-6 flex items-center gap-1.5 opacity-80">
               Apr 25, 2022 <div className="w-3 h-0.5 bg-slate-300 rounded-full" /><div className="w-1 h-1 rounded-full bg-slate-400" /> May 10, 2022
             </div>
          </div>
          <div className="flex-1 bg-emerald-50/20 h-full p-6 flex flex-col gap-1">
             <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
               <CheckCircle2 className="w-4 h-4" /> Completed
             </div>
          </div>

          {/* Continuous Progress Line */}
          <div className="absolute top-1/2 left-0 w-full px-8 pointer-events-none">
            <div className="relative h-1 bg-slate-200 rounded-full w-full">
              {/* Blue Progress */}
              <div className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full w-[35%]" />
              
              {/* Dots and Milestones */}
              {/* Planned Start */}
              <div className="absolute left-[0%] top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-slate-600 rounded-full border-2 border-white" />
              
              {/* Planned End / Survey Launch */}
              <div className="absolute left-[20%] top-1/2 -translate-y-1/2 group flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-slate-500 rounded-full border-2 border-white shadow-sm" />
                <div className="h-10 border-r border-dashed border-slate-400 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-slate-400 shadow-sm pointer-events-auto cursor-pointer">
                  <FileText className="w-4 h-4" />
                </div>
              </div>

              {/* Running Start */}
              <div className="absolute left-[25%] top-1/2 -translate-y-1/2 group flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-white shadow-sm ring-4 ring-amber-100/50" />
                <div className="h-10 border-r border-dashed border-amber-400 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-amber-200 rounded-lg flex items-center justify-center text-amber-500 shadow-sm pointer-events-auto cursor-pointer">
                  <Send className="w-4 h-4" />
                </div>
              </div>

              {/* Current Position Marker */}
              <div className="absolute left-[35%] top-1/2 -translate-y-1/2 w-4 h-4 bg-indigo-500 rounded-full ring-4 ring-indigo-100 shadow-md" />

              {/* Middle Milestone - Reminder 1 */}
              <div className="absolute left-[58%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white" />
                <div className="h-10 border-r border-dashed border-slate-200 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-amber-200 rounded-lg flex items-center justify-center text-amber-400 shadow-sm pointer-events-auto cursor-pointer">
                  <Bell className="w-4 h-4" />
                </div>
              </div>

              {/* Reminder 2 */}
              <div className="absolute left-[78%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white" />
                <div className="h-10 border-r border-dashed border-slate-200 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-amber-200 rounded-lg flex items-center justify-center text-amber-400 shadow-sm pointer-events-auto cursor-pointer">
                  <Bell className="w-4 h-4" />
                </div>
              </div>

              {/* Results Start */}
              <div className="absolute left-[91%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white" />
                <div className="h-10 border-r border-dashed border-slate-200 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-emerald-200 rounded-lg flex items-center justify-center text-emerald-500 shadow-sm pointer-events-auto cursor-pointer">
                  <Check className="w-4 h-4" />
                </div>
              </div>

              {/* Complete */}
              <div className="absolute left-[100%] top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="w-2.5 h-2.5 bg-slate-300 rounded-full border-2 border-white" />
                <div className="h-10 border-r border-dashed border-slate-200 mt-0.5" />
                <div className="mt-2 w-8 h-8 bg-white border border-emerald-200 rounded-lg flex items-center justify-center text-emerald-500 shadow-sm pointer-events-auto cursor-pointer">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tip Callout inside main dashboard card */}
        {unreviewedCount > 0 && (
          <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/50 border-t border-amber-100/50 p-5 px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex gap-4 items-center">
              <motion.div 
                initial={{ rotate: 0, scale: 1 }}
                animate={{ rotate: [0, -25, 25, -20, 20, -10, 10, 0], scale: [1, 1.15, 1.15, 1.15, 1.15, 1.1, 1.1, 1] }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="w-10 h-10 bg-white border border-amber-200 rounded-full flex items-center justify-center shadow-sm shrink-0"
              >
                <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-200/50" />
              </motion.div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Tip: Link your surveys to see trends</h4>
                <p className="text-sm text-slate-600 mt-0.5">
                  Link your previous surveys to see how results have changed over time. We successfully auto-linked <strong className="text-amber-900">{mappedCount} teams</strong>, but <strong className="text-amber-900">{totalCount - mappedCount} teams</strong> still need your manual review.
                </p>
              </div>
            </div>
            <button 
              onClick={onNavigateToLinking}
              className="text-sm font-bold text-amber-900 hover:text-amber-950 flex items-center justify-center gap-1.5 transition-colors bg-white px-5 py-2.5 rounded-xl border border-amber-200 shadow-sm hover:shadow hover:border-amber-300 shrink-0"
            >
              Review links <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Survey Settings */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <button className="w-full px-8 py-6 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
            <span className="text-xl font-bold text-slate-900">Survey Settings</span>
            <ChevronUp className="w-6 h-6 text-slate-400" />
          </button>
          <div className="divide-y divide-slate-50">
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center"><Users className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Participants</div>
                  <div className="text-sm text-slate-500 font-medium">42 participants from 15 teams</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                View details <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center"><Calendar className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Survey period</div>
                  <div className="text-sm text-slate-500 font-medium line-clamp-1">Mon, Jan 12, 2026, 9:00 AM – Fri, Jan 30, 2026, 5:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                Extend period <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center"><MessageSquare className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Questions</div>
                  <div className="text-sm text-slate-500 font-medium">41 questions · 20 min completion time</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0 font-bold">
                View questions <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center"><Palette className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Design</div>
                  <div className="text-sm text-slate-500 font-medium">Survey: Default · Email: Default · Content: Default</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-slate-400 font-bold text-sm shrink-0">
                <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors"><Eye className="w-4 h-4" /> Survey</div>
                <div className="w-px h-4 bg-slate-200" />
                <div className="flex items-center gap-2 hover:text-indigo-600 transition-colors"><Eye className="w-4 h-4" /> Email</div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparisons */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
           <button className="w-full px-8 py-6 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
            <span className="text-xl font-bold text-slate-900">Comparisons</span>
            <ChevronUp className="w-6 h-6 text-slate-400" />
          </button>
          <div className="divide-y divide-slate-50">
            <div 
              onClick={(e) => {
                e.preventDefault();
                onNavigateToLinking();
              }} 
              className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center"><Activity className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Previous survey links</div>
                  <div className="text-sm text-slate-500 font-medium">{mappedCount} of {totalCount} teams linked</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                {unreviewedCount > 0 ? `${unreviewedCount} to review` : 'All mapped'} <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white text-slate-400 rounded-2xl flex items-center justify-center border border-slate-100"><BarChart className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Benchmarks</div>
                  <div className="text-sm text-slate-500 font-medium">Industry benchmarks enabled</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                Configure <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Sharing Results */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
           <button className="w-full px-8 py-6 flex items-center justify-between border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
            <span className="text-xl font-bold text-slate-900">Sharing Results</span>
            <ChevronUp className="w-6 h-6 text-slate-400" />
          </button>
          <div className="divide-y divide-slate-50">
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center"><FileText className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Result access</div>
                  <div className="text-sm text-slate-500 font-medium">28 users have access</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                Edit <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            <div className="px-8 py-5 flex items-center justify-between group cursor-pointer hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center"><Clock className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Phased Release</div>
                  <div className="text-sm text-slate-500 font-medium">Manage how and when you share results</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400 font-bold text-sm group-hover:text-indigo-600 transition-colors shrink-0">
                Set up <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const UnifiedTreeNode = ({ node, level, expandedNodes, toggleNode, searchQuery, onApprove, onReject, onAdd, linkingNodeId, setLinkingNodeId, historicalTeamsDB, onSelectHistoricalTeam, onOpenEmployees }: any) => {
  const isSearching = !!searchQuery;
  const isExpanded = expandedNodes[node.id] !== false || isSearching;
  const hasChildren = node.children && node.children.length > 0;
  const isMatch = searchQuery && node.name.toLowerCase().includes(searchQuery.toLowerCase());
  const isLinking = linkingNodeId === node.id;
  const [localSearch, setLocalSearch] = React.useState('');

  return (
    <>
      <div className={`flex border-b border-slate-100 hover:bg-slate-50 transition-colors group min-h-[64px] items-center ${isMatch ? 'bg-indigo-50/50' : ''}`}>
        <div className="w-1/2 flex items-center py-3 px-6" style={{ paddingLeft: `${(level * 24) + 24}px` }}>
          <div className="flex items-center gap-3 w-full">
            {hasChildren ? (
              <button 
                onClick={() => toggleNode(node.id)} 
                className="p-0.5 rounded text-slate-400 hover:text-slate-800 transition-colors"
                id={`toggle-node-${node.id}`}
              >
                <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>
            ) : (
              <div className="w-5" />
            )}
            <div className="flex items-center gap-2">
              <span className={`text-sm ${isMatch ? 'font-bold text-indigo-700' : 'font-semibold text-slate-800'}`}>{node.name}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenEmployees({ name: node.name, size: node.size || 10 }); }}
                className="text-[10px] font-bold text-slate-400 hover:text-indigo-600 bg-slate-100/50 hover:bg-indigo-50 px-1.5 py-0.5 rounded transition-colors flex items-center gap-1 group/tree-emp"
              >
                <Users className="w-2.5 h-2.5" />
                {node.size || 10}
              </button>
              {node.links && node.links.length > 0 && node.links.some((l: any) => l.status === 'under_review') && (
                <span className="bg-purple-50 text-purple-600 text-[9px] font-black px-1.5 py-0.5 rounded border border-purple-100 flex items-center gap-1 shrink-0">
                  <Clock className="w-2.5 h-2.5" /> REVIEW
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-1/2 flex items-center justify-between py-3 px-6 pl-12 relative border-l border-slate-50">
          <ArrowLeft className="absolute left-3 w-3.5 h-3.5 text-slate-300" strokeWidth={2} />
          
          <div className="flex-1 flex items-center gap-2 flex-wrap min-w-0">
            {isLinking ? (
              <div className="relative w-full max-w-[240px] animate-in slide-in-from-left-2 duration-200">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-indigo-400" />
                    <input 
                      autoFocus
                      type="text"
                      placeholder="Search historical..."
                      value={localSearch}
                      onChange={(e) => setLocalSearch(e.target.value)}
                      className="w-full bg-white border border-indigo-200 rounded-lg pl-8 pr-2 py-1.5 text-xs font-medium outline-none ring-2 ring-indigo-50"
                    />
                  </div>
                  <button onClick={() => setLinkingNodeId(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-[150] overflow-hidden p-1 max-h-48 overflow-y-auto">
                  {historicalTeamsDB
                    .filter((t: any) => t.name.toLowerCase().includes(localSearch.toLowerCase()))
                    .map((team: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => {
                          onSelectHistoricalTeam(node.id, team);
                          setLinkingNodeId(null);
                          setLocalSearch('');
                        }}
                        className="w-full flex items-center justify-between p-2 hover:bg-indigo-50 rounded-lg text-left text-[11px] transition-colors"
                      >
                        <span className="font-bold text-slate-700 truncate mr-2">{team.name}</span>
                        <span className="text-slate-400 shrink-0"><Users className="w-2.5 h-2.5 inline mr-1" /> {team.size}</span>
                      </button>
                    ))}
                  {historicalTeamsDB.filter((t: any) => t.name.toLowerCase().includes(localSearch.toLowerCase())).length === 0 && (
                    <div className="p-2 text-center text-[10px] text-slate-400 italic">No results</div>
                  )}
                </div>
              </div>
            ) : (
              node.links?.some((l: any) => l.status === 'suggested' || l.status === 'under_review') ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-wrap gap-2">
                    {node.links.filter((l: any) => l.status === 'suggested' || l.status === 'under_review').map((link: any) => (
                      <div key={link.id} className={`flex items-center gap-2 border rounded-full px-3 py-1 bg-white shadow-sm transition-all ${link.status === 'suggested' ? 'border-amber-200 bg-amber-50/30' : 'border-purple-200 bg-purple-50/30'}`}>
                        <span className={`text-[12px] font-bold ${link.status === 'suggested' ? 'text-amber-700' : 'text-purple-700'}`}>{link.name}</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onOpenEmployees(link); }}
                          className="text-[9px] font-bold text-slate-400 hover:text-slate-600 bg-black/5 rounded px-1 transition-colors"
                        >
                          {link.size || 12}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onApprove(node.id, 'all-suggested'); }} 
                      className="relative group/btn flex items-center justify-center w-8 h-8 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all"
                    >
                      <Check className="w-4 h-4" strokeWidth={3} />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/btn:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl border border-slate-700 z-50">Confirm</span>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onReject(node.id, 'all-suggested'); }} 
                      className="relative group/btn flex items-center justify-center w-8 h-8 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all"
                    >
                      <X className="w-4 h-4" strokeWidth={3} />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/btn:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl border border-slate-700 z-50">Don't link</span>
                    </button>
                  </div>
                </div>
              ) : (
                node.links && node.links.length > 0 ? (
                  node.links.map((link: any) => (
                    <div key={link.id} className="flex items-center gap-2 border border-slate-200 rounded-full pl-3 pr-1 py-1 bg-white shadow-sm transition-all group/link">
                      <span className="text-[12px] font-bold text-slate-700">{link.name}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onOpenEmployees(link); }}
                        className="text-[9px] font-bold text-slate-400 hover:text-slate-600 bg-slate-50 px-1 rounded transition-colors"
                      >
                        {link.size || 12}
                      </button>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${link.status === 'auto' ? 'text-green-500' : 'text-indigo-500'}`}>
                        Linked
                      </span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); onReject(node.id, link.id); }}
                        className="w-5 h-5 flex items-center justify-center rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover/link:opacity-100 ml-1"
                      >
                        <X className="w-3 h-3" strokeWidth={3} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider italic">
                    No previous survey link
                  </span>
                )
              )
            )}
          </div>
          
          {!isLinking && (
            <button 
              onClick={() => setLinkingNodeId(node.id)} 
              className="relative group/addbtn opacity-0 group-hover:opacity-100 p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 transition-all ml-4 shrink-0"
              id={`add-link-${node.id}`}
            >
              <Plus className="w-4 h-4" />
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover/addbtn:opacity-100 transition-all whitespace-nowrap pointer-events-none shadow-xl border border-slate-700 z-50">Add group</span>
            </button>
          )}
        </div>
      </div>
      {isExpanded && hasChildren && node.children.map((child: any) => (
        <UnifiedTreeNode 
          key={child.id} 
          node={child} 
          level={level + 1} 
          expandedNodes={expandedNodes} 
          toggleNode={toggleNode} 
          searchQuery={searchQuery} 
          onApprove={onApprove} 
          onReject={onReject} 
          onAdd={onAdd}
          linkingNodeId={linkingNodeId}
          setLinkingNodeId={setLinkingNodeId}
          historicalTeamsDB={historicalTeamsDB}
          onSelectHistoricalTeam={onSelectHistoricalTeam}
          onOpenEmployees={onOpenEmployees}
        />
      ))}
    </>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState('pending'); 
  const [suggestions, setSuggestions] = useState(baseSuggestions);
  const [selectedTreeStructure, setSelectedTreeStructure] = useState(structureTypes[0]);
  const [treeDataMap, setTreeDataMap] = useState<Record<string, any>>({
    [structureTypes[0]]: initialTreeData,
    [structureTypes[1]]: geoTreeData,
    [structureTypes[2]]: functionalTreeData,
  });
  const currentTreeData = treeDataMap[selectedTreeStructure] || [];
  const [selectedCardIds, setSelectedCardIds] = useState<number[]>([]);
  const [selectedStructures, setSelectedStructures] = useState<string[]>([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [exitingIds, setExitingIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeesGroup, setSelectedEmployeesGroup] = useState<{name: string, size: number} | null>(null);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);
  const [selectedManager, setSelectedManager] = useState<typeof managersDB[0] | null>(managersDB[0]);
  const [managerInputValue, setManagerInputValue] = useState('');
  const [showManagerResults, setShowManagerResults] = useState(false);
  const [reviewMessage, setReviewMessage] = useState('');
  const [isTreeModalOpen, setIsTreeModalOpen] = useState(false);
  const [expandedTreeNodes, setExpandedTreeNodes] = useState<Record<string, boolean>>({});
  const [hoveredInfoId, setHoveredInfoId] = useState<number | null>(null);
  const [treeSearchQuery, setTreeSearchQuery] = useState('');
  const [linkingId, setLinkingId] = useState<number | null>(null);
  const [manualLinkSearchQuery, setManualLinkSearchQuery] = useState('');
  const [treeLinkingNodeId, setTreeLinkingNodeId] = useState<string | null>(null);
  const [treeStatusFilter, setTreeStatusFilter] = useState<string[]>([]);
  const [isTreeFilterDropdownOpen, setIsTreeFilterDropdownOpen] = useState(false);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedSurvey, setSelectedSurvey] = useState("2025 Engagement Survey");
  const [showSurveyLinks, setShowSurveyLinks] = useState(false);
  const [showOverview, setShowOverview] = useState(true);
  
  const previousSurveys = [
    "2025 Engagement Survey",
    "2024 Engagement Survey",
    "2023 Engagement Survey",
    "2022 Engagement Survey",
    "2021 Engagement Survey"
  ];
  
  React.useEffect(() => {
    setTreeSearchQuery('');
    setTreeLinkingNodeId(null);
  }, [selectedTreeStructure]);

  // --- SYNC HELPERS ---

  React.useEffect(() => {
    // Robust sync: Whenever suggestions change, ensure the relevant tree reflects the current mapping status
    setTreeDataMap(prev => {
      const newMap = { ...prev };
      let hasGlobalChanges = false;

      Object.keys(newMap).forEach(structureId => {
        const updateNodes = (nodes: any[]): any[] => {
          return nodes.map(node => {
            let newNode = { ...node };
            // A suggestion matches if it has this node name AND belongs to this specific structure
            const sug = suggestions.find(s => 
              s.newTeams.some((t: any) => t.name === node.name) && 
              s.structures.includes(structureId)
            );
            
            if (sug && newNode.links && newNode.links.length > 0) {
              let nodeChanged = false;
              const newLinks = newNode.links.map((l: any) => {
                const isPartOfSug = sug.oldTeams.some((ot: any) => ot.name === l.name);
                if (isPartOfSug) {
                  const targetStatus = sug.status === 'approved' || sug.status === 'auto_linked' ? 'approved' : 
                                      sug.status === 'under_review' ? 'under_review' : 
                                      sug.status === 'rejected' ? 'suggested' : 'suggested';
                  
                  if (l.status !== targetStatus && (l.status === 'suggested' || l.status === 'under_review' || l.status === 'approved')) {
                    nodeChanged = true;
                    hasGlobalChanges = true;
                    return { ...l, status: targetStatus };
                  }
                }
                return l;
              });
              if (nodeChanged) {
                newNode.links = newLinks;
              }
            }

            if (newNode.children) {
              newNode.children = updateNodes(newNode.children);
            }
            return newNode;
          });
        };
        newMap[structureId] = updateNodes(newMap[structureId]);
      });

      return hasGlobalChanges ? newMap : prev;
    });
  }, [suggestions]);
  
  const propagateTreeUpdateToSuggestions = (nodeId: string, nodeName: string, links: any[]) => {
    let targetStatus = 'pending';
    
    // Determine the new status based on link states
    if (links.length === 0) {
      targetStatus = 'rejected';
    } else if (links.every(l => l.status === 'approved' || l.status === 'auto' || l.status === 'auto_linked')) {
      targetStatus = 'approved';
    } else if (links.some(l => l.status === 'under_review')) {
      targetStatus = 'under_review';
    } else if (links.some(l => l.status === 'suggested')) {
      targetStatus = 'pending';
    }

    setSuggestions(prev => {
      // Find existing suggestion that matches node name
      const existingIdx = prev.findIndex(s => 
        s.newTeams.some((t: any) => t.name === nodeName)
      );
      
      if (existingIdx !== -1) {
        const newSug = [...prev];
        const currentStructures = newSug[existingIdx].structures || [];
        const updatedStructures = currentStructures.includes(selectedTreeStructure) 
            ? currentStructures 
            : [...currentStructures, selectedTreeStructure];
            
        newSug[existingIdx] = { 
          ...newSug[existingIdx], 
          status: targetStatus,
          structures: updatedStructures,
          oldTeams: links.length > 0 ? links.map(l => ({ name: l.name, size: historicalTeamsDB.find(t => t.name === l.name)?.size || 0 })) : newSug[existingIdx].oldTeams
        };
        return newSug;
      } else {
        if (links.length === 0) return prev; // Do not create a new rejected suggestion from thin air
        // Add new suggestion if it's not there
        const newSugEntry = {
          id: Date.now(),
          type: links.length > 1 ? 'MERGE' : 'MATCH',
          status: targetStatus,
          overlap: 100,
          structures: [selectedTreeStructure],
          oldTeams: links.map(l => ({ name: l.name, size: historicalTeamsDB.find(t => t.name === l.name)?.size || 0 })),
          newTeams: [{ name: nodeName, size: 0 }],
          insight: "Manually linked in structure tree."
        };
        return [...prev, newSugEntry];
      }
    });
  };

  const handleReviewSubmit = () => {
    if (selectedReviewId === null || !selectedManager) return;
    
    setSuggestions(prev => prev.map(s => 
      s.id === selectedReviewId 
        ? { 
            ...s, 
            status: 'under_review',
            reviewManager: selectedManager,
            reviewMessage: reviewMessage,
            reviewDate: new Date().toLocaleDateString('en-GB')
          } 
        : s
    ));
    
    setIsModalOpen(false);
    setReviewMessage('');
    showToast(`Review request sent to ${selectedManager.first} ${selectedManager.last}`);
  };

  // --- ACTIONS ---

  const handleSelectHistoricalFromTree = (nodeId: string, team: { name: string, size: number }) => {
    let affectedNode: any = null;
    const updateNode = (nodes: any[]): any[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          affectedNode = {
            ...node,
            links: [...(node.links || []), { id: `manual-${Date.now()}`, name: team.name, status: 'approved' }]
          };
          return affectedNode;
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    
    // Calculate new tree first
    const newStructureData = updateNode(treeDataMap[selectedTreeStructure]);
    
    setTreeDataMap(prev => ({
      ...prev,
      [selectedTreeStructure]: newStructureData
    }));
    
    if (affectedNode) {
      propagateTreeUpdateToSuggestions(affectedNode.id, affectedNode.name, affectedNode.links);
    }
    showToast(`Linked '${team.name}' to tree node.`);
  };

  const handleApproveTreeLink = (nodeId: string, linkId: string) => {
    let affectedNode: any = null;
    const currentStructureData = JSON.parse(JSON.stringify(treeDataMap[selectedTreeStructure]));

    const updateNodes = (nodes: any[]): any[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          const newLinks = node.links.map((l: any) => 
            (linkId === 'all-suggested' && (l.status === 'suggested' || l.status === 'under_review')) || l.id === linkId 
              ? { ...l, status: 'approved' } 
              : l
          );
          affectedNode = { ...node, links: newLinks };
          return affectedNode;
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };

    const newStructureData = updateNodes(currentStructureData);

    setTreeDataMap(prev => ({
      ...prev,
      [selectedTreeStructure]: newStructureData
    }));

    if (affectedNode) {
      propagateTreeUpdateToSuggestions(affectedNode.id, affectedNode.name, affectedNode.links);
    }
    showToast("Links approved.");
  };

  const handleRejectTreeLink = (nodeId: string, linkId: string) => {
    let affectedNode: any = null;
    const currentStructureData = JSON.parse(JSON.stringify(treeDataMap[selectedTreeStructure]));

    const updateNodes = (nodes: any[]): any[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          const newLinks = node.links.filter((l: any) => 
            !(linkId === 'all-suggested' && (l.status === 'suggested' || l.status === 'under_review')) && l.id !== linkId
          );
          affectedNode = { ...node, links: newLinks };
          return affectedNode;
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };

    const newStructureData = updateNodes(currentStructureData);

    setTreeDataMap(prev => ({
      ...prev,
      [selectedTreeStructure]: newStructureData
    }));

    if (affectedNode) {
      propagateTreeUpdateToSuggestions(affectedNode.id, affectedNode.name, affectedNode.links);
    }
    showToast("Links removed.");
  };

  const handleAddTreeLink = (nodeId: string) => {
    showToast(`Add link for node ${nodeId}`);
    // For demo, just add a mock historical link
    const updateNode = (nodes: any[]): any[] => {
      return nodes.map(node => {
        if (node.id === nodeId) {
          return {
            ...node,
            links: [...(node.links || []), { id: `manual-${Date.now()}`, name: 'Historical Team X', status: 'approved' }]
          };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setTreeDataMap(prev => ({
      ...prev,
      [selectedTreeStructure]: updateNode(prev[selectedTreeStructure])
    }));
  };

  const handleAction = (id: number, action: string) => {
    if (editingId === id) setEditingId(null);
    const sug = suggestions.find(s => s.id === id);
    if (!sug) return;
    setExitingIds(prev => [...prev, id]);
    setTimeout(() => {
      setSuggestions(prev => prev.map(s => s.id === id ? { ...s, status: action } : s));
      setExitingIds(prev => prev.filter(eid => eid !== id));
      setSelectedCardIds(prev => prev.filter(sid => sid !== id));
      showToast(`Mapping for '${sug.newTeams[0].name}' updated.`);
    }, 300);
  };

  const handleBulkAction = (action: string) => {
    if (selectedCardIds.length === 0) return;
    setExitingIds(prev => [...prev, ...selectedCardIds]);
    setTimeout(() => {
      setSuggestions(prev => prev.map(s => selectedCardIds.includes(s.id) ? { ...s, status: action } : s));
      setExitingIds(prev => prev.filter(id => !selectedCardIds.includes(id)));
      setSelectedCardIds([]); 
      showToast(`Updated ${selectedCardIds.length} mappings.`);
    }, 300);
  };

  const showToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const removeToast = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleAddLink = (id: number) => {
    setLinkingId(id);
    setManualLinkSearchQuery('');
  };

  const handleSelectHistoricalTeam = (suggestionId: number, team: { name: string, size: number }) => {
    let targetSug: any = null;
    setSuggestions(prev => prev.map(s => {
      if (s.id === suggestionId) {
        targetSug = s;
        return {
          ...s,
          oldTeams: [...s.oldTeams, team],
          type: s.oldTeams.length === 0 ? 'MATCH' : (s.oldTeams.length >= 1 ? 'MERGE' : s.type)
        };
      }
      return s;
    }));
    
    if (targetSug) {
      setTreeDataMap(prev => {
        const newMap = { ...prev };
        Object.keys(newMap).forEach(structId => {
          if (!targetSug.structures.includes(structId)) return;
          const addLink = (nodes: any[]): any[] => {
            return nodes.map(node => {
              let newNode = { ...node };
              if (targetSug.newTeams.some((t: any) => t.name === node.name)) {
                newNode.links = [...(newNode.links || []), { id: `manual-${Date.now()}`, name: team.name, status: targetSug.status === 'pending' ? 'suggested' : targetSug.status }];
              }
              if (newNode.children) {
                newNode.children = addLink(newNode.children);
              }
              return newNode;
            });
          };
          newMap[structId] = addLink(newMap[structId]);
        });
        return newMap;
      });
    }

    setLinkingId(null);
    setManualLinkSearchQuery('');
    showToast(`Linked '${team.name}' to suggestion.`);
  };

  const handleRemoveOldTeam = (suggestionId: number, teamName: string) => {
    let targetSug: any = null;
    let oldTeamsCount = 0;
    setSuggestions(prev => prev.map(s => {
      if (s.id === suggestionId) {
        targetSug = s;
        const newOldTeams = s.oldTeams.filter((t: any) => t.name !== teamName);
        oldTeamsCount = newOldTeams.length;
        return {
          ...s,
          oldTeams: newOldTeams,
          type: newOldTeams.length <= 1 ? 'MATCH' : 'MERGE'
        };
      }
      return s;
    }));

    if (targetSug) {
      setTreeDataMap(prev => {
        const newMap = { ...prev };
        Object.keys(newMap).forEach(structId => {
          if (!targetSug.structures.includes(structId)) return;
          const removeLink = (nodes: any[]): any[] => {
            return nodes.map(node => {
              let newNode = { ...node };
              if (targetSug.newTeams.some((t: any) => t.name === node.name)) {
                if (newNode.links) {
                  newNode.links = newNode.links.filter((l: any) => l.name !== teamName);
                }
              }
              if (newNode.children) {
                newNode.children = removeLink(newNode.children);
              }
              return newNode;
            });
          };
          newMap[structId] = removeLink(newMap[structId]);
        });
        return newMap;
      });
      
      showToast(`Removed link to '${teamName}'.`);
    }
  };

  const getFilteredTree = (nodes: any[], query: string, statusFilter: string[]): any[] => {
    if (!query && statusFilter.length === 0) return nodes;
    
    const lowerQuery = query.toLowerCase();
    
    return nodes
      .map(node => {
        const matchesName = !query || node.name.toLowerCase().includes(lowerQuery);
        const hasMatchingLinkStatus = node.links?.some((l: any) => {
          if (l.status === 'auto' || l.status === 'auto_linked') return statusFilter.includes('approved');
          return statusFilter.includes(l.status);
        });

        const filteredChildren = node.children ? getFilteredTree(node.children, query, statusFilter) : [];
        const hasMatchingChildren = filteredChildren.length > 0;
        
        // If we have a query, we keep nodes that match the query OR have matching children
        // If no query, we keep nodes that match the status filter OR have matching children
        if (query) {
          if (matchesName || hasMatchingChildren) {
            return { ...node, children: filteredChildren };
          }
        } else {
          if (hasMatchingLinkStatus || hasMatchingChildren) {
            return { ...node, children: filteredChildren };
          }
        }
        
        return null;
      })
      .filter(n => n !== null);
  };

  const filteredTreeData = getFilteredTree(currentTreeData, treeSearchQuery, treeStatusFilter);

  // --- DERIVED ---

  const totalAutoLinkedCount = 12; // Adjusted to be more realistic with the tree data

  // Helper to find things in trees that are linked but not in suggestions
  const getAutoMatches = React.useCallback((approvedSuggestions: any[]) => {
    const allTreeLinks: any[] = [];
    Object.keys(treeDataMap).forEach(structId => {
      const traverse = (nodes: any[]) => {
        nodes.forEach(node => {
          if (node.links && node.links.length > 0) {
            allTreeLinks.push({ nodeName: node.name, links: node.links, structure: structId });
          }
          if (node.children) traverse(node.children);
        });
      };
      traverse(treeDataMap[structId]);
    });

    const autoMatches: any[] = [];
    allTreeLinks.forEach(item => {
      const isAlreadyInSuggestions = approvedSuggestions.some(s => s.newTeams.some((t: any) => t.name === item.nodeName));
      const isApproved = item.links.every((l: any) => l.status === 'approved' || l.status === 'auto' || l.status === 'auto_linked');
      
      if (!isAlreadyInSuggestions && isApproved) {
        if (!autoMatches.some(m => m.newTeams[0].name === item.nodeName)) {
          autoMatches.push({
            id: `auto-${item.nodeName}`,
            status: 'auto_linked',
            type: item.links.length > 1 ? 'MERGE' : 'MATCH',
            structures: [item.structure],
            newTeams: [{ name: item.nodeName, size: 0 }],
            oldTeams: item.links.map((l: any) => ({ name: l.name, size: historicalTeamsDB.find(h => h.name === l.name)?.size || 0 })),
            insight: 'Automatically mapped based on structure matching.'
          });
        }
      }
    });
    return autoMatches;
  }, [treeDataMap, historicalTeamsDB]);

  const visibleSuggestions = React.useMemo(() => {
    if (activeTab === 'completed') {
      const approvedSuggestions = suggestions.filter(s => s.status === 'approved' || s.status === 'auto_linked' || s.status === 'rejected');
      const autoMatches = getAutoMatches(approvedSuggestions);

      return [...approvedSuggestions, ...autoMatches].filter(s => {
        return selectedStructures.length === 0 || s.structures.some(str => selectedStructures.includes(str));
      });
    }

    return suggestions.filter(s => {
      const matchesStructure = selectedStructures.length === 0 || s.structures.some(str => selectedStructures.includes(str));
      if (!matchesStructure) return false;
      if (activeTab === 'pending') return s.status === 'pending';
      if (activeTab === 'under_review') return s.status === 'under_review';
      return false;
    });
  }, [suggestions, activeTab, selectedStructures, getAutoMatches]);

  const getTabCount = (tab: string) => {
    if (tab === 'completed') {
      const approved = suggestions.filter(s => s.status === 'approved' || s.status === 'auto_linked' || s.status === 'rejected');
      const autoMatchedInTrees = getAutoMatches(approved);
      return approved.length + autoMatchedInTrees.length + totalAutoLinkedCount; 
    }
    return suggestions.filter(s => s.status === tab).length;
  };
  
  const autoMatches = getAutoMatches(suggestions);
  const totalMappedCount = suggestions.filter(s => s.status === 'approved' || s.status === 'auto_linked' || s.status === 'rejected').length + autoMatches.length + totalAutoLinkedCount;
  const totalTeamsGoalCount = suggestions.length + autoMatches.length + totalAutoLinkedCount;
  const progressPercentage = totalTeamsGoalCount > 0 ? Math.min(100, Math.round((totalMappedCount / totalTeamsGoalCount) * 100)) : 100;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900 flex">
      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-slate-200 shrink-0 sticky top-0 h-screen overflow-y-auto hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center text-white shadow-sm">
                <div className="w-5 h-5 border-2 border-white rounded-full relative">
                  <div className="w-2.5 h-2.5 bg-white rounded-full absolute -top-1 left-1/2 -translate-x-1/2 z-10" />
                  <div className="w-4 h-2 bg-white rounded-t-full absolute bottom-0 left-1/2 -translate-x-1/2" />
                </div>
              </div>
              <span className="font-bold text-lg text-slate-900">Coordinator</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          <div className="space-y-1">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-semibold text-sm">
              <Home className="w-5 h-5 text-slate-500" /> Home
            </button>
            <div className="w-full text-left">
              <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-900 font-bold text-sm">
                <div className="flex items-center gap-4">
                  <FileText className="w-5 h-5 text-slate-700" /> Surveys
                </div>
                <ChevronUp className="w-4 h-4 text-slate-700" />
              </button>
              <div className="pl-12 pr-4 py-2 space-y-1">
                <button className="w-full text-left px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-semibold text-sm">
                  All surveys
                </button>
                <button className="w-full text-left px-4 py-2.5 rounded-xl bg-teal-100/50 text-slate-900 font-bold text-sm">
                  Projects
                </button>
              </div>
            </div>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-semibold text-sm">
              <RefreshCw className="w-5 h-5 text-slate-500" /> 360 feedback
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-semibold text-sm">
              <div className="flex items-center gap-4">
                <Settings className="w-5 h-5 text-slate-500" /> Organization
              </div>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-0">
        {showOverview ? (
        <SurveyOverview 
          onNavigateToLinking={() => { setShowOverview(false); window.scrollTo(0, 0); }} 
          mappedCount={totalMappedCount}
          totalCount={totalTeamsGoalCount}
          unreviewedCount={getTabCount('pending') + getTabCount('under_review')}
        />
      ) : (
        <div className="max-w-5xl mx-auto py-10 px-6 pb-32 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-2 mb-8 text-indigo-600 cursor-pointer hover:text-indigo-700 transition-colors group" onClick={() => { setShowOverview(true); window.scrollTo(0, 0); }}>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-bold">Back to Survey Overview</span>
          </div>

          <div className="mb-6 pl-1">
            <h1 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">Previous survey links</h1>
            <p className="text-slate-500 text-base leading-relaxed"> Compare this survey with a previous one to see how results changed over time. First, select the survey you want to compare with. Based on that survey, we'll match your current teams so their previous results can appear in trend lines. Review any suggested changes to ensure comparisons stay accurate </p>
          </div>

        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center shrink-0 text-slate-500">
                   <Link className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-500 mb-0.5">Comparing with previous survey</div>
                  <div className="relative group inline-flex items-center gap-2">
                    <select 
                      value={selectedSurvey}
                      onChange={(e) => setSelectedSurvey(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    >
                      {previousSurveys.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                      {selectedSurvey}
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <button 
                  className="flex justify-center items-center gap-2 text-slate-600 font-medium text-sm hover:text-slate-900 transition-all"
                  onClick={() => setShowSurveyLinks(!showSurveyLinks)}
                >
                  View survey history
                  {showSurveyLinks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />} 
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showSurveyLinks && (
                <motion.div 
                  initial={{ height: 0, opacity: 0, overflow: 'hidden' }}
                  animate={{ height: 'auto', opacity: 1, transitionEnd: { overflow: 'visible' } }}
                  exit={{ height: 0, opacity: 0, overflow: 'hidden' }}
                >
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-2 mb-6">
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Survey Links</h4>
                      <div className="relative group/tooltip flex items-center justify-center">
                        <Info className="w-4 h-4 text-slate-400 cursor-help hover:text-slate-600 transition-colors" />
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-64 bg-slate-900 text-white text-xs font-medium p-3 rounded-lg opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity shadow-xl z-[100]">
                          Links between consecutive surveys allow you to track team performance and engagement trends over time. We connect back as far as a continuous chain exists.
                          <div className="absolute top-1/2 -translate-y-1/2 right-full border-4 border-transparent border-r-slate-900" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      {/* Vertical Line */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-0.5 bg-slate-200" />
                      
                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-white" />
                          <div className="font-bold text-slate-900 flex items-center gap-3">
                            2026 Engagement Survey <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Current</span>
                          </div>
                        </div>
                        
                        {(previousSurveys.indexOf(selectedSurvey) !== -1 ? previousSurveys.slice(previousSurveys.indexOf(selectedSurvey)) : [selectedSurvey]).map((survey, idx) => (
                          <div key={survey} className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                            <div className="font-medium text-slate-600">
                              {survey}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-white rounded-2xl border border-indigo-100 shadow-sm transition-all pb-2">
            <div className="p-5 flex justify-between items-center bg-white rounded-t-2xl border-b border-indigo-100">
              <div className="flex gap-4 items-center">
                <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-white shadow-sm border border-indigo-200 text-indigo-600`}><Network className="w-5 h-5" /></div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">Review group link suggestions</h2>
                  <p className="text-slate-500 text-sm mt-0.5 leading-relaxed max-w-xl"><strong className="text-slate-700">{totalMappedCount} teams</strong> are automatically linked. <strong className="text-slate-700">{totalTeamsGoalCount - totalMappedCount} teams</strong> need your manual review.</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-6 pt-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} transition={{ duration: 1, ease: "easeOut" }} className={`${progressPercentage === 100 ? 'bg-green-500' : 'bg-indigo-600'} h-3 rounded-full`}></motion.div>
                </div>
                <div>
                  <span className={`text-2xl font-black ${progressPercentage === 100 ? 'text-green-600' : 'text-indigo-600'}`}>{progressPercentage}%</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end border-b border-slate-200 mb-6">
              <div className="flex gap-6">
              {['pending', 'under_review', 'completed'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}>
                      {tab === 'pending' ? 'Suggestions' : tab === 'under_review' ? 'Under Review' : 'Linked'} ({getTabCount(tab)})
                      {activeTab === tab && <motion.div layoutId="activeTabLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 pb-3 z-[90]">
                  <div className="relative">
                    <button onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all bg-white border-slate-200 text-slate-600" id="filter-dropdown-trigger">
                      <Filter className="w-3.5 h-3.5" /> 
                      Structure filter 
                      {selectedStructures.length > 0 && <span className="bg-indigo-600 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">{selectedStructures.length}</span>}
                      <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                    </button>
                    
                    {isFilterDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-[100]" onClick={() => setIsFilterDropdownOpen(false)} />
                        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-[101] p-2 overflow-hidden">
                          {structureTypes.map(st => (
                            <label key={st} className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group">
                              <input 
                                type="checkbox" 
                                checked={selectedStructures.includes(st)}
                                onChange={() => {
                                  setSelectedStructures(prev => 
                                    prev.includes(st) ? prev.filter(s => s !== st) : [...prev, st]
                                  );
                                }}
                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wider">{st}</span>
                            </label>
                          ))}
                          {selectedStructures.length > 0 && (
                            <button 
                              onClick={() => {
                                setSelectedStructures([]);
                                setIsFilterDropdownOpen(false);
                              }}
                              className="w-full mt-1 pt-2 border-t border-slate-100 text-[10px] font-black text-indigo-600 hover:text-indigo-700 uppercase tracking-widest py-1"
                            >
                              Clear filters
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsTreeModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all shadow-sm"
                  >
                    <Network className="w-3.5 h-3.5 text-indigo-600" />
                    View structure
                  </button>
                </div>
              </div>

              <div className="flex flex-col">
                <AnimatePresence mode="popLayout">
                  {visibleSuggestions.length === 0 ? (
                    <motion.div 
                      key="empty-state"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-300 rounded-[2.5rem] text-center px-6"
                    >
                      {progressPercentage === 100 && activeTab !== 'completed' ? (
                        <>
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            >
                              <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </motion.div>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Structure Mapping Complete</h3>
                          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed mb-6 font-medium">
                            You've successfully processed all suggestions. The new and old structures are now fully synchronised.
                          </p>
                          <div className="flex gap-3">
                            <button 
                              onClick={() => setIsTreeModalOpen(true)}
                              className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-indigo-200 shadow-lg hover:bg-indigo-700 transition-all font-sans"
                            >
                              View full structure tree
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                            <Search className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-800">All groups appear linked</h3>
                          <p className="text-slate-500 text-sm mt-1 max-w-xs">
                            It looks like all groups in this structure have been successfully mapped or don't match your active filters.
                          </p>
                          {selectedStructures.length > 0 && (
                            <button 
                              onClick={() => setSelectedStructures([])}
                              className="mt-4 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4"
                            >
                              Clear all filters
                            </button>
                          )}
                        </>
                      )}
                    </motion.div>
                  ) : (
                    visibleSuggestions.map((sug) => {
                    const isExiting = exitingIds.includes(sug.id);
                    const isSelected = selectedCardIds.includes(sug.id);
                    const isApproved = sug.status === 'approved' || sug.status === 'auto_linked';
                    const isCompletedVisual = (isApproved || sug.status === 'rejected') && editingId !== sug.id;

                    if (isExiting) return null;

                    return (
                      <motion.div 
                        key={sug.id} 
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mb-6"
                      >
                        <div className={`bg-slate-50 rounded-2xl border transition-all duration-200 shadow-sm ${isSelected ? 'border-indigo-500 ring-4 ring-indigo-50 shadow-indigo-100' : isApproved ? 'border-green-200 bg-green-50/10 shadow-green-100/10' : 'border-slate-200 hover:border-slate-300'}`}>
                          <div className="p-6">
                            <div className={isCompletedVisual ? "mb-4" : "mb-6"}>
                              <div className="flex items-start justify-between mb-2.5">
                                <div className="flex items-center gap-3">
                                  {sug.status === 'pending' && (
                                    <button onClick={() => setSelectedCardIds(prev => isSelected ? prev.filter(i => i !== sug.id) : [...prev, sug.id])} className={`w-[22px] h-[22px] rounded-[6px] border flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'border-slate-300 bg-white hover:bg-slate-50'}`}>{isSelected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}</button>
                                  )}
                                  <div className="flex items-center gap-2">
                                    {isApproved && <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-0.5 rounded border border-green-100 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> LINKED</span>}
                                    {sug.status === 'under_review' && <span className="bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-100 flex items-center gap-1"><Clock className="w-3 h-3" /> UNDER REVIEW</span>}
                                    {sug.status === 'rejected' && <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">NOT LINKED</span>}
                                    {!isCompletedVisual && (
                                      <>
                                        {sug.type === 'MATCH' && <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded border border-indigo-100 flex items-center gap-1"><Zap className="w-3 h-3" /> DIRECT MATCH</span>}
                                        {sug.type === 'MERGE' && <span className="bg-orange-50 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-100 flex items-center gap-1"><Layers className="w-3 h-3" /> MERGE</span>}
                                        {sug.type === 'SPLIT' && <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1"><Scissors className="w-3 h-3" /> SPLIT</span>}
                                        {sug.type === 'NO_MATCH' && <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1"><UserPlus2 className="w-3 h-3" /> NEW TEAM</span>}
                                      </>
                                    )}
                                  </div>
                                </div>
                                {(isApproved || sug.status === 'rejected') && editingId !== sug.id && <button onClick={() => setEditingId(sug.id)} className="px-3 py-1.5 border rounded-lg text-xs font-bold text-slate-500 flex items-center gap-1.5 shadow-sm hover:bg-slate-50" id={`edit-${sug.id}`}><PencilLine className="w-3.5 h-3.5" /> Edit</button>}
                              </div>
                              {sug.status === 'under_review' && sug.reviewManager && (
                                <div className="mb-6 p-4 bg-purple-50/50 border border-purple-100 rounded-2xl border-dashed">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${sug.reviewManager.color}`}>
                                        {sug.reviewManager.first[0]}{sug.reviewManager.last[0]}
                                      </div>
                                      <div>
                                        <div className="text-sm font-bold text-slate-900">{sug.reviewManager.first} {sug.reviewManager.last}</div>
                                        <div className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Reviewer • Sent {sug.reviewDate}</div>
                                      </div>
                                    </div>
                                    <button 
                                      onClick={() => { setSelectedReviewId(sug.id); setReviewMessage(sug.reviewMessage || ""); setSelectedManager(sug.reviewManager); setIsModalOpen(true); }}
                                      className="px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-xs font-bold text-purple-700 hover:bg-purple-50 transition-colors flex items-center gap-1.5 shadow-sm"
                                    >
                                      <RefreshCw className="w-3 h-3" /> Resend
                                    </button>
                                  </div>
                                  {sug.reviewMessage && (
                                    <div className="bg-white/80 p-3 rounded-xl border border-purple-50 text-sm text-slate-600 italic leading-relaxed relative">
                                      <Quote className="w-3 h-3 text-purple-200 absolute -top-1 -left-1 rotate-180" />
                                      "{sug.reviewMessage}"
                                    </div>
                                  )}
                                </div>
                              )}
                              <h3 className="font-bold text-slate-900 tracking-tight leading-snug text-xl">
                                {sug.oldTeams.length === 0 || sug.status === 'rejected' ? (
                                  <span><span className="text-slate-400 font-medium">New Team:</span> {sug.newTeams[0].name}</span>
                                ) : (
                                  getConversationalTitle(sug)
                                )}
                              </h3>
                              {!isCompletedVisual && <p className="text-base text-slate-500 mt-1.5 leading-relaxed">{getSuggestionInsight(sug)}</p>}
                            </div>

                            {(sug.status !== 'rejected' || !isCompletedVisual) && (
                              <div className="space-y-4 mt-4">
                                <div className="rounded-xl border border-[#909090] bg-white overflow-hidden">
                                  <div className="px-5 py-2 border-b flex items-center justify-between bg-white/40 border-slate-200/60 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                                    <div className="flex items-center gap-1.5"><Network className="w-3.5 h-3.5" /> {sug.structures.join(' • ')}</div>
                                    <button 
                                      onClick={() => {
                                        setSelectedTreeStructure(sug.structures[0]);
                                        setTreeSearchQuery(sug.newTeams[0].name);
                                        setIsTreeModalOpen(true);
                                      }} 
                                      className="text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 font-bold" 
                                      id={`view-tree-${sug.id}`}
                                    >
                                      View tree <ArrowRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                  <div className="p-6 flex flex-col md:flex-row items-start gap-8">
                                      <div className="flex-1 w-full space-y-3">
                                        <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider font-extrabold mb-1">Current survey</div>
                                        {sug.newTeams.map((t: any, i: number) => (
                                          <div key={i} className="p-3.5 rounded-xl border border-indigo-100 bg-white flex justify-between items-center shadow-sm font-bold text-indigo-950 tracking-tight">
                                            {t.name} 
                                            <button 
                                              onClick={() => { setSelectedEmployeesGroup(t); setIsEmployeeModalOpen(true); }}
                                              className="text-xs text-indigo-500 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors group/emp"
                                            >
                                              <Users className="w-3 h-3 transition-transform group-hover/emp:scale-110" /> 
                                              {t.size}
                                            </button>
                                          </div>
                                        ))}
                                      </div>
                                    <div className="w-11 h-11 rounded-full border bg-white flex items-center justify-center text-slate-300 shadow-sm shrink-0 rotate-90 md:rotate-0 mt-8"><ArrowLeft className="w-5 h-5" strokeWidth={2.5} /></div>
                                    <div className="flex-1 w-full space-y-3">
                                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-extrabold mb-1">{selectedSurvey}</div>
                                      {sug.oldTeams.length === 0 && linkingId !== sug.id ? (
                                        <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-300 bg-white/50 rounded-xl space-y-3">
                                          <div className="text-slate-400 text-sm italic font-medium">No match found in {selectedSurvey}</div>
                                          <button 
                                            onClick={() => handleAddLink(sug.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all shadow-sm"
                                            id={`add-link-btn-${sug.id}`}
                                          >
                                            <PlusCircle className="w-4 h-4" /> Add link
                                          </button>
                                        </div>
                                      ) : linkingId === sug.id ? (
                                        <div className="space-y-2 p-1">
                                          <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                                            <input 
                                              autoFocus
                                              type="text" 
                                              value={manualLinkSearchQuery}
                                              onChange={(e) => setManualLinkSearchQuery(e.target.value)}
                                              placeholder={`Search teams in ${selectedSurvey}...`}
                                              className="w-full bg-white border border-indigo-200 rounded-xl pl-9 pr-8 py-2 text-sm font-medium outline-none ring-2 ring-indigo-50"
                                            />
                                            <button onClick={() => setLinkingId(null)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                              <X className="w-4 h-4" />
                                            </button>
                                          </div>
                                          <div className="bg-white border border-slate-200 rounded-xl shadow-sm max-h-40 overflow-y-auto overflow-x-hidden p-1">
                                            {historicalTeamsDB
                                              .filter(t => t.name.toLowerCase().includes(manualLinkSearchQuery.toLowerCase()))
                                              .map((team, idx) => (
                                                <button 
                                                  key={idx}
                                                  onClick={() => handleSelectHistoricalTeam(sug.id, team)}
                                                  className="w-full flex items-center justify-between p-2 hover:bg-indigo-50 rounded-lg text-left text-xs transition-colors"
                                                >
                                                  <span className="font-bold text-slate-700">{team.name}</span>
                                                  <span className="text-slate-400"><Users className="w-3 h-3 inline mr-1" /> {team.size}</span>
                                                </button>
                                              ))}
                                            {historicalTeamsDB.filter(t => t.name.toLowerCase().includes(manualLinkSearchQuery.toLowerCase())).length === 0 && (
                                              <div className="p-3 text-center text-xs text-slate-400 italic">No results found</div>
                                            )}
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="space-y-3">
                                          {sug.oldTeams.map((t: any, i: number) => (
                                            <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-white flex justify-between items-center shadow-sm font-semibold text-slate-700 tracking-tight group relative">
                                              <div className="flex items-center justify-between w-full">
                                                <span>{t.name}</span>
                                                <div className="flex items-center gap-2">
                                                  <button 
                                                    onClick={() => { setSelectedEmployeesGroup(t); setIsEmployeeModalOpen(true); }}
                                                    className="text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5 font-bold transition-colors group/emp"
                                                  >
                                                    <Users className="w-3 h-3 transition-transform group-hover/emp:scale-110" /> 
                                                    {t.size}
                                                  </button>
                                                  {!isCompletedVisual && (
                                                    <button 
                                                      onClick={() => handleRemoveOldTeam(sug.id, t.name)}
                                                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 border border-slate-200 shadow-sm"
                                                    >
                                                      <X className="w-3.5 h-3.5" />
                                                    </button>
                                                  )}
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                          {!isCompletedVisual && sug.type !== 'MERGE' && sug.type !== 'SPLIT' && (
                                            <button 
                                              onClick={() => handleAddLink(sug.id)}
                                              className="w-full flex items-center justify-center gap-2 p-2 mt-2 border border-dashed border-slate-200 rounded-xl text-xs font-bold text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
                                            >
                                              <Plus className="w-3.5 h-3.5" /> Link another
                                            </button>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                {!isCompletedVisual && (
                                  <div className="flex items-center gap-2 py-1">
                                    <p className="text-[15px] text-slate-600 leading-tight"><span className="font-bold">Note:</span> If 'Do not link', {sug.newTeams.map((t: any) => `'${t.name}'`).join(' and ')} will start without historical data.</p>
                                    <div className="relative group ml-1 flex items-center">
                                      <Info className="w-[18px] h-[18px] text-slate-300 cursor-help" onMouseEnter={() => setHoveredInfoId(sug.id)} onMouseLeave={() => setHoveredInfoId(null)} />
                                      <AnimatePresence>
                                        {hoveredInfoId === sug.id && (
                                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-[11px] rounded-xl shadow-2xl z-50 pointer-events-none">
                                            Historical trends will not be connected to this team if you choose not to link.
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  </div>
                                )}

                                {!isCompletedVisual && (
                                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 pt-4">
                                    <button onClick={() => { setSelectedReviewId(sug.id); setIsModalOpen(true); }} className="text-sm font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-2 group" id={`request-review-${sug.id}`}><UserPlus className="w-4 h-4 group-hover:scale-110" /> Request review</button>
                                    <div className="flex items-center gap-3">
                                      <button onClick={() => handleAction(sug.id, 'rejected')} className="px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50" id={`reject-${sug.id}`}>Don't link</button>
                                      <button onClick={() => handleAction(sug.id, 'approved')} className="px-8 py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-sm shadow-md hover:bg-indigo-700 active:scale-95 transition-all flex items-center gap-2" id={`approve-${sug.id}`}><Check className="w-4 h-4" /> {sug.oldTeams.length === 0 ? 'Confirm new team' : 'Confirm mapping'}</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    <AnimatePresence>
        {selectedCardIds.length > 0 && (
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 z-[100] border border-slate-800">
            <div className="flex items-center gap-3 pr-6 border-r border-slate-700"><div className="w-7 h-7 bg-indigo-500 rounded-full flex items-center justify-center text-sm font-bold shadow-inner">{selectedCardIds.length}</div> <span className="text-sm font-bold">selected</span></div>
            <div className="flex items-center gap-3">
              <button onClick={() => handleBulkAction('approved')} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold shadow-md shadow-indigo-900/50" id="bulk-approve"><Check className="w-4 h-4 inline mr-1" strokeWidth={3} /> Confirm selected</button>
              <button onClick={() => handleBulkAction('rejected')} className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-bold" id="bulk-reject">Don't link</button>
            </div>
            <button onClick={() => setSelectedCardIds([])} className="p-2 text-slate-400 hover:text-white" id="clear-selection"><X className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isTreeModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsTreeModalOpen(false)}></motion.div>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col">
              <div className="p-6 border-b shrink-0 bg-white space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">System Structure Mappings</h2>
                    <p className="text-sm text-slate-500 font-medium">Analyze team hierarchy and linked {selectedSurvey} groups</p>
                  </div>
                  <button onClick={() => setIsTreeModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full transition-colors" id="close-tree-modal"><X className="w-6 h-6" /></button>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-4 items-end">
                  <div className="flex-1 space-y-1.5">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Search Teams</label>
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Find a specific team..." 
                        value={treeSearchQuery} 
                        onChange={(e) => setTreeSearchQuery(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 flex flex-col items-start">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Filter by status</label>
                    <div className="relative">
                      <button 
                        onClick={() => setIsTreeFilterDropdownOpen(!isTreeFilterDropdownOpen)}
                        className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 min-w-[180px] hover:border-slate-300 transition-all focus:ring-2 focus:ring-indigo-500/20"
                      >
                        <div className="flex items-center gap-2">
                          <Filter className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {treeStatusFilter.length === 0 ? 'All Statuses' : 
                             `${treeStatusFilter.length} Selected`}
                          </span>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isTreeFilterDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isTreeFilterDropdownOpen && (
                          <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsTreeFilterDropdownOpen(false)} />
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                            >
                              {['suggested', 'under_review', 'approved'].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => {
                                    setTreeStatusFilter(prev => 
                                      prev.includes(status) 
                                        ? prev.filter(s => s !== status) 
                                        : [...prev, status]
                                    );
                                  }}
                                  className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold transition-all hover:bg-slate-50 ${
                                    treeStatusFilter.includes(status) ? 'text-indigo-600' : 'text-slate-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                      status === 'suggested' ? 'bg-amber-400' :
                                      status === 'under_review' ? 'bg-purple-400' :
                                      'bg-green-400'
                                    }`} />
                                    <span className="capitalize">{status === 'under_review' ? 'Under Review' : status === 'approved' ? 'Linked' : status}</span>
                                  </div>
                                  {treeStatusFilter.includes(status) && <Check className="w-4 h-4" />}
                                </button>
                              ))}
                              <div className="p-2 bg-white border-t border-slate-100 flex gap-2">
                                <button 
                                  onClick={() => setTreeStatusFilter([])} 
                                  className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:bg-indigo-50 rounded"
                                >
                                  Reset
                                </button>
                                <button 
                                  onClick={() => setIsTreeFilterDropdownOpen(false)} 
                                  className="flex-1 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded"
                                >
                                  Done
                                </button>
                              </div>
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-1.5 min-w-[220px]">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Structure Type</label>
                    <div className="relative">
                      <select 
                        value={selectedTreeStructure} 
                        onChange={(e) => setSelectedTreeStructure(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-indigo-500/20"
                      >
                        {structureTypes.map(type => <option key={type} value={type}>{type}</option>)}
                      </select>
                      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto bg-white pb-10">
                <div className="max-w-4xl mx-auto px-8 pt-8">
                  <div className="grid grid-cols-[1fr_240px] gap-8 mb-4 px-4 py-2 bg-white rounded-lg border border-slate-200/60 shadow-sm">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                      <div className="w-1 h-3 bg-slate-300 rounded-full" />
                      Current Group
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 text-right justify-end pr-4">
                      <div className="w-1 h-3 bg-slate-300 rounded-full" />
                      Previous Survey Name
                    </div>
                  </div>
                </div>
                {filteredTreeData.length === 0 ? (
                  <div className="p-12 text-center">
                    <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-slate-800">No teams found</h3>
                    <p className="text-slate-500">Try searching for a different name or structure.</p>
                  </div>
                ) : (
                  filteredTreeData.map((node: any) => (
                    <UnifiedTreeNode 
                      key={node.id} 
                      node={node} 
                      level={0} 
                      expandedNodes={expandedTreeNodes} 
                      toggleNode={(id: string) => setExpandedTreeNodes(prev => ({ ...prev, [id]: prev[id] === false ? true : false }))} 
                      searchQuery={treeSearchQuery} 
                      onApprove={handleApproveTreeLink} 
                      onReject={handleRejectTreeLink} 
                      onAdd={handleAddTreeLink} 
                      linkingNodeId={treeLinkingNodeId}
                      setLinkingNodeId={setTreeLinkingNodeId}
                      historicalTeamsDB={historicalTeamsDB}
                      onSelectHistoricalTeam={handleSelectHistoricalFromTree}
                      onOpenEmployees={(group: any) => {
                        setSelectedEmployeesGroup(group);
                        setIsEmployeeModalOpen(true);
                      }}
                    />
                  ))
                )}
              </div>
              <div className="p-4 bg-white border-t flex justify-end px-6">
                <button onClick={() => setIsTreeModalOpen(false)} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg" id="close-tree-modal-btn">Close Structure</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 left-6 z-[200] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div key={t.id} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-4 pointer-events-auto border border-slate-700">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">{t.message}</span>
              <button onClick={() => removeToast(t.id)} className="text-slate-500 hover:text-white transition-colors" id={`close-toast-${t.id}`}><X className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></motion.div>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner"><UserPlus className="w-6 h-6" /></div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight">Request Review</h3>
                    <p className="text-sm text-indigo-600 font-medium">Internal verification</p>
                  </div>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all" id="close-review-modal"><X className="w-6 h-6" /></button>
              </div>

              <div className="mt-2 mb-6">
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  Ask a colleague to review this suggestion before confirming.
                </p>
              </div>

              {selectedReviewId && (() => {
                const sug = suggestions.find(s => s.id === selectedReviewId);
                if (!sug) return null;
                return (
                  <div className="mb-8 p-5 bg-slate-50/80 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex items-center gap-4">
                      <div className="flex-1 space-y-1">
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Current Team</div>
                        <div className="text-sm font-black text-slate-800">{sug.newTeams.map((t: any) => t.name).join(', ')}</div>
                      </div>
                      <div className="shrink-0 text-slate-300">
                        <ArrowLeft className="w-4 h-4" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{selectedSurvey}</div>
                        <div className="text-sm font-black text-slate-500 italic">
                          {sug.oldTeams.length > 0 ? sug.oldTeams.map((t: any) => t.name).join(', ') : 'Not linked'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
              
              <div className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">Assign Reviewer</label>
                  <div className="min-h-[56px] flex flex-wrap gap-2 p-2 px-3 border border-slate-200 rounded-2xl bg-white shadow-sm items-center cursor-text transition-shadow focus-within:ring-2 focus-within:ring-indigo-500/20" onClick={() => setShowManagerResults(true)}>
                    <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                    {selectedManager && (
                      <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 pl-1.5 pr-2 py-1 rounded-full text-sm font-bold border border-indigo-100 group/mchip transition-all">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] text-white ${selectedManager.color}`}>{selectedManager.first[0]}{selectedManager.last[0]}</div>
                        {selectedManager.first} {selectedManager.last}
                        <button 
                          onClick={(e) => { e.stopPropagation(); setSelectedManager(null); }}
                          className="p-0.5 hover:bg-indigo-200 rounded-full text-indigo-400 hover:text-indigo-700 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                    <input type="text" value={managerInputValue} onChange={(e) => setManagerInputValue(e.target.value)} onFocus={() => setShowManagerResults(true)} placeholder={!selectedManager ? "Find a manager..." : ""} className="flex-1 min-w-[120px] outline-none text-sm font-medium py-1 bg-transparent" />
                  </div>
                  <AnimatePresence>
                    {showManagerResults && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-[120] overflow-hidden p-1.5 max-h-64 overflow-y-auto">
                        {managersDB.map(m => (
                          <button key={m.id} onClick={() => { setSelectedManager(m); setShowManagerResults(false); }} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 text-left transition-colors">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-sm ${m.color}`}>{m.first[0]}{m.last[0]}</div>
                            <div className="flex-1"><div className="text-sm font-bold text-slate-900">{m.first} {m.last}</div><div className="text-xs text-slate-500 font-medium">{m.role}</div></div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {selectedManager?.id === managersDB[0].id ? (
                    <p className="mt-2 text-[11px] text-slate-500 pl-1 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300 flex items-center gap-2">
                       <div className="w-1 h-1 bg-slate-300 rounded-full" />
                      Auto-matched for this group in the system because its a local coordinator of this group
                    </p>
                  ) : (
                    <div className="mt-2 pl-1 animate-in fade-in slide-in-from-top-1 duration-300">
                      <button 
                        onClick={() => setSelectedManager(managersDB[0])}
                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700 flex items-center gap-2 group/restore"
                      >
                        <RefreshCw className="w-3 h-3 transition-transform group-hover/restore:rotate-180 duration-500" />
                        Restore auto-selected manager
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 pl-1">Review guidelines (Optional)</label>
                  <textarea value={reviewMessage} onChange={e => setReviewMessage(e.target.value)} className="w-full text-sm p-4 border border-slate-200 rounded-2xl outline-none min-h-[100px] resize-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-200 transition-all" placeholder="What specifically should they look for?" />
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                <div className="bg-white p-1 rounded-md shadow-sm border border-indigo-100">
                  <Quote className="w-3 h-3 text-indigo-400" />
                </div>
                <p className="text-[11px] text-indigo-700/80 leading-relaxed font-medium">
                  The reviewer will only see this specific suggestion — not the rest of your linking workspace.
                </p>
              </div>

              <div className="mt-8 flex items-center justify-end gap-3 pt-4 border-t border-slate-50">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors" id="cancel-review">Cancel</button>
                <button onClick={handleReviewSubmit} className="px-8 py-3 font-bold rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200 hover:bg-indigo-700 flex items-center gap-2 transition-all active:scale-95" id="send-review-request"><Send className="w-4 h-4" /> Send Request</button>
              </div>
            </motion.div>
          </div>
        )}
        {/* Employee List Modal */}
        <AnimatePresence>
          {isEmployeeModalOpen && selectedEmployeesGroup && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
                onClick={() => setIsEmployeeModalOpen(false)}
              />
              <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                exit={{ scale: 0.9, opacity: 0, y: 20 }} 
                className="relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
              >
                <div className="p-8 border-b border-slate-100 shrink-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <Users className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight">Group Members</h3>
                        <p className="text-sm text-indigo-600 font-medium">{selectedEmployeesGroup.name}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEmployeeModalOpen(false)} 
                      className="p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
                  <div className="sticky top-0 bg-white pt-6 pb-2 mb-2 z-10 border-b border-slate-50">
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      <span>Name</span>
                      <span>Role / ID</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {Array.from({ length: selectedEmployeesGroup.size }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-slate-50 transition-colors group/row">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-sm ${['bg-indigo-500', 'bg-emerald-500', 'bg-amber-500', 'bg-rose-500', 'bg-sky-500'][i % 5]}`}>
                            {['JD', 'AS', 'RK', 'ML', 'TH', 'BW', 'KP', 'LM'][i % 8]}
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover/row:text-indigo-600 transition-colors">
                              {['John Doe', 'Alice Smith', 'Robert King', 'Maria Lopez', 'Thomas Hall', 'Beth White', 'Kevin Pratt', 'Lisa Moon'][i % 8]}
                              {i === 0 && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded-md">MANAGER</span>}
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium leading-none mt-1">user_{1000 + i}@organization.com</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold text-slate-600">
                            {['Product Specialist', 'Senior Architect', 'Lead Designer', 'Backend Engineer', 'Data Analyst', 'Frontend Dev', 'Project Coordinator', 'QA Lead'][i % 8]}
                          </div>
                          <div className="text-[10px] font-mono text-slate-300 mt-1">#{Math.floor(100000 + Math.random() * 900000)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-8 border-t border-slate-50 bg-slate-50/50 shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-bold text-slate-500">
                      Total headcount: <span className="text-slate-900">{selectedEmployeesGroup.size}</span>
                    </div>
                    <button 
                      onClick={() => setIsEmployeeModalOpen(false)}
                      className="px-8 py-3 font-bold rounded-2xl bg-slate-900 text-white shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95 text-sm"
                    >
                      Close list
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </AnimatePresence>
      </div>
    </div>
  );
};

export default App;
