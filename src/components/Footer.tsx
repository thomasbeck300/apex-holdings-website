import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold tracking-wider uppercase text-foreground">
              Holding Group
            </span>
            <p className="text-sm text-muted-foreground">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Holding Group. {t('footer.rights')}
          </div>
        </div>
      </div>
    </footer>
  );
}