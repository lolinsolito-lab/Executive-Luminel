import React, { useState, useEffect } from 'react';
import {
    Users, CreditCard, Activity, TrendingUp, AlertTriangle,
    Search, Briefcase, DollarSign, BarChart3, PieChart,
    Crown, X, RefreshCw, Mail, Eye, Trash2, Home, Layout, LogOut
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { WarRoomPanel } from './WarRoomPanel';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RePieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

// --- TYPES ---
interface AdminProfile {
    id: string;
    email: string;
    full_name: string;
    company_name: string;
    subscription_tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE' | null;
    current_salary: number;
    target_salary: number;
    gap_value: number;
    updated_at: string;
    created_at: string; // Added created_at
    location: string;
    onboarding_completed: boolean;
    custom_token_limit?: number;
}

// --- MOCK DATA FOR CHARTS (Since we don't have historical data tables yet) ---
const REVENUE_DATA = [
    { day: '1', value: 1200 }, { day: '5', value: 1800 }, { day: '10', value: 2400 },
    { day: '15', value: 3200 }, { day: '20', value: 3800 }, { day: '25', value: 4500 },
    { day: '30', value: 5100 }
];

const COLORS = ['#94a3b8', '#3b82f6', '#eab308']; // Gray, Blue, Gold

export const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'war-room' | 'users' | 'subscriptions' | 'system'>('overview');
    const [users, setUsers] = useState<AdminProfile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // ANALYTICS STATE
    const [kpi, setKpi] = useState({
        mrr: 0,
        totalUsers: 0,
        partnerCount: 0,
        mercenaryCount: 0,
        avgGap: 0,
        arpu: 0,
        conversionRate: 0
    });

    const [chartData, setChartData] = useState({
        tierDist: [] as any[],
        companyDist: [] as any[]
    });

    // FETCH DATA
    const fetchAdminData = async () => {
        setLoading(true);
        try {
            // Fetch Profiles
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            const adminProfiles = (profiles || []) as AdminProfile[];
            setUsers(adminProfiles);

            // CALCULATE METRICS
            const total = adminProfiles.length;
            const partners = adminProfiles.filter(u => u.subscription_tier === 'EXECUTIVE').length;
            const mercenaries = adminProfiles.filter(u => u.subscription_tier === 'STRATEGIST' || u.subscription_tier === 'GRINDER').length;
            const paidUsers = partners + mercenaries;

            // Estimated MRR: Partner(299) + Mercenary(49)
            const mrr = (partners * 299) + (mercenaries * 49);

            // Avg Gap
            const totalGap = adminProfiles.reduce((acc, curr) => acc + (curr.gap_value || 0), 0);
            const avgGap = total > 0 ? Math.round(totalGap / total) : 0;

            // ARPU (Average Revenue Per User) -> Revenue / Total Active Paid Users
            // If strictly per "User" (including tourists), div by total. Usually ARPU is per paid user or total user depending on def.
            // Request says: "Total Rev / Active Users". Let's use Total Users for broad ARPU or Paid for ARPPU.
            // Using Total Users as requested "How valuable is a user?".
            const arpu = total > 0 ? Math.round(mrr / total) : 0;

            // Chart Data: Tiers
            const tiers = [
                { name: 'Tourist', value: total - paidUsers },
                { name: 'Mercenary', value: mercenaries },
                { name: 'Partner', value: partners }
            ];

            // Chart Data: Top Companies
            const companies = adminProfiles.reduce((acc, curr) => {
                const company = curr.company_name || 'Unknown';
                acc[company] = (acc[company] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const topCompanies = Object.entries(companies)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 5)
                .filter(c => c.name !== 'Unknown');

            setKpi({
                mrr,
                totalUsers: total,
                partnerCount: partners,
                mercenaryCount: mercenaries,
                avgGap,
                arpu,
                conversionRate: total > 0 ? Number(((paidUsers / total) * 100).toFixed(1)) : 0
            });

            setChartData({
                tierDist: tiers,
                companyDist: topCompanies
            });

        } catch (e) {
            console.error("Admin fetch error", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdminData();
    }, []);

    // RENDER HELPERS
    const formatCurrency = (val: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumSignificantDigits: 3 }).format(val);

    const filteredUsers = users.filter(u =>
        (u.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 text-corp-onyx font-sans selection:bg-corp-gold selection:text-black">
            {/* ADMIN HEADER */}
            <div className="border-b border-corp-border bg-[#FFFBF0] text-corp-onyx shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <Crown size={24} className="text-[#D4AF37]" strokeWidth={2.5} />
                            <h1 className="font-display font-bold text-xl tracking-[0.15em] uppercase text-[#0F172A]">
                                Admin <span className="text-[#D4AF37]">God Mode</span>
                            </h1>
                        </div>
                        <span className="px-2 py-0.5 bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold tracking-widest uppercase rounded-sm">
                            Restricted Access
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => fetchAdminData()} className="hover:text-[#D4AF37] transition-colors" title="Refresh Data"><RefreshCw size={18} /></button>
                        <div className="h-4 w-px bg-gray-300 mx-2" />
                        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-wider">
                            <Home size={16} /> <span className="hidden md:inline">Home</span>
                        </button>
                        <button onClick={() => window.location.href = '/'} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors text-xs font-bold uppercase tracking-wider">
                            <Layout size={16} /> <span className="hidden md:inline">App</span>
                        </button>
                        <div className="h-4 w-px bg-gray-300 mx-2" />
                        <button
                            onClick={async () => {
                                await supabase.auth.signOut();
                                window.location.href = '/';
                            }}
                            className="flex items-center gap-2 text-red-400 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-wider"
                        >
                            <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* TABS Navigation */}
                <div className="max-w-7xl mx-auto px-6 flex gap-8 overflow-x-auto">
                    {(['overview', 'war-room', 'users', 'subscriptions', 'system'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 text-xs font-bold uppercase tracking-[0.15em] transition-all border-b-2 ${activeTab === tab
                                ? 'border-[#D4AF37] text-[#0F172A]'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab.replace('-', ' ')}
                        </button>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto p-6">

                {/* WAR ROOM TAB (CMS) */}
                {activeTab === 'war-room' && <WarRoomPanel />}

                {/* OVERVIEW TAB (THE COCKPIT) */}
                {activeTab === 'overview' && (
                    <div className="space-y-8 animate-fade-in">
                        {/* ROW 1: KPI CARDS (METRICS GRID) */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatsCard
                                label="Total Revenue (MRR)"
                                value={formatCurrency(kpi.mrr)}
                                icon={<DollarSign size={18} />}
                                trend="+12% (30d)"
                                isGold
                                sparkline
                            />
                            <StatsCard
                                label="ARPU (User Value)"
                                value={formatCurrency(kpi.arpu)}
                                icon={<Activity size={18} />} // Activity icon for value/efficiency
                                subValue="Avg Rev / User"
                            />
                            <StatsCard
                                label="Pain Index (Avg Gap)"
                                value={formatCurrency(kpi.avgGap)}
                                icon={<AlertTriangle size={18} />}
                                subValue="Market Desperation"
                                isDanger
                            />
                            <StatsCard
                                label="Total Active Users"
                                value={kpi.totalUsers.toString()}
                                icon={<Users size={18} />}
                                subValue={`${kpi.partnerCount} Executive • ${kpi.mercenaryCount} Strat.`}
                            />
                        </div>

                        {/* ROW 2: CHARTS */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
                            {/* Chart A: Revenue */}
                            {/* Chart A: Capital Inflow */}
                            <div className="bg-white border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/5 p-6 rounded-sm col-span-2 relative">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-[#0F172A]/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                        <BarChart3 size={14} /> Capital Inflow
                                    </h3>
                                    <div className="flex gap-1 bg-gray-100 p-0.5 rounded-sm">
                                        {['24H', '7D', '30D', 'YTD'].map(t => (
                                            <button key={t} className={`px-2 py-1 text-[9px] font-bold rounded-sm transition-all ${t === '30D' ? 'bg-white shadow-sm text-[#0F172A]' : 'text-gray-400 hover:text-gray-600'}`}>
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <ResponsiveContainer width="100%" height="80%">
                                    <LineChart data={REVENUE_DATA}>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#FFF', borderColor: '#D4AF37', color: '#0F172A', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#D4AF37', fontSize: '12px', fontWeight: 'bold' }}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: '#D4AF37', stroke: '#FFF', strokeWidth: 2 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Chart B: Tier Distribution */}
                            {/* Chart B: Hierarchy Distribution */}
                            <div className="bg-white border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/5 p-6 rounded-sm flex flex-col items-center justify-center relative">
                                <h3 className="absolute top-5 left-6 text-[#0F172A]/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                    <PieChart size={14} /> Hierarchy
                                </h3>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-4">
                                    <span className="text-3xl font-display font-bold text-[#0F172A]">{kpi.totalUsers}</span>
                                    <span className="text-[9px] text-gray-400 uppercase tracking-widest">Active Agents</span>
                                </div>
                                <ResponsiveContainer width="100%" height="80%">
                                    <RePieChart>
                                        <Pie
                                            data={chartData.tierDist}
                                            innerRadius={75}
                                            outerRadius={90}
                                            paddingAngle={4}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {chartData.tierDist.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#FFF', borderColor: '#E2E8F0', borderRadius: '4px', fontSize: '12px' }} itemStyle={{ color: '#0F172A' }} />
                                    </RePieChart>
                                </ResponsiveContainer>
                                <div className="flex gap-3 text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gray-400" /> Analyst</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500" /> Strategist</div>
                                    <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Executive</div>
                                </div>
                            </div>
                        </div>

                        {/* Chart C: Top Companies (Bar) */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-white border border-[#D4AF37]/30 shadow-xl shadow-[#D4AF37]/5 p-6 rounded-sm">
                                <h3 className="text-[#0F172A]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                    <Briefcase size={14} /> Top Companies Identified
                                </h3>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData.companyDist} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#FFF', borderColor: '#E2E8F0', borderRadius: '4px', fontSize: '12px' }} itemStyle={{ color: '#0F172A' }} />
                                            <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SUBSCRIPTIONS TAB (THE LEDGER) */}
                {activeTab === 'subscriptions' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-display font-bold text-2xl text-corp-gold uppercase tracking-widest">The Ledger</h2>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-corp-onyx border border-white/20 hover:border-corp-gold text-xs uppercase tracking-wider transition-colors rounded-sm text-white">All Users</button>
                                <button className="px-4 py-2 bg-corp-onyx border border-white/20 hover:border-red-500 text-xs uppercase tracking-wider transition-colors rounded-sm text-red-400 flex items-center gap-2"><AlertTriangle size={12} /> At Risk</button>
                            </div>
                        </div>

                        <div className="bg-[#1E293B] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-black/40 text-xs text-gray-400 border-b border-white/10 uppercase tracking-widest">
                                        <th className="p-4 font-normal">Agent Identity</th>
                                        <th className="p-4 font-normal">Rank (Tier)</th>
                                        <th className="p-4 font-normal">Pain (Gap)</th>
                                        <th className="p-4 font-normal">Last Active</th>
                                        <th className="p-4 font-normal">Whale Signal</th>
                                        <th className="p-4 font-normal text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map(user => {
                                        const isWhale = (user.gap_value < -20000) || ['Deloitte', 'KPMG', 'Accenture', 'McKinsey'].some(c => (user.company_name || '').includes(c));

                                        return (
                                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                                                <td className="p-4">
                                                    <div className="font-bold text-white text-sm">{user.full_name || 'Agente Anonimo'}</div>
                                                    <div className="text-[10px] text-gray-500 font-mono uppercase">{user.company_name || 'Freelance'}</div>
                                                    <div className="text-[9px] text-gray-600">{user.email}</div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-wider border rounded-sm ${user.subscription_tier === 'EXECUTIVE' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' :
                                                        user.subscription_tier === 'STRATEGIST' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                                                            'bg-gray-800 text-gray-400 border-gray-700'
                                                        }`}>
                                                        {user.subscription_tier === 'EXECUTIVE' ? 'THE EXECUTIVE' :
                                                            user.subscription_tier === 'STRATEGIST' ? 'THE STRATEGIST' : 'THE ANALYST'}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-sm font-mono text-red-400">
                                                    {user.gap_value ? formatCurrency(user.gap_value) : '-'}
                                                </td>
                                                <td className="p-4 text-xs text-gray-400">
                                                    {user.updated_at ? new Date(user.updated_at).toLocaleDateString('it-IT') : '-'}
                                                </td>
                                                <td className="p-4">
                                                    {isWhale && (
                                                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-900/20 border border-emerald-500/30 rounded-full w-fit">
                                                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">High Potential</span>
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4 text-right">
                                                    <EditUserButton
                                                        user={user}
                                                        onUpdate={() => fetchAdminData()}
                                                        customTrigger={
                                                            <button className="text-gray-500 hover:text-[#D4AF37] transition-colors text-xs uppercase underline decoration-gray-300 hover:decoration-[#D4AF37] underline-offset-4">
                                                                Manage
                                                            </button>
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* USERS TAB (Simple List with GOD MODE) */}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Search & Filters */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                                <input
                                    type="text"
                                    placeholder="Search agents by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-corp-onyx border border-white/20 rounded-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-corp-gold/50"
                                />
                            </div>
                        </div>

                        <div className="bg-[#1E293B] border border-white/10 rounded-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-black/20 text-xs text-gray-500 uppercase tracking-widest">
                                    <tr>
                                        <th className="p-4">Agent Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Rank Identity</th>
                                        <th className="p-4">Location</th>
                                        <th className="p-4 text-right">God Mode</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold">{user.full_name}</td>
                                            <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm ${user.subscription_tier === 'EXECUTIVE' ? 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30' :
                                                    user.subscription_tier === 'STRATEGIST' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                                                        'bg-gray-800 text-gray-400 border-gray-700'
                                                    }`}>
                                                    {user.subscription_tier === 'EXECUTIVE' ? 'THE EXECUTIVE' :
                                                        user.subscription_tier === 'STRATEGIST' ? 'THE STRATEGIST' : 'THE ANALYST'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-gray-500 text-xs">{user.location}</td>
                                            <td className="p-4 text-right">
                                                <EditUserButton user={user} onUpdate={() => fetchAdminData()} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* SYSTEM TAB PLACEHOLDER */}
                {activeTab === 'system' && (
                    <div className="flex items-center justify-center h-96 text-gray-500 border border-dashed border-gray-700 rounded-sm uppercase tracking-widest">
                        Module Under Construction
                    </div>
                )}
            </div>

        </div>
    );
};

// --- SUB-COMPONENTS ---

// --- SUB-COMPONENTS ---

const StatsCard = ({ label, value, icon, subValue, trend, isGold, isDanger, sparkline }: any) => (
    <div className={`p-6 border rounded-sm shadow-xl relative overflow-hidden group transition-all bg-white border-[#D4AF37]/30 shadow-[#D4AF37]/5`}>
        <div className="flex justify-between items-start mb-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0F172A]/60">
                {label}
            </h3>
            <div className={`p-2 rounded-full ${isGold ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : isDanger ? 'bg-red-500/10 text-red-500' : 'bg-gray-100 text-gray-400'}`}>
                {icon}
            </div>
        </div>
        <div className="text-3xl font-display font-bold tracking-tight mb-2 text-[#0F172A]">
            {value}
        </div>

        {/* Sparkline & Subvalues */}
        <div className="flex flex-col gap-1">
            {(subValue || trend) && (
                <div className="flex items-center gap-2 text-[10px] font-mono">
                    {trend && <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-sm">{trend}</span>}
                    {subValue && <span className="text-gray-400">{subValue}</span>}
                </div>
            )}
            {sparkline && (
                <div className="mt-2 text-[9px] text-gray-400 font-mono border-t border-gray-100 pt-2 flex justify-between">
                    <span>€1.2k Today</span>
                    <span>€8.5k This Week</span>
                </div>
            )}
        </div>
    </div>
);

// --- GOD MODE EDITOR COMPONENT ---
const EditUserButton = ({ user, onUpdate, customTrigger }: { user: AdminProfile, onUpdate: () => void, customTrigger?: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [tier, setTier] = useState<'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'>(user.subscription_tier || 'GRINDER');
    const [tokens, setTokens] = useState<number | string>(user.custom_token_limit || '');
    const [loading, setLoading] = useState(false);

    const handleSave = async () => {
        setLoading(true);
        try {
            const updates: any = {
                subscription_tier: tier,
                updated_at: new Date().toISOString()
            };

            if (tokens !== '') {
                updates.custom_token_limit = Number(tokens);
            }

            // @ts-ignore
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            setIsOpen(false);
            onUpdate();
        } catch (e) {
            console.error("Update failed", e);
            alert("Update Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {customTrigger ? (
                <div onClick={() => setIsOpen(true)}>{customTrigger}</div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 bg-gray-800 hover:bg-corp-gold hover:text-black text-gray-400 rounded-sm transition-all shadow-lg"
                    title="Modify Protocol"
                >
                    <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        <span>Edit</span>
                    </div>
                </button>
            )}

            {isOpen && (
                <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white border border-[#D4AF37] p-8 max-w-md w-full shadow-[0_0_50px_rgba(212,175,55,0.2)] rounded-sm relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex items-center gap-3 text-[#D4AF37] mb-6 border-b border-[#D4AF37]/20 pb-4">
                            <Crown size={24} />
                            <h3 className="font-display font-bold text-xl uppercase tracking-widest text-[#0F172A]">Modify User Protocol</h3>
                        </div>

                        <div className="space-y-6">
                            {/* USER INFO */}
                            <div className="p-3 bg-gray-50 rounded-sm mb-4 border border-gray-100">
                                <div className="text-sm font-bold text-[#0F172A]">{user.full_name}</div>
                                <div className="text-xs text-gray-400 font-mono">{user.email}</div>
                            </div>

                            {/* TIER SELECTOR */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">Start Protocol (Tier)</label>
                                <select
                                    value={tier || 'GRINDER'}
                                    onChange={(e) => setTier(e.target.value as any)}
                                    className="w-full bg-white border border-gray-200 p-3 text-[#0F172A] focus:ring-2 focus:ring-[#D4AF37] rounded-sm font-serif outline-none"
                                >
                                    <option value="GRINDER">THE ANALYST (Tourist)</option>
                                    <option value="STRATEGIST">THE STRATEGIST (Mercenary)</option>
                                    <option value="EXECUTIVE">THE EXECUTIVE (Partner)</option>
                                </select>
                            </div>

                            {/* TOKEN GRANT */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">Grant AI Tokens (Override)</label>
                                <input
                                    type="number"
                                    value={tokens}
                                    onChange={(e) => setTokens(e.target.value)}
                                    placeholder="Enter total token limit..."
                                    className="w-full bg-white border border-gray-200 p-3 text-[#0F172A] focus:ring-2 focus:ring-[#D4AF37] rounded-sm font-serif outline-none placeholder:text-gray-300"
                                />
                                <p className="text-[9px] text-gray-400 italic">*Leave empty to use default tier limits.</p>
                            </div>

                            {/* ACTIONS */}
                            <div className="pt-4 flex gap-3">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B4941F] text-white font-bold uppercase tracking-widest shadow-lg rounded-sm transition-all"
                                >
                                    {loading ? 'Overwriting...' : 'Save Protocol'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
