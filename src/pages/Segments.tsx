import { Building2, TrendingUp, Briefcase, Beef, Mountain, DollarSign, Handshake, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Link } from 'react-router-dom';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { segmentsData, partnersData } from '@/data/partners';
import { cn } from '@/lib/utils';

const Segments = () => {
  const { language, t } = useLanguage();

  // Ícones para cada segmento
  const segmentIcons: Record<string, typeof Building2> = {
    'service-offices': Users,
    'construction': Building2,
    'logistics': TrendingUp,
    'slaughterhouse': Beef,
    'earthmoving': Mountain,
    'financial': DollarSign,
    'ma': Handshake,
  };

  // Ordenar segmentos por número de empresas (decrescente)
  const sortedSegments = Object.values(segmentsData).sort((a, b) => b.partners.length - a.partners.length);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8">
              {t('segments.title')}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('segments.subtitle')}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8" />
          </div>
        </div>
      </section>

      {/* Segments Grid */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {sortedSegments.map((segment, index) => {
              const Icon = segmentIcons[segment.id];
              const isHighlight = index === 0;
              
              return (
                <div
                  key={segment.id}
                  className={cn(
                    isHighlight ? 'md:col-span-2 lg:col-span-2' : '',
                    'group'
                  )}
                >
                  <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border group-hover:scale-[1.02]">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={0}
                      inactiveZone={0}
                      borderWidth={2}
                    />
                    <div className="relative flex flex-col gap-6 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-8 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)] min-h-[280px]">
                      {/* Glass effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                      <div className="relative z-10 flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-foreground/5 border border-border/30">
                            {Icon && <Icon className="w-6 h-6 text-foreground" />}
                          </div>
                          {isHighlight && (
                            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent">
                              Destaque
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-light tracking-tight text-foreground mb-3">
                          {segment.name[language]}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                          {segment.description[language]}
                        </p>

                        {/* Partners List */}
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-xs text-muted-foreground/70 uppercase tracking-wider">
                            <Briefcase className="w-3.5 h-3.5" />
                            <span>{segment.partners.length} {language === 'pt' ? 'Empresas' : 'Companies'}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {segment.partners.slice(0, 3).map((partnerId) => {
                              const partner = partnersData[partnerId];
                              return (
                                <Link
                                  key={partnerId}
                                  to={`/partners/${partner.slug}`}
                                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/50 hover:bg-secondary border border-border/30 hover:border-border transition-all duration-300 text-xs text-foreground"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {partner.name}
                                </Link>
                              );
                            })}
                            {segment.partners.length > 3 && (
                              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-secondary/30 border border-border/20 text-xs text-muted-foreground">
                                +{segment.partners.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* CTA */}
                        <Link
                          to="/partners"
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                        >
                          <span>{language === 'pt' ? 'Ver empresas' : 'View companies'}</span>
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
                {t('segments.data.title')}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                {t('segments.data.description')}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-light text-foreground mb-2">{sortedSegments.length}</div>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Segmentos de Atuação' : 'Business Segments'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-foreground mb-2">{Object.keys(partnersData).length}</div>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Empresas Parceiras' : 'Partner Companies'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-foreground mb-2">+4 bi</div>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Em Ativos Geridos' : 'In Managed Assets'}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-light text-foreground mb-2">98%</div>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Taxa de Sucesso' : 'Success Rate'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Segments;
