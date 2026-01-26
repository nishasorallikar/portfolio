import React from 'react';
import { ArrowRight, Bug, Shield, Network, HardDrive } from 'lucide-react';

const Work = () => {
    return (
        <section id="work" className="mt-32">
            <h2 className="text-2xl font-display font-bold mb-10 text-center text-white">Selected Missions</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

                {/* Card 1: Purple Team */}
                <div onClick={() => window.open('#', '_blank')} className="card-wrapper md:col-span-2 group cursor-pointer">
                    <div className="card-content p-8 flex flex-col justify-end min-h-[400px] relative overflow-hidden">
                        {/* Abstract BG */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent"></div>
                        <div className="absolute top-0 right-0 p-10 opacity-20">
                            <Network size={120} className="text-violet-500 transform rotate-12" />
                        </div>

                        <div className="relative z-10">
                            <div className="flex gap-2 mb-4">
                                <span className="px-2 py-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs rounded">Purple Team</span>
                                <span className="px-2 py-1 bg-slate-800 border border-slate-700 text-slate-400 text-xs rounded">Splunk</span>
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-2 text-white group-hover:text-violet-400 transition-colors">Cybersecurity Home Lab</h3>
                            <p className="text-slate-400 text-sm max-w-md mb-6">Designed and deployed a complex local network simulating a corporate environment (AD, pfSense) to safely simulate Advanced Persistent Threats.</p>
                            <span className="text-violet-400 text-sm font-semibold flex items-center gap-2">View Case Study <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Offensive Stats */}
                <div className="card-wrapper md:col-span-1 group">
                    <div className="card-content p-6 flex flex-col h-full bg-slate-950/50">
                        <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
                            <Bug size={24} />
                        </div>
                        <h4 className="font-display font-bold text-lg mb-4 text-slate-100 group-hover:text-red-400 transition-colors">Offensive Sec</h4>
                        <div className="space-y-4">
                            <div className="text-sm text-slate-400">
                                <strong className="text-white block text-xs uppercase tracking-wider mb-1 opacity-70">Toolkit</strong>
                                Burp Suite, Nessus, Metasploit, Nmap
                            </div>
                            <div className="h-px bg-slate-800 w-full group-hover:bg-red-500/30 transition-colors"></div>
                            <div className="text-sm text-slate-400">
                                <strong className="text-white block text-xs uppercase tracking-wider mb-1 opacity-70">Focus</strong>
                                OWASP Top 10, VAPT
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card 3: Defensive Stats */}
                <div className="card-wrapper md:col-span-1 group">
                    <div className="card-content p-6 flex flex-col h-full bg-slate-950/50">
                        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 mb-6 border border-cyan-500/20">
                            <Shield size={24} />
                        </div>
                        <h4 className="font-display font-bold text-lg mb-4 text-slate-100 group-hover:text-cyan-400 transition-colors">Defensive Ops</h4>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {['Splunk', 'Zeek', 'Wireshark', 'Threat Hunting'].map(tag => (
                                <span key={tag} className="px-3 py-1 bg-slate-800 rounded border border-white/5 text-xs text-slate-300 group-hover:border-cyan-500/30 transition-colors">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Card 4: Forensics */}
                <div onClick={() => window.open('#', '_blank')} className="card-wrapper md:col-span-2 group cursor-pointer">
                    <div className="card-content p-8 flex items-center relative overflow-hidden">
                        <div className="relative z-10 w-full grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex gap-2 mb-4">
                                    <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs rounded">Forensics</span>
                                </div>
                                <h3 class="text-xl font-display font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">Digital Forensics Investigation</h3>
                                <p className="text-slate-400 text-sm mb-4">Analyzed raw disk images to recover deleted artifacts and reconstruct event timelines for legal review.</p>
                                <span className="text-cyan-400 text-sm font-semibold flex items-center gap-2">Read Report <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" /></span>
                            </div>

                            {/* Pseudo-Terminal */}
                            <div className="bg-black/80 rounded-lg p-4 font-mono text-xs text-slate-400 border border-white/10 shadow-2xl">
                                <div className="flex gap-1.5 mb-3 border-b border-white/5 pb-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-slate-500"># Initializing Autopsy...</p>
                                    <p>&gt; Mounting image <span className="text-cyan-400">disk_001.img</span></p>
                                    <p>&gt; <span className="text-green-500">Success.</span> 5 Volumes found.</p>
                                    <p>&gt; Analyzing MFT artifacts...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Work;
