import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { partnersData } from '@/data/partners';

import { LogoCloudSimple } from '@/components/ui/logo-cloud-simple';
import { WorldMap } from '@/components/ui/world-map';
import { AnimatedText } from '@/components/ui/animated-text';
import { BlurTextAnimation } from '@/components/ui/blur-text-animation';
import { AnimatedUnderline } from '@/components/ui/animated-underline';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { TestimonialSlider } from '@/components/ui/testimonial-slider';
import { AnimatedCTASection } from '@/components/ui/animated-cta-section';
import { Marquee } from '@/components/ui/marquee';
import { Testimonials3D } from '@/components/ui/testimonials-3d';
import KineticScrollGallery from '@/components/ui/kinetic-scroll-gallery';
import { ElegantMobileGallery } from '@/components/ui/elegant-mobile-gallery';
import { GlassButton } from '@/components/ui/glass-button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const Home = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('frigorifico');

  // Projects images organized by category
  const projectsByCategory = {
    frigorifico: [
      'https://images.unsplash.com/photo-1533991022833-ad47ac91974e?w=1000&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&q=80',
    ],
    pavilhao: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80', // bvQwZ85JBSg (Warehouse)
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000&q=80', // FB7QTOXs6q0 (Modern building)
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80', // yggPEMypLUI (Sleek architecture)
    ],
    distribuidora: [
      'https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1000&q=80', // -rmA0xZAdhY (Cold storage)
      'https://images.unsplash.com/photo-1519003722824-192d992a6059?w=1000&q=80', // fS1RwhY3Ytk (Industrial facility)
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80', // Valid logistics hub
    ],
    escritorio: [
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1000&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1000&q=80',
    ],
  };

  // All images combined for galleries
  const allProjectImages = [
    ...projectsByCategory.frigorifico,
    ...projectsByCategory.pavilhao,
    ...projectsByCategory.distribuidora,
    ...projectsByCategory.escritorio,
  ];

  // Team member data
  const testimonials = [
    {
      id: 1,
      name: t('team.thomas.name'),
      affiliation: t('team.thomas.role'),
      quote: t('team.thomas.quote'),
      imageSrc: "/imgs/thomas.webp",
      thumbnailSrc: "/imgs/thomas.webp",
    },
  ];

  // Global presence connections
  const globalConnections = [
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
      end: { lat: 40.7128, lng: -74.0060, label: "New York" },
    },
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
      end: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
    },
    {
      start: { lat: 40.7128, lng: -74.0060, label: "New York" },
      end: { lat: 51.5074, lng: -0.1278, label: "London" },
    },
    {
      start: { lat: 51.5074, lng: -0.1278, label: "London" },
      end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
    },
  ];

  // Partner company logos - usando logos reais das empresas
  const partnerLogos = Object.values(partnersData)
    .filter(partner => partner.logo)
    .map(partner => ({
      src: partner.logo!,
      alt: partner.name,
    }));

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
      {/* Hero Section - Modern Design */}
      <section className="relative min-h-screen flex items-end pb-20 pt-32 overflow-hidden bg-background">
        {/* Background Image - Desktop */}
        <div
          className="hidden md:block absolute -top-[10%] left-0 w-full h-[120%] bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url(/imgs/cavalo-bg.webp)' }}
        />

        {/* Background Image - Mobile */}
        <div
          className="md:hidden absolute -top-[10%] left-0 w-full h-[120%] bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: 'url(/imgs/bg-mobile.webp)' }}
        />

        {/* Vignette Effect - replaces EtherealShadow for cross-browser compatibility */}
        <div className="hidden md:block absolute inset-0 z-[1] opacity-70 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 40%, transparent 30%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)' }} />

        {/* Subtle gradient overlays */}
        <div className="absolute inset-0 pointer-events-none z-[2]">
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            {/* Left Content */}
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.1] mb-8 tracking-[-0.02em] text-foreground">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-12 font-normal max-w-2xl">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                <GlassButton
                  href="/contact"
                  size="lg"
                  contentClassName="flex items-center gap-2.5"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5" />
                </GlassButton>
              </div>
            </div>

            {/* Stats Section */}
            <div className="flex gap-12 lg:gap-20 items-end">
              <div className="text-center lg:text-left">
                <div className="text-5xl lg:text-6xl font-light leading-none mb-3 text-foreground">+8</div>
                <div className="text-base text-muted-foreground font-normal whitespace-nowrap">
                  {t('home.highlights.segments')}
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-5xl lg:text-6xl font-light leading-none mb-3 text-foreground">+12</div>
                <div className="text-base text-muted-foreground font-normal whitespace-nowrap">
                  {t('home.highlights.partners')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logo Cloud Section */}
      <section className="relative py-12 bg-background">
        <div className="container mx-auto px-4">
          <div
            aria-hidden="true"
            className={cn(
              "-z-10 -top-1/2 -translate-x-1/2 pointer-events-none absolute left-1/2 h-[120vmin] w-[120vmin] rounded-b-full",
              "bg-[radial-gradient(ellipse_at_center,hsl(var(--foreground)/.1),transparent_50%)]",
              "blur-[30px]"
            )}
          />

          <section className="relative mx-auto max-w-3xl">
            <h2 className="mb-5 text-center text-foreground">
              <span className="block text-base md:text-lg font-normal text-muted-foreground">{t('nav.partners')}</span>
              <span className="block text-xl md:text-2xl font-semibold tracking-tight mt-1">{t('home.logocloud.title')}</span>
            </h2>
            <div className="mx-auto my-5 h-px max-w-sm bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />

            <LogoCloudSimple logos={partnerLogos} />

            <div className="mt-5 h-px bg-border [mask-image:linear-gradient(to_right,transparent,black,transparent)]" />
          </section>
        </div>
      </section>

      {/* Global Presence Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                {t('home.map.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('home.map.subtitle')}
              </p>
            </div>
            <WorldMap
              dots={globalConnections}
              lineColor="hsl(var(--foreground))"
              showLabels={true}
            />
          </div>
        </div>
      </section>

      {/* Positioning Section */}
      <section className="py-20 bg-secondary/30 relative overflow-hidden">
        {/* Subtle grid background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedUnderline delay={2.5} duration={2}>
              <AnimatedText
                text={t('home.positioning.title')}
                as="h2"
                className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-12"
                startDelay={300}
                wordDelay={200}
              />
            </AnimatedUnderline>
            <BlurTextAnimation
              text={t('home.positioning.text')}
              className="leading-relaxed"
              fontSize="text-lg"
              textColor="text-muted-foreground"
              animationDelay={6000}
            />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-3">
              {t('gallery.title')}
            </h2>
            <p className="text-lg text-muted-foreground font-light">
              {t('gallery.delivered')}
            </p>
          </div>

          {/* Categories Tabs */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {[
                { key: 'frigorifico', label: t('gallery.category.frigorifico') },
                { key: 'pavilhao', label: t('gallery.category.pavilhao') },
                { key: 'distribuidora', label: t('gallery.category.distribuidora') },
                { key: 'escritorio', label: t('gallery.category.escritorio') },
              ].map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    'px-6 py-3 rounded-full text-sm md:text-base font-normal transition-all duration-300',
                    'border border-border/50 backdrop-blur-sm',
                    activeCategory === category.key
                      ? 'bg-foreground text-background shadow-lg scale-105'
                      : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground hover:border-border'
                  )}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Images Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {projectsByCategory[activeCategory as keyof typeof projectsByCategory].map((image, index) => (
                <div
                  key={`${activeCategory}-${index}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-secondary/30 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={image}
                    alt={`${activeCategory} ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Number badge on hover */}
                  <div className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background/90 backdrop-blur-sm text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {highlights.map((item, index) => (
              <Link key={index} to={item.link} className="block min-h-[22rem] group">
                <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                  <GlowingEffect
                    spread={50}
                    glow={true}
                    disabled={false}
                    proximity={0}
                    inactiveZone={0}
                    borderWidth={2}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-8 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative flex flex-1 flex-col justify-between gap-4 z-10">
                      <div className="space-y-4">
                        <h3 className="text-2xl leading-tight font-light tracking-tight text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span className="tracking-wide">Saiba mais</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              {t('home.team.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.team.subtitle')}
            </p>
          </div>
          <TestimonialSlider reviews={testimonials} />
        </div>
      </section>

      {/* Marquee Stats Section */}
      <section className="py-8 bg-background border-y border-border/50">
        <Marquee className="[--duration:30s]" enableDrag>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">98%</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{t('stats.success')}</span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+12</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{t('stats.partners')}</span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+8</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{t('stats.segments')}</span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+4 bi</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{t('stats.assets')}</span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+8</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">{t('stats.experience')}</span>
          </div>
        </Marquee>
      </section>

      {/* 3D Testimonials Section */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              {t('home.testimonials.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('home.testimonials.subtitle')}
            </p>
          </div>
          <Testimonials3D />
        </div>
      </section>

      {/* Animated CTA Section */}
      <section className="py-4 bg-background">
        <AnimatedCTASection
          titles={[t('cta.words.solidity'), t('cta.words.trust'), t('cta.words.credibility'), t('cta.words.stability'), t('cta.words.longevity')]}
          preTitle={t('cta.building')}
          description={t('cta.description')}
        />
      </section>
    </Layout>
  );
};

export default Home;