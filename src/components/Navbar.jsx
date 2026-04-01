import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for glass intensity
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

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
            className={`fixed top-4 md:top-6 left-1/2 z-50 w-[92%] md:w-[90%] max-w-4xl backdrop-blur-xl border rounded-2xl md:rounded-full px-5 py-3.5 md:px-6 md:py-3 flex items-center justify-between shadow-2xl shadow-black/50 transition-all duration-300 ${
                scrolled
                    ? 'bg-[#0b0f19]/90 border-white/[0.08]'
                    : 'bg-[#0b0f19]/60 border-white/[0.05]'
            }`}
        >
            <Link to="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2 hover:text-cyan-400 transition-colors group">
                <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] group-hover:shadow-[0_0_18px_#22d3ee] transition-shadow"></div>
                </div>
                Nisha<span className="text-slate-500">.sec</span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-400">
                {['work', 'blog', 'about'].map(item => (
                    item === 'blog' ? (
                        <Link key={item} to="/blog" className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200 capitalize">
                            {item}
                        </Link>
                    ) : (
                        <button key={item} onClick={() => handleNavigation(item)} className="px-4 py-2 rounded-full hover:text-white hover:bg-white/[0.06] transition-all duration-200 capitalize cursor-pointer">
                            {item}
                        </button>
                    )
                ))}
            </div>

            <button
                onClick={() => handleNavigation('contact')}
                className="hidden md:flex items-center gap-2 text-xs font-semibold bg-white text-black px-5 py-2 rounded-full hover:bg-cyan-400 hover:text-black transition-colors duration-300 cursor-pointer"
            >
                Contact
            </button>

            {/* Mobile Hamburger */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-slate-300 hover:text-white transition-colors cursor-pointer"
                aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-3 bg-[#0b0f19]/95 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-1 md:hidden shadow-2xl"
                >
                    {['work', 'about'].map(item => (
                        <button key={item} onClick={() => handleNavigation(item)} className="text-left text-slate-300 hover:text-cyan-400 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/[0.04] capitalize cursor-pointer">
                            {item}
                        </button>
                    ))}
                    <Link to="/blog" onClick={() => setMobileOpen(false)} className="text-slate-300 hover:text-cyan-400 transition-colors font-medium py-3 px-3 rounded-xl hover:bg-white/[0.04]">
                        Blog
                    </Link>
                    <hr className="border-white/[0.06] my-2" />
                    <button onClick={() => handleNavigation('contact')} className="text-xs font-semibold bg-white text-black px-4 py-2.5 rounded-full hover:bg-cyan-400 transition-colors w-full cursor-pointer">
                        Contact
                    </button>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
