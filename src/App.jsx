import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout><Home /></MainLayout>} />
            <Route path="/blog" element={<MainLayout><Blog /></MainLayout>} />
            <Route path="/blog/:id" element={<MainLayout><BlogPost /></MainLayout>} />
        </Routes>
    );
}

export default App;
