import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed: number = 20) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        setDisplayedText(""); // Reset on text change

        const typingInterval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return displayedText;
}

export function useTypewriterLines(lines: string[], speed: number = 20, lineDelay: number = 100) {
    const [displayedLines, setDisplayedLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (!lines || lines.length === 0) return;

        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setIsComplete(false);
    }, [lines]);

    useEffect(() => {
        if (currentLineIndex >= lines.length) {
            setIsComplete(true);
            return;
        }

        const currentLine = lines[currentLineIndex];
        let charIndex = 0;
        let currentText = "";

        const typingInterval = setInterval(() => {
            if (charIndex < currentLine.length) {
                currentText = currentLine.substring(0, charIndex + 1);

                setDisplayedLines(prev => {
                    const newLines = [...prev];
                    newLines[currentLineIndex] = currentText;
                    return newLines;
                });

                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setCurrentLineIndex(prev => prev + 1);
                }, lineDelay);
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [currentLineIndex, lines, speed, lineDelay]);

    return { displayedLines, isComplete };
}
