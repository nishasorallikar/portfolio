import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import AIModal from '../components/AIModal';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    const spotlightRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Update Global Spotlight
            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty('--x', `${x}px`);
                spotlightRef.current.style.setProperty('--y', `${y}px`);
            }

            // Update Card Borders
            document.querySelectorAll('.card-wrapper').forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = x - rect.left;
                const cardY = y - rect.top;
                card.style.setProperty('--mouse-x', `${cardX}px`);
                card.style.setProperty('--mouse-y', `${cardY}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative">
            {/* 1. Background Grid & Spotlight */}
            <div className="fixed inset-0 z-0 bg-black">
                <div className="absolute inset-0 bg-grid opacity-20"></div>
                <div ref={spotlightRef} className="cursor-spotlight"></div>
            </div>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20">
                {children}
            </main>

            {/* AI & Toasts */}
            <AIModal />
            <Toaster position="bottom-right" toastOptions={{
                className: 'bg-slate-900/90 backdrop-blur border border-cyan-500/30 text-slate-200 shadow-2xl',
                style: {
                    background: 'rgba(15, 23, 42, 0.9)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }} />

            <footer className="border-t border-white/5 py-8 bg-black relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-xs text-slate-600">
                    <p>© 2025 Nisha Sorallikar.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-cyan-400 transition-colors">Top</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
