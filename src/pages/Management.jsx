import { useState, useEffect } from 'react';
import { Users, DollarSign, CheckSquare, ClipboardList, Activity, Plus, Trash2, Edit, CheckCircle2, XCircle, Upload, MessageCircle, ArrowRight, ShieldAlert, Newspaper, Zap, Bot, Settings2, BarChart3, RefreshCw, ShieldCheck, Phone, Send, MessageSquare, Camera, Printer, FileText, Check, Clock, Box, Archive, Building2, MapPin, TrendingUp, ChevronRight, UserCircle, ShieldAlert as ShieldAlertIcon } from 'lucide-react';
import { sellers, products, creditRequests, branches, tasks, auditLogs, formatFullMoney, formatMoney, users, systemErrors, appUpdates, aiTelemetry } from '../data/mockData';
import './Management.css';

export default function Management({ user }) {
    const [activeTab, setActiveTab] = useState(user.role === 'admin' ? 'rahbarlar' : 'sotuvchilar');
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [proofFile, setProofFile] = useState(null);

    const [localDirectors, setLocalDirectors] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_directors');
            return (saved && JSON.parse(saved)) || users.filter(u => u.role === 'director');
        } catch (e) { return users.filter(u => u.role === 'director'); }
    });
    const [localBranches, setLocalBranches] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_branches');
            return (saved && JSON.parse(saved)) || branches;
        } catch (e) { return branches; }
    });

    const [showBranchModal, setShowBranchModal] = useState(false);
    const [editingBranchId, setEditingBranchId] = useState(null);
    const [branchForm, setBranchForm] = useState({ name: '', location: '', color: '#00d4aa' });
    const [localErrors, setLocalErrors] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_errors');
            return (saved && JSON.parse(saved)) || systemErrors;
        } catch (e) { return systemErrors; }
    });

    const [localSellers, setLocalSellers] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_sellers');
            return (saved && JSON.parse(saved)) || sellers;
        } catch (e) { return sellers; }
    });

    const [showSellerModal, setShowSellerModal] = useState(false);
    const [editingSellerId, setEditingSellerId] = useState(null);
    const [sellerForm, setSellerForm] = useState({ name: '', phone: '', password: '', branch: '', telegram: '', photo: '' });

    const [localRequests, setLocalRequests] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_requests');
            return (saved && JSON.parse(saved)) || creditRequests;
        } catch (e) { return creditRequests; }
    });

    const [localPermits, setLocalPermits] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_permits');
            return (saved && JSON.parse(saved)) || [];
        } catch (e) { return []; }
    });

    const [localStorekeepers, setLocalStorekeepers] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_storekeepers');
            return (saved && JSON.parse(saved)) || [];
        } catch (e) { return []; }
    });

    const [localCashSales, setLocalCashSales] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_cash_sales');
            return (saved && JSON.parse(saved)) || [];
        } catch (e) { return []; }
    });

    const [localInboundRequests, setLocalInboundRequests] = useState(() => {
        try {
            const saved = localStorage.getItem('bt_inbound');
            return (saved && JSON.parse(saved)) || [];
        } catch (e) { return []; }
    });

    const [showStorekeeperModal, setShowStorekeeperModal] = useState(false);
    const [editingStorekeeperId, setEditingStorekeeperId] = useState(null);
    const [storekeeperForm, setStorekeeperForm] = useState({ name: '', phone: '', password: '', branch: '', photo: '' });

    const [showPriceModal, setShowPriceModal] = useState(false);
    const [selectedInbound, setSelectedInbound] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const [showReceipt, setShowReceipt] = useState(false);
    const [currentReceipt, setCurrentReceipt] = useState(null);

    useEffect(() => {
        localStorage.setItem('bt_directors', JSON.stringify(localDirectors));
    }, [localDirectors]);

    useEffect(() => {
        localStorage.setItem('bt_branches', JSON.stringify(localBranches));
    }, [localBranches]);

    useEffect(() => {
        localStorage.setItem('bt_errors', JSON.stringify(localErrors));
    }, [localErrors]);

    useEffect(() => {
        localStorage.setItem('bt_sellers', JSON.stringify(localSellers));
    }, [localSellers]);

    useEffect(() => {
        localStorage.setItem('bt_permits', JSON.stringify(localPermits));
    }, [localPermits]);

    useEffect(() => {
        localStorage.setItem('bt_requests', JSON.stringify(localRequests));
    }, [localRequests]);

    useEffect(() => {
        localStorage.setItem('bt_cash_sales', JSON.stringify(localCashSales));
    }, [localCashSales]);

    useEffect(() => {
        localStorage.setItem('bt_storekeepers', JSON.stringify(localStorekeepers));
    }, [localStorekeepers]);

    useEffect(() => {
        localStorage.setItem('bt_inbound', JSON.stringify(localInboundRequests));
    }, [localInboundRequests]);

    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // New Modals State
    const [showDirectorModal, setShowDirectorModal] = useState(false);
    const [editingDirectorId, setEditingDirectorId] = useState(null);
    const [directorForm, setDirectorForm] = useState({ name: '', phone: '', code: '', telegram: '', sign: '' });

    const [showPermitModal, setShowPermitModal] = useState(false);
    const [permitForm, setPermitForm] = useState({ permitNumber: 'R-' + Math.floor(1000 + Math.random() * 9000), note: '' });

    const handleApprove = (req) => {
        setSelectedRequest(req);
        setShowApprovalModal(true);
    };

    const handleFixError = (id) => {
        setLocalErrors(prev => prev.map(err => err.id === id ? { ...err, status: 'Fixed', severity: 'low' } : err));
        alert("Xatolik bartaraf etildi!");
    };

    const handleAddDirector = () => {
        if (!directorForm.name || !directorForm.phone || !directorForm.code) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        if (editingDirectorId) {
            setLocalDirectors(prev => prev.map(d => d.id === editingDirectorId ? { ...d, ...directorForm, avatar: directorForm.name[0] } : d));
            alert("Rahbar ma'lumotlari yangilandi!");
        } else {
            const newDir = {
                id: Date.now(),
                name: directorForm.name,
                phone: directorForm.phone,
                code: directorForm.code,
                telegram: directorForm.telegram,
                sign: directorForm.sign,
                role: 'director',
                avatar: directorForm.name[0]
            };
            setLocalDirectors([...localDirectors, newDir]);
            alert("Yangi rahbar muvaffaqiyatli tayinlandi!");
        }

        setShowDirectorModal(false);
        setEditingDirectorId(null);
        setDirectorForm({ name: '', phone: '', code: '', telegram: '', sign: '' });
    };

    const handleDeleteDirector = (id) => {
        if (confirm("Ushbu rahbarnni o'chirmoqchimisiz?")) {
            setLocalDirectors(prev => prev.filter(d => d.id !== id));
            alert("Rahbar o'chirildi.");
        }
    };

    const handleEditDirector = (director) => {
        setEditingDirectorId(director.id);
        setDirectorForm({
            name: director.name,
            phone: director.phone,
            code: director.code || director.password || '',
            telegram: director.telegram || '',
            sign: director.sign || ''
        });
        setShowDirectorModal(true);
    };

    const handleAddSeller = () => {
        if (!sellerForm.name || !sellerForm.phone || !sellerForm.password || !sellerForm.branch) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        if (editingSellerId) {
            setLocalSellers(prev => prev.map(s => s.id === editingSellerId ? { ...s, ...sellerForm, avatar: sellerForm.name[0] } : s));
            alert("Sotuvchi ma'lumotlari yangilandi!");
        } else {
            const newSeller = {
                id: Date.now(),
                ...sellerForm,
                role: 'seller',
                avatar: sellerForm.name[0]
            };
            setLocalSellers([...localSellers, newSeller]);
            alert("Yangi sotuvchi muvaffaqiyatli qo'shildi!");
        }

        setShowSellerModal(false);
        setEditingSellerId(null);
        setSellerForm({ name: '', phone: '', password: '', branch: '', telegram: '', photo: '' });
    };

    const handleDeleteSeller = (id) => {
        if (confirm("Ushbu sotuvchini o'chirmoqchimisiz?")) {
            setLocalSellers(prev => prev.filter(s => s.id !== id));
            alert("Sotuvchi o'chirildi.");
        }
    };

    const handleEditSeller = (seller) => {
        setEditingSellerId(seller.id);
        setSellerForm({
            name: seller.name,
            phone: seller.phone,
            password: seller.password || '',
            branch: seller.branch || '',
            telegram: seller.telegram || '',
            photo: seller.photo || ''
        });
        setShowSellerModal(true);
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSellerForm({ ...sellerForm, photo: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIssuePermit = () => {
        const newPermit = {
            id: Date.now(),
            permitNumber: permitForm.permitNumber,
            client: selectedRequest.client,
            amount: selectedRequest.amount,
            product: selectedRequest.product,
            directorName: user.name,
            directorSign: user.sign || 'BT-ADMIN',
            date: new Date().toLocaleString(),
            note: permitForm.note
        };

        setLocalPermits([newPermit, ...localPermits]);

        // Update request status locally
        setLocalRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: 'approved' } : r));

        setCurrentReceipt(newPermit);
        setShowReceipt(true);

        setShowPermitModal(false);
        setShowApprovalModal(false);
        alert(`${selectedRequest.client} uchun ${permitForm.permitNumber} raqamli maxsus ruhsatnoma rasmiylashtirildi!`);
    };

    const handleConfirmCashSale = (id) => {
        setLocalCashSales(prev => prev.map(s => s.id === id ? { ...s, status: 'Confirmed' } : s));
        alert("To'lov muvaffaqiyatli tasdiqlandi!");
    };

    const handleReportCashSale = () => {
        const amount = prompt("To'langan summani kiriting:");
        if (!amount) return;

        const newSale = {
            id: Date.now(),
            seller: user.name,
            amount: amount,
            date: new Date().toLocaleString(),
            status: 'Pending'
        };

        setLocalCashSales([newSale, ...localCashSales]);
        alert("To'lov haqida Rahbarga habar yuborildi. Tasdiqlash kutilmoqda.");
    };

    const handleAddStorekeeper = () => {
        if (!storekeeperForm.name || !storekeeperForm.phone || !storekeeperForm.password || !storekeeperForm.branch) {
            alert("Iltimos, barcha maydonlarni to'ldiring!");
            return;
        }

        if (editingStorekeeperId) {
            setLocalStorekeepers(prev => prev.map(s => s.id === editingStorekeeperId ? { ...s, ...storekeeperForm, avatar: storekeeperForm.name[0] } : s));
            alert("Omborchi ma'lumotlari yangilandi!");
        } else {
            const newSk = {
                id: Date.now(),
                ...storekeeperForm,
                role: 'storekeeper',
                avatar: storekeeperForm.name[0]
            };
            setLocalStorekeepers([...localStorekeepers, newSk]);
            alert("Yangi omborchi muvaffaqiyatli qo'shildi!");
        }

        setShowStorekeeperModal(false);
        setEditingStorekeeperId(null);
        setStorekeeperForm({ name: '', phone: '', password: '', branch: '', photo: '' });
    };

    const handleDeleteStorekeeper = (id) => {
        if (confirm("Ushbu omborchini o'chirmoqchimisiz?")) {
            setLocalStorekeepers(prev => prev.filter(s => s.id !== id));
            alert("Omborchi o'chirildi.");
        }
    };

    const handleEditStorekeeper = (sk) => {
        setEditingStorekeeperId(sk.id);
        setStorekeeperForm({
            name: sk.name,
            phone: sk.phone,
            password: sk.password || '',
            branch: sk.branch || '',
            photo: sk.photo || ''
        });
        setShowStorekeeperModal(true);
    };

    const handleApproveInbound = () => {
        if (!newPrice) {
            alert("Iltimos, mahsulot uchun narx belgilang!");
            return;
        }

        // Update local products and inbound request status
        setLocalInboundRequests(prev => prev.map(item =>
            item.id === selectedInbound.id ? { ...item, status: 'approved', price: newPrice } : item
        ));

        alert(`${selectedInbound.product} muvaffaqiyatli prihot qilindi va narxi ${newPrice} so'm qilib belgilandi!`);
        setShowPriceModal(false);
        setSelectedInbound(null);
        setNewPrice('');
    };

    const runAIPrediction = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            alert("AI barcha ma'lumotlarni tahlil qildi. Xulosa: Tizim samaradorligi 98% ga yetdi.");
        }, 2000);
    };

    const handleAddBranch = () => {
        setEditingBranchId(null);
        setBranchForm({ name: '', location: '', color: '#00d4aa' });
        setShowBranchModal(true);
    };

    const handleEditBranch = (branch) => {
        setEditingBranchId(branch.id);
        setBranchForm({ name: branch.name, location: branch.location, color: branch.color });
        setShowBranchModal(true);
    };

    const handleSaveBranch = () => {
        if (!branchForm.name || !branchForm.location) {
            alert("Barcha maydonlarni to'ldiring!");
            return;
        }

        if (editingBranchId) {
            setLocalBranches(localBranches.map(b => b.id === editingBranchId ? { ...b, ...branchForm } : b));
            alert("Filial o'zgartirildi!");
        } else {
            const newBranch = {
                id: Date.now(),
                ...branchForm,
                productsCount: 0,
                totalSales: 0,
                monthSales: 0,
                employees: 0
            };
            setLocalBranches([...localBranches, newBranch]);
            alert("Yangi filial qo'shildi!");
        }
        setShowBranchModal(false);
    };

    const handleDeleteBranch = (id, name) => {
        if (confirm(`${name} filialini o'chirib tashlamoqchimisiz?`)) {
            setLocalBranches(localBranches.filter(b => b.id !== id));
        }
    };

    return (
        <div className="page management-page">
            <header className="page-header animate-fade-in">
                <h1 className="page-title">{user.role === 'admin' ? 'Admin Paneli' : 'Rahbar Boshqaruvi'}</h1>
            </header>

            {/* Management Tabs */}
            <div className="mgmt-tabs animate-fade-in-up stagger-1">
                {user.role === 'admin' ? (
                    <>
                        <button className={`mgmt-tab ${activeTab === 'filiallar' ? 'active' : ''}`} onClick={() => setActiveTab('filiallar')}>
                            <Building2 size={18} />
                            <span>Filiallar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'rahbarlar' ? 'active' : ''}`} onClick={() => setActiveTab('rahbarlar')}>
                            <Users size={18} />
                            <span>Rahbarlar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'xatoliklar' ? 'active' : ''}`} onClick={() => setActiveTab('xatoliklar')}>
                            <ShieldAlert size={18} />
                            <span>Xatoliklar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'ai_nazorat' ? 'active' : ''}`} onClick={() => setActiveTab('ai_nazorat')}>
                            <Bot size={18} />
                            <span>AI Tahlil</span>
                        </button>
                    </>
                ) : (
                    <>
                        <button className={`mgmt-tab ${activeTab === 'filiallar' ? 'active' : ''}`} onClick={() => setActiveTab('filiallar')}>
                            <Building2 size={18} />
                            <span>Filiallar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'sotuvchilar' ? 'active' : ''}`} onClick={() => setActiveTab('sotuvchilar')}>
                            <Users size={18} />
                            <span>Sotuvchilar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'omborchilar' ? 'active' : ''}`} onClick={() => setActiveTab('omborchilar')}>
                            <Box size={18} />
                            <span>Omborchilar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'prihotlar' ? 'active' : ''}`} onClick={() => setActiveTab('prihotlar')}>
                            <div className="relative">
                                <Archive size={18} />
                                {localInboundRequests.filter(r => r.status === 'pending').length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full"></span>
                                )}
                            </div>
                            <span>Prihot</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'narxlar' ? 'active' : ''}`} onClick={() => setActiveTab('narxlar')}>
                            <DollarSign size={18} />
                            <span>Narxlar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'ruxsatlar' ? 'active' : ''}`} onClick={() => setActiveTab('ruxsatlar')}>
                            <CheckSquare size={18} />
                            <span>Ruxsatlar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'arxiv' ? 'active' : ''}`} onClick={() => setActiveTab('arxiv')}>
                            <FileText size={18} />
                            <span>Arxiv</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'tolovlar' ? 'active' : ''}`} onClick={() => setActiveTab('tolovlar')}>
                            <div className="relative">
                                <Clock size={18} />
                                {localCashSales.filter(s => s.status === 'Pending').length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full"></span>
                                )}
                            </div>
                            <span>To'lovlar</span>
                        </button>
                        <button className={`mgmt-tab ${activeTab === 'topshiriqlar' ? 'active' : ''}`} onClick={() => setActiveTab('topshiriqlar')}>
                            <ClipboardList size={18} />
                            <span>Vazifalar</span>
                        </button>
                    </>
                )}
                <button className={`mgmt-tab ${activeTab === 'audit' ? 'active' : ''}`} onClick={() => setActiveTab('audit')}>
                    <Activity size={18} />
                    <span>Log</span>
                </button>
            </div>

            <div className="mgmt-content">
                {/* ADMIN TABS */}
                {activeTab === 'filiallar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2 className="section-title-premium"><Building2 size={18} className="text-secondary" /> Filiallar Tizimi</h2>
                            <button className="btn btn-primary btn-sm" onClick={handleAddBranch}><Plus size={16} /> Yangi filial</button>
                        </div>

                        <div className="branches-mgmt-grid mt-4">
                            {localBranches.map((branch, i) => (
                                <div key={branch.id} className="mgmt-branch-card glass-premium animate-fade-in-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                    <div className="branch-card-accent" style={{ background: branch.color }}></div>
                                    <div className="branch-card-main">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-black tracking-tight">{branch.name}</h3>
                                                <p className="text-[10px] text-tertiary flex items-center gap-1 mt-1"><MapPin size={10} /> {branch.location}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <button className="icon-btn-mini" onClick={() => handleEditBranch(branch)}><Edit size={12} /></button>
                                                <button className="icon-btn-mini danger" onClick={() => handleDeleteBranch(branch.id, branch.name)}><Trash2 size={12} /></button>
                                            </div>
                                        </div>

                                        <div className="branch-quick-stats mt-6 grid grid-cols-3 gap-2">
                                            <div className="q-stat">
                                                <span className="q-val font-black">{branch.productsCount}</span>
                                                <span className="q-lab">Tovarlar</span>
                                            </div>
                                            <div className="q-stat">
                                                <span className="q-val font-black">{branch.employees}</span>
                                                <span className="q-lab">Xodimlar</span>
                                            </div>
                                            <div className="q-stat">
                                                <span className="q-val font-black text-accent">{formatMoney(branch.monthSales)}</span>
                                                <span className="q-lab">Oy/Savdo</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="branch-card-footer mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
                                        <span className="text-[9px] font-bold text-tertiary uppercase tracking-widest">Faoliyat: Barqaror</span>
                                        <div className="flex -space-x-1.5">
                                            {[1, 2, 3].map(id => (
                                                <div key={id} className="w-5 h-5 rounded-full border-2 border-bg-card bg-tertiary flex items-center justify-center text-[8px] font-bold">U{id}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'rahbarlar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2>Rahbarlarni boshqarish</h2>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowDirectorModal(true)}><Plus size={16} /> Tayinlash</button>
                        </div>
                        <div className="sellers-grid">
                            {localDirectors.map(d => (
                                <div key={d.id} className="mgmt-card glass-card">
                                    <div className="mgmt-card-top">
                                        <div className="user-avatar">{d.avatar}</div>
                                        <div className="user-info">
                                            <h3>{d.name} {d.sign && <span className="badge badge-success ml-2" style={{ fontSize: '0.6rem' }}>SIGN: {d.sign}</span>}</h3>
                                            <p>{d.phone} • {d.telegram || '@tg_user'}</p>
                                            <p className="text-xs text-tertiary">Maxsus parol: <strong>{d.code || d.password || '****'}</strong></p>
                                        </div>
                                        <div className="mgmt-actions">
                                            <button className="icon-btn sm" onClick={() => handleEditDirector(d)}><Edit size={14} /></button>
                                            <button className="icon-btn sm danger" onClick={() => handleDeleteDirector(d.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'xatoliklar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2>Tizim Xatoliklari</h2>
                            <button className="btn btn-secondary btn-sm"><RefreshCw size={16} /> Yangilash</button>
                        </div>
                        <div className="audit-list">
                            {localErrors.map(err => (
                                <div key={err.id} className="audit-item glass-card">
                                    <div className={`status-dot ${err.severity}`}></div>
                                    <div className="audit-main">
                                        <span className="audit-user">{err.type}</span>
                                        <span className="audit-action">Holat: {err.status} • {err.time}</span>
                                    </div>
                                    {err.status !== 'Fixed' && (
                                        <button className="btn btn-xs btn-primary ml-auto" onClick={() => handleFixError(err.id)}>Tuzatish</button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'ai_nazorat' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2>AI Nazorat va Tahlil</h2>
                            <button className="btn btn-secondary btn-sm" onClick={runAIPrediction} disabled={isAnalyzing}>
                                {isAnalyzing ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                                {isAnalyzing ? "Tahlil qilinmoqda..." : "Ma'lumotlarni tahlil qilish"}
                            </button>
                        </div>

                        {/* AI Telemetry Cards */}
                        <div className="stats-grid mb-6">
                            <div className="stat-card glass-card">
                                <Zap size={20} className="text-teal" />
                                <div className="stat-info">
                                    <span className="stat-label">Model Aniqligi</span>
                                    <span className="stat-value">{aiTelemetry.modelAccuracy}</span>
                                </div>
                            </div>
                            <div className="stat-card glass-card">
                                <BarChart3 size={20} className="text-blue" />
                                <div className="stat-info">
                                    <span className="stat-label">Tahlil qilingan</span>
                                    <span className="stat-value">{aiTelemetry.dataAnalyzed}</span>
                                </div>
                            </div>
                        </div>

                        <div className="dash-section">
                            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                                <Bot size={16} className="text-accent" /> AI tomonidan to'plangan tahlillar:
                            </h3>
                            <div className="insights-list">
                                {aiTelemetry.insightsToday.map(ins => (
                                    <div key={ins.id} className="mgmt-card glass-card p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="badge badge-primary">{ins.category}</span>
                                            <span className={`badge badge-${ins.priority === 'high' ? 'danger' : 'warning'}`}>{ins.priority.toUpperCase()}</span>
                                        </div>
                                        <p className="text-secondary text-sm leading-relaxed">{ins.insight}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-top border-glass">
                            <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><BarChart3 size={16} /> Ma'lumotlar tahlili (Raw Data Analysis)</h3>
                            <div className="glass-card overflow-hidden">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Mijoz</th>
                                            <th>Faollik</th>
                                            <th>Qarz</th>
                                            <th>AI Xulosa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Azizbek R.</td>
                                            <td>Yuqori</td>
                                            <td>5 mln</td>
                                            <td><span className="text-success">Ishonchli</span></td>
                                        </tr>
                                        <tr>
                                            <td>Shaxzod U.</td>
                                            <td>O'rta</td>
                                            <td>25 mln</td>
                                            <td><span className="text-warning">Xatar bor</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-top border-glass">
                            <h3 className="text-sm font-bold mb-4 flex items-center gap-2"><Settings2 size={16} /> AI Nosozliklarni bartaraf qilish</h3>
                            <div className="glass-card p-4">
                                <p className="text-xs text-tertiary mb-3">AI yordamchi ishlashida muammo bormi? Quyidagi tugma orqali algoritmlarni reset qilib, qayta sozlashingiz mumkin.</p>
                                <button className="btn btn-primary btn-full" onClick={() => alert("AI Algoritmlari qayta sozlandi va xatoliklar bartaraf etildi!")}>
                                    AI ni to'g'irlash (Fix AI)
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* DIRECTOR TABS */}
                {activeTab === 'omborchilar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2>Omborchilarni boshqarish</h2>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowStorekeeperModal(true)}><Plus size={16} /> Qo'shish</button>
                        </div>
                        <div className="sellers-grid">
                            {localStorekeepers.map(s => (
                                <div key={s.id} className="mgmt-card glass-card">
                                    <div className="mgmt-card-top">
                                        <div className="user-avatar overflow-hidden">
                                            {s.photo ? <img src={s.photo} className="user-img" alt={s.name} /> : s.avatar}
                                        </div>
                                        <div className="user-info">
                                            <h3>{s.name}</h3>
                                            <p>{s.branch} filiali • {s.phone}</p>
                                            <p className="text-xs text-tertiary">Parol: <strong>{s.password || '****'}</strong></p>
                                        </div>
                                        <div className="mgmt-actions">
                                            <button className="icon-btn sm" onClick={() => handleEditStorekeeper(s)}><Edit size={14} /></button>
                                            <button className="icon-btn sm danger" onClick={() => handleDeleteStorekeeper(s.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="comm-actions">
                                        <a href={`tel:${s.phone}`} className="comm-btn phone"><Phone size={14} /> Qo'ng'iroq</a>
                                        <a href={`sms:${s.phone}`} className="comm-btn sms"><MessageSquare size={14} /> SMS</a>
                                    </div>
                                </div>
                            ))}
                            {localStorekeepers.length === 0 && <div className="col-span-full text-center p-12 text-tertiary">Birorta ham omborchi tayinlanmagan.</div>}
                        </div>
                    </div>
                )}

                {activeTab === 'prihotlar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Kelgan mahsulotlar (Prihot)</h2></div>
                        <div className="inbound-list space-y-3">
                            {localInboundRequests.map(item => (
                                <div key={item.id} className={`mgmt-card glass-card p-4 border-l-4 ${item.status === 'approved' ? 'border-success' : 'border-warning'}`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold">{item.product}</h3>
                                            <p className="text-xs text-tertiary">Kategoriya: {item.category} • Miqdor: <strong>{item.amount} {item.unit}</strong></p>
                                        </div>
                                        <span className={`badge badge-${item.status === 'approved' ? 'success' : 'warning'}`}>
                                            {item.status === 'approved' ? 'Ruhsat berilgan' : 'Kutilmoqda'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="text-xs text-secondary">Omborchi: {item.requestedBy} • {item.date}</div>
                                        {item.status === 'pending' ? (
                                            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={() => { setSelectedInbound(item); setShowPriceModal(true); }}>
                                                <CheckCircle2 size={14} /> Ruhsat berish va narxlash
                                            </button>
                                        ) : (
                                            <div className="text-right">
                                                <div className="text-xs text-tertiary">Belgilangan narx:</div>
                                                <div className="font-bold text-success">{formatMoney(item.price)} so'm</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {localInboundRequests.length === 0 && <div className="text-center p-12 text-tertiary">Hali prihot so'rovlari yo'q.</div>}
                        </div>
                    </div>
                )}

                {activeTab === 'sotuvchilar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header">
                            <h2>Sotuvchilarni boshqarish</h2>
                            <button className="btn btn-primary btn-sm" onClick={() => setShowSellerModal(true)}><Plus size={16} /> Qo'shish</button>
                        </div>
                        <div className="sellers-grid">
                            {localSellers.map(s => (
                                <div key={s.id} className="mgmt-card glass-card">
                                    <div className="mgmt-card-top">
                                        <div className="user-avatar overflow-hidden">
                                            {s.photo ? <img src={s.photo} className="user-img" alt={s.name} /> : s.avatar}
                                        </div>
                                        <div className="user-info">
                                            <h3>{s.name}</h3>
                                            <p>{s.branch} filiali • {s.phone}</p>
                                            <p className="text-xs text-tertiary">TG: <strong>{s.telegram || '@tg_user'}</strong> • Parol: <strong>{s.password || '****'}</strong></p>
                                        </div>
                                        <div className="mgmt-actions">
                                            <button className="icon-btn sm" onClick={() => handleEditSeller(s)}><Edit size={14} /></button>
                                            <button className="icon-btn sm danger" onClick={() => handleDeleteSeller(s.id)}><Trash2 size={14} /></button>
                                        </div>
                                    </div>
                                    <div className="comm-actions">
                                        <a href={`tel:${s.phone}`} className="comm-btn phone">
                                            <Phone size={14} /> Qo'ng'iroq
                                        </a>
                                        <a href={`sms:${s.phone}`} className="comm-btn sms">
                                            <MessageSquare size={14} /> SMS
                                        </a>
                                        <a href={`https://t.me/${s.telegram?.replace('@', '')}`} target="_blank" rel="noreferrer" className="comm-btn telegram">
                                            <Send size={14} /> Telegram
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'narxlar' && (
                    /* ... price list content ... */
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Mahsulot narxlari</h2></div>
                        <div className="price-list">
                            {products.map(p => (
                                <div key={p.id} className="mgmt-card glass-card price-card">
                                    <div className="price-info">
                                        <span className="p-cat">{p.category}</span>
                                        <h3 className="p-name">{p.name}</h3>
                                    </div>
                                    <div className="price-action">
                                        <div className="price-value">{formatFullMoney(p.price)}</div>
                                        <button className="icon-btn sm" onClick={() => alert("Narx tahrirlash")}><Edit size={14} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'ruxsatlar' && (
                    /* ... requests content ... */
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Kredit so'rovlari</h2></div>
                        <div className="request-list">
                            {localRequests.map(req => (
                                <div key={req.id} className={`mgmt-card glass-card req-card ${req.status}`}>
                                    <div className="req-header">
                                        <span className="req-date">{req.date}</span>
                                        <span className={`badge badge-${req.status === 'pending' ? 'warning' : 'success'}`}>{req.status === 'pending' ? 'Kutilmoqda' : 'Tasdiqlangan'}</span>
                                    </div>
                                    <div className="req-body">
                                        <h3 className="req-client">{req.client}</h3>
                                        <p className="req-detail">{req.product} — {formatMoney(req.amount)} so'm</p>
                                    </div>
                                    {req.status === 'pending' ? (
                                        <div className="req-footer">
                                            <button className="btn btn-primary btn-sm" onClick={() => handleApprove(req)}>Tasdiqlash</button>
                                        </div>
                                    ) : (
                                        <div className="req-footer">
                                            <button className="btn btn-secondary btn-sm" onClick={() => {
                                                const permit = localPermits.find(p => p.client === req.client && p.amount === req.amount);
                                                if (permit) {
                                                    setCurrentReceipt(permit);
                                                    setShowReceipt(true);
                                                } else {
                                                    alert("Chek topilmadi (arxivdan qidirib ko'ring)");
                                                }
                                            }}>Chekni ko'rish</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'topshiriqlar' && (
                    /* ... tasks content ... */
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Topshiriqlar</h2><button className="btn btn-primary btn-sm"><Plus size={16} /> Yangi</button></div>
                        <div className="task-list">
                            {tasks.map(t => (
                                <div key={t.id} className="mgmt-card glass-card task-card">
                                    <div className="task-target">Kimga: <strong>{t.to}</strong></div>
                                    <p className="task-text">{t.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'arxiv' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Ruhsatnomalar Arvixi</h2></div>
                        <div className="permit-list grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {localPermits.length > 0 ? localPermits.map(p => (
                                <div key={p.id} className="mgmt-card glass-card p-4 relative overflow-hidden" onClick={() => { setCurrentReceipt(p); setShowReceipt(true); }}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs text-tertiary">{p.date}</span>
                                        <span className="badge badge-success">Tasdiqlangan</span>
                                    </div>
                                    <h3 className="font-bold">{p.client}</h3>
                                    <p className="text-sm text-secondary">{p.product} — {formatMoney(p.amount)} so'm</p>
                                    <div className="mt-3 pt-3 border-top border-glass flex justify-between items-center">
                                        <span className="text-xs font-mono text-accent">{p.permitNumber}</span>
                                        <span className="text-xs text-tertiary">SIGN: {p.directorSign}</span>
                                    </div>
                                    <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldCheck size={40} /></div>
                                </div>
                            )) : (
                                <div className="col-span-full text-center p-12 text-tertiary">Hoziroq birorta ruhsatnoma rasmiylashtirilmagan.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'tolovlar' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Naqt to'lovlar tasdig'i</h2></div>
                        <div className="cash-sale-list">
                            {localCashSales.length > 0 ? localCashSales.map(s => (
                                <div key={s.id} className={`mgmt-card glass-card p-4 border-l-4 ${s.status === 'Confirmed' ? 'border-success' : 'border-warning'}`}>
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center gap-2">
                                            <Users size={16} className="text-tertiary" />
                                            <span className="text-sm font-bold">{s.seller}</span>
                                        </div>
                                        <span className="text-xs text-tertiary">{s.date}</span>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs text-tertiary">To'langan summa:</p>
                                            <h2 className="text-xl font-bold text-success">{formatFullMoney(s.amount)}</h2>
                                        </div>
                                        {s.status === 'Pending' ? (
                                            <button className="btn btn-primary btn-sm flex items-center gap-1" onClick={() => handleConfirmCashSale(s.id)}>
                                                <Check size={14} /> Tasdiqlash
                                            </button>
                                        ) : (
                                            <span className="text-success flex items-center gap-1 text-sm font-bold">
                                                <CheckCircle2 size={16} /> Tasdiqlangan
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center p-12 text-tertiary">Yangi to'lov xabarlari mavjud emas.</div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="mgmt-section animate-fade-in">
                        <div className="section-header"><h2>Tizim faolligi (Audit)</h2></div>
                        <div className="audit-list">
                            {auditLogs.map(log => (
                                <div key={log.id} className="audit-item glass-card">
                                    <div className="audit-time">{log.time}</div>
                                    <div className="audit-main">
                                        <span className="audit-user">{log.user}</span>
                                        <span className="audit-action">{log.action}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Director Assignment Modal */}
            {showDirectorModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card animate-fade-in-up">
                        <div className="modal-header">
                            <h2>{editingDirectorId ? "Rahbar ma'lumotlarini tahrirlash" : "Yangi Rahbar Tayinlash"}</h2>
                            <button className="close-btn" onClick={() => { setShowDirectorModal(false); setEditingDirectorId(null); setDirectorForm({ name: '', phone: '', code: '', telegram: '', sign: '' }); }}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Ism va Familiya</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Masalan: Azizbek Aliyev"
                                    value={directorForm.name}
                                    onChange={(e) => setDirectorForm({ ...directorForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Telefon raqami</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="+998 90 123 45 67"
                                    value={directorForm.phone}
                                    onChange={(e) => setDirectorForm({ ...directorForm, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Telegram Username</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="@username"
                                    value={directorForm.telegram}
                                    onChange={(e) => setDirectorForm({ ...directorForm, telegram: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Maxsus Parol (Login - tel raqam)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Masalan: 123456"
                                    value={directorForm.code}
                                    onChange={(e) => setDirectorForm({ ...directorForm, code: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Maxsus Imzo/Belgi (Ruxsatnomalar uchun)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Masalan: 🛡️-XYZ"
                                    value={directorForm.sign}
                                    onChange={(e) => setDirectorForm({ ...directorForm, sign: e.target.value })}
                                />
                                <p className="text-xs text-tertiary mt-1">Bu belgi ushbu rahbar tasdiqlagan barcha xujjatlarda aks etadi.</p>
                            </div>
                        </div>
                        <div className="modal-actions mt-4">
                            <button className="btn btn-primary btn-full" onClick={handleAddDirector}>{editingDirectorId ? "Saqlash" : "Tayinlash"}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Special Permit Modal */}
            {showPermitModal && (
                <div className="modal-overlay" style={{ zIndex: 1100 }}>
                    <div className="modal-content glass-card animate-bounce-in" style={{ maxWidth: '350px' }}>
                        <div className="modal-header">
                            <h2>Maxsus Ruhsatnoma</h2>
                            <button className="close-btn" onClick={() => setShowPermitModal(false)}>×</button>
                        </div>
                        <div className="modal-body text-center">
                            <div className="permit-badge mb-4">
                                <ShieldCheck size={48} className="text-success" />
                                <h1 className="mt-2 text-xl font-bold">{permitForm.permitNumber}</h1>
                                <p className="text-xs text-tertiary">Rasmiy ruxsat kodi</p>
                            </div>
                            <textarea
                                className="form-input"
                                placeholder="Qo'shimcha izoh (ixtiyoriy)..."
                                value={permitForm.note}
                                onChange={(e) => setPermitForm({ ...permitForm, note: e.target.value })}
                            />
                        </div>
                        <div className="modal-actions mt-4">
                            <button className="btn btn-success btn-full" onClick={handleIssuePermit}>Ruhsatnomani tasdiqlash</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Approval Modal (Extended with Permit Option) */}
            {showApprovalModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card animate-fade-in-up">
                        <div className="modal-header">
                            <h2>Nasiyani tasdiqlash</h2>
                            <button className="close-btn" onClick={() => setShowApprovalModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <p className="mb-4">Mijoz: <strong>{selectedRequest?.client}</strong></p>
                            <div className="upload-section mb-6">
                                <p className="upload-label">Ruxsat isbotini yuklang (Shartnoma yoki rasm):</p>
                                <label className="upload-box">
                                    <Upload size={32} />
                                    <span>Fayl tanlang</span>
                                    <input type="file" onChange={(e) => setProofFile(e.target.files[0])} hidden />
                                </label>
                                {proofFile && <p className="mt-2 text-success">✓ {proofFile.name} tanlandi</p>}
                            </div>

                            <button className="btn btn-secondary btn-full sm" onClick={() => setShowPermitModal(true)}>
                                <ShieldCheck size={16} /> Maxsus Ruhsatnoma tayinlash
                            </button>
                        </div>
                        <div className="modal-actions mt-4">
                            <button className="btn btn-primary btn-full" onClick={() => {
                                if (!proofFile) {
                                    alert("Iltimos, avval isbot (shartnoma) yuklang yoki Maxsus Ruhsatnoma tugmasini bosing!");
                                    return;
                                }
                                alert("Nasiya tasdiqlandi!");
                                setShowApprovalModal(false);
                            }}>
                                Oddiy Tasdiqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Seller Management Modal */}
            {showSellerModal && (
                <div className="modal-overlay">
                    <div className="modal-content glass-card animate-fade-in-up">
                        <div className="modal-header">
                            <h2>{editingSellerId ? "Sotuvchi ma'lumotlarini tahrirlash" : "Yangi Sotuvchi Qo'shish"}</h2>
                            <button className="close-btn" onClick={() => { setShowSellerModal(false); setEditingSellerId(null); setSellerForm({ name: '', phone: '', password: '', branch: '', telegram: '', photo: '' }); }}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="photo-upload-container">
                                <label className="photo-preview">
                                    {sellerForm.photo ? <img src={sellerForm.photo} alt="Preview" /> : <Camera size={24} className="text-tertiary" />}
                                    <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
                                </label>
                                <span className="text-xs text-tertiary">Sotuvchi rasmini yuklang</span>
                            </div>

                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Ism va Familiya</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Masalan: Jamshid Karimov"
                                    value={sellerForm.name}
                                    onChange={(e) => setSellerForm({ ...sellerForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Telefon raqami (Login)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="+998 90 111 22 33"
                                    value={sellerForm.phone}
                                    onChange={(e) => setSellerForm({ ...sellerForm, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Filial (Filial) nomi</label>
                                <select
                                    className="form-input"
                                    value={sellerForm.branch}
                                    onChange={(e) => setSellerForm({ ...sellerForm, branch: e.target.value })}
                                >
                                    <option value="">Filialni tanlang</option>
                                    {localBranches.map(b => <option key={b.id} value={b.name}>{b.name} filiali</option>)}
                                </select>
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Telegram Username</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="@username"
                                    value={sellerForm.telegram}
                                    onChange={(e) => setSellerForm({ ...sellerForm, telegram: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Kirish Paroli</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Kamida 4 ta belgi"
                                    value={sellerForm.password}
                                    onChange={(e) => setSellerForm({ ...sellerForm, password: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="modal-actions mt-4">
                            <button className="btn btn-primary btn-full" onClick={handleAddSeller}>{editingSellerId ? "Saqlash" : "Qo'shish"}</button>
                        </div>
                    </div>
                </div>
            )}
            {/* Digital Receipt / Check Modal */}
            {showReceipt && currentReceipt && (
                <div className="modal-overlay" style={{ zIndex: 1200 }}>
                    <div className="modal-content glass-card animate-scale-in p-6 bg-white" style={{ maxWidth: '380px', color: '#1a1a1a', background: '#f8fafc' }}>
                        <div className="receipt-paper" id="receipt-to-print">
                            <div className="text-center border-bottom border-dashed pb-4 mb-4">
                                <h1 className="text-2xl font-black mb-1">BUILDTRACK PRO</h1>
                                <p className="text-xs uppercase tracking-widest text-gray-500">Rasmiy Ruhsatnoma Cheki</p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Raqam:</span>
                                    <span className="font-mono font-bold">{currentReceipt.permitNumber}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Sana:</span>
                                    <span>{currentReceipt.date}</span>
                                </div>
                                <div className="flex justify-between text-sm pt-2 border-top border-gray-100">
                                    <span className="text-gray-500">Mijoz:</span>
                                    <span className="font-bold">{currentReceipt.client}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Mahsulot:</span>
                                    <span>{currentReceipt.product}</span>
                                </div>
                                <div className="flex justify-between text-lg font-black pt-3 border-top-2 border-dashed border-gray-300">
                                    <span>SUMMA:</span>
                                    <span className="text-accent">{formatMoney(currentReceipt.amount)} so'm</span>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-top border-dashed border-gray-300">
                                <div className="flex justify-between items-end">
                                    <div className="text-left">
                                        <p className="text-[10px] text-gray-400 uppercase">Tasdiqladi (Rahbar):</p>
                                        <p className="font-bold text-sm">{currentReceipt.directorName}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-400 uppercase">Maxsus Imzo:</p>
                                        <p className="font-serif italic font-bold text-lg text-blue-800">{currentReceipt.directorSign}</p>
                                    </div>
                                </div>
                            </div>

                            {currentReceipt.note && (
                                <div className="mt-4 p-2 bg-gray-50 rounded text-[10px] italic text-gray-600 border border-gray-100">
                                    Izoh: {currentReceipt.note}
                                </div>
                            )}

                            <div className="mt-8 text-center text-[8px] text-gray-400 space-y-1">
                                <p>Ushbu xujjat elektron ko'rinishda tasdiqlangan.</p>
                                <p>Tizim ID: {currentReceipt.id}</p>
                                <div className="pt-2 flex justify-center gap-4">
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions mt-6 flex gap-2">
                            <button className="btn btn-secondary flex-1 flex items-center justify-center gap-2" onClick={() => window.print()}>
                                <Printer size={16} /> Print
                            </button>
                            <button className="btn btn-primary flex-1" onClick={() => setShowReceipt(false)}>Yopish</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Price Setting Modal */}
            {showPriceModal && selectedInbound && (
                <div className="modal-overlay" style={{ zIndex: 1100 }}>
                    <div className="modal-content glass-card p-6" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h2>Mahsulot Narxini Belgilash</h2>
                            <button className="close-btn" onClick={() => setShowPriceModal(false)}>×</button>
                        </div>
                        <div className="modal-body py-4">
                            <p className="text-sm text-secondary mb-4">
                                <strong>{selectedInbound.product}</strong> mahsuloti uchun sotuv narxini belgilang.
                                Miqdor: {selectedInbound.amount} {selectedInbound.unit}.
                            </p>
                            <div className="form-group">
                                <label className="text-xs text-tertiary">Sotuv Narxi (so'm)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    placeholder="Masalan: 550000"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-actions pt-4 gap-2 flex">
                            <button className="btn btn-secondary flex-1" onClick={() => setShowPriceModal(false)}>Bekor qilish</button>
                            <button className="btn btn-primary flex-1" onClick={handleApproveInbound}>Tasdiqlash</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Storekeeper Management Modal */}
            {showStorekeeperModal && (
                <div className="modal-overlay" style={{ zIndex: 1100 }}>
                    <div className="modal-content glass-card animate-fade-in-up">
                        <div className="modal-header">
                            <h2>{editingStorekeeperId ? "Omborchi ma'lumotlarini tahrirlash" : "Yangi Omborchi Qo'shish"}</h2>
                            <button className="close-btn" onClick={() => { setShowStorekeeperModal(false); setEditingStorekeeperId(null); setStorekeeperForm({ name: '', phone: '', password: '', branch: '', photo: '' }); }}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="photo-upload-container">
                                <label className="photo-preview">
                                    {storekeeperForm.photo ? <img src={storekeeperForm.photo} alt="Preview" /> : <Camera size={24} className="text-tertiary" />}
                                    <input type="file" accept="image/*" onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setStorekeeperForm({ ...storekeeperForm, photo: reader.result });
                                            reader.readAsDataURL(file);
                                        }
                                    }} hidden />
                                </label>
                                <span className="text-xs text-tertiary">Omborchi rasmini yuklang</span>
                            </div>

                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Ism va Familiya</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Masalan: Otabek Ergashev"
                                    value={storekeeperForm.name}
                                    onChange={(e) => setStorekeeperForm({ ...storekeeperForm, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Telefon raqami (Login)</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="+998 90 999 88 77"
                                    value={storekeeperForm.phone}
                                    onChange={(e) => setStorekeeperForm({ ...storekeeperForm, phone: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Kirish Paroli</label>
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="••••••"
                                    value={storekeeperForm.password}
                                    onChange={(e) => setStorekeeperForm({ ...storekeeperForm, password: e.target.value })}
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label className="text-xs text-tertiary">Qaysi filial omborchisi</label>
                                <select
                                    className="form-input"
                                    value={storekeeperForm.branch}
                                    onChange={(e) => setStorekeeperForm({ ...storekeeperForm, branch: e.target.value })}
                                >
                                    <option value="">Filialni tanlang</option>
                                    {localBranches.map(b => <option key={b.id} value={b.name}>{b.name} filiali</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="modal-actions mt-4">
                            <button className="btn btn-primary btn-full" onClick={handleAddStorekeeper}>
                                {editingStorekeeperId ? "Saqlash" : "Tayinlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Branch Management Modal */}
            {showBranchModal && (
                <div className="modal-overlay" style={{ zIndex: 1100 }}>
                    <div className="modal-content glass-card animate-scale-in" style={{ maxWidth: '400px' }}>
                        <div className="modal-header">
                            <h2 className="flex items-center gap-2">
                                <Building2 size={20} className="text-secondary" />
                                {editingBranchId ? "Filialni tahrirlash" : "Yangi filial qo'shish"}
                            </h2>
                            <button className="close-btn" onClick={() => setShowBranchModal(false)}>×</button>
                        </div>
                        <div className="modal-body py-4">
                            <div className="form-group mb-4">
                                <label className="text-xs text-tertiary font-bold uppercase tracking-wider mb-2 block">Filial Nomi</label>
                                <div className="relative">
                                    <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
                                    <input
                                        type="text"
                                        className="form-input pl-11"
                                        placeholder="Masalan: Toshkent City"
                                        value={branchForm.name}
                                        onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label className="text-xs text-tertiary font-bold uppercase tracking-wider mb-2 block">Manzil / Lokatsiya</label>
                                <div className="relative">
                                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
                                    <input
                                        type="text"
                                        className="form-input pl-11"
                                        placeholder="Chilonzor tumani, 5-daha"
                                        value={branchForm.location}
                                        onChange={(e) => setBranchForm({ ...branchForm, location: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="text-xs text-tertiary font-bold uppercase tracking-wider mb-2 block">Brend Rangi</label>
                                <div className="flex gap-3">
                                    {['#00d4aa', '#0ea5e9', '#a855f7', '#f97316', '#ef4444'].map(color => (
                                        <button
                                            key={color}
                                            className={`w-10 h-10 rounded-xl border-2 transition-all ${branchForm.color === color ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-50'}`}
                                            style={{ background: color }}
                                            onClick={() => setBranchForm({ ...branchForm, color })}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="modal-actions mt-4 pt-4 border-t border-white/5">
                            <button className="btn btn-primary btn-full py-4 text-sm font-black" onClick={handleSaveBranch}>
                                {editingBranchId ? "O'zgarishlarni saqlash" : "Filialni tasdiqlash"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
