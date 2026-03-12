import { useState } from 'react';
import { Eye, EyeOff, Phone, Lock, ArrowRight, HardHat, UserCircle, Info } from 'lucide-react';
import { users } from '../data/mockData';
import './Login.css';

export default function Login({ onLogin }) {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            let parsedDirectors = [];
            let parsedSellers = [];
            let parsedStorekeepers = [];

            try {
                const savedDirectors = localStorage.getItem('bt_directors');
                parsedDirectors = savedDirectors ? JSON.parse(savedDirectors) : [];

                const savedSellers = localStorage.getItem('bt_sellers');
                parsedSellers = savedSellers ? JSON.parse(savedSellers) : [];

                const savedStorekeepers = localStorage.getItem('bt_storekeepers');
                parsedStorekeepers = savedStorekeepers ? JSON.parse(savedStorekeepers) : [];
            } catch (e) {
                console.error('Error parsing user data from localStorage:', e);
                // If parsing fails, we'll proceed with empty arrays for dynamic users
                // and rely on the static 'users' or show an error.
                // The error message will be handled by the subsequent login logic.
            }

            // Format dynamic users
            const dynamicDirectors = parsedDirectors.map(d => ({ ...d, password: d.code || d.password }));
            // Dynamic sellers and storekeepers already have 'password' field from our forms

            const allUsers = [...users, ...dynamicDirectors, ...parsedSellers, ...parsedStorekeepers];
            const user = allUsers.find(u => u.phone.replace(/\s/g, '') === phone.replace(/\s/g, '') && u.password === password);

            if (user) {
                setIsLoading(false);
                onLogin(user);
            } else {
                setIsLoading(false);
                setError('Telefon raqam yoki parol noto\'g\'ri!');
            }
        }, 1500);
    };

    const handleGuestLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLogin(users.find(u => u.role === 'guest'));
        }, 1000);
    };

    const [showDemoModal, setShowDemoModal] = useState(false);

    const demoUsers = [
        { role: 'Admin', phone: '+998911444567', pass: '1' },
        { role: 'Rahbar', phone: '+998 97 701 70 01', pass: '2' },
        { role: 'Sotuvchi', phone: '+998200144567', pass: '3' },
    ];

    const fillDemo = (u) => {
        setPhone(u.phone);
        setPassword(u.pass);
        setShowDemoModal(false);
    };

    return (
        <div className="login-page">
            <div className="login-bg-gradient"></div>
            <div className="login-bg-orb login-orb-1"></div>
            <div className="login-bg-orb login-orb-2"></div>
            <div className="login-bg-orb login-orb-3"></div>
            <div className="login-grid-bg"></div>

            <div className="login-content">
                <div className="login-logo-section animate-fade-in-up">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
                        <div style={{ width: '30px', height: '30px', backgroundColor: '#e60000', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ width: '16px', height: '16px', backgroundColor: 'white', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ width: '8px', height: '8px', backgroundColor: '#e60000', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                            </div>
                        </div>
                        <h1 className="login-title" style={{ margin: 0, fontSize: '28px', color: 'white', fontWeight: 900 }}>
                            BNBM <span style={{ color: '#d1d5db', fontWeight: 400 }}>CENTRAL ASIA</span>
                        </h1>
                    </div>
                    <p className="login-subtitle" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.7rem' }}>O'zbekistondagi qurilish materiallari boshqaruv tizimi</p>

                </div>

                <form className="login-form animate-fade-in-up stagger-2" onSubmit={handleSubmit}>
                    <div className="login-card">
                        <h2 className="login-card-title">Tizimga kirish</h2>
                        <p className="login-card-desc">Telefon raqamingiz va parolingizni kiriting</p>

                        <div className="login-fields">
                            <div className="input-group">
                                <div className="input-icon"><Phone size={18} /></div>
                                <input
                                    type="tel"
                                    className="input login-input"
                                    placeholder="+998 XX XXX XX XX"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <div className="input-icon"><Lock size={18} /></div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="input login-input"
                                    placeholder="Parolingiz"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                            {isLoading ? (
                                <div className="login-spinner"></div>
                            ) : (
                                <>
                                    Kirish
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>



                        <div className="login-footer animate-fade-in stagger-4">
                            <button className="login-demo-link" onClick={() => setShowDemoModal(true)}>
                                <Info size={14} />
                                Demo raqamlarni ko'rish
                            </button>
                            <p className="login-v">v1.2.2 • 2026</p>
                            <button
                                style={{ opacity: 0.2, fontSize: '10px', background: 'none', border: 'none', color: 'white', marginTop: '10px', cursor: 'pointer' }}
                                onClick={() => {
                                    if (confirm("Barcha ma'lumotlarni o'chirib, tizimni qayta yuklashni xohlaysizmi?")) {
                                        localStorage.clear();
                                        window.location.reload();
                                    }
                                }}
                            >
                                Tizimni tozalash
                            </button>
                        </div>
                    </div>
                </form>

                {showDemoModal && (
                    <div className="modal-overlay" style={{ zIndex: 2000 }}>
                        <div className="modal-content glass-card animate-scale-in" style={{ maxWidth: '320px' }}>
                            <div className="modal-header">
                                <h3>Demo Kirishlar</h3>
                                <button className="close-btn" onClick={() => setShowDemoModal(false)}>×</button>
                            </div>
                            <div className="modal-body py-4 space-y-3">
                                {demoUsers.map(u => (
                                    <button key={u.role} className="w-full p-3 glass-card hover:bg-white/10 text-left transition-all border border-white/5" onClick={() => fillDemo(u)}>
                                        <div className="text-xs font-bold text-accent uppercase tracking-widest">{u.role}</div>
                                        <div className="text-sm font-black mt-1">{u.phone}</div>
                                        <div className="text-[10px] text-tertiary">Parol: {u.pass}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );

}
