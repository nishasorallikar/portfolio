import React, { useState, useEffect, useRef, useCallback } from 'react';
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
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-4 flex flex-col justify-between h-24 relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest z-10 group-hover:text-cyan-400 transition-colors">{m.label}</span>
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
                                        <span className="text-sm text-zinc-300 font-mono tracking-tight group-hover:text-white transition-colors">{a.rule}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-[11px] text-zinc-500 font-mono">
                                        <span className="px-2 py-0.5 bg-black rounded border border-white/[0.05] group-hover:border-cyan-500/30 transition-colors">{a.src}</span>
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
                                        <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-sm font-bold text-zinc-300 border border-white/[0.05] group-hover:border-cyan-500/30">{ag.os[0]}</div>
                                        <div>
                                            <div className="text-sm text-zinc-200 font-semibold group-hover:text-white transition-colors">{ag.name}</div>
                                            <div className="text-[10px] text-zinc-500 font-mono tracking-wider">{ag.ip}</div>
                                        </div>
                                    </div>
                                    <Badge variant="success" className="bg-green-500/10 border-green-500/20 text-green-400 group-hover:shadow-[0_0_10px_rgba(74,222,128,0.3)]">Online</Badge>
                                </div>
                                <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest pt-2 border-t border-white/[0.05] ml-2">
                                    <span>Rx/Tx: 2ms</span>
                                    <span className="text-cyan-400 font-mono group-hover:font-bold">{ag.events} EPS</span>
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
   PAGE: HIGH-FIDELITY CYBER NETWORK MAP
   ───────────────────────────────────────────────────────────── */
const NetworkMapPage = () => {
    return (
        <div className="bg-black/60 backdrop-blur-xl border border-white/[0.05] rounded-2xl h-[calc(100vh-180px)] flex items-center justify-center relative shadow-2xl animate-in fade-in duration-700 overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
            
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

            {/* Scanning Radar Line */}
            <div className="absolute top-0 bottom-0 left-0 w-full opacity-[0.06] pointer-events-none overflow-hidden">
                <motion.div 
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{ duration: 5, ease: "linear", repeat: Infinity }}
                    className="h-40 w-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
                />
            </div>

            <svg viewBox="0 0 960 580" className="w-full h-full max-w-6xl z-10 relative" style={{fontFamily: 'ui-monospace, monospace'}}>
                <defs>
                    <filter id="glow-cyan" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="glow-orange" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    
                    {/* Animated paths */}
                    <path id="atkPath" d="M 130 135 L 130 300 C 130 320, 250 320, 380 310 L 480 300 C 520 295, 580 200, 600 165" fill="none" />
                    <path id="cleanPath" d="M 600 165 L 600 240" fill="none" />
                    <path id="syslogPath" d="M 380 420 C 380 450, 500 470, 560 470" fill="none" />
                </defs>

                {/* ═══ ZONE: EXTERNAL (Test Net) ═══ */}
                <rect x="30" y="30" width="200" height="230" rx="12" fill="rgba(248,113,113,0.03)" stroke="rgba(248,113,113,0.25)" strokeWidth="1" strokeDasharray="6 4" />
                <text x="48" y="52" fill="#f87171" fontSize="9" fontWeight="700" letterSpacing="0.15em">EXTERNAL — 192.168.30.0/24</text>

                {/* Node: Kali Linux */}
                <g transform="translate(55, 80)">
                    <rect width="150" height="70" rx="8" fill="#0a0a0a" stroke="rgba(248,113,113,0.4)" strokeWidth="1.5" />
                    <rect width="150" height="1" y="0" rx="1" fill="#ef4444" opacity="0.6" />
                    <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
                    <text x="26" y="33" textAnchor="middle" fill="#f87171" fontSize="14" fontWeight="800">K</text>
                    <text x="52" y="26" fill="#fca5a5" fontSize="11" fontWeight="700">Kali Linux</text>
                    <text x="52" y="40" fill="#71717a" fontSize="8" fontWeight="500">192.168.30.100</text>
                    <circle cx="136" cy="28" r="4" fill="#ef4444" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <text x="12" y="60" fill="#52525b" fontSize="7" fontWeight="600" letterSpacing="0.1em">ATTACKER WORKSTATION</text>
                </g>

                {/* ═══ ZONE: PERIMETER ═══ */}
                <rect x="260" y="250" width="200" height="90" rx="12" fill="rgba(59,130,246,0.03)" stroke="rgba(59,130,246,0.25)" strokeWidth="1" strokeDasharray="6 4" />
                <text x="278" y="272" fill="#60a5fa" fontSize="9" fontWeight="700" letterSpacing="0.15em">GATEWAY</text>

                {/* Node: pfSense */}
                <g transform="translate(280, 282)">
                    <rect width="160" height="48" rx="6" fill="#0a0a0a" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
                    <rect width="160" height="1" y="0" rx="1" fill="#3b82f6" opacity="0.7" />
                    <rect x="10" y="10" width="28" height="28" rx="6" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1" />
                    <text x="24" y="29" textAnchor="middle" fill="#60a5fa" fontSize="13" fontWeight="800">FW</text>
                    <text x="48" y="24" fill="#93c5fd" fontSize="10" fontWeight="700">pfSense CE</text>
                    <text x="48" y="36" fill="#71717a" fontSize="8">3-Zone Gateway Router</text>
                    <circle cx="146" cy="24" r="4" fill="#3b82f6" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </g>

                {/* ═══ ZONE: DMZ ═══ */}
                <rect x="500" y="30" width="430" height="260" rx="12" fill="rgba(251,146,60,0.03)" stroke="rgba(251,146,60,0.2)" strokeWidth="1" strokeDasharray="6 4" />
                <text x="518" y="52" fill="#fb923c" fontSize="9" fontWeight="700" letterSpacing="0.15em">DMZ — 192.168.20.0/24</text>

                {/* Node: SafeLine WAF */}
                <g transform="translate(520, 80)">
                    <rect width="170" height="70" rx="8" fill="#0a0a0a" stroke="rgba(251,146,60,0.5)" strokeWidth="1.5" />
                    <rect width="170" height="1" y="0" rx="1" fill="#f97316" opacity="0.7" />
                    <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
                    <text x="26" y="33" textAnchor="middle" fill="#fb923c" fontSize="12" fontWeight="800">SL</text>
                    <text x="52" y="26" fill="#fdba74" fontSize="11" fontWeight="700">SafeLine WAF</text>
                    <text x="52" y="40" fill="#71717a" fontSize="8">Reverse Proxy :443</text>
                    <circle cx="154" cy="28" r="4" fill="#22c55e" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                    <text x="12" y="60" fill="#52525b" fontSize="7" fontWeight="600" letterSpacing="0.1em">WEB APPLICATION FIREWALL</text>
                </g>
                
                {/* WAF BLOCK burst animation */}
                <g transform="translate(605, 115)">
                    <circle r="0" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0">
                        <animate attributeName="r" values="0;40;50" dur="0.6s" begin="atkDot.end" fill="freeze" />
                        <animate attributeName="opacity" values="0;0.8;0" dur="0.6s" begin="atkDot.end" fill="freeze" />
                    </circle>
                    <text y="-30" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="800" letterSpacing="0.15em" opacity="0">
                        <animate attributeName="opacity" values="0;1;1;0" dur="1.2s" begin="atkDot.end" fill="freeze" />
                        403 BLOCKED
                    </text>
                </g>

                {/* Node: DVWA */}
                <g transform="translate(520, 190)">
                    <rect width="170" height="70" rx="8" fill="#0a0a0a" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
                    <rect width="170" height="1" y="0" rx="1" fill="#22c55e" opacity="0.5" />
                    <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.25)" strokeWidth="1" />
                    <text x="26" y="33" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="800">DV</text>
                    <text x="52" y="26" fill="#86efac" fontSize="11" fontWeight="700">DVWA Server</text>
                    <text x="52" y="40" fill="#71717a" fontSize="8">192.168.20.110 :8080</text>
                    <circle cx="154" cy="28" r="4" fill="#22c55e" opacity="0.8" />
                    <text x="12" y="60" fill="#52525b" fontSize="7" fontWeight="600" letterSpacing="0.1em">VULNERABLE WEB APP</text>
                </g>

                {/* Node: Suricata */}
                <g transform="translate(750, 120)">
                    <rect width="160" height="50" rx="8" fill="#0a0a0a" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
                    <rect width="160" height="1" y="0" rx="1" fill="#a855f7" opacity="0.5" />
                    <rect x="10" y="11" width="28" height="28" rx="6" fill="rgba(168,85,247,0.12)" stroke="rgba(168,85,247,0.25)" strokeWidth="1" />
                    <text x="24" y="30" textAnchor="middle" fill="#c084fc" fontSize="12" fontWeight="800">SU</text>
                    <text x="48" y="26" fill="#d8b4fe" fontSize="10" fontWeight="700">Suricata NIDS</text>
                    <text x="48" y="38" fill="#71717a" fontSize="8">IDS/IPS Engine</text>
                    <circle cx="146" cy="25" r="4" fill="#a855f7" opacity="0.7">
                        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
                    </circle>
                </g>

                {/* ═══ ZONE: LAN (Internal) ═══ */}
                <rect x="30" y="370" width="900" height="190" rx="12" fill="rgba(34,211,238,0.02)" stroke="rgba(34,211,238,0.2)" strokeWidth="1" strokeDasharray="6 4" />
                <text x="48" y="392" fill="#22d3ee" fontSize="9" fontWeight="700" letterSpacing="0.15em">LAN — 192.168.10.0/24</text>

                {/* Node: Wazuh */}
                <g transform="translate(80, 420)">
                    <rect width="180" height="70" rx="8" fill="#0a0a0a" stroke="rgba(6,182,212,0.5)" strokeWidth="1.5" />
                    <rect width="180" height="1" y="0" rx="1" fill="#06b6d4" opacity="0.7" />
                    <rect x="12" y="14" width="28" height="28" rx="6" fill="rgba(6,182,212,0.15)" stroke="rgba(6,182,212,0.3)" strokeWidth="1" />
                    <text x="26" y="33" textAnchor="middle" fill="#22d3ee" fontSize="12" fontWeight="800">WZ</text>
                    <text x="52" y="26" fill="#67e8f9" fontSize="11" fontWeight="700">Wazuh Manager</text>
                    <text x="52" y="40" fill="#71717a" fontSize="8">192.168.10.102 :1514</text>
                    <circle cx="164" cy="28" r="4" fill="#06b6d4" opacity="0.8">
                        <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                    <text x="12" y="60" fill="#52525b" fontSize="7" fontWeight="600" letterSpacing="0.1em">SIEM & LOG AGGREGATOR</text>
                </g>

                {/* Node: Ubuntu Agent */}
                <g transform="translate(340, 430)">
                    <rect width="140" height="50" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect width="140" height="1" y="0" rx="1" fill="#a3a3a3" opacity="0.3" />
                    <rect x="10" y="11" width="28" height="28" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="24" y="30" textAnchor="middle" fill="#d4d4d8" fontSize="11" fontWeight="800">UB</text>
                    <text x="48" y="25" fill="#e4e4e7" fontSize="10" fontWeight="600">Ubuntu DMZ</text>
                    <text x="48" y="37" fill="#71717a" fontSize="8">192.168.20.110</text>
                    <circle cx="126" cy="25" r="3" fill="#4ade80" />
                </g>

                {/* Node: Lubuntu Agent */}
                <g transform="translate(540, 430)">
                    <rect width="140" height="50" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect width="140" height="1" y="0" rx="1" fill="#a3a3a3" opacity="0.3" />
                    <rect x="10" y="11" width="28" height="28" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="24" y="30" textAnchor="middle" fill="#d4d4d8" fontSize="11" fontWeight="800">LU</text>
                    <text x="48" y="25" fill="#e4e4e7" fontSize="10" fontWeight="600">Lubuntu LAN</text>
                    <text x="48" y="37" fill="#71717a" fontSize="8">192.168.10.102</text>
                    <circle cx="126" cy="25" r="3" fill="#4ade80" />
                </g>

                {/* Node: Windows Agent */}
                <g transform="translate(740, 430)">
                    <rect width="140" height="50" rx="6" fill="#0a0a0a" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <rect width="140" height="1" y="0" rx="1" fill="#a3a3a3" opacity="0.3" />
                    <rect x="10" y="11" width="28" height="28" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                    <text x="24" y="30" textAnchor="middle" fill="#d4d4d8" fontSize="11" fontWeight="800">W</text>
                    <text x="48" y="25" fill="#e4e4e7" fontSize="10" fontWeight="600">Windows 10</text>
                    <text x="48" y="37" fill="#71717a" fontSize="8">192.168.10.101</text>
                    <circle cx="126" cy="25" r="3" fill="#4ade80" />
                </g>

                {/* ═══ CONNECTION LINES ═══ */}
                {/* Kali -> pfSense */}
                <path d="M 130 150 L 130 300 C 130 310, 200 310, 280 306" stroke="rgba(248,113,113,0.25)" strokeWidth="2" fill="none" strokeDasharray="5 4" />
                {/* pfSense -> SafeLine WAF */}
                <path d="M 440 306 C 480 300, 530 200, 560 150" stroke="rgba(251,146,60,0.25)" strokeWidth="2" fill="none" strokeDasharray="5 4" />
                {/* SafeLine -> DVWA (short) */}
                <line x1="605" y1="150" x2="605" y2="190" stroke="rgba(34,197,94,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                {/* pfSense -> LAN */}
                <path d="M 360 330 L 360 370 C 360 400, 300 420, 260 455" stroke="rgba(34,211,238,0.2)" strokeWidth="2" fill="none" strokeDasharray="5 4" />
                {/* Wazuh agent lines */}
                <line x1="260" y1="455" x2="340" y2="455" stroke="rgba(6,182,212,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="480" y1="455" x2="540" y2="455" stroke="rgba(6,182,212,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                <line x1="680" y1="455" x2="740" y2="455" stroke="rgba(6,182,212,0.15)" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Suricata tap from DMZ */}
                <line x1="690" y1="145" x2="750" y2="145" stroke="rgba(168,85,247,0.2)" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* ═══ ANIMATED PACKETS ═══ */}
                {/* Attack packet: Kali -> pfSense -> WAF (blocked) */}
                <circle r="5" fill="#ef4444" filter="url(#glow-red)">
                    <animateMotion dur="3s" repeatCount="indefinite" id="atkDot">
                        <mpath href="#atkPath" />
                    </animateMotion>
                    <animate attributeName="opacity" values="1;0.8;1" dur="0.5s" repeatCount="indefinite" />
                </circle>
                {/* Trail glow */}
                <circle r="3" fill="#fca5a5" opacity="0.4">
                    <animateMotion dur="3s" repeatCount="indefinite" begin="0.15s">
                        <mpath href="#atkPath" />
                    </animateMotion>
                </circle>
                
                {/* Clean traffic: WAF -> DVWA */}
                <circle r="4" fill="#4ade80" opacity="0.7">
                    <animateMotion dur="1s" repeatCount="indefinite">
                        <mpath href="#cleanPath" />
                    </animateMotion>
                </circle>

                {/* Syslog: Agents -> Wazuh */}
                <circle r="3" fill="#22d3ee" filter="url(#glow-cyan)" opacity="0.6">
                    <animateMotion dur="2s" repeatCount="indefinite">
                        <mpath href="#syslogPath" />
                    </animateMotion>
                </circle>

            </svg>

            {/* Premium Floating Legend */}
            <div className="absolute bottom-4 right-4 bg-[#09090b]/90 border border-white/[0.06] rounded-lg p-4 text-sm space-y-3 backdrop-blur-xl shadow-2xl">
                <div className="font-bold uppercase tracking-[0.15em] text-[9px] text-zinc-500 border-b border-white/[0.05] pb-2">Traffic Legend</div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                    <span className="text-zinc-400 text-[10px] font-medium">Malicious Payload — BLOCKED</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                    <span className="text-zinc-400 text-[10px] font-medium">Clean Traffic — PASS</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                    <span className="text-zinc-400 text-[10px] font-medium">Syslog / Agent Telemetry</span>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: WAF INSPECTOR  (SafeLine-style)
   ───────────────────────────────────────────────────────────── */
const WAFInspectorPage = () => {
    const [url, setUrl] = useState("https://192.168.20.110:443/dvwa/");
    const [body, setBody] = useState("");
    const [method, setMethod] = useState("GET");
    const [pipelineStage, setPipelineStage] = useState(0);

    const attacks = [
        { name: 'SQLi', m: 'GET', u: "https://192.168.20.110:443/dvwa/vulnerabilities/sqli/?id=1' OR '1'='1'--", b: "" },
        { name: 'XSS', m: 'GET', u: "https://192.168.20.110:443/dvwa/vulnerabilities/xss_r/?name=<script>alert(1)</script>", b: "" },
        { name: 'CMDi', m: 'POST', u: "https://192.168.20.110:443/dvwa/vulnerabilities/exec/", b: "ip=127.0.0.1|cat /etc/passwd" },
        { name: 'Upload', m: 'POST', u: "https://192.168.20.110:443/dvwa/vulnerabilities/upload/", b: "filename=shell.php\n<?php system($_GET['cmd']); ?>" }
    ];

    const handleSend = () => {
        setPipelineStage(0);
        setTimeout(() => setPipelineStage(1), 400);
        setTimeout(() => setPipelineStage(2), 1000);
        setTimeout(() => setPipelineStage(3), 1600);
        setTimeout(() => setPipelineStage(4), 2000);
    };

    const wafLogs = [
        { id: 1247, time: '14:29:12', src: '192.168.30.100', method: 'GET', uri: "/dvwa/sqli/?id=1' OR '1'='1'--", status: 403, rule: '942100', risk: 'critical' },
        { id: 1246, time: '14:28:55', src: '192.168.30.100', method: 'GET', uri: '/dvwa/vulnerabilities/xss_r/?name=<script>', status: 403, rule: '941100', risk: 'high' },
        { id: 1245, time: '14:27:33', src: '192.168.30.100', method: 'POST', uri: '/dvwa/vulnerabilities/exec/', status: 403, rule: '932100', risk: 'critical' },
        { id: 1244, time: '14:26:01', src: '192.168.10.102', method: 'GET', uri: '/dvwa/login.php', status: 200, rule: '-', risk: 'info' },
        { id: 1243, time: '14:25:12', src: '192.168.10.102', method: 'GET', uri: '/dvwa/setup.php', status: 200, rule: '-', risk: 'info' },
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* SafeLine-style header bar */}
            <div className="flex items-center justify-between bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-5 py-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-orange-400 font-bold text-sm"><Shield size={16}/> SafeLine WAF</div>
                    <div className="h-4 w-px bg-white/10"/>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Protection Mode: <span className="text-green-400 font-bold">ACTIVE</span></span>
                </div>
                <div className="flex items-center gap-6 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    <span>Blocked Today: <span className="text-red-400 font-bold">389</span></span>
                    <span>Allowed: <span className="text-green-400 font-bold">12,491</span></span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-230px)]">
                {/* Request Builder */}
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg flex flex-col overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.06] text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-white/[0.01]">
                        HTTP Request Builder
                    </div>
                    <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                        <div className="flex gap-1.5 flex-wrap">
                            {attacks.map(a => (
                                <button key={a.name} onClick={() => { setUrl(a.u); setBody(a.b); setMethod(a.m); setPipelineStage(0); }}
                                    className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded text-[10px] font-mono border border-white/[0.05] transition-all">
                                    {a.name}
                                </button>
                            ))}
                        </div>
                        <div>
                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold mb-1 block">Method & URI</label>
                            <div className="flex gap-1.5">
                                <select value={method} onChange={e=>setMethod(e.target.value)} className="bg-zinc-900 border border-white/[0.06] rounded px-2 text-[11px] font-mono text-zinc-300 outline-none w-16">
                                    <option>GET</option><option>POST</option>
                                </select>
                                <input value={url} onChange={e=>setUrl(e.target.value)} className="bg-zinc-900 border border-white/[0.06] rounded px-2 py-1.5 text-[11px] text-zinc-300 font-mono flex-1 min-w-0 outline-none focus:border-orange-500/50"/>
                            </div>
                        </div>
                        <div>
                            <label className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold mb-1 block">Request Headers</label>
                            <textarea readOnly value={"Host: 192.168.20.110:443\nUser-Agent: Mozilla/5.0 (X11; Linux x86_64)\nCookie: security=low; PHPSESSID=abc123\nContent-Type: application/x-www-form-urlencoded"}
                                className="w-full h-20 bg-zinc-900 border border-white/[0.06] rounded p-2 text-[10px] text-zinc-500 font-mono outline-none resize-none"/>
                        </div>
                        {method === 'POST' && (
                            <div>
                                <label className="text-[9px] uppercase tracking-wider text-zinc-600 font-bold mb-1 block">Request Body</label>
                                <textarea value={body} onChange={e=>setBody(e.target.value)}
                                    className="w-full h-24 bg-zinc-900 border border-white/[0.06] rounded p-2 text-[10px] text-green-400 font-mono outline-none resize-none focus:border-orange-500/50"/>
                            </div>
                        )}
                    </div>
                    <div className="p-3 border-t border-white/[0.06]">
                        <button onClick={handleSend} className="w-full bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold py-2 rounded text-[11px] tracking-wider uppercase flex items-center justify-center gap-2 transition-all">
                            <Terminal size={12}/> Send Request
                        </button>
                    </div>
                </div>

                {/* Pipeline Inspection */}
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg flex flex-col overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.06] text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-white/[0.01]">
                        Detection Pipeline
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center p-6 gap-3">
                        {[
                            { n: 1, label: 'Ingress Received', detail: `${method} ${(url.split('.110:443')[1] || '/').substring(0,40)}...`, active: pipelineStage >= 1, color: 'cyan' },
                            { n: 2, label: 'Semantic Analysis', detail: 'CRS + AI Engine scoring...', active: pipelineStage >= 2, color: 'cyan' },
                            { n: 3, label: 'Threat Pattern Match', detail: url.includes('id=') ? 'SQLi Sig: 942100 (Score: 25)' : url.includes('script') ? 'XSS Sig: 941100 (Score: 20)' : 'Payload Signature Matched', active: pipelineStage >= 3, color: 'red' },
                            { n: 4, label: 'Verdict', detail: 'HTTP 403 Forbidden', active: pipelineStage >= 4, color: 'red' },
                        ].map((stage, i) => (
                            <React.Fragment key={i}>
                                <div className={`w-full p-3 rounded border transition-all duration-500 ${stage.active ? (stage.color === 'red' ? 'bg-red-950/30 border-red-500/40' : 'bg-cyan-950/20 border-cyan-500/30') : 'bg-zinc-900/50 border-white/[0.04]'}`}>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${stage.active ? (stage.color === 'red' ? 'text-red-400' : 'text-cyan-400') : 'text-zinc-600'}`}>
                                            {stage.n}. {stage.label}
                                        </span>
                                        {stage.active && <div className={`w-2 h-2 rounded-full ${stage.color === 'red' ? 'bg-red-500' : 'bg-cyan-400'}`}/>}
                                    </div>
                                    <div className={`text-[10px] font-mono truncate ${stage.active ? (stage.color === 'red' ? 'text-red-300' : 'text-cyan-300') : 'text-zinc-700'}`}>{stage.detail}</div>
                                    {stage.n === 2 && stage.active && (
                                        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden mt-2">
                                            <motion.div className="h-full bg-cyan-500" initial={{width:0}} animate={{width:'100%'}} transition={{duration:0.6}}/>
                                        </div>
                                    )}
                                </div>
                                {i < 3 && <div className={`h-3 border-l transition-colors ${pipelineStage > i+1 ? (i >= 2 ? 'border-red-500/40' : 'border-cyan-500/30') : 'border-white/[0.04]'}`}/>}
                            </React.Fragment>
                        ))}
                        {pipelineStage >= 4 && (
                            <motion.div initial={{scale:0.95, opacity:0}} animate={{scale:1, opacity:1}} className="w-full text-center p-3 bg-red-500/10 border border-red-500/50 rounded text-red-400 font-bold text-sm tracking-widest uppercase mt-2">
                                ⛔ DROP — 403 FORBIDDEN
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* WAF Access Log */}
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg flex flex-col overflow-hidden">
                    <div className="px-4 py-2.5 border-b border-white/[0.06] text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-white/[0.01] flex justify-between items-center">
                        <span>Access Log</span>
                        <span className="text-zinc-600 font-normal normal-case">5 recent entries</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left">
                            <thead className="text-[9px] text-zinc-600 uppercase tracking-wider border-b border-white/[0.04] sticky top-0 bg-[#0c0c0e]">
                                <tr>
                                    <th className="px-3 py-2 font-bold">Time</th>
                                    <th className="px-3 py-2 font-bold">Status</th>
                                    <th className="px-3 py-2 font-bold">Rule</th>
                                    <th className="px-3 py-2 font-bold">URI</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {pipelineStage === 4 && (
                                    <motion.tr initial={{opacity:0, backgroundColor:'rgba(239,68,68,0.1)'}} animate={{opacity:1, backgroundColor:'rgba(0,0,0,0)'}} className="text-[10px] font-mono">
                                        <td className="px-3 py-2.5 text-zinc-500">Just now</td>
                                        <td className="px-3 py-2.5"><Badge variant="critical">403</Badge></td>
                                        <td className="px-3 py-2.5 text-red-400">{url.includes('id=') ? '942100' : url.includes('script') ? '941100' : '932100'}</td>
                                        <td className="px-3 py-2.5 text-red-300 truncate max-w-[120px]">{(url.split('.110:443')[1] || '/').substring(0, 35)}</td>
                                    </motion.tr>
                                )}
                                {wafLogs.map(log => (
                                    <tr key={log.id} className="text-[10px] font-mono hover:bg-white/[0.01] transition-colors">
                                        <td className="px-3 py-2.5 text-zinc-600">{log.time}</td>
                                        <td className="px-3 py-2.5"><Badge variant={log.status === 403 ? 'critical' : 'success'}>{log.status}</Badge></td>
                                        <td className={`px-3 py-2.5 ${log.status === 403 ? 'text-red-400' : 'text-zinc-600'}`}>{log.rule}</td>
                                        <td className={`px-3 py-2.5 truncate max-w-[120px] ${log.status === 403 ? 'text-zinc-400' : 'text-zinc-600'}`}>{log.uri.substring(0, 35)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: SURICATA NIDS  (eve.json-style)
   ───────────────────────────────────────────────────────────── */
const SuricataData = [
    { ts: '2024-03-15T14:32:07.441+0000', eid: 2024792, sid: 'ET SCAN Nmap -sV', sev: 1, proto: 'TCP', src: '192.168.30.100:42891', dst: '192.168.20.110:443', action: 'allowed' },
    { ts: '2024-03-15T14:35:12.102+0000', eid: 2100498, sid: 'ET WEB_SERVER SQL Injection SELECT', sev: 1, proto: 'TCP', src: '192.168.30.100:43102', dst: '192.168.20.110:443', action: 'allowed' },
    { ts: '2024-03-15T14:37:55.800+0000', eid: 2019284, sid: 'ET WEB_SERVER XSS Attempt', sev: 2, proto: 'TCP', src: '192.168.30.100:43201', dst: '192.168.20.110:443', action: 'allowed' },
    { ts: '2024-03-15T14:40:01.888+0000', eid: 2024897, sid: 'ET EXPLOIT PHP File Upload', sev: 1, proto: 'TCP', src: '192.168.30.100:43380', dst: '192.168.20.110:443', action: 'allowed' },
    { ts: '2024-03-15T14:42:15.000+0000', eid: 2001219, sid: 'GPL ATTACK_RESPONSE id check', sev: 2, proto: 'TCP', src: '192.168.20.110:8080', dst: '192.168.30.100:43380', action: 'allowed' },
    { ts: '2024-03-15T14:44:30.120+0000', eid: 2010935, sid: 'ET SCAN SSH Brute Force', sev: 2, proto: 'TCP', src: '192.168.30.100:55102', dst: '192.168.10.102:22', action: 'allowed' },
    { ts: '2024-03-15T14:50:33.211+0000', eid: 2013028, sid: 'ET POLICY curl User-Agent', sev: 3, proto: 'TCP', src: '192.168.10.102:38201', dst: '93.184.216.34:80', action: 'allowed' },
];

const WazuhData = [
    { ts: '2024-03-15T14:32:08', id: '550', level: 12, agent: 'Ubuntu-DMZ', group: 'ids,suricata', desc: 'Suricata: Alert - ET SCAN Nmap -sV detection', src: '192.168.30.100', rule: '86601' },
    { ts: '2024-03-15T14:35:13', id: '551', level: 14, agent: 'Ubuntu-DMZ', group: 'ids,suricata', desc: 'Suricata: Alert - SQL Injection attempt detected', src: '192.168.30.100', rule: '86602' },
    { ts: '2024-03-15T14:40:02', id: '552', level: 14, agent: 'Ubuntu-DMZ', group: 'ids,suricata', desc: 'Suricata: Alert - PHP file upload exploit', src: '192.168.30.100', rule: '86603' },
    { ts: '2024-03-15T14:42:16', id: '553', level: 10, agent: 'Lubuntu-LAN', group: 'syslog,sshd', desc: 'sshd: authentication failure; user=admin', src: '192.168.30.100', rule: '5710' },
    { ts: '2024-03-15T14:42:20', id: '554', level: 10, agent: 'Lubuntu-LAN', group: 'syslog,sshd', desc: 'sshd: authentication failure; user=root', src: '192.168.30.100', rule: '5710' },
    { ts: '2024-03-15T14:50:34', id: '555', level: 3, agent: 'Windows-LAN', group: 'windows,logon', desc: 'Windows logon success (EventID 4624)', src: '192.168.10.101', rule: '60106' },
    { ts: '2024-03-15T14:55:01', id: '556', level: 7, agent: 'Lubuntu-LAN', group: 'ossec,syscheck', desc: 'FIM: File modified - /root/test.txt', src: '-', rule: '550' },
];

const SiemPage = ({ title }) => {
    const isSuricata = title.includes('Suricata');
    const data = isSuricata ? SuricataData : WazuhData;

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* Tool Header Bar */}
            <div className="flex items-center justify-between bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-5 py-3">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 font-bold text-sm ${isSuricata ? 'text-purple-400' : 'text-cyan-400'}`}>
                        {isSuricata ? <AlertTriangle size={16}/> : <Database size={16}/>} {title}
                    </div>
                    <div className="h-4 w-px bg-white/10"/>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        {isSuricata ? 'eve.json • fast.log' : 'ossec-alerts • archives'}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                    <span>Events: <span className="text-zinc-300 font-bold">{data.length}</span></span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${isSuricata ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'}`}>
                        {isSuricata ? 'IDS/IPS' : 'SIEM'}
                    </span>
                </div>
            </div>

            {/* KQL-style search */}
            <div className="flex items-center gap-3 bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-4 py-2">
                <Crosshair size={14} className="text-zinc-600 shrink-0"/>
                <input type="text" placeholder={isSuricata ? 'alert.signature: "ET*" AND src_ip: "192.168.30.*"' : 'rule.level: >=10 AND agent.name: "Ubuntu-DMZ"'}
                    className="flex-1 bg-transparent text-[11px] text-zinc-300 font-mono outline-none placeholder:text-zinc-700"/>
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-wider shrink-0">Last 24h</span>
            </div>

            {/* Data Table */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg flex flex-col h-[calc(100vh-290px)] overflow-hidden">
                <div className="flex-1 overflow-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="text-[9px] text-zinc-600 uppercase tracking-wider border-b border-white/[0.04] sticky top-0 bg-[#0c0c0e] z-10">
                            {isSuricata ? (
                                <tr>
                                    <th className="px-4 py-3 font-bold">Timestamp</th>
                                    <th className="px-4 py-3 font-bold">Sev</th>
                                    <th className="px-4 py-3 font-bold">Signature</th>
                                    <th className="px-4 py-3 font-bold">Proto</th>
                                    <th className="px-4 py-3 font-bold">Src → Dst</th>
                                    <th className="px-4 py-3 font-bold">Action</th>
                                </tr>
                            ) : (
                                <tr>
                                    <th className="px-4 py-3 font-bold">Timestamp</th>
                                    <th className="px-4 py-3 font-bold">Level</th>
                                    <th className="px-4 py-3 font-bold">Agent</th>
                                    <th className="px-4 py-3 font-bold">Rule</th>
                                    <th className="px-4 py-3 font-bold">Description</th>
                                    <th className="px-4 py-3 font-bold">Source</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {isSuricata ? SuricataData.map((r, i) => (
                                <tr key={i} className="hover:bg-white/[0.015] transition-colors text-[10px] font-mono group">
                                    <td className="px-4 py-3 text-zinc-600 group-hover:text-zinc-400">{r.ts.split('T')[1].split('+')[0]}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block w-5 h-5 rounded text-center leading-5 text-[9px] font-bold ${r.sev === 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : r.sev === 2 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}`}>
                                            {r.sev}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-zinc-300 group-hover:text-white tracking-tight">{r.sid}</td>
                                    <td className="px-4 py-3 text-zinc-500">{r.proto}</td>
                                    <td className="px-4 py-3 text-zinc-500">
                                        <span className="text-zinc-400">{r.src.split(':')[0]}</span>
                                        <span className="text-zinc-700">:{r.src.split(':')[1]}</span>
                                        <span className="text-zinc-600 mx-1">→</span>
                                        <span className="text-zinc-400">{r.dst.split(':')[0]}</span>
                                        <span className="text-zinc-700">:{r.dst.split(':')[1]}</span>
                                    </td>
                                    <td className="px-4 py-3 text-yellow-500/70 uppercase font-bold text-[9px]">{r.action}</td>
                                </tr>
                            )) : WazuhData.map((r, i) => (
                                <tr key={i} className="hover:bg-white/[0.015] transition-colors text-[10px] font-mono group">
                                    <td className="px-4 py-3 text-zinc-600 group-hover:text-zinc-400">{r.ts.split('T')[1]}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${r.level >= 12 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : r.level >= 7 ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-zinc-800 text-zinc-500 border border-zinc-700'}`}>
                                            Lv.{r.level}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="text-zinc-300">{r.agent}</span>
                                        <span className="text-zinc-700 ml-1 text-[8px]">({r.group})</span>
                                    </td>
                                    <td className="px-4 py-3 text-cyan-400/70">{r.rule}</td>
                                    <td className="px-4 py-3 text-zinc-400 tracking-tight group-hover:text-zinc-200 max-w-[300px] truncate">{r.desc}</td>
                                    <td className="px-4 py-3 text-zinc-500">{r.src}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-2.5 border-t border-white/[0.04] flex justify-between items-center text-[9px] text-zinc-600 font-mono tracking-wider bg-white/[0.01]">
                    <span>Showing {data.length} events • Index: {isSuricata ? 'suricata-eve-*' : 'wazuh-alerts-*'}</span>
                    <span>Cluster: soc-lab-001</span>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: ATTACK TIMELINE (MITRE-style)
   ───────────────────────────────────────────────────────────── */
const TimelinePage = () => {
    const events = [
        { time: '14:28:01', phase: 'Reconnaissance', tactic: 'TA0043', src: 'Kali', tool: 'Nmap', desc: 'nmap -sV -O 192.168.20.110 — Port scan & OS fingerprinting', color: 'zinc' },
        { time: '14:28:45', phase: 'Detection', tactic: 'DS0029', src: 'Suricata', tool: 'NIDS', desc: 'Alert: ET SCAN Nmap -sV detection (SID:2024792)', color: 'purple' },
        { time: '14:29:12', phase: 'Initial Access', tactic: 'TA0001', src: 'Kali', tool: 'Burp Suite', desc: "SQLi payload: /sqli/?id=1' OR '1'='1'-- sent to DVWA", color: 'red' },
        { time: '14:29:12', phase: 'Blocked', tactic: 'M0937', src: 'SafeLine', tool: 'WAF', desc: 'HTTP 403 — Rule 942100 matched, request dropped by WAF', color: 'orange' },
        { time: '14:29:14', phase: 'Alert', tactic: 'DS0015', src: 'Wazuh', tool: 'SIEM', desc: 'Rule 86602 fired (Level 14) — SQL injection attempt correlated', color: 'cyan' },
        { time: '14:35:00', phase: 'Credential Access', tactic: 'TA0006', src: 'Kali', tool: 'Hydra', desc: 'SSH brute force against 192.168.10.102 — 47 failed attempts', color: 'red' },
        { time: '14:35:05', phase: 'Detection', tactic: 'DS0028', src: 'Wazuh', tool: 'SIEM', desc: 'Rule 5710 — Multiple authentication failures from 192.168.30.100', color: 'cyan' },
    ];
    const colorMap = { red: 'border-red-500/30 bg-red-500', orange: 'border-orange-500/30 bg-orange-500', cyan: 'border-cyan-500/30 bg-cyan-500', purple: 'border-purple-500/30 bg-purple-500', zinc: 'border-zinc-500/30 bg-zinc-500' };
    const textMap = { red: 'text-red-400', orange: 'text-orange-400', cyan: 'text-cyan-400', purple: 'text-purple-400', zinc: 'text-zinc-400' };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex items-center justify-between bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-5 py-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-zinc-200 font-bold text-sm"><Clock size={16} className="text-cyan-400"/> Attack Timeline</div>
                    <div className="h-4 w-px bg-white/10"/>
                    <span className="text-[10px] text-zinc-500 font-mono">2024-03-15 • Incident #SOC-2024-0315</span>
                </div>
                <span className="text-[9px] bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">7 Events</span>
            </div>

            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6 overflow-y-auto custom-scrollbar h-[calc(100vh-250px)]">
                <div className="relative border-l border-white/[0.08] ml-6 space-y-6 py-2">
                    {events.map((ev, i) => (
                        <motion.div key={i} initial={{opacity:0, x:-15}} animate={{opacity:1, x:0}} transition={{delay: i*0.1}} className="relative pl-8">
                            <div className={`absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full ${colorMap[ev.color].split(' ')[1]} ring-4 ring-[#0c0c0e]`}/>
                            <div className="flex items-start gap-4 group">
                                <div className="w-14 pt-1 text-[10px] font-mono font-bold text-zinc-600 group-hover:text-zinc-400 shrink-0">{ev.time}</div>
                                <div className="flex-1 bg-zinc-900/50 border border-white/[0.04] rounded-lg p-4 group-hover:border-white/[0.08] transition-all">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${colorMap[ev.color].split(' ')[0]} ${textMap[ev.color]}`}>{ev.phase}</span>
                                        <span className="text-[9px] text-zinc-600 font-mono">{ev.tactic}</span>
                                        <span className="text-[9px] text-zinc-500">•</span>
                                        <span className="text-[9px] text-zinc-500 font-bold">{ev.src} ({ev.tool})</span>
                                    </div>
                                    <div className={`text-[11px] font-mono tracking-tight ${textMap[ev.color]} leading-relaxed`}>{ev.desc}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: FIREWALL RULES (pfSense-style)
   ───────────────────────────────────────────────────────────── */
const FirewallPage = () => {
    const [activeIf, setActiveIf] = useState('DMZ');
    const rules = {
        LAN: [
            { act: 'pass', proto: 'TCP', src: 'LAN net', dst: '192.168.10.102', port: '1514', desc: 'Allow Wazuh agent traffic to manager', states: '235/414' },
            { act: 'pass', proto: 'ANY', src: 'LAN net', dst: '*', port: '*', desc: 'Default allow LAN to any', states: '12,050/24,100' },
        ],
        DMZ: [
            { act: 'block', proto: 'ANY', src: 'DMZ net', dst: 'LAN net', port: '*', desc: 'Block DMZ → LAN (prevent lateral movement)', states: '47/47' },
            { act: 'pass', proto: 'TCP', src: 'DMZ net', dst: 'LAN addr', port: '1514', desc: 'Allow DMZ → Wazuh Manager agent comms', states: '4,210/8,420' },
            { act: 'pass', proto: 'TCP', src: '*', dst: '192.168.20.110', port: '443', desc: 'Allow HTTPS to SafeLine WAF vHost', states: '389/12,880' },
            { act: 'pass', proto: 'TCP', src: '192.168.20.110', dst: '192.168.20.110', port: '8080', desc: 'WAF → DVWA reverse proxy (loopback)', states: '12,491/24,982' },
        ],
        TEST: [
            { act: 'pass', proto: 'TCP', src: 'TEST net', dst: 'DMZ net', port: '443', desc: 'Allow TEST → DMZ HTTPS for attack sim', states: '1,247/2,494' },
            { act: 'block', proto: 'ANY', src: 'TEST net', dst: 'LAN net', port: '*', desc: 'Block TEST → LAN (isolation)', states: '89/89' },
        ],
        WAN: [
            { act: 'block', proto: 'ANY', src: '*', dst: '*', port: '*', desc: 'Default deny all inbound (RFC 4890)', states: '0/156' },
        ],
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            {/* pfSense-style header */}
            <div className="flex items-center justify-between bg-[#0c0c0e] border border-white/[0.06] rounded-lg px-5 py-3">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-sm"><Lock size={16}/> pfSense CE — Firewall Rules</div>
                    <div className="h-4 w-px bg-white/10"/>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">v2.7.0 • <span className="text-green-400 font-bold">UP</span> 14d 6h</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Status: <span className="text-green-400 font-bold">Gateway Online</span></span>
            </div>

            {/* Interface Tabs */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg overflow-hidden">
                <div className="flex border-b border-white/[0.04] px-2 pt-2 bg-white/[0.01]">
                    {['LAN', 'DMZ', 'TEST', 'WAN'].map(tab => (
                        <button key={tab} onClick={() => setActiveIf(tab)}
                            className={`px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-t transition-all ${activeIf === tab ? 'bg-[#0c0c0e] text-blue-400 border border-white/[0.06] border-b-transparent -mb-px' : 'text-zinc-600 hover:text-zinc-300'}`}>
                            {tab} <span className="text-zinc-700 ml-1 font-normal">({(rules[tab] || []).length})</span>
                        </button>
                    ))}
                </div>

                <div className="overflow-auto custom-scrollbar">
                    <table className="w-full text-left whitespace-nowrap">
                        <thead className="text-[9px] text-zinc-600 uppercase tracking-wider border-b border-white/[0.04]">
                            <tr>
                                <th className="px-4 py-3 font-bold w-8"></th>
                                <th className="px-4 py-3 font-bold">Action</th>
                                <th className="px-4 py-3 font-bold">Proto</th>
                                <th className="px-4 py-3 font-bold">Source</th>
                                <th className="px-4 py-3 font-bold">Destination</th>
                                <th className="px-4 py-3 font-bold">Port</th>
                                <th className="px-4 py-3 font-bold">Description</th>
                                <th className="px-4 py-3 font-bold">States</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {(rules[activeIf] || []).map((r, i) => (
                                <tr key={i} className="hover:bg-white/[0.015] transition-colors text-[10px] font-mono group">
                                    <td className="px-4 py-3">
                                        <div className={`w-3 h-3 rounded ${r.act === 'pass' ? 'bg-green-500/30 border border-green-500/50' : 'bg-red-500/30 border border-red-500/50'}`}/>
                                    </td>
                                    <td className={`px-4 py-3 font-bold uppercase tracking-wider text-[9px] ${r.act === 'pass' ? 'text-green-400' : 'text-red-400'}`}>{r.act}</td>
                                    <td className="px-4 py-3 text-zinc-500">{r.proto}</td>
                                    <td className="px-4 py-3 text-zinc-400">{r.src}</td>
                                    <td className="px-4 py-3 text-zinc-400">{r.dst}</td>
                                    <td className={`px-4 py-3 ${r.port !== '*' ? 'text-cyan-400 font-bold' : 'text-zinc-600'}`}>{r.port}</td>
                                    <td className="px-4 py-3 text-zinc-500 group-hover:text-zinc-300 tracking-tight max-w-[250px] truncate">{r.desc}</td>
                                    <td className="px-4 py-3 text-zinc-600">{r.states}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-4 py-2.5 border-t border-white/[0.04] text-[9px] text-zinc-600 font-mono tracking-wider bg-white/[0.01] flex justify-between">
                    <span>Interface: {activeIf}_NET • {(rules[activeIf] || []).length} rules loaded</span>
                    <span>Last pfctl reload: 2024-03-15 14:27:55</span>
                </div>
            </div>
        </div>
    );
};


/* ─────────────────────────────────────────────────────────────
   NATIVE TOOL SVG ICONS
   ───────────────────────────────────────────────────────────── */
const ToolIcon = ({ tool, size = 18 }) => {
    const s = size;
    const icons = {
        pfSense: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/><circle cx="5.5" cy="6.5" r="0.8" fill={c}/><circle cx="8.5" cy="6.5" r="0.8" fill={c}/><path d="M6 14h4M14 14h4M6 17h3M14 17h2"/><line x1="12" y1="9" x2="12" y2="20" strokeDasharray="2 2" opacity="0.4"/></svg>,
        Suricata: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill={c}/></svg>,
        SafeLine: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v6c0 5.5 3.8 10.3 9 11.5 5.2-1.2 9-6 9-11.5V7l-9-5z"/><path d="M8 12h8M8 15h5"/></svg>,
        Wazuh: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20"/><circle cx="5" cy="5.5" r="0.7" fill={c}/><circle cx="7.5" cy="5.5" r="0.7" fill={c}/><circle cx="10" cy="5.5" r="0.7" fill={c}/><path d="M5 12l2 3 3-5 2 2 3-4 2 3" strokeWidth="1.4"/><rect x="5" y="17" width="3" height="2" rx="0.5" fill={c} opacity="0.3"/><rect x="10" y="16" width="3" height="3" rx="0.5" fill={c} opacity="0.3"/><rect x="15" y="15" width="3" height="4" rx="0.5" fill={c} opacity="0.3"/></svg>,
        Kali: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l8 4 8-4"/><path d="M4 4v16l8 -4 8 4V4"/><path d="M12 8v12"/><path d="M8 10l4 2 4-2"/></svg>,
        DVWA: (c) => <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18"/><circle cx="6" cy="6" r="0.8" fill={c}/><circle cx="9" cy="6" r="0.8" fill={c}/><path d="M7 14l3 3 4-5"/></svg>,
    };
    const colorMap = { pfSense: '#3b82f6', Suricata: '#a855f7', SafeLine: '#f97316', Wazuh: '#06b6d4', Kali: '#ef4444', DVWA: '#22c55e' };
    const render = icons[tool];
    return render ? <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${colorMap[tool]}15`, border: `1px solid ${colorMap[tool]}30` }}>{render(colorMap[tool])}</div> : null;
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: MISSION BRIEFING (Executive Summary)
   ───────────────────────────────────────────────────────────── */
const ExecutiveDoc = () => {
    const objectives = [
        'Simulate a multi-zone enterprise network in a safe, virtualized environment',
        'Implement network segmentation using pfSense firewall with strict ACL rules',
        'Deploy Suricata IDS for deep packet inspection and real-time alerting',
        'Configure SafeLine WAF to protect web applications against OWASP Top 10 attacks',
        'Centralize log monitoring with Wazuh SIEM for FIM, SSH brute-force detection, and compliance',
        'Validate the defense stack by executing real-world attack simulations from Kali Linux',
    ];
    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto py-6 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)]">
            {/* Hero banner */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-black border border-white/[0.05] rounded-xl p-8 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <Badge variant="info" className="w-fit mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[10px] tracking-widest px-2 py-0.5">Mission Briefing</Badge>
                <h1 className="text-3xl font-bold text-white mb-4 tracking-tight">Full-Stack SOC Laboratory</h1>
                <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed mb-4">
                    An enterprise-grade, virtualized security laboratory designed to simulate advanced persistent threats (APTs)
                    and validate defensive capabilities using industry-standard open-source tools. The lab simulates a real enterprise
                    network divided into three isolated zones — LAN, DMZ, and TEST — connected through a pfSense firewall.
                </p>
                <p className="text-sm text-zinc-400 max-w-3xl leading-relaxed mb-6">
                    The primary goal is to validate a layered defense-in-depth strategy by launching real attack payloads and verifying
                    that each security layer — firewall rules, intrusion detection signatures, WAF filters, and SIEM alerts — responds correctly.
                </p>
                <div className="flex gap-3">
                    <a href="https://github.com/nishasorallikar/SOC-Lab-Network-Segmentation-Threat-Detection" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg px-4 py-2 text-xs font-bold transition-all group">
                        <Github size={14}/> View on GitHub <ChevronRight size={12} className="text-zinc-500 group-hover:text-white"/>
                    </a>
                </div>
            </div>

            {/* Objectives */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-5 flex items-center gap-2"><Target size={14} className="text-cyan-400"/> Project Objectives</h3>
                <ul className="space-y-3">
                    {objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-zinc-300">
                            <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 text-[9px] text-cyan-400 font-bold">{i + 1}</span>
                            {obj}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Lab Environment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2"><Server size={14} className="text-blue-400"/> Platform</h3>
                    <ul className="space-y-2.5 text-xs text-zinc-400">
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"/><span className="text-zinc-300 font-medium">Hypervisor:</span> Oracle VirtualBox 7.x</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"/><span className="text-zinc-300 font-medium">Host OS:</span> Windows 11</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"/><span className="text-zinc-300 font-medium">VMs:</span> 5 virtual machines total</li>
                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"/><span className="text-zinc-300 font-medium">Networks:</span> 3 isolated subnets</li>
                    </ul>
                </div>
                <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Network Addressing</h3>
                    <div className="space-y-2 font-mono text-[11px]">
                        <div className="flex items-center gap-3 px-3 py-2 rounded bg-cyan-500/5 border border-cyan-500/10"><span className="w-2 h-2 rounded-full bg-cyan-400"/><span className="text-cyan-300 font-bold">LAN</span><span className="text-zinc-500 ml-auto">192.168.10.0/24</span></div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded bg-orange-500/5 border border-orange-500/10"><span className="w-2 h-2 rounded-full bg-orange-400"/><span className="text-orange-300 font-bold">DMZ</span><span className="text-zinc-500 ml-auto">192.168.20.0/24</span></div>
                        <div className="flex items-center gap-3 px-3 py-2 rounded bg-red-500/5 border border-red-500/10"><span className="w-2 h-2 rounded-full bg-red-400"/><span className="text-red-300 font-bold">TEST</span><span className="text-zinc-500 ml-auto">192.168.30.0/24</span></div>
                    </div>
                </div>
            </div>

            {/* Tools Overview with native icons */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-5">Security Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {[
                        { tool: 'pfSense', role: 'Firewall & Router', desc: 'Network segmentation · ACL rules · NAT' },
                        { tool: 'Suricata', role: 'IDS/IPS Engine', desc: 'Deep packet inspection · signature detection' },
                        { tool: 'SafeLine', role: 'Web Application Firewall', desc: 'SQLi · XSS · CMDi · LFI blocking' },
                        { tool: 'Wazuh', role: 'SIEM & Log Aggregator', desc: 'Log collection · FIM · SSH monitoring' },
                        { tool: 'Kali', role: 'Attacker Workstation', desc: 'Nmap · Burp Suite · Hydra · Metasploit' },
                        { tool: 'DVWA', role: 'Vulnerable Target', desc: 'Deliberately vulnerable web application' },
                    ].map(t => (
                        <div key={t.tool} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-white/[0.04] hover:border-white/[0.08] transition-all group">
                            <ToolIcon tool={t.tool}/>
                            <div>
                                <div className="text-xs font-bold text-zinc-200 group-hover:text-white">{t.tool} <span className="text-zinc-600 font-normal">— {t.role}</span></div>
                                <div className="text-[10px] text-zinc-600">{t.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: ARCHITECTURE & TOOL CONFIGURATION
   ───────────────────────────────────────────────────────────── */
const ArchitectureDoc = () => {
    const toolConfigs = [
        { tool: 'pfSense', name: 'pfSense Firewall', desc: 'Acts as the central router between all three zones. Configured with strict ACL rules to control inter-zone traffic flow and NAT for outbound connectivity.',
          config: ['# Interface Assignments','LAN  → vtnet1 → 192.168.10.1/24','DMZ  → vtnet2 → 192.168.20.1/24','TEST → vtnet3 → 192.168.30.1/24','','# Firewall Rules (simplified)','PASS  TEST → DMZ:443    # Allow WAF access','PASS  TEST → DMZ:8080   # Allow DVWA','BLOCK TEST → LAN:*      # Isolate attacker','PASS  LAN  → ANY        # LAN full access'] },
        { tool: 'Suricata', name: 'Suricata IDS', desc: 'Deployed on the pfSense box monitoring the DMZ interface. Uses ET Open rulesets for signature-based detection. Outputs structured alerts to eve.json for Wazuh ingestion.',
          config: ['# /etc/suricata/suricata.yaml','af-packet:','  - interface: vtnet2  # DMZ iface','','rule-files:','  - et-open.rules','  - custom-nids.rules','','# eve-log output → /var/log/suricata/eve.json','# Forwarded to Wazuh Agent via ossec.conf'] },
        { tool: 'SafeLine', name: 'SafeLine WAF', desc: 'Deployed as a reverse proxy in the DMZ zone on port 443. All traffic to DVWA (:8080) is routed through SafeLine for inspection.',
          config: ['# SafeLine Configuration','Listen Port:     443 (HTTPS)','Upstream:        127.0.0.1:8080 (DVWA)','Mode:            Reverse Proxy','','# Protection Modules Enabled','✓ SQL Injection Detection','✓ XSS Filter (reflected + stored)','✓ Command Injection Blocker','✓ Path Traversal / LFI Guard','✓ File Upload Scanner'] },
        { tool: 'Wazuh', name: 'Wazuh SIEM', desc: 'Wazuh Manager runs on the LAN zone, collecting logs from agents deployed on DVWA server and pfSense. Provides centralized alerting, FIM, and SSH brute-force detection.',
          config: ['# /var/ossec/etc/ossec.conf (Agent)','<localfile>','  <log_format>json</log_format>','  <location>/var/log/suricata/eve.json</location>','</localfile>','','# FIM Configuration','<syscheck>','  <directories check_all="yes">/var/www</directories>','  <frequency>300</frequency>','</syscheck>'] },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto py-6 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)]">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3"><Network size={20} className="text-cyan-400"/> Architecture & Tool Configuration</h2>

            {/* Detection Pipeline */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-5">Detection Pipeline</h3>
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {[
                        { tool: 'Kali', label: 'Attack Traffic', color: '#ef4444' },
                        { tool: 'pfSense', label: 'Firewall ACL', color: '#3b82f6' },
                        { tool: 'SafeLine', label: 'WAF Inspection', color: '#f97316' },
                        { tool: 'Suricata', label: 'NIDS Analysis', color: '#a855f7' },
                        { tool: 'Wazuh', label: 'SIEM Correlation', color: '#06b6d4' },
                    ].map((s, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-2 shrink-0 px-3">
                                <ToolIcon tool={s.tool} size={22}/>
                                <span className="text-[10px] font-bold text-zinc-300">{s.tool}</span>
                                <span className="text-[9px] text-zinc-600">{s.label}</span>
                            </div>
                            {i < 4 && <div className="w-8 h-px shrink-0" style={{background: `linear-gradient(to right, ${s.color}40, ${['#3b82f6','#f97316','#a855f7','#06b6d4','#06b6d4'][i]}40)`}}/>}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Tool Configuration Cards */}
            {toolConfigs.map((tc, i) => (
                <div key={i} className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg overflow-hidden">
                    <div className="p-5 border-b border-white/[0.04]">
                        <div className="flex items-center gap-3 mb-3">
                            <ToolIcon tool={tc.tool}/>
                            <div>
                                <h3 className="text-sm font-bold text-white">{tc.name}</h3>
                                <p className="text-[10px] text-zinc-500">{tc.desc}</p>
                            </div>
                        </div>
                    </div>
                    {/* Terminal config */}
                    <div className="bg-black/60">
                        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-white/[0.04]">
                            <div className="w-2 h-2 rounded-full bg-red-500/60"/>
                            <div className="w-2 h-2 rounded-full bg-yellow-500/60"/>
                            <div className="w-2 h-2 rounded-full bg-green-500/60"/>
                            <span className="text-[9px] text-zinc-600 ml-2 font-mono">{tc.name.toLowerCase().replace(/ /g, '_')}.conf</span>
                        </div>
                        <pre className="p-4 font-mono text-[10px] leading-relaxed overflow-x-auto custom-scrollbar">
                            {tc.config.map((line, li) => (
                                <div key={li}>
                                    {line.startsWith('#') || line.startsWith('//') ? (
                                        <span className="text-zinc-600">{line}</span>
                                    ) : line.startsWith('✓') ? (
                                        <span className="text-green-400">{line}</span>
                                    ) : line.startsWith('PASS') ? (
                                        <span><span className="text-green-400">PASS </span><span className="text-zinc-300">{line.slice(5)}</span></span>
                                    ) : line.startsWith('BLOCK') ? (
                                        <span><span className="text-red-400">BLOCK</span><span className="text-zinc-300">{line.slice(5)}</span></span>
                                    ) : line === '' ? (
                                        <br/>
                                    ) : (
                                        <span className="text-zinc-300">{line}</span>
                                    )}
                                </div>
                            ))}
                        </pre>
                    </div>
                </div>
            ))}
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: ATTACK PLAYBOOK
   ───────────────────────────────────────────────────────────── */
const AttackDoc = () => {
    const testResults = [
        { attack: 'Command injection', payload: '127.0.0.1; whoami', tool: 'SafeLine', result: 'Blocked', status: 'red' },
        { attack: 'File inclusion', payload: '?page=../../../etc', tool: 'SafeLine', result: 'Blocked', status: 'red' },
        { attack: 'File upload', payload: 'php-reverse-shell.php', tool: 'SafeLine', result: 'Blocked', status: 'red' },
        { attack: 'SQL injection', payload: "admin' OR '1'='1", tool: 'SafeLine', result: 'Blocked', status: 'red' },
        { attack: 'XSS', payload: "<script>alert('XSS')</script>", tool: 'SafeLine', result: 'Blocked', status: 'red' },
        { attack: 'NIDS test traffic', payload: 'curl testmynids.org', tool: 'Suricata', result: 'Detected', status: 'yellow' },
        { attack: 'SSH brute force', payload: 'ssh wronguser@host', tool: 'Wazuh', result: 'Detected', status: 'yellow' },
        { attack: 'FIM — file created', payload: 'touch samplefile.txt', tool: 'Wazuh', result: 'Detected', status: 'yellow' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto py-6 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)]">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3"><Terminal size={20} className="text-red-400"/> Execution Playbook</h2>

            {/* Attack Phases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[
                    { phase: 'Reconnaissance', desc: 'Nmap OS & Service Discovery', tool: 'Kali', detail: 'nmap -sV -O -p- 192.168.20.110', result: 'Identified exposed ports 80/443 (HTTP/S).' },
                    { phase: 'Web Exploitation', desc: 'SQLi / XSS / CMDi / Upload', tool: 'Kali', detail: "sqlmap -u 'http://target/sqli/?id=1' --dbs", result: 'All payloads blocked by SafeLine WAF (403).' },
                    { phase: 'Credential Access', desc: 'SSH Brute Force via Hydra', tool: 'Kali', detail: 'hydra -l admin -P rockyou.txt ssh://192.168.10.102', result: 'Wazuh detected after 5 failed attempts (Rule 5712).' },
                    { phase: 'Lateral Movement', desc: 'Pivoting from DMZ to LAN', tool: 'Kali', detail: 'run autoroute -s 192.168.10.0/24', result: 'Denied by pfSense DMZ→LAN strict firewall rules.' },
                ].map((a, i) => (
                    <div key={i} className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-400">Phase {i+1}</span>
                            <ToolIcon tool={a.tool} size={16}/>
                        </div>
                        <h3 className="text-sm font-bold text-white mb-1">{a.phase}</h3>
                        <div className="text-[11px] text-zinc-500 mb-3">{a.desc}</div>
                        <div className="bg-black/60 border border-white/[0.04] rounded p-3 font-mono text-[10px] text-zinc-300 mb-3">
                            <span className="text-red-400">$ </span>{a.detail}
                        </div>
                        <div className="text-[11px] font-bold text-green-400 flex items-center gap-2"><Shield size={12}/> {a.result}</div>
                    </div>
                ))}
            </div>

            {/* WAF & SIEM Test Results Table */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.04] text-sm font-bold text-zinc-300 flex items-center gap-2">
                    <Shield size={14} className="text-orange-400"/> WAF & SIEM Test Results
                    <span className="text-[9px] text-zinc-600 font-normal ml-auto">{testResults.length} payloads tested</span>
                </div>
                <table className="w-full text-left">
                    <thead className="text-[9px] text-zinc-600 uppercase tracking-wider border-b border-white/[0.04]">
                        <tr>
                            <th className="px-4 py-2.5 font-bold">Attack</th>
                            <th className="px-4 py-2.5 font-bold">Payload</th>
                            <th className="px-4 py-2.5 font-bold">Tool</th>
                            <th className="px-4 py-2.5 font-bold">Result</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {testResults.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.015] transition-colors text-[10px] font-mono">
                                <td className="px-4 py-2.5 text-zinc-300 font-medium">{row.attack}</td>
                                <td className="px-4 py-2.5"><code className="text-[9px] bg-zinc-900 px-1.5 py-0.5 rounded border border-white/[0.04] text-cyan-300">{row.payload}</code></td>
                                <td className="px-4 py-2.5 text-zinc-400 flex items-center gap-2"><ToolIcon tool={row.tool} size={14}/> {row.tool}</td>
                                <td className="px-4 py-2.5"><span className={`text-[9px] font-bold ${row.status === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>🛡 {row.result}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: RESULTS & KEY FINDINGS
   ───────────────────────────────────────────────────────────── */
const FindingsDoc = () => {
    const findings = [
        { title: 'WAF Blocked 100% of OWASP Top 5 Attacks', desc: 'SafeLine WAF successfully blocked SQLi, XSS, command injection, file inclusion, and malicious file uploads without any false negatives during controlled testing.', color: '#22c55e', tool: 'SafeLine' },
        { title: 'Suricata Detected ET Open Signatures in Real-Time', desc: "Suricata's ET Open ruleset flagged test traffic to testmynids.org within seconds, generating structured eve.json alerts that Wazuh ingested immediately.", color: '#a855f7', tool: 'Suricata' },
        { title: 'Wazuh FIM Caught Unauthorized File Changes', desc: 'File Integrity Monitoring detected new file creation and modification events in /var/www within the configured 300-second scan interval.', color: '#22d3ee', tool: 'Wazuh' },
        { title: 'Network Segmentation Prevented Lateral Movement', desc: 'pfSense ACL rules ensured the Kali attacker in the TEST zone could not access the LAN zone directly, demonstrating effective network isolation.', color: '#3b82f6', tool: 'pfSense' },
        { title: 'SSH Brute-Force Detected After 5 Attempts', desc: "Wazuh's active response module flagged repeated failed SSH login attempts from the TEST zone, triggering rule ID 5712 alerts in the dashboard.", color: '#f59e0b', tool: 'Wazuh' },
        { title: 'End-to-End Visibility Achieved', desc: 'By forwarding Suricata and system logs to Wazuh, a single dashboard provided complete visibility across all three network zones.', color: '#ef4444', tool: 'Wazuh' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto py-6 overflow-y-auto custom-scrollbar h-[calc(100vh-180px)]">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3"><FileText size={20} className="text-cyan-400"/> Results & Key Findings</h2>

            {/* Stats Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                    { val: '3', lbl: 'Network Zones Isolated', color: '#2dd4bf' },
                    { val: '5+', lbl: 'Attack Types Blocked', color: '#ef4444' },
                    { val: '4', lbl: 'Security Tools Integrated', color: '#3b82f6' },
                    { val: '<1s', lbl: 'Alert Latency', color: '#22d3ee' },
                ].map((s, i) => (
                    <div key={i} className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-5 text-center group hover:border-white/[0.1] transition-all">
                        <div className="text-3xl font-mono font-bold mb-1" style={{color: s.color}}>{s.val}</div>
                        <div className="text-[9px] uppercase tracking-widest font-bold text-zinc-600">{s.lbl}</div>
                    </div>
                ))}
            </div>

            {/* Findings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {findings.map((f, i) => (
                    <div key={i} className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-5 hover:border-white/[0.1] transition-all group">
                        <div className="flex items-center gap-3 mb-3">
                            <ToolIcon tool={f.tool} size={16}/>
                            <h3 className="text-xs font-bold text-zinc-200 group-hover:text-white transition-colors flex-1">{f.title}</h3>
                        </div>
                        <p className="text-[10px] text-zinc-500 leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>

            {/* Conclusion */}
            <div className="bg-[#0c0c0e] border border-white/[0.06] rounded-lg p-6 relative">
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-l"/>
                <h3 className="text-sm font-bold text-white mb-4 tracking-tight">Project Conclusion</h3>
                <div className="space-y-4 text-xs text-zinc-400 leading-relaxed">
                    <p>
                        This laboratory successfully demonstrated the value of defense-in-depth architecture.
                        By deploying segmented networks alongside strategically placed detection mechanisms (WAF, NIDS, SIEM),
                        we achieved comprehensive visibility into attack lifecycles.
                    </p>
                    <p>
                        The integration of Suricata alerts into Wazuh Manager proved highly effective for correlating
                        network-level anomalies with endpoint activities. Future iterations of this lab could incorporate
                        SOAR (Security Orchestration, Automation, and Response) tools to automatically ban malicious IPs
                        upon detection.
                    </p>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: BOOT SEQUENCE & SHELL (PREMIUM SIDEBAR)
   ───────────────────────────────────────────────────────────── */
const SOCLabProject = () => {
    const [activePage, setActivePage] = useState('Network Map');
    const [isBooting, setIsBooting] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => setIsBooting(false), 2000);
        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, []);
    
    const labPages = [
        { id: 'Live Overview', icon: LayoutDashboard },
        { id: 'Network Map', icon: Network },
        { id: 'WAF Inspector', icon: Shield },
        { id: 'Suricata NIDS', icon: AlertTriangle },
        { id: 'Wazuh SIEM', icon: Database },
        { id: 'Threat Timeline', icon: Clock },
        { id: 'Firewall Policy', icon: ServerCrash }
    ];

    const docPages = [
        { id: 'Mission Briefing', icon: FileText },
        { id: 'Architecture Map', icon: Network },
        { id: 'Attack Playbook', icon: Terminal },
        { id: 'Results & ROI', icon: Activity }
    ];

    return (
        <div className="h-screen w-screen bg-[#050505] text-zinc-300 font-sans flex flex-col overflow-hidden selection:bg-cyan-500/30">
            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} 
                        className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-mono text-cyan-400">
                        <Terminal size={48} className="mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                        <div className="text-xl tracking-[0.3em] uppercase mb-4 font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Initializing SOC Terminal</div>
                        <div className="w-64 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Statusbar */}
            <div className="h-12 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 text-[10px] font-mono uppercase tracking-widest shrink-0 shadow-xl relative z-20">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors group relative overflow-hidden">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Exit Terminal
                    </Link>
                    <span className="flex items-center gap-2 text-cyan-400 font-bold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,211,238,1)]"/> LIVE SIMULATION
                    </span>
                    <span className="text-zinc-500 hidden md:inline">Alerts Today: <span className="text-zinc-200 font-bold ml-1">1,247</span></span>
                    <span className="text-zinc-500 hidden md:inline">Critical: <span className="text-red-400 font-bold ml-1">23</span></span>
                    <span className="text-zinc-500 hidden lg:inline">Agents Online: <span className="text-green-400 font-bold ml-1">3/3</span></span>
                </div>
                <div className="text-zinc-500 flex items-center gap-6">
                    <a href="https://github.com/nishasorallikar/SOC-Lab-Network-Segmentation-Threat-Detection" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors group">
                        <Github size={14} className="group-hover:text-cyan-400 transition-colors" /> GitHub Repo
                    </a>
                    <div className="flex items-center gap-3">
                        Sys_Time: <span className="text-zinc-200 font-bold">{(new Date()).toISOString().split('T')[1].split('.')[0]} UTC</span>
                        <div className="w-3 h-3 rounded-full border-2 border-zinc-700 border-t-cyan-400 animate-spin ml-2"/>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Global Background Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.03)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(248,113,113,0.02)_0%,transparent_50%)] pointer-events-none z-0" />

                {/* Left Sidebar (Premium Vertical Layout) */}
                <div className="w-64 bg-white/[0.01] backdrop-blur-2xl border-r border-white/[0.05] flex flex-col py-8 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.8)] z-10 overflow-y-auto custom-scrollbar relative">
                    {/* Subtle left glow */}
                    <div className="absolute left-0 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                    
                    {/* Project Title Header */}
                    <div className="px-6 mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.15)]">
                                <Shield size={18} className="text-cyan-400" />
                            </div>
                            <div>
                                <div className="text-[9px] font-mono text-cyan-400 uppercase tracking-[0.2em] font-bold">SOC Lab Project</div>
                                <div className="text-[10px] text-zinc-500 font-medium">Network Security</div>
                            </div>
                        </div>
                        <div className="text-sm font-bold text-white leading-snug tracking-tight">Network Segmentation<br/><span className="text-zinc-400 font-medium">&amp; Threat Detection</span></div>
                        <div className="h-px w-full bg-gradient-to-r from-cyan-500/40 via-cyan-500/10 to-transparent mt-4" />
                    </div>

                    <div className="px-8 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                        <LayoutDashboard size={10}/> Data Feed
                    </div>
                    <nav className="space-y-1 mb-8">
                        {labPages.map(p => {
                            const active = activePage === p.id;
                            const Icon = p.icon;
                            return (
                                <button key={p.id} onClick={() => setActivePage(p.id)}
                                    className={`w-full flex items-center gap-4 px-8 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 text-left group relative
                                        ${active ? 'bg-gradient-to-r from-cyan-500/20 to-transparent text-cyan-400' : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'}`}>
                                    
                                    {/* Premium Active Indicator */}
                                    <AnimatePresence>
                                        {active && (
                                            <motion.div layoutId="sidebar-active" className="absolute left-0 inset-y-0 w-1 bg-cyan-400 shadow-[0_0_15px_cyan]" />
                                        )}
                                    </AnimatePresence>

                                    <Icon size={16} className={`transition-transform duration-300 ${active ? 'text-cyan-400 drop-shadow-[0_0_8px_cyan]' : 'text-zinc-600 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_cyan] group-hover:translate-x-1'}`}/>
                                    <span className="relative z-10">{p.id}</span>
                                </button>
                            );
                        })}
                    </nav>

                    <div className="px-8 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                        <FileText size={10}/> Library Context
                    </div>
                    <nav className="space-y-1">
                        {docPages.map(p => {
                            const active = activePage === p.id;
                            const Icon = p.icon;
                            return (
                                <button key={p.id} onClick={() => setActivePage(p.id)}
                                    className={`w-full flex items-center gap-4 px-8 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 text-left group relative
                                        ${active ? 'bg-gradient-to-r from-orange-500/20 to-transparent text-orange-400' : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'}`}>
                                    
                                    {/* Premium Active Indicator for Docs */}
                                    <AnimatePresence>
                                        {active && (
                                            <motion.div layoutId="sidebar-active" className="absolute left-0 inset-y-0 w-1 bg-orange-400 shadow-[0_0_15px_orange]" />
                                        )}
                                    </AnimatePresence>

                                    <Icon size={16} className={`transition-transform duration-300 ${active ? 'text-orange-400 drop-shadow-[0_0_8px_orange]' : 'text-zinc-600 group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_orange] group-hover:translate-x-1'}`}/>
                                    <span className="relative z-10">{p.id}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar scroll-smooth">
                    <AnimatePresence mode="wait">
                        <motion.div key={activePage} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
                            <div className="mb-6 flex items-center gap-3 text-zinc-500 text-[10px] font-bold font-mono uppercase tracking-[0.2em] bg-white/[0.02] backdrop-blur-md border border-white/[0.05] w-fit px-5 py-2.5 rounded-full shadow-2xl relative overflow-hidden">
                                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
                                <span className="text-zinc-600">SOC</span> <ChevronRight size={10} className="text-zinc-700"/> 
                                <span className={activePage.includes('Briefing') || activePage.includes('Map') || activePage.includes('Playbook') || activePage.includes('Results') ? 'text-orange-400 drop-shadow-[0_0_5px_orange]' : 'text-cyan-400 drop-shadow-[0_0_5px_cyan]'}>{activePage}</span>
                            </div>
                            
                            {/* LAB PAGES */}
                            {activePage === 'Live Overview' && <OverviewPage />}
                            {activePage === 'Network Map' && <NetworkMapPage />}
                            {activePage === 'WAF Inspector' && <WAFInspectorPage />}
                            {activePage === 'Suricata NIDS' && <SiemPage title="Suricata NIDS" />}
                            {activePage === 'Wazuh SIEM' && <SiemPage title="Wazuh SIEM" />}
                            {activePage === 'Threat Timeline' && <TimelinePage />}
                            {activePage === 'Firewall Policy' && <FirewallPage />}

                            {/* DOC PAGES */}
                            {activePage === 'Mission Briefing' && <ExecutiveDoc />}
                            {activePage === 'Architecture Map' && <ArchitectureDoc />}
                            {activePage === 'Attack Playbook' && <AttackDoc />}
                            {activePage === 'Results & ROI' && <FindingsDoc />}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
            `}</style>
        </div>
    );
};

export default SOCLabProject;
