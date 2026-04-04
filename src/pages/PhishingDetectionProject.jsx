import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Terminal, Shield, Clock, AlertTriangle, PlayCircle, Code, ChevronRight, 
    CheckCircle2, Network, Activity, Database, FileCode, Server, 
    Search, Mail, Download, Share2, UploadCloud, Eye, Bug, Lock, Map,
    ArrowRight, Box, Zap, Target, FileText, BookOpen, BarChart, ArrowLeft, Github, LayoutDashboard,
} from 'lucide-react';

const TopBar = ({ currentTime }) => (
    <div className="h-12 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 text-[10px] font-mono uppercase tracking-widest shrink-0 shadow-xl relative z-20">
        <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-teal-400 transition-colors group relative overflow-hidden">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Exit Pipeline
            </Link>
            <span className="flex items-center gap-2 text-teal-400 font-bold px-3 py-1 bg-teal-500/10 rounded-full border border-teal-500/30">
                <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(45,212,191,1)]"/> LIVE SIMULATION
            </span>
            <span className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-zinc-500">Emails Today: <span className="text-zinc-200 font-bold">342</span></span>
            <span className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-zinc-500">Malicious: <span className="text-red-400 font-bold drop-shadow-[0_0_5px_rgba(248,113,113,0.5)]">47</span></span>
            <span className="hidden lg:flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.5)] text-zinc-500">Agents Online: <span className="text-green-400 font-bold drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]">2/2</span></span>
        </div>
        <div className="text-zinc-500 flex items-center gap-6">
            <div className="flex items-center gap-3">
                Sys_Time: <span className="text-zinc-200 font-bold">{currentTime} UTC</span>
                <div className="w-3 h-3 rounded-full border-2 border-zinc-700 border-t-teal-400 animate-spin ml-2"/>
            </div>
        </div>
    </div>
);

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, colorClass, borderClass, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className={`p-5 rounded-xl border ${borderClass} bg-black/40 backdrop-blur-md shadow-2xl relative overflow-hidden group`}
    >
        <div className="flex justify-between items-start relative z-10">
            <div>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
                <h3 className={`text-3xl font-bold font-mono ${colorClass}`}>{value}</h3>
            </div>
            <div className={`p-2 rounded-lg bg-white/[0.03] ${colorClass}`}>
                <Icon size={20} />
            </div>
        </div>
        <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 group-hover:scale-110 transform">
            <Icon size={120} />
        </div>
    </motion.div>
);

// Sidebar Nav Item
const NavItem = ({ icon: Icon, label, active, onClick, delay, isSection }) => {
    if (isSection) {
        return (
            <div className="px-8 mt-6 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                <FileText size={10}/> {label}
            </div>
        );
    }
    return (
        <button onClick={onClick}
            className={`w-full flex items-center gap-4 px-8 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 text-left group relative
                ${active ? 'bg-gradient-to-r from-teal-500/20 to-transparent text-teal-400' : 'text-zinc-400 hover:bg-white/[0.03] hover:text-zinc-200'}`}>
            
            <AnimatePresence>
                {active && (
                    <motion.div layoutId="sidebar-active" className="absolute left-0 inset-y-0 w-1 bg-teal-400 shadow-[0_0_15px_teal]" />
                )}
            </AnimatePresence>

            <Icon size={16} className={`transition-transform duration-300 ${active ? 'text-teal-400 drop-shadow-[0_0_8px_teal]' : 'text-zinc-600 group-hover:text-teal-400 group-hover:drop-shadow-[0_0_8px_teal] group-hover:translate-x-1'}`}/>
            <span className="relative z-10">{label}</span>
        </button>
    );
};

const EmailInspectorContent = () => {
    const [view, setView] = useState('headers');
    const [isDetonating, setIsDetonating] = useState(false);
    const [progress, setProgress] = useState(0);

    const emailHeaders = [
        { key: 'Return-Path', value: '<bounce@smtp-relay-99.xyz>' },
        { key: 'From', value: '"PayPal Security" <noreply@paypa1-secure.ru>', status: 'SPOOFED' },
        { key: 'To', value: 'target@yourcompany.com' },
        { key: 'Subject', value: 'Your account has been suspended' },
        { key: 'SPF', value: 'fail (sender IP: 185.220.101.47)', status: 'FAIL' },
        { key: 'DKIM', value: 'fail (no signature)', status: 'FAIL' },
        { key: 'DMARC', value: 'fail (policy: quarantine)', status: 'FAIL' },
        { key: 'X-Originating-IP', value: '185.220.101.47' },
    ];

    const emailRaw = `Return-Path: <bounce@smtp-relay-99.xyz>
Received: from smtp-relay-99.xyz (185.220.101.47)
By mail.yourcompany.com with SMTP id 8fA2bC9;
Tue, 15 Mar 2024 09:14:32 +0000
From: "PayPal Security" <noreply@paypa1-secure.ru>
To: target@yourcompany.com
Subject: Your account has been suspended
Date: Tue, 15 Mar 2024 09:14:32 +0000
X-Originating-IP: 185.220.101.47
Authentication-Results: mx.yourcompany.com;
  spf=fail (sender IP is 185.220.101.47);
  dkim=fail (no signature present);
  dmarc=fail policy=quarantine;
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="BOUNDARY"

--BOUNDARY
Content-Type: text/html

<html><body>
Dear Customer,<br>
Your account has been restricted. Please <a href="http://paypa1-secure.ru/login?token=8fAf2b">verify your identity here</a>.
</body></html>

--BOUNDARY
Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document; name="invoice_march.docx"
Content-Transfer-Encoding: base64
Content-Disposition: attachment; filename="invoice_march.docx"

UEsDBBQABgAIAAAAIQA...`;

    const triggerDetonation = () => {
        setIsDetonating(true);
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsDetonating(false), 1000);
                    return 100;
                }
                return prev + 5;
            });
        }, 50);
    };

    return (
        <div className="grid lg:grid-cols-3 gap-6 h-[740px]">
            {/* Left: Interactive Email Forensics Container */}
            <div className="lg:col-span-2 flex flex-col bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="flex border-b border-white/5 bg-white/[0.02]">
                    {[
                        { id: 'headers', label: 'METADATA', icon: Shield },
                        { id: 'body', label: 'PREVIEW', icon: Mail },
                        { id: 'raw', label: 'RAW SOURCE', icon: Terminal },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setView(t.id)}
                            className={`flex items-center gap-2 px-8 py-5 text-[10px] font-bold tracking-[0.2em] transition-all relative ${
                                view === t.id ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
                            }`}
                        >
                            <t.icon size={14} className={view === t.id ? 'drop-shadow-[0_0_5px_teal]' : ''} />
                            {t.label}
                            {view === t.id && (
                                <motion.div 
                                    layoutId="inspector-tab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_15px_teal]"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        {view === 'headers' && (
                            <motion.div
                                key="view-metadat-headers"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
                                        <p className="text-[10px] text-red-400 font-bold mb-1 uppercase tracking-wider">Authentication</p>
                                        <p className="text-xl font-bold text-red-500">FAILED</p>
                                    </div>
                                    <div className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl">
                                        <p className="text-[10px] text-orange-400 font-bold mb-1 uppercase tracking-wider">Origin Risk</p>
                                        <p className="text-xl font-bold text-orange-500">CRITICAL</p>
                                    </div>
                                </div>
                                {emailHeaders.map((h, i) => (
                                    <div key={i} className="flex flex-col gap-1.5 p-4 bg-white/[0.01] border border-white/[0.03] rounded-xl hover:bg-white/[0.03] transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-mono text-teal-500 uppercase font-bold tracking-widest">{h.key}</span>
                                            {h.status && (
                                                <span className={`text-[9px] px-2.5 py-1 rounded-full font-bold shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                                                    h.status === 'FAIL' || h.status === 'SPOOFED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                }`}>
                                                    {h.status}
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-xs font-mono text-slate-300 break-all select-all">{h.value}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}

                        {view === 'body' && (
                            <motion.div
                                key="view-visual-preview"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative"
                            >
                                <div className="bg-slate-100 rounded-xl overflow-hidden shadow-2xl border border-slate-300">
                                    <div className="bg-slate-200 px-4 py-2 flex items-center gap-2 border-b border-slate-300">
                                        <div className="flex gap-1.5 mr-4">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                        </div>
                                        <div className="flex-1 bg-white rounded-md border border-slate-300 py-1 px-3 text-[10px] text-slate-500 font-mono italic">
                                            https://verify-center.paypa1-secure.ru/login?token=7xf3...
                                        </div>
                                    </div>
                                    <div className="p-8 text-slate-800 bg-white min-h-[400px] flex flex-col items-center">
                                        <div className="w-full flex justify-between items-center border-b pb-6 mb-8">
                                            <div className="text-2xl font-black text-[#003087] italic tracking-tighter">PayPal</div>
                                        </div>
                                        <div className="max-w-md w-full">
                                            <h2 className="text-xl font-bold text-slate-900 mb-4">Security Alert: Action Required</h2>
                                            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                                                We've detected an unauthorized sign-in attempt on your PayPal account. To protect your funds, we've temporarily limited your account access.
                                            </p>
                                            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
                                                <p className="text-xs text-amber-800 font-medium font-sans">Please verify your information immediately to restore full access to your account.</p>
                                            </div>
                                            <button className="w-full bg-[#0070ba] text-white py-4 rounded-full font-bold text-sm shadow-lg hover:shadow-xl hover:bg-[#005ea6] transition-all transform hover:-translate-y-0.5 active:translate-y-0 uppercase tracking-widest">
                                                Verification Center
                                            </button>
                                            <p className="mt-12 text-[10px] text-slate-400 text-center border-t border-slate-100 pt-6">
                                                Copyright © 1999-2024 PayPal. All rights reserved. Registered to: support@paypa1-secure.ru
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 pointer-events-none border-4 border-red-500/20 rounded-xl animate-pulse"></div>
                                <div className="absolute -top-4 -right-4 bg-red-600 text-white text-[10px] font-black px-4 py-2 rounded-lg shadow-2xl rotate-3 flex items-center gap-2 z-10">
                                    <AlertTriangle size={14} /> DANGER: PHISHING
                                </div>
                            </motion.div>
                        )}

                        {view === 'raw' && (
                            <motion.div
                                key="view-source-raw"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="font-mono text-xs bg-black/40 p-8 rounded-xl border border-white/5 text-zinc-400 leading-relaxed whitespace-pre-wrap selection:bg-teal-500/30 overflow-x-hidden min-h-[500px]"
                            >
                                {emailRaw}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: Analysis Dashboard */}
            <div className="flex flex-col gap-6">
                <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-1 uppercase tracking-widest">
                                <Zap size={16} className="text-teal-400 animate-pulse"/> Analysis
                            </h3>
                            <p className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase font-bold">Execution Engine</p>
                        </div>
                        <button 
                            disabled={isDetonating}
                            className={`px-4 py-2 rounded-lg font-bold text-[10px] tracking-widest transition-all uppercase flex items-center gap-2 ${
                                isDetonating 
                                ? 'bg-teal-500/20 text-teal-400 cursor-not-allowed border border-teal-500/30' 
                                : 'bg-teal-500 text-black hover:bg-teal-400 hover:shadow-[0_0_20px_rgba(45,212,191,0.4)] border border-teal-500/30'
                            }`}
                            onClick={triggerDetonation}
                        >
                            {isDetonating ? 'Analyzing...' : 'Execute Scan'}
                        </button>
                    </div>

                    <div className="space-y-4">
                        {[
                            { step: 'HEADER SCAN', res: 'SPOOFED', score: 95, icon: Shield, color: 'text-red-400' },
                            { step: 'BODY SCAN', res: '3 LINKS', score: 88, icon: Search, color: 'text-orange-400' },
                            { step: 'SANDBOX', res: 'DETECTED', score: 92, icon: Box, color: 'text-orange-400' },
                            { step: 'RISK LEVEL', res: 'CRITICAL', score: 94, icon: Target, color: 'text-red-500 font-black' },
                        ].map((s, i) => (
                            <div key={i} className="relative">
                                <div className="flex justify-between items-center mb-1.5 px-1">
                                    <div className="flex items-center gap-2">
                                        <s.icon size={12} className="text-zinc-600" />
                                        <span className="text-[10px] font-bold text-zinc-600 tracking-wider">0{i+1} {s.step}</span>
                                    </div>
                                    <span className={`text-[10px] font-mono font-bold ${s.color}`}>{s.res}</span>
                                </div>
                                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: isDetonating ? `${progress}%` : `${s.score}%` }}
                                        className={`h-full rounded-full ${s.score > 90 ? 'bg-red-500' : 'bg-teal-500'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-2xl flex-1 overflow-hidden flex flex-col">
                    <h3 className="text-white font-bold text-sm flex items-center gap-2 mb-6 uppercase tracking-wider">
                        <Database size={16} className="text-purple-400"/> Parsed IOCs
                    </h3>
                    <div className="space-y-3 overflow-y-auto custom-scrollbar flex-1 pr-1">
                        {[
                            { type: 'DOMAIN', val: 'paypa1-secure.ru', risk: 'HIGH', color: 'text-purple-400' },
                            { type: 'IP', val: '185.220.101.47', risk: 'HIGH', color: 'text-cyan-400' },
                            { type: 'URL', val: '/login.php', risk: 'MED', color: 'text-blue-400' },
                            { type: 'EMAIL', val: 'noreply@paypa1-secure.ru', risk: 'HIGH', color: 'text-red-400' },
                        ].map((ioc, i) => (
                            <div key={i} className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-xl hover:bg-white/[0.03] transition-all group cursor-pointer">
                                <div className="flex justify-between items-center mb-1">
                                    <span className={`text-[9px] font-black tracking-widest ${ioc.color}`}>{ioc.type}</span>
                                    <span className={`text-[9px] font-bold ${ioc.risk === 'HIGH' ? 'text-red-400' : 'text-orange-400'}`}>{ioc.risk} RISK</span>
                                </div>
                                <div className="flex justify-between items-center gap-2">
                                    <span className="text-[11px] font-mono text-slate-300 truncate">{ioc.val}</span>
                                    <Download size={12} className="text-slate-600 group-hover:text-teal-400 transition-colors" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="mt-6 w-full py-4 bg-teal-500/10 hover:bg-teal-500/20 transition-all rounded-xl border border-teal-500/30 text-[10px] font-bold tracking-[0.3em] text-teal-400 uppercase shadow-[0_0_15px_rgba(45,212,191,0.1)]">
                        Push to SIEM
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function PhishingDetectionProject() {
    const [currentTime, setCurrentTime] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [isBooting, setIsBooting] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsBooting(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toISOString().substr(11, 8));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const LIVE_FEED = [
        { id: 1, time: '09:14:32', severity: 'CRITICAL', subject: '"Your account has been suspended"', sender: 'paypa1-secure.ru', verdict: 'MALICIOUS' },
        { id: 2, time: '09:13:10', severity: 'HIGH', subject: '"Invoice attached"', sender: 'docs-invoice.xyz', verdict: 'MALICIOUS' },
        { id: 3, time: '09:11:05', severity: 'MEDIUM', subject: '"Reset your password"', sender: 'mail-google.net', verdict: 'SUSPICIOUS' },
        { id: 4, time: '09:08:22', severity: 'INFO', subject: '"Meeting tomorrow"', sender: 'gmail.com', verdict: 'CLEAN' },
        { id: 5, time: '09:05:14', severity: 'INFO', subject: '"Project update"', sender: 'company.com', verdict: 'CLEAN' },
    ];

    const IOCS = [
        { type: 'IP', value: '185.220.101.47', source: 'Attachment', conf: 'HIGH', ttp: 'T1071' },
        { type: 'DOMAIN', value: 'paypa1-secure.ru', source: 'Header', conf: 'HIGH', ttp: 'T1566.001' },
        { type: 'URL', value: '/login.php', source: 'Body', conf: 'HIGH', ttp: 'T1566.002' },
        { type: 'HASH', value: 'd41d8cd98f00b204', source: 'Attachment', conf: 'HIGH', ttp: 'T1027' },
        { type: 'EMAIL', value: 'noreply@paypa1-secure.ru', source: 'Header', conf: 'HIGH', ttp: 'T1566' },
    ];

    const getSeverityColor = (sev) => {
        switch(sev) {
            case 'CRITICAL': return 'text-red-400 bg-red-400/10 border-red-400/20';
            case 'HIGH': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
            case 'MEDIUM': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const renderContent = (tab) => {
        switch(tab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            <StatCard title="TOTAL ANALYZED" value="342" icon={Mail} colorClass="text-blue-400" borderClass="border-blue-500/20" bgClass="bg-blue-500/[0.02]" delay={0.1} />
                            <StatCard title="MALICIOUS" value="47" icon={AlertTriangle} colorClass="text-red-400" borderClass="border-red-500/20" bgClass="bg-red-500/[0.02]" delay={0.2} />
                            <StatCard title="SUSPICIOUS" value="89" icon={Eye} colorClass="text-orange-400" borderClass="border-orange-500/20" bgClass="bg-orange-500/[0.02]" delay={0.3} />
                            <StatCard title="CLEAN" value="206" icon={CheckCircle2} colorClass="text-green-400" borderClass="border-green-500/20" bgClass="bg-green-500/[0.02]" delay={0.4} />
                            <StatCard title="YARA HITS" value="23" icon={Bug} colorClass="text-teal-400" borderClass="border-teal-500/20" bgClass="bg-teal-500/[0.02]" delay={0.5} />
                            <StatCard title="IOCs EXTRACTED" value="134" icon={Database} colorClass="text-purple-400" borderClass="border-purple-500/20" bgClass="bg-purple-500/[0.02]" delay={0.6} />
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    <Activity size={18} className="text-teal-400" /> Live Threat Feed
                                </h3>
                                <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-white/[0.02] text-xs font-mono text-slate-400 uppercase">
                                            <tr>
                                                <th className="p-4 border-b border-white/5">TIMESTAMP</th>
                                                <th className="p-4 border-b border-white/5">SEVERITY</th>
                                                <th className="p-4 border-b border-white/5">SUBJECT</th>
                                                <th className="p-4 border-b border-white/5">SENDER DOMAIN</th>
                                                <th className="p-4 border-b border-white/5">VERDICT</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5 font-mono text-xs">
                                            {LIVE_FEED.map((log) => (
                                                <tr key={log.id} className="even:bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                                    <td className="p-4 text-slate-400">{log.time}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded border ${getSeverityColor(log.severity)}`}>
                                                            {log.severity}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-300">{log.subject}</td>
                                                    <td className="p-4 text-slate-400">{log.sender}</td>
                                                    <td className="p-4">
                                                        <span className={log.verdict === 'MALICIOUS' ? 'text-red-400' : log.verdict === 'SUSPICIOUS' ? 'text-orange-400' : 'text-green-400'}>
                                                            {log.verdict}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-white font-medium flex items-center gap-2">
                                    <Network size={18} className="text-teal-400" /> Forwarder Status
                                </h3>
                                <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-5 space-y-6 text-sm">
                                    <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-500/20 rounded text-blue-400"><Server size={16}/></div>
                                            <div>
                                                <p className="text-slate-200 font-medium text-xs">Postfix-Ingestor</p>
                                                <p className="text-slate-500 text-[10px] font-mono">192.168.1.10:25</p>
                                            </div>
                                        </div>
                                        <span className="text-green-400 text-[10px] font-bold tracking-wider px-2 py-1 bg-green-500/10 rounded">ONLINE</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/[0.02] p-3 rounded-lg border border-white/5">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-purple-500/20 rounded text-purple-400"><Database size={16}/></div>
                                            <div>
                                                <p className="text-slate-200 font-medium text-xs">Docker-Sandbox</p>
                                                <p className="text-slate-500 text-[10px] font-mono">Internal Cluster</p>
                                            </div>
                                        </div>
                                        <span className="text-green-400 text-[10px] font-bold tracking-wider px-2 py-1 bg-green-500/10 rounded">ONLINE</span>
                                    </div>
                                    <div className="text-xs text-slate-400 border-t border-white/5 pt-4">
                                        Pipeline latency: <span className="text-teal-400 font-mono">1.24s avg</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'inspector':
                return <EmailInspectorContent />;

            case 'url':
                return (
                    <div className="space-y-6">
                        <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 p-4 rounded-xl flex items-center gap-4">
                            <div className="w-full bg-white/[0.02] border border-white/10 rounded-lg flex items-center px-4 py-3">
                                <Search size={18} className="text-slate-500 mr-3" />
                                <span className="text-slate-300 font-mono text-sm flex-1">http://paypa1-secure.ru/login</span>
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs font-bold font-mono">SCANNED</span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-6">
                             <div className="lg:col-span-2 bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-sm font-mono text-[12px]">
                                    <thead className="bg-white/[0.02] text-slate-400">
                                        <tr>
                                            <th className="p-4 border-b border-white/5">URL</th>
                                            <th className="p-4 border-b border-white/5">VT SCORE</th>
                                            <th className="p-4 border-b border-white/5">URLSCAN</th>
                                            <th className="p-4 border-b border-white/5">CATEGORY</th>
                                            <th className="p-4 border-b border-white/5">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr className="bg-red-500/[0.02]">
                                            <td className="p-4 text-slate-300 break-all w-1/3">http://paypa1-secure.ru/login</td>
                                            <td className="p-4"><span className="text-red-400 font-bold">67</span><span className="text-slate-500">/90 engines</span></td>
                                            <td className="p-4 text-orange-400">Suspicious (Score: 88)</td>
                                            <td className="p-4">Phishing</td>
                                            <td className="p-4"><span className="px-2 py-1 bg-red-500/20 text-red-500 rounded border border-red-500/30 font-bold">BLOCKED</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-5 space-y-4">
                                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                                    <Eye size={16} className="text-teal-400"/> Screenshot Preview
                                </h3>
                                <div className="border border-slate-700/50 rounded-lg overflow-hidden bg-slate-900 shadow-inner h-48 relative group">
                                    <div className="absolute inset-0 bg-slate-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="px-4 py-2 bg-teal-500/90 text-white rounded text-xs font-bold">View Full Resolution</button>
                                    </div>
                                    {/* Mock login screen */}
                                    <div className="w-full h-full p-4 flex flex-col items-center justify-center space-y-3 opacity-60">
                                        <div className="w-16 h-6 bg-blue-500/50 rounded flex items-center justify-center text-[10px] font-bold text-white">PayPal</div>
                                        <div className="w-32 h-6 bg-slate-700/50 rounded"></div>
                                        <div className="w-32 h-6 bg-slate-700/50 rounded"></div>
                                        <div className="w-32 h-8 bg-blue-500/50 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'sandbox':
                return (
                    <div className="space-y-6">
                        <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-slate-700 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center">
                            <FileCode size={48} className="text-slate-500 mb-4" />
                            <p className="text-slate-300 font-mono text-sm mb-2">invoice_march.docx (47KB)</p>
                            <p className="text-slate-500 text-xs uppercase tracking-widest font-bold">Detonation Complete</p>
                        </div>
                        
                        <div className="flex bg-white/[0.02] border border-white/5 rounded-lg overflow-hidden">
                            {['UPLOAD', 'EXTRACT', 'DETONATE', 'ANALYZE', 'REPORT'].map((step, i, arr) => (
                                <div key={step} className={`flex-1 text-center py-3 text-[10px] font-bold tracking-wider font-mono ${i === arr.length - 1 ? 'bg-teal-500/10 text-teal-400 border-l border-teal-500/20' : 'text-slate-500 border-r border-white/5'}`}>
                                    {step}
                                </div>
                            ))}
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6">
                            <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-6">
                                <h3 className="text-sm font-medium text-white mb-6 flex items-center gap-2">
                                    <Terminal size={16} className="text-orange-400"/> Behavioral Findings
                                </h3>
                                <ul className="space-y-4 font-mono text-xs text-slate-300">
                                    <li className="flex gap-3">
                                        <span className="text-red-400 mt-0.5">•</span>
                                        <span>Macro auto-execution on open</span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400 mt-0.5">•</span>
                                        <span>PowerShell spawned: <span className="text-orange-300 bg-orange-400/10 px-1 rounded">powershell.exe -enc [base64]</span></span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400 mt-0.5">•</span>
                                        <span>Network connection: <span className="text-blue-300">185.220.101.47:4444</span></span>
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="text-red-400 mt-0.5">•</span>
                                        <span>Registry key written: <span className="text-slate-400">HKCU\Software\Microsoft\Windows\Run</span></span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-6 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">YARA Match</p>
                                        <div className="flex items-center justify-between bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                            <span className="text-red-400 font-mono text-sm font-bold">Emotet_Dropper_v4</span>
                                            <span className="px-2 py-1 bg-red-500/20 text-red-500 text-[10px] font-bold rounded">MATCHED</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Verdict</p>
                                        <div className="flex items-center gap-4">
                                            <span className="text-2xl font-bold font-mono text-red-500">MALICIOUS</span>
                                            <span className="text-slate-400 text-sm">(Confidence: 96%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'ioc':
                return (
                    <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl overflow-hidden flex flex-col h-full">
                        <div className="p-4 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                            <h3 className="text-white font-medium text-sm flex items-center gap-2">
                                <Database size={16} className="text-teal-400"/> Extracted Indicators of Compromise (Session)
                            </h3>
                            <div className="flex gap-2">
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-xs transition-colors flex items-center gap-2"><Share2 size={12}/> STIX2</button>
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-xs transition-colors flex items-center gap-2"><UploadCloud size={12}/> MISP</button>
                                <button className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-xs transition-colors flex items-center gap-2"><Download size={12}/> CSV</button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-auto">
                             <table className="w-full text-left font-mono text-[12px]">
                                <thead className="bg-black/40 backdrop-blur-md shadow-2xl text-slate-500 sticky top-0">
                                    <tr>
                                        <th className="p-4 border-b border-white/5 font-semibold">TYPE</th>
                                        <th className="p-4 border-b border-white/5 font-semibold">VALUE</th>
                                        <th className="p-4 border-b border-white/5 font-semibold">SOURCE</th>
                                        <th className="p-4 border-b border-white/5 font-semibold">CONFIDENCE</th>
                                        <th className="p-4 border-b border-white/5 font-semibold">MITRE TTP</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5 text-slate-300">
                                    {IOCS.map((ioc, idx) => (
                                        <tr key={idx} className="even:bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
                                            <td className="p-4 text-cyan-400">{ioc.type}</td>
                                            <td className="p-4">{ioc.value}</td>
                                            <td className="p-4 text-slate-400">{ioc.source}</td>
                                            <td className="p-4"><span className="text-red-400 font-bold">{ioc.conf}</span></td>
                                            <td className="p-4 text-purple-400">{ioc.ttp}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'timeline':
                return (
                    <div className="max-w-4xl mx-auto space-y-8 py-4">
                        {[
                            { time: '09:14:32', title: 'INGESTION', text: 'Email received via Postfix listener', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                            { time: '09:14:33', title: 'PARSE', text: 'SPF FAIL, DKIM FAIL, DMARC FAIL detected', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                            { time: '09:14:34', title: 'URL SCAN', text: 'paypa1-secure.ru → 67/90 VT engines', color: 'text-orange-400', bg: 'bg-orange-400/10' },
                            { time: '09:14:35', title: 'BLOCKED', text: 'URL added to blocklist automatically', color: 'text-red-400', bg: 'bg-red-400/10' },
                            { time: '09:14:36', title: 'SANDBOX', text: 'invoice_march.docx detonated in Docker', color: 'text-purple-400', bg: 'bg-purple-400/10' },
                            { time: '09:14:41', title: 'ALERT', text: 'YARA: Emotet_Dropper_v4 matched', color: 'text-red-500', bg: 'bg-red-500/10' },
                            { time: '09:14:42', title: 'IOC EXPORT', text: '5 IOCs pushed to TheHive case #PH-2024-047', color: 'text-teal-400', bg: 'bg-teal-400/10' },
                        ].map((event, idx, arr) => (
                            <div key={idx} className="flex gap-6 relative">
                                {idx !== arr.length - 1 && (
                                    <div className="absolute top-8 left-[61px] bottom-[-24px] w-[1px] bg-white/10" />
                                )}
                                <div className="text-slate-500 font-mono text-xs w-20 pt-2 shrink-0 text-right">{event.time}</div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border border-white/10 ${event.bg}`}>
                                    <div className={`w-2 h-2 rounded-full bg-current ${event.color}`} />
                                </div>
                                <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-5 flex-1 relative top-[-6px]">
                                    <h4 className={`text-xs font-bold font-mono tracking-wider mb-2 ${event.color}`}>{event.title}</h4>
                                    <p className="text-slate-300 text-sm">{event.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'briefing':
                return (
                    <div className="max-w-4xl max-w-4xl space-y-8">
                        <div>
                            <h2 className="text-2xl font-display font-bold text-white mb-4">Phishing Detection Pipeline</h2>
                            <p className="text-slate-400 leading-relaxed text-sm">
                                An automated email threat triage system that processes suspicious emails end-to-end — from raw ingestion through header analysis, URL reputation checks, attachment sandboxing, and IOC extraction — producing structured threat intelligence reports. Built to simulate a real Tier-1 SOC analyst workflow, reducing manual triage time from ~15 minutes to under 10 seconds per email.
                            </p>
                        </div>
                        <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-6">
                            <h3 className="text-white font-medium mb-4 flex items-center gap-2"><Target size={18} className="text-teal-400"/> Operational Objectives</h3>
                            <ul className="space-y-3 font-mono text-sm text-slate-300">
                                <li className="flex gap-3"><span className="text-teal-500">1.</span> Ingest raw emails via Postfix and parse MIME structure</li>
                                <li className="flex gap-3"><span className="text-teal-500">2.</span> Validate SPF, DKIM, DMARC authentication headers</li>
                                <li className="flex gap-3"><span className="text-teal-500">3.</span> Extract and scan all URLs against VirusTotal + URLScan APIs</li>
                                <li className="flex gap-3"><span className="text-teal-500">4.</span> Detonate attachments in isolated Docker sandbox</li>
                                <li className="flex gap-3"><span className="text-teal-500">5.</span> Match behaviors against custom YARA ruleset</li>
                                <li className="flex gap-3"><span className="text-teal-500">6.</span> Export structured IOCs in STIX2 format to TheHive</li>
                            </ul>
                        </div>
                    </div>
                );
            case 'architecture':
                return (
                    <div className="space-y-6">
                        <div className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-8 flex justify-center overflow-x-auto">
                            <div className="flex items-center gap-4 min-w-max text-xs font-mono font-bold text-slate-400">
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded flex items-center justify-center text-blue-400"><Mail size={20}/></div>Postfix</div>
                                <ArrowRight size={16} className="text-slate-600"/>
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-yellow-500/10 border border-yellow-500/30 rounded flex items-center justify-center text-yellow-400"><Code size={20}/></div>Parser</div>
                                <ArrowRight size={16} className="text-slate-600"/>
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded flex items-center justify-center text-purple-400"><Search size={20}/></div>VT+URLScan</div>
                                <ArrowRight size={16} className="text-slate-600"/>
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-slate-500/10 border border-slate-500/30 rounded flex items-center justify-center text-slate-400"><Box size={20}/></div>Docker</div>
                                <ArrowRight size={16} className="text-slate-600"/>
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded flex items-center justify-center text-red-400"><Bug size={20}/></div>YARA</div>
                                <ArrowRight size={16} className="text-slate-600"/>
                                <div className="flex flex-col items-center gap-2"><div className="w-12 h-12 bg-teal-500/10 border border-teal-500/30 rounded flex items-center justify-center text-teal-400"><Shield size={20}/></div>TheHive</div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { file: 'email_pipeline.py', lang: 'python', code: 'def process_email(raw):\n  parsed = parse_mime(raw)\n  urls = extract_urls(parsed)\n  vt_results = scan_vt(urls)\n  return vt_results' },
                                { file: 'phishing.yar', lang: 'yara', code: 'rule Phishing_Attachment {\n  meta:\n    description = "Suspicious attachment"\n  strings:\n    $a = "cmd.exe"\n  condition:\n    $a\n}' },
                                { file: 'docker-compose.yml', lang: 'yaml', code: 'services:\n  sandbox:\n    image: sandbox-img\n    isolate: true\n    networks:\n      - internal_only' }
                            ].map(block => (
                                <div key={block.file} className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-lg overflow-hidden flex flex-col">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.02] border-b border-white/5">
                                        <div className="flex gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div></div>
                                        <span className="text-xs text-slate-400 font-mono ml-2">{block.file}</span>
                                    </div>
                                    <div className="p-4 text-xs font-mono text-teal-300 font-medium whitespace-pre-wrap flex-1">{block.code}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'playbook':
                return (
                    <div className="space-y-6">
                        {[
                            { phase: 'PHASE 1: Email Ingestion', cmd: 'python3 ingest.py --listen 0.0.0.0:25', res: '342 emails processed, 47 flagged malicious' },
                            { phase: 'PHASE 2: Header Authentication Check', cmd: 'spf_check(email) + dkim_verify(email)', res: 'SPF/DKIM/DMARC all FAIL -> score +40' },
                            { phase: 'PHASE 3: URL Reputation Scan', cmd: 'vt_scan(urls) + urlscan_submit(urls)', res: 'paypa1-secure.ru blocked, 67/90 VT engines' },
                            { phase: 'PHASE 4: Attachment Detonation', cmd: 'docker run --rm sandbox detonate invoice.docx', res: 'YARA matched Emotet_Dropper_v4, confidence 96%' }
                        ].map((p, i) => (
                            <div key={i} className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-xl p-6 relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500/50"></div>
                                <h4 className="text-teal-400 font-bold font-mono text-xs tracking-widest mb-4">{p.phase}</h4>
                                <div className="space-y-3">
                                    <div className="bg-white/[0.02] border border-white/5 p-3 rounded text-xs font-mono text-slate-300"><span className="text-purple-400">$</span> {p.cmd}</div>
                                    <div className="bg-green-500/5 text-green-400/80 p-3 flex items-center gap-2 text-xs font-mono rounded"><CheckCircle2 size={14}/> {p.res}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'results':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatCard title="Emails Analyzed" value="342" icon={Mail} colorClass="text-slate-200" borderClass="border-white/10" bgClass="bg-white/5" delay={0.1} />
                            <StatCard title="Detection Accuracy" value="96%" icon={Activity} colorClass="text-teal-400" borderClass="border-teal-500/20" bgClass="bg-teal-500/[0.02]" delay={0.2} />
                            <StatCard title="Triage Time" value="<10s" icon={Zap} colorClass="text-yellow-400" borderClass="border-yellow-500/20" bgClass="bg-yellow-500/[0.02]" delay={0.3} />
                            <StatCard title="IOCs Extracted" value="134" icon={Database} colorClass="text-purple-400" borderClass="border-purple-500/20" bgClass="bg-purple-500/[0.02]" delay={0.4} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "SPF/DKIM/DMARC Checks Caught 38 Spoofed Senders",
                                "VirusTotal API Flagged 100% of Known Phishing URLs",
                                "YARA Rules Detected 3 Malware Families in Attachments",
                                "Automated IOC Export Reduced Analyst Time by 94%",
                                "Docker Sandbox Safely Detonated 23 Malicious Attachments",
                                "TheHive Integration Enabled Full Case Tracking"
                            ].map((f, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-md shadow-2xl border border-white/5 rounded-lg p-5 flex items-start gap-3 hover:bg-white/[0.02] transition-colors">
                                    <CheckCircle2 size={18} className="text-teal-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 text-sm leading-relaxed">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const breadcrumbName = () => {
        const labels = {
            overview: 'LIVE OVERVIEW', inspector: 'EMAIL INSPECTOR', url: 'URL SCANNER',
            sandbox: 'ATTACHMENT SANDBOX', ioc: 'IOC EXTRACTOR', timeline: 'THREAT TIMELINE',
            briefing: 'MISSION BRIEFING', architecture: 'ARCHITECTURE MAP',
            playbook: 'ANALYSIS PLAYBOOK', results: 'RESULTS & ROI'
        };
        return labels[activeTab];
    };

    return (
        <div className="h-screen w-screen bg-[#050505] text-zinc-300 font-sans flex flex-col overflow-hidden selection:bg-teal-500/30">
            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} 
                        className="absolute inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center font-mono text-teal-400">
                        <Terminal size={48} className="mb-6 animate-pulse drop-shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
                        <div className="text-xl tracking-[0.3em] uppercase mb-4 font-bold drop-shadow-[0_0_10px_rgba(45,212,191,0.5)]">Initializing Threat Pipeline</div>
                        <div className="w-64 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,1)]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <TopBar currentTime={currentTime} />
            <div className="flex flex-1 overflow-hidden relative">
                {/* Global Background Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(45,212,191,0.03)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(244,63,94,0.02)_0%,transparent_50%)] pointer-events-none z-0" />

                {/* Left Sidebar */}
                <div className="w-64 bg-white/[0.01] backdrop-blur-2xl border-r border-white/[0.05] flex flex-col py-8 shadow-[10px_0_30px_-15px_rgba(0,0,0,0.8)] z-10 overflow-y-auto custom-scrollbar relative">
                    <div className="absolute left-0 inset-y-0 w-[1px] bg-gradient-to-b from-transparent via-teal-500/20 to-transparent" />
                    
                    <div className="px-6 mb-8">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.15)]">
                                <Shield size={18} className="text-teal-400" />
                            </div>
                            <div>
                                <div className="text-[9px] font-mono text-teal-400 uppercase tracking-[0.2em] font-bold">Pipeline Dashboard</div>
                                <div className="text-[10px] text-zinc-500 font-medium">Threat Intelligence</div>
                            </div>
                        </div>
                        <div className="text-sm font-bold text-white leading-snug tracking-tight">Phishing Detection<br/><span className="text-zinc-400 font-medium">&amp; Analysis Sandbox</span></div>
                        <div className="h-px w-full bg-gradient-to-r from-teal-500/40 via-teal-500/10 to-transparent mt-4" />
                    </div>

                    <div className="px-8 mt-2 mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600 flex items-center gap-2">
                        <LayoutDashboard size={10}/> DATA FEED
                    </div>
                    <nav className="space-y-1 mb-4">
                        <NavItem icon={Activity} label="LIVE OVERVIEW" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} delay={0.1} />
                        <NavItem icon={Search} label="EMAIL INSPECTOR" active={activeTab === 'inspector'} onClick={() => setActiveTab('inspector')} delay={0.2} />
                        <NavItem icon={Search} label="URL SCANNER" active={activeTab === 'url'} onClick={() => setActiveTab('url')} delay={0.3} />
                        <NavItem icon={Box} label="ATTACHMENT SANDBOX" active={activeTab === 'sandbox'} onClick={() => setActiveTab('sandbox')} delay={0.4} />
                        <NavItem icon={Database} label="IOC EXTRACTOR" active={activeTab === 'ioc'} onClick={() => setActiveTab('ioc')} delay={0.5} />
                        <NavItem icon={Clock} label="THREAT TIMELINE" active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')} delay={0.6} />
                    </nav>

                    <NavItem isSection label="LIBRARY CONTEXT" delay={0.7} />
                    <nav className="space-y-1">
                        <NavItem icon={FileText} label="MISSION BRIEFING" active={activeTab === 'briefing'} onClick={() => setActiveTab('briefing')} delay={0.8} />
                        <NavItem icon={Network} label="ARCHITECTURE MAP" active={activeTab === 'architecture'} onClick={() => setActiveTab('architecture')} delay={0.9} />
                        <NavItem icon={BookOpen} label="ANALYSIS PLAYBOOK" active={activeTab === 'playbook'} onClick={() => setActiveTab('playbook')} delay={1.0} />
                        <NavItem icon={BarChart} label="RESULTS & ROI" active={activeTab === 'results'} onClick={() => setActiveTab('results')} delay={1.1} />
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar scroll-smooth">
                    <AnimatePresence mode="wait">
                        <motion.div key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }} className="h-full flex flex-col">
                            <div className="mb-6 flex items-center gap-3 text-zinc-500 text-[10px] font-bold font-mono uppercase tracking-[0.2em] bg-white/[0.02] backdrop-blur-md border border-white/[0.05] w-fit px-5 py-2.5 rounded-full shadow-2xl relative overflow-hidden">
                                <span className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.2] to-transparent" />
                                <span className="text-zinc-600">PHISHING</span> <ChevronRight size={10} className="text-zinc-700"/> 
                                <span className={activeTab.includes('briefing') || activeTab.includes('architecture') || activeTab.includes('playbook') || activeTab.includes('results') ? 'text-teal-400 drop-shadow-[0_0_5px_teal]' : 'text-teal-400 drop-shadow-[0_0_5px_teal]'}>{breadcrumbName()}</span>
                            </div>
                            
                            {activeTab === 'overview' && renderContent('overview')}
                            {activeTab === 'inspector' && renderContent('inspector')}
                            {activeTab === 'url' && renderContent('url')}
                            {activeTab === 'sandbox' && renderContent('sandbox')}
                            {activeTab === 'ioc' && renderContent('ioc')}
                            {activeTab === 'timeline' && renderContent('timeline')}
                            {activeTab === 'briefing' && renderContent('briefing')}
                            {activeTab === 'architecture' && renderContent('architecture')}
                            {activeTab === 'playbook' && renderContent('playbook')}
                            {activeTab === 'results' && renderContent('results')}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.5); }
            `}</style>
        </div>
    );
}

