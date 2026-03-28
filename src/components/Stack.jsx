import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.12) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setInView(true); return; }
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.unobserve(el); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, inView];
}

/* ─────────────────────────────────────────────────────────
   TOOL ICONS — Small 14×14 native SVGs for every tool
   ───────────────────────────────────────────────────────── */
const T = (d, color) => (
    <svg viewBox="0 0 14 14" width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
        {d}
    </svg>
);

const toolIcons = {
    /* ── SIEM ── */
    'Splunk': (c) => T(<><rect x="1" y="3" width="12" height="8" rx="1.5" stroke={c} strokeWidth="1.2"/><path d="M4 6h2M4 8h4" stroke={c} strokeWidth="1" strokeLinecap="round"/><circle cx="10.5" cy="7" r="1" fill={c}/></>, c),
    'Wazuh': (c) => T(<><path d="M7 1L2 4v4c0 3.3 2.2 5.5 5 6 2.8-.5 5-2.7 5-6V4L7 1z" stroke={c} strokeWidth="1.2"/><path d="M5 7l2 2 3-4" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></>, c),
    'ELK Stack': (c) => T(<><rect x="1" y="1" width="5" height="5" rx="1" stroke={c} strokeWidth="1"/><rect x="8" y="1" width="5" height="5" rx="1" stroke={c} strokeWidth="1"/><rect x="4.5" y="8" width="5" height="5" rx="1" stroke={c} strokeWidth="1"/><path d="M3.5 6v2.5H5M10.5 6v2.5H9" stroke={c} strokeWidth="0.8"/></>, c),

    /* ── Log Analysis ── */
    'Windows Event Logs': (c) => T(<><rect x="2" y="2" width="10" height="10" rx="1" stroke={c} strokeWidth="1.2"/><path d="M6 5L4 7l2 2" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 5l2 2-2 2" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></>, c),
    'Linux Syslogs': (c) => T(<><circle cx="7" cy="5.5" r="3.5" stroke={c} strokeWidth="1.2"/><path d="M5.5 5a.8.8 0 011.6 0M7 7v.5" stroke={c} strokeWidth="1" strokeLinecap="round"/><path d="M4 10c.5 1.5 2 2.5 3 2.5s2.5-1 3-2.5" stroke={c} strokeWidth="1" strokeLinecap="round"/></>, c),
    'Network Device Logs': (c) => T(<><rect x="2" y="3" width="10" height="3" rx="1" stroke={c} strokeWidth="1"/><rect x="2" y="8" width="10" height="3" rx="1" stroke={c} strokeWidth="1"/><circle cx="10" cy="4.5" r="0.6" fill={c}/><circle cx="10" cy="9.5" r="0.6" fill={c}/></>, c),
    'App Audit Trails': (c) => T(<><path d="M3 2h8l-1 10H4L3 2z" stroke={c} strokeWidth="1.2" strokeLinejoin="round"/><path d="M5 5h4M5 7h3" stroke={c} strokeWidth="0.8" strokeLinecap="round"/></>, c),

    /* ── Networking ── */
    'TCP/IP': (c) => T(<><path d="M2 4h10M2 7h10M2 10h10" stroke={c} strokeWidth="1" strokeLinecap="round"/><circle cx="4" cy="4" r="1" fill={c}/><circle cx="8" cy="7" r="1" fill={c}/><circle cx="5" cy="10" r="1" fill={c}/></>, c),
    'DNS': (c) => T(<><circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.2"/><path d="M7 1.5v11M1.5 7h11" stroke={c} strokeWidth="0.8"/><path d="M3 3.5Q7 6 11 3.5M3 10.5Q7 8 11 10.5" stroke={c} strokeWidth="0.8"/></>, c),
    'HTTP/S': (c) => T(<><rect x="1.5" y="3" width="11" height="8" rx="1.5" stroke={c} strokeWidth="1.2"/><path d="M1.5 5.5h11" stroke={c} strokeWidth="0.8"/><circle cx="3" cy="4.2" r="0.5" fill={c}/><circle cx="4.5" cy="4.2" r="0.5" fill={c}/><path d="M4 8h6" stroke={c} strokeWidth="0.8" strokeLinecap="round"/></>, c),
    'Wireshark': (c) => T(<><path d="M7 1C3.7 1 1 3.7 1 7s2.7 6 6 6 6-2.7 6-6S10.3 1 7 1z" stroke={c} strokeWidth="1.2"/><path d="M3 7c1-2 2.5-1 4 0s3 2 4 0" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></>, c),
    'Zeek': (c) => T(<><path d="M2 11l3-4 2 2 3-5 2 3" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/><circle cx="11" cy="4" r="1.5" stroke={c} strokeWidth="1" fill="none"/></>, c),
    'Snort': (c) => T(<><path d="M2 9c1-4 3-6 5-6s4 2 5 6" stroke={c} strokeWidth="1.2" strokeLinecap="round" fill="none"/><circle cx="5" cy="6" r="0.8" fill={c}/><circle cx="9" cy="6" r="0.8" fill={c}/><path d="M6 8h2" stroke={c} strokeWidth="0.8" strokeLinecap="round"/></>, c),

    /* ── Incident Response ── */
    'Alert Triage': (c) => T(<><path d="M7 2L1.5 12h11L7 2z" stroke={c} strokeWidth="1.2" strokeLinejoin="round" fill="none"/><line x1="7" y1="6" x2="7" y2="8.5" stroke={c} strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="10" r="0.6" fill={c}/></>, c),
    'Severity Assessment': (c) => T(<><rect x="2" y="2" width="10" height="10" rx="1.5" stroke={c} strokeWidth="1.2"/><path d="M4 9V7M7 9V5M10 9V3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></>, c),
    'Containment': (c) => T(<><rect x="2" y="2" width="10" height="10" rx="5" stroke={c} strokeWidth="1.2"/><path d="M5 5l4 4M9 5l-4 4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></>, c),
    'Eradication': (c) => T(<><path d="M3 3l8 8M11 3l-8 8" stroke={c} strokeWidth="0.8" strokeLinecap="round"/><circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.2"/><path d="M5 7h4" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></>, c),

    /* ── Frameworks ── */
    'MITRE ATT&CK': (c) => T(<><rect x="1" y="1" width="4" height="4" rx="0.5" stroke={c} strokeWidth="0.8"/><rect x="9" y="1" width="4" height="4" rx="0.5" stroke={c} strokeWidth="0.8"/><rect x="1" y="9" width="4" height="4" rx="0.5" stroke={c} strokeWidth="0.8"/><rect x="9" y="9" width="4" height="4" rx="0.5" stroke={c} strokeWidth="0.8"/><rect x="5" y="5" width="4" height="4" rx="0.5" fill={c} opacity="0.3" stroke={c} strokeWidth="0.8"/></>, c),
    'Cyber Kill Chain': (c) => T(<><circle cx="3" cy="3" r="1.5" stroke={c} strokeWidth="1"/><circle cx="7" cy="7" r="1.5" stroke={c} strokeWidth="1"/><circle cx="11" cy="11" r="1.5" stroke={c} strokeWidth="1"/><path d="M4.2 4.2l1.6 1.6M8.2 8.2l1.6 1.6" stroke={c} strokeWidth="1" strokeLinecap="round"/></>, c),
    'OWASP Top 10': (c) => T(<><circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.2"/><path d="M7 4v3l2 1.5" stroke={c} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></>, c),
    'NIST CSF': (c) => T(<><rect x="2" y="6" width="3" height="6" rx="0.5" stroke={c} strokeWidth="1"/><rect x="5.5" y="3" width="3" height="9" rx="0.5" stroke={c} strokeWidth="1"/><rect x="9" y="1" width="3" height="11" rx="0.5" stroke={c} strokeWidth="1"/></>, c),
    'CIS Controls': (c) => T(<><path d="M7 1L2 4v4c0 3.3 2.2 5.5 5 6 2.8-.5 5-2.7 5-6V4L7 1z" stroke={c} strokeWidth="1.2"/><path d="M7 4v4M5 6h4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/></>, c),

    /* ── Vuln Tools ── */
    'Nmap': (c) => T(<><circle cx="7" cy="7" r="5" stroke={c} strokeWidth="1.2" strokeDasharray="2 1.5"/><circle cx="7" cy="7" r="1.5" fill={c} opacity="0.4"/><path d="M7 2v2M7 10v2M2 7h2M10 7h2" stroke={c} strokeWidth="0.8" strokeLinecap="round"/></>, c),
    'Nessus': (c) => T(<><circle cx="7" cy="7" r="5.5" stroke={c} strokeWidth="1.2"/><path d="M4 7c1-2 2-3 3-3s2 1 3 3-2 3-3 3-2-1-3-3z" stroke={c} strokeWidth="1" fill="none"/><circle cx="7" cy="7" r="1" fill={c}/></>, c),
    'Burp Suite': (c) => T(<><circle cx="5" cy="5" r="3.5" stroke={c} strokeWidth="1.2" fill="none"/><circle cx="9.5" cy="9.5" r="3" stroke={c} strokeWidth="1.2" fill="none"/><path d="M7.5 3l3 3" stroke={c} strokeWidth="1" strokeLinecap="round"/></>, c),
    'Metasploit': (c) => T(<><rect x="3" y="1" width="8" height="12" rx="1" stroke={c} strokeWidth="1.2"/><path d="M5 4h4M5 6.5h4M5 9h2" stroke={c} strokeWidth="0.8" strokeLinecap="round"/><circle cx="10" cy="4" r="0.6" fill={c}/></>, c),
    'Autopsy': (c) => T(<><path d="M7 2v5" stroke={c} strokeWidth="1.2" strokeLinecap="round"/><circle cx="7" cy="9" r="3.5" stroke={c} strokeWidth="1.2"/><path d="M5.5 8.5l1.5 1 1.5-1" stroke={c} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/></>, c),
    'Active Directory': (c) => T(<><circle cx="7" cy="4" r="2.5" stroke={c} strokeWidth="1.2"/><path d="M3 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke={c} strokeWidth="1.2" strokeLinecap="round"/><path d="M10 3h2v2" stroke={c} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></>, c),

    /* ── Scripting ── */
    'Python': (c) => T(<><path d="M7 1.5C4.5 1.5 4 2.8 4 3.5v1.2h3v.6H3.5C2.3 5.3 1.5 6.5 1.5 8s.8 2.7 2 2.7H5V9.2c0-1 .8-1.9 1.8-1.9h2.4c.9 0 1.3-.5 1.3-1.3V3.5c0-.8-.6-2-3.5-2z" stroke={c} strokeWidth="1" fill="none"/><path d="M7 12.5c2.5 0 3-1.3 3-2v-1.2H7v-.6h3.5c1.2 0 2-1.2 2-2.7s-.8-2.7-2-2.7H9v1.5c0 1-.8 1.9-1.8 1.9H4.8c-.9 0-1.3.5-1.3 1.3v2.5c0 .8.6 2 3.5 2z" stroke={c} strokeWidth="1" fill="none"/><circle cx="5.2" cy="3.2" r="0.6" fill={c}/><circle cx="8.8" cy="10.8" r="0.6" fill={c}/></>, c),
    'PowerShell': (c) => T(<><rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke={c} strokeWidth="1.2"/><path d="M4 5l3 2.5L4 10" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 10h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></>, c),
    'SQL': (c) => T(<><ellipse cx="7" cy="4" rx="5" ry="2" stroke={c} strokeWidth="1.2"/><path d="M2 4v6c0 1.1 2.2 2 5 2s5-.9 5-2V4" stroke={c} strokeWidth="1.2"/><path d="M2 7c0 1.1 2.2 2 5 2s5-.9 5-2" stroke={c} strokeWidth="0.8"/></>, c),
    'Bash': (c) => T(<><rect x="1.5" y="2" width="11" height="10" rx="1.5" stroke={c} strokeWidth="1.2"/><path d="M4 5l2 2-2 2" stroke={c} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.5 9h3" stroke={c} strokeWidth="1.3" strokeLinecap="round"/></>, c),

    /* ── Cloud ── */
    'Azure': (c) => T(<><path d="M3 11L6 3h2.5l-2 4h4L5 11H3z" stroke={c} strokeWidth="1" fill={c} fillOpacity="0.15" strokeLinejoin="round"/></>, c),
    'AWS (S3, EC2)': (c) => T(<><path d="M7 2l5 3v4l-5 3-5-3V5l5-3z" stroke={c} strokeWidth="1.2" strokeLinejoin="round" fill="none"/><path d="M7 2v10M2 5l5 3 5-3" stroke={c} strokeWidth="0.8"/></>, c),
    'Cloudflare': (c) => T(<><path d="M5 11c-2 0-3.5-1.5-3.5-3.5S3 4 5 4c.3-1.7 1.8-3 3.5-3C10.4 1 12 2.8 12 5c1.2.3 2 1.3 2 2.5 0 1.5-1.2 2.5-2.5 2.5H5z" stroke={c} strokeWidth="1.1" fill="none" strokeLinejoin="round"/></>, c),
    'Docker': (c) => T(<><rect x="5.5" y="2" width="2.5" height="2" rx="0.3" stroke={c} strokeWidth="0.8"/><rect x="2.5" y="4.5" width="2.5" height="2" rx="0.3" stroke={c} strokeWidth="0.8"/><rect x="5.5" y="4.5" width="2.5" height="2" rx="0.3" stroke={c} strokeWidth="0.8"/><rect x="8.5" y="4.5" width="2.5" height="2" rx="0.3" stroke={c} strokeWidth="0.8"/><rect x="5.5" y="7" width="2.5" height="2" rx="0.3" stroke={c} strokeWidth="0.8"/><path d="M1 8.5c1 2 3 3.5 6.5 3.5 4 0 5.5-3 5.5-5" stroke={c} strokeWidth="1" strokeLinecap="round" fill="none"/></>, c),
};

/* ─── Category-level icons ─── */
const catIcons = {
    siem: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 8h2M7 11h3"/><path d="M13 8h4"/><path d="M13 11h2"/></svg>,
    log: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
    network: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="16" y="16" width="6" height="6" rx="1"/><path d="M12 8v4M5 16v-2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/></svg>,
    incident: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="16.5" r="0.5" fill={c}/></svg>,
    framework: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
    vuln: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><path d="M11 8v6"/><path d="M8 11h6"/></svg>,
    scripting: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>,
    cloud: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>,
    cert: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
};

/* ─── Skills data w/ Extended Details ─── */
const skillCategories = [
    {
        title: 'SIEM & Monitoring',
        icon: 'siem',
        color: '#22d3ee',
        tools: ['Splunk', 'Wazuh', 'ELK Stack'],
        details: 'Alert triage, rule tuning, IOC correlation, false positive reduction',
        extendedDetails: [
            "Configured and managed Splunk dashboards for real-time threat detection and operational visibility.",
            "Tuned Wazuh rules to monitor endpoint file integrity and successfully reduced false positive alerts by 40%.",
            "Built custom ELK log stash pipelines for parsing complex cloud environment telemetry."
        ]
    },
    {
        title: 'Log Analysis',
        icon: 'log',
        color: '#a855f7',
        tools: ['Windows Event Logs', 'Linux Syslogs', 'Network Device Logs', 'App Audit Trails'],
        details: 'Parsing, correlation, and forensic review of multi-source log data',
        extendedDetails: [
            "Performed forensic analysis on Windows Event Logs (Security, System, Sysmon) tracking lateral movement.",
            "Correlated massive sets of Linux syslogs to identify distributed brute-force SSH attacks.",
            "Parsed and enriched raw network device telemetry to pinpoint anomalous traffic patterns and prevent exfiltration."
        ]
    },
    {
        title: 'Networking',
        icon: 'network',
        color: '#3b82f6',
        tools: ['TCP/IP', 'DNS', 'HTTP/S', 'Wireshark', 'Zeek', 'Snort'],
        details: 'Routing/switching, firewall analysis, IDS/IPS configuration',
        extendedDetails: [
            "Captured and analyzed gigabytes of PCAPs using Wireshark for deep packet inspection and reverse engineering.",
            "Configured and deployed Zeek/Snort IDS rules to detect malicious signatures at the network perimeter.",
            "Troubleshot and secured complex layers of TCP/IP routing, DNS resolution, and internal firewall policies."
        ]
    },
    {
        title: 'Incident Response',
        icon: 'incident',
        color: '#ef4444',
        tools: ['Alert Triage', 'Severity Assessment', 'Containment', 'Eradication'],
        details: 'Incident ticket documentation, root cause analysis, recovery',
        extendedDetails: [
            "Triaged and responded to high-severity SIEM/EDR alerts while strictly adhering to internal incident SLAs.",
            "Conducted comprehensive root cause analysis and extensively documented incidents in enterprise ticketing systems.",
            "Coordinated containment and eradication of threats during simulated war-room scenarios based on established playbooks."
        ]
    },
    {
        title: 'Security Frameworks',
        icon: 'framework',
        color: '#22c55e',
        tools: ['MITRE ATT&CK', 'Cyber Kill Chain', 'OWASP Top 10', 'NIST CSF', 'CIS Controls'],
        details: 'Threat modeling, compliance mapping, risk assessment',
        extendedDetails: [
            "Mapped existing SOC detection coverage heavily against the MITRE ATT&CK framework identifying key blind spots.",
            "Assessed the organizational cyber posture strictly against the NIST Cybersecurity Framework guidelines.",
            "Implemented and audited CIS Controls across various OS endpoints to harden enterprise environments."
        ]
    },
    {
        title: 'Threat & Vuln Tools',
        icon: 'vuln',
        color: '#f59e0b',
        tools: ['Nmap', 'Nessus', 'Burp Suite', 'Metasploit', 'Autopsy', 'Active Directory'],
        details: 'Vulnerability assessment, penetration testing, forensic analysis',
        extendedDetails: [
            "Conducted routine and ad hoc vulnerability scans using Nessus, prioritizing the remediation of critical CVEs.",
            "Leveraged Nmap for network reconnaissance, aggressive port scanning, and service enumeration.",
            "Performed specialized web application vulnerability assessments using Burp Suite."
        ]
    },
    {
        title: 'Scripting & Automation',
        icon: 'scripting',
        color: '#ec4899',
        tools: ['Python', 'PowerShell', 'SQL', 'Bash'],
        details: 'Log parsing, security automation, custom detection scripts',
        extendedDetails: [
            "Developed maintainable Python scripts to automate repetitive log parsing and automated alert enrichment.",
            "Leveraged advanced PowerShell scripting for Active Directory querying and automated threat remediation tasks.",
            "Created tailored Bash scripts specifically aimed at rapid Linux server hardening and cronjob monitoring."
        ]
    },
    {
        title: 'Cloud Platforms',
        icon: 'cloud',
        color: '#6366f1',
        tools: ['Azure', 'AWS (S3, EC2)', 'Cloudflare', 'Docker'],
        details: 'Cloud security posture, container security, CDN hardening',
        extendedDetails: [
            "Regularly audited AWS resource configurations (IAM, S3 policies, EC2 security groups) aligned with best practices.",
            "Monitored Azure cloud environments to swiftly verify remediation of identified access misconfigurations.",
            "Secured incoming web traffic and deflected active DDoS attempts utilizing Cloudflare WAF and CDN rules."
        ]
    },
];

const certifications = [
    { name: 'Certified IT Infrastructure Cyber SOC Analyst (CICSA)', org: 'Red Team Hacker Academy', color: '#ef4444' },
    { name: 'Certified SOC Analyst (CSA)', org: 'EC-Council', color: '#3b82f6' },
    { name: 'Certified Blue Team Practitioner (CBTP)', org: 'SecOps Group', color: '#22d3ee' },
];

/* ─── Animated Category Visualizers ─── */
const Visualizers = {
    siem: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Radar Sweep */}
            <motion.div 
                className="absolute w-32 h-32 rounded-full border border-t-0 border-r-0 opacity-40"
                style={{ borderColor: color, background: `conic-gradient(from 0deg, transparent 0deg, transparent 270deg, ${color} 360deg)` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity }}
            />
            {/* Radar Rings */}
            {[1, 2, 3].map(i => (
                <div key={i} className="absolute rounded-full border opacity-20" style={{ width: i*40, height: i*40, borderColor: color }} />
            ))}
            {/* Pings */}
            {[...Array(3)].map((_, i) => (
                <motion.div key={i} className="absolute w-2 h-2 rounded-full" style={{ background: color, top: `${30+Math.random()*40}%`, left: `${30+Math.random()*40}%` }}
                    animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, delay: i*1.2, repeat: Infinity }}
                />
            ))}
        </div>
    ),
    log: ({ color }) => (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden px-10">
            {/* Scrolling Logs */}
            <motion.div 
                className="w-full flex flex-col gap-2"
                animate={{ y: [0, -60] }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-4 rounded opacity-40 flex items-center px-2 gap-2" style={{ background: `${color}15` }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                        <div className="h-1 rounded w-1/3" style={{ background: `${color}40` }} />
                        <div className="h-1 rounded w-1/4" style={{ background: `${color}40` }} />
                    </div>
                ))}
            </motion.div>
        </div>
    ),
    network: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            <svg className="absolute inset-0 w-full h-full">
                <motion.line x1="20%" y1="50%" x2="50%" y2="20%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="50%" y1="20%" x2="80%" y2="50%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="80%" y1="50%" x2="50%" y2="80%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                <motion.line x1="50%" y1="80%" x2="20%" y2="50%" stroke={`${color}40`} strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Packets */}
                <motion.circle r="3" fill={color} animate={{ cx: ["20%", "50%", "80%", "50%", "20%"], cy: ["50%", "20%", "50%", "80%", "50%"] }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} />
                <motion.circle r="3" fill={color} animate={{ cx: ["80%", "50%", "20%", "50%", "80%"], cy: ["50%", "80%", "50%", "20%", "50%"] }} transition={{ duration: 4, ease: "linear", repeat: Infinity }} />
            </svg>
            {/* Nodes */}
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(20% - 12px)', top: 'calc(50% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(50% - 12px)', top: 'calc(20% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(80% - 12px)', top: 'calc(50% - 12px)', background: `${color}80` }} />
            <div className="absolute w-6 h-6 rounded-md z-10" style={{ left: 'calc(50% - 12px)', top: 'calc(80% - 12px)', background: `${color}80` }} />
        </div>
    ),
    incident: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
            <motion.div 
                className="w-16 h-16 rounded-full flex items-center justify-center z-10"
                style={{ background: `${color}20`, border: `2px solid ${color}` }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
            >
                <div className="w-6 h-6 rounded-full" style={{ background: color }} />
            </motion.div>
            {/* Pulse rings */}
            {[...Array(3)].map((_, i) => (
                <motion.div key={i} className="absolute w-16 h-16 rounded-full" style={{ border: `2px solid ${color}` }}
                    animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                    transition={{ duration: 2, delay: i*0.6, repeat: Infinity, ease: "easeOut" }}
                />
            ))}
        </div>
    ),
    framework: ({ color }) => (
        <div className="relative w-full h-full flex flex-col items-center justify-center gap-1">
            {/* Compliance mapping representation */}
            {[...Array(3)].map((_, row) => (
                <div key={row} className="flex gap-1">
                    {[...Array(5)].map((_, col) => (
                        <motion.div 
                            key={col} 
                            className="w-6 h-6 rounded-sm"
                            style={{ background: `${color}30` }}
                            animate={{ opacity: [0.3, 1, 0.3], background: [`${color}30`, `${color}`, `${color}30`] }}
                            transition={{ duration: 3, delay: (row+col)*0.2, repeat: Infinity }}
                        />
                    ))}
                </div>
            ))}
        </div>
    ),
    vuln: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {/* Target Reticle */}
            <motion.div 
                className="absolute w-20 h-20 rounded-full border-2"
                style={{ borderColor: color }}
                animate={{ x: [-40, 40, -40], y: [-20, 20, -20] }}
                transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
            >
                <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -ml-px" style={{ background: color }} />
                <div className="absolute top-1/2 left-0 right-0 h-0.5 -mt-px" style={{ background: color }} />
            </motion.div>
            {/* Vulnerabilities (Nodes) */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-3 h-3 rounded-full opacity-50" style={{ background: color, left: `${20+Math.random()*60}%`, top: `${20+Math.random()*60}%` }} />
            ))}
        </div>
    ),
    scripting: ({ color }) => (
        <div className="relative w-full h-full flex flex-col items-start justify-center px-10">
            {/* Typing effect */}
            <div className="font-mono text-xs opacity-80" style={{ color: color }}>
                {'>'} initializing automation_script.py...
            </div>
            <motion.div 
                className="w-2 h-4 mt-1"
                style={{ background: color }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
                className="mt-4 font-mono text-[10px] w-full"
                style={{ color: `${color}80` }}
                animate={{ opacity: [0, 1] }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <div className="h-1.5 rounded w-full mb-2" style={{ background: `${color}30` }} />
                <div className="h-1.5 rounded w-5/6 mb-2" style={{ background: `${color}30` }} />
                <div className="h-1.5 rounded w-4/6" style={{ background: `${color}30` }} />
            </motion.div>
        </div>
    ),
    cloud: ({ color }) => (
        <div className="relative w-full h-full flex items-center justify-center">
             {/* Floating Cloud Entities */}
            <motion.div 
                className="absolute w-20 h-10 rounded-full mix-blend-screen backdrop-blur-md"
                style={{ border: `1px solid ${color}`, background: `${color}20`, top: '40%', left: '25%' }}
                animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
                className="absolute w-16 h-8 rounded-full mix-blend-screen backdrop-blur-md"
                style={{ border: `1px solid ${color}`, background: `${color}10`, top: '25%', left: '50%' }}
                animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
             {/* Sync links */}
             <svg className="absolute inset-0 w-full h-full z-[-1]">
                <motion.line x1="40%" y1="50%" x2="60%" y2="35%" stroke={`${color}40`} strokeWidth="1" strokeDasharray="3 3"
                    animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
             </svg>
        </div>
    ),
};

const CyberVisualizer = ({ category }) => {
    const SpecificVisualizer = Visualizers[category.icon] || Visualizers['siem']; // Fallback
    
    return (
        <div className="relative w-full h-48 md:h-full bg-black/40 rounded-2xl border flex items-center justify-center overflow-hidden" style={{ borderColor: `${category.color}20` }}>
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(${category.color} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
            
            <SpecificVisualizer color={category.color} />
        </div>
    );
};

/* ─── Animated Modal Component ─── */
const SkillModal = ({ category, onClose }) => {
    const CatIcon = catIcons[category.icon];

    // Lock body scroll when mounted
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                className="relative w-full max-w-4xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#0b0f19] border border-white/10 shadow-2xl z-10 flex flex-col md:flex-row gap-6 md:gap-8"
                style={{
                    boxShadow: `0 20px 60px -15px ${category.color}30`
                }}
            >
                {/* Glow accent */}
                <div 
                    className="absolute top-0 left-0 w-full h-1" 
                    style={{ background: `linear-gradient(90deg, transparent, ${category.color}, transparent)` }} 
                />

                {/* Left Side: Visualizer */}
                <div className="w-full md:w-5/12 lg:w-1/3 flex-shrink-0 order-2 md:order-1 pt-2 md:pt-0">
                    <CyberVisualizer category={category} />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-between order-1 md:order-2">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                                style={{ background: `${category.color}15`, border: `1px solid ${category.color}30` }}>
                                {CatIcon(category.color)}
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold text-white mb-1">{category.title}</h2>
                                <p className="text-sm text-slate-400">{category.details}</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={onClose}
                            className="p-2 -mr-2 -mt-2 rounded-full hover:bg-white/10 text-slate-500 hover:text-white transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    {/* Tools Chips */}
                    <div className="mb-6">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">Arsenal Stack</h4>
                        <div className="flex flex-wrap gap-2">
                            {category.tools.map((tool) => {
                                const IconFn = toolIcons[tool];
                                return (
                                    <span key={tool}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md"
                                        style={{
                                            background: `${category.color}08`,
                                            border: `1px solid ${category.color}20`,
                                            color: category.color,
                                        }}
                                    >
                                        {IconFn && IconFn(category.color)}
                                        {tool}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Expanded Details list */}
                    <div className="flex-1">
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Core Implementation</h4>
                        <ul className="space-y-4">
                            {category.extendedDetails.map((detail, idx) => (
                                <motion.li 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + (idx * 0.1) }}
                                    key={idx} 
                                    className="flex items-start gap-3 text-[13px] text-slate-300 leading-relaxed"
                                >
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 shadow-md" style={{ background: category.color, boxShadow: `0 0 8px ${category.color}` }} />
                                    {detail}
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

/* ─── Mini Skill Card (Trigger) ─── */
const SkillCard = ({ category, index, inView, onClick }) => {
    const CatIcon = catIcons[category.icon];
    
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="group relative p-6 rounded-2xl cursor-pointer bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05] transition-colors"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
            }}
            transition={{
                opacity: { duration: 0.5, delay: index * 0.06 },
                transform: { duration: 0.5, delay: index * 0.06 }
            }}
        >
            <div className="relative z-10 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                            style={{ background: `${category.color}12`, border: `1px solid ${category.color}25` }}>
                            {CatIcon(category.color)}
                        </div>
                        <h3 className="font-display font-bold text-white text-sm">{category.title}</h3>
                    </div>
                    {/* View Details Icon */}
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 text-slate-500 group-hover:text-white transition-colors group-hover:bg-white/10">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </div>
                </div>

                {/* Tools Preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {category.tools.slice(0, 3).map((tool) => {
                        const IconFn = toolIcons[tool];
                        return (
                            <span key={tool}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-medium"
                                style={{
                                    background: `${category.color}05`,
                                    border: `1px solid ${category.color}10`,
                                    color: category.color,
                                }}
                            >
                                {IconFn && IconFn(category.color)}
                                {tool}
                            </span>
                        );
                    })}
                    {category.tools.length > 3 && (
                        <span className="inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-medium text-slate-500 bg-white/5">
                            +{category.tools.length - 3}
                        </span>
                    )}
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 mt-auto">
                    {category.details}
                </p>
            </div>
        </motion.div>
    );
};

/* ─── Main Component ─── */
const Stack = () => {
    const [ref, inView] = useInView(0.08);
    const [certRef, certInView] = useInView(0.15);
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <section id="stack" className="py-24 relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center justify-between"
            >
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">Technical Arsenal</h2>
                <div className="hidden md:block h-[1px] bg-white/10 flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 text-sm mb-12 max-w-lg"
            >
                Core competencies across offensive and defensive cybersecurity domains. Click cards to expand.
            </motion.p>

            {/* Skills Grid */}
            <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {skillCategories.map((cat, i) => (
                    <SkillCard 
                        key={cat.title} 
                        category={cat} 
                        index={i} 
                        inView={inView} 
                        onClick={() => setSelectedSkill(cat)}
                    />
                ))}
            </div>

            {/* Certifications */}
            <div ref={certRef}>
                <h3 className={`text-lg font-display font-bold text-white mb-6 flex items-center gap-3 transition-all duration-500 ${certInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        {catIcons.cert('#f59e0b')}
                    </span>
                    Certifications
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                    {certifications.map((cert, i) => (
                        <div key={i}
                            className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-all duration-300"
                            style={{
                                opacity: certInView ? 1 : 0,
                                transform: certInView ? 'translateY(0)' : 'translateY(16px)',
                                transition: `all 400ms ease-out ${i * 120}ms`,
                                borderLeft: `3px solid ${cert.color}`,
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                    style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25` }}>
                                    {catIcons.cert(cert.color)}
                                </div>
                                <div>
                                    <h4 className="font-display font-bold text-sm text-white mb-1 leading-snug group-hover:text-cyan-400 transition-colors">
                                        {cert.name}
                                    </h4>
                                    <p className="text-[11px] text-slate-500">{cert.org}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal Portal & Presence */}
            <AnimatePresence>
                {selectedSkill && (
                    <SkillModal 
                        category={selectedSkill} 
                        onClose={() => setSelectedSkill(null)} 
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Stack;
