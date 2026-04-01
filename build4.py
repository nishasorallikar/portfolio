import os

out_fp = "d:/Projects/nisha/portfolio/src/pages/SOCLabProject.jsx"

content = """
/* ─────────────────────────────────────────────────────────────
   PAGE: BOOT SEQUENCE & SHELL
   ───────────────────────────────────────────────────────────── */
const SOCLabProject = () => {
    const [activePage, setActivePage] = useState('Live Overview');
    const [isBooting, setIsBooting] = useState(true);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const timer = setTimeout(() => setIsBooting(false), 2000);
        return () => {
            document.body.style.overflow = 'auto';
            clearTimeout(timer);
        };
    }, []);
    
    const labPages = [
        { id: 'Live Overview', icon: LayoutDashboard },
        { id: 'Network Map', icon: Network },
        { id: 'WAF Inspector', icon: Shield },
        { id: 'Suricata NIDS', icon: AlertTriangle },
        { id: 'Wazuh SIEM', icon: Database },
        { id: 'Threat Timeline', icon: Clock },
        { id: 'Firewall Policy', icon: ServerCrash }
    ];

    const docPages = [
        { id: 'Mission Briefing', icon: FileText },
        { id: 'Architecture Map', icon: Network },
        { id: 'Attack Playbook', icon: Terminal },
        { id: 'Results & ROI', icon: Activity }
    ];

    return (
        <div className="h-screen w-screen bg-black text-zinc-300 font-sans flex flex-col overflow-hidden selection:bg-cyan-500/30">
            {/* Boot Sequence Overlay */}
            <AnimatePresence>
                {isBooting && (
                    <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} 
                        className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center font-mono text-cyan-400">
                        <Terminal size={48} className="mb-6 animate-pulse" />
                        <div className="text-xl tracking-[0.3em] uppercase mb-4 font-bold">Initializing SOC Terminal</div>
                        <div className="w-64 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                            <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Top Statusbar */}
            <div className="h-12 bg-black/60 backdrop-blur-xl border-b border-white/[0.05] flex items-center justify-between px-6 text-[10px] font-mono uppercase tracking-widest shrink-0 shadow-xl relative z-20">
                <div className="flex items-center gap-8">
                    <Link to="/" className="flex items-center gap-2 text-zinc-500 hover:text-cyan-400 transition-colors group relative overflow-hidden">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Exit Terminal
                    </Link>
                    <span className="flex items-center gap-2 text-cyan-400 font-bold px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/30">
                        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,211,238,1)]"/> LIVE SIMULATION
                    </span>
                    <span className="text-zinc-600 hidden md:inline">Alerts Today: <span className="text-zinc-300 font-bold ml-1">1,247</span></span>
                    <span className="text-zinc-600 hidden md:inline">Critical: <span className="text-red-400 font-bold ml-1">23</span></span>
                    <span className="text-zinc-600 hidden lg:inline">Agents Online: <span className="text-green-400 font-bold ml-1">3/3</span></span>
                </div>
                <div className="text-zinc-600 flex items-center gap-3">
                    Sys_Time: <span className="text-zinc-300">{(new Date()).toISOString().split('T')[1].split('.')[0]} UTC</span>
                    <div className="w-3 h-3 rounded-full border border-zinc-700 border-t-cyan-400 animate-spin ml-2"/>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Global Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.03)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(248,113,113,0.02)_0%,transparent_50%)] pointer-events-none z-0" />

                {/* Left Sidebar */}
                <div className="w-64 bg-black/40 backdrop-blur-md border-r border-white/[0.05] flex flex-col py-6 shadow-2xl z-10 overflow-y-auto custom-scrollbar">
                    <div className="px-6 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Lab Environment</div>
                    <nav className="space-y-1 mb-8">
                        {labPages.map(p => {
                            const active = activePage === p.id;
                            const Icon = p.icon;
                            return (
                                <button key={p.id} onClick={() => setActivePage(p.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 text-left
                                        ${active ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 border-l-2 border-cyan-400' : 'text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300 border-l-2 border-transparent'}`}>
                                    <Icon size={14} className={active ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-zinc-600'}/>
                                    {p.id}
                                </button>
                            );
                        })}
                    </nav>

                    <div className="px-6 mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-600">Project Briefing</div>
                    <nav className="space-y-1">
                        {docPages.map(p => {
                            const active = activePage === p.id;
                            const Icon = p.icon;
                            return (
                                <button key={p.id} onClick={() => setActivePage(p.id)}
                                    className={`w-full flex items-center gap-4 px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 text-left
                                        ${active ? 'bg-gradient-to-r from-cyan-500/10 to-transparent text-cyan-400 border-l-2 border-cyan-400' : 'text-zinc-500 hover:bg-white/[0.02] hover:text-zinc-300 border-l-2 border-transparent'}`}>
                                    <Icon size={14} className={active ? 'text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]' : 'text-zinc-600'}/>
                                    {p.id}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-8 relative z-10 custom-scrollbar scroll-smooth">
                    <AnimatePresence mode="wait">
                        <motion.div key={activePage} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="h-full flex flex-col">
                            <div className="mb-6 flex items-center gap-3 text-zinc-500 text-[10px] font-bold font-mono uppercase tracking-widest bg-black/40 backdrop-blur-md border border-white/[0.05] w-fit px-4 py-2 rounded-full shadow-2xl">
                                SOC <ChevronRight size={12} className="text-zinc-600"/> 
                                <span className={activePage.includes('Briefing') || activePage.includes('Map') || activePage.includes('Playbook') || activePage.includes('Results') ? 'text-orange-400' : 'text-cyan-400'}>{activePage}</span>
                            </div>
                            
                            {/* LAB PAGES */}
                            {activePage === 'Live Overview' && <OverviewPage />}
                            {activePage === 'Network Map' && <NetworkMapPage />}
                            {activePage === 'WAF Inspector' && <WAFInspectorPage />}
                            {activePage === 'Suricata NIDS' && <SiemPage title="Suricata NIDS" />}
                            {activePage === 'Wazuh SIEM' && <SiemPage title="Wazuh SIEM" />}
                            {activePage === 'Threat Timeline' && <TimelinePage />}
                            {activePage === 'Firewall Policy' && <FirewallPage />}

                            {/* DOC PAGES */}
                            {activePage === 'Mission Briefing' && <ExecutiveDoc />}
                            {activePage === 'Architecture Map' && <ArchitectureDoc />}
                            {activePage === 'Attack Playbook' && <AttackDoc />}
                            {activePage === 'Results & ROI' && <FindingsDoc />}

                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
            
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34,211,238,0.5); }
            `}</style>
        </div>
    );
};

export default SOCLabProject;
"""
with open(out_fp, "a", encoding="utf-8") as f:
    f.write(content)
