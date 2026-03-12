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
                    <h1 className="page-title">Admin Boshqaruvi</h1>
                    <div className="dash-avatar"><span>SA</span></div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card glass-card">
                        <Cpu size={20} className="text-teal" />
                        <div className="stat-info">
                            <span className="stat-label">Server Yuklanishi</span>
                            <span className="stat-value">{adminStats.serverLoad}</span>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <HardDrive size={20} className="text-blue" />
                        <div className="stat-info">
                            <span className="stat-label">Baza Hajmi</span>
                            <span className="stat-value">{adminStats.databaseSize}</span>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <Users size={20} className="text-purple" />
                        <div className="stat-info">
                            <span className="stat-label">Faol Foydalanuvchi</span>
                            <span className="stat-value">{adminStats.activeUsers}</span>
                        </div>
                    </div>
                    <div className="stat-card glass-card">
                        <Globe size={20} className="text-green" />
                        <div className="stat-info">
                            <span className="stat-label">Tizim Uptime</span>
                            <span className="stat-value">{adminStats.uptime}</span>
                        </div>
                    </div>
                </div>

                <div className="dash-section mt-6">
                    <h2 className="dash-section-title">🛑 Tizim Xatoliklari (Recent)</h2>
                    <div className="error-list mt-3">
                        {systemErrors.map(err => (
                            <div key={err.id} className="error-item glass-card mb-2 p-3">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`badge badge-${err.severity === 'high' ? 'danger' : 'warning'}`}>{err.type}</span>
                                    <span className="text-xs text-tertiary">{err.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm">Status: <strong className={err.status === 'Resolved' ? 'text-success' : 'text-danger'}>{err.status}</strong></span>
                                    <button className="btn btn-secondary btn-xs">Tuzatish</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (user.role === 'storekeeper') {
        return <StorekeeperDashboard user={user} />;
    }

    return (
        <div className="page dashboard-page">
            {/* Premium Header */}
            <header className="dash-header mb-10 animate-fade-in">
                <div className="flex flex-col">
                    <h1 className="elite-title">Salom, {user.name.split(' ')[0]}!</h1>
                    <div className="elite-subtitle">
                        <ShieldCheck size={14} className="pulse-glow" />
                        <span>Tizim Direktori • {new Date().toLocaleDateString('uz-UZ', { month: 'long', day: 'numeric' })}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="dash-config-btn glass-premium !p-0 w-10 h-10 border-white/5" onClick={() => alert("Hozircha yangi xabarlar yo'q")}>
                        <Bell size={18} />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-danger rounded-full"></span>
                    </button>
                    <div className="dash-avatar-premium premium-glow-teal !w-10 !h-10 !rounded-xl">
                        <UserCircle size={24} />
                    </div>
                </div>
            </header>

            {/* AI Strategic Intelligence Card */}
            <div className="dash-section animate-fade-in-up stagger-1 mb-10">
                <div className="ai-insight-box glass-premium cursor-pointer !p-6 border-accent/20" onClick={() => navigate('/ai')}>
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-accent-gradient rounded-2xl text-[#04080f] shadow-glow-teal flex-shrink-0 animate-pulse">
                            <Bot size={32} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5">
                                <span className="text-[10px] font-black uppercase tracking-widest text-accent">Strategic Intelligence</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            </div>
                            <h3 className="text-base font-black leading-tight text-white">Savdo dinamikasi kutilganidan <span className="text-accent">+15%</span> ga yuqori</h3>
                            <p className="text-[11px] text-tertiary mt-1.5 leading-relaxed font-medium">Buxoro filialida sement zaxirasini 40 tonnaga ko'paytirish foydali bo'ladi.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 transition-colors hover:bg-white/10">
                            <ArrowUpRight size={20} className="text-accent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="stats-grid-modern animate-fade-in-up stagger-2">
                <div className="kpi-card glass-premium premium-glow-teal" onClick={() => navigate('/reports')}>
                    <div className="kpi-icon-wrap icon-teal"><DollarSign size={20} /></div>
                    <div className="kpi-data">
                        <span className="kpi-val !text-lg">{formatMoney(monthlyStats.totalSales)}</span>
                        <span className="kpi-lab">Umumiy sotuv</span>
                    </div>
                </div>

                <div className="kpi-card glass-premium premium-glow-blue" onClick={() => navigate('/reports')}>
                    <div className="kpi-icon-wrap icon-blue"><ShoppingCart size={20} /></div>
                    <div className="kpi-data">
                        <span className="kpi-val !text-lg">{formatMoney(monthlyStats.todaySales)}</span>
                        <span className="kpi-lab">Bugungi savdo</span>
                    </div>
                </div>

                <div className="kpi-card glass-premium" onClick={() => navigate('/debts')}>
                    <div className="kpi-icon-wrap icon-orange"><CreditCard size={20} /></div>
                    <div className="kpi-data">
                        <span className="kpi-val !text-lg">{formatMoney(monthlyStats.totalDebt)}</span>
                        <span className="kpi-lab">Jami qarz</span>
                    </div>
                </div>

                <div className="kpi-card glass-premium premium-glow-red" onClick={() => navigate('/debts')}>
                    <div className="kpi-icon-wrap icon-red"><AlertTriangle size={20} /></div>
                    <div className="kpi-data">
                        <span className="kpi-val !text-lg text-danger">{formatMoney(monthlyStats.overdueDebt)}</span>
                        <span className="kpi-lab">Muddati o'tgan</span>
                    </div>
                    <div className="kpi-status-dot pulse-red"></div>
                </div>
            </div>

            {/* Role Specific Actions */}
            {user.role === 'seller' && (
                <section className="dash-section animate-fade-in-up stagger-2">
                    <div className="op-card-premium" onClick={() => {
                        const amount = prompt("To'langan summani kiriting (so'mda):");
                        if (!amount) return;
                        let sales = [];
                        try {
                            const savedSales = localStorage.getItem('bt_cash_sales');
                            sales = savedSales ? JSON.parse(savedSales) : [];
                        } catch (e) { sales = []; }
                        const newSale = {
                            id: Date.now(),
                            seller: user.name,
                            amount: amount,
                            date: new Date().toLocaleString(),
                            status: 'Pending'
                        };
                        localStorage.setItem('bt_cash_sales', JSON.stringify([newSale, ...sales]));
                        alert("To'lov haqida Rahbarga habar yuborildi. Tasdiqlash kutilmoqda.");
                    }}>
                        <div className="op-icon-premium bg-accent-gradient"><DollarSign size={24} /></div>
                        <div className="op-info-premium">
                            <h3>Naqt savdo qilish</h3>
                            <p>Mijoz to'liq to'lov qilganda rahbarni tezkor xabardor qiling</p>
                        </div>
                        <PlusCircle size={24} className="ml-auto text-accent opacity-50" />
                    </div>
                </section>
            )}

            <div className="dash-grid-layout mt-8">
                {(user.role === 'admin' || user.role === 'director') && (
                    <>
                        {/* High-Performance Chart */}
                        <section className="dash-section animate-fade-in-up stagger-3">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="section-title-premium"><BarChart3 size={16} className="text-accent" /> Moliyaviy Dinamika</h2>
                                <div className="flex gap-1.5 bg-white/5 p-1 rounded-lg">
                                    <span className="text-[8px] font-black px-2 py-1 bg-accent text-white rounded-md shadow-sm cursor-pointer">HAFTALIK</span>
                                    <span className="text-[8px] font-black px-2 py-1 text-tertiary hover:text-white transition-colors cursor-pointer">OYLIK</span>
                                </div>
                            </div>
                            <div className="glass-premium p-6 premium-glow-teal">
                                <div className="bar-chart flex items-end justify-between px-2 h-[160px] gap-2">
                                    {weeklyChartData.map((item, index) => (
                                        <div key={item.day} className="flex-1 flex flex-col items-center gap-3 group relative">
                                            <div className="relative w-full flex items-end justify-center h-full group">
                                                <div className="absolute -top-8 bg-accent text-[8px] font-black px-2 py-0.5 rounded shadow-glow-teal opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                                                    {item.value}M
                                                </div>
                                                <div
                                                    className="w-full max-w-[10px] bg-white/5 rounded-full relative overflow-hidden transition-all duration-500 group-hover:max-w-[14px]"
                                                    style={{ height: `${(item.value / 85) * 100}%` }}
                                                >
                                                    <div className="absolute inset-0 bg-accent-gradient opacity-90"></div>
                                                </div>
                                            </div>
                                            <span className="text-[8px] font-bold text-tertiary uppercase tracking-wider">{item.day}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex justify-between items-center pt-5 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black text-tertiary uppercase tracking-widest opacity-60">Haftalik o'sish</span>
                                        <span className="text-xl font-black text-white">{formatMoney(458200000)}</span>
                                    </div>
                                    <div className="flex flex-col text-right">
                                        <span className="text-[9px] font-black text-tertiary uppercase tracking-widest opacity-60">Samaradorlik</span>
                                        <span className="text-xl font-black text-accent">+14.5%</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Branches Navigation */}
                        <section className="dash-section animate-fade-in-up stagger-4">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="section-title-premium"><Building2 size={16} className="text-secondary" /> Filiallar Faoliyati</h2>
                                <button className="text-[10px] uppercase font-black tracking-widest text-accent" onClick={() => navigate('/reports')}>Batafsil</button>
                            </div>
                            <div className="grid gap-4">
                                {localBranches.map((branch, i) => (
                                    <div key={branch.id} className="branch-card-elite" style={{ color: branch.color }} onClick={() => navigate('/reports')}>
                                        <div className="branch-info-box">
                                            <p className="branch-title-text">{branch.name}</p>
                                            <p className="branch-sub-text">{branch.location}</p>
                                        </div>
                                        <div className="branch-val-text">
                                            <p className="branch-val-amount">{formatMoney(branch.monthSales)}</p>
                                            <p className="branch-val-sub">{branch.productsCount} tur mahsulot</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </div>

            {/* Recent Alerts Feed */}
            <section className="dash-section mt-8 animate-fade-in-up stagger-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="section-title-premium"><Bell size={16} className="text-danger" /> Muhim Xabarlar</h2>
                </div>
                <div className="alerts-container space-y-3">
                    {overdueDebts.length > 0 ? (
                        <div className="glass-premium !bg-danger/5 border-danger/20 p-5 flex items-start gap-4" onClick={() => navigate('/debts')}>
                            <div className="p-3 bg-danger/20 text-danger rounded-2xl"><ShieldAlert size={24} /></div>
                            <div className="flex-1">
                                <h3 className="text-sm font-black text-danger">Muddati o'tgan qarzlar!</h3>
                                <p className="text-xs text-secondary mt-1">Sotuvchilar tomonidan {overdueDebts.length} ta yirik qarz qaytarilishi kutilmoqda.</p>
                                <div className="mt-3 flex gap-2">
                                    <button className="text-[10px] font-black bg-danger text-white px-3 py-1 rounded-full uppercase">Ko'rib chiqish</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-premium p-10 text-center border-dashed border-2 border-white/5">
                            <Bot size={40} className="mx-auto mb-4 text-accent opacity-20" />
                            <p className="text-sm font-bold text-tertiary">Hoziroq hamma narsa joyida. Tizim barqaror ishlamoqda.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Client Alerts & Payments */}
            <div className="dash-grid-layout mt-8">
                <section className="dash-section animate-fade-in-up stagger-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-title-premium"><Users size={16} className="text-blue" /> Mijozlar Qarzi</h2>
                    </div>
                    <div className="glass-premium !p-5" onClick={() => navigate('/clients')}>
                        <div className="flex items-start gap-3">
                            <div className="alert-icon-mini bg-warning/10 text-warning"><AlertTriangle size={16} /></div>
                            <div className="flex-1">
                                <p className="text-xs font-black">Eslatish kerak bo'lgan mijozlar</p>
                                <div className="mt-3 space-y-2">
                                    <p className="text-[10px] text-secondary flex justify-between"><span>Azizbek Rahmonov</span> <span className="font-bold">5.6 mln</span></p>
                                    <p className="text-[10px] text-danger flex justify-between"><span>Shaxzod Umidov</span> <span className="font-bold text-danger">25 mln (Kechikkan!)</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="dash-section animate-fade-in-up stagger-7">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="section-title-premium"><CreditCard size={16} className="text-teal" /> Oxirgi To'lovlar</h2>
                        <button className="text-[10px] font-black text-accent uppercase tracking-widest">Barchasi</button>
                    </div>
                    <div className="space-y-3">
                        {recentPayments.slice(0, 3).map((p) => (
                            <div key={p.id} className="payment-item-elite">
                                <div className="flex items-center gap-4">
                                    <div className="payment-avatar">
                                        {p.sellerName.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[13px] font-extrabold text-white truncate">{p.sellerName}</p>
                                        <span className={`payment-method-badge ${p.method.toLowerCase().replace("'", "-")}`}>
                                            {p.method}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="payment-amount">+{formatMoney(p.amount)}</p>
                                    <p className="text-[9px] text-tertiary mt-0.5">{p.time || 'Hozir'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* AI Assistant Preview */}
            <section className="dash-section mt-8 mb-8 animate-fade-in-up stagger-8">
                <div className="ai-preview-card glass-premium !p-6 cursor-pointer overflow-hidden relative" onClick={() => navigate('/ai')}>
                    <div className="absolute inset-0 bg-accent/5 animate-pulse"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="p-3 bg-accent rounded-2xl text-white shadow-[0_0_20px_rgba(0,212,170,0.4)]">
                            <Bot size={28} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-sm font-black flex items-center gap-2">🤖 AI Tahlilchi <span className="badge badge-accent">LIVE</span></h3>
                            <p className="text-xs text-secondary mt-1">Bugun sotuvlar odatdagidan 15% yuqori. Filial 2 da zaxira kamaymoqda.</p>
                        </div>
                        <ArrowUpRight size={24} className="text-accent" />
                    </div>
                </div>
            </section>
        </div>
    );
}
