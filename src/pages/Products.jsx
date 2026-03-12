import { useState } from 'react';
import { Search, Filter, Plus, ChevronRight, Package, Info, ArrowLeft, MoreVertical, Box, PlusCircle } from 'lucide-react';
import { products as mockProducts, categories, formatFullMoney } from '../data/mockData';
import './Products.css';

export default function Products({ user }) {
    const [localProducts, setLocalProducts] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_all_products');
            return (saved && JSON.parse(saved)) || mockProducts;
        } catch (e) { return mockProducts; }
    });

    const [showInboundModal, setShowInboundModal] = useState(false);
    const [inboundForm, setInboundForm] = useState({ product: '', amount: '', category: 'Materiallar', unit: 'kg' });

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
        alert("Prihot so'rovi yuborildi. Rahbar tomonidan tasdiqlanishi va narx belgilanishini kuting.");
        setShowInboundModal(false);
        setInboundForm({ product: '', amount: '', category: 'Materiallar', unit: 'kg' });
    };

    const [activeCategory, setActiveCategory] = useState('Barchasi');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = localProducts.filter(p => {
        const matchesCategory = activeCategory === 'Barchasi' || p.category === activeCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="page products-page">
            {/* Header */}
            <header className="page-header animate-fade-in">
                <h1 className="page-title">Mahsulotlar</h1>
                <div className="page-header-actions">
                    <button className="icon-btn"><Search size={20} /></button>
                    <button className="icon-btn"><Filter size={20} /></button>
                </div>
            </header>

            {/* Search Bar */}
            <div className="search-section animate-fade-in-up stagger-1">
                <div className="search-wrap">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Mahsulot qidirish..."
                        className="input search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="categories-scroll animate-fade-in-up stagger-2">
                <button
                    className={`category-pill ${activeCategory === 'Barchasi' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('Barchasi')}
                >
                    Barchasi
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        className={`category-pill ${activeCategory === cat.name ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat.name)}
                    >
                        <span className="cat-icon">{cat.icon}</span>
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Grid Summary */}
            <div className="grid-summary animate-fade-in stagger-3">
                <span>Natijalar: <strong>{filteredProducts.length} ta</strong></span>
                <span className="grid-sort">Sana bo'yicha ↓</span>
            </div>

            {/* Products list */}
            <div className="products-list">
                {filteredProducts.map((product, i) => (
                    <div
                        key={product.id}
                        className="product-card glass-card animate-fade-in-up"
                        style={{ animationDelay: `${0.2 + (i % 10) * 0.05}s` }}
                    >
                        <div className="product-image-wrap">
                            <span className="product-emoji">{product.image}</span>
                            <div className="product-branch-dot" title={product.branch}></div>
                        </div>

                        <div className="product-details">
                            <div className="product-header">
                                <span className="product-cat-label">{product.category}</span>
                                <button className="product-more"><MoreVertical size={16} /></button>
                            </div>
                            <h3 className="product-name">{product.name}</h3>
                            <div className="product-price">{formatFullMoney(product.price)} <span>/ {product.unit}</span></div>

                            <div className="product-stock-wrap">
                                <div className="stock-info">
                                    <span className="stock-label">Omborda:</span>
                                    <span className={`stock-value ${product.status}`}>
                                        {product.stock} {product.unit}
                                    </span>
                                </div>
                                <div className="stock-bar">
                                    <div
                                        className={`stock-bar-fill ${product.status}`}
                                        style={{ width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>

                            {product.status !== 'plenty' && (
                                <div className={`stock-warning ${product.status}`}>
                                    <Info size={12} />
                                    <span>{product.status === 'low' ? 'Kam qolmoqda' : 'Zudlik bilan to\'ldiring'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Action Button */}
            {user.role === 'storekeeper' && (
                <button className="fab-btn animate-fade-in" onClick={() => setShowInboundModal(true)}>
                    <Plus size={28} />
                </button>
            )}

            {/* Inbound Product Modal */}
            {showInboundModal && (
                <div className="modal-overlay" style={{ zIndex: 1200 }}>
                    <div className="modal-content glass-card p-6" style={{ maxWidth: '450px' }}>
                        <div className="modal-header">
                            <h2 className="flex items-center gap-2"><PlusCircle className="text-accent" /> Yangi Mahsulot Prihoti</h2>
                            <button className="close-btn" onClick={() => setShowInboundModal(false)}>×</button>
                        </div>
                        <div className="modal-body py-4">
                            <p className="text-xs text-secondary mb-4">Omborga kelgan yangi mahsulot ma'lumotlarini kiriting. Rahbar tasdiqlaganidan keyin ro'yxatga qo'shiladi.</p>

                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Mahsulot nomi</label>
                                <input
                                    type="text"
                                    className="input mt-1"
                                    placeholder="Masalan: Shifer"
                                    value={inboundForm.product}
                                    onChange={(e) => setInboundForm({ ...inboundForm, product: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div className="form-group">
                                    <label className="text-xs text-tertiary">Miqdori</label>
                                    <input
                                        type="number"
                                        className="input mt-1"
                                        placeholder="100"
                                        value={inboundForm.amount}
                                        onChange={(e) => setInboundForm({ ...inboundForm, amount: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="text-xs text-tertiary">Birligi</label>
                                    <select
                                        className="input mt-1"
                                        value={inboundForm.unit}
                                        onChange={(e) => setInboundForm({ ...inboundForm, unit: e.target.value })}
                                    >
                                        <option value="kg">kg</option>
                                        <option value="metr">metr</option>
                                        <option value="dona">dona</option>
                                        <option value="qop">qop</option>
                                        <option value="kub">kub</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="text-xs text-tertiary">Kategoriya</label>
                                <select
                                    className="input mt-1"
                                    value={inboundForm.category}
                                    onChange={(e) => setInboundForm({ ...inboundForm, category: e.target.value })}
                                >
                                    {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="modal-actions pt-4 flex gap-2">
                            <button className="btn btn-secondary flex-1" onClick={() => setShowInboundModal(false)}>Bekor qilish</button>
                            <button className="btn btn-primary flex-1" onClick={handleRequestInbound}>So'rov yuborish</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
