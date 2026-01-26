import React, { useState } from 'react';
import { Mail, Linkedin, Phone, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const About = () => {
    return (
        <section id="about" className="mt-32 max-w-3xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-10 text-center text-white">Career Timeline</h2>

            <div className="relative border-l border-slate-800 ml-3 space-y-12 pb-12">
                <div className="relative pl-10 group">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="text-lg font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">Cybersecurity Intern</h3>
                        <span className="font-mono text-xs text-slate-500 border border-slate-800 px-2 py-0.5 rounded">Present</span>
                    </div>
                    <div className="text-cyan-500 text-sm font-medium mb-4">Red Team Hacker Academy</div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Conducted full VAPT lifecycles on web/network assets using Nessus & Burp Suite. Monitored real-time alerts via Splunk/Wazuh to identify IOCs.
                    </p>
                </div>

                <div className="relative pl-10 group opacity-70 hover:opacity-100 transition-opacity">
                    <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                        <h3 className="text-lg font-bold text-slate-300">Bachelor’s in Computer Application</h3>
                        <span className="font-mono text-xs text-slate-600">Graduated</span>
                    </div>
                    <div className="text-slate-500 text-sm font-medium mb-4">Karnatak Arts, Science & Commerce College</div>
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [msg, setMsg] = useState('');
    const [name, setName] = useState('');
    const [isDrafting, setIsDrafting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Message sent (Demo)!');
        setName('');
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
            <div className="grid md:grid-cols-2 gap-12 items-start">

                {/* Contact Info */}
                <div>
                    <h2 className="text-4xl font-display font-bold mb-6 text-slate-100">Ready to secure <br /> the next perimeter?</h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        I'm currently looking for new opportunities in SOC Analysis and Offensive Security.
                        Whether you have a challenge to solve or just want to discuss the latest CVEs, I'm all ears.
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:nishasorallikar@gmail.com" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                                <Mail size={18} />
                            </div>
                            <div>
                                <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Email</span>
                                <span className="text-lg font-medium">nishasorallikar@gmail.com</span>
                            </div>
                        </a>

                        <a href="https://linkedin.com/in/nisha-sorallikar" target="_blank" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                                <Linkedin size={18} />
                            </div>
                            <div>
                                <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-0.5">LinkedIn</span>
                                <span className="text-lg font-medium">/in/nisha-sorallikar</span>
                            </div>
                        </a>

                        <a href="tel:+918792803740" className="flex items-center gap-4 text-slate-300 hover:text-cyan-400 transition-colors group">
                            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
                                <Phone size={18} />
                            </div>
                            <div>
                                <span className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-0.5">Phone</span>
                                <span class="text-lg font-medium">+91 87928 03740</span>
                            </div>
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="card-wrapper">
                    <div className="card-content p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Jane Doe"
                                    className="form-input"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Email</label>
                                <input type="email" placeholder="jane@company.com" className="form-input" required />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Message</label>
                                    <button
                                        type="button"
                                        onClick={generateDraft}
                                        disabled={isDrafting}
                                        className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 disabled:opacity-50"
                                    >
                                        <Sparkles size={12} /> ✨ Draft with AI
                                    </button>
                                </div>
                                <textarea
                                    rows="4"
                                    value={msg}
                                    onChange={(e) => setMsg(e.target.value)}
                                    placeholder="Tell me about your project..."
                                    className="form-input"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="w-full btn-static-border cursor-pointer group">
                                <span className="group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">Send Transmission</span>
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    );
};

export { About, Contact };
