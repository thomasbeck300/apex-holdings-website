import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/hooks/use-scroll';
import { useLanguage } from '@/contexts/LanguageContext';

export function Header() {
	const [open, setOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const { language, setLanguage, t } = useLanguage();
	const location = useLocation();

	const navLinks = [
		{ href: '/', label: t('nav.home') },
		{ href: '/about', label: t('nav.about') },
		{ href: '/partners', label: t('nav.partners') },
		{ href: '/segments', label: t('nav.segments') },
		{ href: '/contact', label: t('nav.contact') },
	];

	const isActive = (path: string) => location.pathname === path;

	React.useEffect(() => {
		if (open) {
			// Disable scroll
			document.body.style.overflow = 'hidden';
		} else {
			// Re-enable scroll
			document.body.style.overflow = '';
		}

		// Cleanup when component unmounts
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn(
				'sticky top-0 z-50 mx-auto w-full max-w-7xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
				{
					'bg-background/95 supports-[backdrop-filter]:bg-background/50 border-border backdrop-blur-lg md:top-4 md:max-w-6xl md:shadow':
						scrolled && !open,
					'bg-background/90': open,
				},
			)}
		>
			<nav
				className={cn(
					'flex h-16 w-full items-center justify-between px-6 md:h-14 md:transition-all md:ease-out',
					{
						'md:px-4': scrolled,
					},
				)}
			>
				<Link to="/" className="flex items-center">
					<img
						src="/imgs/logo-tbpar-nav.webp"
						alt="TBPAR"
						className="w-auto"
						style={{ height: '70px' }}
					/>
				</Link>

				<div className="hidden items-center gap-1 md:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							className={buttonVariants({
								variant: isActive(link.href) ? 'default' : 'ghost',
								className: 'text-sm',
							})}
							to={link.href}
						>
							{link.label}
						</Link>
					))}
					<div className="ml-2 flex items-center gap-1 border-l border-border pl-2">
						<Button
							size="sm"
							variant={language === 'pt' ? 'default' : 'ghost'}
							onClick={() => setLanguage('pt')}
							className="h-8 px-2 text-xs"
						>
							PT
						</Button>
						<Button
							size="sm"
							variant={language === 'en' ? 'default' : 'ghost'}
							onClick={() => setLanguage('en')}
							className="h-8 px-2 text-xs"
						>
							EN
						</Button>
					</div>
				</div>

				<Button size="icon" variant="outline" onClick={() => setOpen(!open)} className="md:hidden">
					<MenuToggleIcon open={open} className="size-5" duration={300} />
				</Button>
			</nav>

			<div
				className={cn(
					'bg-background/90 fixed top-16 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-y md:hidden',
					open ? 'block' : 'hidden',
				)}
			>
				<div
					data-slot={open ? 'open' : 'closed'}
					className={cn(
						'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
						'flex h-full w-full flex-col justify-between gap-y-4 p-6',
					)}
				>
					<div className="grid gap-y-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								className={buttonVariants({
									variant: isActive(link.href) ? 'default' : 'ghost',
									className: 'justify-start',
								})}
								to={link.href}
								onClick={() => setOpen(false)}
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex flex-col gap-2 border-t border-border pt-4">
						<div className="flex gap-2">
							<Button
								variant={language === 'pt' ? 'default' : 'outline'}
								className="w-full"
								onClick={() => {
									setLanguage('pt');
									setOpen(false);
								}}
							>
								Português
							</Button>
							<Button
								variant={language === 'en' ? 'default' : 'outline'}
								className="w-full"
								onClick={() => {
									setLanguage('en');
									setOpen(false);
								}}
							>
								English
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}