import React, { ComponentPropsWithoutRef, useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
    /**
     * Optional CSS class name to apply custom styles
     */
    className?: string;
    /**
     * Whether to reverse the animation direction
     * @default false
     */
    reverse?: boolean;
    /**
     * Whether to pause the animation on hover
     * @default false
     */
    pauseOnHover?: boolean;
    /**
     * Whether to speed up the animation on hover
     * @default false
     */
    speedUpOnHover?: boolean;
    /**
     * Enable drag to scroll on mobile
     * @default false
     */
    enableDrag?: boolean;
    /**
     * Content to be displayed in the marquee
     */
    children: React.ReactNode;
    /**
     * Whether to animate vertically instead of horizontally
     * @default false
     */
    vertical?: boolean;
    /**
     * Number of times to repeat the content
     * @default 4
     */
    repeat?: number;
    /**
     * If true, automatically repeats children enough to fill the visible area
     */
    autoFill?: boolean;
    /**
     * ARIA label for accessibility
     */
    ariaLabel?: string;
    /**
     * ARIA live region politeness
     */
    ariaLive?: 'off' | 'polite' | 'assertive';
    /**
     * ARIA role
     */
    ariaRole?: string;
}

export function Marquee({
    className,
    reverse = false,
    pauseOnHover = false,
    speedUpOnHover = false,
    enableDrag = false,
    children,
    vertical = false,
    repeat = 4,
    ariaLabel,
    ariaLive = 'off',
    ariaRole = 'marquee',
    ...props
}: MarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    useEffect(() => {
        if (!enableDrag || !marqueeRef.current) return;

        const handleTouchStart = (e: TouchEvent) => {
            setIsDragging(true);
            setStartX(e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0));
            setScrollLeft(marqueeRef.current?.scrollLeft || 0);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - (marqueeRef.current?.offsetLeft || 0);
            const walk = (x - startX) * 2;
            if (marqueeRef.current) {
                marqueeRef.current.scrollLeft = scrollLeft - walk;
            }
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        const element = marqueeRef.current;
        element.addEventListener('touchstart', handleTouchStart, { passive: true });
        element.addEventListener('touchmove', handleTouchMove, { passive: false });
        element.addEventListener('touchend', handleTouchEnd);

        return () => {
            element?.removeEventListener('touchstart', handleTouchStart);
            element?.removeEventListener('touchmove', handleTouchMove);
            element?.removeEventListener('touchend', handleTouchEnd);
        };
    }, [enableDrag, isDragging, startX, scrollLeft]);

    return (
        <div
            {...props}
            ref={marqueeRef}
            data-slot="marquee"
            className={cn(
                'group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]',
                {
                    'flex-row': !vertical,
                    'flex-col': vertical,
                },
                enableDrag && 'touch-pan-x',
                className,
            )}
            aria-label={ariaLabel}
            aria-live={ariaLive}
            role={ariaRole}
            tabIndex={0}
        >
            {React.useMemo(
                () => (
                    <>
                        {Array.from({ length: repeat }, (_, i) => (
                            <div
                                key={i}
                                className={cn(
                                    !vertical ? 'flex-row [gap:var(--gap)]' : 'flex-col [gap:var(--gap)]',
                                    'flex shrink-0 justify-around [animation-timing-function:linear]',
                                    !vertical && 'animate-marquee flex-row',
                                    vertical && 'animate-marquee-vertical flex-col',
                                    pauseOnHover && 'group-hover:[animation-play-state:paused]',
                                    speedUpOnHover && 'group-hover:[animation-duration:calc(var(--duration)*0.45)]',
                                    reverse && '[animation-direction:reverse]',
                                    isDragging && '[animation-play-state:paused]',
                                )}
                            >
                                {children}
                            </div>
                        ))}
                    </>
                ),
                [repeat, children, vertical, pauseOnHover, speedUpOnHover, reverse, isDragging],
            )}
        </div>
    );
}

