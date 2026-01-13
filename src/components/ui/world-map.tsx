"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
  regions?: string[]; // Regiões de atuação para mostrar em cards quando for apenas Brasil
}

export function WorldMap({ 
  dots = [], 
  lineColor = "#0ea5e9",
  showLabels = true,
  labelClassName = "text-sm",
  animationDuration = 2,
  loop = true,
  regions = []
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  
  // Detect dark mode from document class
  const isDark = document.documentElement.classList.contains('dark');

  const map = useMemo(
    () => new DottedMap({ height: 100, grid: "diagonal" }),
    []
  );

  const svgMap = useMemo(
    () => map.getSVG({
      radius: 0.22,
      color: isDark ? "#FFFF7F40" : "#00000040",
      shape: "circle",
      backgroundColor: isDark ? "black" : "white",
    }),
    [map, isDark]
  );

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  // Helper function to check if coordinates are within Brazil bounds
  const isInBrazil = (lat: number, lng: number) => {
    // Brazil approximate bounds: lat -33 to 5, lng -74 to -32
    return lat >= -33 && lat <= 5 && lng >= -74 && lng <= -32;
  };

  // Detect if ALL connections are within Brazil (no international)
  const hasOnlyBrazil = useMemo(() => {
    if (dots.length === 0) return false;
    
    // Check if it's a single "Brasil" point
    if (dots.length === 1 && dots[0].start.label === 'Brasil' && dots[0].end.label === 'Brasil') {
      return true;
    }
    
    // Check if ALL connections are within Brazil bounds
    return dots.every(dot => 
      isInBrazil(dot.start.lat, dot.start.lng) && 
      isInBrazil(dot.end.lat, dot.end.lng)
    );
  }, [dots]);
  
  // Filter out Brazil-only dots if we have ONLY Brazil (no international)
  const filteredDots = hasOnlyBrazil 
    ? []
    : dots.filter(dot => !(dot.start.label === 'Brasil' && dot.end.label === 'Brasil'));

  // Brazil center point - centro geográfico do Brasil (ajustado mais ao sul)
  const brazilCenter = projectPoint(-28.7, -50.0);

  // Collect unique locations to avoid duplicate labels
  const uniqueLocations = useMemo(() => {
    const locations = new Map<string, { lat: number; lng: number; label: string }>();
    
    filteredDots.forEach(dot => {
      if (dot.start.label) {
        const key = `${dot.start.lat}-${dot.start.lng}`;
        if (!locations.has(key)) {
          locations.set(key, { lat: dot.start.lat, lng: dot.start.lng, label: dot.start.label });
        }
      }
      if (dot.end.label) {
        const key = `${dot.end.lat}-${dot.end.lng}`;
        if (!locations.has(key)) {
          locations.set(key, { lat: dot.end.lat, lng: dot.end.lng, label: dot.end.label });
        }
      }
    });
    
    return Array.from(locations.values());
  }, [filteredDots]);

  // Calculate animation timing
  const staggerDelay = 0.3;
  const totalAnimationTime = filteredDots.length * staggerDelay + animationDuration;
  const pauseTime = 2; // Pause for 2 seconds when all paths are drawn
  const fullCycleDuration = totalAnimationTime + pauseTime;

  return (
    <div className="w-full aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2/1] dark:bg-black bg-white rounded-lg relative font-sans overflow-hidden">
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none object-cover"
        alt="world map"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Paths */}
        {filteredDots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          // Calculate keyframe times for this specific path
          const startTime = (i * staggerDelay) / fullCycleDuration;
          const endTime = (i * staggerDelay + animationDuration) / fullCycleDuration;
          const resetTime = totalAnimationTime / fullCycleDuration;
          
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={loop ? {
                  pathLength: [0, 0, 1, 1, 0],
                } : {
                  pathLength: 1
                }}
                transition={loop ? {
                  duration: fullCycleDuration,
                  times: [0, startTime, endTime, resetTime, 1],
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 0,
                } : {
                  duration: animationDuration,
                  delay: i * staggerDelay,
                  ease: "easeInOut",
                }}
              />
              
              {loop && (
                <motion.circle
                  r="4"
                  fill={lineColor}
                  initial={{ offsetDistance: "0%", opacity: 0 }}
                  animate={{
                    offsetDistance: ["0%", "0%", "100%", "100%", "100%"],
                    opacity: [0, 0, 1, 0, 0],
                  }}
                  transition={{
                    duration: fullCycleDuration,
                    times: [0, startTime, endTime, resetTime, 1],
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0,
                  }}
                  style={{
                    offsetPath: `path('${createCurvedPath(startPoint, endPoint)}')`,
                  }}
                />
              )}
            </g>
          );
        })}

        {/* Points and Labels - Using unique locations to avoid duplicates */}
        {filteredDots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          
          return (
            <g key={`points-group-${i}`}>
              {/* Start Point */}
              <g key={`start-${i}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.start.label || `Location ${i}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                  <circle
                    cx={startPoint.x}
                    cy={startPoint.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin="0s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              </g>
              
              {/* End Point */}
              <g key={`end-${i}`}>
                <motion.g
                  onHoverStart={() => setHoveredLocation(dot.end.label || `Destination ${i}`)}
                  onHoverEnd={() => setHoveredLocation(null)}
                  className="cursor-pointer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="3"
                    fill={lineColor}
                    filter="url(#glow)"
                    className="drop-shadow-lg"
                  />
                  <circle
                    cx={endPoint.x}
                    cy={endPoint.y}
                    r="3"
                    fill={lineColor}
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      from="3"
                      to="12"
                      dur="2s"
                      begin="0.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.6"
                      to="0"
                      dur="2s"
                      begin="0.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </motion.g>
              </g>
            </g>
          );
        })}

        {/* Labels - Render only unique locations to avoid duplicates */}
        {showLabels && uniqueLocations.map((location, i) => {
          const point = projectPoint(location.lat, location.lng);
          // Alternate positions: even = above, odd = below
          const labelY = i % 2 === 0 ? point.y - 25 : point.y + 15;
          
          return (
            <motion.g
              key={`label-${location.lat}-${location.lng}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
              className="pointer-events-none"
            >
              <foreignObject
                x={point.x - 45}
                y={labelY}
                width="90"
                height="22"
                className="block"
              >
                <div className="flex items-center justify-center h-full">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/95 dark:bg-black/95 text-black dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm">
                    {location.label}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          );
        })}

        {/* Brazil Only Point - Render if we have ONLY Brazil (no international connections) */}
        {hasOnlyBrazil && (
          <g>
            <motion.g
              onHoverStart={() => setHoveredLocation('Brasil')}
              onHoverEnd={() => setHoveredLocation(null)}
              className="cursor-pointer"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <circle
                cx={brazilCenter.x}
                cy={brazilCenter.y}
                r="4"
                fill={lineColor}
                filter="url(#glow)"
                className="drop-shadow-lg"
              />
              <circle
                cx={brazilCenter.x}
                cy={brazilCenter.y}
                r="4"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="4"
                  to="14"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="2s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </motion.g>
            
            {showLabels && (
              <motion.g
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="pointer-events-none"
              >
                <foreignObject
                  x={brazilCenter.x - 25}
                  y={brazilCenter.y - 25}
                  width="50"
                  height="18"
                  className="block"
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/95 dark:bg-black/95 text-black dark:text-white border border-gray-200 dark:border-gray-700 shadow-sm">
                      Brasil
                    </span>
                  </div>
                </foreignObject>
              </motion.g>
            )}

          </g>
        )}
      </svg>
      
      {/* Mobile Tooltip */}
      <AnimatePresence>
        {hoveredLocation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/90 text-black dark:text-white px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm sm:hidden border border-gray-200 dark:border-gray-700"
          >
            {hoveredLocation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
