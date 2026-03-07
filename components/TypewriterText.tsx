"use client";
import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
}

export const TypewriterText = ({ text, speed = 5, delay = 0, className = "whitespace-pre-wrap" }: TypewriterTextProps) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        let intervalId: NodeJS.Timeout;

        // Clear initial state
        setDisplayedText("");

        const startTyping = () => {
            intervalId = setInterval(() => {
                if (index < text.length) {
                    index++;
                    setDisplayedText(text.slice(0, index));
                } else {
                    clearInterval(intervalId);
                }
            }, speed);
        };

        const timeoutId = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeoutId);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, speed, delay]);

    return (
        <span className={className}>
            <span>{displayedText}</span>
            <span className="invisible select-none" aria-hidden="true">{text.slice(displayedText.length)}</span>
        </span>
    );
};
