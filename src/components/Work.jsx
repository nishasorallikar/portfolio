import React from 'react';
import { ArrowRight, Server, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Work = () => {
    return (
        <section id="work" className="mt-32">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-display font-bold mb-10 text-center text-white"
            >
                Selected Missions
            </motion.h2>

            <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">

                {/* SOC Lab Card (full-width featured) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 }}
                >
                    <Link to="/project/soc-lab" className="card-wrapper group block cursor-pointer">
                        <div className="card-content p-8 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 via-transparent to-blue-500/5"></div>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Server size={140} className="text-cyan-400 transform -rotate-12" />
                            </div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs rounded">SOC Lab</span>
                                        <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded">Network Security</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
                                        SOC Lab — Network Segmentation &amp; Threat Detection
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-5 max-w-md leading-relaxed">
                                        Simulated enterprise SOC using pfSense, Suricata, SafeLine WAF and Wazuh SIEM
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {['pfSense', 'Suricata', 'Wazuh', 'SafeLine WAF', 'DVWA', 'Kali Linux', 'VirtualBox'].map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-slate-800/80 rounded border border-white/5 text-[10px] text-slate-300 group-hover:border-cyan-500/20 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-cyan-400 text-sm font-semibold flex items-center gap-2">
                                        View Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>

                                <div className="hidden md:block">
                                    <svg viewBox="0 0 300 200" className="w-full h-auto max-w-[280px] ml-auto opacity-60 group-hover:opacity-90 transition-opacity" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="10" y="80" width="80" height="60" rx="8" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                                        <text x="50" y="100" textAnchor="middle" style={{ fontSize: 8, fill: '#2dd4bf', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>LAN</text>
                                        <text x="50" y="125" textAnchor="middle" style={{ fontSize: 7, fill: '#64748b' }}>Wazuh</text>
                                        <rect x="110" y="10" width="80" height="40" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
                                        <text x="150" y="35" textAnchor="middle" style={{ fontSize: 9, fill: '#60a5fa', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>pfSense</text>
                                        <rect x="210" y="80" width="80" height="60" rx="8" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                                        <text x="250" y="100" textAnchor="middle" style={{ fontSize: 8, fill: '#f59e0b', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>DMZ</text>
                                        <text x="250" y="125" textAnchor="middle" style={{ fontSize: 7, fill: '#64748b' }}>WAF + DVWA</text>
                                        <rect x="110" y="150" width="80" height="40" rx="8" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
                                        <text x="150" y="175" textAnchor="middle" style={{ fontSize: 8, fill: '#f87171', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Kali</text>
                                        <line x1="90" y1="100" x2="110" y2="30" stroke="#2dd4bf" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                                        <line x1="190" y1="30" x2="210" y2="100" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                                        <line x1="150" y1="50" x2="150" y2="150" stroke="#ef4444" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />
                                        <circle r="3" fill="#ef4444" opacity="0.8" style={{ filter: 'drop-shadow(0 0 4px rgba(239,68,68,0.6))' }}>
                                            <animateMotion dur="3s" repeatCount="indefinite" path="M 150 170 L 150 30 L 250 110" calcMode="linear" />
                                        </circle>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* CSA v2 Course Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                >
                    <Link to="/csa" className="card-wrapper group block cursor-pointer">
                        <div className="card-content p-8 relative overflow-hidden bg-slate-900 border border-slate-800 rounded-xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/5"></div>
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Shield size={140} className="text-indigo-400 transform rotate-12" />
                            </div>

                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <div className="flex gap-2 mb-4 flex-wrap">
                                        <span className="px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs rounded">Course Engine</span>
                                        <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded">Interactive</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                                        EC-Council CSA v2 Interactive Course
                                    </h3>
                                    <p className="text-slate-400 text-sm mb-5 max-w-md leading-relaxed">
                                        A fully fledged interactive module dashboard with Framer Motion animations, comprehensive study materials, and a 100-question practice exam engine.
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {['React', 'Framer Motion', 'TailwindCSS', 'Security Ops', 'Incident Response'].map(tag => (
                                            <span key={tag} className="px-2.5 py-1 bg-slate-800/80 rounded border border-white/5 text-[10px] text-slate-300 group-hover:border-indigo-500/20 transition-colors">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <span className="text-indigo-400 text-sm font-semibold flex items-center gap-2">
                                        Launch Course Platform <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>

                                <div className="hidden md:block">
                                    <svg viewBox="0 0 300 200" className="w-full h-auto max-w-[280px] ml-auto opacity-70 group-hover:opacity-100 transition-opacity" xmlns="http://www.w3.org/2000/svg">
                                        {/* Animated Terminal visual */}
                                        <rect x="20" y="30" width="260" height="140" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="1.5" opacity="0.8" />
                                        <circle cx="40" cy="45" r="4" fill="#ef4444" />
                                        <circle cx="55" cy="45" r="4" fill="#eab308" />
                                        <circle cx="70" cy="45" r="4" fill="#22c55e" />
                                        
                                        <line x1="20" y1="60" x2="280" y2="60" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
                                        
                                        <text x="40" y="85" style={{ fontSize: 10, fill: '#818cf8', fontFamily: "'Space Grotesk', monospace" }}>$ init csa_v2 --modules 8</text>
                                        
                                        <rect x="40" y="105" width="200" height="4" rx="2" fill="#1e293b" />
                                        <rect x="40" y="105" width="140" height="4" rx="2" fill="#10b981">
                                            <animate attributeName="width" values="10;140;140" dur="2s" repeatCount="indefinite" />
                                        </rect>
                                        
                                        <text x="40" y="135" style={{ fontSize: 9, fill: '#64748b', fontFamily: "'Space Grotesk', monospace" }}>[OK] Threat Intelligence Loaded</text>
                                        <text x="40" y="150" style={{ fontSize: 9, fill: '#64748b', fontFamily: "'Space Grotesk', monospace" }}>[OK] Incident Response Protocols Synchronized</text>
                                        <rect x="235" y="142" width="6" height="10" fill="#a5b4fc">
                                            <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                                        </rect>
                                    </svg>
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

