import React, { useState } from 'react';
import { Mail, Linkedin, Sparkles, Send, ArrowUpRight, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

/* ─── Career Timeline ─── */
const timelineData = [
    {
        role: 'Cybersecurity Intern',
        org: 'Red Team Hacker Academy',
        date: 'Present',
        active: true,
        color: '#22d3ee',
        description: 'Conducted full VAPT lifecycles on web/network assets using Nessus & Burp Suite. Monitored real-time alerts via Splunk/Wazuh to identify IOCs.',
        skills: ['VAPT', 'Splunk', 'Wazuh', 'Nessus', 'Burp Suite'],
    },
    {
        role: "Bachelor's in Computer Application",
        org: 'Karnatak Arts, Science & Commerce College',
        date: 'Graduated',
        active: false,
        color: '#6366f1',
        description: 'Built strong foundations in networking, operating systems, and programming that serve as the backbone of cybersecurity expertise.',
        skills: ['Networking', 'OS Fundamentals', 'Programming'],
    },
];

const About = () => {
    return (
        <section id="about" className="mt-32 max-w-4xl mx-auto">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center justify-between"
            >
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">Career Timeline</h2>
                <div className="hidden md:block h-[1px] bg-gradient-to-r from-white/10 to-transparent flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 text-sm mb-14 max-w-lg"
            >
                Key milestones in my cybersecurity journey — from education to hands-on threat detection.
            </motion.p>

            {/* Timeline */}
            <div className="relative ml-4">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-500/40 via-indigo-500/20 to-transparent" />

                <div className="space-y-12">
                    {timelineData.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.5 }}
                            className="relative pl-10 group"
                        >
                            {/* Timeline dot */}
                            <div className="absolute -left-[7px] top-2">
                                <div
                                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                                    style={{
                                        borderColor: item.color,
                                        background: item.active ? item.color : 'transparent',
                                        boxShadow: item.active ? `0 0 12px ${item.color}60, 0 0 24px ${item.color}30` : 'none',
                                    }}
                                >
                                    {item.active && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                </div>
                                {/* Pulse ring for active */}
                                {item.active && (
                                    <div
                                        className="absolute -inset-1 rounded-full animate-ping opacity-30"
                                        style={{ borderColor: item.color, border: `1px solid ${item.color}` }}
                                    />
                                )}
                            </div>

                            {/* Card */}
                            <div className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all duration-300">
                                {/* Left accent */}
                                <div className="absolute left-0 top-0 bottom-0 w-[2px]" style={{ background: `linear-gradient(to bottom, ${item.color}, transparent)` }} />

                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                                            {item.role}
                                        </h3>
                                        <div className="text-sm font-medium mt-1" style={{ color: item.color }}>{item.org}</div>
                                    </div>
                                    <span
                                        className="mt-2 sm:mt-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                                        style={{
                                            background: `${item.color}15`,
                                            color: item.color,
                                            border: `1px solid ${item.color}30`,
                                        }}
                                    >
                                        {item.active && <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: item.color }} />}
                                        {item.date}
                                    </span>
                                </div>

                                <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>

                                {/* Skill tags */}
                                <div className="flex flex-wrap gap-2">
                                    {item.skills.map(skill => (
                                        <span key={skill} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] text-slate-400">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── Contact Section ─── */
const contactLinks = [
    {
        icon: Mail,
        label: 'Email',
        value: 'nishasorallikar@gmail.com',
        href: 'mailto:nishasorallikar@gmail.com',
        color: '#22d3ee',
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: '/in/nisha-sorallikar',
        href: 'https://linkedin.com/in/nisha-sorallikar',
        color: '#3b82f6',
        external: true,
    },
    {
        icon: FileText,
        label: 'Resume',
        value: 'Download PDF',
        href: 'https://drive.google.com/file/d/1K8sj0vT2jy3n6GrR0kjz4TzvPcLO0TE1/view?usp=sharing',
        color: '#10b981',
        external: true,
    },
];

const Contact = () => {
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isDrafting, setIsDrafting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent (Demo)!');
        setName('');
        setEmail('');
        setMsg('');
    };

    const generateDraft = async () => {
        toast('Drafting message...', { icon: '✨' });
        setMsg("AI is thinking...");
        setIsDrafting(true);

        try {
            await new Promise(r => setTimeout(r, 1500));
            setMsg(`Hi Nisha,\n\nI'm ${name || 'a Recruiter'} and I was impressed by your cybersecurity portfolio. We have an open SOC Analyst role that fits your Splunk experience perfectly.\n\nLet's connect!`);
            toast.success('Draft generated!');
        } catch (e) {
            setMsg("");
            toast.error('Failed to draft.');
        } finally {
            setIsDrafting(false);
        }
    };

    return (
        <section id="contact" className="mt-32 max-w-5xl mx-auto mb-20">
            {/* Section header */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="mb-4 flex items-center justify-between"
            >
                <h2 className="text-3xl font-display font-bold text-white tracking-tight">Get In Touch</h2>
                <div className="hidden md:block h-[1px] bg-gradient-to-r from-white/10 to-transparent flex-1 ml-10"></div>
            </motion.div>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-slate-500 text-sm mb-14 max-w-lg"
            >
                Ready to secure the next perimeter? I'm open to SOC Analyst roles and offensive security opportunities.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-10 items-start">

                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl font-display font-bold mb-3 text-white leading-tight">
                        Ready to secure <br />the next perimeter?
                    </h3>
                    <p className="text-slate-400 text-sm mb-10 leading-relaxed max-w-sm">
                        Whether you have a challenge to solve or just want to discuss the latest CVEs, I'm all ears.
                    </p>

                    <div className="space-y-4">
                        {contactLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.external ? '_blank' : undefined}
                                rel={link.external ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group"
                            >
                                <div
                                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `${link.color}10`,
                                        border: `1px solid ${link.color}25`,
                                    }}
                                >
                                    <link.icon size={18} style={{ color: link.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <span className="block text-[10px] uppercase tracking-widest font-semibold text-slate-500 mb-0.5">{link.label}</span>
                                    <span className="block text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">{link.value}</span>
                                </div>
                                {link.external && (
                                    <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                                )}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
                >
                    {/* Accent line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="contact-name" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Name</label>
                            <input
                                id="contact-name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="contact-email" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Email</label>
                            <input
                                id="contact-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="jane@company.com"
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all duration-300"
                                required
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label htmlFor="contact-message" className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Message</label>
                                <button
                                    type="button"
                                    onClick={generateDraft}
                                    disabled={isDrafting}
                                    className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 disabled:opacity-50 cursor-pointer uppercase tracking-wider font-semibold transition-colors"
                                >
                                    <Sparkles size={10} /> Draft with AI
                                </button>
                            </div>
                            <textarea
                                id="contact-message"
                                rows="4"
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Tell me about your project..."
                                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none focus:border-cyan-500/40 focus:bg-white/[0.06] transition-all duration-300 resize-none"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="w-full relative overflow-hidden rounded-xl border border-cyan-500/20 bg-cyan-500/5 hover:bg-cyan-500/10 text-cyan-400 hover:text-white font-semibold text-sm py-3.5 transition-all duration-300 cursor-pointer group flex items-center justify-center gap-2">
                            <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            Send Transmission
                        </button>
                    </form>
                </motion.div>

            </div>
        </section>
    );
};

export { About, Contact };
