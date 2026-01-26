import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import { Clock, Tag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 text-slate-300 text-xs font-medium backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    Knowledge Base
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white">
                    Threat Intelligence <span className="text-gradient">& Writeups</span>
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto">
                    Documentation of my journey through offensive security, digital forensics, and SOC operations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link to={`/blog/${post.id}`} className="card-wrapper group block h-full">
                            <div className="card-content p-6 flex flex-col h-full bg-slate-950/50 border border-white/5 hover:border-cyan-500/30 transition-colors">

                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs rounded font-medium">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-500 text-xs flex items-center gap-1">
                                        <Clock size={12} /> {post.readTime}
                                    </span>
                                </div>

                                <h2 className="text-xl font-display font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-[10px] text-slate-500 bg-slate-900 px-2 py-1 rounded border border-white/5">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center text-cyan-400 text-sm font-semibold gap-2 group-hover:gap-3 transition-all">
                                        Read Article <ArrowRight size={14} />
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
