import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { NmapAnimation } from './NmapAnimation';

const Hero = () => {
    const handleDownload = () => {
        toast.success('Opening Resume...');
        window.open('https://drive.google.com/drive/folders/1f8lE_bkAtoWt54MpXuMcrPBspVEy8XNK?usp=sharing', '_blank');
    };

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative max-w-4xl mx-auto text-center py-10">
            {/* Lightweight Floating Background Elements & Hacker Terminal */}
            <div className="absolute inset-0 pointer-events-none overflow-visible flex items-center justify-center -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(34,211,238,0.1),transparent_50%)]" />
                
                {/* Real-time Nmap scanning terminal effect */}
                <NmapAnimation />

                {/* Floating SVG UI elements */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute top-10 text-cyan-500/10 right-[5%] md:right-[15%]"
                >
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </motion.div>
                <motion.div
                    animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    className="absolute bottom-20 text-blue-500/10 left-[15%]"
                >
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </motion.div>
                <motion.div
                    animate={{ x: [0, 15, 0], y: [0, 10, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute top-40 text-purple-500/10 left-[20%]"
                >
                    <svg width="70" height="70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="M9 18l3-3-3-3"/></svg>
                </motion.div>
            </div>

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-cyan-400 text-xs font-semibold mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] hover:border-cyan-500/60 transition-all cursor-default group"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                <span className="group-hover:text-white transition-colors">SYS_STATUS: READY FOR MISSIONS</span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white"
            >
                Securing the future with <br />
                <span className="text-gradient">precision & foresight.</span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
                I bridge the gap between <strong className="text-slate-200">Vulnerability Assessment</strong> and <strong className="text-slate-200">Incident Response</strong>. I don't just find vulnerabilities—I build the architectures to stop them.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
                <button onClick={scrollToWork} className="btn-static-border cursor-pointer group">
                    <span>View Case Studies</span>
                </button>

                <button onClick={handleDownload} className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors px-4 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    Download Resume
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
};

export default Hero;
