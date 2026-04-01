import React, { useEffect, useRef, useCallback } from 'react';
import Navbar from '../components/Navbar';
import AIModal from '../components/AIModal';
import { Toaster } from 'react-hot-toast';

const MainLayout = ({ children }) => {
    const spotlightRef = useRef(null);
    const rafIdRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (rafIdRef.current) return;

        rafIdRef.current = requestAnimationFrame(() => {
            const x = e.clientX;
            const y = e.clientY;

            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty('--x', `${x}px`);
                spotlightRef.current.style.setProperty('--y', `${y}px`);
            }

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
            {/* Background Grid & Spotlight */}
            <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-30"></div>
                <div ref={spotlightRef} className="cursor-spotlight mix-blend-screen"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(34,211,238,0.01)_51%,transparent_51%)] bg-[length:100%_4px] z-10"></div>
            </div>

            <Navbar />

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-40 pb-20">
                {children}
            </main>

            <AIModal />
            <Toaster position="bottom-right" toastOptions={{
                className: 'bg-slate-900/90 backdrop-blur border border-cyan-500/30 text-slate-200 shadow-2xl',
                style: {
                    background: 'rgba(15, 23, 42, 0.9)',
                    color: '#e2e8f0',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                },
            }} />

            {/* Premium Footer */}
            <footer className="relative z-10 border-t border-white/[0.05]">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></div>
                            <span className="font-display font-bold text-sm text-slate-400">
                                Nisha<span className="text-slate-600">.sec</span>
                            </span>
                            <span className="text-slate-700 text-xs">
                                © {new Date().getFullYear()}
                            </span>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className="text-[10px] text-slate-600 uppercase tracking-widest font-medium">
                                Built with React + TailwindCSS
                            </span>
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-1.5 text-[10px] text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider font-semibold cursor-pointer"
                            >
                                Back to top
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 15l-6-6-6 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;
