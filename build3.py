import os

out_fp = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

content = """
/* ─────────────────────────────────────────────────────────────
   DOC PAGE: EXECUTIVE SUMMARY
   ───────────────────────────────────────────────────────────── */
const ExecutiveDoc = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
            <div className="bg-gradient-to-br from-cyan-900/20 to-black border border-white/[0.05] rounded-2xl p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <Badge variant="info" className="w-fit mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-xs tracking-widest px-3 py-1">Mission Briefing</Badge>
                <h1 className="text-4xl sm:text-5xl font-light text-white mb-6 tracking-tight">Full-Stack Security Operations Center Laboratory</h1>
                <p className="text-lg text-zinc-400 max-w-3xl leading-relaxed font-light">
                    An enterprise-grade, virtualized security laboratory designed to simulate advanced persistent threats (APTs) 
                    and validate defensive capabilities using industry-standard open-source tools.
                </p>
                <div className="flex flex-wrap gap-4 mt-8">
                    {['PfSense Firewall', 'Wazuh SIEM', 'Suricata NIDS', 'SafeLine WAF', 'Kali Linux'].map(t => (
                        <div key={t} className="px-4 py-2 bg-black/50 border border-white/[0.1] rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-300 backdrop-blur-md">{t}</div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    {tle: 'Attack Simulation', desc: 'Simulated real-world attacks including brute-force, web exploits, and lateral movement attempts.'},
                    {tle: 'Defensive Infrastructure', desc: 'Deployed multi-layered defenses with firewalls, WAFs, and intrusion detection systems.'},
                    {tle: 'SIEM Correlation', desc: 'Centralized log analysis and alert generation using Wazuh SIEM for rapid incident response.'}
                ].map((o, i) => (
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-6 relative group overflow-hidden">
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-xl font-bold text-white mb-3">{o.tle}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{o.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: ARCHITECTURE & DEFENSE
   ───────────────────────────────────────────────────────────── */
const ArchitectureDoc = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
            <h2 className="text-2xl font-light text-white tracking-tight flex items-center gap-3"><Network className="text-cyan-400"/> Architecture & Defense</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-8 relative overflow-hidden shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Network Segmentation</h3>
                    <ul className="space-y-4 font-mono text-sm">
                        <li className="flex items-center gap-4 text-red-300"><Badge variant="critical">TEST</Badge> 192.168.30.0/24 (Attacker)</li>
                        <li className="flex items-center gap-4 text-orange-300"><Badge variant="high">DMZ</Badge> 192.168.20.0/24 (Public Facing apps)</li>
                        <li className="flex items-center gap-4 text-cyan-300"><Badge variant="info">LAN</Badge> 192.168.10.0/24 (Internal endpoints)</li>
                    </ul>
                </div>
                <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-8 relative overflow-hidden shadow-2xl">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Detection Pipeline</h3>
                    <div className="space-y-6 relative border-l border-white/[0.1] ml-4 pt-2">
                        {[
                            { step: 'Edge Protection', desc: 'pfSense Firewall blocks unauthorized inbound traffic.' },
                            { step: 'App Layer', desc: 'SafeLine WAF inspects HTTP/S traffic for OWASP top 10.' },
                            { step: 'Network IDS', desc: 'Suricata monitors mirrored traffic for known malicious signatures.' },
                            { step: 'SIEM Aggregation', desc: 'Wazuh Manager correlates endpoint logs and network alerts.' }
                        ].map((s, i) => (
                            <div key={i} className="pl-6 relative">
                                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                                <div className="font-bold text-zinc-200 mb-1 tracking-tight">{s.step}</div>
                                <div className="text-xs text-zinc-500 leading-relaxed max-w-sm">{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: ATTACK OPERATIONS
   ───────────────────────────────────────────────────────────── */
const AttackDoc = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
            <h2 className="text-2xl font-light text-white tracking-tight flex items-center gap-3"><Terminal className="text-red-400"/> Execution Playbook</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[
                    { phase: 'Reconnaissance', desc: 'Nmap OS & Service Discovery', tool: 'Nmap', detail: '-sV -O -p- 192.168.20.110', result: 'Identified exposed ports 80/443 (HTTP/S).' },
                    { phase: 'Web Exploitation', desc: 'Brute force & Injection', tool: 'THC-Hydra / Burp', detail: 'hydra -l admin -P rockyou.txt ssh://192.168.20.110', result: 'Blocked by perimeter WAF/Suricata.' },
                    { phase: 'Lateral Movement', desc: 'Pivoting from DMZ to LAN', tool: 'Metasploit', detail: 'run autoroute -s 192.168.10.0/24', result: 'Denied by pfSense DMZ>LAN strict firewall rules.' },
                ].map((a, i) => (
                    <div key={i} className={`bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-8 shadow-2xl transition-all hover:bg-white/[0.02] ${i === 2 ? 'lg:col-span-2' : ''}`}>
                        <Badge variant="critical" className="mb-4 bg-red-500/10 border-red-500/30 text-red-500">Phase {i+1}</Badge>
                        <h3 className="text-xl font-bold text-white mb-2">{a.phase}</h3>
                        <div className="text-sm text-zinc-400 mb-6">{a.desc}</div>
                        <div className="bg-black/60 border border-white/[0.05] rounded-lg p-4 font-mono text-xs text-zinc-300 mb-4">
                            <span className="text-red-400">{a.tool} &gt;</span> {a.detail}
                        </div>
                        <div className="text-sm font-bold text-green-400 flex items-center gap-2">
                            <Shield size={16} /> {a.result}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────────
   DOC PAGE: FINDINGS & ROI
   ───────────────────────────────────────────────────────────── */
const FindingsDoc = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-5xl mx-auto py-8">
             <h2 className="text-2xl font-light text-white tracking-tight flex items-center gap-3"><FileText className="text-cyan-400"/> Results & Key Findings</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { val: '100%', lbl: 'Network Separation' },
                    { val: 'Zero', lbl: 'Successful PrivEsc' },
                    { val: '<1s', lbl: 'Alert Latency' },
                    { val: '5+', lbl: 'Tools Integrated' }
                ].map((s, i) => (
                    <div key={i} className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-6 text-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
                        <div className="text-4xl font-light font-mono text-cyan-400 mb-2 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">{s.val}</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{s.lbl}</div>
                    </div>
                ))}
            </div>
            
            <div className="bg-black/40 backdrop-blur-md border border-white/[0.05] rounded-xl p-10 shadow-2xl relative">
                <div className="absolute left-0 inset-y-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent" />
                <h3 className="text-lg font-bold text-white mb-6 tracking-tight">Project Conclusion</h3>
                <div className="space-y-6 text-sm text-zinc-400 leading-relaxed font-light">
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
"""
with open(out_fp, "a", encoding="utf-8") as f:
    f.write(content)
