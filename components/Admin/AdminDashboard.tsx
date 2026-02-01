import { WarRoomPanel } from './WarRoomPanel';

// ... existing code ...

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
    const [activeTab, setActiveTab] = useState<'overview' | 'war-room' | 'users' | 'subscriptions' | 'system'>('overview');
    // ... existing code ...
    {/* Navigation Tabs */ }
    <div className="border-b border-corp-border">
        <div className="max-w-7xl mx-auto px-4 flex gap-1">
            {(['overview', 'war-room', 'users', 'subscriptions', 'system'] as const).map(tab => (
                // ... existing code ...
                {/* Content */ }
                < div className = "max-w-7xl mx-auto p-6" >

                {/* WAR ROOM TAB (CMS) */ }
                { activeTab === 'war-room' && <WarRoomPanel />}

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <MetricCard icon={Users} label="Total Users" value={metrics.totalUsers.toLocaleString()} trend={+12.5} />
                        <MetricCard icon={Activity} label="Active Today" value={metrics.activeToday.toString()} trend={+8.2} />
                        <MetricCard icon={CreditCard} label="MRR" value={`€${metrics.totalMRR.toLocaleString()}`} trend={+15.3} color="gold" />
                        <MetricCard icon={TrendingUp} label="Conversion" value={`${metrics.conversionRate}%`} trend={+0.5} />
                        <MetricCard icon={AlertCircle} label="Churn Rate" value={`${metrics.churnRate}%`} trend={-0.3} negative />
                        <MetricCard icon={Clock} label="Avg Session" value={metrics.avgSessionTime} />
                    </div>

                    {/* Tier Distribution */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <TierCard tier="GRINDER" count={tierStats.GRINDER} icon={Shield} color="silver" />
                        <TierCard tier="STRATEGIST" count={tierStats.STRATEGIST} icon={Zap} color="blue" mrr={49 * tierStats.STRATEGIST} />
                        <TierCard tier="EXECUTIVE" count={tierStats.EXECUTIVE} icon={Crown} color="gold" mrr={299 * tierStats.EXECUTIVE} />
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-6">
                        <h3 className="font-display font-bold text-corp-platinum mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                            <ActivityItem type="signup" message="Marco R. upgraded to EXECUTIVE" time="2 min ago" />
                            <ActivityItem type="payment" message="Payment €49 received from Elena S." time="15 min ago" />
                            <ActivityItem type="signup" message="New GRINDER signup: Alessandro B." time="1h ago" />
                            <ActivityItem type="churn" message="Luca M. subscription cancelled" time="3h ago" />
                        </div>
                    </div>
                </div>
            )}

            {/* USERS TAB */}
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
                                className="w-full pl-10 pr-4 py-3 bg-corp-bg border border-corp-border rounded-sm text-corp-platinum placeholder:text-corp-silver/50 focus:outline-none focus:border-corp-gold/50"
                            />
                        </div>
                        <button className="px-4 py-3 bg-corp-bg border border-corp-border rounded-sm text-corp-silver hover:text-corp-gold hover:border-corp-gold/30 transition-colors flex items-center gap-2">
                            <Filter size={18} />
                            Filters
                        </button>
                    </div>

                    {/* Users Table */}
                    <div className="bg-corp-bg/50 border border-corp-border rounded-sm overflow-x-auto">
                        <table className="w-full min-w-[800px]">
                            <thead className="bg-corp-onyx/50">
                                <tr className="text-left text-[10px] font-mono text-corp-silver uppercase tracking-wider">
                                    <th className="px-4 py-3">User</th>
                                    <th className="px-4 py-3">Tier</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">MRR</th>
                                    <th className="px-4 py-3">Last Active</th>
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                                    <span className="text-sm text-corp-platinum capitalize">{user.status}</span>
                                </div>
                            </td>
                            <td className="px-4 py-4 text-corp-gold font-mono">
                                €{user.mrr}
                            </td>
                            <td className="px-4 py-4 text-corp-silver text-sm">
                                {user.lastActive}
                            </td>
                            <td className="px-4 py-4">
                                <div className="flex items-center gap-2">
                                    <button className="p-1.5 hover:bg-white/10 rounded text-corp-silver hover:text-corp-platinum transition-colors">
                                        <Eye size={14} />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded text-corp-silver hover:text-corp-blue transition-colors">
                                        <Mail size={14} />
                                    </button>
                                    <button className="p-1.5 hover:bg-white/10 rounded text-corp-silver hover:text-corp-danger transition-colors">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                                ))}
                    </tbody>
                </table>
                    </div>
    </div>
            )}

{/* SUBSCRIPTIONS TAB */ }
{
    activeTab === 'subscriptions' && (
        <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
                {/* Active Subscriptions */}
                <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-6">
                    <h3 className="font-display font-bold text-corp-platinum mb-4">Active Subscriptions</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-corp-border">
                            <span className="text-corp-silver">STRATEGIST (€49)</span>
                            <span className="text-corp-platinum font-bold">{tierStats.STRATEGIST}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-corp-border">
                            <span className="text-corp-silver">EXECUTIVE (€299)</span>
                            <span className="text-corp-platinum font-bold">{tierStats.EXECUTIVE}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-corp-gold font-bold">Total MRR</span>
                            <span className="text-corp-gold font-bold text-xl">€{metrics.totalMRR.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Stripe Actions */}
                <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-6">
                    <h3 className="font-display font-bold text-corp-platinum mb-4">Stripe Integration</h3>
                    <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-[#635BFF]/20 border border-[#635BFF]/30 text-[#635BFF] rounded-sm hover:bg-[#635BFF]/30 transition-colors flex items-center justify-center gap-2">
                            <ExternalLink size={16} />
                            Open Stripe Dashboard
                        </button>
                        <button className="w-full px-4 py-3 bg-corp-bg border border-corp-border text-corp-silver rounded-sm hover:text-corp-platinum hover:border-corp-platinum/30 transition-colors flex items-center justify-center gap-2">
                            <RefreshCw size={16} />
                            Sync Subscriptions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

{/* SYSTEM TAB */ }
{
    activeTab === 'system' && (
        <div className="space-y-6 animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
                {/* System Status */}
                <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-6">
                    <h3 className="font-display font-bold text-corp-platinum mb-4">System Status</h3>
                    <div className="space-y-3">
                        <StatusItem label="Vercel (Frontend)" status="operational" />
                        <StatusItem label="Supabase (Database)" status="operational" />
                        <StatusItem label="Stripe (Payments)" status="operational" />
                        <StatusItem label="Gemini AI" status="operational" />
                        <StatusItem label="Resend (Email)" status="configured" />
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-6">
                    <h3 className="font-display font-bold text-corp-platinum mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-corp-bg border border-corp-border text-corp-silver rounded-sm hover:text-corp-gold hover:border-corp-gold/30 transition-colors text-left">
                            📧 Send Test Email
                        </button>
                        <button className="w-full px-4 py-3 bg-corp-bg border border-corp-border text-corp-silver rounded-sm hover:text-corp-gold hover:border-corp-gold/30 transition-colors text-left">
                            🔄 Clear Cache
                        </button>
                        <button className="w-full px-4 py-3 bg-corp-bg border border-corp-border text-corp-silver rounded-sm hover:text-corp-gold hover:border-corp-gold/30 transition-colors text-left">
                            📊 Export Analytics
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
        </div >
    </div >
    );
};

// Sub-components
const MetricCard: React.FC<{
    icon: React.ElementType;
    label: string;
    value: string;
    trend?: number;
    negative?: boolean;
    color?: 'gold' | 'blue' | 'default';
}> = ({ icon: Icon, label, value, trend, negative, color = 'default' }) => (
    <div className="bg-corp-bg/50 border border-corp-border rounded-sm p-4">
        <div className="flex items-center gap-2 mb-2">
            <Icon size={14} className="text-corp-silver" />
            <span className="text-[10px] text-corp-silver font-mono uppercase">{label}</span>
        </div>
        <div className={`text-xl font-bold ${color === 'gold' ? 'text-corp-gold' : color === 'blue' ? 'text-corp-blue' : 'text-corp-platinum'}`}>
            {value}
        </div>
        {trend !== undefined && (
            <div className={`flex items-center gap-1 text-xs mt-1 ${negative ? (trend < 0 ? 'text-emerald-500' : 'text-red-500') : (trend > 0 ? 'text-emerald-500' : 'text-red-500')}`}>
                {trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {Math.abs(trend)}%
            </div>
        )}
    </div>
);

const TierCard: React.FC<{ tier: string; count: number; icon: React.ElementType; color: string; mrr?: number }> = ({ tier, count, icon: Icon, color, mrr }) => (
    <div className={`bg-corp-bg/50 border border-corp-${color}/30 rounded-sm p-6`}>
        <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 bg-corp-${color}/10 rounded`}>
                <Icon size={20} className={`text-corp-${color}`} />
            </div>
            <h3 className={`font-display font-bold text-corp-${color}`}>THE {tier}</h3>
        </div>
        <div className="text-3xl font-bold text-corp-platinum mb-1">{count.toLocaleString()}</div>
        <div className="text-sm text-corp-silver">
            {mrr ? `€${mrr.toLocaleString()}/mo` : 'Free users'}
        </div>
    </div>
);

const ActivityItem: React.FC<{ type: 'signup' | 'payment' | 'churn'; message: string; time: string }> = ({ type, message, time }) => {
    const icons = { signup: CheckCircle, payment: CreditCard, churn: AlertCircle };
    const colors = { signup: 'text-emerald-500', payment: 'text-corp-gold', churn: 'text-red-500' };
    const Icon = icons[type];

    return (
        <div className="flex items-center gap-3 py-2">
            <Icon size={16} className={colors[type]} />
            <span className="text-corp-platinum text-sm flex-1">{message}</span>
            <span className="text-corp-silver text-xs">{time}</span>
        </div>
    );
};

const StatusItem: React.FC<{ label: string; status: 'operational' | 'degraded' | 'configured' }> = ({ label, status }) => (
    <div className="flex items-center justify-between py-2">
        <span className="text-corp-silver">{label}</span>
        <span className={`px-2 py-1 text-[9px] font-mono uppercase rounded-sm ${status === 'operational' ? 'bg-emerald-500/20 text-emerald-500' :
            status === 'configured' ? 'bg-corp-blue/20 text-corp-blue' :
                'bg-yellow-500/20 text-yellow-500'
            }`}>
            {status}
        </span>
    </div>
);

export default AdminDashboard;
