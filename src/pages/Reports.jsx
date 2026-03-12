import { ArrowLeft, TrendingUp, Download, PieChart, BarChart3, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

export default function Reports() {
    const navigate = useNavigate();

    return (
        <div className="page reports-page">
            <header className="page-header animate-fade-in">
                <button className="icon-btn" onClick={() => navigate(-1)}><ArrowLeft size={20} /></button>
                <h1 className="page-title">Hisobotlar</h1>
                <button className="icon-btn"><Download size={20} /></button>
            </header>

            <div className="reports-content animate-fade-in-up stagger-1">
                <div className="coming-soon glass-card">
                    <div className="cs-icon">
                        <TrendingUp size={48} className="text-accent animate-float" />
                    </div>
                    <h2>Tahlillar bo'limi</h2>
                    <p>Ushbu bo'limda siz barcha filiallar bo'yicha chuqur moliyaviy tahlillarni ko'rishingiz mumkin bo'ladi.</p>

                    <div className="cs-features">
                        <div className="cs-feature">
                            <PieChart size={20} />
                            <span>Sotuvlar tarkibi</span>
                        </div>
                        <div className="cs-feature">
                            <BarChart3 size={20} />
                            <span>Oylik o'sish grafigi</span>
                        </div>
                        <div className="cs-feature">
                            <Calendar size={20} />
                            <span>Yillik hisobotlar</span>
                        </div>
                    </div>

                    <button className="btn btn-primary" onClick={() => navigate('/')}>Dashboardga qaytish</button>
                </div>
            </div>
        </div>
    );
}
