"use client";
import React, { useEffect, useRef, useState, memo } from 'react';

interface TypewriterWrapperProps {
    children: React.ReactNode;
    speed?: number; // ms per tick
    charsPerTick?: number;
}

export const TypewriterWrapper = memo(function TypewriterWrapper({
    children,
    speed = 10,
    charsPerTick = 3
}: TypewriterWrapperProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Get all text nodes
        const textNodes: { node: Node; text: string }[] = [];
        const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);

        let currentNode = walker.nextNode();
        while (currentNode) {
            if (currentNode.nodeValue && currentNode.nodeValue.trim() !== '') {
                textNodes.push({ node: currentNode, text: currentNode.nodeValue });
                currentNode.nodeValue = ''; // Clear text immediately
            }
            currentNode = walker.nextNode();
        }

        setIsRendered(true);

        if (textNodes.length === 0) {
            return;
        }

        let currentNodeIndex = 0;
        let currentCharIndex = 0;

        const interval = setInterval(() => {
            if (currentNodeIndex >= textNodes.length) {
                clearInterval(interval);
                window.dispatchEvent(new Event('typewriter-tick'));
                return;
            }

            const activeTextObj = textNodes[currentNodeIndex];

            currentCharIndex += charsPerTick;

            if (currentCharIndex >= activeTextObj.text.length) {
                activeTextObj.node.nodeValue = activeTextObj.text;
                currentNodeIndex++;
                currentCharIndex = 0;
            } else {
                activeTextObj.node.nodeValue = activeTextObj.text.substring(0, currentCharIndex);
            }

            // Dispatch event to allow auto-scrolling
            window.dispatchEvent(new Event('typewriter-tick'));

        }, speed);

        return () => clearInterval(interval);
    }, [speed, charsPerTick]);

    return (
        <div ref={containerRef} className={isRendered ? "opacity-100" : "opacity-0 invisible"}>
            {children}
        </div>
    );
});
