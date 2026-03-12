import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, AlertTriangle, Package, Users, Building2, CreditCard, ArrowUpRight, Bot, Bell, ChevronRight, DollarSign, ShoppingCart, Cpu, HardDrive, Globe, RefreshCcw, Box, Clock, Archive, Plus, HardHat, Settings2, Info, PlusCircle, CheckCircle2, UserCircle, ShieldCheck, BarChart3, ShieldAlert, Info as InfoIcon } from 'lucide-react';
import { monthlyStats, branches, weeklyChartData, recentPayments, formatMoney, formatFullMoney, debts, systemErrors, adminStats, products, categories } from '../data/mockData';
import StorekeeperDashboard from './StorekeeperDashboard';
import './Dashboard.css';

export default function Dashboard({ user }) {
    const navigate = useNavigate();
    const [localBranches, setLocalBranches] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_branches');
            return (saved && JSON.parse(saved)) || branches;
        } catch (e) { return branches; }
    });

    // Inbound Form State (for storekeeper)
    const [showInboundModal, setShowInboundModal] = useState(false);
    const [inboundForm, setInboundForm] = useState({ product: '', amount: '', category: 'Materiallar', unit: 'kg' });

    const overdueDebts = debts.filter(d => d.status === 'overdue');

    const handleRequestInbound = () => {
        if (!inboundForm.product || !inboundForm.amount) {
            alert("Iltimos, barcha ma'lumotlarni to'ldiring!");
            return;
        }

        let list = [];
        try {
            const savedInbound = localStorage.getItem('bt_inbound');
            list = savedInbound ? JSON.parse(savedInbound) : [];
        } catch (e) { list = []; }

        const newRequest = {
            id: Date.now(),
            ...inboundForm,
            requestedBy: user.name,
            branch: user.branch,
            date: new Date().toLocaleString(),
            status: 'pending'
        };

        localStorage.setItem('bt_inbound', JSON.stringify([newRequest, ...list]));
        alert("Kirim so'rovi yuborildi. Rahbar tomonidan tasdiqlanishi va narx belgilanishini kuting.");
        setShowInboundModal(false);
        setInboundForm({ product: '', amount: '', category: 'Materiallar', unit: 'kg' });
        window.location.reload();
    };

    if (user.role === 'guest') {
        return (
            <div className="page dashboard-page">
                <header className="dash-header">
                    <h1 className="page-title">Xush kelibsiz!</h1>
                </header>
                <div className="glass-card p-6 text-center mt-10">
                    <p className="text-secondary">Siz mehmon bo'lib kirdingiz. Barcha funksiyalardan foydalanish uchun ro'yxatdan o'ting.</p>
                </div>
            </div>
        );
    }

    if (user.role === 'admin') {
        return (
            <div className="page dashboard-page">
                <header className="dash-header">
                    <div>
                        <h1 className="elite-title">Tizim Ma'lumotlari</h1>
                        <p className="elite-subtitle">Admin Console • {adminStats.uptime}</p>
                    </div>
                </header>

                <div className="stats-grid-modern">
                    <div className="kpi-card">
                        <div className="kpi-icon-wrap text-blue-500"><Cpu size={18} /></div>
                        <div>
                            <span className="kpi-lab">Server Yuklanishi</span>
                            <span className="kpi-val">{adminStats.serverLoad}</span>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon-wrap text-emerald-500"><HardDrive size={18} /></div>
                        <div>
                            <span className="kpi-lab">Baza Hajmi</span>
                            <span className="kpi-val">{adminStats.databaseSize}</span>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon-wrap text-purple-500"><Users size={18} /></div>
                        <div>
                            <span className="kpi-lab">Faol Foydalanuvchilar</span>
                            <span className="kpi-val">{adminStats.activeUsers}</span>
                        </div>
                    </div>
                    <div className="kpi-card">
                        <div className="kpi-icon-wrap text-orange-500"><ShieldAlert size={18} /></div>
                        <div>
                            <span className="kpi-lab">Xavfsizlik</span>
                            <span className="kpi-val text-emerald-500">Normal</span>
                        </div>
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

    return (
        <div className="page dashboard-page">
            <header className="dash-header">
                <div>
                    <h1 className="elite-title">Boshqaruv Paneli</h1>
                    <p className="elite-subtitle">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span>BuildTrack Pro • {user.role.toUpperCase()}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="icon-btn" style={{ background: '#1f2937', color: '#9ca3af', border: 'none', borderRadius: '12px', width: '40px', height: '40px' }}><Bell size={20} /></button>
                    <div className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center text-emerald-500 border border-gray-700">
                        <UserCircle size={24} />
                    </div>
                </div>
            </header>

            {/* AI Insight Section */}
            <div className="mb-8">
                <div className="ai-insight-modern" onClick={() => navigate('/ai')} style={{ cursor: 'pointer' }}>
                    <div className="ai-icon-circle"><Bot size={24} /></div>
                    <div className="ai-content-modern">
                        <h4>AI Tahlil • Bugun</h4>
                        <p>Savdo dinamikasi kutilganidan 15.4% yuqori. Mahsulot zaxirasini {formatMoney(45000000)} ga oshirish tavsiya etiladi.</p>
                    </div>
                </div>
            </div>

            {/* Core Metrics Grid */}
            <div className="stats-grid-modern">
                <div className="kpi-card" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
                    <div className="kpi-icon-wrap text-emerald-500"><Search size={18} /></div>
                    <div>
                        <span className="kpi-lab">Umumiy Sotuv</span>
                        <span className="kpi-val">{formatMoney(monthlyStats.totalSales)}</span>
                    </div>
                </div>
                <div className="kpi-card" onClick={() => navigate('/reports')} style={{ cursor: 'pointer' }}>
                    <div className="kpi-icon-wrap text-blue-500"><Target size={18} /></div>
                    <div>
                        <span className="kpi-lab">Bugungi Savdo</span>
                        <span className="kpi-val">{formatMoney(monthlyStats.todaySales)}</span>
                    </div>
                </div>
                <div className="kpi-card" onClick={() => navigate('/debts')} style={{ cursor: 'pointer' }}>
                    <div className="kpi-icon-wrap text-orange-500"><Layers size={18} /></div>
                    <div>
                        <span className="kpi-lab">Jami Qarzlar</span>
                        <span className="kpi-val">{formatMoney(monthlyStats.totalDebt)}</span>
                    </div>
                </div>
                <div className="kpi-card" onClick={() => navigate('/debts')} style={{ cursor: 'pointer' }}>
                    <div className="kpi-icon-wrap text-red-500"><ShieldAlert size={18} /></div>
                    <div>
                        <span className="kpi-lab">Muddati O'tgan</span>
                        <span className="kpi-val text-red-500">{formatMoney(monthlyStats.overdueDebt)}</span>
                    </div>
                </div>
            </div>

            <div className="grid gap-8">
                {/* Chart Section */}
                <section>
                    <div className="section-header-modern">
                        <h2 className="section-title-modern"><BarChart3 size={18} className="text-blue-500" /> Moliyaviy Dinamika</h2>
                        <div className="tab-selector">
                            <button className="tab-btn active">Haftalik</button>
                            <button className="tab-btn">Oylik</button>
                        </div>
                    </div>
                    <div className="chart-container-modern">
                        <div className="bar-chart-modern">
                            {weeklyChartData.map((item) => (
                                <div key={item.day} className="bar-wrapper">
                                    <div
                                        className="bar-fill-modern"
                                        style={{ height: `${(item.value / 90) * 100}%` }}
                                    ></div>
                                    <span className="bar-label-modern">{item.day}</span>
                                </div>
                            ))}
                        </div>
                        <div className="chart-footer-modern">
                            <div className="chart-stats-info">
                                <span className="cs-label">Haftalik Jami</span>
                                <span className="cs-value">{formatMoney(458200000)}</span>
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
                                        <span className="bc-amount">{formatMoney(branch.monthSales)}</span>
                                        <p className="bc-count">{branch.productsCount} tur mahsulot</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
