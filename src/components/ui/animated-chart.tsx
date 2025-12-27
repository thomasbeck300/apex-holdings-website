import { motion } from "framer-motion";

export function AnimatedChart() {
    const dataPoints = [
        { month: "Jan", value: 65 },
        { month: "Fev", value: 72 },
        { month: "Mar", value: 78 },
        { month: "Abr", value: 85 },
        { month: "Mai", value: 82 },
        { month: "Jun", value: 88 },
        { month: "Jul", value: 92 },
        { month: "Ago", value: 95 },
    ];

    const maxValue = 100;

    return (
        <div className="w-full relative">
            {/* SVG Line Chart */}
            <div className="relative h-64 mb-8">
                <svg className="w-full h-full" viewBox="0 0 800 200" preserveAspectRatio="none">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((val, i) => (
                        <motion.line
                            key={val}
                            x1="0"
                            y1={200 - (val * 2)}
                            x2="800"
                            y2={200 - (val * 2)}
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-border/30"
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                        />
                    ))}

                    {/* Animated gradient area */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className="text-foreground" />
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-foreground" />
                        </linearGradient>
                    </defs>

                    {/* Area under curve */}
                    <motion.path
                        d={`M 0 200 L ${dataPoints.map((d, i) => {
                            const x = (i / (dataPoints.length - 1)) * 800;
                            const y = 200 - (d.value * 2);
                            return `${x} ${y}`;
                        }).join(" L ")} L 800 200 Z`}
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />

                    {/* Main line */}
                    <motion.polyline
                        points={dataPoints.map((d, i) => {
                            const x = (i / (dataPoints.length - 1)) * 800;
                            const y = 200 - (d.value * 2);
                            return `${x},${y}`;
                        }).join(" ")}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-foreground"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 2, ease: "easeInOut" }}
                    />

                    {/* Data points */}
                    {dataPoints.map((d, i) => {
                        const x = (i / (dataPoints.length - 1)) * 800;
                        const y = 200 - (d.value * 2);
                        return (
                            <motion.g key={i}>
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="4"
                                    fill="currentColor"
                                    className="text-foreground"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                                />
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="8"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    className="text-foreground/30"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                    transition={{
                                        delay: 0.3 + i * 0.1,
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1,
                                    }}
                                />
                            </motion.g>
                        );
                    })}
                </svg>

                {/* X-axis labels */}
                <div className="flex justify-between absolute bottom-0 left-0 right-0 -mb-6">
                    {dataPoints.map((d, i) => (
                        <motion.span
                            key={i}
                            className="text-xs text-muted-foreground font-mono"
                            initial={{ opacity: 0, y: -10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + i * 0.05 }}
                        >
                            {d.month}
                        </motion.span>
                    ))}
                </div>
            </div>

            {/* Subtle metric cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Crescimento Médio", value: "+18%", trend: "↗" },
                    { label: "Taxa de Sucesso", value: "94%", trend: "→" },
                    { label: "ROI Médio", value: "+28%", trend: "↗" },
                    { label: "Volatilidade", value: "0.8", trend: "↘" },
                ].map((metric, index) => (
                    <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                        className="p-4 border border-border/30 rounded-lg bg-card/30 backdrop-blur-sm"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                {metric.label}
                            </span>
                            <span className="text-sm">{metric.trend}</span>
                        </div>
                        <div className="text-2xl font-light text-foreground">{metric.value}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

