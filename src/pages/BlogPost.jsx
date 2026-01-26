import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === id);

    if (!post) {
        return (
            <div className="text-center py-20 text-white">
                <h1 className="text-2xl font-bold mb-4">Post not found</h1>
                <Link to="/blog" className="text-cyan-400 hover:underline">Back to Intelligence</Link>
            </div>
        );
    }

    return (
        <article className="max-w-3xl mx-auto">
            <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Intelligence
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex gap-4 text-xs font-mono text-cyan-400 mb-4">
                    <span className="bg-cyan-950/30 px-2 py-1 rounded border border-cyan-500/20">{post.category}</span>
                </div>

                <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                    {post.title}
                </h1>

                <div className="flex items-center gap-6 text-sm text-slate-500 mb-8 border-b border-white/10 pb-8">
                    <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                    <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                </div>

                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:text-white prose-a:text-cyan-400 prose-pre:bg-slate-900 prose-pre:border prose-pre:border-white/10"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map(tag => (
                            <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-slate-900 border border-white/10 rounded-full text-xs text-slate-300">
                                <Tag size={12} /> {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </article>
    );
};

export default BlogPost;
