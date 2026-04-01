import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy load ALL page components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const SOCLabProject = lazy(() => import('./pages/SOCLabProject'));

const CSACourseLayout = lazy(() => import('./layouts/CSACourseLayout'));
const CSADashboard = lazy(() => import('./pages/csa/CSADashboard'));
const CSAModuleDetails = lazy(() => import('./pages/csa/CSAModuleDetails'));
const CSAPracticeExam = lazy(() => import('./pages/csa/CSAPracticeExam'));
const CSAModule01 = lazy(() => import('./pages/csa/CSAModule01'));
const CSAModule02 = lazy(() => import('./pages/csa/CSAModule02'));
const CSAModule03 = lazy(() => import('./pages/csa/CSAModule03'));
const CSAModule04 = lazy(() => import('./pages/csa/CSAModule04'));
const CSAModule05 = lazy(() => import('./pages/csa/CSAModule05'));
const CSAModule06 = lazy(() => import('./pages/csa/CSAModule06'));
const CSAModule07 = lazy(() => import('./pages/csa/CSAModule07'));
const CSAModule08 = lazy(() => import('./pages/csa/CSAModule08'));

const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Suspense fallback={<PageLoader />}><Home /></Suspense></MainLayout>} />
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
            <Route path="/csa" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSADashboard /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-01" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule01 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-02" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule02 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-03" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule03 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-04" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule04 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-05" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule05 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-06" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule06 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-07" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule07 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module-08" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModule08 /></Suspense></CSACourseLayout>} />
            <Route path="/csa/module/:moduleId" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAModuleDetails /></Suspense></CSACourseLayout>} />
            <Route path="/csa/practice-exam" element={<CSACourseLayout><Suspense fallback={<PageLoader />}><CSAPracticeExam /></Suspense></CSACourseLayout>} />
        </Routes>
    );
}

export default App;
