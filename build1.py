import os

out_fp = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

content = """import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Activity, Shield, AlertTriangle, Terminal, 
    Network, Server, Clock, ServerCrash, Bug, Lock,
    ChevronRight, ArrowLeft, Github, FileText, LayoutDashboard, Database, Crosshair, Target
} from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
   GLOBAL UTILITIES & SHARED
   ───────────────────────────────────────────────────────────── */
const STATUS_COLORS = {
    critical: 'text-red-400 border-red-500/30 bg-red-500/10',
    high: 'text-orange-400 border-orange-500/30 bg-orange-500/10',
    medium: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    low: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    info: 'text-slate-400 border-slate-500/30 bg-slate-500/10',
    success: 'text-green-400 border-green-500/30 bg-green-500/10'
};

const Badge = ({ variant = 'info', children, className = '' }) => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${STATUS_COLORS[variant]} ${className}`}>
        {children}
    </span>
);

/* ─────────────────────────────────────────────────────────────
   PAGE: OVERVIEW DASHBOARD
   ───────────────────────────────────────────────────────────── */
const OverviewPage = () => {
    const metrics = [
        { label: 'Total Alerts', value: '1,247', color: 'text-slate-200' },
        { label: 'Critical', value: '23', color: 'text-red-400' },
        { label: 'High', value: '89', color: 'text-orange-400' },
        { label: 'WAF Blocked', value: '389', color: 'text-cyan-400' },
        { label: 'SSH Failures', value: '47', color: 'text-yellow-400' },
        { label: 'FIM Events', value: '14', color: 'text-green-400' }
    ];

    const [alerts, setAlerts] = useState([
        { id: 1, severity: 'critical', rule: 'ET EXPLOIT PHP Shell Upload', src: '192.168.30.100', time: 'Just now' },
        { id: 2, severity: 'high', rule: 'ET WEB_SERVER SQLi Attempt', src: '192.168.30.100', time: '2m ago' },
        { id: 3, severity: 'medium', rule: 'SSH invalid user admin', src: '192.168.20.110', time: '5m ago' },
        { id: 4, severity: 'info', rule: 'FIM: /root/test.txt modified', src: '192.168.10.102', time: '12m ago' },
        { id: 5, severity: 'low', rule: 'Windows logon success', src: '192.168.10.101', time: '1h ago' },
        { id: 6, severity: 'high', rule: 'Suspicious Execution via WMI', src: '192.168.10.101', time: '2h ago' },
        { id: 7, severity: 'medium', rule: 'Repeated Login Failures', src: '192.168.20.110', time: '2h ago' }
    ]);

    useEffect(() => {
        const rules = ['SSH brute force', 'Port Scan Detected', 'XSS Attempt', 'SQLi attempt blocked'];
        const sevs = ['critical', 'high', 'medium', 'low'];
        const interval = setInterval(() => {
            setAlerts(prev => {
                const newAlert = {
                    id: Date.now(),
                    severity: sevs[Math.floor(Math.random()*sevs.length)],
                    rule: rules[Math.floor(Math.random()*rules.length)],
                    src: '192.168.30.' + Math.floor(Math.random()*200),
                    time: 'Just now'
                };
                return [newAlert, ...prev.slice(0, 7)];
            });
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    const agents = [
        { os: 'Ubuntu', name: 'Ubuntu-DMZ', ip: '192.168.20.110', status: 'Active', events: '4,210' },
        { os: 'Linux', name: 'Lubuntu-LAN', ip: '192.168.10.102', status: 'Active', events: '12,050' },
        { os: 'Windows', name: 'Windows-LAN', ip: '192.168.10.101', status: 'Active', events: '890' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest z-10">{m.label}</span>
                        <span className={`text-3xl font-light font-mono z-10 ${m.color}`}>{m.value}</span>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
                <div className="xl:col-span-2 bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                    <div className="p-4 border-b border-white/[0.05] flex justify-between items-center bg-black/20">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Activity size={14} className="text-cyan-400"/> Live Threat Feed
                        </h3>
                    </div>
                    <div className="flex-1 overflow-auto p-2 space-y-1 custom-scrollbar">
                        <AnimatePresence>
                            {alerts.map(a => (
                                <motion.div key={a.id} initial={{ opacity: 0, x: -20, backgroundColor: 'rgba(34, 211, 238, 0.1)' }} animate={{ opacity: 1, x: 0, backgroundColor: 'rgba(0, 0, 0, 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.02] cursor-pointer border border-transparent hover:border-white/[0.05] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <Badge variant={a.severity} className="w-20 justify-center">{a.severity}</Badge>
                                        <span className="text-sm text-zinc-300 font-mono tracking-tight">{a.rule}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-[11px] text-zinc-500 font-mono">
                                        <span className="px-2 py-0.5 bg-black rounded border border-white/[0.05]">{a.src}</span>
                                        <span className="w-16 text-right group-hover:text-cyan-400 transition-colors">{a.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />
                    <div className="p-4 border-b border-white/[0.05] bg-black/20">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <Server size={14} className="text-green-400"/> Forwarder Status
                        </h3>
                    </div>
                    <div className="p-4 space-y-4 overflow-auto custom-scrollbar">
                        {agents.map((ag, i) => (
                            <div key={i} className="bg-black/50 border border-white/[0.05] p-3.5 rounded-xl hover:border-cyan-500/30 transition-colors relative overflow-hidden group">
                                <div className="absolute inset-y-0 left-0 w-1 bg-green-500/50 group-hover:bg-cyan-500 transition-colors" />
                                <div className="flex justify-between items-start mb-3 ml-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-sm font-bold text-zinc-300 border border-white/[0.05]">{ag.os[0]}</div>
                                        <div>
                                            <div className="text-sm text-zinc-200 font-semibold">{ag.name}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono tracking-wider">{ag.ip}</div>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="bg-green-500/10 border-green-500/20 text-green-400">Online</Badge>
                                </div>
                                <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest pt-2 border-t border-white/[0.05] ml-2">
                                    <span>Rx/Tx: 2ms</span>
                                    <span className="text-cyan-400 font-mono">{ag.events} EPS</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: NETWORK MAP (FIXED WAF BLOCK)
   ───────────────────────────────────────────────────────────── */
const NetworkMapPage = () => {
    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl h-[calc(100vh-170px)] flex items-center justify-center relative overflow-hidden shadow-2xl animate-in fade-in duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
            
            <svg viewBox="0 0 1000 600" className="w-full h-full max-w-5xl z-10 relative drop-shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    {/* WAF Malicious Path Stops at WAF (x:550) */}
                    <path id="attackPath" d="M 150 150 L 350 300 L 530 120" fill="none" />
                    <path id="normalPath" d="M 600 450 L 800 500" fill="none" />
                </defs>

                {/* Zones */}
                <rect x="50" y="50" width="250" height="200" rx="10" fill="rgba(248, 113, 113, 0.02)" stroke="#f87171" strokeDasharray="4 4" strokeWidth="1" opacity="0.5" />
                <text x="60" y="70" className="text-[10px] font-mono font-bold tracking-widest" fill="#f87171">TEST_NET (192.168.30.0/24)</text>

                <rect x="500" y="50" width="300" height="250" rx="10" fill="rgba(251, 146, 60, 0.02)" stroke="#fb923c" strokeDasharray="4 4" strokeWidth="1" opacity="0.5" />
                <text x="510" y="70" className="text-[10px] font-mono font-bold tracking-widest" fill="#fb923c">DMZ_NET (192.168.20.0/24)</text>

                <rect x="50" y="350" width="900" height="200" rx="10" fill="rgba(34, 211, 238, 0.02)" stroke="#22d3ee" strokeDasharray="4 4" strokeWidth="1" opacity="0.5" />
                <text x="60" y="370" className="text-[10px] font-mono font-bold tracking-widest" fill="#22d3ee">LAN_NET (192.168.10.0/24)</text>

                {/* Connections */}
                <path d="M 150 150 L 350 300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M 350 300 L 550 120" stroke="rgba(255,255,255,0.1)" strokeWidth="2" /> {/* FW to WAF */}
                <path d="M 550 120 L 550 200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeDasharray="4 4" /> {/* WAF to DVWA */}
                <path d="M 350 300 L 600 450" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <path d="M 600 450 L 800 500" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />

                {/* Nodes */}
                {/* Kali */}
                <g transform="translate(100, 100)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#f87171" strokeWidth="1" filter="url(#glow)" />
                    <text x="50" y="24" textAnchor="middle" fill="#f87171" className="text-xs font-bold tracking-wider">ATTACKER</text>
                </g>

                {/* pfSense */}
                <g transform="translate(300, 280)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#3b82f6" strokeWidth="1" filter="url(#glow)" />
                    <text x="50" y="24" textAnchor="middle" fill="#60a5fa" className="text-xs font-bold tracking-wider">PFSENSE</text>
                </g>

                {/* WAF */}
                <g transform="translate(500, 100)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#fb923c" strokeWidth="1.5" filter="url(#glow)" />
                    <text x="50" y="24" textAnchor="middle" fill="#fdba74" className="text-xs font-bold tracking-wider">WAF</text>
                    {/* Block Ripple */}
                    <circle cx="50" cy="20" r="25" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="attack_anim.repeat + 1.8s" id="waf_pulse" />
                        <animate attributeName="r" values="25;45" dur="1s" begin="waf_pulse.begin" />
                    </circle>
                    <text x="50" y="-10" textAnchor="middle" fill="#ef4444" className="text-[10px] font-bold tracking-widest" opacity="0">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" begin="waf_pulse.begin" />
                        BLOCKED (403)
                    </text>
                </g>

                {/* DVWA */}
                <g transform="translate(500, 180)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#22c55e" strokeWidth="1" />
                    <text x="50" y="24" textAnchor="middle" fill="#4ade80" className="text-xs font-bold tracking-wider">DVWA</text>
                </g>

                {/* Suricata */}
                <g transform="translate(680, 130)" className="cursor-pointer">
                    <rect width="80" height="30" rx="4" fill="#000" stroke="#a855f7" strokeWidth="1" />
                    <text x="40" y="19" textAnchor="middle" fill="#c084fc" className="text-[10px] font-bold tracking-wider">SURICATA</text>
                </g>

                {/* Wazuh Manager */}
                <g transform="translate(550, 430)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#2dd4bf" strokeWidth="1" filter="url(#glow)" />
                    <text x="50" y="24" textAnchor="middle" fill="#5eead4" className="text-xs font-bold tracking-wider">WAZUH MGR</text>
                </g>

                {/* Endpoints */}
                <g transform="translate(750, 480)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#000" stroke="#cbd5e1" strokeWidth="1" />
                    <text x="50" y="24" textAnchor="middle" fill="#f1f5f9" className="text-xs font-bold tracking-wider">ENDPOINTS</text>
                </g>

                {/* Traffic animations */}
                <circle r="4" fill="#ef4444" filter="url(#glow)">
                    <animateMotion dur="2s" repeatCount="indefinite" rotate="auto" id="attack_anim">
                        <mpath href="#attackPath" />
                    </animateMotion>
                    <animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="2s" repeatCount="indefinite" />
                </circle>

                <circle r="4" fill="#22d3ee" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#normalPath" />
                    </animateMotion>
                </circle>

            </svg>

            <div className="absolute bottom-6 right-6 bg-black/80 border border-white/[0.05] rounded-lg p-4 text-xs space-y-3 backdrop-blur-md shadow-2xl">
                <div className="font-bold uppercase tracking-widest text-zinc-500 mb-2 border-b border-white/[0.05] pb-2">Legend</div>
                <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></div> <span className="text-zinc-300">Malicious Traffic (Blocked)</span></div>
                <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div> <span className="text-zinc-300">Normal Syslog/API</span></div>
            </div>
        </div>
    );
};

"""
with open(out_fp, "w", encoding="utf-8") as f:
    f.write(content)
