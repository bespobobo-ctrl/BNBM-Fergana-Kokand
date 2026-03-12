import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Users, FileText, Bot, CreditCard, ShieldCheck, LogOut } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ user, onLogout }) {
    const location = useLocation();

    // Role-based navigation items
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Asosiy', roles: ['admin', 'director', 'seller', 'guest', 'storekeeper'] },
        { path: '/management', icon: ShieldCheck, label: 'Admin', roles: ['admin'] },
        { path: '/management', icon: ShieldCheck, label: 'Boshqaruv', roles: ['director'] },
        { path: '/products', icon: Package, label: 'Ombor', roles: ['storekeeper'] },
        { path: '/debts', icon: CreditCard, label: 'Qarzlar', roles: ['director', 'seller'] },
        { path: '/clients', icon: Users, label: 'Mijozlar', roles: ['director', 'seller'] },
        { path: '/ai', icon: Bot, label: 'AI', roles: ['admin', 'director'] },
    ];

    const filteredItems = navItems.filter(item => item.roles.includes(user.role));

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav-inner">
                {filteredItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                        >
                            <div className="nav-icon-wrap">
                                {isActive && <div className="nav-active-bg"></div>}
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                            </div>
                            <span className="nav-label">{item.label}</span>
                        </NavLink>
                    );
                })}
                <button className="nav-item logout-btn-nav" onClick={onLogout}>
                    <div className="nav-icon-wrap"><LogOut size={22} /></div>
                    <span className="nav-label">Chiqish</span>
                </button>
            </div>
        </nav>
    );
}
