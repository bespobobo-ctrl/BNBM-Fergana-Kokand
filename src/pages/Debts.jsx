import { useState } from 'react';
import { Search, Calendar, User, Package, DollarSign, ChevronRight, AlertCircle, CheckCircle2, Clock, Filter, ArrowUpRight } from 'lucide-react';
import { debts, formatFullMoney, formatMoney, getDaysUntil, formatDate } from '../data/mockData';
import './Debts.css';

export default function Debts() {
    const [filter, setFilter] = useState('Hammasi');
    const [search, setSearch] = useState('');

    const filteredDebts = debts.filter(d => {
        const matchesStatus = filter === 'Hammasi' ||
            (filter === 'Faol' && d.status === 'active') ||
            (filter === 'Muddati o\'tgan' && d.status === 'overdue') ||
            (filter === 'Yopilgan' && d.status === 'paid');

        const matchesSearch = d.sellerName.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalDebt = debts.reduce((acc, d) => acc + (d.status !== 'paid' ? (d.totalAmount - d.paidAmount) : 0), 0);

    return (
        <div className="page debts-page">
            <header className="page-header animate-fade-in">
                <h1 className="page-title">Qarzlar boshqaruvi</h1>
                <button className="icon-btn"><Search size={20} /></button>
            </header>

            {/* Summary Card */}
            <div className="debt-summary-card glass-card animate-fade-in-up stagger-1">
                <div className="debt-summary-top">
                    <div className="debt-summary-info">
                        <span className="debt-summary-label">Umumiy kutilayotgan qarzlar</span>
                        <div className="debt-summary-value">{formatMoney(totalDebt)} so'm</div>
                    </div>
                    <div className="debt-summary-chart">
                        <svg viewBox="0 0 36 36" className="circular-chart">
                            <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <path className="circle" strokeDasharray="65, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            <text x="18" y="20.35" className="percentage">65%</text>
                        </svg>
                    </div>
                </div>
                <div className="debt-summary-bottom">
                    <div className="debt-summary-stat">
                        <CheckCircle2 size={12} className="text-success" />
                        <span>Yig'ilgan: <strong>430 mln</strong></span>
                    </div>
                    <div className="debt-summary-stat">
                        <AlertCircle size={12} className="text-danger" />
                        <span>Muddati o'tgan: <strong>375 mln</strong></span>
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs-scroll animate-fade-in-up stagger-2">
                {['Hammasi', 'Faol', 'Muddati o\'tgan', 'Yopilgan'].map((t) => (
                    <button
                        key={t}
                        className={`filter-tab ${filter === t ? 'active' : ''}`}
                        onClick={() => setFilter(t)}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="debts-list">
                {filteredDebts.map((debt, i) => {
                    const remaining = debt.totalAmount - debt.paidAmount;
                    const daysLeft = getDaysUntil(debt.dueDate);
                    const isOverdue = debt.status === 'overdue';
                    const isPaid = debt.status === 'paid';

                    return (
                        <div
                            key={debt.id}
                            className={`debt-card glass-card animate-fade-in-up ${isOverdue ? 'overdue' : ''}`}
                            style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                        >
                            <div className="debt-card-header">
                                <div className="debt-user">
                                    <div className="debt-user-icon"><User size={16} /></div>
                                    <span className="debt-user-name">{debt.sellerName}</span>
                                </div>
                                <div className={`debt-status-badge ${debt.status}`}>
                                    {isPaid ? <CheckCircle2 size={12} /> : isOverdue ? <AlertCircle size={12} /> : <Clock size={12} />}
                                    {debt.status === 'active' ? 'Faol' : debt.status === 'overdue' ? 'Kechikkan' : 'Yopilgan'}
                                </div>
                            </div>

                            <div className="debt-card-content">
                                <div className="debt-product">
                                    <Package size={14} className="text-tertiary" />
                                    <span>{debt.product}</span>
                                </div>

                                <div className="debt-money-grid">
                                    <div className="debt-money-item">
                                        <span className="label">Jami qarz</span>
                                        <span className="value">{formatMoney(debt.totalAmount)}</span>
                                    </div>
                                    <div className="debt-money-item">
                                        <span className="label">To'langan</span>
                                        <span className="value text-success">{formatMoney(debt.paidAmount)}</span>
                                    </div>
                                    <div className="debt-money-item">
                                        <span className="label">Qoldi</span>
                                        <span className={`value bold ${remaining > 0 ? 'text-danger' : 'text-success'}`}>
                                            {formatMoney(remaining)}
                                        </span>
                                    </div>
                                </div>

                                {!isPaid && (
                                    <div className="debt-progress-wrap">
                                        <div className="progress-bar">
                                            <div
                                                className={`progress-bar-fill ${isOverdue ? 'danger' : ''}`}
                                                style={{ width: `${(debt.paidAmount / debt.totalAmount) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="debt-card-footer">
                                <div className="debt-date">
                                    <Calendar size={14} />
                                    <span>Muddati: <strong>{formatDate(debt.dueDate)}</strong></span>
                                    {!isPaid && (
                                        <span className={`days-badge ${isOverdue ? 'danger' : 'warning'}`}>
                                            {isOverdue ? `${Math.abs(daysLeft)} kun o'tdi` : `${daysLeft} kun qoldi`}
                                        </span>
                                    )}
                                </div>
                                {!isPaid && (
                                    <button className="btn btn-primary btn-sm payment-btn">
                                        To'lov <ArrowUpRight size={14} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
