import React from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface KineticScrollGalleryProps {
  images: string[];
}

const KineticGridItem = ({ image, scrollVelocity }: { image: string; scrollVelocity: any }) => {
    // Smooth the velocity value for a more gradual effect
    const smoothedVelocity = useSpring(scrollVelocity, {
        mass: 0.1,
        stiffness: 80,
        damping: 40,
    });

    // Transform the smoothed velocity into a skew value.
    // The faster the scroll, the more it skews.
    const skew = useTransform(smoothedVelocity, [-1500, 0, 1500], [-15, 0, 15]);

    return (
        <motion.div
            className="w-full h-80 relative overflow-hidden rounded-lg"
            style={{ skewX: skew }}
        >
            <img
                src={image}
                alt="Gallery image"
                className="absolute inset-0 h-full w-full object-cover"
                style={{
                     transform: "scale(1.15)" // Slight zoom to prevent edges showing on skew
                }}
            />
        </motion.div>
    );
};

export default function KineticScrollGallery({ images }: KineticScrollGalleryProps) {
    const { scrollYProgress } = useScroll();
    
    // Framer Motion's useScroll provides scrollYVelocity, which is a MotionValue
    // representing the velocity of the scroll in pixels per second.
    const scrollYVelocity = useTransform(
        scrollYProgress,
        [0, 1],
        [0, 1000], 
        { clamp: false }
    );

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img, index) => (
                    <KineticGridItem 
                        key={index} 
                        image={img} 
                        scrollVelocity={scrollYVelocity} 
                    />
                ))}
            </div>
        </div>
    );
}

