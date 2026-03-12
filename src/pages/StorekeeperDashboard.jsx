import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package, DollarSign, AlertTriangle, RefreshCcw, TrendingUp,
    Bell, PlusCircle, Clock, CheckCircle2, Info, Plus, HardHat,
    Settings2, Building2, Box, Archive, BarChart3, Search,
    ChevronRight, Layers, ArrowUpRight, Zap, Truck, Eye,
    ShieldCheck, Sparkles, Activity, X, Check
} from 'lucide-react';
import { products, categories, formatMoney, formatFullMoney } from '../data/mockData';
import { toast } from 'react-hot-toast';
import './StorekeeperDashboard.css';

export default function StorekeeperDashboard({ user }) {
    const navigate = useNavigate();

    // Inbound Form State
    const [showInboundModal, setShowInboundModal] = useState(false);
    const [inboundForm, setInboundForm] = useState({ product: '', amount: '', category: 'Sement', unit: 'kg' });
    const [activeTab, setActiveTab] = useState('overview');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [animateCards, setAnimateCards] = useState(false);

    // Live clock
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    // Trigger card animations on mount
    useEffect(() => {
        const timeout = setTimeout(() => setAnimateCards(true), 100);
        return () => clearTimeout(timeout);
    }, []);

    // Safe branch value
    const userBranch = user.branch || 'Toshkent';

    // Data computations
    const branchProducts = useMemo(() =>
        products.filter(p => !p.branch || p.branch === userBranch), [userBranch]);

    const lowStock = useMemo(() =>
        branchProducts.filter(p => p.stock < (p.minStock || 50)), [branchProducts]);

    const criticalStock = useMemo(() =>
        branchProducts.filter(p => p.status === 'critical' || p.stock < 30), [branchProducts]);

    const branchTotalValue = useMemo(() =>
        branchProducts.reduce((acc, p) => acc + (p.stock * p.price), 0), [branchProducts]);

    const totalItems = useMemo(() =>
        branchProducts.reduce((acc, p) => acc + p.stock, 0), [branchProducts]);

    const pendingInbound = useMemo(() => {
        try {
            return JSON.parse(localStorage.getItem('bt_inbound') || '[]')
                .filter(r => r.branch === userBranch && r.status === 'pending');
        } catch { return []; }
    }, [userBranch]);

    const categoryBreakdown = useMemo(() => {
        const map = {};
        branchProducts.forEach(p => {
            if (!map[p.category]) map[p.category] = { count: 0, value: 0, items: 0 };
            map[p.category].count++;
            map[p.category].value += p.stock * p.price;
            map[p.category].items += p.stock;
        });
        return Object.entries(map).sort((a, b) => b[1].value - a[1].value);
    }, [branchProducts]);

    const topProducts = useMemo(() =>
        [...branchProducts].sort((a, b) => (b.stock * b.price) - (a.stock * a.price)).slice(0, 5),
        [branchProducts]);

    const stockHealthPercent = useMemo(() => {
        if (branchProducts.length === 0) return 100;
        return Math.round(((branchProducts.length - lowStock.length) / branchProducts.length) * 100);
    }, [branchProducts, lowStock]);

    // Submit inbound request
    const handleRequestInbound = () => {
        if (!inboundForm.product || !inboundForm.amount) {
            toast.error("Iltimos, barcha ma'lumotlarni to'ldiring!");
            return;
        }

        try {
            const savedInbound = localStorage.getItem('bt_inbound');
            const list = savedInbound ? JSON.parse(savedInbound) : [];

            const newRequest = {
                id: Date.now(),
                ...inboundForm,
                requestedBy: user.name,
                branch: userBranch,
                date: new Date().toLocaleString(),
                status: 'pending'
            };

            localStorage.setItem('bt_inbound', JSON.stringify([newRequest, ...list]));
            setShowInboundModal(false);
            setInboundForm({ product: '', amount: '', category: 'Sement', unit: 'kg' });
            toast.success("Kirim so'rovi yuborildi. Rahbar tasdig'ini kuting.");
        } catch (e) {
            console.error('Inbound save error:', e);
            toast.error("Xatolik yuz berdi!");
        }
    };

    const timeGreeting = () => {
        const h = currentTime.getHours();
        if (h < 12) return 'Xayrli tong';
        if (h < 18) return 'Xayrli kun';
        return 'Xayrli kech';
    };

    const formattedDate = currentTime.toLocaleDateString('uz-UZ', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="page sk-dashboard">
            {/* Ambient Background Effects */}
            <div className="sk-ambient">
                <div className="sk-ambient-orb sk-orb-1"></div>
                <div className="sk-ambient-orb sk-orb-2"></div>
                <div className="sk-ambient-orb sk-orb-3"></div>
                <div className="sk-mesh-gradient"></div>
            </div>

            {/* Premium Header */}
            <header className="sk-header">
                <div className="sk-header-left">
                    <div className="sk-avatar">
                        <div className="sk-avatar-ring"></div>
                        <div className="sk-avatar-inner">
                            <HardHat size={20} strokeWidth={2} />
                        </div>
                        <div className="sk-avatar-status"></div>
                    </div>
                    <div className="sk-header-info">
                        <h1 className="sk-greeting">
                            {timeGreeting()}, <span className="sk-name">{user.name ? user.name.split(' ')[0] : 'Omborchi'}</span>
                            <span className="sk-wave">👋</span>
                        </h1>
                        <p className="sk-role-tag">
                            <Building2 size={11} />
                            <span>{userBranch} filiali</span>
                            <span className="sk-role-divider">•</span>
                            <span className="sk-role-badge">Omborchi</span>
                        </p>
                    </div>
                </div>
                <div className="sk-header-actions">
                    <button className="sk-action-btn" onClick={() => setShowInboundModal(true)}>
                        <PlusCircle size={18} />
                    </button>
                    <button className="sk-action-btn">
                        <Bell size={18} />
                        {(lowStock.length > 0 || pendingInbound.length > 0) && <span className="sk-notif-dot"></span>}
                    </button>
                </div>
            </header>

            {/* Date & Time Bar */}
            <div className="sk-date-bar">
                <span className="sk-date-text">{formattedDate}</span>
                <span className="sk-live-badge">
                    <Activity size={10} />
                    LIVE
                </span>
            </div>

            {/* Stock Health Indicator */}
            <div className={`sk-health-bar ${animateCards ? 'sk-animate' : ''}`}>
                <div className="sk-health-info">
                    <div className="sk-health-label">
                        <ShieldCheck size={14} />
                        <span>Ombor Salomatligi</span>
                    </div>
                    <span className={`sk-health-val ${stockHealthPercent >= 80 ? 'good' : stockHealthPercent >= 50 ? 'warn' : 'bad'}`}>
                        {stockHealthPercent}%
                    </span>
                </div>
                <div className="sk-health-track">
                    <div
                        className={`sk-health-fill ${stockHealthPercent >= 80 ? 'good' : stockHealthPercent >= 50 ? 'warn' : 'bad'}`}
                        style={{ width: animateCards ? `${stockHealthPercent}%` : '0%' }}
                    ></div>
                </div>
            </div>

            {/* KPI Cards Grid */}
            <div className={`sk-kpi-grid ${animateCards ? 'sk-animate' : ''}`}>
                <div className="sk-kpi-card sk-kpi-primary" onClick={() => navigate('/products')}>
                    <div className="sk-kpi-glow"></div>
                    <div className="sk-kpi-top">
                        <div className="sk-kpi-icon teal"><Package size={18} /></div>
                        <ArrowUpRight size={14} className="sk-kpi-arrow" />
                    </div>
                    <div className="sk-kpi-body">
                        <span className="sk-kpi-value">{branchProducts.length}</span>
                        <span className="sk-kpi-label">Mahsulot turlari</span>
                    </div>
                    <div className="sk-kpi-footer">
                        <span className="sk-kpi-sub">{totalItems.toLocaleString()} dona omborda</span>
                    </div>
                </div>

                <div className="sk-kpi-card sk-kpi-value-card" onClick={() => navigate('/products')}>
                    <div className="sk-kpi-top">
                        <div className="sk-kpi-icon blue"><DollarSign size={18} /></div>
                        <ArrowUpRight size={14} className="sk-kpi-arrow" />
                    </div>
                    <div className="sk-kpi-body">
                        <span className="sk-kpi-value">{formatMoney(branchTotalValue)}</span>
                        <span className="sk-kpi-label">Umumiy qiymat</span>
                    </div>
                    <div className="sk-kpi-footer">
                        <span className="sk-kpi-sub">{formatFullMoney(branchTotalValue)}</span>
                    </div>
                </div>

                <div className={`sk-kpi-card ${lowStock.length > 0 ? 'sk-kpi-alert' : ''}`} onClick={() => navigate('/products')}>
                    <div className="sk-kpi-top">
                        <div className="sk-kpi-icon red"><AlertTriangle size={18} /></div>
                        {lowStock.length > 0 && <span className="sk-pulse-dot"></span>}
                    </div>
                    <div className="sk-kpi-body">
                        <span className={`sk-kpi-value ${lowStock.length > 0 ? 'danger' : ''}`}>{lowStock.length}</span>
                        <span className="sk-kpi-label">Kam qolgan</span>
                    </div>
                    <div className="sk-kpi-footer">
                        <span className="sk-kpi-sub">{criticalStock.length} ta kritik</span>
                    </div>
                </div>

                <div className="sk-kpi-card" onClick={() => setShowInboundModal(true)}>
                    <div className="sk-kpi-top">
                        <div className="sk-kpi-icon orange"><Truck size={18} /></div>
                        {pendingInbound.length > 0 && <span className="sk-pulse-dot orange"></span>}
                    </div>
                    <div className="sk-kpi-body">
                        <span className={`sk-kpi-value ${pendingInbound.length > 0 ? 'warning' : ''}`}>{pendingInbound.length}</span>
                        <span className="sk-kpi-label">Kutilmoqda</span>
                    </div>
                    <div className="sk-kpi-footer">
                        <span className="sk-kpi-sub">Prihot so'rovlari</span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.2s' }}>
                <div className="sk-section-header">
                    <h2 className="sk-section-title">
                        <Zap size={15} />
                        Tezkor amallar
                    </h2>
                </div>
                <div className="sk-quick-actions">
                    <button className="sk-quick-btn" onClick={() => setShowInboundModal(true)}>
                        <div className="sk-quick-icon gradient-teal"><PlusCircle size={20} /></div>
                        <span>Yangi Prihot</span>
                    </button>
                    <button className="sk-quick-btn" onClick={() => navigate('/products')}>
                        <div className="sk-quick-icon gradient-blue"><Search size={20} /></div>
                        <span>Qidirish</span>
                    </button>
                    <button className="sk-quick-btn" onClick={() => navigate('/products')}>
                        <div className="sk-quick-icon gradient-purple"><Layers size={20} /></div>
                        <span>Kategoriya</span>
                    </button>
                    <button className="sk-quick-btn" onClick={() => navigate('/products')}>
                        <div className="sk-quick-icon gradient-orange"><BarChart3 size={20} /></div>
                        <span>Hisobot</span>
                    </button>
                </div>
            </section>

            {/* Two-Column Layout */}
            <div className="sk-dual-grid">
                {/* Category Breakdown */}
                <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.3s' }}>
                    <div className="sk-section-header">
                        <h2 className="sk-section-title">
                            <Layers size={15} />
                            Kategoriyalar
                        </h2>
                        <span className="sk-section-badge">{categoryBreakdown.length} ta</span>
                    </div>
                    <div className="sk-category-list">
                        {categoryBreakdown.slice(0, 4).map(([name, data], i) => {
                            const maxVal = categoryBreakdown[0]?.[1]?.value || 1;
                            const barWidth = Math.max(10, (data.value / maxVal) * 100);
                            const catInfo = categories.find(c => c.name === name);
                            const colors = ['#00d4aa', '#3b82f6', '#a855f7', '#f97316'];
                            return (
                                <div key={name} className="sk-cat-item" onClick={() => navigate('/products')}>
                                    <div className="sk-cat-header">
                                        <div className="sk-cat-left">
                                            <span className="sk-cat-emoji">{catInfo?.icon || '📦'}</span>
                                            <div>
                                                <p className="sk-cat-name">{name}</p>
                                                <p className="sk-cat-count">{data.count} tur • {data.items.toLocaleString()} dona</p>
                                            </div>
                                        </div>
                                        <span className="sk-cat-value">{formatMoney(data.value)}</span>
                                    </div>
                                    <div className="sk-cat-bar-track">
                                        <div
                                            className="sk-cat-bar-fill"
                                            style={{
                                                width: animateCards ? `${barWidth}%` : '0%',
                                                background: colors[i % colors.length],
                                                transitionDelay: `${0.4 + i * 0.1}s`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Alerts */}
                <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.35s' }}>
                    <div className="sk-section-header">
                        <h2 className="sk-section-title">
                            <Bell size={15} className="text-warning" />
                            Ogohlantirishlar
                        </h2>
                        {lowStock.length > 0 && <span className="sk-alert-count">{lowStock.length}</span>}
                    </div>
                    <div className="sk-alerts">
                        {lowStock.length > 0 ? lowStock.slice(0, 3).map(p => (
                            <div key={p.id} className="sk-alert-item" onClick={() => navigate('/products')}>
                                <div className="sk-alert-icon">
                                    <AlertTriangle size={14} />
                                </div>
                                <div className="sk-alert-info">
                                    <p className="sk-alert-name">{p.name}</p>
                                    <p className="sk-alert-stock">
                                        Qoldiq: <strong className={p.stock < 30 ? 'critical' : 'low'}>{p.stock} {p.unit}</strong>
                                        {p.minStock && <span> / min: {p.minStock}</span>}
                                    </p>
                                </div>
                                <button className="sk-alert-action" onClick={(e) => { e.stopPropagation(); setShowInboundModal(true); }}>
                                    <Plus size={12} />
                                </button>
                            </div>
                        )) : (
                            <div className="sk-alert-empty">
                                <CheckCircle2 size={28} />
                                <p>Barcha mahsulotlar me'yorda</p>
                                <span>Ombor to'liq ta'minlangan</span>
                            </div>
                        )}
                    </div>
                </section>
            </div>

            {/* Top Products */}
            <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.4s' }}>
                <div className="sk-section-header">
                    <h2 className="sk-section-title">
                        <TrendingUp size={15} />
                        Eng qimmat mahsulotlar
                    </h2>
                    <button className="sk-see-all" onClick={() => navigate('/products')}>
                        Barchasi <ChevronRight size={14} />
                    </button>
                </div>
                <div className="sk-top-products">
                    {topProducts.map((p, i) => (
                        <div key={p.id} className="sk-product-item" onClick={() => navigate('/products')}>
                            <div className="sk-product-rank">
                                <span className={`rank-num ${i < 3 ? 'top-3' : ''}`}>{i + 1}</span>
                            </div>
                            <div className="sk-product-emoji">{p.image || '📦'}</div>
                            <div className="sk-product-info">
                                <p className="sk-product-name">{p.name}</p>
                                <p className="sk-product-meta">{p.stock.toLocaleString()} {p.unit} • {p.category}</p>
                            </div>
                            <div className="sk-product-value">
                                <span className="sk-product-price">{formatMoney(p.stock * p.price)}</span>
                                <span className={`sk-product-status ${p.status}`}>
                                    {p.status === 'plenty' ? '✓' : p.status === 'low' ? '!' : '⚠'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pending Inbound Requests */}
            {pendingInbound.length > 0 && (
                <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.45s' }}>
                    <div className="sk-section-header">
                        <h2 className="sk-section-title">
                            <Clock size={15} className="sk-spin-slow" />
                            Tasdiq kutilmoqda
                        </h2>
                        <span className="sk-pending-count">{pendingInbound.length}</span>
                    </div>
                    <div className="sk-pending-feed">
                        {pendingInbound.map(req => (
                            <div key={req.id} className="sk-pending-item">
                                <div className="sk-pending-icon">
                                    <Truck size={16} />
                                </div>
                                <div className="sk-pending-info">
                                    <p className="sk-pending-name">{req.product}</p>
                                    <p className="sk-pending-meta">{req.amount} {req.unit} • {req.date}</p>
                                </div>
                                <span className="sk-pending-badge">Kutilmoqda</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* New Inbound Request Operation Card */}
            <section className={`sk-section ${animateCards ? 'sk-animate' : ''}`} style={{ animationDelay: '0.5s' }}>
                <div className="sk-operation-card" onClick={() => setShowInboundModal(true)}>
                    <div className="sk-op-glow"></div>
                    <div className="sk-op-icon">
                        <Sparkles size={24} />
                    </div>
                    <div className="sk-op-content">
                        <h3>Yangi Prihot So'rovi</h3>
                        <p>Omborga kelgan yangi mahsulotlarni ro'yxatga qo'shish uchun so'rov yuboring</p>
                    </div>
                    <ChevronRight size={20} className="sk-op-arrow" />
                </div>
            </section>

            {/* Inbound Modal */}
            {showInboundModal && (
                <div className="sk-modal-overlay" onClick={() => setShowInboundModal(false)}>
                    <div className="sk-modal" onClick={e => e.stopPropagation()}>
                        <div className="sk-modal-header">
                            <div className="sk-modal-title-wrap">
                                <div className="sk-modal-icon"><PlusCircle size={20} /></div>
                                <div>
                                    <h2>Yangi Mahsulot Prihoti</h2>
                                    <p>Omborga kelgan mahsulot haqida</p>
                                </div>
                            </div>
                            <button className="sk-modal-close" onClick={() => setShowInboundModal(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="sk-modal-body">
                            <div className="sk-form-group">
                                <label>Mahsulot nomi</label>
                                <div className="sk-input-wrap">
                                    <Package size={16} className="sk-input-icon" />
                                    <input
                                        type="text"
                                        placeholder="Masalan: Sement M400"
                                        value={inboundForm.product}
                                        onChange={(e) => setInboundForm({ ...inboundForm, product: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="sk-form-row">
                                <div className="sk-form-group">
                                    <label>Miqdori</label>
                                    <div className="sk-input-wrap">
                                        <Layers size={16} className="sk-input-icon" />
                                        <input
                                            type="number"
                                            placeholder="100"
                                            value={inboundForm.amount}
                                            onChange={(e) => setInboundForm({ ...inboundForm, amount: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="sk-form-group">
                                    <label>Birligi</label>
                                    <div className="sk-input-wrap">
                                        <select
                                            value={inboundForm.unit}
                                            onChange={(e) => setInboundForm({ ...inboundForm, unit: e.target.value })}
                                        >
                                            <option value="kg">kg</option>
                                            <option value="tonna">tonna</option>
                                            <option value="metr">metr</option>
                                            <option value="dona">dona</option>
                                            <option value="qop">qop</option>
                                            <option value="m³">m³</option>
                                            <option value="m²">m²</option>
                                            <option value="chelak">chelak</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="sk-form-group">
                                <label>Kategoriya</label>
                                <div className="sk-input-wrap">
                                    <select
                                        value={inboundForm.category}
                                        onChange={(e) => setInboundForm({ ...inboundForm, category: e.target.value })}
                                    >
                                        {categories.map(c => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="sk-modal-footer">
                            <button className="sk-btn-cancel" onClick={() => setShowInboundModal(false)}>
                                Bekor qilish
                            </button>
                            <button className="sk-btn-submit" onClick={handleRequestInbound}>
                                <Check size={16} />
                                So'rov yuborish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
