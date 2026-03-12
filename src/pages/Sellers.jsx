import { useState } from 'react';
import { Search, MapPin, Phone, Star, TrendingUp, CreditCard, ChevronRight, UserPlus, Filter } from 'lucide-react';
import { sellers, formatMoney } from '../data/mockData';
import './Sellers.css';

export default function Sellers() {
    const [searchQuery, setSearchQuery] = useState('');
    const [localSellers, setLocalSellers] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_sellers');
            return (saved && JSON.parse(saved)) || sellers;
        } catch (e) { return sellers; }
    });

    const filteredSellers = localSellers.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.branch.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="page sellers-page">
            <header className="page-header animate-fade-in">
                <h1 className="page-title">Sotuvchilar</h1>
                <div className="page-header-actions">
                    <button className="icon-btn"><Filter size={20} /></button>
                    <button className="icon-btn highlight"><UserPlus size={20} /></button>
                </div>
            </header>

            <div className="search-section animate-fade-in-up stagger-1">
                <div className="search-wrap">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Sotuvchini qidirish..."
                        className="input search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="sellers-list">
                {filteredSellers.map((seller, i) => (
                    <div
                        key={seller.id}
                        className="seller-card glass-card animate-fade-in-up"
                        style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                    >
                        <div className="seller-card-top">
                            <div className="seller-avatar">
                                {seller.avatar}
                                <div className={`seller-status-dot ${seller.status}`}></div>
                            </div>
                            <div className="seller-primary-info">
                                <div className="seller-name-row">
                                    <h3 className="seller-name">{seller.name}</h3>
                                    <div className="seller-rating">
                                        <Star size={12} fill="var(--warning)" color="var(--warning)" />
                                        <span>{seller.rating}</span>
                                    </div>
                                </div>
                                <div className="seller-meta">
                                    <div className="seller-meta-item">
                                        <MapPin size={12} />
                                        <span>{seller.branch}</span>
                                    </div>
                                    <div className="seller-meta-item">
                                        <Phone size={12} />
                                        <span>{seller.phone}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight size={18} className="seller-arrow" />
                        </div>

                        <div className="seller-card-stats">
                            <div className="seller-stat-box">
                                <span className="seller-stat-label">Umumiy savdo</span>
                                <span className="seller-stat-value">{formatMoney(seller.totalSales)}</span>
                                <div className="seller-stat-trend">
                                    <TrendingUp size={10} /> +5.2%
                                </div>
                            </div>
                            <div className="seller-divider"></div>
                            <div className="seller-stat-box">
                                <span className="seller-stat-label">Joriy qarz</span>
                                <span className={`seller-stat-value ${seller.currentDebt > 0 ? 'debt' : ''}`}>
                                    {formatMoney(seller.currentDebt)}
                                </span>
                                <div className="seller-stat-limit">
                                    Limit: {formatMoney(seller.creditLimit)}
                                </div>
                            </div>
                        </div>

                        <div className="seller-card-footer">
                            <div className="seller-progress-wrap">
                                <div className="progress-info">
                                    <span>Limit ishlatilishi</span>
                                    <span>{Math.round((seller.currentDebt / seller.creditLimit) * 100)}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div
                                        className={`progress-bar-fill ${seller.currentDebt > seller.creditLimit * 0.8 ? 'danger' : ''}`}
                                        style={{ width: `${Math.min((seller.currentDebt / seller.creditLimit) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
