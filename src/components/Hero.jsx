import React from 'react';
import { ArrowDown } from 'lucide-react';
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-medium mb-8 backdrop-blur-sm hover:border-cyan-500/50 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Open to work: SOC & Offensive Security
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-white">
                Securing the future with <br />
                <span className="text-gradient">precision & foresight.</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                I bridge the gap between <strong>Vulnerability Assessment</strong> and <strong>Incident Response</strong>. I don't just find vulnerabilities—I build the architectures to stop them.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button onClick={scrollToWork} className="btn-static-border cursor-pointer group">
                    <span>View Case Studies</span>
                </button>

                <button onClick={handleDownload} className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors px-4 py-2 rounded-lg hover:bg-white/5">
                    Download Resume
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Hero;
