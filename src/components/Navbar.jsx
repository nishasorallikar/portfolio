import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleNavigation = (id) => {
        setMobileOpen(false);
        if (location.pathname !== '/') {
            navigate('/', { state: { targetId: id } });
        } else {
            scrollToSection(id);
        }
    };

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (location.pathname === '/' && location.state?.targetId) {
            setTimeout(() => {
                scrollToSection(location.state.targetId);
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0, x: "-50%" }} 
            animate={{ y: 0, opacity: 1, x: "-50%" }} 
            transition={{ type: "spring", stiffness: 300, damping: 30, delay: 0.2 }}
            className="fixed top-4 md:top-6 left-1/2 z-50 w-[92%] md:w-[90%] max-w-4xl bg-[#0b0f19]/85 md:bg-[#0b0f19]/70 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full px-5 py-3.5 md:px-6 md:py-3 flex items-center justify-between shadow-2xl shadow-black/50"
        >
            <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                Nisha<span className="text-slate-500">.sec</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <button onClick={() => handleNavigation('work')} className="hover:text-white transition-colors">Work</button>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <button onClick={() => handleNavigation('about')} className="hover:text-white transition-colors">About</button>
            </div>

            <button onClick={() => handleNavigation('contact')} className="hidden md:block text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                Contact
            </button>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-slate-300 hover:text-white transition-colors"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden animate-fade-in-up shadow-2xl">
                    <button onClick={() => handleNavigation('work')} className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-2">
                        Work
                    </button>
                    <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors font-medium py-2">
                        Blog
                    </Link>
                    <button onClick={() => handleNavigation('about')} className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-2">
                        About
                    </button>
                    <hr className="border-white/10" />
                    <button onClick={() => handleNavigation('contact')} className="text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors w-full">
                        Contact
                    </button>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;
