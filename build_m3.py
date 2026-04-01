"""
Convert CSAModule03 from sidebar layout to horizontal tab layout
matching the pattern used by CSAModule01 and CSAModule02.
"""

filepath = "d:/Projects/nisha/portfolio/src/pages/csa/CSAModule03.jsx"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix imports - use shared ProgressHexagon, remove useId/useRef
content = content.replace(
    "import React, { useState, useEffect, useRef, useId } from 'react';",
    "import React, { useState, useEffect } from 'react';"
)

# 2. Add ProgressHexagon import after lucide imports
content = content.replace(
    "} from 'lucide-react';",
    "} from 'lucide-react';\nimport ProgressHexagon from '../../components/ProgressHexagon';"
)

# 3. Remove the inline ProgressHex component (lines 221-240)
old_hex = """/* ──────────── PROGRESS HEXAGON (INLINE) ──────────── */
const ProgressHex = ({ completed, total }) => {
  const clipId = useId().replace(/:/g, '');
  const pct = Math.min(completed / total, 1);
  const h = pct * 80;
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-center">
      <svg viewBox="0 0 80 92" width="80" height="92" className="overflow-visible">
        <defs><clipPath id={clipId}><polygon points="40,2 78,22 78,62 40,82 2,62 2,22" /></clipPath></defs>
        <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#22d3ee" strokeWidth="2" fill="#09090b" />
        <g clipPath={`url(#${clipId})`}>
          <motion.rect x="0" width="80" fill="#22d3ee" initial={{ y: 82, height: 0 }} animate={{ y: 82 - h, height: h }} transition={{ type: 'spring', damping: 20 }} />
        </g>
        <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.6" />
      </svg>
      <span className="text-cyan-400 font-bold text-xs mt-1">{completed}/{total}</span>
      <span className="text-zinc-500 text-[10px]">Complete</span>
    </div>
  );
};"""
content = content.replace(old_hex, "")

# 4. Replace the entire main component export
old_main_start = """export default function CSAModule03() {
  const [completedSections, setCompletedSections] = useState(() => new Set());
  const [showBadge, setShowBadge] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [activeApproach, setActiveApproach] = useState(0);
  const [activeOSTab, setActiveOSTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [flippedAgent, setFlippedAgent] = useState(false);
  const [flippedAgentless, setFlippedAgentless] = useState(false);

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);
  const sectionRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref];

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

  // IntersectionObserver for sidebar active tracking
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { const i = sectionRefs.findIndex(r => r.current === e.target); if (i !== -1) setActiveSection(i); } });
    }, { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 });
    sectionRefs.forEach(r => { if (r.current) obs.observe(r.current); });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (i) => sectionRefs[i]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const ml = sidebarOpen ? '208px' : '48px';

  return (
    <div className="min-h-screen bg-black font-sans selection:bg-cyan-400/30 selection:text-cyan-400">

      {/* PROGRESS HEXAGON */}
      <ProgressHex completed={completedSections.size} total={5} />

      {/* BADGE */}
      <BadgeOverlay show={showBadge} onClose={() => setShowBadge(false)} />

      {/* SIDEBAR */}
      <motion.div className="fixed left-0 top-0 h-full bg-zinc-950 border-r border-zinc-800 pt-20 z-40 flex flex-col" animate={{ width: sidebarOpen ? 208 : 48 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
        {sidebarOpen && (
          <div className="px-3">
            <span className="text-xs text-zinc-600 uppercase tracking-wider px-2 mb-2 block">Sections</span>
            {SECTION_NAMES.map((name, i) => (
              <button key={i} onClick={() => scrollTo(i)} className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between mb-1 transition-colors ${activeSection === i ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-transparent'}`}>
                <span className="flex items-center"><span className="font-mono text-zinc-600 mr-2">{String(i + 1).padStart(2, '0')}</span>{name.slice(3)}</span>
                {completedSections.has(i) && <Check size={12} className="text-cyan-400" />}
              </button>
            ))}
          </div>
        )}
        <button onClick={() => setSidebarOpen(p => !p)} className="mt-auto mb-4 mx-auto text-zinc-500 hover:text-cyan-400 transition-colors">
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </motion.div>

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: ml, transition: 'margin-left 0.3s' }} className="px-8 py-10 max-w-5xl">
        <p className="text-sm text-cyan-400 font-mono mb-1">Module 03</p>
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Log Management</h1>
        <div className="border-b border-zinc-700 mb-8" />

        {/* ═══════ SECTION 1 ═══════ */}
        <section ref={section1Ref} className="mb-16">"""

new_main_start = r"""export default function CSAModule03() {
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
          <div>"""

content = content.replace(old_main_start, new_main_start)

# 5. Replace section transitions (ref-based → tab-based)
# Section 1 end + Section 2 start
content = content.replace(
    """          <MarkCompleteBtn index={0} completedSections={completedSections} onMark={markComplete} />
        </section>

        {/* ═══════ SECTION 2 ═══════ */}
        <section ref={section2Ref} className="mb-16">""",
    """          <MarkCompleteBtn index={0} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 2 ═══════ */}
        {activeTab === 1 && (
          <div>"""
)

# Section 2 end + Section 3 start
content = content.replace(
    """          <MarkCompleteBtn index={1} completedSections={completedSections} onMark={markComplete} />
        </section>

        {/* ═══════ SECTION 3 ═══════ */}
        <section ref={section3Ref} className="mb-16">""",
    """          <MarkCompleteBtn index={1} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 3 ═══════ */}
        {activeTab === 2 && (
          <div>"""
)

# Section 3 end + Section 4 start
content = content.replace(
    """          <MarkCompleteBtn index={2} completedSections={completedSections} onMark={markComplete} />
        </section>

        {/* ═══════ SECTION 4 ═══════ */}
        <section ref={section4Ref} className="mb-16">""",
    """          <MarkCompleteBtn index={2} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 4 ═══════ */}
        {activeTab === 3 && (
          <div>"""
)

# Section 4 end + Section 5 start
content = content.replace(
    """          <MarkCompleteBtn index={3} completedSections={completedSections} onMark={markComplete} />
        </section>

        {/* ═══════ SECTION 5 ═══════ */}
        <section ref={section5Ref} className="mb-16">""",
    """          <MarkCompleteBtn index={3} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

        {/* ═══════ TAB 5 ═══════ */}
        {activeTab === 4 && (
          <div>"""
)

# Section 5 end + closing divs
content = content.replace(
    """          <MarkCompleteBtn index={4} completedSections={completedSections} onMark={markComplete} />
        </section>

      </div>
    </div>
  );
}""",
    """          <MarkCompleteBtn index={4} completedSections={completedSections} onMark={markComplete} />
          </div>
        )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}"""
)

# 6. Remove section heading animations that used whileInView (now inside tabs, use simple animate)
# Remove all ref= from section tags  
content = content.replace(' ref={section1Ref}', '')
content = content.replace(' ref={section2Ref}', '')
content = content.replace(' ref={section3Ref}', '')
content = content.replace(' ref={section4Ref}', '')
content = content.replace(' ref={section5Ref}', '')

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: Module 03 converted from sidebar to horizontal tab layout matching Module 01/02 pattern.")
