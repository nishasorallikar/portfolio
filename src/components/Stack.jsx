import React from 'react';
import GlowCard from './GlowCard';
import { Shield, Server, Terminal, Search, Globe, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const stack = [
    { name: "Offensive Security", icon: Shield, tools: ["Burp Suite", "Metasploit", "Nmap"] },
    { name: "SOC Operations", icon: Server, tools: ["Splunk", "Wazuh", "ELK"] },
    { name: "Forensics", icon: Search, tools: ["Autopsy", "FTK", "Volatility"] },
    { name: "Cloud Defense", icon: Globe, tools: ["AWS Guard", "Azure Sentinel"] },
    { name: "Scripting", icon: Terminal, tools: ["Python", "Bash", "PowerShell"] },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

const Stack = () => {
    return (
        <section id="stack" className="py-24">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-12 flex items-center justify-between"
            >
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">Technical Arsenal</h2>
                <div className="hidden md:block h-[1px] bg-white/10 flex-1 ml-10"></div>
            </motion.div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {stack.map((stackItem, index) => (
                    <motion.div key={index} variants={item}>
                        <GlowCard className="p-6 group flex flex-col justify-between hover:bg-white/[0.04] transition-colors h-full">
                            <div className="flex items-start justify-between mb-6">
                                <div className="p-3 bg-white/5 rounded-lg text-white group-hover:text-accent group-hover:scale-110 transition-all duration-300">
                                    <stackItem.icon size={24} />
                                </div>
                                <ChevronRight className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-white mb-2">{stackItem.name}</h3>
                                <div className="flex flex-wrap gap-2 text-sm text-muted">
                                    {stackItem.tools.join(" • ")}
                                </div>
                            </div>
                        </GlowCard>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Stack;
