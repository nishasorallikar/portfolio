"""
Replace the generic dashboard pages with realistic native-tool-style dashboards.
This script reads SOCLabProject.jsx and replaces the WAF, SIEM, Timeline, and Firewall
components with high-fidelity recreations of their real counterparts.
"""
import re

filepath = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# ── Replace from the WAF Inspector through to the end of FirewallPage ──
OLD_START = "/* ─────────────────────────────────────────────────────────────\n   PAGE: WAF INSPECTOR\n   ───────────────────────────────────────────────────────────── */"
OLD_END = """/* ─────────────────────────────────────────────────────────────
   DOC PAGE: EXECUTIVE SUMMARY
   ───────────────────────────────────────────────────────────── */"""

NEW_CONTENT = r'''/* ─────────────────────────────────────────────────────────────
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


''' + OLD_END

# Find and replace
start_idx = content.find(OLD_START)
end_idx = content.find(OLD_END)

if start_idx == -1 or end_idx == -1:
    print(f"ERROR: Could not find markers. start={start_idx}, end={end_idx}")
else:
    content = content[:start_idx] + NEW_CONTENT + content[end_idx + len(OLD_END):]
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print("SUCCESS: All dashboard pages replaced with native-tool-style designs.")
