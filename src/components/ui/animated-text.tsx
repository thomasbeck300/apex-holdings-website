import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  startDelay?: number;
  wordDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function AnimatedText({ 
  text, 
  className, 
  startDelay = 0, 
  wordDelay = 150,
  as: Component = 'p'
}: AnimatedTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const wordElements = containerRef.current?.querySelectorAll('.word-animate');
    if (!wordElements) return;

    wordElements.forEach((word) => {
      const delay = parseInt(word.getAttribute('data-delay') || '0');
      setTimeout(() => {
        if (word instanceof HTMLElement) {
          word.style.animation = 'word-appear 0.8s ease-out forwards';
        }
      }, delay);
    });
  }, []);

  useEffect(() => {
    const wordElements = containerRef.current?.querySelectorAll('.word-animate');
    if (!wordElements) return;

    const handleMouseEnter = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        e.target.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
      }
    };

    const handleMouseLeave = (e: Event) => {
      if (e.target instanceof HTMLElement) {
        e.target.style.textShadow = 'none';
      }
    };

    wordElements.forEach((word) => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      wordElements.forEach((word) => {
        word.removeEventListener('mouseenter', handleMouseEnter);
        word.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const words = text.split(' ');

  return (
    <>
      <style>{`
        @keyframes word-appear {
          0% { opacity: 0; transform: translateY(30px) scale(0.8); filter: blur(10px); }
          50% { opacity: 0.8; transform: translateY(10px) scale(0.95); filter: blur(2px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        .word-animate {
          display: inline-block;
          opacity: 0;
          margin: 0 0.15em;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .word-animate:hover {
          transform: translateY(-2px);
        }
      `}</style>
      <Component ref={containerRef as any} className={cn(className)}>
        {words.map((word, index) => (
          <span
            key={index}
            className="word-animate"
            data-delay={startDelay + index * wordDelay}
          >
            {word}
          </span>
        ))}
      </Component>
    </>
  );
}

