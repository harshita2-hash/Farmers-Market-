import { useState } from 'react';
import { BookOpen, Calendar, Clock, X, Sparkles, User, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogProps {
  posts: BlogPost[];
}

export default function Blog({ posts }: BlogProps) {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            NUTRITIONAL PATHS & FARMING INTELLIGENCE
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Our Organic Knowledge Hub
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            Read seasonal diet recipes, healthy biome studies, and detailed farming reports directly authored by nutrition experts.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <article
              key={post.id}
              className="group bg-white dark:bg-zinc-850 rounded-3xl overflow-hidden border border-zinc-150 dark:border-zinc-800 hover:border-emerald-250 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
            >
              
              {/* Photo */}
              <div className="h-48 overflow-hidden relative shrink-0 bg-zinc-100">
                <img
                  src={post.image}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform group-hover:scale-103"
                />
                <span className="absolute top-4 left-4 px-2.5 py-0.5 text-[8px] font-black bg-zinc-950/70 text-white uppercase tracking-widest rounded-md">
                  {post.category}
                </span>
              </div>

              {/* textual info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3.5 text-[10px] text-zinc-400 font-bold font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-550" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-555" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xs sm:text-sm text-zinc-900 dark:text-neutral-50 group-hover:text-emerald-700 leading-snug transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed truncate-2-lines">
                    {post.excerpt}
                  </p>
                </div>

                {/* read trigger */}
                <button
                  onClick={() => setSelectedPost(post)}
                  className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-[10px] font-extrabold text-emerald-600 hover:text-emerald-704 dark:text-emerald-400 dark:hover:text-emerald-300 uppercase tracking-widest inline-flex items-center gap-1 cursor-pointer"
                >
                  Read Full Article
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

              </div>

            </article>
          ))}
        </div>

        {/* Selected Post Reading Modal popup */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-emerald-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-250 flex flex-col max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Category & timing headers */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold font-sans text-zinc-400">
                  <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-750 dark:text-emerald-400 text-[10px] rounded-md uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {selectedPost.readTime}
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl text-zinc-900 dark:text-neutral-50 leading-tight">
                  {selectedPost.title}
                </h3>

                {/* Author profile tag */}
                <div className="flex items-center gap-2 text-xs font-bold font-sans text-zinc-550 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <span className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                    <User className="w-4 h-4 text-emerald-500" />
                  </span>
                  <span>Written by: {selectedPost.author}</span>
                </div>
              </div>

              {/* Rich Body Content */}
              <div className="p-1.5 py-4 font-sans text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed whitespace-pre-line space-y-4">
                <p className="font-semibold text-zinc-900 dark:text-white leading-relaxed text-sm">
                  {selectedPost.excerpt}
                </p>
                <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
                  {selectedPost.content}
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 mt-4 flex justify-end">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="py-2.5 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Return to Archive
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
