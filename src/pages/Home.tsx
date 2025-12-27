import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

const Home = () => {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Building2,
      title: t('home.highlights.segments'),
      description: t('home.highlights.segments.desc'),
      link: '/segments',
    },
    {
      icon: Users,
      title: t('home.highlights.partners'),
      description: t('home.highlights.partners.desc'),
      link: '/partners',
    },
    {
      icon: Target,
      title: t('home.highlights.vision'),
      description: t('home.highlights.vision.desc'),
      link: '/about',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/30" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight text-foreground mb-8 animate-fade-in-up">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-in-delay-1">
              {t('hero.subtitle')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background text-sm tracking-wider uppercase font-medium hover:bg-foreground/90 transition-colors duration-300 animate-fade-in-delay-2"
            >
              {t('hero.cta')}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-fade-in-delay-3">
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-muted-foreground to-transparent" />
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
              {t('home.positioning.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t('home.positioning.text')}
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {highlights.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group p-8 lg:p-12 border border-border hover:border-foreground/20 transition-all duration-500 hover-lift"
              >
                <item.icon
                  size={32}
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-8"
                  strokeWidth={1}
                />
                <h3 className="text-lg font-medium text-foreground mb-4 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <span className="tracking-wide">Saiba mais</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-8">
            {t('contact.subtitle')}
          </h2>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 border border-foreground text-foreground text-sm tracking-wider uppercase font-medium hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            {t('hero.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;