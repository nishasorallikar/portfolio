"""
Replace the thin Library Context doc pages with comprehensive documentation
that includes native SVG tool icons and all the original content.
"""

filepath = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# ── Replace all 4 doc pages (ExecutiveDoc through FindingsDoc) ──
OLD_START = """/* ─────────────────────────────────────────────────────────────
   DOC PAGE: EXECUTIVE SUMMARY
   ───────────────────────────────────────────────────────────── */"""

OLD_END = """/* ─────────────────────────────────────────────────────────────
   PAGE: BOOT SEQUENCE & SHELL (PREMIUM SIDEBAR)
   ───────────────────────────────────────────────────────────── */"""

NEW_PAGES = r'''/* ─────────────────────────────────────────────────────────────
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

''' + OLD_END

start_idx = content.find(OLD_START)
end_idx = content.find(OLD_END)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: Could not find markers. start={start_idx}, end={end_idx}")
else:
    content = content[:start_idx] + NEW_PAGES + content[end_idx + len(OLD_END):]
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("SUCCESS: All Library Context doc pages replaced with comprehensive docs + native tool icons.")
