import React, { useState, useEffect } from 'react';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#________';

export const ScrambleText = ({ text, className, delay = 0 }) => {
    const [scrambled, setScrambled] = useState('');

    useEffect(() => {
        let frame = 0;
        let timeout;
        
        const scramble = () => {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                if (frame >= i * 2) {
                    result += text[i];
                } else {
                    result += CHARS[Math.floor(Math.random() * CHARS.length)];
                }
            }
            setScrambled(result);
            frame++;

            if (frame < text.length * 2 + 5) {
                timeout = setTimeout(scramble, 30);
            }
        };

        const initialTimeout = setTimeout(scramble, delay);

        return () => {
            clearTimeout(initialTimeout);
            clearTimeout(timeout);
        };
    }, [text, delay]);

    return <span className={className}>{scrambled}</span>;
};
