import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleNavigation = (id) => {
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
                // Clear state so it doesn't persist on refresh
                window.history.replaceState({}, document.title);
            }, 100);
        }
    }, [location]);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between">
            <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2 hover:text-cyan-400 transition-colors">
                <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>
                Nisha<span className="text-slate-500">.sec</span>
            </Link>

            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                <button onClick={() => handleNavigation('work')} className="hover:text-white transition-colors">Work</button>
                <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
                <button onClick={() => handleNavigation('about')} className="hover:text-white transition-colors">About</button>
            </div>

            <button onClick={() => handleNavigation('contact')} className="hidden md:block text-xs font-semibold bg-white text-black px-4 py-2 rounded-full hover:bg-slate-200 transition-colors">
                Contact
            </button>
        </nav>
    );
};

export default Navbar;
