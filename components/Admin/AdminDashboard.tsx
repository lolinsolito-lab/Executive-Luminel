import React, { useState, useEffect } from 'react';
import {
    Users, CreditCard, Activity, TrendingUp, AlertTriangle,
    Search, Briefcase, DollarSign, BarChart3, PieChart,
    Crown, X, RefreshCw, Mail, Eye, Trash2
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
        <div className="min-h-screen bg-corp-onyx text-corp-white font-sans selection:bg-corp-gold selection:text-black">
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

                    <div className="flex items-center gap-6">
                        <button onClick={() => fetchAdminData()} className="hover:text-[#D4AF37] transition-colors"><RefreshCw size={18} /></button>
                        <button onClick={() => window.location.href = '/'} className="hover:text-red-500 transition-colors"><X size={18} /></button>
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
                        {/* ROW 1: KPI CARDS */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <StatsCard
                                label="Monthly Recurring Revenue"
                                value={formatCurrency(kpi.mrr)}
                                icon={<DollarSign className="text-emerald-500" />}
                                trend="+12% (30d)"
                                isGold
                            />
                            <StatsCard
                                label="Total Active Users"
                                value={kpi.totalUsers.toString()}
                                icon={<Users className="text-blue-500" />}
                                subValue={`${kpi.partnerCount} Partner • ${kpi.mercenaryCount} Merc.`}
                            />
                            <StatsCard
                                label="Conversion Rate"
                                value={`${kpi.conversionRate}%`}
                                icon={<TrendingUp className="text-purple-500" />}
                                trend="Top 5% Industry"
                            />
                            <StatsCard
                                label="Avg. User Pain (Gap)"
                                value={formatCurrency(kpi.avgGap)}
                                icon={<AlertTriangle className="text-red-500" />}
                                subValue="High Upsell Potential"
                                isDanger
                            />
                        </div>

                        {/* ROW 2: CHARTS */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
                            {/* Chart A: Revenue */}
                            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-sm shadow-xl col-span-2 relative overlow-hidden">
                                <h3 className="text-corp-silver text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <BarChart3 size={14} /> Revenue Growth (30 Days)
                                </h3>
                                <ResponsiveContainer width="100%" height="85%">
                                    <LineChart data={REVENUE_DATA}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="day" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val) => `€${val}`} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0F172A', borderColor: '#D4AF37', color: '#FFF' }}
                                            itemStyle={{ color: '#D4AF37' }}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="#D4AF37" strokeWidth={3} dot={{ r: 4, fill: '#D4AF37' }} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Chart B: Tier Distribution */}
                            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-sm shadow-xl flex flex-col items-center justify-center relative">
                                <h3 className="absolute top-5 left-5 text-corp-silver text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <PieChart size={14} /> Tier Distribution
                                </h3>
                                <ResponsiveContainer width="100%" height="80%">
                                    <RePieChart>
                                        <Pie
                                            data={chartData.tierDist}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {chartData.tierDist.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155' }} />
                                    </RePieChart>
                                </ResponsiveContainer>
                                <div className="flex gap-4 text-[10px] text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gray-400" /> Tourist</div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500" /> Mercenary</div>
                                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500" /> Partner</div>
                                </div>
                            </div>
                        </div>

                        {/* Chart C: Top Companies (Bar) */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-[#1E293B] border border-white/10 p-5 rounded-sm shadow-xl">
                                <h3 className="text-corp-silver text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Briefcase size={14} /> Top Companies Identified
                                </h3>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData.companyDist} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                            <XAxis type="number" hide />
                                            <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155' }} />
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
                                        <th className="p-4 font-normal">Clearance</th>
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
                                                            user.subscription_tier === 'STRATEGIST' || user.subscription_tier === 'GRINDER' ? 'bg-blue-900/30 text-blue-400 border-blue-500/30' :
                                                                'bg-gray-800 text-gray-500 border-gray-700'
                                                        }`}>
                                                        {user.subscription_tier || 'TOURIST'}
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
                                                    <button className="text-gray-500 hover:text-white transition-colors text-xs uppercase underline decoration-gray-700 hover:decoration-white underline-offset-4">
                                                        Manage
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* USERS TAB (Simple List) */}
                {activeTab === 'users' && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Search & Filters */}
                        <div className="flex gap-4">
                            <div className="flex-1 relative">
                                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-corp-silver" />
                                <input
                                    type="text"
                                    placeholder="Search users by name or email..."
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
                                        <th className="p-4">Name</th>
                                        <th className="p-4">Email</th>
                                        <th className="p-4">Tier</th>
                                        <th className="p-4">Location</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredUsers.map(user => (
                                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-bold">{user.full_name}</td>
                                            <td className="p-4 text-gray-400 text-sm">{user.email}</td>
                                            <td className="p-4 text-corp-gold text-xs font-mono">{user.subscription_tier}</td>
                                            <td className="p-4 text-gray-500 text-xs">{user.location}</td>
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

const StatsCard = ({ label, value, icon, subValue, trend, isGold, isDanger }: any) => (
    <div className={`p-6 border rounded-sm shadow-lg relative overflow-hidden group transition-all ${isGold ? 'bg-gradient-to-br from-[#FFFBF0] to-white border-[#D4AF37] text-[#0F172A]' :
            'bg-[#1E293B] border-white/10 text-white hover:border-gray-600'
        }`}>
        <div className="flex justify-between items-start mb-4">
            <h3 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isGold ? 'text-[#D4AF37]' : 'text-gray-400'}`}>
                {label}
            </h3>
            <div className={`p-2 rounded-full ${isGold ? 'bg-[#D4AF37]/10' : 'bg-white/5'}`}>
                {icon}
            </div>
        </div>
        <div className={`text-3xl font-display font-bold tracking-tight mb-2 ${isDanger ? 'text-red-500' : ''}`}>
            {value}
        </div>
        {(subValue || trend) && (
            <div className="flex items-center gap-2 text-[10px] font-mono">
                {trend && <span className="text-emerald-500 font-bold">{trend}</span>}
                {subValue && <span className={`${isGold ? 'text-gray-500' : 'text-gray-500'}`}>{subValue}</span>}
            </div>
        )}
    </div>
);
