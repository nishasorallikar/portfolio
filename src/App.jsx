import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

// Lazy load non-critical routes for code splitting
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SOCLabProject = lazy(() => import('./pages/SOCLabProject'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/blog" element={
                <MainLayout>
                    <Suspense fallback={<PageLoader />}>
                        <Blog />
                    </Suspense>
                </MainLayout>
            } />
            <Route path="/blog/:id" element={
                <MainLayout>
                    <Suspense fallback={<PageLoader />}>
                        <BlogPost />
                    </Suspense>
                </MainLayout>
            } />
            <Route path="/project/soc-lab" element={
                <MainLayout>
                    <Suspense fallback={<PageLoader />}>
                        <SOCLabProject />
                    </Suspense>
                </MainLayout>
            } />
        </Routes>
    );
}

export default App;
