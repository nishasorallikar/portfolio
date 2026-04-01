import React from 'react';
import { ArrowRight, Server, Shield, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Work = () => {
    return (
        <section id="work" className="mt-32">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center justify-between"
            >
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">Selected Missions</h2>
                <div className="hidden md:block h-[1px] bg-gradient-to-r from-white/10 to-transparent flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 text-sm mb-12 max-w-lg"
            >
                Real-world security labs and interactive training platforms built from the ground up.
            </motion.p>

            <div className="grid grid-cols-1 gap-8 max-w-6xl mx-auto">

                {/* SOC Lab Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05, duration: 0.6 }}
                >
                    <Link to="/project/soc-lab" className="group block cursor-pointer relative">
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                            {/* Animated top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.03] via-transparent to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    {/* Tags */}
                                    <div className="flex gap-2 mb-5 flex-wrap">
                                        <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-semibold rounded-full tracking-wide uppercase">SOC Lab</span>
                                        <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-semibold rounded-full tracking-wide uppercase">Network Security</span>
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                                        SOC Lab — Network Segmentation & Threat Detection
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">
                                        Simulated enterprise SOC using pfSense, Suricata, SafeLine WAF and Wazuh SIEM — with full network segmentation, IDS/IPS rules, and real-time alert triage.
                                    </p>

                                    {/* Tech tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['pfSense', 'Suricata', 'Wazuh', 'SafeLine WAF', 'DVWA', 'Kali Linux', 'VirtualBox'].map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-slate-800/60 rounded-lg border border-white/[0.06] text-[10px] text-slate-400 font-medium group-hover:border-cyan-500/20 group-hover:text-slate-300 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <span className="inline-flex items-center gap-2 text-cyan-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                                        View Full Case Study <ArrowRight size={14} />
                                    </span>
                                </div>

                                {/* Network Diagram */}
                                <div className="hidden md:flex items-center justify-center">
                                    <div className="relative w-full max-w-[300px]">
                                        <svg viewBox="0 0 300 220" className="w-full h-auto opacity-50 group-hover:opacity-90 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                                            {/* pfSense Core */}
                                            <rect x="110" y="10" width="80" height="45" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
                                            <text x="150" y="38" textAnchor="middle" style={{ fontSize: 10, fill: '#60a5fa', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>pfSense</text>
                                            
                                            {/* LAN Zone */}
                                            <rect x="10" y="90" width="90" height="65" rx="10" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                                            <text x="55" y="112" textAnchor="middle" style={{ fontSize: 9, fill: '#2dd4bf', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>LAN</text>
                                            <text x="55" y="140" textAnchor="middle" style={{ fontSize: 8, fill: '#64748b' }}>Wazuh SIEM</text>

                                            {/* DMZ Zone */}
                                            <rect x="200" y="90" width="90" height="65" rx="10" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                                            <text x="245" y="112" textAnchor="middle" style={{ fontSize: 9, fill: '#f59e0b', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>DMZ</text>
                                            <text x="245" y="140" textAnchor="middle" style={{ fontSize: 8, fill: '#64748b' }}>WAF + DVWA</text>

                                            {/* Attacker */}
                                            <rect x="110" y="170" width="80" height="40" rx="10" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
                                            <text x="150" y="195" textAnchor="middle" style={{ fontSize: 9, fill: '#f87171', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Kali Linux</text>

                                            {/* Connection lines */}
                                            <line x1="100" y1="110" x2="110" y2="32" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                                            <line x1="190" y1="32" x2="200" y2="110" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
                                            <line x1="150" y1="55" x2="150" y2="170" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />

                                            {/* Animated attack packet */}
                                            <circle r="3.5" fill="#ef4444" opacity="0.9" style={{ filter: 'drop-shadow(0 0 6px rgba(239,68,68,0.7))' }}>
                                                <animateMotion dur="3s" repeatCount="indefinite" path="M 150 190 L 150 32 L 245 120" calcMode="linear" />
                                            </circle>
                                            <circle r="2.5" fill="#22d3ee" opacity="0.7" style={{ filter: 'drop-shadow(0 0 4px rgba(34,211,238,0.5))' }}>
                                                <animateMotion dur="4s" repeatCount="indefinite" path="M 55 120 L 150 32 L 55 120" calcMode="linear" />
                                            </circle>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* CSA v2 Course Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                >
                    <Link to="/csa" className="group block cursor-pointer relative">
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                            {/* Animated top accent line */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 p-8 md:p-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="flex gap-2 mb-5 flex-wrap">
                                        <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] font-semibold rounded-full tracking-wide uppercase">Course Engine</span>
                                        <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[11px] font-semibold rounded-full tracking-wide uppercase">Interactive</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors duration-300 leading-tight">
                                        EC-Council CSA v2 Interactive Course
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-6 max-w-md leading-relaxed">
                                        A fully fledged interactive module dashboard with Framer Motion animations, comprehensive study materials, and a 100-question practice exam engine.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {['React', 'Framer Motion', 'TailwindCSS', 'Security Ops', 'Incident Response'].map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-slate-800/60 rounded-lg border border-white/[0.06] text-[10px] text-slate-400 font-medium group-hover:border-indigo-500/20 group-hover:text-slate-300 transition-all duration-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="inline-flex items-center gap-2 text-indigo-400 text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                                        Launch Course Platform <ArrowRight size={14} />
                                    </span>
                                </div>

                                {/* Terminal Visual */}
                                <div className="hidden md:flex items-center justify-center">
                                    <div className="relative w-full max-w-[300px]">
                                        <svg viewBox="0 0 300 200" className="w-full h-auto opacity-50 group-hover:opacity-90 transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
                                            <rect x="20" y="30" width="260" height="140" rx="10" fill="#0a0f1a" stroke="#6366f1" strokeWidth="1.5" opacity="0.8" />
                                            <circle cx="40" cy="47" r="4.5" fill="#ef4444" />
                                            <circle cx="56" cy="47" r="4.5" fill="#eab308" />
                                            <circle cx="72" cy="47" r="4.5" fill="#22c55e" />
                                            
                                            <line x1="20" y1="62" x2="280" y2="62" stroke="#6366f1" strokeWidth="1" opacity="0.2" />
                                            
                                            <text x="40" y="85" style={{ fontSize: 10, fill: '#818cf8', fontFamily: "'Space Grotesk', monospace" }}>$ init csa_v2 --modules 8</text>
                                            
                                            <rect x="40" y="105" width="220" height="5" rx="2.5" fill="#1e293b" />
                                            <rect x="40" y="105" width="160" height="5" rx="2.5" fill="url(#progress-grad)">
                                                <animate attributeName="width" values="10;160;160" dur="2.5s" repeatCount="indefinite" />
                                            </rect>
                                            <defs>
                                                <linearGradient id="progress-grad" x1="0" y1="0" x2="1" y2="0">
                                                    <stop offset="0%" stopColor="#6366f1" />
                                                    <stop offset="100%" stopColor="#10b981" />
                                                </linearGradient>
                                            </defs>
                                            
                                            <text x="40" y="135" style={{ fontSize: 9, fill: '#4ade80', fontFamily: "'Space Grotesk', monospace" }}>[✓] Threat Intelligence Loaded</text>
                                            <text x="40" y="152" style={{ fontSize: 9, fill: '#4ade80', fontFamily: "'Space Grotesk', monospace" }}>[✓] Incident Response Protocols Synced</text>
                                            <rect x="235" y="144" width="7" height="12" rx="1" fill="#a5b4fc">
                                                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                                            </rect>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
};

export default Work;
