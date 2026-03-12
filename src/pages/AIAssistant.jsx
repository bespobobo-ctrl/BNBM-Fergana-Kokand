import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Mic, ArrowLeft, MoreHorizontal, Brain } from 'lucide-react';
import { aiMessages } from '../data/mockData';
import './AIAssistant.css';

export default function AIAssistant() {
    const [messages, setMessages] = useState(aiMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', text: input, time: '11:45' };
        setMessages([...messages, userMsg]);
        setInput('');
        setIsTyping(true);

        // Mock AI response
        setTimeout(() => {
            setIsTyping(false);
            const aiResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                text: "Tushunarlu. Ushbu ma'lumotlarni tahlil qilyapman. Boshqa savollaringiz bormi?",
                time: '11:45'
            };
            setMessages(prev => [...prev, aiResponse]);
        }, 2000);
    };

    return (
        <div className="page ai-page">
            <header className="page-header ai-header animate-fade-in">
                <div className="ai-header-info">
                    <div className="ai-bot-avatar">
                        <Bot size={24} />
                        <div className="ai-bot-glow"></div>
                    </div>
                    <div>
                        <h1 className="ai-title">AI Yordamchi</h1>
                        <p className="ai-status"><span>●</span> Onlayn</p>
                    </div>
                </div>
                <button className="icon-btn"><MoreHorizontal size={20} /></button>
            </header>

            <div className="chat-container">
                {messages.map((msg, i) => (
                    <div key={msg.id} className={`message-wrap ${msg.role} animate-fade-in-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="message-content glass-card">
                            {msg.role === 'assistant' && <div className="ai-label"><Brain size={12} /> Tahlil</div>}
                            <p className="message-text">{msg.text}</p>
                            <span className="message-time">{msg.time}</span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="message-wrap assistant typing">
                        <div className="message-content glass-card">
                            <div className="typing-dots">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            <div className="ai-actions animate-fade-in-up stagger-4">
                <div className="prompt-suggestions">
                    {['Bugungi hisobot', 'Qarzlar tahlili', 'Zaxira kammi?'].map(p => (
                        <button key={p} className="suggestion-btn" onClick={() => setInput(p)}>{p}</button>
                    ))}
                </div>

                <div className="input-area glass-card">
                    <button className="voice-btn"><Mic size={20} /></button>
                    <input
                        type="text"
                        placeholder="AI dan so'rang..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button className={`send-btn ${input ? 'active' : ''}`} onClick={handleSend}>
                        {input ? <Send size={20} /> : <Sparkles size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
}
