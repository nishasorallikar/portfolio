import sys
import re

orig_fp = "d:/Projects/nisha/portfolio/orig_soc.jsx"
out_fp = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

# 1. Read the original documentation components
with open(orig_fp, "r", encoding="utf-8") as f:
    orig_content = f.read()

# Remove the import lines from orig_soc.jsx
# We will provide our own imports
orig_components = re.sub(r"^import .*?\n", "", orig_content, flags=re.MULTILINE)
orig_components = re.sub(r"export default .*?;", "", orig_components)

dashboard_components_only = """
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Activity, Shield, AlertTriangle, Terminal, 
    Network, Server, Clock, ServerCrash, Bug, Lock,
    ChevronRight, ArrowLeft, Github, FileText, LayoutDashboard, Database
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
   PAGE 1: OVERVIEW DASHBOARD
   ───────────────────────────────────────────────────────────── */
const OverviewPage = () => {
    const metrics = [
        { label: 'Total Alerts', value: '1,247', color: 'text-slate-200' },
        { label: 'Critical', value: '23', color: 'text-red-400' },
        { label: 'High', value: '89', color: 'text-orange-400' },
        { label: 'WAF Blocked', value: '389', color: 'text-blue-400' },
        { label: 'SSH Failures', value: '47', color: 'text-yellow-400' },
        { label: 'FIM Events', value: '14', color: 'text-cyan-400' }
    ];

    const [alerts, setAlerts] = useState([
        { id: 1, severity: 'critical', rule: 'ET EXPLOIT PHP Shell Upload', src: '192.168.30.100', time: 'Just now' },
        { id: 2, severity: 'high', rule: 'ET WEB_SERVER SQLi Attempt', src: '192.168.30.100', time: '2m ago' },
        { id: 3, severity: 'medium', rule: 'SSH invalid user admin', src: '192.168.20.110', time: '5m ago' },
        { id: 4, severity: 'info', rule: 'FIM: /root/test.txt modified', src: '192.168.10.102', time: '12m ago' },
        { id: 5, severity: 'low', rule: 'Windows logon success', src: '192.168.10.101', time: '1h ago' }
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
                return [newAlert, ...prev.slice(0, 4)];
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
        <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i*0.05 }}
                        className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex flex-col justify-between h-24">
                        <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">{m.label}</span>
                        <span className={`text-2xl font-bold font-mono ${m.color}`}>{m.value}</span>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col h-[400px]">
                    <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                        <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2"><AlertTriangle size={16} className="text-cyan-400"/> Recent Alerts (Live Feed)</h3>
                    </div>
                    <div className="flex-1 overflow-hidden p-2 space-y-1">
                        <AnimatePresence>
                            {alerts.map(a => (
                                <motion.div key={a.id} initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(34, 211, 238, 0.2)' }} animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(24, 24, 27, 0)' }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                                    className="flex items-center justify-between p-3 rounded hover:bg-zinc-800/50 cursor-pointer border border-transparent hover:border-zinc-700 transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <Badge variant={a.severity} className="w-20 justify-center">{a.severity}</Badge>
                                        <span className="text-sm text-zinc-300 font-mono">{a.rule}</span>
                                    </div>
                                    <div className="flex items-center gap-6 text-xs text-zinc-500">
                                        <span>{a.src}</span>
                                        <span className="w-16 text-right group-hover:text-cyan-400 transition-colors">{a.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col h-[400px]">
                    <div className="p-4 border-b border-zinc-800">
                        <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2"><Server size={16} className="text-cyan-400"/> Agents Status</h3>
                    </div>
                    <div className="p-4 space-y-4">
                        {agents.map((ag, i) => (
                            <div key={i} className="bg-black/50 border border-zinc-800 p-3 rounded-lg hover:border-cyan-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">{ag.os[0]}</div>
                                        <div>
                                            <div className="text-sm text-zinc-200 font-medium">{ag.name}</div>
                                            <div className="text-xs text-zinc-500 font-mono">{ag.ip}</div>
                                        </div>
                                    </div>
                                    <Badge variant="success">Active</Badge>
                                </div>
                                <div className="flex justify-between text-[10px] text-zinc-500 uppercase tracking-widest mt-3 pt-2 border-t border-zinc-800/50">
                                    <span>Last keep-alive: 2s ago</span>
                                    <span className="text-cyan-500">{ag.events} events</span>
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
   PAGE 2: NETWORK MAP
   ───────────────────────────────────────────────────────────── */
const NetworkMapPage = () => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg h-[600px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 text-zinc-800/20" />
            
            <svg viewBox="0 0 1000 600" className="w-full h-full max-w-5xl z-10">
                <defs>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <path id="attackPath" d="M 150 150 L 350 300 L 600 200" fill="none" />
                    <path id="normalPath" d="M 600 450 L 800 500" fill="none" />
                </defs>

                {/* Zones */}
                <rect x="50" y="50" width="250" height="200" rx="10" fill="rgba(248, 113, 113, 0.05)" stroke="#f87171" strokeDasharray="4 4" strokeWidth="1" />
                <text x="60" y="70" className="text-xs font-mono" fill="#f87171">TEST_NET (192.168.30.0/24)</text>

                <rect x="500" y="50" width="300" height="250" rx="10" fill="rgba(251, 146, 60, 0.05)" stroke="#fb923c" strokeDasharray="4 4" strokeWidth="1" />
                <text x="510" y="70" className="text-xs font-mono" fill="#fb923c">DMZ_NET (192.168.20.0/24)</text>

                <rect x="50" y="350" width="900" height="200" rx="10" fill="rgba(34, 211, 238, 0.05)" stroke="#22d3ee" strokeDasharray="4 4" strokeWidth="1" />
                <text x="60" y="370" className="text-xs font-mono" fill="#22d3ee">LAN_NET (192.168.10.0/24)</text>

                {/* Connections */}
                <line x1="150" y1="150" x2="350" y2="300" stroke="#3f3f46" strokeWidth="2" />
                <line x1="350" y1="300" x2="600" y2="200" stroke="#3f3f46" strokeWidth="2" />
                <line x1="350" y1="300" x2="600" y2="450" stroke="#3f3f46" strokeWidth="2" />
                <line x1="600" y1="200" x2="550" y2="450" stroke="#3f3f46" strokeWidth="2" strokeDasharray="4 4" />
                <line x1="600" y1="450" x2="800" y2="500" stroke="#3f3f46" strokeWidth="2" />

                {/* Nodes */}
                {/* Kali */}
                <g transform="translate(100, 100)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#18181b" stroke="#f87171" strokeWidth="1.5" />
                    <text x="50" y="24" textAnchor="middle" fill="#f87171" className="text-xs font-bold">Kali Linux</text>
                </g>

                {/* pfSense */}
                <g transform="translate(300, 280)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#18181b" stroke="#3b82f6" strokeWidth="2" filter="url(#glow)" />
                    <text x="50" y="24" textAnchor="middle" fill="#60a5fa" className="text-xs font-bold">pfSense</text>
                </g>

                {/* WAF */}
                <g transform="translate(550, 100)" className="cursor-pointer">
                    <rect width="120" height="40" rx="6" fill="#18181b" stroke="#fb923c" strokeWidth="1.5" />
                    <text x="60" y="24" textAnchor="middle" fill="#fdba74" className="text-xs font-bold">SafeLine WAF</text>
                    <circle cx="120" cy="0" r="6" fill="#f87171">
                        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
                    </circle>
                </g>

                {/* DVWA */}
                <g transform="translate(550, 180)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#18181b" stroke="#22c55e" strokeWidth="1.5" />
                    <text x="50" y="24" textAnchor="middle" fill="#4ade80" className="text-xs font-bold">DVWA</text>
                </g>

                {/* IDs */}
                <g transform="translate(700, 140)" className="cursor-pointer">
                    <rect width="80" height="30" rx="4" fill="#18181b" stroke="#a855f7" strokeWidth="1" />
                    <text x="40" y="19" textAnchor="middle" fill="#c084fc" className="text-[10px] font-bold">Suricata</text>
                </g>

                {/* Wazuh Manager */}
                <g transform="translate(550, 430)" className="cursor-pointer">
                    <rect width="120" height="40" rx="6" fill="#18181b" stroke="#2dd4bf" strokeWidth="1.5" />
                    <text x="60" y="24" textAnchor="middle" fill="#5eead4" className="text-xs font-bold">Wazuh Manager</text>
                </g>

                {/* Windows/Lubuntu */}
                <g transform="translate(750, 480)" className="cursor-pointer">
                    <rect width="100" height="40" rx="6" fill="#18181b" stroke="#cbd5e1" strokeWidth="1.5" />
                    <text x="50" y="24" textAnchor="middle" fill="#f1f5f9" className="text-xs font-bold">Endpoints</text>
                </g>

                {/* Traffic animations */}
                <circle r="4" fill="#ef4444" filter="url(#glow)">
                    <animateMotion dur="2s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#attackPath" />
                    </animateMotion>
                </circle>

                <circle r="4" fill="#22d3ee" filter="url(#glow)">
                    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#normalPath" />
                    </animateMotion>
                </circle>

            </svg>

            <div className="absolute bottom-4 right-4 bg-black/80 border border-zinc-800 rounded p-3 text-xs space-y-2 backdrop-blur-sm">
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Attack Traffic (Blocked)</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Normal Traffic</div>
                <div className="flex items-center gap-2 text-zinc-500">Click node for details</div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE 3: WAF INSPECTOR
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
        { name: 'Upload', m: 'POST', u: "https://192.168.20.110:443/dvwa/vulnerabilities/upload/", b: "filename=shell.php\\n<?php system($_GET['cmd']); ?>" }
    ];

    const handleSend = () => {
        setPipelineStage(0);
        setTimeout(() => setPipelineStage(1), 400);   // Request Received
        setTimeout(() => setPipelineStage(2), 1000);  // Rule Engine
        setTimeout(() => setPipelineStage(3), 1600);  // Pattern Match
        setTimeout(() => setPipelineStage(4), 2000);  // Verdict
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Request Builder */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col overflow-hidden">
                <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-semibold text-sm text-zinc-300">Request Builder</div>
                <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    <div className="flex gap-2 text-xs mb-4">
                        {attacks.map(a => (
                            <button key={a.name} onClick={() => { setUrl(a.u); setBody(a.b); setMethod(a.m); setPipelineStage(0); }}
                                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded border border-zinc-700 transition-colors">
                                {a.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Method &amp; URL</label>
                        <div className="flex gap-2">
                            <select value={method} onChange={e=>setMethod(e.target.value)} className="bg-black border border-zinc-700 rounded px-2 text-sm text-zinc-200 outline-none w-24 focus:border-cyan-500">
                                <option>GET</option>
                                <option>POST</option>
                            </select>
                            <input value={url} onChange={e=>setUrl(e.target.value)} className="bg-black border border-zinc-700 rounded px-3 py-1.5 text-sm text-zinc-200 font-mono flex-1 min-w-0 outline-none focus:border-cyan-500" />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Headers</label>
                        <textarea readOnly value="Host: 192.168.20.110:443&#10;User-Agent: Mozilla/5.0 (Kali)&#10;Cookie: security=low; PHPSESSID=123" 
                            className="w-full h-24 bg-black border border-zinc-700 rounded p-2 text-xs text-zinc-400 font-mono outline-none resize-none" />
                    </div>

                    {method === 'POST' && (
                        <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Body</label>
                            <textarea value={body} onChange={e=>setBody(e.target.value)} 
                                className="w-full h-32 bg-black border border-zinc-700 rounded p-2 text-xs text-green-400 font-mono outline-none resize-none focus:border-cyan-500" />
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-zinc-800 bg-zinc-950">
                    <button onClick={handleSend} className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded transition-colors text-sm flex items-center justify-center gap-2">
                        <Terminal size={16}/> Send Request
                    </button>
                </div>
            </div>

            {/* Pipeline Center */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col items-center justify-center p-6 relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.03)_0%,transparent_70%)] pointer-events-none" />
                <h3 className="absolute top-3 text-xs font-bold text-zinc-500 uppercase tracking-widest w-full text-center">Inspection Pipeline</h3>
                
                <div className="w-full max-w-[240px] space-y-4 perspective-1000 mt-8">
                    {/* Stage 1 */}
                    <div className={`p-3 rounded border transition-all duration-500 ${pipelineStage >= 1 ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-black border-zinc-800 text-zinc-600'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1">1. HTTP Receiver</div>
                        <div className="text-[10px] font-mono truncate opacity-80">{method} {url.split('.110:443')[1] || '/'}</div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 2 ? 'border-cyan-500' : 'border-zinc-800'}`} />
                    
                    {/* Stage 2 */}
                    <div className={`p-3 rounded border transition-all duration-500 ${pipelineStage >= 2 ? 'bg-cyan-950/40 border-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.2)]' : 'bg-black border-zinc-800 text-zinc-600'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1">2. Semantic Engine</div>
                        <div className="h-1 bg-black rounded overflow-hidden">
                            <motion.div className="h-full bg-cyan-400" initial={{width: 0}} animate={{width: pipelineStage >= 2 ? '100%' : '0%'}} transition={{duration: 0.6}}/>
                        </div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 3 ? 'border-cyan-500' : 'border-zinc-800'}`} />

                    {/* Stage 3 */}
                    <div className={`p-3 rounded border transition-all duration-500 ${pipelineStage >= 3 ? 'bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(248,113,113,0.2)]' : 'bg-black border-zinc-800 text-zinc-600'}`}>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1 text-red-400">3. Threat Match</div>
                        <div className="text-[10px] font-mono text-red-300 opacity-80 break-words">{url.includes('id=') ? "SQLi Rule 942100" : url.includes('script') ? "XSS Rule 941100" : "Pattern Matched"}</div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 4 ? 'border-red-500' : 'border-zinc-800'}`} />

                    {/* Stage 4 */}
                    <div className={`p-4 rounded border text-center transition-all duration-300 ${pipelineStage >= 4 ? 'bg-red-500/20 border-red-500 text-red-400 scale-105 font-bold shadow-[0_0_30px_rgba(248,113,113,0.4)]' : 'bg-black border-zinc-800 text-zinc-600 font-medium'}`}>
                        {pipelineStage >= 4 ? 'CONNECTION DROPPED (403)' : 'WAITING VERDICT'}
                    </div>
                </div>
            </div>

            {/* WAF Log */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col overflow-hidden">
                 <div className="p-3 border-b border-zinc-800 bg-zinc-950 font-semibold text-sm text-zinc-300 flex justify-between">
                    Request Log
                 </div>
                 <div className="flex-1 overflow-y-auto p-2 space-y-1">
                     <div className="text-[10px] uppercase text-zinc-500 font-bold flex px-2 py-1 border-b border-zinc-800">
                         <div className="w-12">Action</div>
                         <div className="flex-1">Path</div>
                     </div>
                     {pipelineStage === 4 && (
                        <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="flex items-center text-xs font-mono p-2 hover:bg-zinc-800 rounded cursor-pointer group">
                            <div className="w-12"><Badge variant="critical">Block</Badge></div>
                            <div className="flex-1 truncate text-zinc-300 group-hover:text-cyan-400">{url.split('.110:443')[1]}</div>
                        </motion.div>
                     )}
                     <div className="flex items-center text-xs font-mono p-2 hover:bg-zinc-800 rounded cursor-pointer text-zinc-500">
                        <div className="w-12"><Badge variant="critical">Block</Badge></div>
                        <div className="flex-1 truncate">/dvwa/vulnerabilities/exec/</div>
                     </div>
                     <div className="flex items-center text-xs font-mono p-2 hover:bg-zinc-800 rounded cursor-pointer text-zinc-500">
                        <div className="w-12"><Badge variant="success">Pass</Badge></div>
                        <div className="flex-1 truncate">/dvwa/login.php</div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE 4: SURICATA ALERTS & 5: WAZUH SIEM (Shared Table layout)
   ───────────────────────────────────────────────────────────── */
const SiemTableData = [
  { time: '2024-03-15T14:32:07.441Z', sev: 'critical', rule: 'ET SCAN Nmap OS Detection', src: '192.168.30.100', dst: '192.168.20.110', action: 'alerted' },
  { time: '2024-03-15T14:35:12.102Z', sev: 'high', rule: 'ET WEB_SERVER SQLi Attempt', src: '192.168.30.100', dst: '192.168.20.110', action: 'blocked' },
  { time: '2024-03-15T14:40:01.888Z', sev: 'high', rule: 'ET EXPLOIT PHP Shell Upload', src: '192.168.30.100', dst: '192.168.20.110', action: 'blocked' },
  { time: '2024-03-15T14:42:15.000Z', sev: 'medium', rule: 'SSH invalid user admin', src: '192.168.10.102', dst: '192.168.10.101', action: 'alerted' },
  { time: '2024-03-15T14:50:33.211Z', sev: 'low', rule: 'Windows logon success', src: '192.168.10.101', dst: '-', action: 'alerted' }
];

const SiemPage = ({ title }) => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg flex flex-col h-[600px] overflow-hidden">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
                <input type="text" placeholder={`Search ${title}...`} className="bg-black border border-zinc-700 rounded px-3 py-1.5 text-sm w-64 text-zinc-200 outline-none focus:border-cyan-500"/>
                <div className="flex gap-2">
                    <Badge variant="critical">Critical</Badge>
                    <Badge variant="high">High</Badge>
                    <Badge variant="info">All</Badge>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-black text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800 sticky top-0">
                        <tr>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Timestamp</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Severity</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Rule/Signature</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Source</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Dest</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-cyan-400">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                        {SiemTableData.map((row, i) => (
                            <tr key={i} className="hover:bg-zinc-800/50 cursor-pointer group transition-colors text-zinc-300 font-mono text-xs">
                                <td className="px-4 py-3 text-zinc-500 group-hover:text-cyan-400">{row.time}</td>
                                <td className="px-4 py-3"><Badge variant={row.sev}>{row.sev}</Badge></td>
                                <td className="px-4 py-3">{row.rule}</td>
                                <td className="px-4 py-3">{row.src}</td>
                                <td className="px-4 py-3">{row.dst}</td>
                                <td className="px-4 py-3 text-zinc-500">{row.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-3 border-t border-zinc-800 bg-zinc-950 flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>Showing 1 to 5 of 1,247 entries</span>
                <div className="flex gap-4">
                    <button className="hover:text-cyan-400 disabled:opacity-50" disabled>Previous</button>
                    <span className="text-zinc-300">Page 1 of 250</span>
                    <button className="hover:text-cyan-400">Next</button>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE 6: ATTACK TIMELINE
   ───────────────────────────────────────────────────────────── */
const TimelinePage = () => {
    const events = [
        { time: '14:28:01', src: 'Kali', tool: 'Nmap', desc: 'RECON — Nmap scan -sV -O 192.168.20.110', glow: '' },
        { time: '14:28:45', src: 'Suricata', tool: 'IDS', desc: 'DETECTION — ET SCAN Nmap OS Detection alert fired', glow: 'text-orange-400' },
        { time: '14:29:12', src: 'Kali', tool: 'Burp', desc: "ATTACK — SQLi payload sent to /dvwa/sqli/?id=1'OR'1'='1", glow: '' },
        { time: '14:29:12', src: 'SafeLine', tool: 'WAF', desc: 'BLOCKED — Rule 942100 matched, request dropped', glow: 'text-red-400 font-bold' },
        { time: '14:29:14', src: 'Wazuh Mgr', tool: 'SIEM', desc: 'CORRELATE — Rule 1002 fired, Level 10 alert created', glow: 'text-cyan-400' }
    ];
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="relative border-l-2 border-zinc-800 ml-4 space-y-8">
                {events.map((ev, i) => (
                    <motion.div key={i} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i*0.1}} className="relative pl-8">
                        <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-zinc-900 ${ev.glow ? ev.glow.replace('text','bg') : 'bg-zinc-600'}`}/>
                        <div className="flex items-start gap-4 cursor-pointer group">
                            <div className="w-16 pt-0.5 text-xs font-mono text-zinc-500">{ev.time}</div>
                            <div className="flex-1 bg-black/50 border border-zinc-800 p-4 rounded-lg group-hover:border-zinc-600 transition-colors">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="info">{ev.src}</Badge>
                                    <span className="text-xs text-zinc-500">{ev.tool}</span>
                                </div>
                                <div className={`text-sm font-mono ${ev.glow || 'text-zinc-300'}`}>{ev.desc}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE 7: FIREWALL RULES
   ───────────────────────────────────────────────────────────── */
const FirewallPage = () => {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
            <div className="flex border-b border-zinc-800 bg-zinc-950">
                {['LAN', 'DMZ', 'TEST', 'WAN'].map((tab, i) => (
                    <button key={tab} className={`px-6 py-3 text-sm font-bold uppercase tracking-wider border-b-2 transition-colors ${i===1 ? 'border-cyan-500 text-cyan-400 bg-cyan-500/5' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'}`}>
                        {tab} Interface
                    </button>
                ))}
            </div>
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-black text-zinc-500 text-xs uppercase tracking-wider border-b border-zinc-800">
                    <tr><th className="px-4 py-3">Action</th><th className="px-4 py-3">Proto</th><th className="px-4 py-3">Source</th><th className="px-4 py-3">Destination</th><th className="px-4 py-3">Port</th><th className="px-4 py-3">Description</th></tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300 font-mono text-xs">
                    <tr className="border-l-2 border-l-red-500 hover:bg-zinc-800/50">
                        <td className="px-4 py-3 text-red-400 font-bold">❌ BLOCK</td><td className="px-4 py-3">ANY</td><td className="px-4 py-3">DMZ net</td><td className="px-4 py-3">LAN net</td><td className="px-4 py-3">*</td><td className="px-4 py-3 text-zinc-500">Block DMZ to LAN (Lateral Movement)</td>
                    </tr>
                    <tr className="border-l-2 border-l-green-500 hover:bg-zinc-800/50">
                        <td className="px-4 py-3 text-green-400 font-bold">✅ ALLOW</td><td className="px-4 py-3">TCP</td><td className="px-4 py-3">DMZ net</td><td className="px-4 py-3">LAN addr</td><td className="px-4 py-3">1514</td><td className="px-4 py-3 text-zinc-500">Allow Wazuh agent logs</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
"""

main_app_shell = """
/* ─────────────────────────────────────────────────────────────
   MAIN SHELL
   ───────────────────────────────────────────────────────────── */
const SOCLabProject = () => {
    const [activePage, setActivePage] = useState('Overview');
    
    const pages = [
        { id: 'Overview', icon: LayoutDashboard },
        { id: 'Network Map', icon: Network },
        { id: 'WAF Inspector', icon: Shield },
        { id: 'Suricata Alerts', icon: AlertTriangle },
        { id: 'Wazuh SIEM', icon: Database },
        { id: 'Attack Timeline', icon: Clock },
        { id: 'Firewall Rules', icon: ServerCrash }
    ];

    return (
        <div className="min-h-screen bg-black text-zinc-300 font-sans p-4 sm:p-8">
            <div className="max-w-7xl mx-auto mb-16 relative">
                
                {/* BACK LINK */}
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-cyan-400 mb-6 transition-colors group text-sm font-semibold uppercase tracking-wider">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Exit Dashboard
                </Link>

                {/* THE SOC DASHBOARD APP SHELL container */}
                <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950 shadow-2xl shadow-cyan-500/5 flex flex-col mb-24 h-[800px]">
                    
                    {/* Top Statusbar */}
                    <div className="h-12 bg-black border-b border-zinc-800 flex items-center justify-between px-4 text-xs font-mono select-none">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 text-cyan-400 font-bold px-2 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">
                                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"/> LIVE
                            </span>
                            <span className="text-zinc-500">Alerts Today: <span className="text-zinc-200">1,247</span></span>
                            <span className="text-zinc-500">Critical: <span className="text-red-400">23</span></span>
                            <span className="text-zinc-500 hidden sm:inline">Agents Online: <span className="text-green-400">3/3</span></span>
                        </div>
                        <div className="text-zinc-500 flex items-center gap-2">
                            Last Event: <span className="text-zinc-300">2s ago</span>
                            <div className="w-4 h-4 rounded-full border-2 border-zinc-700 border-t-cyan-400 animate-spin ml-2"/>
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden">
                        {/* Left Sidebar */}
                        <div className="w-56 bg-black border-r border-zinc-800 flex flex-col py-4">
                            <div className="px-4 mb-6 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Modules</div>
                            <nav className="flex-1 space-y-1">
                                {pages.map(p => {
                                    const active = activePage === p.id;
                                    const Icon = p.icon;
                                    return (
                                        <button key={p.id} onClick={() => setActivePage(p.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-200 text-left cursor-pointer
                                                ${active ? 'bg-zinc-800/80 text-cyan-400 border-l-2 border-cyan-400' : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200 border-l-2 border-transparent'}`}>
                                            <Icon size={18} className={active ? 'text-cyan-400' : 'text-zinc-500'}/>
                                            {p.id}
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-auto bg-zinc-950 p-6 relative">
                            <AnimatePresence mode="wait">
                                <motion.div key={activePage} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }} className="h-full">
                                    <div className="mb-6 flex items-center gap-2 text-zinc-500 text-sm font-mono uppercase tracking-widest">
                                        SOC <ChevronRight size={14}/> {activePage}
                                    </div>
                                    {activePage === 'Overview' && <OverviewPage />}
                                    {activePage === 'Network Map' && <NetworkMapPage />}
                                    {activePage === 'WAF Inspector' && <WAFInspectorPage />}
                                    {activePage === 'Suricata Alerts' && <SiemPage title="Suricata NIDS" />}
                                    {activePage === 'Wazuh SIEM' && <SiemPage title="Wazuh SIEM" />}
                                    {activePage === 'Attack Timeline' && <TimelinePage />}
                                    {activePage === 'Firewall Rules' && <FirewallPage />}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* ORIGINAL DOCUMENTATION RENDERED BELOW THE APP */}
                <div className="space-y-32">
                    <HeroBlock />
                    <TopologyBlock />
                    <DefenseBlock />
                    <AttackFlowBlock />
                    <ResultsTableBlock />
                    <PipelineBlock />
                    <StatsBlock />
                    <OverviewBlock />
                    
                    {/* Render tool configs from orig */}
                    <section className="mb-28">
                        <h2 className="text-2xl font-display font-bold text-white mb-2 text-center">Tool Configurations</h2>
                        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mt-10">
                            {toolConfigs.map((tool, i) => (
                                <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl">
                                    <h3 className="text-lg font-bold text-white flex gap-2 items-center mb-4">
                                        {tool.icon(tool.color)} {tool.name}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4">{tool.desc}</p>
                                    <pre className="bg-black/50 p-4 rounded text-xs text-cyan-300 font-mono overflow-x-auto border border-white/5">
                                        {tool.config.join('\\n')}
                                    </pre>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};
"""

# 3. Concatenate and Write
final_content = dashboard_components_only + "\n\n/* --- ORIGINAL DOCUMENTATION BLOCKS --- */\n" + orig_components + "\n\n" + main_app_shell + "\nexport default SOCLabProject;\n"

with open(out_fp, "w", encoding="utf-8") as f:
    f.write(final_content)
