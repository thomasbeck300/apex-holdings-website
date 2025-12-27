'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function FooterSection() {
	const { t } = useLanguage();
	const currentYear = new Date().getFullYear();

	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-4xl border-t bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="flex flex-col items-center text-center gap-8 w-full">
				<AnimatedContainer className="flex flex-col items-center gap-4">
					<p className="text-muted-foreground/70 text-sm max-w-md font-semibold">
						{t('footer.tagline')}
					</p>
					<p className="text-muted-foreground text-sm">
						© {currentYear} TBPAR Holding. {t('footer.rights')}
					</p>
					<p className="text-muted-foreground/50 text-xs max-w-2xl leading-relaxed">
						Todos os direitos da TBPAR Holding reservados. As marcas, logotipos e direitos autorais
						das empresas parceiras pertencem aos seus respectivos proprietários. O uso de qualquer
						marca registrada não implica endosso por parte da TBPAR. Informações sujeitas a alterações
						sem aviso prévio.
					</p>
				</AnimatedContainer>

				<AnimatedContainer delay={0.2} className="flex flex-col items-center">
					<img
						src="/imgs/logo-tbpar.webp"
						alt="TBPAR"
						className="w-auto"
						style={{ height: '128px' }}
					/>
				</AnimatedContainer>
			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
}

