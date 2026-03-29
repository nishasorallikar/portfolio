import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Shield, Star, Lock } from 'lucide-react';
import csaModulesData from '../../data/csaModulesData';

// Animations
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CSADashboard() {
  const [earnedBadges, setEarnedBadges] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('csa_badges');
      if (stored) {
        setEarnedBadges(JSON.parse(stored));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const progressPercent = (earnedBadges.length / 8) * 100;

  return (
    <div className="bg-black min-h-screen text-zinc-100">
      {/* Hero Section */}
      <div className="relative bg-zinc-950 px-6 py-[80px] overflow-hidden">
        <div 
          className="absolute inset-0 pointer-events-none" 
          style={{ 
            background: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)' 
          }} 
        />
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
            EC-Council CSA v2 
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl">
            Certified SOC Analyst — Interactive Course
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-sm font-medium">
              8 Modules
            </div>
            <div className="px-4 py-2 rounded-full border border-zinc-700 bg-zinc-900/50 text-sm font-medium">
              Complete All to Earn CSA Certified Badge
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-end mb-3">
            <h2 className="text-2xl font-bold">Your Progress</h2>
            <span className="text-zinc-400 font-medium text-sm">{earnedBadges.length} of 8 modules completed</span>
          </div>
          <div className="h-4 w-full bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Modules Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          {csaModulesData.map((m) => {
            const isEarned = earnedBadges.includes(m.badge);

            return (
              <motion.div 
                key={m.id}
                variants={cardVariant}
                whileHover={{ scale: 1.02, borderColor: `var(--tw-colors-${m.accent}-500, #10b981)` }}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col transition-colors duration-300 relative group"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold px-2 py-1 bg-zinc-700 rounded-full inline-block text-zinc-100">
                    M{m.number}
                  </span>
                  
                  {/* Difficulty Chip */}
                  <span className={`text-xs px-2 py-1 rounded-full border ${
                    m.difficulty === 'Beginner' ? 'border-emerald-500/50 text-emerald-400' :
                    m.difficulty === 'Intermediate' ? 'border-amber-500/50 text-amber-400' :
                    'border-rose-500/50 text-rose-400'
                  }`}>
                    {m.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-zinc-100 mb-2">{m.title}</h3>
                
                <div className="flex items-center gap-1 text-zinc-500 text-sm mb-4">
                  <Clock className="w-4 h-4" />
                  <span>{m.estimatedTime}</span>
                </div>

                <div className="flex-grow mb-6">
                  <ul className="text-zinc-400 text-sm space-y-2">
                    {m.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-zinc-600 mt-1">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                  {m.topics.length > 3 && (
                    <p className="text-zinc-500 text-xs mt-2 italic">
                      + {m.topics.length - 3} more topics
                    </p>
                  )}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
                    {isEarned ? (
                      <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
                        <Star className="w-4 h-4 fill-current" />
                        <span>Badge Earned</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-zinc-600 text-sm font-medium">
                        <Lock className="w-4 h-4" />
                        <span>Locked</span>
                      </div>
                    )}
                  </div>

                  <Link 
                    to={m.route}
                    className="block w-full text-center py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors border border-zinc-700"
                    style={{ 
                      backgroundColor: 'var(--accent-color, #3f3f46)', 
                      borderColor: 'var(--accent-border, #52525b)' 
                    }}
                  >
                    Start Module
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Practice Exam Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-zinc-100 mb-2 flex items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-400" />
              CSA Practice Exam
            </h3>
            <p className="text-zinc-400">
              100 questions covering all 8 modules — simulate the real EC-Council CSA exam.
            </p>
          </div>
          <Link 
            to="/csa/practice-exam"
            className="whitespace-nowrap px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors shadow-lg shadow-indigo-900/20"
          >
            Start Practice Exam
          </Link>
        </div>
      </div>
    </div>
  );
}
