import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedUnderlineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function AnimatedUnderline({ 
  children, 
  className,
  delay = 2,
  duration = 2
}: AnimatedUnderlineProps) {
  return (
    <>
      <style>{`
        @keyframes underline-grow {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        .text-decoration-animate {
          position: relative;
        }
        .text-decoration-animate::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          animation: underline-grow ${duration}s ease-out forwards;
          animation-delay: ${delay}s;
        }
      `}</style>
      <div className={cn('text-decoration-animate', className)}>
        {children}
      </div>
    </>
  );
}

