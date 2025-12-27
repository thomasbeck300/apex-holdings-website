import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/partners', label: t('nav.partners') },
    { href: '/segments', label: t('nav.segments') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-lg font-semibold tracking-wider uppercase text-foreground">
              Holding Group
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm tracking-wide transition-colors duration-300 link-underline',
                  isActive(link.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => setLanguage('pt')}
                className={cn(
                  'px-2 py-1 transition-colors duration-300',
                  language === 'pt'
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                PT
              </button>
              <span className="text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={cn(
                  'px-2 py-1 transition-colors duration-300',
                  language === 'en'
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                EN
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border transition-all duration-300 overflow-hidden',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container mx-auto px-6 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                'text-base py-2 transition-colors duration-300',
                isActive(link.href)
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}