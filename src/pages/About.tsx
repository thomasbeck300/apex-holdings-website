import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';

const About = () => {
  const { t } = useLanguage();

  const sections = [
    {
      title: t('about.purpose.title'),
      text: t('about.purpose.text'),
    },
    {
      title: t('about.vision.title'),
      text: t('about.vision.text'),
    },
    {
      title: t('about.governance.title'),
      text: t('about.governance.text'),
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 animate-fade-in-up">
              {t('about.title')}
            </h1>
            <div className="w-24 h-px bg-foreground/20 animate-fade-in-delay-1" />
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-24">
            {sections.map((section, index) => (
              <div
                key={index}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
              >
                <div className="lg:sticky lg:top-32">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                    {section.title}
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {section.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            {['Integridade', 'Excelência', 'Visão', 'Impacto'].map((value, index) => (
              <div key={index} className="text-center">
                <span className="text-5xl font-light text-foreground/10 block mb-4">
                  0{index + 1}
                </span>
                <h3 className="text-lg font-medium text-foreground tracking-wide">
                  {value}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;