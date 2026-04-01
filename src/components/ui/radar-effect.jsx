import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Full-screen radar canvas with a glowing sweep, concentric rings,
 * pulsing blips, and random scan-dots — all rendered on a <canvas>
 * for buttery 60fps performance.
 */
export const RadarCanvas = ({ className = "" }) => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height, cx, cy, radius;

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
      cy = height / 2;
      radius = height * 0.42;
    };

    resize();
    window.addEventListener("resize", resize);

    // Blip data — random dots that pulse on the radar
    const blips = Array.from({ length: 14 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: 0.25 + Math.random() * 0.7,
      size: 1.5 + Math.random() * 2.5,
      alpha: 0,
      fadeSpeed: 0.008 + Math.random() * 0.012,
      hue: Math.random() > 0.7 ? 340 : 180, // mostly cyan, some red
    }));

    let sweepAngle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // ── Concentric rings ──
      const ringCount = 5;
      for (let i = 1; i <= ringCount; i++) {
        const r = (radius / ringCount) * i;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.06 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ── Cross-hairs ──
      ctx.strokeStyle = "rgba(34, 211, 238, 0.06)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Diagonal cross-hairs
      const d = radius * 0.707;
      ctx.beginPath();
      ctx.moveTo(cx - d, cy - d);
      ctx.lineTo(cx + d, cy + d);
      ctx.moveTo(cx + d, cy - d);
      ctx.lineTo(cx - d, cy + d);
      ctx.stroke();

      // ── Sweep beam ──
      sweepAngle += 0.012;
      const sweepGrad = ctx.createConicalGradient
        ? null
        : (() => {
            // Fallback: draw a filled arc for the sweep
            return null;
          })();

      // Draw sweep as a filled arc sector with gradient
      const sweepLen = Math.PI * 0.35;
      const gradient = ctx.createConicGradient(sweepAngle - sweepLen, cx, cy);
      gradient.addColorStop(0, "rgba(34, 211, 238, 0)");
      gradient.addColorStop(0.7, "rgba(34, 211, 238, 0.12)");
      gradient.addColorStop(0.95, "rgba(34, 211, 238, 0.25)");
      gradient.addColorStop(1, "rgba(34, 211, 238, 0)");

      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Sweep leading edge (bright line)
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(
        cx + Math.cos(sweepAngle) * radius,
        cy + Math.sin(sweepAngle) * radius
      );
      // Glow
      ctx.strokeStyle = "rgba(34, 211, 238, 0.5)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(34, 211, 238, 0.6)";
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // ── Center dot ──
      const centerGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 8);
      centerGlow.addColorStop(0, "rgba(34, 211, 238, 0.9)");
      centerGlow.addColorStop(0.5, "rgba(34, 211, 238, 0.3)");
      centerGlow.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "rgba(34, 211, 238, 1)";
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // ── Blips ──
      for (const blip of blips) {
        // Check if sweep just passed this blip
        const angleDiff = ((sweepAngle - blip.angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        if (angleDiff < 0.15) {
          blip.alpha = 1;
        }
        blip.alpha = Math.max(0, blip.alpha - blip.fadeSpeed);

        if (blip.alpha > 0.01) {
          const bx = cx + Math.cos(blip.angle) * radius * blip.dist;
          const by = cy + Math.sin(blip.angle) * radius * blip.dist;

          // Glow
          const blipGlow = ctx.createRadialGradient(bx, by, 0, bx, by, blip.size * 4);
          const hsl = blip.hue === 180 ? "34, 211, 238" : "239, 68, 68";
          blipGlow.addColorStop(0, `rgba(${hsl}, ${blip.alpha * 0.5})`);
          blipGlow.addColorStop(1, `rgba(${hsl}, 0)`);
          ctx.fillStyle = blipGlow;
          ctx.beginPath();
          ctx.arc(bx, by, blip.size * 4, 0, Math.PI * 2);
          ctx.fill();

          // Dot
          ctx.fillStyle = `rgba(${hsl}, ${blip.alpha})`;
          ctx.beginPath();
          ctx.arc(bx, by, blip.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ── Outer ring glow ──
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "rgba(34, 211, 238, 0.3)";
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.shadowBlur = 0;

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

/**
 * A single skill node that sits around the radar with a glowing connector line
 * pointing toward the center.
 */
export const SkillNode = ({
  icon,
  label,
  x,
  y,
  delay = 0,
  accentColor = "cyan",
}) => {
  const colorMap = {
    cyan: { border: "border-cyan-500/30", glow: "shadow-cyan-500/20", text: "text-cyan-400", bg: "bg-cyan-500/5", line: "rgba(34,211,238,0.15)" },
    red: { border: "border-red-500/30", glow: "shadow-red-500/20", text: "text-red-400", bg: "bg-red-500/5", line: "rgba(239,68,68,0.15)" },
    purple: { border: "border-purple-500/30", glow: "shadow-purple-500/20", text: "text-purple-400", bg: "bg-purple-500/5", line: "rgba(168,85,247,0.15)" },
    blue: { border: "border-blue-500/30", glow: "shadow-blue-500/20", text: "text-blue-400", bg: "bg-blue-500/5", line: "rgba(59,130,246,0.15)" },
    green: { border: "border-green-500/30", glow: "shadow-green-500/20", text: "text-green-400", bg: "bg-green-500/5", line: "rgba(34,197,94,0.15)" },
    yellow: { border: "border-yellow-500/30", glow: "shadow-yellow-500/20", text: "text-yellow-400", bg: "bg-yellow-500/5", line: "rgba(234,179,8,0.15)" },
    orange: { border: "border-orange-500/30", glow: "shadow-orange-500/20", text: "text-orange-400", bg: "bg-orange-500/5", line: "rgba(249,115,22,0.15)" },
    pink: { border: "border-pink-500/30", glow: "shadow-pink-500/20", text: "text-pink-400", bg: "bg-pink-500/5", line: "rgba(236,72,153,0.15)" },
  };

  const c = colorMap[accentColor] || colorMap.cyan;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 120 }}
      className="absolute z-30 flex flex-col items-center gap-1.5 group"
      style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
    >
      <motion.div
        whileHover={{ scale: 1.15 }}
        className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl border ${c.border} ${c.bg} backdrop-blur-md shadow-lg ${c.glow} transition-all duration-300 cursor-default`}
      >
        {/* Pulse ring on hover */}
        <div className={`absolute inset-0 rounded-2xl border ${c.border} opacity-0 group-hover:opacity-100 group-hover:animate-ping`} />
        <div className="relative z-10">{icon}</div>
      </motion.div>
      <span className={`text-[10px] sm:text-[11px] font-semibold ${c.text} opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-wide uppercase`}>
        {label}
      </span>
    </motion.div>
  );
};
