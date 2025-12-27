import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { DesignTestimonial } from '@/components/ui/design-testimonial';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { BackgroundBeams } from '@/components/ui/background-beams';
import { Building2, TrendingUp, Users, Target } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  // Storytelling da holding em 3 capítulos
  const storyChapters = [
    {
      quote: t('about.story.chapter1'),
      author: t('about.story.chapter1.title'),
      role: t('about.story.chapter1.period'),
      company: t('about.story.chapter1.company'),
    },
    {
      quote: t('about.story.chapter2'),
      author: t('about.story.chapter2.title'),
      role: t('about.story.chapter2.period'),
      company: t('about.story.chapter2.company'),
    },
    {
      quote: t('about.story.chapter3'),
      author: t('about.story.chapter3.title'),
      role: t('about.story.chapter3.period'),
      company: t('about.story.chapter3.company'),
    },
  ];

  const values = [
    {
      icon: Building2,
      title: t('about.pillars.governance'),
      description: t('about.pillars.governance.desc'),
    },
    {
      icon: TrendingUp,
      title: t('about.pillars.excellence'),
      description: t('about.pillars.excellence.desc'),
    },
    {
      icon: Users,
      title: t('about.pillars.partnerships'),
      description: t('about.pillars.partnerships.desc'),
    },
    {
      icon: Target,
      title: t('about.pillars.vision'),
      description: t('about.pillars.vision.desc'),
    },
  ];

  return (
    <Layout>
      {/* Storytelling com Design Testimonial */}
      <section className="pt-24 py-20 bg-background">
        <DesignTestimonial testimonials={storyChapters} />
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                {t('about.purpose.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('about.purpose.text')}
              </p>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-6">
                {t('about.vision.title')}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('about.vision.text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-4">
              {t('about.pillars.title')}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t('about.pillars.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <div key={index}>
                <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                  <GlowingEffect
                    spread={50}
                    glow={true}
                    disabled={false}
                    proximity={0}
                    inactiveZone={0}
                    borderWidth={2}
                  />
                  <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)]">
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative z-10 space-y-3">
                      <h3 className="text-xl leading-tight font-light tracking-tight text-foreground">
                        {value.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance Details with Background Beams */}
      <section className="relative py-20 bg-background overflow-hidden">
        <BackgroundBeams />
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-8 text-center">
              {t('about.governance.title')}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg text-center mb-12">
              {t('about.governance.text')}
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="text-5xl font-light text-foreground mb-2">100%</div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Transparência</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-light text-foreground mb-2">A+</div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Compliance</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-light text-foreground mb-2">ISO</div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">Certificação</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;