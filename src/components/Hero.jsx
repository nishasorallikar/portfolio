import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import {
    Activity,
    Bug,
    Lock,
    ShieldCheck,
    Fingerprint,
    Network,
    Database,
    Server,
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/* ── Skill Node ── */
const SkillNode = ({ icon, label, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, type: 'spring', stiffness: 120 }}
        className="flex flex-col items-center gap-2 group cursor-default"
    >
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-sm shadow-lg transition-all duration-300 group-hover:bg-white/[0.08] group-hover:border-white/[0.15] group-hover:scale-110">
            <div className="absolute inset-0 rounded-2xl border border-white/[0.06] opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            <div className="relative z-10">{icon}</div>
        </div>
        <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-200 transition-colors whitespace-nowrap">
            {label}
        </span>
    </motion.div>
);

/* ── Animated Half-Circle Radar (Canvas) ── */
const HalfCircleRadar = () => {
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let width, height, cx, cy, maxRadius;

        const resize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.parentElement.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cx = width / 2;
            cy = height;         // center at bottom-center
            maxRadius = Math.min(width * 0.45, height * 0.95);
        };

        resize();
        window.addEventListener('resize', resize);

        // Blips
        const blips = Array.from({ length: 10 }, () => ({
            angle: Math.PI + Math.random() * Math.PI,  // only top half (PI to 2*PI)
            dist: 0.2 + Math.random() * 0.75,
            size: 1.5 + Math.random() * 2,
            alpha: 0,
            fadeSpeed: 0.006 + Math.random() * 0.01,
            hue: Math.random() > 0.7 ? 340 : 180,
        }));

        let sweepAngle = Math.PI; // start at left

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // ── Concentric half-circle rings ──
            const ringCount = 7;
            for (let i = 1; i <= ringCount; i++) {
                const r = (maxRadius / ringCount) * i;
                ctx.beginPath();
                ctx.arc(cx, cy, r, Math.PI, 2 * Math.PI); // top half only
                ctx.strokeStyle = `rgba(148, 163, 184, ${0.04 + i * 0.02})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }

            // ── Radial guide lines ──
            const guideCount = 7;
            for (let i = 0; i <= guideCount; i++) {
                const angle = Math.PI + (i / guideCount) * Math.PI;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(
                    cx + Math.cos(angle) * maxRadius,
                    cy + Math.sin(angle) * maxRadius
                );
                ctx.strokeStyle = 'rgba(148, 163, 184, 0.04)';
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }

            // ── Sweep beam ──
            sweepAngle += 0.008;
            if (sweepAngle > 2 * Math.PI) sweepAngle = Math.PI;

            // Sweep gradient cone
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, maxRadius, Math.PI, 2 * Math.PI);
            ctx.lineTo(cx, cy);
            ctx.closePath();
            ctx.clip();

            const sweepLen = 0.3;
            for (let i = 0; i < 20; i++) {
                const a = sweepAngle - (i / 20) * sweepLen;
                const alpha = (1 - i / 20) * 0.08;
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.lineTo(
                    cx + Math.cos(a) * maxRadius,
                    cy + Math.sin(a) * maxRadius
                );
                ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
                ctx.lineWidth = maxRadius * 0.03;
                ctx.stroke();
            }
            ctx.restore();

            // Sweep leading edge
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(
                cx + Math.cos(sweepAngle) * maxRadius,
                cy + Math.sin(sweepAngle) * maxRadius
            );
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(34, 211, 238, 0.5)';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // ── Center dot ──
            const cGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 6);
            cGlow.addColorStop(0, 'rgba(34, 211, 238, 0.7)');
            cGlow.addColorStop(1, 'rgba(34, 211, 238, 0)');
            ctx.fillStyle = cGlow;
            ctx.beginPath();
            ctx.arc(cx, cy, 6, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
            ctx.beginPath();
            ctx.arc(cx, cy, 2, 0, Math.PI * 2);
            ctx.fill();

            // ── Blips ──
            for (const blip of blips) {
                const angleDiff = ((sweepAngle - blip.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
                if (angleDiff < 0.12) blip.alpha = 1;
                blip.alpha = Math.max(0, blip.alpha - blip.fadeSpeed);

                if (blip.alpha > 0.01) {
                    const bx = cx + Math.cos(blip.angle) * maxRadius * blip.dist;
                    const by = cy + Math.sin(blip.angle) * maxRadius * blip.dist;
                    const hsl = blip.hue === 180 ? '34, 211, 238' : '239, 68, 68';

                    const g = ctx.createRadialGradient(bx, by, 0, bx, by, blip.size * 3);
                    g.addColorStop(0, `rgba(${hsl}, ${blip.alpha * 0.4})`);
                    g.addColorStop(1, `rgba(${hsl}, 0)`);
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(bx, by, blip.size * 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.fillStyle = `rgba(${hsl}, ${blip.alpha})`;
                    ctx.beginPath();
                    ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ── Outer ring glow ──
            ctx.beginPath();
            ctx.arc(cx, cy, maxRadius, Math.PI, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.08)';
            ctx.lineWidth = 1.5;
            ctx.shadowColor = 'rgba(34, 211, 238, 0.15)';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.shadowBlur = 0;

            animRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', resize);
            if (animRef.current) cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none"
        />
    );
};

/* ── Skills data ── */
const skills = [
    { icon: <Activity className="h-5 w-5 text-slate-400" />, label: 'SOC Monitoring' },
    { icon: <Bug className="h-5 w-5 text-slate-400" />, label: 'Threat Detection' },
    { icon: <Lock className="h-5 w-5 text-slate-400" />, label: 'Access Control' },
    { icon: <ShieldCheck className="h-5 w-5 text-slate-400" />, label: 'Incident Response' },
    { icon: <Fingerprint className="h-5 w-5 text-slate-400" />, label: 'IAM Security' },
    { icon: <Network className="h-5 w-5 text-slate-400" />, label: 'Network Security' },
    { icon: <Database className="h-5 w-5 text-slate-400" />, label: 'SIEM Logs' },
    { icon: <Server className="h-5 w-5 text-slate-400" />, label: 'Server Hardening' },
];

const Hero = () => {
    const handleDownload = () => {
        toast.success('Opening Resume...');
        window.open('https://drive.google.com/drive/folders/1f8lE_bkAtoWt54MpXuMcrPBspVEy8XNK?usp=sharing', '_blank');
    };

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full -mt-20">
            {/* ── Top Text Content ── */}
            <div className="relative z-30 text-center mb-4 pt-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-xs font-semibold mb-8 backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                    </span>
                    THREAT MONITORING ACTIVE
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-[1.08] text-white"
                >
                    Securing the future with <br />
                    <span className="text-gradient">precision & foresight.</span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-slate-400 max-w-2xl mx-auto mb-2 text-base md:text-lg leading-relaxed"
                >
                    I bridge the gap between{' '}
                    <strong className="text-slate-200">Vulnerability Assessment</strong> and{' '}
                    <strong className="text-slate-200">Incident Response</strong>.
                    I don't just find vulnerabilities—I build the architectures to stop them.
                </motion.p>
            </div>

            {/* ── CTA Buttons ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative z-30 flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            >
                <button onClick={scrollToWork} className="btn-static-border cursor-pointer group">
                    <span>View Case Studies</span>
                </button>

                <button onClick={handleDownload} className="text-slate-300 hover:text-white font-medium text-sm flex items-center gap-2 group transition-colors px-4 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    Download Resume
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </button>
            </motion.div>

            {/* ── Half-Circle Arc Zone ── */}
            <div className="relative w-full max-w-5xl mx-auto" style={{ height: '280px' }}>
                {/* Animated radar */}
                <HalfCircleRadar />

                {/* Icons placed in arc pattern */}
                {/* 
                    Row 1 (outer arc, top): 3 icons spread wide
                    Row 2 (middle arc): 2 icons  
                    Row 3 (inner arc, bottom): 2 icons
                    + 1 bottom center
                */}
                <div className="absolute inset-0 z-10">
                    {/* Outer row — 3 icons */}
                    <div className="absolute top-0 left-0 right-0 flex justify-between px-8 md:px-20">
                        <SkillNode icon={skills[0].icon} label={skills[0].label} delay={0.5} />
                        <SkillNode icon={skills[1].icon} label={skills[1].label} delay={0.6} />
                        <SkillNode icon={skills[2].icon} label={skills[2].label} delay={0.7} />
                    </div>

                    {/* Middle row — 2 icons */}
                    <div className="absolute top-[80px] left-0 right-0 flex justify-around px-24 md:px-48">
                        <SkillNode icon={skills[3].icon} label={skills[3].label} delay={0.8} />
                        <SkillNode icon={skills[4].icon} label={skills[4].label} delay={0.9} />
                    </div>

                    {/* Inner row — 2 icons + 1 center */}
                    <div className="absolute top-[160px] left-0 right-0 flex justify-between px-16 md:px-36">
                        <SkillNode icon={skills[5].icon} label={skills[5].label} delay={1.0} />
                        <div className="flex-1" />
                        <SkillNode icon={skills[6].icon} label={skills[6].label} delay={1.1} />
                    </div>

                    {/* Bottom center */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:block">
                        <SkillNode icon={skills[7].icon} label={skills[7].label} delay={1.2} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
