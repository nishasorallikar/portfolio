import React, { useRef, useState } from 'react';
import { cn } from '../lib/utils';

const GlowCard = ({ children, className, ...props }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const rect = divRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        divRef.current.style.setProperty('--mouse-x', `${x}px`);
        divRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={cn(
                "glow-card relative rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm",
                className
            )}
            {...props}
        >
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

export default GlowCard;
