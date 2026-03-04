import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Marquee } from '@/components/ui/marquee';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Building2, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Empreendimentos = () => {
  const { language } = useLanguage();

  // Dados de exemplo para as galerias - você pode substituir por dados reais
  const empreendimentosImages = [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1000&q=80',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&q=80',
    'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1000&q=80',
    'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1000&q=80',
  ];

  const lancamentosImages = [
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1000&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80',
  ];

  const vendasImages = [
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1000&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=1000&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1000&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&q=80',
  ];

  const GallerySection = ({
    title,
    icon: Icon,
    images,
    description
  }: {
    title: string;
    icon: typeof Building2;
    images: string[];
    description: string;
  }) => (
    <section className="py-16">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <div className="p-3 rounded-lg bg-foreground/5">
              <Icon className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground mb-2">
                {title}
              </h2>
              <p className="text-muted-foreground">{description}</p>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                  <GlowingEffect
                    spread={50}
                    glow={true}
                    disabled={false}
                    proximity={0}
                    inactiveZone={0}
                    borderWidth={2}
                  />
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <img
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              {language === 'pt' ? 'Empreendimentos' : 'Developments'}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'pt'
                ? 'Conheça nossos projetos de alto padrão que transformam sonhos em realidade'
                : 'Discover our high-standard projects that turn dreams into reality'}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8 mx-auto" />
          </div>
        </div>
      </section>

      {/* KPIs Marquee Section */}
      <section className="py-8 bg-background border-y border-border/50">
        <Marquee className="[--duration:30s]" enableDrag>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">7</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Anos de Experiência' : 'Years of Experience'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">9+</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Projetos Realizados' : 'Projects Completed'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">10,000+</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'm² Construídos' : 'm² Built'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">5,000+</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Clientes Satisfeitos' : 'Satisfied Clients'}
            </span>
          </div>
        </Marquee>
      </section>

      {/* Empreendimentos Section */}
      <GallerySection
        title={language === 'pt' ? 'Empreendimentos' : 'Developments'}
        icon={Building2}
        images={empreendimentosImages}
        description={language === 'pt'
          ? 'Nossos projetos concluídos e em andamento'
          : 'Our completed and ongoing projects'}
      />

      {/* Lançamentos Section */}
      <GallerySection
        title={language === 'pt' ? 'Lançamentos' : 'Launches'}
        icon={Sparkles}
        images={lancamentosImages}
        description={language === 'pt'
          ? 'Novos projetos disponíveis para investimento'
          : 'New projects available for investment'}
      />

      {/* Vendas Section */}
      <GallerySection
        title={language === 'pt' ? 'Vendas' : 'Sales'}
        icon={TrendingUp}
        images={vendasImages}
        description={language === 'pt'
          ? 'Oportunidades de compra e investimento'
          : 'Purchase and investment opportunities'}
      />
    </Layout>
  );
};

export default Empreendimentos;
