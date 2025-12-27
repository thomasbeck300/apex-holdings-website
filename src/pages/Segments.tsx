import { Building2, TrendingUp, Heart, Leaf, Truck, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import { AnimatedChart } from '@/components/ui/animated-chart';

interface Segment {
  icon: typeof Building2;
  title: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
}

const segments: Segment[] = [
  {
    icon: Cpu,
    title: { pt: 'Tecnologia', en: 'Technology' },
    description: {
      pt: 'Investimentos em empresas de software, infraestrutura digital e inovação tecnológica, impulsionando a transformação digital de múltiplos setores.',
      en: 'Investments in software companies, digital infrastructure, and technological innovation, driving digital transformation across multiple sectors.',
    },
  },
  {
    icon: TrendingUp,
    title: { pt: 'Serviços Financeiros', en: 'Financial Services' },
    description: {
      pt: 'Atuação estratégica em gestão de ativos, fintechs e serviços bancários, com foco em eficiência operacional e inovação financeira.',
      en: 'Strategic presence in asset management, fintechs, and banking services, focusing on operational efficiency and financial innovation.',
    },
  },
  {
    icon: Building2,
    title: { pt: 'Imobiliário', en: 'Real Estate' },
    description: {
      pt: 'Desenvolvimento e gestão de ativos imobiliários em mercados de alto crescimento, priorizando sustentabilidade e valorização de longo prazo.',
      en: 'Development and management of real estate assets in high-growth markets, prioritizing sustainability and long-term appreciation.',
    },
  },
  {
    icon: Heart,
    title: { pt: 'Saúde', en: 'Healthcare' },
    description: {
      pt: 'Parcerias com empresas de saúde e bem-estar focadas em inovação, acessibilidade e qualidade de atendimento.',
      en: 'Partnerships with healthcare and wellness companies focused on innovation, accessibility, and quality of care.',
    },
  },
  {
    icon: Leaf,
    title: { pt: 'Energia', en: 'Energy' },
    description: {
      pt: 'Investimentos em energia renovável e soluções sustentáveis, contribuindo para a transição energética global.',
      en: 'Investments in renewable energy and sustainable solutions, contributing to the global energy transition.',
    },
  },
  {
    icon: Truck,
    title: { pt: 'Logística', en: 'Logistics' },
    description: {
      pt: 'Soluções integradas de logística e transporte, otimizando cadeias de suprimentos e conectando mercados.',
      en: 'Integrated logistics and transportation solutions, optimizing supply chains and connecting markets.',
    },
  },
];

const Segments = () => {
  const { language, t } = useLanguage();

  // Convert segments to BentoItem format
  const bentoItems: BentoItem[] = segments.map((segment, index) => ({
    title: segment.title[language],
    description: segment.description[language],
    icon: <segment.icon className="w-4 h-4 text-foreground" />,
    status: index === 0 ? "Destaque" : undefined,
    tags: index === 0 ? ["Inovação", "Digital"] : undefined,
    colSpan: index === 0 ? 2 : 1,
    hasPersistentHover: index === 0,
    cta: "Saiba mais →",
  }));

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 animate-fade-in-up">
              {t('segments.title')}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-delay-1">
              {t('segments.subtitle')}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8 animate-fade-in-delay-2" />
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="pb-20">
        <BentoGrid items={bentoItems} />
      </section>

      {/* Data-Driven Section */}
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

            <AnimatedChart />

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-light text-foreground mb-2">{t('segments.data.monthly')}</div>
                <p className="text-sm text-muted-foreground">{t('segments.data.monthly.desc')}</p>
              </div>
              <div>
                <div className="text-2xl font-light text-foreground mb-2">100+</div>
                <p className="text-sm text-muted-foreground">{t('segments.data.kpis')}</p>
              </div>
              <div>
                <div className="text-2xl font-light text-foreground mb-2">24/7</div>
                <p className="text-sm text-muted-foreground">{t('segments.data.monitoring')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Segments;