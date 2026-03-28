import React from 'react';
import Hero from '../components/Hero';
import Work from '../components/Work';
import Stack from '../components/Stack';
import { About, Contact } from '../components/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <Work />
            <Stack />
            <About />
            <Contact />
        </>
    );
};

export default Home;
