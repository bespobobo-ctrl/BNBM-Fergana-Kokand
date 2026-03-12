import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TrendingUp, TrendingDown, AlertTriangle, Package, Users, Building2,
    CreditCard, ArrowUpRight, Bot, Bell, ChevronRight, DollarSign,
    ShoppingCart, Cpu, HardDrive, Globe, RefreshCcw, Box, Clock,
    Archive, Plus, HardHat, Settings2, Info, PlusCircle, CheckCircle2,
    UserCircle, ShieldCheck, BarChart3, ShieldAlert, Search, Target, Layers,
    Info as InfoIcon
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { toast } from 'react-hot-toast';
import {
    monthlyStats, branches, weeklyChartData, recentPayments,
    formatMoney, formatFullMoney, debts, systemErrors, adminStats,
    products, categories
} from '../data/mockData';
import StorekeeperDashboard from './StorekeeperDashboard';
import './Dashboard.css';

export default function Dashboard({ user }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('haftalik'); // Added state for chart

    const overdueDebts = debts.filter(d => d.status === 'overdue');

    // Admin Dashboard View
    if (user.role === 'admin') {
        return (
            <div className="page dashboard-page">
                <header className="premium-header">
                    <div className="header-left">
                        <div className="title-area">
                            <h1 className="premium-title">Tizim Ma'lumotlari</h1>
                            <div className="live-badge">
                                <span className="dot"></span>
                                SYSTEM UP
                            </div>
                        </div>
                        <p className="premium-subtitle">
                            <Settings2 size={14} className="icon-emerald" />
                            <span>BNBM PRO • Admin Console • {adminStats.uptime}</span>
                        </p>
                    </div>
                </header>

                <div className="stats-grid-modern">
                    <div className="kpi-card">
                        <div className="kpi-header-modern">
                            <div className="kpi-icon-wrap text-blue-400"><Cpu size={18} /></div>
                            <span className="kpi-lab">Server Yuklanishi</span>
                        </div>
                        <span className="kpi-val">{adminStats.serverLoad}</span>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-header-modern">
                            <div className="kpi-icon-wrap text-emerald-400"><HardDrive size={18} /></div>
                            <span className="kpi-lab">Baza Hajmi</span>
                        </div>
                        <span className="kpi-val">{adminStats.databaseSize}</span>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-header-modern">
                            <div className="kpi-icon-wrap text-purple-400"><Users size={18} /></div>
                            <span className="kpi-lab">Faol Foydalanuvchilar</span>
                        </div>
                        <span className="kpi-val">{adminStats.activeUsers}</span>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-header-modern">
                            <div className="kpi-icon-wrap text-orange-400"><ShieldAlert size={18} /></div>
                            <span className="kpi-lab">Xavfsizlik</span>
                        </div>
                        <span className="kpi-val text-emerald-400">Normal</span>
                    </div>
                </div>

                <section className="mt-8">
                    <h2 className="section-title-modern mb-4"><ShieldAlert size={18} className="text-red-500" /> Oxirgi Xatoliklar</h2>
                    <div className="grid gap-3">
                        {systemErrors.map(err => (
                            <div key={err.id} className="error-item-modern flex justify-between items-center">
                                <div>
                                    <h4 className="text-sm font-bold text-white">{err.type}</h4>
                                    <p className="text-xs text-gray-400">{err.time} • {err.status}</p>
                                </div>
                                <button className="tab-btn active !bg-red-500/20 !text-red-500 !px-3 !py-1">Ko'rish</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        );
    }

    if (user.role === 'storekeeper') {
        return <StorekeeperDashboard user={user} />;
    }

    // Director & Seller Dashboard View
    return (
        <div className="page dashboard-page">
            <header className="premium-header">
                <div className="header-left">
                    <h1 className="header-title">Boshqaruv Paneli</h1>
                    <p className="header-subtitle">
                        <ShieldCheck size={14} className="icon-emerald" />
                        <span>BNBM PRO • {user.role.toUpperCase()}</span>
                    </p>
                </div>
                <div className="header-right">
                    <button className="icon-action-btn">
                        <Bell size={20} />
                        <span className="dot-alert"></span>
                    </button>
                    <div className="user-avatar-trigger" onClick={() => navigate('/settings')}>
                        <UserCircle size={24} />
                    </div>
                </div>
            </header>

            {/* AI Insight Section */}
            <div className="mb-8">
                <div className="ai-insight-premium" onClick={() => navigate('/ai')}>
                    <div className="ai-insight-bg-glow"></div>
                    <div className="ai-insight-content">
                        <div className="ai-insight-icon-wrap">
                            <Bot size={28} className="ai-insight-icon" />
                        </div>
                        <div className="ai-insight-text-area">
                            <div className="ai-insight-header">
                                <h4>AI Tahlil • Bugun</h4>
                                <div className="pulse-dot"></div>
                            </div>
                            <p>Savdo dinamikasi kutilganidan <span>15.4% yuqori</span>. Mahsulot zaxirasini <span className="highlight-badge">{formatMoney(45000000)}</span> ga oshirish tavsiya etiladi.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="stats-main-grid">
                {/* Total Sales */}
                <div className="stats-card-base" onClick={() => navigate('/reports')}>
                    <div className="stats-card-content">
                        <div className="kpi-card-header">
                            <span className="stats-card-title">Umumiy Sotuv</span>
                            <div className="kpi-icon-box blue"><Search size={18} /></div>
                        </div>
                        <div className="kpi-body">
                            <div className="stats-card-value">2.5</div>
                            <div className="kpi-value-unit">mlrd so'm</div>
                        </div>
                        <div className="kpi-footer-area">
                            <div className="kpi-mini-bar">
                                <div className="kpi-mini-bar-fill blue" style={{ width: '75%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Daily Sales */}
                <div className="stats-card-base" onClick={() => navigate('/reports')}>
                    <div className="stats-card-content">
                        <div className="kpi-card-header">
                            <span className="stats-card-title">Bugungi Savdo</span>
                            <div className="kpi-icon-box emerald"><Target size={18} /></div>
                        </div>
                        <div className="kpi-body">
                            <div className="stats-card-value">46</div>
                            <div className="kpi-value-unit">mln so'm</div>
                        </div>
                        <div className="kpi-footer-area">
                            <div className="kpi-trend-badge up">
                                <TrendingUp size={14} />
                                <span style={{ marginLeft: '4px' }}>+12.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Total Debts */}
                <div className="stats-card-base" onClick={() => navigate('/debts')}>
                    <div className="stats-card-content">
                        <div className="kpi-card-header">
                            <span className="stats-card-title">Jami Qarzlar</span>
                            <div className="kpi-icon-box orange"><Layers size={18} /></div>
                        </div>
                        <div className="kpi-body">
                            <div className="stats-card-value">668</div>
                            <div className="kpi-value-unit">mln so'm</div>
                        </div>
                        <div className="kpi-footer-area">
                            <div className="kpi-mini-bar">
                                <div className="kpi-mini-bar-fill orange" style={{ width: '60%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overdue */}
                <div className="stats-card-base" onClick={() => navigate('/debts')}>
                    <div className="stats-card-content">
                        <div className="kpi-card-header">
                            <span className="stats-card-title">Muddati O'tgan</span>
                            <div className="kpi-icon-box red"><ShieldAlert size={18} /></div>
                        </div>
                        <div className="kpi-body">
                            <div className="stats-card-value">375</div>
                            <div className="kpi-value-unit">mln so'm</div>
                        </div>
                        <div className="kpi-footer-area">
                            <div className="kpi-trend-badge down">
                                <TrendingDown size={14} />
                                <span style={{ marginLeft: '4px' }}>QATTIQ NAZORAT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Seller Specific Actions */}
            {user.role === 'seller' && (
                <section className="mt-8">
                    <div className="ai-insight-modern border-blue-500/20" onClick={() => {
                        const amount = prompt("To'langan summani kiriting (so'mda):");
                        if (!amount) return;
                        toast.success("To'lov haqida Rahbarga habar yuborildi. Tasdiqlash kutilmoqda.");
                    }} style={{ cursor: 'pointer', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 1) 100%)' }}>
                        <div className="ai-icon-circle !bg-blue-500"><DollarSign size={24} /></div>
                        <div className="ai-content-modern">
                            <h4 className="!text-blue-500">Tezkor To'lov</h4>
                            <p>Mijoz to'lov qilganda rahbarni darhol xabardor qiling.</p>
                        </div>
                        <PlusCircle size={24} className="ml-auto text-blue-500 opacity-50" />
                    </div>
                </section>
            )}

            <div className="grid gap-8 mt-8">
                {/* Chart Section */}
                <section>
                    <div className="section-header-modern">
                        <h2 className="section-title-modern"><BarChart3 size={18} className="text-blue-500" /> Moliyaviy Dinamika</h2>
                        <div className="tab-selector">
                            <button className={`tab-btn ${activeTab === 'haftalik' ? 'active' : ''}`} onClick={() => setActiveTab('haftalik')}>Haftalik</button>
                            <button className={`tab-btn ${activeTab === 'oylik' ? 'active' : ''}`} onClick={() => setActiveTab('oylik')}>Oylik</button>
                        </div>
                    </div>
                    <div className="chart-container-modern">
                        <div style={{ width: '100%', height: 180, marginBottom: '24px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={weeklyChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 700 }} dy={10} />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div style={{ background: '#1f2937', padding: '8px 12px', border: '1px solid #374151', borderRadius: '8px', color: '#fff', fontSize: '12px' }}>
                                                        <span style={{ color: '#9ca3af', display: 'block', marginBottom: '4px', textTransform: 'uppercase', fontSize: '10px' }}>{payload[0].payload.day}</span>
                                                        <strong style={{ fontSize: '14px', color: activeTab === 'haftalik' ? '#3b82f6' : '#10b981' }}>{payload[0].value} mln</strong>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                        {weeklyChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={activeTab === 'haftalik' ? '#3b82f6' : '#10b981'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="chart-footer-modern">
                            <div className="chart-stats-info">
                                <span className="cs-label">{activeTab === 'haftalik' ? 'Haftalik Jami' : 'Oylik Kutilma'}</span>
                                <span className="cs-value">{formatMoney(activeTab === 'haftalik' ? 458200000 : 1850000000)}</span>
                            </div>
                            <div className="chart-stats-info text-right">
                                <span className="cs-label">Samaradorlik</span>
                                <span className="cs-value text-emerald-500">+14.5%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Branches List */}
                {user.role === 'director' && (
                    <section>
                        <div className="section-header-modern">
                            <h2 className="section-title-modern"><Building2 size={18} className="text-emerald-500" /> Filiallar Faoliyati</h2>
                            <button className="tab-btn active !px-3 !py-1" onClick={() => navigate('/reports')}>Batafsil</button>
                        </div>
                        <div className="branch-list-modern">
                            {branches.map(branch => (
                                <div key={branch.id} className="branch-card-modern" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
                                    <div className="bc-info">
                                        <h4>{branch.name}</h4>
                                        <p>{branch.location}</p>
                                    </div>
                                    <div className="bc-stats">
                                        <span className="bc-amount" style={{ color: branch.color }}>{formatMoney(branch.monthSales)}</span>
                                        <p className="bc-count">{branch.productsCount} tur mahsulot</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recent Payments Section */}
                <section>
                    <div className="section-header-modern">
                        <h2 className="section-title-modern"><RefreshCcw size={18} className="text-emerald-500" /> Oxirgi To'lovlar</h2>
                    </div>
                    <div className="branch-list-modern">
                        {recentPayments.slice(0, 3).map(payment => (
                            <div key={payment.id} className="branch-card-modern">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-blue-400">
                                        {payment.sellerName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold">{payment.sellerName}</h4>
                                        <p className="text-xs text-gray-500">{payment.method}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-sm font-bold text-emerald-500">+{formatMoney(payment.amount)}</span>
                                    <p className="text-[10px] text-gray-500">{payment.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
