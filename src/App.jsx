import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

// Lazy load non-critical routes for code splitting
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SOCLabProject = lazy(() => import('./pages/SOCLabProject'));

import CSACourseLayout from './layouts/CSACourseLayout';
import CSADashboard from './pages/csa/CSADashboard';
import CSAModuleDetails from './pages/csa/CSAModuleDetails';
import CSAPracticeExam from './pages/csa/CSAPracticeExam';
import CSAModule01 from './pages/csa/CSAModule01';
import CSAModule02 from './pages/csa/CSAModule02';
import CSAModule03 from './pages/csa/CSAModule03';
import CSAModule04 from './pages/csa/CSAModule04';
import CSAModule05 from './pages/csa/CSAModule05';
import CSAModule06 from './pages/csa/CSAModule06';
import CSAModule07 from './pages/csa/CSAModule07';
import CSAModule08 from './pages/csa/CSAModule08';

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
            <Route path="/csa" element={<CSACourseLayout><CSADashboard /></CSACourseLayout>} />
            <Route path="/csa/module-01" element={<CSACourseLayout><CSAModule01 /></CSACourseLayout>} />
            <Route path="/csa/module-02" element={<CSACourseLayout><CSAModule02 /></CSACourseLayout>} />
            <Route path="/csa/module-03" element={<CSACourseLayout><CSAModule03 /></CSACourseLayout>} />
            <Route path="/csa/module-04" element={<CSACourseLayout><CSAModule04 /></CSACourseLayout>} />
            <Route path="/csa/module-05" element={<CSACourseLayout><CSAModule05 /></CSACourseLayout>} />
            <Route path="/csa/module-06" element={<CSACourseLayout><CSAModule06 /></CSACourseLayout>} />
            <Route path="/csa/module-07" element={<CSACourseLayout><CSAModule07 /></CSACourseLayout>} />
            <Route path="/csa/module-08" element={<CSACourseLayout><CSAModule08 /></CSACourseLayout>} />
            <Route path="/csa/module/:moduleId" element={<CSACourseLayout><CSAModuleDetails /></CSACourseLayout>} />
            <Route path="/csa/practice-exam" element={<CSACourseLayout><CSAPracticeExam /></CSACourseLayout>} />
        </Routes>
    );
}

export default App;
