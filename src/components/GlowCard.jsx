import React, { useRef } from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const GlowCard = ({ children, className, ...props }) => {
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={cn(
                "group relative rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm overflow-hidden will-change-transform",
                className
            )}
            {...props}
        >
            {/* Interactive Spotlight Glow */}
            <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,211,238,0.1), transparent 40%)`
                }}
            />
            
            <div className="relative z-10 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default GlowCard;
