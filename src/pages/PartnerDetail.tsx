import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { WorldMap } from '@/components/ui/world-map';
import { ExternalLink, ArrowLeft, MapPin, Globe } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { partnersData } from '@/data/partners';

const PartnerDetail = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const { language } = useLanguage();
  
  // Buscar dados da empresa
  const partner = partnerId ? partnersData[partnerId] : null;

  if (!partner) {
    return (
      <Layout>
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="text-center">
              <h1 className="text-4xl font-light text-foreground mb-4">
                {language === 'pt' ? 'Empresa não encontrada' : 'Partner not found'}
              </h1>
              <Link
                to="/partners"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                {language === 'pt' ? 'Voltar para Empresas Parceiras' : 'Back to Partners'}
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back Button */}
      <section className="pt-28 pb-8">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/partners"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {language === 'pt' ? 'Voltar' : 'Back'}
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            {/* Segment Tag */}
            <span className="inline-block text-xs tracking-wider uppercase text-muted-foreground/70 font-medium mb-4">
              {partner.segment[language]}
            </span>

            {/* Company Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              {partner.name}
            </h1>

            {/* Short Description */}
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              {partner.description[language]}
            </p>

            {/* Full Description */}
            <p className="text-base text-muted-foreground/70 leading-relaxed">
              {partner.fullDescription[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                {language === 'pt' ? 'Presença Global' : 'Global Presence'}
              </h2>
            </div>
            <WorldMap
              dots={partner.mapConnections}
              lineColor="hsl(var(--foreground))"
              showLabels={true}
              regions={partner.regions[language]}
            />
          </div>
        </div>
      </section>

      {/* Regions of Operation */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="w-5 h-5 text-foreground" />
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                {language === 'pt' ? 'Regiões de Atuação' : 'Operating Regions'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {partner.regions[language].map((region, index) => (
                <div
                  key={index}
                  className="relative rounded-xl border border-border/50 p-4 transition-all duration-300 hover:border-border"
                >
                  <GlowingEffect
                    spread={30}
                    glow={true}
                    disabled={false}
                    proximity={0}
                    inactiveZone={0}
                    borderWidth={1}
                  />
                  <div className="relative z-10 text-center">
                    <p className="text-sm font-medium text-foreground">{region}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {partner.gallery && partner.gallery.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {partner.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg bg-secondary/30 cursor-pointer"
                  >
                    <img
                      src={image}
                      alt={`${partner.name} ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* External Link CTA */}
      {partner.externalLink && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mx-auto text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/5 mb-4">
                <Globe className="w-6 h-6 text-foreground" />
              </div>
              
              {/* Title */}
              <h3 className="text-2xl font-light tracking-tight text-foreground mb-2">
                {language === 'pt' ? 'Conheça mais sobre' : 'Learn more about'} {partner.name}
              </h3>
              
              {/* Subtitle */}
              <p className="text-sm text-muted-foreground mb-8">
                {language === 'pt' 
                  ? 'Visite o site oficial para mais informações, produtos e serviços'
                  : 'Visit the official website for more information, products and services'}
              </p>
              
              {/* Button */}
              <a
                href={partner.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 text-sm font-medium"
              >
                {language === 'pt' ? 'Visitar Site' : 'Visit Website'}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PartnerDetail;
