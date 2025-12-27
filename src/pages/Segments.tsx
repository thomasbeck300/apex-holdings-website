import { Building2, TrendingUp, Heart, Leaf, Truck, Cpu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

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

      {/* Segments Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="group p-8 lg:p-12 border border-border hover:border-foreground/20 transition-all duration-500"
              >
                <segment.icon
                  size={36}
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 mb-8"
                  strokeWidth={1}
                />
                <h3 className="text-xl font-medium text-foreground mb-4 tracking-wide">
                  {segment.title[language]}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {segment.description[language]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Segments;