"use client";

import { useState, useEffect } from 'react';
import { useOnScreen } from '@/hooks/use-on-screen';
import { useRef } from 'react';

export function TypingAnimation({ text, startDelay = 0 }: { text: string; startDelay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen && !isTyping) {
        const typingTimeout = setTimeout(() => {
            setIsTyping(true);
            let i = 0;
            const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1));
            i++;
            if (i >= text.length) {
                clearInterval(interval);
            }
            }, 50);
            return () => clearInterval(interval);

        }, startDelay)
        return () => clearTimeout(typingTimeout);
    }
  }, [onScreen, text, startDelay, isTyping]);
  
  const showCursor = displayedText.length < text.length && isTyping;

  return (
    <span ref={ref}>
      {displayedText}
      <span className={`animate-pulse ${showCursor ? 'inline' : 'hidden'}`}>|</span>
    </span>
  );
}
