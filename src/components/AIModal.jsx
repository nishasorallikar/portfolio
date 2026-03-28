import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Send, Bot } from 'lucide-react';

const AIModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { type: 'bot', text: '> Initializing AI...\n> Hello! I am Nisha\'s AI Assistant. Ask me about her **experience**, **skills**, or **projects**.' }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMsg }]);
        setInput('');
        setIsLoading(true);

        try {
            await new Promise(r => setTimeout(r, 1000));

            let response = "I primarily focus on cybersecurity. Could you be more specific?";
            const lower = userMsg.toLowerCase();

            if (lower.includes('contact') || lower.includes('email')) {
                response = "You can reach Nisha at **nishasorallikar@gmail.com** or via LinkedIn.";
            } else if (lower.includes('project') || lower.includes('work')) {
                response = "Nisha has worked on significant projects like a **Cybersecurity Home Lab** (Purple Team simulation) and **Media Forensics** investigations using Autopsy.";
            } else if (lower.includes('experience') || lower.includes('intern')) {
                response = "She is currently a **Cybersecurity Intern** at Red Team Hacker Academy, handling VAPT and SOC monitoring.";
            } else if (lower.includes('skill')) {
                response = "Her technical arsenal includes **Splunk**, **Wireshark**, **Burp Suite**, **Nmap**, and cloud security (AWS/Azure).";
            } else if (lower.includes('education') || lower.includes('degree') || lower.includes('college')) {
                response = "Nisha holds a **Bachelor's in Computer Application** from Karnatak Arts, Science & Commerce College.";
            } else if (lower.includes('certif') || lower.includes('course')) {
                response = "She's actively learning through platforms like **TryHackMe** and **Blue Team Labs Online (BTLO)**, with expertise in Splunk and Elastic Stack.";
            } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
                response = "Hello! 👋 How can I help you learn about Nisha's cybersecurity experience?";
            }

            setMessages(prev => [...prev, { type: 'bot', text: response }]);
        } catch (error) {
            setMessages(prev => [...prev, { type: 'bot', text: "Error: System offline. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-cyan-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-cyan-500 transition-all hover:scale-110 animate-pulse-glow cursor-pointer"
                aria-label="Open AI assistant chat"
            >
                <Bot size={24} />
            </button>

            {/* Modal */}
            <div
                className={`fixed bottom-24 right-8 w-[90%] max-w-[400px] h-[500px] bg-slate-950/95 backdrop-blur-md border border-white/10 rounded-2xl z-40 flex flex-col shadow-2xl transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none'}`}
                role="dialog"
                aria-label="AI Assistant"
            >

                {/* Header */}
                <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-cyan-400" />
                        <span className="text-sm font-mono text-slate-300">nisha_ai_assistant.exe</span>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-slate-500 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close AI assistant"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`p-3 rounded-lg max-w-[85%] ${msg.type === 'user' ? 'bg-cyan-400/10 border border-cyan-400/20 text-cyan-100 self-end ml-auto' : 'bg-white/5 border border-white/10 text-slate-200 self-start'}`}>
                            <p dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg w-fit flex gap-1 items-center">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-black/40 rounded-b-2xl">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a command..."
                            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm focus:border-cyan-500 outline-none transition-colors"
                            aria-label="Message input"
                        />
                        <button type="submit" className="text-cyan-400 hover:text-white px-2 transition-colors cursor-pointer" aria-label="Send message">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AIModal;
