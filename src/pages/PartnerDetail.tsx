import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { WorldMap } from '@/components/ui/world-map';
import { ExternalLink, ArrowLeft, MapPin, Globe, CreditCard, Building2, FileText, TrendingUp, Truck, Hammer, ClipboardCheck, TreePine, Leaf, Wrench, Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Marquee } from '@/components/ui/marquee';
import { GlassButton } from '@/components/ui/glass-button';
import { partnersData } from '@/data/partners';
import { submitToGoogleSheets, formatTrademarkData } from '@/lib/googleSheets';

const PartnerDetail = () => {
  const { partnerId } = useParams<{ partnerId: string }>();
  const { language } = useLanguage();
  const [isTrademarkModalOpen, setIsTrademarkModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    marca: '',
    descricao: '',
    classe: '',
    nome: '',
    email: '',
    telefone: '',
    cpfCnpj: '',
    observacoes: ''
  });
  const formContainerRef = useRef<HTMLDivElement>(null);
  
  // Buscar dados da empresa
  const partner = partnerId ? partnersData[partnerId] : null;

  // Bloquear scroll da página quando o formulário estiver aberto (mas permitir scroll dentro do formulário)
  useEffect(() => {
    if (isTrademarkModalOpen) {
      // Salvar a posição atual do scroll
      const scrollY = window.scrollY;
      // Desabilitar scroll apenas do body, não do formulário
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      // Scroll para o topo do formulário após um pequeno delay para garantir que o DOM foi atualizado
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.scrollTop = 0;
        }
      }, 300);
      
      return () => {
        // Reabilitar scroll quando o formulário fechar
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        // Restaurar a posição do scroll
        window.scrollTo(0, scrollY);
      };
    }
  }, [isTrademarkModalOpen]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.marca || !formData.nome || !formData.email || !formData.telefone || !formData.cpfCnpj) {
      alert(language === 'pt' 
        ? 'Por favor, preencha todos os campos obrigatórios.'
        : 'Please fill in all required fields.'
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Enviar para Google Sheets
      const formattedData = formatTrademarkData(formData);
      const result = await submitToGoogleSheets(formattedData);
      
      if (result.success) {
        alert(language === 'pt' 
          ? 'Formulário enviado com sucesso! Entraremos em contato em breve.'
          : 'Form submitted successfully! We will contact you soon.'
        );
        
        // Limpar formulário e fechar
        setFormData({
          marca: '',
          descricao: '',
          classe: '',
          nome: '',
          email: '',
          telefone: '',
          cpfCnpj: '',
          observacoes: ''
        });
        setIsTrademarkModalOpen(false);
      } else {
        throw new Error(result.error || 'Erro ao enviar formulário');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert(language === 'pt' 
        ? 'Erro ao enviar formulário. Por favor, tente novamente.'
        : 'Error submitting form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-6xl">
            <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
              {/* Logo - aparece primeiro no mobile */}
              {partner.logo && (
                <div className="flex-shrink-0 flex items-center justify-center md:justify-end md:ml-auto order-first md:order-last">
                  <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Left Column - Text Content */}
              <div className="flex-1 max-w-4xl order-last md:order-first">
                {/* Segment Tag */}
                <span className="inline-block text-xs tracking-wider uppercase text-muted-foreground/70 font-medium mb-4 px-3 py-1 rounded-full bg-foreground/5 border border-border/30">
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
          </div>
        </div>
      </section>


      {/* Stats Marquee Section - Genérico para todas as empresas */}
      <section className="py-8 bg-background border-y border-border/50">
        <Marquee className="[--duration:30s]" enableDrag>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+10</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Anos de Experiência' : 'Years of Experience'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+500</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Clientes Atendidos' : 'Clients Served'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">98%</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Satisfação' : 'Satisfaction'}
            </span>
          </div>
          <div className="flex items-center gap-3 mx-8">
            <span className="text-3xl font-light text-foreground">+1000</span>
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? 'Projetos Realizados' : 'Projects Completed'}
            </span>
          </div>
        </Marquee>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-2">
                {language === 'pt' ? 'Presença Global' : 'Global Presence'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'pt' 
                  ? 'Nossa atuação estratégica em diferentes regiões'
                  : 'Our strategic presence in different regions'}
              </p>
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

      {/* BC Capital Services Section */}
      {partner.id === 'bc-capital' && (
        <>
          {/* Services Cards */}
          <section className="py-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                    {language === 'pt' ? 'Nossos Serviços' : 'Our Services'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'pt' 
                      ? 'Soluções financeiras completas e personalizadas para empresas e indivíduos'
                      : 'Complete and personalized financial solutions for companies and individuals'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Empréstimos Consignados CLT */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <CreditCard className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Empréstimos Consignados (CLT)' : 'Payroll Loans (CLT)'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Crédito seguro e rápido para funcionários CLT com descontos direto na folha de pagamento.'
                              : 'Safe and fast credit for CLT employees with direct payroll deductions.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Empréstimos com Garantia PJ */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <Building2 className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Empréstimos com Garantia (PJ)' : 'Secured Loans (Corporate)'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Soluções de crédito para pessoas jurídicas com garantias reais e condições competitivas.'
                              : 'Credit solutions for legal entities with real guarantees and competitive conditions.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gestão de Ativos Federais */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <TrendingUp className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Gestão de Ativos Federais' : 'Federal Assets Management'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Gestão, compra e venda de ativos federais com portfólio de aproximadamente R$ 4 bilhões.'
                              : 'Management, purchase and sale of federal assets with a portfolio of approximately R$ 4 billion.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Precatórios Federais */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <FileText className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Precatórios Federais' : 'Federal Precatórios'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Compra e venda especializada de precatórios federais com expertise e agilidade.'
                              : 'Specialized purchase and sale of federal precatórios with expertise and agility.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPIs Marquee Section */}
          <section className="py-8 bg-background border-y border-border/50">
            <Marquee className="[--duration:30s]" enableDrag>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">R$ 4 bi</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Em Ativos Federais' : 'In Federal Assets'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+98%</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Taxa de Aprovação' : 'Approval Rate'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+72h</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Tempo de Resposta' : 'Response Time'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+15</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Anos de Experiência' : 'Years of Experience'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+500</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Operações Realizadas' : 'Operations Completed'}
                </span>
              </div>
            </Marquee>
          </section>
        </>
      )}

      {/* Agroplantio Activities Section */}
      {partner.id === 'agroplantio' && (
        <>
          {/* Activities Cards */}
          <section className="py-16">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
                    {language === 'pt' ? 'Nossas Atividades' : 'Our Activities'}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'pt' 
                      ? 'Serviços especializados em terraplanagem, obras pesadas e soluções agrícolas integradas'
                      : 'Specialized services in earthmoving, heavy construction and integrated agricultural solutions'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Terraplanagem */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <Truck className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Terraplanagem' : 'Earthmoving'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Movimentação de terra e nivelamento de terrenos para projetos de infraestrutura e construção.'
                              : 'Earthmoving and land leveling for infrastructure and construction projects.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Obras Pesadas */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <Hammer className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Obras Pesadas' : 'Heavy Construction'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Execução de grandes projetos de infraestrutura com maquinário pesado especializado.'
                              : 'Execution of large infrastructure projects with specialized heavy machinery.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Licitações */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <ClipboardCheck className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Licitações' : 'Bidding'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Participação em licitações públicas e privadas com expertise em documentação e execução.'
                              : 'Participation in public and private bidding with expertise in documentation and execution.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plantação de Eucalipto */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <TreePine className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Plantação de Eucalipto' : 'Eucalyptus Plantation'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Implantação de florestas de eucalipto com técnicas modernas e manejo sustentável.'
                              : 'Eucalyptus forest implementation with modern techniques and sustainable management.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replantio */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <Leaf className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Replantio' : 'Replanting'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Replantio estratégico de áreas florestais com foco em produtividade e sustentabilidade.'
                              : 'Strategic replanting of forest areas with focus on productivity and sustainability.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preparação de Solo */}
                  <div className="group">
                    <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                      <GlowingEffect
                        spread={50}
                        glow={true}
                        disabled={false}
                        proximity={0}
                        inactiveZone={0}
                        borderWidth={2}
                      />
                      <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        
                        <div className="relative z-10">
                          <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                            <Wrench className="w-6 h-6 text-foreground" />
                          </div>
                          <h3 className="text-xl font-medium text-foreground mb-2">
                            {language === 'pt' ? 'Preparação de Solo' : 'Soil Preparation'}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {language === 'pt'
                              ? 'Preparação técnica do solo para plantio com análise e correção adequada.'
                              : 'Technical soil preparation for planting with proper analysis and correction.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* KPIs Marquee Section */}
          <section className="py-8 bg-background border-y border-border/50">
            <Marquee className="[--duration:30s]" enableDrag>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+20</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Anos de Experiência' : 'Years of Experience'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+500</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Projetos Realizados' : 'Projects Completed'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+50</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Máquinas na Frota' : 'Machines in Fleet'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+2</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Estados de Atuação' : 'Operating States'}
                </span>
              </div>
              <div className="flex items-center gap-3 mx-8">
                <span className="text-3xl font-light text-foreground">+1000</span>
                <span className="text-sm text-muted-foreground uppercase tracking-wider">
                  {language === 'pt' ? 'Hectares Plantados' : 'Hectares Planted'}
                </span>
              </div>
            </Marquee>
          </section>
        </>
      )}

      {/* Conecta Cargas Timeline Section */}
      {partner.id === 'conecta-cargas' && (
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-foreground" />
                  <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground">
                    {language === 'pt' ? 'Cronograma de Expansão' : 'Expansion Timeline'}
                  </h2>
                </div>
                <p className="text-muted-foreground">
                  {language === 'pt' 
                    ? 'Nossa estratégia de crescimento internacional planejada'
                    : 'Our planned international growth strategy'}
                </p>
              </div>

              <div className="space-y-6">
                {/* Brasil */}
                <div className="group">
                  <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={0}
                      inactiveZone={0}
                      borderWidth={2}
                    />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-medium text-foreground mb-1">
                          {language === 'pt' ? 'Brasil' : 'Brazil'}
                        </h3>
                      </div>
                      <div className="relative z-10">
                        <span className="text-lg font-light text-muted-foreground">
                          {language === 'pt' ? 'Março/2026' : 'March/2026'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Paraguai / Argentina / Chile */}
                <div className="group">
                  <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={0}
                      inactiveZone={0}
                      borderWidth={2}
                    />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-medium text-foreground mb-1">
                          {language === 'pt' ? 'Paraguai / Argentina / Chile' : 'Paraguay / Argentina / Chile'}
                        </h3>
                      </div>
                      <div className="relative z-10">
                        <span className="text-lg font-light text-muted-foreground">
                          {language === 'pt' ? 'Setembro/2026' : 'September/2026'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* EUA */}
                <div className="group">
                  <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={0}
                      inactiveZone={0}
                      borderWidth={2}
                    />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-medium text-foreground mb-1">
                          {language === 'pt' ? 'EUA' : 'USA'}
                        </h3>
                      </div>
                      <div className="relative z-10">
                        <span className="text-lg font-light text-muted-foreground">
                          {language === 'pt' ? 'Fevereiro/2027' : 'February/2027'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Eurásia */}
                <div className="group">
                  <div className="relative rounded-[1.5rem] border-[0.75px] border-border/50 p-2.5 transition-all duration-500 hover:border-border">
                    <GlowingEffect
                      spread={50}
                      glow={true}
                      disabled={false}
                      proximity={0}
                      inactiveZone={0}
                      borderWidth={2}
                    />
                    <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-4 overflow-hidden rounded-xl border-[0.75px] border-border/30 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl p-6 shadow-[0px_0px_27px_0px_rgba(0,0,0,0.5)] transition-shadow duration-500 group-hover:shadow-[0px_0px_40px_0px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      
                      <div className="relative z-10 flex-1">
                        <h3 className="text-xl font-medium text-foreground mb-1">
                          {language === 'pt' ? 'Eurásia' : 'Eurasia'}
                        </h3>
                      </div>
                      <div className="relative z-10">
                        <span className="text-lg font-light text-muted-foreground">
                          {language === 'pt' ? 'Dezembro/2027' : 'December/2027'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
              
              {/* MT Concept Button */}
              {partner.id === 'mt-concept' && (
                <div className="flex justify-center mt-12">
                  <GlassButton 
                    href="/empreendimentos" 
                    size="lg"
                    contentClassName="flex items-center gap-2.5"
                  >
                    {language === 'pt' ? 'Ver Empreendimentos' : 'View Developments'}
                    <ArrowRight className="w-5 h-5" />
                  </GlassButton>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* IMAP Trademark Registration Form - Com animação igual ao CONTATO */}
      {partner.id === 'imap-marcas-patentes' && (
        <section className="flex min-h-screen items-center justify-center px-6 py-20 relative">
          {/* Modal Fixo - Sempre no centro da tela */}
          {isTrademarkModalOpen && (
            <>
              {/* Overlay com blur */}
              <div
                className="fixed inset-0 bg-background/80 backdrop-blur-md z-[50] transition-all duration-700"
                onClick={() => {
                  setIsTrademarkModalOpen(false);
                  // Limpar formulário ao fechar
                  setFormData({
                    marca: '',
                    descricao: '',
                    classe: '',
                    nome: '',
                    email: '',
                    telefone: '',
                    cpfCnpj: '',
                    observacoes: ''
                  });
                }}
              />
              
              {/* Container do Modal - Fixo no centro da viewport */}
              <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
                <div
                  ref={formContainerRef}
                  className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isTrademarkModalOpen ? 1 : 0,
                    transform: isTrademarkModalOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 md:p-8 lg:p-12">
                <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                  {language === 'pt' ? 'Formulário de Registro de Marca' : 'Trademark Registration Form'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'pt'
                    ? 'Todos os campos são obrigatórios para garantir um processo eficiente'
                    : 'All fields are required to ensure an efficient process'}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Dados da Marca */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
                    {language === 'pt' ? 'Dados da Marca' : 'Trademark Information'}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="marca" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Nome da Marca' : 'Trademark Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="marca"
                        required
                        value={formData.marca}
                        onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? 'Digite o nome da marca' : 'Enter trademark name'}
                      />
                    </div>

                    <div>
                      <label htmlFor="classe" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Classe de Produtos/Serviços (INPI)' : 'Product/Service Class (INPI)'}
                      </label>
                      <input
                        type="text"
                        id="classe"
                        value={formData.classe}
                        onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? 'Ex: Classe 25 (Vestuário)' : 'Ex: Class 25 (Clothing)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="descricao" className="block text-sm font-medium text-foreground mb-2">
                      {language === 'pt' ? 'Descrição da Marca' : 'Trademark Description'}
                    </label>
                    <textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                      placeholder={language === 'pt' ? 'Descreva a marca e seus produtos/serviços' : 'Describe the trademark and its products/services'}
                    />
                  </div>
                </div>

                {/* Dados do Solicitante */}
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
                    {language === 'pt' ? 'Dados do Solicitante' : 'Applicant Information'}
                  </h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Nome Completo / Razão Social' : 'Full Name / Company Name'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="nome"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? 'Nome ou razão social' : 'Name or company name'}
                      />
                    </div>

                    <div>
                      <label htmlFor="cpfCnpj" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'CPF / CNPJ' : 'CPF / CNPJ'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cpfCnpj"
                        required
                        value={formData.cpfCnpj}
                        onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? '000.000.000-00 ou 00.000.000/0000-00' : '000.000.000-00 or 00.000.000/0000-00'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'E-mail' : 'Email'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? 'seu@email.com' : 'your@email.com'}
                      />
                    </div>

                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Telefone' : 'Phone'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                        placeholder={language === 'pt' ? '(00) 00000-0000' : '(00) 00000-0000'}
                      />
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div>
                  <label htmlFor="observacoes" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Observações Adicionais' : 'Additional Notes'}
                  </label>
                  <textarea
                    id="observacoes"
                    value={formData.observacoes}
                    onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none"
                    placeholder={language === 'pt' ? 'Informações adicionais que possam ser relevantes' : 'Additional information that may be relevant'}
                  />
                </div>

                {/* Botões */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsTrademarkModalOpen(false);
                      setFormData({
                        marca: '',
                        descricao: '',
                        classe: '',
                        nome: '',
                        email: '',
                        telefone: '',
                        cpfCnpj: '',
                        observacoes: ''
                      });
                    }}
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-lg border border-border bg-transparent text-foreground hover:bg-foreground/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {language === 'pt' ? 'Cancelar' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{language === 'pt' ? 'Enviando...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <span>{language === 'pt' ? 'Enviar Solicitação' : 'Submit Request'}</span>
                    )}
                  </button>
                </div>
              </form>
                  </div>
                </div>
              </div>
            </>
          )}
          
          <div className="relative flex flex-col items-center gap-12 w-full max-w-4xl z-10">

            {/* Status disponível */}
            <div
              className="flex items-center gap-3 transition-all duration-500"
              style={{
                opacity: isTrademarkModalOpen ? 0 : 1,
                transform: isTrademarkModalOpen ? "translateY(-20px)" : "translateY(0)",
                pointerEvents: isTrademarkModalOpen ? "none" : "auto",
              }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                {language === 'pt' ? 'Disponível para registro' : 'Available for registration'}
              </span>
            </div>

            {/* Texto clicável com animação */}
            <div
              className="group relative cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setIsTrademarkModalOpen(true)}
              style={{
                pointerEvents: isTrademarkModalOpen ? "none" : "auto",
              }}
            >
              <div className="flex flex-col items-center gap-6">
                <h2
                  className="relative text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: isTrademarkModalOpen ? 0 : 1,
                    transform: isTrademarkModalOpen ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
                  }}
                >
                  <span className="block overflow-hidden">
                    <span
                      className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{
                        transform: isHovered && !isTrademarkModalOpen ? "translateY(-8%)" : "translateY(0)",
                      }}
                    >
                      {language === 'pt' ? 'Registre' : 'Register'}
                    </span>
                  </span>
                  <span className="block overflow-hidden">
                    <span
                      className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                      style={{
                        transform: isHovered && !isTrademarkModalOpen ? "translateY(-8%)" : "translateY(0)",
                      }}
                    >
                      <span className="text-muted-foreground/60">{language === 'pt' ? 'sua Marca' : 'Your Trademark'}</span>
                    </span>
                  </span>
                </h2>

                <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                    style={{
                      borderColor: isTrademarkModalOpen ? "var(--foreground)" : isHovered ? "var(--foreground)" : "var(--border)",
                      backgroundColor: isTrademarkModalOpen ? "transparent" : isHovered ? "var(--foreground)" : "transparent",
                      transform: isTrademarkModalOpen ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                      opacity: isTrademarkModalOpen ? 0 : 1,
                      transitionDuration: isTrademarkModalOpen ? "700ms" : "500ms",
                    }}
                  />
                  <ArrowUpRight
                    className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                    style={{
                      transform: isTrademarkModalOpen
                        ? "translate(100px, -100px) scale(0.5)"
                        : isHovered
                            ? "translate(2px, -2px)"
                            : "translate(0, 0)",
                      opacity: isTrademarkModalOpen ? 0 : 1,
                      color: isHovered && !isTrademarkModalOpen ? "var(--background)" : "var(--foreground)",
                      transitionDuration: isTrademarkModalOpen ? "600ms" : "500ms",
                    }}
                  />
                </div>
              </div>

              <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
                <div
                  className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                  style={{
                    transform: isTrademarkModalOpen ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                    opacity: isTrademarkModalOpen ? 0 : isHovered ? 1 : 0.5,
                  }}
                />
              </div>
              <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
                <div
                  className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                  style={{
                    transform: isTrademarkModalOpen ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                    opacity: isTrademarkModalOpen ? 0 : isHovered ? 1 : 0.5,
                  }}
                />
              </div>
            </div>

            {/* Descrição */}
            <div
              className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
              style={{
                opacity: isTrademarkModalOpen ? 0 : 1,
                transform: isTrademarkModalOpen ? "translateY(20px)" : "translateY(0)",
                pointerEvents: isTrademarkModalOpen ? "none" : "auto",
              }}
            >
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
                {language === 'pt' 
                  ? 'Preencha o formulário e nossa equipe entrará em contato para iniciar o processo de registro'
                  : 'Fill out the form and our team will contact you to start the registration process'}
              </p>
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
