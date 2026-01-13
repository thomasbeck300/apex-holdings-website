import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { partnersList } from '@/data/partners';

const Partners = () => {
  const { language, t } = useLanguage();

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 animate-fade-in-up">
              {t('partners.title')}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-delay-1">
              {t('partners.subtitle')}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8 animate-fade-in-delay-2" />
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {partnersList.map((partner, index) => (
              <Link
                key={index}
                to={`/partners/${partner.slug}`}
                className="block group"
              >
                <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border group-hover:scale-[1.02]">
                  <GlowingEffect
                    spread={50}
                    glow={true}
                    disabled={false}
                    proximity={0}
                    inactiveZone={0}
                    borderWidth={2}
                  />
                  <div className="relative flex flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-8 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative z-10 space-y-4">
                      {/* Logo Placeholder */}
                      <div className="w-14 h-14 rounded-lg bg-muted/50 backdrop-blur-sm flex items-center justify-center border border-border/30 transition-transform duration-300 group-hover:scale-110">
                        <span className="text-2xl font-light text-foreground">
                          {partner.name.charAt(0)}
                        </span>
                      </div>

                      {/* Segment Tag */}
                      <span className="inline-block text-xs tracking-wider uppercase text-muted-foreground/70 font-medium">
                        {partner.segment[language]}
                      </span>

                      {/* Name */}
                      <h3 className="text-xl leading-tight font-light tracking-tight text-foreground">
                        {partner.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {partner.description[language]}
                      </p>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 pt-2">
                        <span>Ver detalhes</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;