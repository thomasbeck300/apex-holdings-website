import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

interface Partner {
  name: string;
  description: {
    pt: string;
    en: string;
  };
  segment: {
    pt: string;
    en: string;
  };
}

const partners: Partner[] = [
  {
    name: 'TechVentures',
    description: {
      pt: 'Líder em soluções de tecnologia empresarial e transformação digital.',
      en: 'Leader in enterprise technology solutions and digital transformation.',
    },
    segment: { pt: 'Tecnologia', en: 'Technology' },
  },
  {
    name: 'Capital Prime',
    description: {
      pt: 'Gestão de ativos e investimentos com foco em resultados de longo prazo.',
      en: 'Asset management and investments focused on long-term results.',
    },
    segment: { pt: 'Serviços Financeiros', en: 'Financial Services' },
  },
  {
    name: 'Urban Develop',
    description: {
      pt: 'Desenvolvimento imobiliário sustentável em mercados estratégicos.',
      en: 'Sustainable real estate development in strategic markets.',
    },
    segment: { pt: 'Imobiliário', en: 'Real Estate' },
  },
  {
    name: 'HealthCore',
    description: {
      pt: 'Inovação em saúde e bem-estar com foco em acessibilidade.',
      en: 'Healthcare and wellness innovation focused on accessibility.',
    },
    segment: { pt: 'Saúde', en: 'Healthcare' },
  },
  {
    name: 'GreenEnergy Co',
    description: {
      pt: 'Energia renovável e soluções sustentáveis para o futuro.',
      en: 'Renewable energy and sustainable solutions for the future.',
    },
    segment: { pt: 'Energia', en: 'Energy' },
  },
  {
    name: 'LogiTrans',
    description: {
      pt: 'Logística integrada e soluções de transporte inteligente.',
      en: 'Integrated logistics and smart transportation solutions.',
    },
    segment: { pt: 'Logística', en: 'Logistics' },
  },
];

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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group p-8 border border-border hover:border-foreground/20 transition-all duration-500 hover-lift"
              >
                {/* Logo Placeholder */}
                <div className="w-16 h-16 bg-secondary flex items-center justify-center mb-6">
                  <span className="text-2xl font-light text-muted-foreground">
                    {partner.name.charAt(0)}
                  </span>
                </div>

                {/* Segment Tag */}
                <span className="inline-block text-xs tracking-wider uppercase text-muted-foreground mb-4">
                  {partner.segment[language]}
                </span>

                {/* Name */}
                <h3 className="text-lg font-medium text-foreground mb-3 tracking-wide">
                  {partner.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {partner.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Partners;