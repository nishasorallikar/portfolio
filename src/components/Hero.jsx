import React from 'react';
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const Hero = () => {
    const handleDownload = () => {
        toast.success('Opening Resume...');
        window.open('https://docs.google.com/document/d/1WB2fSkArQuzS-2RkcmUf7Gd47UlfYVzAwwECj0ZzLS0/edit?usp=sharing', '_blank');
    };

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="max-w-4xl mx-auto text-center">

            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-medium mb-8 backdrop-blur-sm hover:border-cyan-500/50 transition-colors cursor-default"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Open to work: SOC & Offensive Security
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
