import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale, Search, AlertTriangle, Eye, Check, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle, X, Database, Server, Mail, Copy
} from 'lucide-react';
import ProgressHexagon from '../../components/ProgressHexagon';

/* ──────────────────────────── DATA ──────────────────────────── */

const SECTION_NAMES = [
  '01-Log Mgmt Basics',
  '02-Windows/Linux/Mac',
  '03-Firewall & Router',
  '04-Web/DB/Email',
  '05-Centralized Logging',
];

const PILLAR_DATA = [
  { icon: Scale, title: 'Compliance', desc: 'Meet GDPR, HIPAA, PCI-DSS and ISO 27001 audit requirements through tamper-evident log retention and access controls.', chips: ['Audit Trail', 'Retention Policy'] },
  { icon: Search, title: 'Forensics', desc: 'Reconstruct attack timelines and establish chain of custody for post-incident investigation and legal proceedings.', chips: ['Timeline Reconstruction', 'Evidence Chain'] },
  { icon: AlertTriangle, title: 'Threat Detection', desc: 'Identify anomalies, malicious patterns and indicators of compromise in real time across all log sources.', chips: ['Anomaly Detection', 'IOC Matching'] },
  { icon: Eye, title: 'Operational Visibility', desc: 'Monitor system health, performance baselines and capacity trends to prevent outages and detect misconfigurations.', chips: ['Health Monitoring', 'Baseline Tracking'] },
];

const APPROACH_DATA = [
  { title: 'Agent-Based Collection', desc: 'A lightweight software agent is installed on each endpoint to collect and forward logs to a central aggregator. Provides deep visibility and real-time forwarding.', bullets: ['✓ Real-time log forwarding with buffering', '✓ Works even when network is congested', '✗ Agent maintenance and updates required'], tools: ['Filebeat', 'NXLog', 'Splunk UF', 'Fluentd'] },
  { title: 'Agentless Collection', desc: 'Logs are collected remotely using existing protocols (WMI, SSH, SNMP, Syslog) without installing software on source systems. Ideal for network devices.', bullets: ['✓ No software deployment required', '✓ Works well for network devices and legacy systems', '✗ Higher network overhead and potential log gaps'], tools: ['WMI', 'SSH Pull', 'SNMP Trap', 'Syslog UDP'] },
  { title: 'API-Based Collection', desc: 'Cloud services and SaaS applications expose logs via REST APIs. The SIEM or log aggregator polls the API on a schedule to retrieve log data.', bullets: ['✓ Native integration with cloud services', '✓ Structured JSON/XML log format', '✗ Polling latency and API rate limits'], tools: ['AWS CloudTrail API', 'Graph API', 'GCP Logging API', 'Okta API'] },
];

const WIN_LOCATIONS = [
  { name: 'Security Log', path: 'C:\\Windows\\System32\\winevt\\Logs\\Security.evtx' },
  { name: 'System Log', path: 'C:\\Windows\\System32\\winevt\\Logs\\System.evtx' },
  { name: 'Application Log', path: 'C:\\Windows\\System32\\winevt\\Logs\\Application.evtx' },
];
const WIN_IDS = [
  { id: '4624 Logon Success', color: 'text-cyan-400' },
  { id: '4625 Logon Failure', color: 'text-red-400' },
  { id: '4648 Explicit Logon', color: 'text-amber-400' },
  { id: '4720 Account Created', color: 'text-cyan-400' },
  { id: '4732 Added to Admin Group', color: 'text-red-400' },
  { id: '7045 New Service', color: 'text-amber-400' },
];
const LINUX_LOCATIONS = [
  { name: 'Auth/SSH Log', path: '/var/log/auth.log (Debian) | /var/log/secure (RHEL)' },
  { name: 'System Log', path: '/var/log/syslog (Debian) | /var/log/messages (RHEL)' },
  { name: 'Kernel Log', path: '/var/log/kern.log | dmesg' },
];
const LINUX_KW = [
  { t: 'Failed password', c: 'text-red-400' }, { t: 'Accepted publickey', c: 'text-cyan-400' },
  { t: 'sudo', c: 'text-amber-400' }, { t: 'segfault', c: 'text-red-400' },
  { t: 'OUT OF MEMORY', c: 'text-red-400' }, { t: 'authentication failure', c: 'text-red-400' },
];
const MAC_LOCATIONS = [
  { name: 'Unified Log', path: 'log show --predicate \'process == "sshd"\' --last 1h' },
  { name: 'System Log', path: '/var/log/system.log' },
  { name: 'Install Log', path: '/var/log/install.log' },
];
const MAC_KW = [
  { t: 'loginwindow', c: 'text-cyan-400' }, { t: 'com.apple.security', c: 'text-red-400' },
  { t: 'kernel', c: 'text-amber-400' }, { t: 'TCC violations', c: 'text-red-400' },
  { t: 'Authorization', c: 'text-cyan-400' }, { t: 'sandboxd', c: 'text-amber-400' },
];

const WIN_TERMINAL = `PS C:\\> Get-WinEvent -LogName Security -MaxEvents 5 | Format-List

TimeCreated  : 2026-03-29 03:14:22
Id           : 4625
Message      : An account failed to log on.
Account Name : Administrator
Logon Type   : 3 (Network)
Failure Code : 0xC000006A (Wrong Password)
Source IP    : 192.168.1.105
Port         : 52341

[ALERT] 47 failed logon attempts from 192.168.1.105 in 60 seconds
[ACTION] Possible brute force — escalate to L2 analyst
PS C:\\> _`;

const LINUX_TERMINAL = `$ tail -f /var/log/auth.log | grep -E 'Failed|Accepted|Invalid'

Mar 29 03:14:22 prod-server sshd[2391]: Failed password for invalid user
  admin from 10.0.0.47 port 52341 ssh2
Mar 29 03:14:25 prod-server sshd[2391]: Failed password for invalid user
  admin from 10.0.0.47 port 52342 ssh2
Mar 29 03:14:28 prod-server sshd[2391]: error: maximum authentication
  attempts exceeded for invalid user admin
Mar 29 03:14:28 prod-server sshd[2391]: Disconnecting: Too many auth failures

[ALERT] SSH brute force: 47 attempts from 10.0.0.47 in 60s
$ _`;

const MAC_TERMINAL = `$ log show --predicate 'eventMessage contains "denied"' --last 2h

2026-03-29 03:22:11.204 kernel: Sandbox: deny(1) file-read-data
  /etc/passwd for process: /tmp/malware.app
2026-03-29 03:22:14.887 loginwindow: Authentication failure for user rahul
  — incorrect password (attempt 3 of 5)
2026-03-29 03:22:19.001 com.apple.security: TCC violation attempt
  process: /tmp/malware.app requesting camera access [DENIED]
2026-03-29 03:22:31.445 socketfilterfw: Deny connection from
  185.220.101.47:4444 — not in allowed list

$ _`;

const FW_TERMINAL = `$ tail -f /var/log/firewall.log

2026-03-29T03:45:12 DENY  TCP  10.0.0.47:54231   → 203.0.113.50:443   [block-out-443]
2026-03-29T03:45:14 ALLOW TCP  192.168.1.10:62001 → 8.8.8.8:53         [allow-dns]
2026-03-29T03:45:18 DENY  UDP  10.0.0.99:137     → 255.255.255.255:137 [block-netbios]
2026-03-29T03:45:21 ALLOW TCP  192.168.1.25:50221 → 142.250.80.46:443  [allow-https]
2026-03-29T03:45:29 DENY  TCP  10.0.0.47:54298   → 203.0.113.50:8080  [block-out-8080]

[!] THRESHOLD ALERT: 10.0.0.47 triggered 47 DENY rules in 60 seconds
[!] Possible port scan or C2 beacon — auto-escalating to SIEM
$ _`;

const APACHE_TERMINAL = `$ tail -f /var/log/apache2/access.log

45.33.32.156 - - [29/Mar/2026:04:11:22] "GET /admin/config.php HTTP/1.1" 403 512 "-" "sqlmap/1.7.8"
45.33.32.156 - - [29/Mar/2026:04:11:31] "POST /login HTTP/1.1" 200 1024 "-" "sqlmap/1.7.8"
45.33.32.156 - - [29/Mar/2026:04:11:44] "GET /../../../etc/passwd HTTP/1.1" 400 256 "-" "Mozilla/5.0"
192.168.1.105 - admin [29/Mar/2026:04:12:01] "GET /wp-admin/ HTTP/1.1" 200 8192 "-" "WPScan v3.8.22"
10.0.0.47 - - [29/Mar/2026:04:12:15] "GET /shell.php?cmd=whoami HTTP/1.1" 200 12 "-" "curl/7.81"

$ _`;

const MYSQL_TERMINAL = `$ tail -f /var/log/mysql/general.log

2026-03-29T04:11:31 [Warning] Access denied for 'root'@'10.0.0.47'
2026-03-29T04:11:34 Query: SELECT * FROM users WHERE username='' OR 1=1 --
2026-03-29T04:11:38 Query: SELECT table_name FROM information_schema.tables
2026-03-29T04:11:42 Query: SELECT column_name FROM information_schema.columns
  WHERE table_name='users'
2026-03-29T04:11:47 Query: SELECT username,password FROM users LIMIT 10

[ALERT] SQLi pattern detected — information_schema enumeration in progress
$ _`;

const SMTP_TERMINAL = `$ tail -f /var/log/mail.log

2026-03-29T04:02:11 postfix/smtpd: NOQUEUE: reject: RCPT from unknown[185.220.101.47]
  relay access denied — not in permitted relay list
2026-03-29T04:02:15 postfix/smtpd: client=unknown[185.220.101.47]
  from=<ceo@c0mpany.com> to=<finance@company.com> [SPF: FAIL]
2026-03-29T04:02:22 clamav-milter: BLOCKED attachment invoice_Q1.pdf.exe
  Reason: Win.Trojan.Agent-1234 FOUND
2026-03-29T04:02:31 postfix: DMARC policy violation from paypa1.com
  action=reject

[ALERT] Spoofed CEO email with malware attachment blocked
$ _`;

const PLATFORM_DATA = [
  { platform: 'Syslog / rsyslog', type: 'Open-Source', bestFor: 'Simple centralized logging for Linux/Unix', cost: 'Free', feature: 'Lightweight, widely supported' },
  { platform: 'ELK Stack', type: 'Open-Source', bestFor: 'Large-scale log search and analytics', cost: 'Free/Paid', feature: 'Powerful full-text search with Kibana' },
  { platform: 'Splunk', type: 'Commercial', bestFor: 'Enterprise SOC and SIEM workloads', cost: '$$$$', feature: 'Machine learning, advanced correlation' },
  { platform: 'Graylog', type: 'Open-Source/Commercial', bestFor: 'Mid-size log management', cost: 'Free/Paid', feature: 'Stream-based routing and alerting' },
];

/* ──────────── HELPER COMPONENTS ──────────── */

const Typewriter = ({ text, interval = 70, className = 'text-cyan-400' }) => {
  const [displayed, setDisplayed] = useState('');
  const idx = useRef(0);
  useEffect(() => {
    idx.current = 0;
    setDisplayed('');
    const id = setInterval(() => {
      idx.current++;
      setDisplayed(text.slice(0, idx.current));
      if (idx.current >= text.length) clearInterval(id);
    }, interval);
    return () => clearInterval(id);
  }, [text, interval]);
  return <span className={className} style={{ whiteSpace: 'pre-wrap' }}>{displayed}<span className="animate-pulse">█</span></span>;
};

const Terminal = ({ label, text, interval = 70, height = 'h-52' }) => (
  <div className={`bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 mb-2 ${height}`}>
    <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-red-500" />
      <span className="w-3 h-3 rounded-full bg-yellow-500" />
      <span className="w-3 h-3 rounded-full bg-green-500" />
      <span className="text-zinc-500 text-xs font-mono ml-2">{label}</span>
    </div>
    <div className="relative p-4 font-mono text-xs overflow-hidden" style={{ height: 'calc(100% - 44px)' }}>
      <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
      <div className="relative z-20 overflow-y-auto h-full" style={{ scrollbarWidth: 'none' }}>
        <Typewriter text={text} interval={interval} />
      </div>
    </div>
  </div>
);

const CopyBtn = ({ text }) => {
  const [copied, setCopied] = useState(false);
  return (
    <span className="relative inline-flex items-center">
      <button onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="text-zinc-500 hover:text-cyan-400 transition-colors"><Copy size={12} /></button>
      <AnimatePresence>{copied && <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-800 text-cyan-400 text-[10px] px-2 py-0.5 rounded whitespace-nowrap">Copied!</motion.span>}</AnimatePresence>
    </span>
  );
};

const MarkCompleteBtn = ({ index, completedSections, onMark }) => {
  const done = completedSections.has(index);
  return (
    <div className="flex justify-end mt-6">
      <AnimatePresence mode="wait">
        {!done ? (
          <motion.button key="inc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onMark(index)} className="border border-cyan-400 text-cyan-400 text-xs px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-colors">Mark Complete</motion.button>
        ) : (
          <motion.button key="com" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-cyan-400 text-black text-xs px-4 py-2 rounded-lg flex items-center gap-2 cursor-default"><Check size={14} /> Completed</motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};



/* ──────────── BADGE OVERLAY ──────────── */
const BadgeOverlay = ({ show, onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="relative flex items-center justify-center">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div key={i} className="absolute w-2 h-2 rounded-full bg-cyan-400" style={{ top: '50%', left: '50%' }} initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(i * 30 * Math.PI / 180) * 120, y: Math.sin(i * 30 * Math.PI / 180) * 120, opacity: 0 }} transition={{ duration: 1, delay: i * (0.5 / 12), ease: 'easeOut' }} />
          ))}
          <motion.div className="bg-zinc-900 border border-cyan-400 rounded-2xl p-8 flex flex-col items-center relative" style={{ boxShadow: '0 0 40px rgba(34,211,238,0.3)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
            <button onClick={onClose} className="absolute top-3 right-3 text-zinc-600 hover:text-zinc-300"><X size={18} /></button>
            <Database className="text-cyan-400 mb-3" size={48} />
            <h2 className="text-3xl font-bold text-cyan-400 mb-1">Log Warden</h2>
            <p className="text-zinc-400 text-sm">Badge Earned</p>
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

/* ════════════════════════ MAIN COMPONENT ════════════════════════ */

export default function CSAModule03() {
  const [completedSections, setCompletedSections] = useState(() => new Set());
  const [showBadge, setShowBadge] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const [activeOSTab, setActiveOSTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [flippedAgent, setFlippedAgent] = useState(false);
  const [flippedAgentless, setFlippedAgentless] = useState(false);

  const markComplete = (idx) => {
    setCompletedSections(prev => { const n = new Set(prev); n.add(idx); return n; });
  };

  // Badge trigger
  useEffect(() => {
    if (completedSections.size === 5) {
      const badges = JSON.parse(localStorage.getItem('csa_badges') || '[]');
      if (!badges.includes('Log Warden')) { badges.push('Log Warden'); localStorage.setItem('csa_badges', JSON.stringify(badges)); }
      setShowBadge(true);
    }
  }, [completedSections.size]);

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-cyan-400/30 selection:text-cyan-400">

      {/* PROGRESS HEXAGON */}
      <ProgressHexagon current={completedSections.size} total={5} />

      {/* BADGE */}
      <BadgeOverlay show={showBadge} onClose={() => setShowBadge(false)} />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="mb-6 sm:mb-10 w-full px-4 sm:px-6 pt-8 sm:pt-12">
          <h3 className="text-sm text-cyan-400 font-mono mb-1">Module 03</h3>
          <h1 className="text-2xl sm:text-4xl font-bold text-zinc-100 tracking-tight leading-tight mb-2 max-w-4xl">Log Management</h1>
          <p className="text-zinc-500 text-sm sm:text-lg max-w-3xl">Master log lifecycle management, OS-level logging, network device analysis, and centralized SIEM architectures.</p>
        </div>

        {/* Horizontal Tab Bar */}
        <div className="flex flex-row overflow-x-auto pb-3 sm:pb-4 gap-1.5 sm:gap-2 border-b border-zinc-800 mb-8 sm:mb-12 w-full sticky top-[64px] sm:top-[80px] bg-black/80 backdrop-blur-md z-50 px-4 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SECTION_NAMES.map((name, idx) => {
            const isActive = activeTab === idx;
            const isCompleted = completedSections.has(idx);
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`shrink-0 relative px-3 sm:px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${isActive ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20' : 'text-zinc-400 bg-zinc-900 hover:text-zinc-200 hover:bg-zinc-800 border border-transparent'}`}
              >
                {isActive && (
                  <motion.div layoutId="m3ActiveTabUnderline" className="absolute inset-x-0 -bottom-[15px] sm:-bottom-[19px] h-[2px] bg-cyan-400" />
                )}
                <span>{name.slice(3)}</span>
                {isCompleted && <Check size={14} className={isActive ? "text-cyan-400" : "text-zinc-500"} />}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="min-h-[600px] w-full px-4 sm:px-6 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >

        {/* ═══════ TAB 1 ═══════ */}
        {activeTab === 0 && (
          <div>
          <motion.h2 className="text-2xl font-bold text-zinc-100 mb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} viewport={{ once: true }}>Log Management: Importance and Approaches</motion.h2>
          <p className="text-sm text-zinc-500 mb-6">The foundation of visibility, compliance and forensic investigation</p>

          {/* Lifecycle Pipeline SVG */}
          <div className="mb-6">
            <svg viewBox="0 0 750 130" width="100%" className="block">
              <defs><marker id="arrowCyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee" /></marker></defs>
              {['Generation', 'Collection', 'Normalization', 'Storage', 'Analysis', 'Archival', 'Disposal'].map((label, i) => {
                const x = 10 + i * 100;
                const sub = ['Create logs', 'Gather logs', 'Standardize', 'Store safely', 'Find threats', 'Long-term', 'Secure delete'][i];
                return (
                  <g key={i}>
                    <rect x={x} y={43} width={82} height={44} rx={8} fill="#18181b" stroke="#22d3ee" strokeWidth={1.5} />
                    <text x={x + 41} y={65} fontSize={9} fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle">{label}</text>
                    <text x={x + 41} y={100} fontSize={8} fill="#71717a" textAnchor="middle">{sub}</text>
                    {i < 6 && <motion.path d={`M${x + 82},65 L${x + 100},65`} stroke="#22d3ee" strokeWidth={1.5} markerEnd="url(#arrowCyan)" fill="none" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.4, delay: i * 0.15 }} viewport={{ once: true }} />}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Pillar Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {PILLAR_DATA.map((p, i) => (
              <motion.div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-cyan-400/50 transition-colors" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring', delay: i * 0.1 }} viewport={{ once: true }}>
                <div className="flex items-center gap-3 mb-3"><p.icon className="text-cyan-400" size={20} /><span className="text-sm font-semibold text-zinc-100">{p.title}</span></div>
                <p className="text-xs text-zinc-400 leading-relaxed mb-3">{p.desc}</p>
                <div>{p.chips.map((c, ci) => <span key={ci} className="bg-zinc-800 text-zinc-300 text-xs rounded-full px-2 py-1 mr-1">{c}</span>)}</div>
              </motion.div>
            ))}
          </div>

          {/* Approaches */}
          <h3 className="text-base font-semibold text-zinc-100 mb-3">Log Collection Approaches</h3>
          <div className="flex gap-3 mb-3">
            {['Agent-Based', 'Agentless', 'API-Based'].map((lbl, i) => (
              <button key={i} onClick={() => setActiveApproach(i)} className={`rounded-lg px-4 py-2 text-sm transition-colors ${activeApproach === i ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400' : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{lbl}</button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeApproach} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
              <h4 className="text-cyan-400 font-semibold mb-2">{APPROACH_DATA[activeApproach].title}</h4>
              <p className="text-sm text-zinc-300 mb-3">{APPROACH_DATA[activeApproach].desc}</p>
              {APPROACH_DATA[activeApproach].bullets.map((b, bi) => <p key={bi} className="text-xs text-zinc-400 mb-1">{b}</p>)}
              <div className="flex flex-wrap gap-1 mt-3">{APPROACH_DATA[activeApproach].tools.map((t, ti) => <span key={ti} className="bg-zinc-800 text-zinc-300 text-xs rounded-full px-2 py-1">{t}</span>)}</div>
            </motion.div>
          </AnimatePresence>
          <MarkCompleteBtn index={0} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 2 ═══════ */}
        {activeTab === 1 && (
          <div>
          <motion.h2 className="text-2xl font-bold text-zinc-100 mb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} viewport={{ once: true }}>Local Logging Practices: Windows, Linux, and Mac</motion.h2>
          <p className="text-sm text-zinc-500 mb-6">OS-specific log locations, formats and critical event IDs</p>

          <div className="flex gap-2 mb-4">
            {['Windows', 'Linux', 'macOS'].map((lbl, i) => (
              <button key={i} onClick={() => setActiveOSTab(i)} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${activeOSTab === i ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400' : 'bg-zinc-900 border border-zinc-700 text-zinc-400 hover:border-zinc-500'}`}>{lbl}</button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeOSTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.22 }}>
              {activeOSTab === 0 && (
                <div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">Primary Log Locations</h4>
                    {WIN_LOCATIONS.map((l, i) => (
                      <div key={i} className={`flex justify-between items-center py-2 ${i < WIN_LOCATIONS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                        <span className="text-zinc-300 text-xs">{l.name}</span>
                        <span className="flex items-center gap-2"><code className="font-mono text-xs text-zinc-300">{l.path}</code><CopyBtn text={l.path} /></span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">{WIN_IDS.map((w, i) => <span key={i} className={`bg-zinc-800 text-xs rounded px-2 py-1 ${w.color}`}>{w.id}</span>)}</div>
                  <Terminal label="windows-event-log — PowerShell" text={WIN_TERMINAL} interval={70} />
                </div>
              )}
              {activeOSTab === 1 && (
                <div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">Primary Log Locations</h4>
                    {LINUX_LOCATIONS.map((l, i) => (
                      <div key={i} className={`flex justify-between items-center py-2 ${i < LINUX_LOCATIONS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                        <span className="text-zinc-300 text-xs">{l.name}</span>
                        <span className="flex items-center gap-2"><code className="font-mono text-xs text-zinc-300">{l.path}</code><CopyBtn text={l.path} /></span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">{LINUX_KW.map((w, i) => <span key={i} className={`bg-zinc-800 text-xs rounded px-2 py-1 ${w.c}`}>{w.t}</span>)}</div>
                  <Terminal label="linux-syslog — bash" text={LINUX_TERMINAL} interval={70} />
                </div>
              )}
              {activeOSTab === 2 && (
                <div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-3">Primary Log Locations</h4>
                    {MAC_LOCATIONS.map((l, i) => (
                      <div key={i} className={`flex justify-between items-center py-2 ${i < MAC_LOCATIONS.length - 1 ? 'border-b border-zinc-800' : ''}`}>
                        <span className="text-zinc-300 text-xs">{l.name}</span>
                        <span className="flex items-center gap-2"><code className="font-mono text-xs text-zinc-300">{l.path}</code><CopyBtn text={l.path} /></span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">{MAC_KW.map((w, i) => <span key={i} className={`bg-zinc-800 text-xs rounded px-2 py-1 ${w.c}`}>{w.t}</span>)}</div>
                  <Terminal label="macos-unified-log — zsh" text={MAC_TERMINAL} interval={70} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <MarkCompleteBtn index={1} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 3 ═══════ */}
        {activeTab === 2 && (
          <div>
          <motion.h2 className="text-2xl font-bold text-zinc-100 mb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} viewport={{ once: true }}>Local Logging Practices: Firewall and Router Logs</motion.h2>
          <p className="text-sm text-zinc-500 mb-6">Network perimeter log analysis and field anatomy</p>

          {/* Log Anatomy SVG */}
          <div className="mb-6">
            <svg viewBox="0 0 750 200" width="100%" className="block">
              {/* Segments */}
              {[
                { x: 30, w: 110, fill: '#1a2e1a', label: '2026-03-29', color: '#22d3ee', ann: 'Timestamp', above: true },
                { x: 140, w: 95, fill: '#1a1a2e', label: '10.0.0.47', color: '#a78bfa', ann: 'Source IP', above: false },
                { x: 235, w: 95, fill: '#1a1a2e', label: '203.0.113.50', color: '#a78bfa', ann: 'Destination IP', above: true },
                { x: 330, w: 50, fill: '#2e1a1a', label: 'TCP', color: '#f87171', ann: 'Protocol', above: false },
                { x: 380, w: 55, fill: '#1a2e1a', label: '54231', color: '#22d3ee', ann: 'Src Port', above: true },
                { x: 435, w: 55, fill: '#1a2e1a', label: '443', color: '#22d3ee', ann: 'Dst Port', above: false },
                { x: 490, w: 60, fill: '#2e1a1a', label: 'DENY', color: '#f87171', ann: 'Action', above: true },
                { x: 550, w: 65, fill: '#1a1a2e', label: 'eth0', color: '#a78bfa', ann: 'Interface', above: false },
                { x: 615, w: 105, fill: '#2e2e1a', label: 'block-out-443', color: '#fbbf24', ann: 'Rule Name', above: true },
              ].map((seg, i) => {
                const cx = seg.x + seg.w / 2;
                const annY = seg.above ? 30 : 170;
                const lineY1 = seg.above ? 70 : 106;
                const lineY2 = seg.above ? 45 : 155;
                return (
                  <g key={i}>
                    <rect x={seg.x} y={70} width={seg.w} height={36} fill={seg.fill} />
                    <text x={cx} y={88} fontSize={8} fill={seg.color} textAnchor="middle" dominantBaseline="middle" fontFamily="monospace" fontWeight={seg.label === 'DENY' ? 'bold' : 'normal'}>{seg.label}</text>
                    <motion.line x1={cx} y1={lineY1} x2={cx} y2={lineY2} stroke="#22d3ee" strokeWidth={1} strokeDasharray="2 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.3, delay: i * 0.1 }} viewport={{ once: true }} />
                    <rect x={cx - 35} y={annY - 8} width={70} height={16} rx={3} fill="#18181b" stroke="#27272a" strokeWidth={0.5} />
                    <text x={cx} y={annY} fontSize={8} fill="#a1a1aa" textAnchor="middle" dominantBaseline="middle">{seg.ann}</text>
                  </g>
                );
              })}
              <rect x={30} y={70} width={690} height={36} rx={4} fill="none" stroke="#27272a" strokeWidth={1} />
            </svg>
          </div>

          <Terminal label="firewall-log-stream — bash" text={FW_TERMINAL} interval={75} />

          {/* Packet Flow SVG */}
          <div className="mt-4 mb-4">
            <svg viewBox="0 0 680 90" width="100%" className="block">
              {['Packet Arrives', 'Rule Lookup', 'Match Found', 'Action Applied', 'Log Entry Created'].map((label, i) => {
                const x = 10 + i * 130;
                const sub = ['Ingress/Egress', 'ACL / FW Rules', 'ALLOW or DENY', 'Forward / Drop', 'Syslog / CEF'][i];
                return (
                  <g key={i}>
                    <rect x={x} y={27} width={105} height={36} rx={6} fill="#18181b" stroke="#22d3ee" strokeWidth={1} />
                    <text x={x + 52.5} y={45} fontSize={8} fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle">{label}</text>
                    <text x={x + 52.5} y={76} fontSize={7} fill="#71717a" textAnchor="middle">{sub}</text>
                    {i < 4 && <motion.path d={`M${x + 105},45 L${x + 130},45`} stroke="#22d3ee" strokeWidth={1.5} fill="none" markerEnd="url(#arrowCyan)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.3, delay: i * 0.2 }} viewport={{ once: true }} />}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Suspicious Pattern Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {['High DENY rate from single IP', 'Outbound on unusual port', 'ALLOW to known malicious IP', 'Protocol mismatch on standard port', 'Blocked NetBIOS broadcast storm'].map((t, i) => (
              <span key={i} className="flex items-center gap-1 bg-red-400/10 text-red-400 border border-red-400/20 text-xs rounded-full px-3 py-1"><AlertTriangle size={10} />{t}</span>
            ))}
          </div>
          <MarkCompleteBtn index={2} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 4 ═══════ */}
        {activeTab === 3 && (
          <div>
          <motion.h2 className="text-2xl font-bold text-zinc-100 mb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} viewport={{ once: true }}>Local Logging Practices: Web Server, Database, and Email</motion.h2>
          <p className="text-sm text-zinc-500 mb-6">Application-layer logs and suspicious pattern identification</p>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
            {/* Accordion 1: Web Server */}
            {[
              { icon: Server, title: 'Apache / Nginx Access Logs', cat: 'Web Server', idx: 0 },
              { icon: Database, title: 'MySQL / MSSQL Query Logs', cat: 'Database', idx: 1 },
              { icon: Mail, title: 'SMTP / Exchange Mail Logs', cat: 'Email', idx: 2 },
            ].map(({ icon: Icon, title, cat, idx }) => (
              <div key={idx}>
                <div onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)} className="flex justify-between items-center px-5 py-4 cursor-pointer hover:bg-zinc-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <Icon className="text-cyan-400" size={18} />
                    <span className="text-sm font-semibold text-zinc-100">{title}</span>
                    <span className="bg-cyan-400/10 text-cyan-400 text-xs rounded-full px-2 py-0.5">{cat}</span>
                  </div>
                  <motion.div animate={{ rotate: openAccordion === idx ? 180 : 0 }} transition={{ type: 'spring' }}><ChevronDown className="text-zinc-500" size={16} /></motion.div>
                </div>
                <AnimatePresence>
                  {openAccordion === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15 }} className="overflow-hidden">
                      <div className="px-5 pb-5">
                        {idx === 0 && (
                          <>
                            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 mb-3 font-mono text-xs text-zinc-400">
                              {'%h %l %u %t "%r" %>s %b "%{Referer}i" "%{User-Agent}i"'}
                              <div className="flex flex-wrap gap-2 mt-2">{['RemoteIP', 'Ident', 'User', 'Time', 'Request', 'Status', 'Bytes', 'Referer', 'UserAgent'].map((f, fi) => <span key={fi} className="text-xs text-zinc-600">{f}</span>)}</div>
                            </div>
                            <Terminal label="apache-access-log" text={APACHE_TERMINAL} interval={65} height="h-44" />
                            <div className="flex flex-wrap gap-2 mt-3">{['sqlmap User-Agent', '403 on admin path', 'Path traversal ../../../', 'WPScan enumeration', 'Webshell execution ?cmd='].map((t, i) => <span key={i} className="flex items-center gap-1 bg-red-400/10 text-red-400 border border-red-400/20 text-xs rounded-full px-2 py-1"><AlertTriangle size={10} />{t}</span>)}</div>
                          </>
                        )}
                        {idx === 1 && (
                          <>
                            <div className="bg-zinc-950 rounded-lg p-3 mb-3 font-mono text-xs text-zinc-500">{"# Enable MySQL general query log:\nSET GLOBAL general_log = 'ON';\nSET GLOBAL general_log_file='/var/log/mysql/general.log';"}</div>
                            <Terminal label="mysql-query-log" text={MYSQL_TERMINAL} interval={65} height="h-44" />
                            <div className="flex flex-wrap gap-2 mt-3">{['Root login attempt from remote IP', 'OR 1=1 SQLi pattern', 'information_schema enumeration', 'Credential table dump', 'LIMIT-based data extraction'].map((t, i) => <span key={i} className="flex items-center gap-1 bg-red-400/10 text-red-400 border border-red-400/20 text-xs rounded-full px-2 py-1"><AlertTriangle size={10} />{t}</span>)}</div>
                          </>
                        )}
                        {idx === 2 && (
                          <>
                            <Terminal label="smtp-mail-log" text={SMTP_TERMINAL} interval={65} height="h-44" />
                            <div className="flex flex-wrap gap-2 mt-3">{['Open relay attempt', 'Spoofed sender domain', 'SPF/DMARC fail', 'Malware attachment blocked', 'CEO impersonation BEC'].map((t, i) => <span key={i} className="flex items-center gap-1 bg-red-400/10 text-red-400 border border-red-400/20 text-xs rounded-full px-2 py-1"><AlertTriangle size={10} />{t}</span>)}</div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          <MarkCompleteBtn index={3} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 5 ═══════ */}
        {activeTab === 4 && (
          <div>
          <motion.h2 className="text-2xl font-bold text-zinc-100 mb-2" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} viewport={{ once: true }}>Centralized Logging</motion.h2>
          <p className="text-sm text-zinc-500 mb-6">Aggregating all log sources into a unified, searchable platform</p>

          {/* Architecture SVG */}
          <div className="mb-6">
            <svg viewBox="0 0 760 200" width="100%" className="block">
              <defs><marker id="arrowCyanS5" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee" /></marker><marker id="arrowViolet" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#a78bfa" /></marker></defs>
              {/* Sources */}
              {[{ x: 10, l: 'Endpoints' }, { x: 100, l: 'Servers' }, { x: 190, l: 'Network Devices' }].map((s, i) => (
                <g key={i}><rect x={s.x} y={10} width={80} height={32} rx={6} fill="#18181b" stroke="#27272a" /><text x={s.x + 40} y={26} fontSize={8} fill="#a1a1aa" textAnchor="middle" dominantBaseline="middle">{s.l}</text></g>
              ))}
              {/* Agent */}
              <rect x={80} y={80} width={120} height={36} rx={6} fill="#18181b" stroke="#22d3ee" strokeWidth={1} />
              <text x={140} y={93} fontSize={9} fill="#22d3ee" textAnchor="middle">Log Agents</text>
              <text x={140} y={106} fontSize={7} fill="#71717a" textAnchor="middle">Filebeat / NXLog</text>
              {/* Aggregator */}
              <rect x={260} y={80} width={130} height={36} rx={6} fill="#18181b" stroke="#22d3ee" strokeWidth={1} />
              <text x={325} y={93} fontSize={9} fill="#22d3ee" textAnchor="middle">Aggregator</text>
              <text x={325} y={106} fontSize={7} fill="#71717a" textAnchor="middle">Logstash / Fluentd</text>
              {/* SIEM */}
              <rect x={450} y={68} width={150} height={60} rx={8} fill="#1a0d2e" stroke="#a78bfa" strokeWidth={2} style={{ filter: 'drop-shadow(0 0 8px rgba(167,139,250,0.4))' }} />
              <text x={525} y={93} fontSize={11} fill="#a78bfa" textAnchor="middle" fontWeight="bold">SIEM / Storage</text>
              <text x={525} y={110} fontSize={7} fill="#71717a" textAnchor="middle">Splunk · Sentinel · Elastic</text>
              {/* Dashboard */}
              <rect x={660} y={80} width={90} height={36} rx={6} fill="#18181b" stroke="#a78bfa" strokeWidth={1} />
              <text x={705} y={93} fontSize={9} fill="#a78bfa" textAnchor="middle">Dashboard</text>
              <text x={705} y={106} fontSize={7} fill="#71717a" textAnchor="middle">Alerts / Reports</text>
              {/* Arrows */}
              {[{ d: 'M140,42 L140,80', s: '#22d3ee', mk: 'arrowCyanS5', dl: 0 }, { d: 'M200,98 L260,98', s: '#22d3ee', mk: 'arrowCyanS5', dl: 0.2 }, { d: 'M390,98 L450,98', s: '#22d3ee', mk: 'arrowCyanS5', dl: 0.4 }, { d: 'M600,98 L660,98', s: '#a78bfa', mk: 'arrowViolet', dl: 0.6 }].map((a, i) => (
                <motion.path key={i} d={a.d} stroke={a.s} strokeWidth={1.5} fill="none" markerEnd={`url(#${a.mk})`} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.4, delay: a.dl }} viewport={{ once: true }} />
              ))}
            </svg>
          </div>

          {/* Comparison Table */}
          <h3 className="text-base font-semibold text-zinc-100 mb-3 mt-6">Platform Comparison</h3>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="bg-zinc-800 text-xs text-zinc-400 uppercase font-semibold px-4 py-3 grid grid-cols-5">
              <span>Platform</span><span>Type</span><span>Best For</span><span>Cost</span><span>Key Feature</span>
            </div>
            {PLATFORM_DATA.map((row, i) => (
              <motion.div key={i} className="px-4 py-3 border-b border-zinc-800 text-sm text-zinc-300 grid grid-cols-5 items-center hover:bg-zinc-800 transition-colors" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <span className="text-cyan-400 font-medium">{row.platform}</span>
                <span><span className="bg-zinc-800 text-zinc-400 text-xs rounded px-2 py-0.5">{row.type}</span></span>
                <span className="text-xs">{row.bestFor}</span>
                <span><span className={`text-xs rounded-full px-2 py-0.5 ${row.cost === 'Free' ? 'bg-green-400/10 text-green-400' : row.cost === '$$$$' ? 'bg-red-400/10 text-red-400' : 'bg-amber-400/10 text-amber-400'}`}>{row.cost}</span></span>
                <span className="text-xs">{row.feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Flip Cards */}
          <h3 className="text-base font-semibold text-zinc-100 mb-3 mt-6">Deployment Approach</h3>
          <div className="flex gap-4">
            {[
              { title: 'Agent-Based', flipped: flippedAgent, setFlip: setFlippedAgent, bullets: ['Real-time forwarding with local buffering', 'Works during network interruption', 'Requires agent deployment and updates', 'Best for endpoints and servers'] },
              { title: 'Agentless', flipped: flippedAgentless, setFlip: setFlippedAgentless, bullets: ['No software installation required', 'Relies on Syslog/WMI/SSH/SNMP', 'May miss some log types', 'Best for network devices and legacy systems'] },
            ].map((card, ci) => (
              <div key={ci} className="relative w-1/2 cursor-pointer" style={{ height: 180, perspective: 1000 }} onClick={() => card.setFlip(p => !p)}>
                <motion.div style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }} animate={{ rotateY: card.flipped ? 180 : 0 }} transition={{ type: 'spring', stiffness: 80, damping: 15 }}>
                  <div className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
                    <Server className="text-violet-400 mb-2" size={28} />
                    <span className="text-sm font-semibold text-zinc-100">{card.title}</span>
                    <span className="text-xs text-zinc-600 mt-1">Click to compare</span>
                  </div>
                  <div className="absolute inset-0 bg-zinc-800 border border-violet-400/40 rounded-xl p-4" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                    <h4 className="text-xs font-semibold text-violet-400 mb-2">{card.title}</h4>
                    {card.bullets.map((b, bi) => <p key={bi} className="text-xs text-zinc-400 mb-1">• {b}</p>)}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Benefit Chips */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['Single Pane of Glass', 'Cross-Source Correlation', 'Tamper-Evident Storage', 'Automated Compliance Reporting'].map((t, i) => (
              <span key={i} className="bg-violet-400/10 text-violet-400 border border-violet-400/20 text-xs rounded-full px-3 py-1.5 flex items-center gap-1"><CheckCircle size={11} />{t}</span>
            ))}
          </div>
          <MarkCompleteBtn index={4} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
