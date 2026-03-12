import { useState } from 'react';
import { Search, UserPlus, Send, Phone, Calendar, Receipt, ChevronRight, MessageCircle, AlertCircle, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { clients, clientTransactions, formatFullMoney, formatMoney, formatDate } from '../data/mockData';
import './Clients.css';

export default function Clients() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSaleModal, setShowSaleModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [isSending, setIsSending] = useState(false);
    const [sentSuccess, setSentSuccess] = useState(false);

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery)
    );

    const handleOpenSale = (client) => {
        setSelectedClient(client);
        setShowSaleModal(true);
        setSentSuccess(false);
    };

    const handleSendToTelegram = () => {
        setIsSending(true);
        // Simulate Telegram API call
        setTimeout(() => {
            setIsSending(false);
            setSentSuccess(true);
            setTimeout(() => setShowSaleModal(false), 2000);
        }, 1500);
    };

    return (
        <div className="page clients-page">
            <header className="page-header animate-fade-in">
                <h1 className="page-title">Mijozlar</h1>
                <button className="icon-btn highlight"><UserPlus size={20} /></button>
            </header>

            <div className="search-section animate-fade-in-up stagger-1">
                <div className="search-wrap">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Mijoz qidirish..."
                        className="input search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="clients-list">
                {filteredClients.map((client, i) => (
                    <div key={client.id} className="client-card glass-card animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                        <div className="client-card-main">
                            <div className="client-info">
                                <h3 className="client-name">{client.name}</h3>
                                <div className="client-meta">
                                    <div className="client-meta-item"><Phone size={12} /> {client.phone}</div>
                                    <div className="client-meta-item"><MessageCircle size={12} /> {client.telegram}</div>
                                </div>
                            </div>
                            <button className="btn-sale" onClick={() => handleOpenSale(client)}>
                                <Receipt size={18} />
                                Sotuv
                            </button>
                        </div>

                        <div className="client-card-stats">
                            <div className="client-stat">
                                <span className="label">Jami harid</span>
                                <span className="value">{formatMoney(client.totalPurchases)}</span>
                            </div>
                            <div className="client-stat">
                                <span className="label">Qarz</span>
                                <span className={`value ${client.currentDebt > 0 ? 'debt' : ''}`}>{formatMoney(client.currentDebt)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sale / Receipt Modal */}
            {showSaleModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card animate-fade-in-up">
                        <div className="modal-header">
                            <h2>Yangi sotuv (Chek)</h2>
                            <button className="close-btn" onClick={() => setShowSaleModal(false)}>×</button>
                        </div>

                        {sentSuccess ? (
                            <div className="success-view animate-fade-in">
                                <div className="success-icon">
                                    <CheckCircle2 size={48} />
                                </div>
                                <h3>Muvaffaqiyatli!</h3>
                                <p>Chek mijozning Telegramiga yuborildi.</p>
                            </div>
                        ) : (
                            <>
                                <div className="receipt-preview">
                                    <div className="receipt-header">
                                        <div className="receipt-logo">BuildTrack <span>Pro</span></div>
                                        <p>Elektron chek #{Math.floor(Math.random() * 10000)}</p>
                                        <p className="receipt-date">{new Date().toLocaleDateString('uz-UZ')}</p>
                                    </div>

                                    <div className="receipt-items">
                                        <div className="receipt-item-header">
                                            <span>Mahsulot</span>
                                            <span>Miqdor</span>
                                            <span>Narx</span>
                                        </div>
                                        <div className="receipt-item">
                                            <span>Sement M400</span>
                                            <span>5 tonna</span>
                                            <span>3.4 mln</span>
                                        </div>
                                        <div className="receipt-item">
                                            <span>G'isht 1-sort</span>
                                            <span>2000 ta</span>
                                            <span>2.4 mln</span>
                                        </div>
                                    </div>

                                    <div className="receipt-summary">
                                        <div className="summary-row">
                                            <span>Jami:</span>
                                            <span>5,800,000 so'm</span>
                                        </div>
                                        <div className="summary-row highlight">
                                            <span>To'landi:</span>
                                            <span>4,000,000 so'm</span>
                                        </div>
                                        <div className="summary-row debt">
                                            <span>Qarz:</span>
                                            <span>1,800,000 so'm</span>
                                        </div>
                                    </div>

                                    <div className="reminder-box">
                                        <Calendar size={14} />
                                        <span>Qarzni uzish muddati: <b>25-mart, 2026</b></span>
                                    </div>
                                </div>

                                <div className="modal-actions">
                                    <div className="telegram-hint">
                                        <MessageCircle size={14} />
                                        Mijoz: {selectedClient?.telegram}
                                    </div>
                                    <button
                                        className={`btn btn-primary send-tg-btn ${isSending ? 'loading' : ''}`}
                                        onClick={handleSendToTelegram}
                                        disabled={isSending}
                                    >
                                        {isSending ? 'Yuborilmoqda...' : (
                                            <>
                                                <Send size={18} />
                                                Telegramga yuborish
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
