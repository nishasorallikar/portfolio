import React, { useId } from 'react';
import { motion } from 'framer-motion';

export default function ProgressHexagon({ current, total }) {
  const clipId = useId().replace(/:/g, ""); // Remove colons to ensure valid CSS ID
  const percentage = Math.min(Math.max(current / total, 0), 1);
  const heightValue = percentage * 80;
  const yValue = 82 - heightValue;

  return (
    <div className="fixed top-3 right-3 sm:top-6 sm:right-6 z-[60] flex flex-col items-center">
      <svg viewBox="0 0 80 92" className="w-9 h-11 sm:w-12 sm:h-14 overflow-visible">
        <defs>
          <clipPath id={clipId}>
            <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" />
          </clipPath>
        </defs>
        <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#1e293b" strokeWidth="2" fill="#020617" />
        <g clipPath={`url(#${clipId})`}>
          <motion.rect 
            x="0" 
            width="80" 
            fill="#22d3ee" 
            initial={{ y: 82, height: 0 }}
            animate={{ 
              y: yValue, 
              height: heightValue
            }}
            transition={{ type: "spring", damping: 20 }}
          />
        </g>
        <polygon points="40,2 78,22 78,62 40,82 2,62 2,22" stroke="#22d3ee" strokeWidth="2" fill="none" opacity="0.6" />
      </svg>
      <div className="text-cyan-400 font-bold text-[10px] sm:text-xs mt-1 sm:mt-2 text-center shadow-cyan-400/20">
        {current}/{total} Complete
      </div>
    </div>
  );
}
