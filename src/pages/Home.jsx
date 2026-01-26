import React from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import { About, Contact } from '../components/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <Work />
            <About />
            <Contact />
        </>
    );
};

export default Home;
