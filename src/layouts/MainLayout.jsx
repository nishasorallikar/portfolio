import React, { useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import AIModal from '../components/AIModal';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    const spotlightRef = useRef(null);
    const rafIdRef = useRef(null);

    // Throttled mousemove with requestAnimationFrame to avoid DOM thrashing
    const handleMouseMove = useCallback((e) => {
        if (rafIdRef.current) return; // Skip if a frame is already scheduled

        rafIdRef.current = requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            // Update Global Spotlight
            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty('--x', `${x}px`);
                spotlightRef.current.style.setProperty('--y', `${y}px`);
            }

            // Update Card Borders
            const cards = document.querySelectorAll('.card-wrapper');
            for (let i = 0; i < cards.length; i++) {
                const rect = cards[i].getBoundingClientRect();
                cards[i].style.setProperty('--mouse-x', `${x - rect.left}px`);
                cards[i].style.setProperty('--mouse-y', `${y - rect.top}px`);
            }

            rafIdRef.current = null;
        });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
        };
    }, [handleMouseMove]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 relative">
            {/* 1. Background Grid & Spotlight & Cyber Scanlines */}
            <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-30"></div>
                <div ref={spotlightRef} className="cursor-spotlight mix-blend-screen"></div>
                {/* CRT Screen Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(34,211,238,0.01)_51%,transparent_51%)] bg-[length:100%_4px] z-10"></div>
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
                    <p>© {new Date().getFullYear()} Nisha Sorallikar.</p>
                    <div className="flex gap-4">
                        <button
                            onClick={scrollToTop}
                            className="hover:text-cyan-400 transition-colors cursor-pointer"
                        >
                            Top ↑
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
