import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, CheckCircle, Zap, User, Lock, EyeOff, GitBranch, Cpu,
  ChevronDown, ChevronRight, AlertTriangle, Check, Users, Monitor, Server, FileText, Globe, X,
  BookOpen, ClipboardList, AlertCircle, Building2, Terminal
} from 'lucide-react';

const TABS = [
  "Security Management Principles",
  "SOC Capabilities & Functions",
  "SOC Workflow & PPT",
  "SOC Models",
  "SOC Maturity Models",
  "KPIs, Challenges & Best Practices"
];

const PRINCIPLES = [
  { icon: Shield, name: "Confidentiality", desc: "Ensure information is accessible only to authorized entities" },
  { icon: CheckCircle, name: "Integrity", desc: "Safeguard accuracy and completeness of data and processing" },
  { icon: Zap, name: "Availability", desc: "Ensure authorized users have timely and reliable access to systems" },
  { icon: User, name: "Accountability", desc: "Trace every action logically to a single accountable individual" },
  { icon: Lock, name: "Non-repudiation", desc: "Provide undeniable proof of origin and integrity of data" },
  { icon: EyeOff, name: "Least Privilege", desc: "Grant minimum required access to perform authorized tasks" }
];

const TERMINAL_OUTPUT = [
  "$ soc --capabilities",
  "> [MONITOR] Continuous 24x7 network and endpoint surveillance",
  "> [DETECT] Signature and anomaly-based threat detection",
  "> [ANALYZE] Alert triage, correlation and contextual investigation",
  "> [RESPOND] Containment, eradication and recovery coordination",
  "> [REPORT] Incident documentation and executive dashboards",
  "> [IMPROVE] Post-incident review and control optimization",
  "$ "
];

const ROLES = [
  { role: "L1 Analyst", tasks: ["Monitor event queues and triage alerts", "Perform initial investigation and contextualization", "Escalate true positives to L2 analysts"] },
  { role: "L2 Analyst", tasks: ["Conduct deep analysis on escalated incidents", "Determine root cause and attack vectors", "Recommend containment and remediation actions"] },
  { role: "L3 Analyst", tasks: ["Perform advanced forensics and malware analysis", "Develop new detection logic and threat hunts", "Act as technical lead during major incidents"] },
  { role: "SOC Manager", tasks: ["Oversee 24x7 SOC operations and personnel", "Manage SLA/KPIs and drive process improvement", "Interface with executive leadership and CISO"] },
  { role: "Threat Intel Analyst", tasks: ["Research emerging threat actors and TTPs", "Produce actionable intelligence reports", "Enrich automated detection rules with IOCs"] }
];

const SOC_MODELS = [
  { name: 'In-house SOC', deployment: 'On-premises', cost: 'High', control: 'Full', bestFor: 'Large enterprises with dedicated security budget',
    pros: ['Complete operational control', 'Deep integration with internal IT', 'Data remains on-premises'],
    cons: ['High capital and operational expense', 'Difficulty retaining specialized talent', 'Challenging to maintain true 24x7'] },
  { name: 'Outsourced/MSSP', deployment: 'Cloud/Remote', cost: 'Low-Medium', control: 'Limited', bestFor: 'SMBs needing 24x7 without headcount',
    pros: ['Immediate 24x7 coverage', 'Lower total cost of ownership', 'Access to rare security expertise'],
    cons: ['Generic, less tailored response', 'Data leaves the corporate boundary', 'Strict SLA reliance reduces flexibility'] },
  { name: 'Hybrid SOC', deployment: 'Mixed', cost: 'Medium', control: 'Shared', bestFor: 'Orgs wanting flexibility with in-house oversight',
    pros: ['In-house control over critical alerts', 'MSSP handles off-hours/L1 triage', 'Flexible, scalable coverage'],
    cons: ['Complex process integration', 'Divided accountability in crises', 'Potential tooling overlap/friction'] },
  { name: 'Virtual SOC', deployment: 'Fully Remote', cost: 'Low', control: 'Moderate', bestFor: 'Distributed teams and remote-first orgs',
    pros: ['No physical facility costs', 'Access to global talent pool', 'Highly resilient to location outages'],
    cons: ['Heavy reliance on cloud infrastructure', 'Harder to build cohesive team culture', 'Bandwidth and latency dependencies'] },
  { name: 'Command SOC', deployment: 'Centralized Hub', cost: 'Very High', control: 'Complete', bestFor: 'Government and critical infrastructure',
    pros: ['Unparalleled visibility across domains', 'Highly standardized playbook execution', 'Massive intelligence sharing economy'],
    cons: ['Inhibitive cost to build and run', 'Risk of becoming a bureaucratic bottleneck', 'Catastrophic single point of failure'] }
];

const MATURITY_LEVELS = [
  { name: "Initial", label: "Reactive", traits: ["No formal logging", "Ad-hoc incident response", "Relying on out-of-box AV rules"] },
  { name: "Managed", label: "Monitored", traits: ["Centralized log management (SIEM)", "Basic documented procedures", "Defined L1/L2 roles"] },
  { name: "Defined", label: "Standardized", traits: ["Comprehensive use-case framework", "Integrated threat intelligence", "Regular KPI tracking and review"] },
  { name: "Quantitative", label: "Measured", traits: ["SOAR-driven automated triage", "Data-driven capacity planning", "Continuous red/blue team exercises"] },
  { name: "Optimizing", label: "Adaptive", traits: ["Machine learning detection models", "Proactive zero-day threat hunting", "Automated, dynamic self-healing network"] }
];

const KPIS = [
  { label: 'MTTD', value: '8 min', percent: 70 },
  { label: 'MTTR', value: '45 min', percent: 55 },
  { label: 'False Positive Rate', value: '23%', percent: 30 },
  { label: 'Alert Volume', value: '1,240/day', percent: 80 }
];

const CHALLENGES = [
  { title: "Alert Fatigue", desc: "Analysts process thousands of alerts daily leading to burnout and missed critical detections.", mitigation: "Implement SOAR automation, tune use cases rigorously, and apply ML-based alert prioritization." },
  { title: "Skill Shortage", desc: "The cybersecurity talent gap leaves SOC teams understaffed, overworked, and lacking advanced diagnostic skills.", mitigation: "Invest in continuous training programs, automate repetitive L1 tasks, and leverage managed detection services." },
  { title: "Tool Sprawl", desc: "Disconnected security tools create visibility gaps, forcing analysts to swivel-chair across dozen dashboards.", mitigation: "Consolidate telemetry onto integrated XDR platforms and strictly enforce SIEM central visibility mandates." },
  { title: "Compliance Pressure", desc: "Meeting strict regulatory or audit requirements consumes significant operational resources and time.", mitigation: "Automate continuous compliance reporting through SIEM use cases mapped to CIS or NIST control frameworks." },
  { title: "Threat Velocity", desc: "Attackers continuously evolve techniques and leverage automation faster than static detection logic can be updated.", mitigation: "Subscribe to commercial threat intelligence feeds, automate IOC ingests, and join sector-specific ISACs." }
];

const BEST_PRACTICES = [
  "Define Clear Escalation Paths",
  "Tune SIEM Rules Weekly",
  "Conduct Tabletop Exercises",
  "Automate Tier-1 Responses",
  "Track KPIs on a Live Dashboard",
  "Run Monthly Red/Blue Team Drills"
];

const TerminalTyping = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  useEffect(() => {
    if (currentLineIdx < TERMINAL_OUTPUT.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, TERMINAL_OUTPUT[currentLineIdx]]);
        setCurrentLineIdx(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx]);

  return (
    <div className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 h-[200px] mb-8 relative group">
      <div className="flex flex-row items-center px-4 py-3 bg-slate-900 border-b border-slate-800 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-slate-500 text-xs ml-2 font-mono">soc-terminal</span>
      </div>
      <div className="p-4 font-mono text-xs overflow-y-auto h-[155px] relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-70" 
          style={{ background: 'repeating-linear-gradient(transparent 0px, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)', backgroundSize: '100% 2px' }} 
        />
        <div className="relative z-20 flex flex-col gap-1">
          {displayedLines.map((line, i) => (
            <div key={i} className="text-cyan-400 break-words">{line}{i === displayedLines.length - 1 && i === TERMINAL_OUTPUT.length - 1 ? <span className="animate-pulse">_</span> : null}</div>
          ))}
          {currentLineIdx < TERMINAL_OUTPUT.length && (
            <div className="text-cyan-400"><span className="animate-pulse">_</span></div>
          )}
        </div>
      </div>
    </div>
  );
};

const ArcGauge = ({ percent, label, value }) => {
  const [offset, setOffset] = useState(188.5); // π * r (r=60 roughly for 120 viewbox) -> 188.5 stroke length

  useEffect(() => {
    setOffset(188.5 - (188.5 * percent) / 100);
  }, [percent]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-20 overflow-hidden flex justify-center">
        <svg viewBox="0 0 140 80" className="w-full h-full transform translate-y-3">
          <path d="M 20 70 A 50 50 0 0 1 120 70" stroke="#1e293b" strokeWidth="12" fill="none" strokeLinecap="round" />
          <motion.path
            d="M 20 70 A 50 50 0 0 1 120 70"
            stroke="#22d3ee"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="157.08" // π * 50
            initial={{ strokeDashoffset: 157.08 }}
            animate={{ strokeDashoffset: 157.08 - (157.08 * percent) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute bottom-1 w-full text-center">
          <div className="text-xl font-bold text-slate-100">{value}</div>
        </div>
      </div>
      <div className="text-xs text-slate-500 font-medium tracking-wide uppercase mt-2">{label}</div>
    </div>
  );
};


export default function CSAModule01() {
  const [activeTab, setActiveTab] = useState(0);
  const [completedSections, setCompletedSections] = useState(() => new Set());
  const [showBadge, setShowBadge] = useState(false);
  
  const [expandedRole, setExpandedRole] = useState(null);
  const [expandedModel, setExpandedModel] = useState(null);
  const [activeMaturity, setActiveMaturity] = useState(null);
  const [expandedChallenge, setExpandedChallenge] = useState(null);
  const [checkedPractices, setCheckedPractices] = useState(() => new Set());

  // Check section completion
  const markSectionComplete = (idx) => {
    setCompletedSections(prev => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  // Badge trigger
  useEffect(() => {
    if (completedSections.size === 6 && !localStorage.getItem('csa_badge_soc_commander')) {
      setShowBadge(true);
      localStorage.setItem('csa_badge_soc_commander', 'true');
    }
  }, [completedSections.size]);

  // Tab 6 auto-completion
  useEffect(() => {
    if (checkedPractices.size === 6) {
      markSectionComplete(5);
    }
  }, [checkedPractices.size]);

  // Handle manual complete for generic tabs
  const handleMarkComplete = () => {
    if (activeTab < 5) markSectionComplete(activeTab);
  };

  return (
    <div className="min-h-screen bg-black px-6 py-12 font-sans selection:bg-cyan-400/30 selection:text-cyan-400">
      <div className="max-w-6xl mx-auto relative">
        
        {/* Progress Hexagon */}
        <div className="fixed top-6 right-6 z-40 flex flex-col items-center">
          <svg viewBox="0 0 80 92" className="w-12 h-14 overflow-visible">
            <defs>
              <clipPath id="hexProgressClip">
                <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" />
              </clipPath>
            </defs>
            <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#1e293b" strokeWidth="2" fill="#020617" />
            <g clipPath="url(#hexProgressClip)">
              <motion.rect 
                x="0" 
                width="80" 
                fill="#22d3ee" 
                initial={{ y: 92, height: 0 }}
                animate={{ 
                  y: 92 - (completedSections.size / 6) * 92, 
                  height: (completedSections.size / 6) * 92 
                }}
                transition={{ type: "spring", damping: 20 }}
              />
            </g>
            <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.6" />
          </svg>
          <div className="text-cyan-400 font-bold text-xs mt-2 text-center shadow-cyan-400/20">{completedSections.size}/6 Complete</div>
        </div>

        {/* Badge Overlay */}
        <AnimatePresence>
          {showBadge && (
            <motion.div 
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <div className="relative flex items-center justify-center">
                {/* Particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-cyan-400 -mt-1.5 -ml-1.5"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ 
                      x: Math.cos(i * 30 * Math.PI / 180) * 160, 
                      y: Math.sin(i * 30 * Math.PI / 180) * 160, 
                      opacity: 0, 
                      scale: 0 
                    }}
                    transition={{ duration: 1.2, delay: (i % 4) * 0.1, ease: "easeOut" }}
                  />
                ))}
                
                {/* Badge Card */}
                <motion.div 
                  className="bg-slate-900 border-2 border-cyan-400 rounded-3xl p-10 flex flex-col items-center shadow-[0_0_60px_rgba(52,211,153,0.2)] relative max-w-sm w-full"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 100 }}
                >
                  <button onClick={() => setShowBadge(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300">
                     <X size={20} />
                  </button>
                  <div className="w-24 h-24 rounded-full bg-cyan-400/10 flex items-center justify-center mb-6 border border-cyan-400/30">
                     <Shield className="text-cyan-400" size={48} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-slate-100 tracking-tight mb-2 text-center">SOC Commander</h2>
                  <div className="px-4 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 text-sm font-semibold tracking-wide uppercase">Badge Earned</div>
                  <p className="text-slate-400 text-center mt-6 text-sm">You have successfully mastered the fundamentals of Security Operations and Management.</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Segment */}
        <div className="mb-10 w-full max-w-4xl">
          <h1 className="text-4xl font-bold text-slate-100 tracking-tight leading-tight mb-2">Security Operations and Management</h1>
          <p className="text-slate-500 text-lg">Master the core principles, models, and workflows driving modern enterprise SOCs.</p>
        </div>

        {/* Horizontal Tab Bar */}
        <div className="flex flex-row overflow-x-auto pb-4 gap-2 border-b border-slate-800 mb-8 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`relative px-5 py-3 rounded-lg text-sm font-semibold transition-colors shrink-0 ${activeTab === idx ? 'text-cyan-400 bg-cyan-400/10' : 'text-slate-400 bg-slate-900 hover:text-slate-200 hover:bg-slate-800'}`}
            >
              {activeTab === idx && (
                <motion.div layoutId="activeTabUnderline" className="absolute inset-x-0 -bottom-4 h-0.5 bg-cyan-400" />
              )}
              <div className="flex items-center gap-2">
                {completedSections.has(idx) && <CheckCircle size={14} className="text-cyan-400" />}
                {tab}
              </div>
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="min-h-[600px] w-full max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* TAB 1 */}
              {activeTab === 0 && (
                <div>
                  {/* PART A - Four Pillars of Security Management */}
                  <motion.h2 className="text-lg font-semibold text-zinc-100 mb-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>Four Pillars of Security Management</motion.h2>
                  <motion.p className="text-sm text-zinc-500 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>The foundation of every effective security program</motion.p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-10">
                    {[
                      { icon: BookOpen, top: "Pillar 01", name: "Information Security Management", desc: "Establishes the policies, standards, procedures and guidelines that govern how information assets are protected across the organization.", str: ["Policy Development", "Standards Definition", "Awareness Training"] },
                      { icon: AlertTriangle, top: "Pillar 02", name: "Risk Management", desc: "Identifies, assesses and mitigates risks to organizational assets through a structured and continuous risk management lifecycle.", str: ["Risk Assessment", "Threat Modeling", "Risk Treatment"] },
                      { icon: ClipboardList, top: "Pillar 03", name: "Compliance Management", desc: "Ensures the organization meets all applicable regulatory, legal and contractual security requirements consistently.", str: ["Audit Management", "Regulatory Mapping", "Gap Analysis"] },
                      { icon: AlertCircle, top: "Pillar 04", name: "Incident Management", desc: "Establishes structured processes to detect, respond to and recover from security incidents in a repeatable and documented way.", str: ["Incident Detection", "Response Coordination", "Post-Incident Review"] }
                    ].map((p, i) => (
                      <motion.div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-emerald-400/50 transition-colors duration-300 cursor-default" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.1 }} viewport={{ once: true }}>
                        <div className="flex justify-between items-start">
                          <p.icon size={20} className="text-emerald-400" />
                          <span className="bg-emerald-400/10 text-emerald-400 text-xs font-mono rounded-full px-2 py-0.5">{p.top}</span>
                        </div>
                        <h3 className="text-base font-semibold text-zinc-100 mt-3 mb-1">{p.name}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">{p.desc}</p>
                        <div className="h-px w-full bg-zinc-800 my-3"></div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">Key Activities</div>
                        <div>
                          {p.str.map((c, ci) => <span key={ci} className="bg-zinc-800 text-zinc-300 text-xs rounded-full px-2 py-1 mr-1 mb-1 inline-flex">{c}</span>)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* PART B - Role of Security Operations */}
                  <motion.h2 className="text-lg font-semibold text-zinc-100 mb-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>Role of Security Operations</motion.h2>
                  <motion.p className="text-sm text-zinc-500 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>Where SecOps fits in the enterprise security hierarchy</motion.p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-8">
                    {[
                      { icon: Building2, top: "Strategic Layer", desc: "Sets direction, policy and governance for the entire security program", str: ["Board of Directors", "CISO", "Security Steering Committee"] },
                      { icon: Users, top: "Management Layer", desc: "Translates strategic objectives into operational security plans and budgets", str: ["SecOps Manager", "Risk Manager", "Compliance Officer"] },
                      { icon: Terminal, top: "Operational Layer", desc: "Executes day-to-day security monitoring, detection and response activities", str: ["SOC Analysts", "Threat Hunters", "Incident Responders"] }
                    ].map((c, i) => (
                      <motion.div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-emerald-400/50 transition-colors" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.12 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-2 mb-1">
                          <c.icon className="text-emerald-400" size={16} />
                          <h4 className="text-sm font-semibold text-zinc-100">{c.top}</h4>
                        </div>
                        <p className="text-xs text-zinc-500 mb-3">{c.desc}</p>
                        <div className="flex flex-wrap gap-1">
                          {c.str.map((chip, ci) => <span key={ci} className="bg-zinc-800 text-zinc-300 text-xs rounded-full px-2 py-1">{chip}</span>)}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* PART C - Core Security Principles */}
                  <motion.h2 className="text-lg font-semibold text-zinc-100 mb-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>Core Security Principles</motion.h2>
                  <motion.p className="text-sm text-zinc-500 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>The CIA triad and its operational extensions</motion.p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: Shield, top: "Confidentiality", desc: "Ensure information is accessible only to those authorized to access it" },
                      { icon: CheckCircle, top: "Integrity", desc: "Safeguard accuracy and completeness of information and processing methods" },
                      { icon: Zap, top: "Availability", desc: "Ensure authorized users have access to information and systems when required" },
                      { icon: User, top: "Accountability", desc: "Track and log all actions attributable to specific individuals or systems" },
                      { icon: Lock, top: "Non-repudiation", desc: "Prevent denial of actions through cryptographic proof and audit trails" },
                      { icon: EyeOff, top: "Least Privilege", desc: "Grant only the minimum access rights necessary to perform job functions" }
                    ].map((p, i) => (
                      <motion.div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-emerald-400/50 transition-colors duration-300" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.08 }} viewport={{ once: true }}>
                        <p.icon className="text-emerald-400 mb-2" size={18} />
                        <h4 className="text-sm font-semibold text-zinc-100 mb-1">{p.top}</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed">{p.desc}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* PART D - Enterprise Hierarchy SVG Org Chart */}
                  <motion.h2 className="text-lg font-semibold text-zinc-100 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 80, damping: 18 }} viewport={{ once: true }}>Enterprise Security Hierarchy</motion.h2>

                  <svg viewBox="0 0 700 300" width="100%">
                    <rect x="270" y="10" width="160" height="40" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="350" y="30" fontSize="11" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">Board of Directors</text>

                    <rect x="270" y="95" width="160" height="40" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="350" y="115" fontSize="11" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">CISO</text>

                    <rect x="270" y="180" width="160" height="40" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="350" y="200" fontSize="11" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">SecOps Manager</text>

                    <rect x="60" y="255" width="140" height="40" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="130" y="275" fontSize="11" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">SOC Team</text>

                    <rect x="500" y="255" width="140" height="40" rx="8" fill="#18181b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="570" y="275" fontSize="11" fill="#e4e4e7" textAnchor="middle" dominantBaseline="middle" fontFamily="monospace">IT Security</text>

                    <motion.path d="M 350 50 L 350 95" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="4 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0 }} viewport={{ once: true }} />
                    <motion.path d="M 350 135 L 350 180" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="4 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.3 }} viewport={{ once: true }} />
                    <motion.path d="M 300 220 Q 200 237 130 255" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="4 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }} viewport={{ once: true }} />
                    <motion.path d="M 400 220 Q 500 237 570 255" stroke="#10b981" strokeWidth="1.5" fill="none" strokeDasharray="4 2" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.6, ease: "easeInOut", delay: 0.9 }} viewport={{ once: true }} />

                    <text x="130" y="308" fontSize="9" fill="#10b981" textAnchor="middle" fontFamily="monospace">L1 · L2 · L3 Analysts</text>
                    <text x="570" y="308" fontSize="9" fill="#71717a" textAnchor="middle" fontFamily="monospace">Pentest · GRC · Architecture</text>
                  </svg>

                  {/* PART E - Mark Complete Button */}
                  <div className="flex justify-end mt-8">
                    <AnimatePresence mode="popLayout">
                      {!completedSections.has(0) ? (
                        <motion.button
                          key="incomplete"
                          onClick={() => setCompletedSections(prev => new Set([...prev, 0]))}
                          className="border border-emerald-400 text-emerald-400 text-xs font-medium px-4 py-2 rounded-lg hover:bg-emerald-400/10 transition-colors"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                          Mark Complete
                        </motion.button>
                      ) : (
                        <motion.div
                          key="complete"
                          className="bg-emerald-400 text-black text-xs font-medium px-4 py-2 rounded-lg flex items-center gap-1 cursor-default"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        >
                          <Check size={12} /> Completed
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )}

              {/* TAB 2 */}
              {activeTab === 1 && (
                <div>
                  <motion.h2 className="text-2xl font-bold text-slate-100 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SOC Capabilities & Functions</motion.h2>
                  
                  <TerminalTyping />

                  <div className="flex flex-wrap items-center justify-center gap-6 mt-12 mb-8">
                    {['Monitor', 'Detect', 'Analyze', 'Respond', 'Report', 'Improve'].map((lbl, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.15 }} className="group cursor-pointer">
                        <svg viewBox="0 0 100 115" className="w-[100px] h-[115px]">
                          <polygon 
                             points="50,2 96,27 96,87 50,113 4,87 4,27" 
                             fill="#0f172a" 
                             stroke="#22d3ee" 
                             strokeWidth="2" 
                             className="transition-colors group-hover:fill-[#22d3ee33]"
                          />
                          <text x="50" y="60" fill="#f4f4f5" fontSize="12" fontWeight="bold" textAnchor="middle" pointerEvents="none">{lbl}</text>
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3 */}
              {activeTab === 2 && (
                <div>
                  <motion.h2 className="text-2xl font-bold text-slate-100 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SOC Workflow & Resources</motion.h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* People Column */}
                    <motion.div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col items-start" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.1 }}>
                      <div className="flex items-center gap-2 text-slate-100 font-bold text-lg mb-4"><Users className="text-cyan-400" size={20} /> People</div>
                      <div className="flex flex-wrap gap-2 mb-4 w-full">
                        {ROLES.map((r, i) => (
                          <div key={i} className="w-full">
                            <button onClick={() => setExpandedRole(expandedRole === i ? null : i)} className="w-full text-left bg-slate-800 hover:bg-slate-700 transition-colors rounded-full px-4 py-2 border border-slate-700">
                              <span className="text-cyan-400 text-sm font-semibold">{r.role}</span>
                            </button>
                            <AnimatePresence>
                              {expandedRole === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-slate-950 rounded-xl mt-2 mb-2 p-4 border border-slate-800 text-sm focus-within:ring-1">
                                  <ul className="list-disc pl-4 text-slate-300 space-y-1">
                                    {r.tasks.map((task, tIdx) => <li key={tIdx}>{task}</li>)}
                                  </ul>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Processes Column */}
                    <motion.div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.2 }}>
                      <div className="flex items-center gap-2 text-slate-100 font-bold text-lg mb-6"><GitBranch className="text-cyan-400" size={20} /> Processes</div>
                      <div className="flex flex-col gap-4 relative">
                         <div className="absolute left-3.5 top-0 bottom-6 w-0.5 bg-slate-800 z-0"></div>
                         {["Alert Intake", "Triage", "Escalation", "Incident Management", "Post-Incident Review"].map((step, i) => (
                           <div key={i} className="flex flex-row items-center gap-4 relative z-10 w-full mb-1">
                             <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-cyan-400 flex items-center justify-center shrink-0">
                               <span className="text-cyan-400 text-xs font-bold">{i+1}</span>
                             </div>
                             <div className="text-slate-300 font-medium bg-slate-800 px-4 py-2 rounded-lg w-full text-sm">{step}</div>
                           </div>
                         ))}
                      </div>
                    </motion.div>

                    {/* Technology Column */}
                    <motion.div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 flex flex-col" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once:true }} transition={{ delay: 0.3 }}>
                      <div className="flex items-center gap-2 text-slate-100 font-bold text-lg mb-6"><Cpu className="text-cyan-400" size={20} /> Technology</div>
                      <div className="flex flex-col gap-3 h-full justify-start">
                        {[{ n: 'SIEM', i: Shield }, { n: 'EDR', i: Monitor }, { n: 'Firewall', i: Server }, { n: 'Ticketing System', i: FileText }, { n: 'Threat Intel Platform', i: Globe }].map((tech, i) => (
                          <div key={i} className="flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-lg w-full">
                            <tech.i className="text-slate-400" size={18} />
                            <span className="text-slate-200 text-sm font-medium">{tech.n}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Swimlane diagram */}
                  <div className="w-full bg-slate-900 rounded-2xl border border-slate-800 p-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <svg viewBox="0 0 700 180" className="w-[700px] h-[180px] mx-auto block font-sans">
                      <defs>
                        <marker id="arrowHead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 0 L 10 5 L 0 10 z" fill="#22d3ee" />
                        </marker>
                      </defs>
                      
                      <rect x="0" y="0" width="700" height="60" fill="transparent" />
                      <rect x="0" y="60" width="700" height="60" fill="#0f172a" />
                      <rect x="0" y="120" width="700" height="60" fill="transparent" />
                      <line x1="0" y1="60" x2="700" y2="60" stroke="#334155" strokeWidth="1" strokeDasharray="3 3"/>
                      <line x1="0" y1="120" x2="700" y2="120" stroke="#334155" strokeWidth="1" strokeDasharray="3 3"/>

                      <text x="15" y="35" fill="#52525b" fontSize="11" fontWeight="bold">Tier 1</text>
                      <text x="15" y="95" fill="#52525b" fontSize="11" fontWeight="bold">Tier 2</text>
                      <text x="15" y="155" fill="#52525b" fontSize="11" fontWeight="bold">Tier 3</text>

                      {/* Nodes */}
                      {[
                        { x: 80, y: 15, label: "Alert Generated", w: 100 },
                        { x: 220, y: 15, label: "L1 Triage", w: 80 },
                        { x: 340, y: 75, label: "L2 Analysis", w: 90 },
                        { x: 470, y: 135, label: "L3 Investigation", w: 100 },
                        { x: 600, y: 15, label: "Closure", w: 70 },
                        { x: 600, y: 135, label: "Escalation", w: 70 }
                      ].map((n, i) => (
                        <g key={i} transform={`translate(${n.x}, ${n.y})`}>
                          <rect width={n.w} height="30" rx="4" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
                          <text x={n.w/2} y="19" fill="#e4e4e7" fontSize="10" textAnchor="middle">{n.label}</text>
                        </g>
                      ))}

                      {/* Paths */}
                      <motion.path d="M 180 30 L 210 30" stroke="#22d3ee" strokeWidth="2" fill="none" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once:true }} />
                      <motion.path d="M 300 30 C 320 30, 320 90, 332 90" stroke="#22d3ee" strokeWidth="2" fill="none" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} viewport={{ once:true }} />
                      <motion.path d="M 430 90 C 450 90, 450 150, 462 150" stroke="#22d3ee" strokeWidth="2" fill="none" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.8 }} viewport={{ once:true }} />
                      
                      <motion.path d="M 570 150 L 592 150" stroke="#22d3ee" strokeWidth="2" fill="none" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 1.1 }} viewport={{ once:true }} />
                      
                      <motion.path d="M 260 45 L 260 100 C 260 110, 592 110, 615 45" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" fill="none" markerEnd="url(#arrowHead)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 1.4 }} viewport={{ once:true }} />
                    </svg>
                  </div>
                </div>
              )}

              {/* TAB 4 */}
              {activeTab === 3 && (
                <div>
                  <motion.h2 className="text-2xl font-bold text-slate-100 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SOC Operational Models</motion.h2>

                  <div className="w-full bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
                    <div className="hidden md:grid grid-cols-12 bg-slate-800/80 px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-700">
                      <div className="col-span-3">Model Name</div>
                      <div className="col-span-2">Deployment</div>
                      <div className="col-span-2">Cost</div>
                      <div className="col-span-2">Control</div>
                      <div className="col-span-3">Best For</div>
                    </div>
                    
                    <div className="flex flex-col divide-y divide-slate-800/50">
                      {SOC_MODELS.map((model, idx) => (
                        <div key={idx} className="flex flex-col">
                          <div 
                            onClick={() => setExpandedModel(expandedModel === idx ? null : idx)}
                            className="grid grid-cols-1 md:grid-cols-12 px-6 py-5 items-center cursor-pointer hover:bg-slate-800/30 transition-colors group relative"
                          >
                            <div className="col-span-3 text-slate-100 font-bold flex items-center gap-3">
                              {model.name}
                            </div>
                            <div className="col-span-2 text-slate-400 text-sm mt-1 md:mt-0"><span className="md:hidden font-semibold mr-2">Deployment:</span>{model.deployment}</div>
                            <div className="col-span-2 flex items-center text-sm text-slate-400 mt-1 md:mt-0"><span className="md:hidden font-semibold mr-2">Cost:</span>
                              <span className={`px-2 py-0.5 rounded text-xs border ${model.cost.includes('High') ? 'bg-red-400/10 border-red-400/30 text-red-400' : 'bg-green-400/10 border-green-400/30 text-green-400'}`}>
                                {model.cost}
                              </span>
                            </div>
                            <div className="col-span-2 text-slate-400 text-sm mt-1 md:mt-0"><span className="md:hidden font-semibold mr-2">Control:</span>{model.control}</div>
                            <div className="col-span-3 text-slate-400 text-sm mt-2 md:mt-0 pr-6 flex items-center justify-between">
                               <span className="truncate block"><span className="md:hidden font-semibold mr-2">Best For:</span>{model.bestFor}</span>
                               <motion.div animate={{ rotate: expandedModel === idx ? 180 : 0 }} className="absolute right-6 top-5 md:top-auto">
                                 <ChevronDown className="text-slate-500 group-hover:text-cyan-400 transition-colors" size={20} />
                               </motion.div>
                            </div>
                          </div>

                          <AnimatePresence>
                            {expandedModel === idx && (
                              <motion.div 
                                initial={{ height: 0, opacity: 0 }} 
                                animate={{ height: 'auto', opacity: 1 }} 
                                exit={{ height: 0, opacity: 0 }} 
                                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                                className="overflow-hidden bg-black border-t border-slate-800"
                              >
                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                    <h4 className="text-cyan-400 font-bold mb-3 uppercase tracking-wide text-xs">Pros</h4>
                                    <ul className="space-y-2">
                                      {model.pros.map((pro, pIdx) => (
                                        <li key={pIdx} className="flex gap-2 items-start text-sm text-slate-300">
                                          <div className="mt-0.5 bg-cyan-400/10 rounded-sm p-0.5"><Check size={12} className="text-cyan-400 shrink-0" /></div>
                                          {pro}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
                                    <h4 className="text-red-400 font-bold mb-3 uppercase tracking-wide text-xs">Cons</h4>
                                    <ul className="space-y-2">
                                      {model.cons.map((con, cIdx) => (
                                        <li key={cIdx} className="flex gap-2 items-start text-sm text-slate-300">
                                          <div className="mt-0.5 bg-red-400/10 rounded-sm p-0.5"><X size={12} className="text-red-400 shrink-0" /></div>
                                          {con}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5 */}
              {activeTab === 4 && (
                <div>
                  <motion.h2 className="text-2xl font-bold text-slate-100 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>SOC Maturity Models</motion.h2>

                  <div className="w-full overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 mb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    <svg viewBox="0 0 700 200" className="w-[700px] h-[200px] mx-auto overflow-visible block font-sans">
                      {/* Timeline Base */}
                      <line x1="50" y1="100" x2="650" y2="100" stroke="#1e293b" strokeWidth="4" />
                      <motion.line x1="50" y1="100" x2="650" y2="100" stroke="#22d3ee" strokeWidth="4" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1, ease: "easeInOut" }} viewport={{ once: true }} />

                      {MATURITY_LEVELS.map((level, i) => {
                        const x = 50 + (i * 150);
                        return (
                          <g key={i} className="cursor-pointer" onClick={() => setActiveMaturity(i)}>
                            <motion.circle cx={x} cy="100" r="14" fill="#0f172a" stroke="#22d3ee" strokeWidth="4" initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 + (i*0.2) }} viewport={{ once:true }} />
                            <text x={x} y="60" fill="#22d3ee" fontSize="11" fontWeight="bold" textAnchor="middle">{level.label}</text>
                            <text x={x} y="140" fill="#f4f4f5" fontSize="13" fontWeight="bold" textAnchor="middle">Level {i+1}</text>
                            <text x={x} y="160" fill="#a1a1aa" fontSize="11" textAnchor="middle">{level.name}</text>
                          </g>
                        )
                      })}
                    </svg>

                    <AnimatePresence mode="wait">
                      {activeMaturity !== null ? (
                        <motion.div 
                          key={activeMaturity}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mt-6 bg-slate-950 rounded-xl p-6 border border-cyan-400/30 w-full"
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <h4 className="text-xl font-bold text-slate-100">Level {activeMaturity+1}: {MATURITY_LEVELS[activeMaturity].name}</h4>
                            <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 font-bold text-xs rounded-full uppercase tracking-wider">{MATURITY_LEVELS[activeMaturity].label}</span>
                          </div>
                          <ul className="text-slate-300 space-y-2 list-disc pl-5">
                            {MATURITY_LEVELS[activeMaturity].traits.map((t, idx) => <li key={idx} className="text-sm">{t}</li>)}
                          </ul>
                        </motion.div>
                      ) : (
                        <div className="mt-6 h-[120px] rounded-xl border border-slate-800 border-dashed flex items-center justify-center text-slate-500 text-sm">
                           Click a timeline node above to view layer details.
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Flow Diagram */}
                  <div className="flex flex-row flex-wrap items-center justify-center gap-2 mt-12 w-full max-w-4xl mx-auto">
                    {["Reactive MSSP", "Log Monitoring SOC", "Detection-Focused SOC", "Threat-Hunting SOC"].map((item, i) => (
                      <React.Fragment key={i}>
                        <motion.div className="bg-slate-900 border border-slate-700 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-lg" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} viewport={{ once:true }}>
                          {item}
                        </motion.div>
                        {i < 3 && (
                          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: (i * 0.15) + 0.1 }} viewport={{ once:true }}>
                            <ChevronRight className="text-cyan-400" size={24} />
                          </motion.div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 6 */}
              {activeTab === 5 && (
                <div>
                  <motion.h2 className="text-2xl font-bold text-slate-100 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>KPIs, Challenges & Best Practices</motion.h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                     {KPIS.map((k, i) => (
                       <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md shadow-black/50">
                         <ArcGauge percent={k.percent} label={k.label} value={k.value} />
                       </div>
                     ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                    <div className="flex flex-col gap-4">
                      <h3 className="text-xl font-bold text-slate-100 mb-2 border-b border-slate-800 pb-2">Common SOC Challenges</h3>
                      <div className="flex flex-col gap-3">
                        {CHALLENGES.map((ch, i) => (
                          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                            <div 
                              onClick={() => setExpandedChallenge(expandedChallenge === i ? null : i)} 
                              className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-800/50 transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <AlertTriangle className="text-amber-400 shrink-0" size={18} />
                                <span className="font-semibold text-slate-200 text-sm">{ch.title}</span>
                              </div>
                              <motion.div animate={{ rotate: expandedChallenge === i ? 180 : 0 }}>
                                <ChevronDown className="text-slate-500 group-hover:text-amber-400 transition-colors" size={18} />
                              </motion.div>
                            </div>
                            <AnimatePresence>
                              {expandedChallenge === i && (
                                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="bg-black">
                                  <div className="px-5 py-4 border-t border-slate-800 text-sm">
                                    <p className="text-slate-400 mb-3">{ch.desc}</p>
                                    <div className="bg-cyan-400/10 border border-cyan-400/20 p-3 rounded-lg flex items-start gap-2">
                                      <Shield size={16} className="text-cyan-400 shrink-0 mt-0.5"/>
                                      <p className="text-cyan-400/90 text-xs font-semibold leading-relaxed">{ch.mitigation}</p>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                       <h3 className="text-xl font-bold text-slate-100 mb-2 border-b border-slate-800 pb-2">Operational Best Practices</h3>
                       <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col gap-4">
                         <p className="text-sm text-slate-400 mb-2">Check off these operational milestones to lock in your maturity level and complete this module.</p>
                         
                         {BEST_PRACTICES.map((practice, i) => {
                           const isChecked = checkedPractices.has(i);
                           return (
                             <div 
                               key={i} 
                               onClick={() => {
                                 setCheckedPractices(prev => {
                                   const n = new Set(prev);
                                   if (n.has(i)) n.delete(i);
                                   else n.add(i);
                                   return n;
                                 });
                               }}
                               className="flex items-center gap-4 cursor-pointer group"
                             >
                               <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors overflow-hidden ${isChecked ? 'bg-cyan-400 border-cyan-400' : 'bg-slate-950 border-slate-600 group-hover:border-cyan-400/60'}`}>
                                 <AnimatePresence>
                                   {isChecked && (
                                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ type: "spring", bounce: 0.5 }}>
                                        <Check size={16} className="text-slate-900 font-bold" strokeWidth={3} />
                                      </motion.div>
                                   )}
                                 </AnimatePresence>
                               </div>
                               <span className={`text-sm tracking-wide transition-colors ${isChecked ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-cyan-400/80'}`}>
                                 {practice}
                               </span>
                             </div>
                           )
                         })}

                       </div>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Action Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex justify-end">
          {activeTab < 5 ? (
            <button 
               onClick={handleMarkComplete}
               disabled={completedSections.has(activeTab)}
               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${completedSections.has(activeTab) ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_15px_rgba(52,211,153,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)]'}`}
            >
              {completedSections.has(activeTab) ? <><CheckCircle size={18} /> Section Completed</> : "Mark Section Complete"}
            </button>
          ) : (
             <div className="flex items-center gap-4 text-sm font-semibold text-slate-500">
                {checkedPractices.size === 6 ? <span className="text-cyan-400 flex items-center gap-2"><CheckCircle size={18} /> All Requirements Met</span> : <span>Complete Checklist to Finish</span>}
             </div>
          )}
        </div>

      </div>
    </div>
  );
}
