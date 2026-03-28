import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, FileText, Server } from 'lucide-react';

/* ─────────────────────────────────────────────
   Intersection Observer hook (no heavy libs)
   ───────────────────────────────────────────── */
function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { setInView(true); return; }

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
            { threshold: 0.12, ...options }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return [ref, inView];
}

/* ─────────────────────────────────────────────
   Animated counter component (avoids hooks-in-map)
   ───────────────────────────────────────────── */
const AnimatedCounter = ({ target, inView, duration = 1500 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!inView) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { setCount(target); return; }
        const startTime = performance.now();
        function step(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }, [inView, target, duration]);
    return count;
};


/* ═══════════════════════════════════════════════
   BLOCK 1 — Hero
   ═══════════════════════════════════════════════ */
const HeroBlock = () => (
    <section className="text-center mb-28 soc-fade-in">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-12 transition-colors group text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
        </Link>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 soc-pulse-dot"></span>
            SOC Lab Project
        </div>

        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            SOC Lab — Network Segmentation<br />
            <span className="text-gradient">&amp; Threat Detection</span>
        </h1>

        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Simulated enterprise SOC using pfSense, Suricata, SafeLine WAF and Wazuh SIEM to demonstrate network segmentation, intrusion detection, web application firewalling, and centralized log monitoring in a virtualized multi-zone environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://github.com/nisha-sorallikar" target="_blank" rel="noopener noreferrer"
                className="btn-static-border cursor-pointer group">
                <span className="flex items-center gap-2">
                    <Github size={16} /> GitHub
                </span>
            </a>
            <a href="#documentation" className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors px-5 py-2.5 rounded-lg hover:bg-white/5 border border-white/10">
                <FileText size={16} /> Documentation
            </a>
        </div>
    </section>
);


/* ═══════════════════════════════════════════════
   BLOCK 2 — Animated Network Topology (all inline SVG styles)
   ═══════════════════════════════════════════════ */
const TopologyBlock = () => {
    const [ref, inView] = useInView();

    const svgText = (props) => ({
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        ...props
    });

    return (
        <section ref={ref} className={`mb-28 ${inView ? 'soc-fade-in' : 'opacity-0'}`}>
            <h2 className="text-2xl font-display font-bold text-white mb-2 text-center">Network Topology</h2>
            <p className="text-slate-500 text-sm text-center mb-8">Three isolated network zones connected via pfSense firewall</p>
            <div className="card-wrapper max-w-4xl mx-auto">
                <div className="card-content p-4 sm:p-8 overflow-x-auto">
                    <svg viewBox="0 0 820 520" style={{ width: '100%', height: 'auto', minWidth: 620 }} xmlns="http://www.w3.org/2000/svg">

                        {/* ─── LAN Zone ─── */}
                        <rect x="40" y="150" width="230" height="200" rx="14" fill="rgba(45,212,191,0.04)" stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.6" />
                        <text x="155" y="180" textAnchor="middle" style={svgText({ fontSize: 12, fill: '#2dd4bf' })}>LAN — 192.168.10.0/24</text>
                        {/* Wazuh Manager box */}
                        <rect x="75" y="205" width="160" height="36" rx="8" fill="rgba(13,148,136,0.15)" stroke="#2dd4bf" strokeWidth="0.8" strokeOpacity="0.4" />
                        <text x="155" y="228" textAnchor="middle" style={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>Wazuh Manager</text>
                        {/* Windows / Lubuntu box */}
                        <rect x="75" y="260" width="160" height="36" rx="8" fill="rgba(13,148,136,0.08)" stroke="#2dd4bf" strokeWidth="0.5" strokeOpacity="0.25" />
                        <text x="155" y="283" textAnchor="middle" style={{ fontSize: 11, fill: '#64748b', fontFamily: 'Inter, sans-serif' }}>Windows / Lubuntu</text>
                        {/* Wazuh icon */}
                        <circle cx="155" cy="320" r="8" fill="rgba(45,212,191,0.15)" stroke="#2dd4bf" strokeWidth="0.5" />
                        <text x="155" y="324" textAnchor="middle" style={{ fontSize: 7, fill: '#2dd4bf' }}>W</text>

                        {/* ─── DMZ Zone ─── */}
                        <rect x="510" y="130" width="270" height="230" rx="14" fill="rgba(245,158,11,0.04)" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.6" />
                        <text x="645" y="160" textAnchor="middle" style={svgText({ fontSize: 12, fill: '#f59e0b' })}>DMZ — 192.168.20.0/24</text>
                        {/* SafeLine WAF box */}
                        <rect x="545" y="185" width="200" height="40" rx="8" fill="rgba(180,83,9,0.15)" stroke="#f59e0b" strokeWidth="0.8" strokeOpacity="0.4" />
                        <text x="645" y="210" textAnchor="middle" style={{ fontSize: 12, fill: '#fbbf24', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>SafeLine WAF :443</text>
                        {/* DVWA box */}
                        <rect x="545" y="248" width="200" height="40" rx="8" fill="rgba(180,83,9,0.08)" stroke="#f59e0b" strokeWidth="0.5" strokeOpacity="0.25" />
                        <text x="645" y="273" textAnchor="middle" style={{ fontSize: 12, fill: '#94a3b8', fontFamily: 'Inter, sans-serif' }}>DVWA :8080</text>
                        {/* WAF → DVWA connector */}
                        <line x1="645" y1="225" x2="645" y2="248" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                        {/* Arrow head */}
                        <polygon points="641,246 645,252 649,246" fill="#f59e0b" opacity="0.3" />

                        {/* ─── TEST Zone (Kali) ─── */}
                        <rect x="310" y="370" width="200" height="110" rx="14" fill="rgba(239,68,68,0.04)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="8 5" opacity="0.6" />
                        <text x="410" y="400" textAnchor="middle" style={svgText({ fontSize: 12, fill: '#ef4444' })}>TEST — 192.168.30.0/24</text>
                        <rect x="355" y="418" width="110" height="32" rx="8" fill="rgba(239,68,68,0.1)" stroke="#ef4444" strokeWidth="0.5" strokeOpacity="0.3" />
                        <text x="410" y="439" textAnchor="middle" style={{ fontSize: 11, fill: '#f87171', fontFamily: 'Inter, sans-serif' }}>Kali Linux</text>

                        {/* ─── pfSense Central Node ─── */}
                        <rect x="345" y="40" width="130" height="54" rx="12" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                        <text x="410" y="72" textAnchor="middle" style={svgText({ fontSize: 14, fill: '#60a5fa' })}>pfSense</text>
                        {/* Pulse ring */}
                        <circle cx="410" cy="67" r="34" fill="none" stroke="#3b82f6" strokeWidth="0.7" opacity="0.15" className="soc-pulse-ring" />
                        <circle cx="410" cy="67" r="42" fill="none" stroke="#3b82f6" strokeWidth="0.3" opacity="0.08" className="soc-pulse-ring" />

                        {/* ─── Connection lines ─── */}
                        {/* pfSense → LAN */}
                        <line x1="345" y1="75" x2="270" y2="210" stroke="#2dd4bf" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.25" />
                        <polygon points="267,206 273,206 270,212" fill="#2dd4bf" opacity="0.3" />

                        {/* pfSense → DMZ */}
                        <line x1="475" y1="75" x2="545" y2="200" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.25" />
                        <polygon points="543,196 549,196 546,203" fill="#f59e0b" opacity="0.3" />

                        {/* pfSense → TEST */}
                        <line x1="410" y1="94" x2="410" y2="370" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="6 4" opacity="0.25" />
                        <polygon points="406,366 410,373 414,366" fill="#ef4444" opacity="0.3" />


                        {/* ─── ANIMATED ATTACK PATH (red dot: Kali → pfSense → WAF → BLOCKED) ─── */}
                        <path d="M 410 435 L 410 67 L 645 205" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="5 5" opacity="0.12" />

                        {/* Red dot with glow */}
                        <circle r="6" fill="#ef4444" opacity="0.9" style={{ filter: 'drop-shadow(0 0 8px rgba(239,68,68,0.8))' }}>
                            <animateMotion dur="4s" repeatCount="indefinite"
                                keyPoints="0;0.45;0.9;0.9;1;1"
                                keyTimes="0;0.35;0.65;0.72;0.8;1"
                                calcMode="linear">
                                <mpath href="#redPath" />
                            </animateMotion>
                        </circle>
                        <path id="redPath" d="M 410 435 L 410 67 L 645 205" fill="none" />

                        {/* Block X flash at WAF */}
                        <g opacity="0">
                            <animate attributeName="opacity" values="0;0;0;0;0;1;0.6;0;0" dur="4s" repeatCount="indefinite" />
                            <line x1="632" y1="192" x2="658" y2="218" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
                            <line x1="658" y1="192" x2="632" y2="218" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />
                            {/* Red flash glow */}
                            <circle cx="645" cy="205" r="20" fill="none" stroke="#ef4444" strokeWidth="2" opacity="0.5">
                                <animate attributeName="r" values="15;25;15" dur="0.4s" begin="2.6s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="0.5;0;0.5" dur="0.4s" begin="2.6s" repeatCount="indefinite" />
                            </circle>
                        </g>


                        {/* ─── ANIMATED CLEAN TRAFFIC (green dot: Kali → pfSense → WAF → DVWA) ─── */}
                        <path d="M 410 435 L 410 67 L 645 205 L 645 268" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="5 5" opacity="0.08" />

                        <circle r="5" fill="#22c55e" opacity="0.85" style={{ filter: 'drop-shadow(0 0 6px rgba(34,197,94,0.7))' }}>
                            <animateMotion dur="4s" repeatCount="indefinite" begin="2s"
                                keyPoints="0;0.35;0.7;1;1"
                                keyTimes="0;0.3;0.6;0.85;1"
                                calcMode="linear">
                                <mpath href="#greenPath" />
                            </animateMotion>
                        </circle>
                        <path id="greenPath" d="M 410 435 L 410 67 L 645 205 L 645 268" fill="none" />

                        {/* Green checkmark flash at DVWA */}
                        <g opacity="0">
                            <animate attributeName="opacity" values="0;0;0;0;0;0;0;1;0.5;0" dur="4s" repeatCount="indefinite" begin="2s" />
                            <circle cx="645" cy="268" r="12" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.4" />
                            <text x="645" y="273" textAnchor="middle" style={{ fontSize: 14, fill: '#22c55e' }}>✓</text>
                        </g>


                        {/* ─── Legend ─── */}
                        <rect x="40" y="488" width="200" height="24" rx="6" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                        <circle cx="58" cy="500" r="4" fill="#ef4444" />
                        <text x="70" y="504" style={{ fontSize: 9, fill: '#64748b', fontFamily: 'Inter, sans-serif' }}>Blocked attack</text>
                        <circle cx="155" cy="500" r="4" fill="#22c55e" />
                        <text x="167" y="504" style={{ fontSize: 9, fill: '#64748b', fontFamily: 'Inter, sans-serif' }}>Clean traffic</text>

                    </svg>
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   BLOCK 3 — Defense Layers (staggered slide-in)
   ═══════════════════════════════════════════════ */
const defenseLayers = [
    {
        label: 'pfSense', desc: 'Network segmentation · ACL rules · NAT', color: '#3b82f6',
        icon: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/><circle cx="5.5" cy="6.5" r="0.8" fill={c}/><circle cx="8.5" cy="6.5" r="0.8" fill={c}/><path d="M6 14h4M14 14h4M6 17h3M14 17h2"/><line x1="12" y1="9" x2="12" y2="20" strokeDasharray="2 2" opacity="0.4"/></svg>,
    },
    {
        label: 'Suricata', desc: 'Deep packet inspection · signature detection', color: '#a855f7',
        icon: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4"/><path d="M3 12h4M17 12h4"/><path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8"/><path d="M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill={c}/></svg>,
    },
    {
        label: 'SafeLine WAF', desc: 'SQLi · XSS · CMDi · LFI blocking', color: '#f59e0b',
        icon: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v6c0 5.5 3.8 10.3 9 11.5 5.2-1.2 9-6 9-11.5V7l-9-5z"/><path d="M8 12h8M8 15h5"/><circle cx="17" cy="7" r="3" fill="none" stroke={c} strokeWidth="1.4"/><path d="M15.6 8.4l2.8-2.8" strokeWidth="1.4"/></svg>,
    },
    {
        label: 'Wazuh SIEM', desc: 'Log collection · FIM · SSH monitoring', color: '#22d3ee',
        icon: (c) => <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20"/><circle cx="5" cy="5.5" r="0.7" fill={c}/><circle cx="7.5" cy="5.5" r="0.7" fill={c}/><circle cx="10" cy="5.5" r="0.7" fill={c}/><path d="M5 12l2 3 3-5 2 2 3-4 2 3" strokeWidth="1.4"/><rect x="5" y="17" width="3" height="2" rx="0.5" fill={c} opacity="0.3"/><rect x="10" y="16" width="3" height="3" rx="0.5" fill={c} opacity="0.3"/><rect x="15" y="15" width="3" height="4" rx="0.5" fill={c} opacity="0.3"/></svg>,
    },
];

const DefenseBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Defense Layers
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-10 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Four layers of defense stacked to protect the enterprise environment
            </p>
            <div className="max-w-3xl mx-auto space-y-4">
                {defenseLayers.map((layer, i) => {
                    return (
                        <div
                            key={layer.label}
                            style={{
                                opacity: inView ? 1 : 0,
                                transform: inView ? 'translateX(0)' : 'translateX(-80px)',
                                transition: `all 400ms ease-out ${i * 150}ms`,
                                borderLeft: `3px solid ${layer.color}`,
                            }}
                        >
                            <div className="flex items-center gap-4 px-6 py-5 rounded-r-xl bg-white/[0.02] border border-white/[0.06] border-l-0 backdrop-blur-sm hover:bg-white/[0.04] transition-colors">
                                <div className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: `${layer.color}15`, border: `1px solid ${layer.color}30` }}>
                                    {layer.icon(layer.color)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-display font-bold text-white text-sm mb-0.5">{layer.label}</h3>
                                    <p className="text-slate-400 text-xs">{layer.desc}</p>
                                </div>
                                <div className="w-2.5 h-2.5 rounded-full shrink-0 soc-pulse-dot" style={{ background: layer.color }} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   BLOCK 4 — Attack Flow (sequential stepper)
   ═══════════════════════════════════════════════ */
const attackSteps = [
    { label: 'Kali', sub: 'Attacker', color: '#ef4444' },
    { label: 'pfSense', sub: 'Firewall', color: '#3b82f6' },
    { label: 'WAF', sub: 'Filter', color: '#f59e0b' },
    { label: 'Decision', sub: 'Block / Allow', color: '#a855f7', isDecision: true },
    { label: 'DVWA', sub: 'Target', color: '#22c55e' },
];

const AttackFlowBlock = () => {
    const [ref, inView] = useInView();
    const [activeStep, setActiveStep] = useState(-1);

    useEffect(() => {
        if (!inView) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) { setActiveStep(4); return; }

        let i = 0;
        const interval = setInterval(() => {
            setActiveStep(i);
            i++;
            if (i >= attackSteps.length) clearInterval(interval);
        }, 600);
        return () => clearInterval(interval);
    }, [inView]);

    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Attack Flow
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-10 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Traffic path from attacker through security layers to target
            </p>
            <div className="max-w-4xl mx-auto overflow-x-auto pb-4">
                <div className="flex items-start justify-between gap-0 px-4" style={{ minWidth: 560 }}>
                    {attackSteps.map((step, i) => {
                        const isActive = i <= activeStep;
                        const isCurrent = i === activeStep;
                        return (
                            <React.Fragment key={step.label}>
                                <div className="flex flex-col items-center shrink-0" style={{ width: 80 }}>
                                    <div
                                        className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold font-display border-2"
                                        style={{
                                            background: isActive ? `${step.color}15` : 'rgba(255,255,255,0.02)',
                                            borderColor: isActive ? `${step.color}60` : 'rgba(255,255,255,0.06)',
                                            color: isActive ? step.color : '#334155',
                                            boxShadow: isCurrent ? `0 0 30px ${step.color}30, 0 0 60px ${step.color}10` : 'none',
                                            transform: isActive ? 'scale(1)' : 'scale(0.85)',
                                            transition: 'all 500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        }}
                                    >
                                        {step.isDecision ? (
                                            <div className="flex gap-1.5 text-lg">
                                                <span style={{ color: '#ef4444' }}>✕</span>
                                                <span style={{ color: '#22c55e' }}>✓</span>
                                            </div>
                                        ) : (
                                            <span style={{ fontSize: 11 }}>{step.label}</span>
                                        )}
                                    </div>
                                    <span className="text-xs mt-3 font-display font-semibold" style={{ color: isActive ? step.color : '#475569', transition: 'color 400ms' }}>
                                        {step.label}
                                    </span>
                                    <span className="text-[10px] mt-0.5" style={{ color: '#64748b' }}>{step.sub}</span>
                                </div>
                                {i < attackSteps.length - 1 && (
                                    <div className="flex-1 flex items-center" style={{ height: 64 }}>
                                        <div className="w-full h-0.5 rounded-full"
                                            style={{
                                                background: i < activeStep
                                                    ? `linear-gradient(to right, ${step.color}, ${attackSteps[i + 1].color})`
                                                    : 'rgba(255,255,255,0.06)',
                                                transition: 'background 600ms ease',
                                                boxShadow: i < activeStep ? `0 0 8px ${step.color}30` : 'none',
                                            }}
                                        />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* WAF glow indicators below stepper */}
                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        <span className="text-xs text-red-400 font-medium">Blocked payloads → red glow on WAF</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span className="text-xs text-green-400 font-medium">Clean traffic → passes through</span>
                    </div>
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   BLOCK 5 — WAF Test Results Table
   ═══════════════════════════════════════════════ */
const testResults = [
    { attack: 'Command injection', payload: '127.0.0.1; whoami', tool: 'SafeLine WAF', result: 'Blocked', emoji: '🔴', status: 'red' },
    { attack: 'File inclusion', payload: '?page=../../../etc', tool: 'SafeLine WAF', result: 'Blocked', emoji: '🔴', status: 'red' },
    { attack: 'File upload', payload: 'php-reverse-shell.php', tool: 'SafeLine WAF', result: 'Blocked', emoji: '🔴', status: 'red' },
    { attack: 'SQL injection', payload: "admin' OR '1'='1", tool: 'SafeLine WAF', result: 'Blocked', emoji: '🔴', status: 'red' },
    { attack: 'XSS', payload: "<script>alert('XSS')</script>", tool: 'SafeLine WAF', result: 'Blocked', emoji: '🔴', status: 'red' },
    { attack: 'NIDS test traffic', payload: 'curl testmynids.org', tool: 'Suricata', result: 'Detected', emoji: '🟡', status: 'yellow' },
    { attack: 'SSH brute force', payload: 'ssh wronguser@host', tool: 'Wazuh', result: 'Detected', emoji: '🟡', status: 'yellow' },
    { attack: 'FIM — file created', payload: 'touch samplefile.txt', tool: 'Wazuh FIM', result: 'Detected', emoji: '🟡', status: 'yellow' },
];

const ResultsTableBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                WAF &amp; SIEM Test Results
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-10 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Real attack payloads tested against the defense stack
            </p>
            <div className="card-wrapper max-w-5xl mx-auto">
                <div className="card-content overflow-x-auto">
                    <table className="w-full text-sm" style={{ minWidth: 640 }}>
                        <thead>
                            <tr className="border-b border-white/10 text-left">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Attack</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Payload</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tool</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testResults.map((row, i) => (
                                <tr
                                    key={i}
                                    className="border-b border-white/5 hover:bg-white/[0.03] transition-colors"
                                    style={{
                                        opacity: inView ? 1 : 0,
                                        transform: inView ? 'translateY(0)' : 'translateY(12px)',
                                        transition: `all 400ms ease-out ${i * 80}ms`,
                                    }}
                                >
                                    <td className="px-6 py-4 text-slate-200 font-medium">{row.attack}</td>
                                    <td className="px-6 py-4">
                                        <code className="text-xs bg-slate-900/80 px-2.5 py-1 rounded border border-white/5 text-cyan-300 font-mono">
                                            {row.payload}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">{row.tool}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-2 text-xs font-bold ${row.status === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                                            <span>{row.emoji}</span>
                                            {row.result}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   BLOCK 6 — Monitoring Pipeline (animated data flow)
   ═══════════════════════════════════════════════ */
const pipelineStages = [
    { lines: ['Network', 'Traffic'], color: '#64748b' },
    { lines: ['Suricata'], color: '#a855f7' },
    { lines: ['eve.json'], color: '#22c55e' },
    { lines: ['Wazuh', 'Agent'], color: '#3b82f6' },
    { lines: ['Wazuh', 'Manager'], color: '#22d3ee' },
    { lines: ['Dashboard'], color: '#06b6d4' },
];

const PipelineBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Monitoring Pipeline
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-10 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Data flow from network capture to centralized dashboard
            </p>
            <div className={`card-wrapper max-w-5xl mx-auto transition-all duration-600 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                <div className="card-content p-6 sm:p-10 overflow-x-auto">
                    <svg viewBox="0 0 860 130" style={{ width: '100%', height: 'auto', minWidth: 640 }} xmlns="http://www.w3.org/2000/svg">
                        {pipelineStages.map((stage, i) => {
                            const x = 70 + i * 144;
                            const c = stage.color;
                            return (
                                <g key={i}>
                                    {/* Node box */}
                                    <rect x={x - 52} y="30" width="104" height="56" rx="12"
                                        fill={`${c}10`} stroke={c} strokeWidth="1.2" strokeOpacity="0.5" />
                                    {/* Text lines */}
                                    {stage.lines.map((line, li) => (
                                        <text key={li} x={x} y={stage.lines.length === 1 ? 64 : 54 + li * 16}
                                            textAnchor="middle"
                                            style={{ fontSize: 11, fill: c, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
                                            {line}
                                        </text>
                                    ))}
                                    {/* Connector arrow */}
                                    {i < pipelineStages.length - 1 && (
                                        <>
                                            <line x1={x + 52} y1="58" x2={x + 92} y2="58"
                                                stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" strokeDasharray="4 3" />
                                            <polygon points={`${x + 88},54 ${x + 94},58 ${x + 88},62`} fill="rgba(255,255,255,0.15)" />
                                        </>
                                    )}
                                </g>
                            );
                        })}
                        {/* Animated flowing dot */}
                        <circle r="5" fill="#22d3ee" opacity="0.9" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.8))' }}>
                            <animateMotion dur="3s" repeatCount="indefinite" calcMode="linear"
                                path={`M 70 58 L ${70 + 5 * 144} 58`} />
                        </circle>
                    </svg>
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   BLOCK 7 — Key Stats Strip
   ═══════════════════════════════════════════════ */
const stats = [
    { value: 3, label: 'Network zones isolated', color: '#2dd4bf' },
    { value: 5, label: 'Attack types blocked', color: '#ef4444' },
    { value: 4, label: 'Security tools integrated', color: '#3b82f6' },
    { value: 1, label: 'Centralized SIEM dashboard', color: '#22d3ee' },
];

/* Individual stat card — each is its own component so hooks are safe */
const StatCard = ({ stat, index, inView }) => {
    return (
        <div
            className="text-center p-8 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-sm hover:bg-white/[0.04] transition-colors"
            style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 500ms ease-out ${index * 120}ms`,
            }}
        >
            <div className="text-5xl font-display font-bold mb-3" style={{ color: stat.color }}>
                <AnimatedCounter target={stat.value} inView={inView} />
            </div>
            <p className="text-slate-400 text-xs leading-snug">{stat.label}</p>
        </div>
    );
};

const StatsBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-16">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                At a Glance
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-10 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Key metrics from the SOC Lab environment
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, i) => (
                    <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
                ))}
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   DOCUMENTATION — Project Overview
   ═══════════════════════════════════════════════ */
const OverviewBlock = () => {
    const [ref, inView] = useInView();
    const objectives = [
        'Simulate a multi-zone enterprise network in a safe, virtualized environment',
        'Implement network segmentation using pfSense firewall with strict ACL rules',
        'Deploy Suricata IDS for deep packet inspection and real-time alerting',
        'Configure SafeLine WAF to protect web applications against OWASP Top 10 attacks',
        'Centralize log monitoring with Wazuh SIEM for FIM, SSH brute-force detection, and compliance',
        'Validate the defense stack by executing real-world attack simulations from Kali Linux',
    ];

    return (
        <section id="documentation" ref={ref} className="mb-28 scroll-mt-32">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Project Documentation
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-12 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Comprehensive overview, configuration details, and key findings
            </p>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Overview Card */}
                <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 400ms ease-out' }}>
                    <div className="card-wrapper">
                        <div className="card-content p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                                    <FileText size={18} className="text-cyan-400" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-white">Project Overview</h3>
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                This project demonstrates an end-to-end Security Operations Center (SOC) lab built entirely using open-source tools in a virtualized environment. The lab simulates a real enterprise network divided into three isolated zones — LAN, DMZ, and TEST — connected through a pfSense firewall. Each zone serves a distinct purpose: the LAN hosts the Wazuh SIEM manager along with endpoint clients, the DMZ exposes a deliberately vulnerable web application (DVWA) behind a SafeLine WAF, and the TEST zone provides an attacker machine (Kali Linux) for controlled penetration testing.
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                The primary goal is to validate a layered defense-in-depth strategy by launching real attack payloads and verifying that each security layer — firewall rules, intrusion detection signatures, WAF filters, and SIEM alerts — responds correctly.
                            </p>

                            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Objectives</h4>
                            <ul className="space-y-3">
                                {objectives.map((obj, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateX(0)' : 'translateX(-20px)', transition: `all 400ms ease-out ${200 + i * 80}ms` }}>
                                        <span className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-cyan-400 font-bold">{i + 1}</span>
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Environment Card */}
                <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 400ms ease-out 200ms' }}>
                    <div className="card-wrapper">
                        <div className="card-content p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Server size={18} className="text-blue-400" />
                                </div>
                                <h3 className="font-display font-bold text-lg text-white">Lab Environment</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Platform</h4>
                                    <ul className="space-y-2 text-sm text-slate-400">
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Hypervisor: Oracle VirtualBox 7.x</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Host OS: Windows 11</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>VMs: 5 virtual machines total</li>
                                        <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>Internal networks: 3 isolated subnets</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Network Addressing</h4>
                                    <div className="space-y-2 font-mono text-xs">
                                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-teal-500/5 border border-teal-500/10">
                                            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                                            <span className="text-teal-300">LAN</span>
                                            <span className="text-slate-500 ml-auto">192.168.10.0/24</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                                            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                            <span className="text-amber-300">DMZ</span>
                                            <span className="text-slate-500 ml-auto">192.168.20.0/24</span>
                                        </div>
                                        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/10">
                                            <span className="w-2 h-2 rounded-full bg-red-400"></span>
                                            <span className="text-red-300">TEST</span>
                                            <span className="text-slate-500 ml-auto">192.168.30.0/24</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   DOCUMENTATION — Tool Configurations
   ═══════════════════════════════════════════════ */
const toolConfigs = [
    {
        name: 'pfSense Firewall',
        color: '#3b82f6',
        icon: (c) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 9h20"/><circle cx="5.5" cy="6.5" r="0.8" fill={c}/><circle cx="8.5" cy="6.5" r="0.8" fill={c}/><path d="M6 14h4M14 14h4M6 17h3M14 17h2"/><line x1="12" y1="9" x2="12" y2="20" strokeDasharray="2 2" opacity="0.4"/></svg>,
        desc: 'Acts as the central router between all three zones. Configured with strict ACL rules to control inter-zone traffic flow and NAT for outbound connectivity.',
        config: [
            '# Interface Assignments',
            'LAN  → vtnet1 → 192.168.10.1/24',
            'DMZ  → vtnet2 → 192.168.20.1/24',
            'TEST → vtnet3 → 192.168.30.1/24',
            '',
            '# Firewall Rules (simplified)',
            'PASS  TEST → DMZ:443    # Allow WAF access',
            'PASS  TEST → DMZ:8080   # Allow DVWA',
            'BLOCK TEST → LAN:*      # Isolate attacker',
            'PASS  LAN  → ANY        # LAN full access',
        ],
    },
    {
        name: 'Suricata IDS',
        color: '#a855f7',
        icon: (c) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="1" fill={c}/></svg>,
        desc: 'Deployed on the pfSense box monitoring the DMZ interface. Uses ET Open rulesets for signature-based detection. Outputs structured alerts to eve.json for Wazuh ingestion.',
        config: [
            '# /etc/suricata/suricata.yaml',
            'af-packet:',
            '  - interface: vtnet2  # DMZ iface',
            '',
            'rule-files:',
            '  - et-open.rules',
            '  - custom-nids.rules',
            '',
            '# eve-log output → /var/log/suricata/eve.json',
            '# Forwarded to Wazuh Agent via ossec.conf',
        ],
    },
    {
        name: 'SafeLine WAF',
        color: '#f59e0b',
        icon: (c) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L3 7v6c0 5.5 3.8 10.3 9 11.5 5.2-1.2 9-6 9-11.5V7l-9-5z"/><path d="M8 12h8M8 15h5"/></svg>,
        desc: 'Deployed as a reverse proxy in the DMZ zone on port 443. All traffic to DVWA (:8080) is routed through SafeLine for inspection. Blocks SQLi, XSS, CMDi, LFI, and malicious file uploads using semantic analysis.',
        config: [
            '# SafeLine Configuration',
            'Listen Port:     443 (HTTPS)',
            'Upstream:        127.0.0.1:8080 (DVWA)',
            'Mode:            Reverse Proxy',
            '',
            '# Protection Modules Enabled',
            '✓ SQL Injection Detection',
            '✓ XSS Filter (reflected + stored)',
            '✓ Command Injection Blocker',
            '✓ Path Traversal / LFI Guard',
            '✓ File Upload Scanner',
        ],
    },
    {
        name: 'Wazuh SIEM',
        color: '#22d3ee',
        icon: (c) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20"/><circle cx="5" cy="5.5" r="0.7" fill={c}/><circle cx="7.5" cy="5.5" r="0.7" fill={c}/><path d="M5 12l2 3 3-5 2 2 3-4 2 3" strokeWidth="1.4"/><rect x="5" y="17" width="3" height="2" rx="0.5" fill={c} opacity="0.3"/><rect x="10" y="16" width="3" height="3" rx="0.5" fill={c} opacity="0.3"/></svg>,
        desc: 'Wazuh Manager runs on the LAN zone, collecting logs from agents deployed on DVWA server and pfSense. Provides centralized alerting, file integrity monitoring (FIM), and SSH brute-force detection.',
        config: [
            '# /var/ossec/etc/ossec.conf (Agent)',
            '<localfile>',
            '  <log_format>json</log_format>',
            '  <location>/var/log/suricata/eve.json</location>',
            '</localfile>',
            '',
            '# FIM Configuration',
            '<syscheck>',
            '  <directories check_all="yes">/var/www</directories>',
            '  <frequency>300</frequency>',
            '</syscheck>',
        ],
    },
];

const ToolConfigBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Tool Configuration
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-12 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                How each security tool was deployed and configured
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
                {toolConfigs.map((tool, i) => {
                    return (
                        <div key={tool.name} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(24px)', transition: `all 500ms ease-out ${i * 120}ms` }}>
                            <div className="card-wrapper">
                                <div className="card-content p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}>
                                            {tool.icon(tool.color)}
                                        </div>
                                        <h3 className="font-display font-bold text-lg text-white">{tool.name}</h3>
                                        <div className="w-2 h-2 rounded-full soc-pulse-dot ml-auto" style={{ background: tool.color }}></div>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6">{tool.desc}</p>

                                    {/* Terminal-style config */}
                                    <div className="bg-black/60 rounded-xl border border-white/5 overflow-hidden">
                                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-black/40">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
                                            <span className="text-[10px] text-slate-600 ml-2 font-mono">{tool.name.toLowerCase().replace(/ /g, '_')}.conf</span>
                                        </div>
                                        <pre className="p-4 font-mono text-xs leading-relaxed overflow-x-auto custom-scrollbar">
                                            {tool.config.map((line, li) => (
                                                <div key={li} style={{ opacity: inView ? 1 : 0, transition: `opacity 300ms ease-out ${400 + i * 120 + li * 40}ms` }}>
                                                    {line.startsWith('#') || line.startsWith('//') ? (
                                                        <span className="text-slate-600">{line}</span>
                                                    ) : line.startsWith('✓') ? (
                                                        <span className="text-green-400">{line}</span>
                                                    ) : line.startsWith('PASS') ? (
                                                        <span><span className="text-green-400">PASS </span><span className="text-slate-300">{line.slice(5)}</span></span>
                                                    ) : line.startsWith('BLOCK') ? (
                                                        <span><span className="text-red-400">BLOCK</span><span className="text-slate-300">{line.slice(5)}</span></span>
                                                    ) : line === '' ? (
                                                        <br />
                                                    ) : (
                                                        <span className="text-slate-300">{line}</span>
                                                    )}
                                                </div>
                                            ))}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   DOCUMENTATION — Key Findings & Lessons
   ═══════════════════════════════════════════════ */
const findings = [
    { title: 'WAF Blocked 100% of OWASP Top 5 Attacks', desc: 'SafeLine WAF successfully blocked SQLi, XSS, command injection, file inclusion, and malicious file uploads without any false negatives during controlled testing.', color: '#22c55e' },
    { title: 'Suricata Detected ET Open Signatures in Real-Time', desc: 'Suricata\'s ET Open ruleset flagged test traffic to testmynids.org within seconds, generating structured eve.json alerts that Wazuh ingested immediately.', color: '#a855f7' },
    { title: 'Wazuh FIM Caught Unauthorized File Changes', desc: 'File Integrity Monitoring detected new file creation and modification events in /var/www within the configured 300-second scan interval.', color: '#22d3ee' },
    { title: 'Network Segmentation Prevented Lateral Movement', desc: 'pfSense ACL rules ensured the Kali attacker in the TEST zone could not access the LAN zone directly, demonstrating effective network isolation.', color: '#3b82f6' },
    { title: 'SSH Brute-Force Detected After 5 Attempts', desc: 'Wazuh\'s active response module flagged repeated failed SSH login attempts from the TEST zone, triggering rule ID 5712 alerts in the dashboard.', color: '#f59e0b' },
    { title: 'End-to-End Visibility Achieved', desc: 'By forwarding Suricata and system logs to Wazuh, a single dashboard provided complete visibility across all three network zones — from network-level intrusions to application-layer attacks.', color: '#ef4444' },
];

const FindingsBlock = () => {
    const [ref, inView] = useInView();
    return (
        <section ref={ref} className="mb-28">
            <h2 className={`text-2xl font-display font-bold text-white mb-2 text-center transition-all duration-500 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                Key Findings &amp; Lessons Learned
            </h2>
            <p className={`text-slate-500 text-sm text-center mb-12 transition-all duration-500 delay-100 ${inView ? 'opacity-100' : 'opacity-0'}`}>
                Critical observations from the SOC Lab testing and monitoring phase
            </p>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5">
                {findings.map((f, i) => (
                    <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors group"
                        style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: `all 400ms ease-out ${i * 100}ms` }}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2.5 h-2.5 rounded-full soc-pulse-dot" style={{ background: f.color }}></div>
                            <h3 className="font-display font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">{f.title}</h3>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};


/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
const SOCLabProject = () => {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="max-w-6xl mx-auto">
            <HeroBlock />
            <TopologyBlock />
            <DefenseBlock />
            <AttackFlowBlock />
            <ResultsTableBlock />
            <PipelineBlock />
            <StatsBlock />
            <OverviewBlock />
            <ToolConfigBlock />
            <FindingsBlock />
        </div>
    );
};

export default SOCLabProject;
