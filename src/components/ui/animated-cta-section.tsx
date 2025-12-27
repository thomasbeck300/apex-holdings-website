import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface AnimatedCTASectionProps {
    titles: string[];
    preTitle?: string;
    description: string;
}

export function AnimatedCTASection({
    titles,
    preTitle,
    description,
}: AnimatedCTASectionProps) {
    const [titleNumber, setTitleNumber] = useState(0);
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const { t } = useLanguage();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast({
            title: t('newsletter.success'),
            description: t('newsletter.success.desc'),
        });

        setEmail("");
        setIsSubmitting(false);
    };

    return (
        <div className="w-full">
            <div className="container mx-auto">
                <div className="flex gap-4 py-6 lg:py-8 items-center justify-center flex-col">
                    <div className="flex gap-4 flex-col">
                        <h2 className="text-3xl md:text-4xl max-w-3xl tracking-tight text-center font-light">
                            <span className="text-foreground">{preTitle}</span>
                            <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-medium"
                                        initial={{ opacity: 0, y: "-100" }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        animate={
                                            titleNumber === index
                                                ? {
                                                    y: 0,
                                                    opacity: 1,
                                                }
                                                : {
                                                    y: titleNumber > index ? -150 : 150,
                                                    opacity: 0,
                                                }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h2>

                        <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                            {description}
                        </p>
                    </div>

                    {/* Newsletter Card */}
                    <div className="relative max-w-2xl w-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5">
                        {/* Static glow effect */}
                        <div className="absolute inset-0 opacity-30 pointer-events-none rounded-[inherit]">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-[inherit]" />
                        </div>

                        <div className="relative flex flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-8 md:p-10 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)]">
                            {/* Glass effect overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                            <div className="relative z-10 space-y-3 text-center">
                                <h3 className="text-2xl font-light tracking-tight text-foreground">
                                    {t('newsletter.title')}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t('newsletter.subtitle')}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col sm:flex-row gap-3 items-center">
                                <Input
                                    type="email"
                                    placeholder="seu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 bg-background/50 border-border/50 focus:border-foreground/50 h-12 rounded-lg backdrop-blur-sm"
                                />
                                <GlassButton
                                    type="submit"
                                    disabled={isSubmitting}
                                    size="default"
                                    contentClassName="flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <span className="animate-pulse">...</span>
                                    ) : (
                                        <>
                                            {t('newsletter.button')}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </GlassButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

