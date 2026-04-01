import os

out_fp = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

content = """
/* ─────────────────────────────────────────────────────────────
   PAGE: WAF INSPECTOR
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
        setTimeout(() => setPipelineStage(1), 400);   
        setTimeout(() => setPipelineStage(2), 1000);  
        setTimeout(() => setPipelineStage(3), 1600);  
        setTimeout(() => setPipelineStage(4), 2000);  
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-170px)] animate-in fade-in duration-500">
            {/* Request Builder */}
            <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent" />
                <div className="p-4 border-b border-white/[0.05] bg-black/20 font-bold uppercase tracking-widest text-xs text-zinc-400">Request Forge</div>
                <div className="p-5 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
                    <div className="flex gap-2 text-xs">
                        {attacks.map(a => (
                            <button key={a.name} onClick={() => { setUrl(a.u); setBody(a.b); setMethod(a.m); setPipelineStage(0); }}
                                className="px-3 py-1.5 bg-black hover:bg-white/[0.02] text-zinc-300 rounded border border-white/[0.05] hover:border-cyan-500/50 transition-all font-mono">
                                {a.name}
                            </button>
                        ))}
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2"><Target size={12}/> Target URI</label>
                        <div className="flex gap-2">
                            <select value={method} onChange={e=>setMethod(e.target.value)} className="bg-black/50 border border-white/[0.05] rounded-lg px-2 text-sm font-mono text-zinc-300 outline-none w-24 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all">
                                <option>GET</option>
                                <option>POST</option>
                            </select>
                            <input value={url} onChange={e=>setUrl(e.target.value)} className="bg-black/50 border border-white/[0.05] rounded-lg px-3 py-2 text-sm text-zinc-300 font-mono flex-1 min-w-0 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-2"><FileText size={12}/> Headers</label>
                        <textarea readOnly value="Host: 192.168.20.110:443&#10;User-Agent: Mozilla/5.0 (Kali)&#10;Cookie: security=low; PHPSESSID=123" 
                            className="w-full h-24 bg-black/50 border border-white/[0.05] rounded-lg p-3 text-xs text-zinc-500 font-mono outline-none resize-none" />
                    </div>

                    {method === 'POST' && (
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">Body Payload</label>
                            <textarea value={body} onChange={e=>setBody(e.target.value)} 
                                className="w-full h-32 bg-black/50 border border-white/[0.05] rounded-lg p-3 text-xs text-green-400 font-mono outline-none resize-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all" />
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-white/[0.05] bg-black/40 backdrop-blur-xl">
                    <button onClick={handleSend} className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 font-bold py-2.5 rounded-lg transition-all text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <Terminal size={14}/> Execute Payload
                    </button>
                </div>
            </div>

            {/* Pipeline Center */}
            <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col items-center justify-center p-6 relative shadow-2xl overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)] pointer-events-none" />
                <h3 className="absolute top-4 left-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2"><Shield size={12}/> WAF Rules Engine</h3>
                
                <div className="w-full max-w-[260px] space-y-5 perspective-1000 mt-8 relative z-10">
                    {/* Stage 1 */}
                    <div className={`p-4 rounded-xl border transition-all duration-500 ${pipelineStage >= 1 ? 'bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-black/50 border-white/[0.05] text-zinc-600'}`}>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 flex items-center justify-between"><span>1. Ingress</span> {pipelineStage >= 1 && <Lock size={10} className="text-cyan-400"/>}</div>
                        <div className={`text-xs font-mono truncate ${pipelineStage >= 1 ? 'text-cyan-400' : 'text-zinc-600'}`}>{method} {url.split('.110:443')[1] || '/'}</div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 2 ? 'border-cyan-500' : 'border-white/[0.05]'}`} />
                    
                    {/* Stage 2 */}
                    <div className={`p-4 rounded-xl border transition-all duration-500 ${pipelineStage >= 2 ? 'bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'bg-black/50 border-white/[0.05] text-zinc-600'}`}>
                        <div className="text-[10px] font-bold uppercase tracking-widest mb-2">2. Semantic Analysis</div>
                        <div className="h-1 bg-black rounded-full overflow-hidden border border-white/[0.02]">
                            <motion.div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400" initial={{width: 0}} animate={{width: pipelineStage >= 2 ? '100%' : '0%'}} transition={{duration: 0.6}}/>
                        </div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 3 ? 'border-cyan-500' : 'border-white/[0.05]'}`} />

                    {/* Stage 3 */}
                    <div className={`p-4 rounded-xl border transition-all duration-500 ${pipelineStage >= 3 ? 'bg-red-950/20 border-red-500/50 shadow-[0_0_20px_rgba(248,113,113,0.1)]' : 'bg-black/50 border-white/[0.05] text-zinc-600'}`}>
                        <div className={`text-[10px] font-bold uppercase tracking-widest mb-1.5 ${pipelineStage >= 3 ? 'text-red-400' : 'text-zinc-600'}`}>3. Threat Match</div>
                        <div className={`text-xs font-mono break-words ${pipelineStage >= 3 ? 'text-red-300' : 'text-zinc-600'}`}>{url.includes('id=') ? "SQLi Signature 942100" : url.includes('script') ? "XSS Signature 941100" : "Malicious Payload Matched"}</div>
                    </div>
                    {/* Arrow */}
                    <div className={`h-6 border-l-2 mx-auto transition-colors duration-300 w-0 ${pipelineStage >= 4 ? 'border-red-500' : 'border-white/[0.05]'}`} />

                    {/* Stage 4 */}
                    <div className={`p-4 rounded-xl border text-center transition-all duration-300 ${pipelineStage >= 4 ? 'bg-red-500/10 border-red-500 text-red-500 scale-[1.02] font-bold shadow-[0_0_30px_rgba(248,113,113,0.2)] tracking-widest uppercase text-sm' : 'bg-black/50 border-white/[0.05] text-zinc-600 font-bold tracking-widest uppercase text-xs'}`}>
                        {pipelineStage >= 4 ? 'DROP (403 FORBIDDEN)' : 'VERDICT PENDING'}
                    </div>
                </div>
            </div>

            {/* WAF Log */}
            <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">
                 <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-500/20 to-transparent" />
                 <div className="p-4 border-b border-white/[0.05] bg-black/20 font-bold uppercase tracking-widest text-xs text-zinc-400">
                    Access Logs
                 </div>
                 <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                     <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold flex px-3 py-2 border-b border-white/[0.05] mb-2">
                         <div className="w-16">Status</div>
                         <div className="flex-1">URI Path</div>
                     </div>
                     {pipelineStage === 4 && (
                        <motion.div initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} className="flex items-center text-xs font-mono p-3 bg-red-500/5 hover:bg-red-500/10 rounded-lg cursor-pointer border border-transparent hover:border-red-500/30 transition-colors group">
                            <div className="w-16"><Badge variant="critical">403</Badge></div>
                            <div className="flex-1 truncate text-red-300 group-hover:text-red-200">{url.split('.110:443')[1]}</div>
                        </motion.div>
                     )}
                     <div className="flex items-center text-xs font-mono p-3 hover:bg-white/[0.02] rounded-lg cursor-pointer text-zinc-500 border border-transparent hover:border-white/[0.05] transition-colors">
                        <div className="w-16"><Badge variant="critical">403</Badge></div>
                        <div className="flex-1 truncate">/dvwa/vulnerabilities/exec/</div>
                     </div>
                     <div className="flex items-center text-xs font-mono p-3 hover:bg-white/[0.02] rounded-lg cursor-pointer text-zinc-500 border border-transparent hover:border-white/[0.05] transition-colors">
                        <div className="w-16"><Badge variant="success">200</Badge></div>
                        <div className="flex-1 truncate">/dvwa/login.php</div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: SIEM TABLE (Shared for Suricata & Wazuh)
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
        <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl flex flex-col h-[calc(100vh-170px)] overflow-hidden shadow-2xl relative animate-in fade-in duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            
            <div className="p-4 border-b border-white/[0.05] bg-black/20 flex justify-between items-center">
                <div className="relative">
                    <Crosshair size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="text" placeholder={`Query ${title} index...`} className="bg-black/50 border border-white/[0.05] rounded-lg pl-9 pr-4 py-2 text-sm w-80 text-zinc-300 font-mono outline-none focus:border-cyan-500 transition-colors focus:ring-1 focus:ring-cyan-500/30"/>
                </div>
                <div className="flex gap-3">
                    <Badge variant="critical">Critical</Badge>
                    <Badge variant="high">High</Badge>
                    <Badge variant="info">All Logs</Badge>
                </div>
            </div>
            <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-black/60 text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/[0.05] sticky top-0 backdrop-blur-md z-10">
                        <tr>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Timestamp</th>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Severity</th>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Rule/Signature</th>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Source</th>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Dest</th>
                            <th className="px-6 py-4 font-bold cursor-pointer hover:text-cyan-400 transition-colors">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                        {SiemTableData.map((row, i) => (
                            <tr key={i} className="hover:bg-white/[0.02] cursor-pointer group transition-colors text-zinc-300 font-mono text-xs">
                                <td className="px-6 py-4 text-zinc-500 group-hover:text-cyan-400 transition-colors">{row.time}</td>
                                <td className="px-6 py-4"><Badge variant={row.sev}>{row.sev}</Badge></td>
                                <td className="px-6 py-4 tracking-tight group-hover:text-white transition-colors">{row.rule}</td>
                                <td className="px-6 py-4 text-zinc-400">{row.src}</td>
                                <td className="px-6 py-4 text-zinc-400">{row.dst}</td>
                                <td className="px-6 py-4 text-zinc-500">{row.action}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-white/[0.05] bg-black/40 backdrop-blur-xl flex justify-between items-center text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                <span>Showing 1 to 5 of 1,247 events</span>
                <div className="flex gap-6 items-center">
                    <button className="hover:text-cyan-400 disabled:opacity-30 transition-colors" disabled>&lt; Prev</button>
                    <span className="text-zinc-400">Page 1 / 250</span>
                    <button className="hover:text-cyan-400 transition-colors">Next &gt;</button>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: ATTACK TIMELINE
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
        <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-10 max-w-4xl mx-auto shadow-2xl relative animate-in slide-in-from-bottom-8 duration-700">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="relative border-l border-white/[0.1] ml-8 space-y-10 py-4">
                {events.map((ev, i) => (
                    <motion.div key={i} initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: i*0.15}} className="relative pl-10">
                        <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full ring-4 ring-black shadow-[0_0_10px_rgba(255,255,255,0.1)] ${ev.glow ? ev.glow.replace('text','bg') : 'bg-zinc-500'}`}/>
                        <div className="flex items-start gap-6 cursor-pointer group">
                            <div className="w-20 pt-1 text-xs font-mono font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors">{ev.time}</div>
                            <div className="flex-1 bg-black/40 border border-white/[0.05] p-5 rounded-xl group-hover:border-white/[0.1] transition-all group-hover:bg-white/[0.02]">
                                <div className="flex items-center gap-3 mb-3">
                                    <Badge variant="info" className="bg-black border-white/[0.1] text-zinc-300">{ev.src}</Badge>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{ev.tool}</span>
                                </div>
                                <div className={`text-sm font-mono tracking-tight ${ev.glow || 'text-zinc-400'}`}>{ev.desc}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   PAGE: FIREWALL RULES
   ───────────────────────────────────────────────────────────── */
const FirewallPage = () => {
    return (
        <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl overflow-hidden shadow-2xl relative animate-in fade-in duration-500">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="flex border-b border-white/[0.05] bg-black/20 px-4 pt-4 gap-2">
                {['LAN', 'DMZ', 'TEST', 'WAN'].map((tab, i) => (
                    <button key={tab} className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all rounded-t-lg ${i===1 ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10 shadow-[inset_0_-2px_10px_rgba(34,211,238,0.1)]' : 'border-transparent text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'}`}>
                        {tab}_NET
                    </button>
                ))}
            </div>
            <div className="p-4">
                <table className="w-full text-left text-sm whitespace-nowrap bg-black/20 rounded-lg overflow-hidden border border-white/[0.02]">
                    <thead className="text-zinc-500 text-[10px] uppercase tracking-widest border-b border-white/[0.05]">
                        <tr><th className="px-6 py-4 font-bold">Action</th><th className="px-6 py-4 font-bold">Proto</th><th className="px-6 py-4 font-bold">Source</th><th className="px-6 py-4 font-bold">Destination</th><th className="px-6 py-4 font-bold">Port</th><th className="px-6 py-4 font-bold">Description</th></tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02] text-zinc-300 font-mono text-xs">
                        <tr className="hover:bg-white/[0.02] group transition-colors">
                            <td className="px-6 py-4 text-red-400 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> BLOCK</td><td className="px-6 py-4 text-zinc-500">ANY</td><td className="px-6 py-4">DMZ net</td><td className="px-6 py-4">LAN net</td><td className="px-6 py-4 text-zinc-500">*</td><td className="px-6 py-4 text-zinc-500 tracking-tight group-hover:text-zinc-400 transition-colors">Deny DMZ to LAN (Lateral Movement)</td>
                        </tr>
                        <tr className="hover:bg-white/[0.02] group transition-colors">
                            <td className="px-6 py-4 text-green-400 font-bold flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500" /> ALLOW</td><td className="px-6 py-4 text-zinc-500">TCP</td><td className="px-6 py-4">DMZ net</td><td className="px-6 py-4">LAN addr</td><td className="px-6 py-4 text-cyan-400 font-bold">1514</td><td className="px-6 py-4 text-zinc-500 tracking-tight group-hover:text-zinc-400 transition-colors">Allow Wazuh agent comms</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

"""
with open(out_fp, "a", encoding="utf-8") as f:
    f.write(content)
