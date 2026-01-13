import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { GlassButton } from '@/components/ui/glass-button';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Marquee } from '@/components/ui/marquee';
import { CheckCircle2, Clock, Shield, TrendingUp, FileText, ArrowRight, ArrowUpRight } from 'lucide-react';
import { submitToGoogleSheets, formatAcquisitionData } from '@/lib/googleSheets';

const Acquisition = () => {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    endereco: '',
    socios: '',
    regimeTributacao: '',
    faturamentoMedio: '',
    estoqueMedio: '',
    imobilizado: '',
    contasPagar: '',
    passivosOcultos: '',
    valorVendaSugerido: '',
    aluguel: '',
    motivoVenda: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Bloquear scroll da página quando o formulário estiver aberto (mas permitir scroll dentro do formulário)
  useEffect(() => {
    if (showForm) {
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
  }, [showForm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.razaoSocial.trim()) newErrors.razaoSocial = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.nomeFantasia.trim()) newErrors.nomeFantasia = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.cnpj.trim()) newErrors.cnpj = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.endereco.trim()) newErrors.endereco = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.socios.trim()) newErrors.socios = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.regimeTributacao.trim()) newErrors.regimeTributacao = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.faturamentoMedio.trim()) newErrors.faturamentoMedio = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.estoqueMedio.trim()) newErrors.estoqueMedio = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.imobilizado.trim()) newErrors.imobilizado = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.contasPagar.trim()) newErrors.contasPagar = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.passivosOcultos.trim()) newErrors.passivosOcultos = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.valorVendaSugerido.trim()) newErrors.valorVendaSugerido = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.aluguel.trim()) newErrors.aluguel = language === 'pt' ? 'Campo obrigatório' : 'Required field';
    if (!formData.motivoVenda.trim()) newErrors.motivoVenda = language === 'pt' ? 'Campo obrigatório' : 'Required field';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Enviar para Google Sheets
      const formattedData = formatAcquisitionData(formData);
      const result = await submitToGoogleSheets(formattedData);
      
      if (result.success) {
        alert(language === 'pt' 
          ? 'Formulário enviado com sucesso! Entraremos em contato em até 72h.'
          : 'Form submitted successfully! We will contact you within 72h.'
        );
        
        // Limpar formulário
        setFormData({
          razaoSocial: '',
          nomeFantasia: '',
          cnpj: '',
          endereco: '',
          socios: '',
          regimeTributacao: '',
          faturamentoMedio: '',
          estoqueMedio: '',
          imobilizado: '',
          contasPagar: '',
          passivosOcultos: '',
          valorVendaSugerido: '',
          aluguel: '',
          motivoVenda: '',
        });
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

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-6">
              {language === 'pt' ? 'Aquisição de Empresas' : 'Business Acquisition'}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {language === 'pt' 
                ? 'Receba uma proposta de compra para a sua empresa em até 72h'
                : 'Receive a purchase proposal for your company within 72 hours'}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8 mx-auto" />
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            {/* Main Description */}
            <div className="mb-16">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 text-center">
                  {language === 'pt' 
                    ? 'Estamos sempre em busca de oportunidades estratégicas de investimento e aquisição. Se você possui uma empresa consolidada e está considerando uma transição, podemos oferecer uma proposta personalizada que valoriza seu negócio e garante uma transição suave e profissional.'
                    : 'We are always looking for strategic investment and acquisition opportunities. If you own a consolidated company and are considering a transition, we can offer a personalized proposal that values your business and ensures a smooth and professional transition.'}
                </p>
                <p className="text-base md:text-lg text-muted-foreground/80 leading-relaxed text-center">
                  {language === 'pt'
                    ? 'Nossa equipe especializada em fusões e aquisições analisa cada oportunidade com rigor e agilidade, garantindo processos transparentes, avaliações justas e negociações que beneficiam ambas as partes.'
                    : 'Our specialized mergers and acquisitions team analyzes each opportunity with rigor and agility, ensuring transparent processes, fair valuations and negotiations that benefit both parties.'}
                </p>
              </div>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <Clock className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Resposta Rápida' : 'Quick Response'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Receba uma proposta detalhada em até 72 horas após o envio do formulário completo.'
                          : 'Receive a detailed proposal within 72 hours after submitting the complete form.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <Shield className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Processo Confidencial' : 'Confidential Process'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Todas as informações são tratadas com absoluta confidencialidade e sigilo profissional.'
                          : 'All information is treated with absolute confidentiality and professional secrecy.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <TrendingUp className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Avaliação Justa' : 'Fair Valuation'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Análise criteriosa que considera todos os aspectos do seu negócio para uma avaliação precisa.'
                          : 'Rigorous analysis that considers all aspects of your business for an accurate valuation.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <FileText className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Documentação Simplificada' : 'Simplified Documentation'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Processo descomplicado com suporte completo em todas as etapas da negociação.'
                          : 'Uncomplicated process with full support at all stages of negotiation.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <CheckCircle2 className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Experiência Comprovada' : 'Proven Experience'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Equipe especializada com histórico de transações bem-sucedidas em diversos segmentos.'
                          : 'Specialized team with a history of successful transactions across various segments.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

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
                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    
                    <div className="relative z-10">
                      <div className="p-3 rounded-lg bg-foreground/5 mb-4 w-fit">
                        <TrendingUp className="w-6 h-6 text-foreground" />
                      </div>
                      <h3 className="text-xl font-medium text-foreground mb-2">
                        {language === 'pt' ? 'Transição Suave' : 'Smooth Transition'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {language === 'pt'
                          ? 'Planejamento cuidadoso para garantir continuidade operacional e preservação do valor.'
                          : 'Careful planning to ensure operational continuity and value preservation.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-8 text-center">
                {language === 'pt' ? 'Como Funciona' : 'How It Works'}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-medium mx-auto mb-4">
                    1
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Preencha o Formulário' : 'Fill Out the Form'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'pt'
                      ? 'Forneça as informações essenciais sobre sua empresa de forma completa e detalhada.'
                      : 'Provide essential information about your company in a complete and detailed manner.'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-medium mx-auto mb-4">
                    2
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Análise e Avaliação' : 'Analysis and Valuation'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'pt'
                      ? 'Nossa equipe analisa todas as informações e prepara uma proposta personalizada.'
                      : 'Our team analyzes all information and prepares a personalized proposal.'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center text-xl font-medium mx-auto mb-4">
                    3
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Proposta em 72h' : 'Proposal in 72h'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'pt'
                      ? 'Receba uma proposta detalhada e comece as negociações com nossa equipe.'
                      : 'Receive a detailed proposal and begin negotiations with our team.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Companies We Buy Section */}
            <div className="mb-16">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4 text-center">
                {language === 'pt' ? 'Empresas que Compramos' : 'Companies We Acquire'}
              </h2>
              <p className="text-base text-muted-foreground mb-8 text-center max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Foco em empresas do Simples Nacional'
                  : 'Focus on Simples Nacional companies'}
              </p>
              
              <div className="py-8 bg-background border-y border-border/50 rounded-lg px-4 md:px-0">
                <Marquee className="[--duration:38s]" enableDrag>
                  {[
                    { pt: 'Mercados', en: 'Markets' },
                    { pt: 'Farmácias', en: 'Pharmacies' },
                    { pt: 'Distribuidoras de bebidas', en: 'Beverage Distributors' },
                    { pt: 'Ferragens', en: 'Hardware Stores' },
                    { pt: 'Autopeças', en: 'Auto Parts' },
                    { pt: 'Oficinas', en: 'Workshops' },
                    { pt: 'Padarias', en: 'Bakeries' },
                    { pt: 'Minimercados', en: 'Convenience Stores' },
                    { pt: 'Empresas em Recuperação Judicial', en: 'Companies in Judicial Recovery' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 mx-4 md:mx-8">
                      <span className="text-xl md:text-2xl font-light text-foreground">
                        {item[language]}
                      </span>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">
                {language === 'pt' ? 'Pronto para o Próximo Passo?' : 'Ready for the Next Step?'}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                {language === 'pt'
                  ? 'Preencha o formulário abaixo com todas as informações solicitadas. Quanto mais detalhadas as informações, mais precisa será nossa avaliação e proposta.'
                  : 'Fill out the form below with all requested information. The more detailed the information, the more accurate our evaluation and proposal will be.'}
              </p>
              <div className="w-24 h-px bg-foreground/20 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section com Animação */}
      <section className="pb-32 flex min-h-screen items-center justify-center px-6 relative">
        {/* Modal Fixo - Sempre no centro da tela */}
        {showForm && (
          <>
            {/* Overlay com blur */}
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-[50] transition-all duration-700"
              onClick={() => {
                setShowForm(false);
                // Limpar formulário ao fechar
                setFormData({
                  razaoSocial: '',
                  nomeFantasia: '',
                  cnpj: '',
                  endereco: '',
                  socios: '',
                  regimeTributacao: '',
                  faturamentoMedio: '',
                  estoqueMedio: '',
                  imobilizado: '',
                  contasPagar: '',
                  passivosOcultos: '',
                  valorVendaSugerido: '',
                  aluguel: '',
                  motivoVenda: '',
                });
                setErrors({});
              }}
            />
            
            {/* Container do Modal - Fixo no centro da viewport */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
              <div
                ref={formContainerRef}
                className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border border-border rounded-2xl shadow-2xl pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: showForm ? 1 : 0,
                  transform: showForm ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 md:p-8 lg:p-12">
              <div className="mb-12 text-center">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                {language === 'pt' ? 'Formulário de Aquisição' : 'Acquisition Form'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'pt'
                  ? 'Todos os campos são obrigatórios para garantir uma avaliação precisa'
                  : 'All fields are required to ensure an accurate evaluation'}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Grid 2 colunas para campos menores */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Razão Social */}
                <div>
                  <label htmlFor="razaoSocial" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Razão Social' : 'Legal Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="razaoSocial"
                    name="razaoSocial"
                    value={formData.razaoSocial}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.razaoSocial ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'Digite a razão social' : 'Enter legal name'}
                  />
                  {errors.razaoSocial && (
                    <p className="mt-1 text-xs text-red-500">{errors.razaoSocial}</p>
                  )}
                </div>

                {/* Nome Fantasia */}
                <div>
                  <label htmlFor="nomeFantasia" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Nome Fantasia' : 'Trade Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nomeFantasia"
                    name="nomeFantasia"
                    value={formData.nomeFantasia}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.nomeFantasia ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'Digite o nome fantasia' : 'Enter trade name'}
                  />
                  {errors.nomeFantasia && (
                    <p className="mt-1 text-xs text-red-500">{errors.nomeFantasia}</p>
                  )}
                </div>
              </div>

              {/* CNPJ */}
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-foreground mb-2">
                  CNPJ <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-card border ${
                    errors.cnpj ? 'border-red-500' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                  placeholder={language === 'pt' ? '00.000.000/0000-00' : '00.000.000/0000-00'}
                />
                {errors.cnpj && (
                  <p className="mt-1 text-xs text-red-500">{errors.cnpj}</p>
                )}
              </div>

              {/* Endereço */}
              <div>
                <label htmlFor="endereco" className="block text-sm font-medium text-foreground mb-2">
                  {language === 'pt' ? 'Endereço' : 'Address'} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-card border ${
                    errors.endereco ? 'border-red-500' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                  placeholder={language === 'pt' ? 'Rua, número, bairro, cidade, estado' : 'Street, number, neighborhood, city, state'}
                />
                {errors.endereco && (
                  <p className="mt-1 text-xs text-red-500">{errors.endereco}</p>
                )}
              </div>

              {/* Sócios */}
              <div>
                <label htmlFor="socios" className="block text-sm font-medium text-foreground mb-2">
                  {language === 'pt' ? 'Sócios' : 'Partners'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="socios"
                  name="socios"
                  value={formData.socios}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-3 rounded-lg bg-card border ${
                    errors.socios ? 'border-red-500' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none`}
                  placeholder={language === 'pt' ? 'Liste os sócios e suas participações' : 'List partners and their shares'}
                />
                {errors.socios && (
                  <p className="mt-1 text-xs text-red-500">{errors.socios}</p>
                )}
              </div>

              {/* Regime de Tributação */}
              <div>
                <label htmlFor="regimeTributacao" className="block text-sm font-medium text-foreground mb-2">
                  {language === 'pt' ? 'Regime de Tributação' : 'Tax Regime'} <span className="text-red-500">*</span>
                </label>
                <select
                  id="regimeTributacao"
                  name="regimeTributacao"
                  value={formData.regimeTributacao}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg bg-card border ${
                    errors.regimeTributacao ? 'border-red-500' : 'border-border'
                  } text-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                >
                  <option value="">{language === 'pt' ? 'Selecione...' : 'Select...'}</option>
                  <option value="simples-nacional">{language === 'pt' ? 'Simples Nacional' : 'Simples Nacional'}</option>
                  <option value="lucro-presumido">{language === 'pt' ? 'Lucro Presumido' : 'Presumed Profit'}</option>
                  <option value="lucro-real">{language === 'pt' ? 'Lucro Real' : 'Real Profit'}</option>
                </select>
                {errors.regimeTributacao && (
                  <p className="mt-1 text-xs text-red-500">{errors.regimeTributacao}</p>
                )}
              </div>

              {/* Grid para valores financeiros */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Faturamento Médio */}
                <div>
                  <label htmlFor="faturamentoMedio" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Faturamento Médio' : 'Average Revenue'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="faturamentoMedio"
                    name="faturamentoMedio"
                    value={formData.faturamentoMedio}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.faturamentoMedio ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.faturamentoMedio && (
                    <p className="mt-1 text-xs text-red-500">{errors.faturamentoMedio}</p>
                  )}
                </div>

                {/* Estoque Médio */}
                <div>
                  <label htmlFor="estoqueMedio" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Estoque Médio' : 'Average Inventory'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="estoqueMedio"
                    name="estoqueMedio"
                    value={formData.estoqueMedio}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.estoqueMedio ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.estoqueMedio && (
                    <p className="mt-1 text-xs text-red-500">{errors.estoqueMedio}</p>
                  )}
                </div>

                {/* Imobilizado */}
                <div>
                  <label htmlFor="imobilizado" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Imobilizado' : 'Fixed Assets'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="imobilizado"
                    name="imobilizado"
                    value={formData.imobilizado}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.imobilizado ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.imobilizado && (
                    <p className="mt-1 text-xs text-red-500">{errors.imobilizado}</p>
                  )}
                </div>

                {/* Contas a Pagar */}
                <div>
                  <label htmlFor="contasPagar" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Contas a Pagar' : 'Accounts Payable'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contasPagar"
                    name="contasPagar"
                    value={formData.contasPagar}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.contasPagar ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.contasPagar && (
                    <p className="mt-1 text-xs text-red-500">{errors.contasPagar}</p>
                  )}
                </div>

                {/* Passivos Ocultos */}
                <div>
                  <label htmlFor="passivosOcultos" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Passivos Ocultos' : 'Hidden Liabilities'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="passivosOcultos"
                    name="passivosOcultos"
                    value={formData.passivosOcultos}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.passivosOcultos ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.passivosOcultos && (
                    <p className="mt-1 text-xs text-red-500">{errors.passivosOcultos}</p>
                  )}
                </div>

                {/* Valor de Venda Sugerido */}
                <div>
                  <label htmlFor="valorVendaSugerido" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Valor de Venda Sugerido' : 'Suggested Sale Value'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="valorVendaSugerido"
                    name="valorVendaSugerido"
                    value={formData.valorVendaSugerido}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.valorVendaSugerido ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.valorVendaSugerido && (
                    <p className="mt-1 text-xs text-red-500">{errors.valorVendaSugerido}</p>
                  )}
                </div>

                {/* Aluguel */}
                <div>
                  <label htmlFor="aluguel" className="block text-sm font-medium text-foreground mb-2">
                    {language === 'pt' ? 'Aluguel' : 'Rent'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="aluguel"
                    name="aluguel"
                    value={formData.aluguel}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg bg-card border ${
                      errors.aluguel ? 'border-red-500' : 'border-border'
                    } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all`}
                    placeholder={language === 'pt' ? 'R$ 0,00' : 'R$ 0.00'}
                  />
                  {errors.aluguel && (
                    <p className="mt-1 text-xs text-red-500">{errors.aluguel}</p>
                  )}
                </div>
              </div>

              {/* Motivo da Venda */}
              <div>
                <label htmlFor="motivoVenda" className="block text-sm font-medium text-foreground mb-2">
                  {language === 'pt' ? 'Motivo da Venda' : 'Sale Reason'} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="motivoVenda"
                  name="motivoVenda"
                  value={formData.motivoVenda}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 rounded-lg bg-card border ${
                    errors.motivoVenda ? 'border-red-500' : 'border-border'
                  } text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all resize-none`}
                  placeholder={language === 'pt' ? 'Descreva o motivo da venda da empresa' : 'Describe the reason for selling the company'}
                />
                {errors.motivoVenda && (
                  <p className="mt-1 text-xs text-red-500">{errors.motivoVenda}</p>
                )}
              </div>

              {/* Botões */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    // Limpar formulário ao cancelar
                    setFormData({
                      razaoSocial: '',
                      nomeFantasia: '',
                      cnpj: '',
                      endereco: '',
                      socios: '',
                      regimeTributacao: '',
                      faturamentoMedio: '',
                      estoqueMedio: '',
                      imobilizado: '',
                      contasPagar: '',
                      passivosOcultos: '',
                      valorVendaSugerido: '',
                      aluguel: '',
                      motivoVenda: '',
                    });
                    setErrors({});
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
                    <span>{language === 'pt' ? 'Enviar Proposta' : 'Submit Proposal'}</span>
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
              opacity: showForm ? 0 : 1,
              transform: showForm ? "translateY(-20px)" : "translateY(0)",
              pointerEvents: showForm ? "none" : "auto",
            }}
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              {language === 'pt' ? 'Disponível para aquisição' : 'Available for acquisition'}
            </span>
          </div>

          {/* Texto clicável com animação */}
          <div
            className="group relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setShowForm(true)}
            style={{
              pointerEvents: showForm ? "none" : "auto",
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <h2
                className="relative text-center text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  opacity: showForm ? 0 : 1,
                  transform: showForm ? "translateY(-40px) scale(0.95)" : "translateY(0) scale(1)",
                }}
              >
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: isHovered && !showForm ? "translateY(-8%)" : "translateY(0)",
                    }}
                  >
                    {language === 'pt' ? 'Solicite' : 'Request'}
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span
                    className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] delay-75"
                    style={{
                      transform: isHovered && !showForm ? "translateY(-8%)" : "translateY(0)",
                    }}
                  >
                    <span className="text-muted-foreground/60">{language === 'pt' ? 'sua Proposta' : 'Your Proposal'}</span>
                  </span>
                </span>
              </h2>

              <div className="relative mt-4 flex size-16 items-center justify-center sm:size-20">
                <div
                  className="pointer-events-none absolute inset-0 rounded-full border transition-all ease-out"
                  style={{
                    borderColor: showForm ? "var(--foreground)" : isHovered ? "var(--foreground)" : "var(--border)",
                    backgroundColor: showForm ? "transparent" : isHovered ? "var(--foreground)" : "transparent",
                    transform: showForm ? "scale(3)" : isHovered ? "scale(1.1)" : "scale(1)",
                    opacity: showForm ? 0 : 1,
                    transitionDuration: showForm ? "700ms" : "500ms",
                  }}
                />
                <ArrowUpRight
                  className="size-6 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] sm:size-7"
                  style={{
                    transform: showForm
                      ? "translate(100px, -100px) scale(0.5)"
                      : isHovered
                          ? "translate(2px, -2px)"
                          : "translate(0, 0)",
                    opacity: showForm ? 0 : 1,
                    color: isHovered && !showForm ? "var(--background)" : "var(--foreground)",
                    transitionDuration: showForm ? "600ms" : "500ms",
                  }}
                />
              </div>
            </div>

            <div className="absolute -left-8 top-1/2 -translate-y-1/2 sm:-left-16">
              <div
                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                style={{
                  transform: showForm ? "scaleX(0) translateX(-20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                  opacity: showForm ? 0 : isHovered ? 1 : 0.5,
                }}
              />
            </div>
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 sm:-right-16">
              <div
                className="h-px w-8 bg-border transition-all duration-500 sm:w-12"
                style={{
                  transform: showForm ? "scaleX(0) translateX(20px)" : isHovered ? "scaleX(1.5)" : "scaleX(1)",
                  opacity: showForm ? 0 : isHovered ? 1 : 0.5,
                }}
              />
            </div>
          </div>

          {/* Descrição */}
          <div
            className="mt-8 flex flex-col items-center gap-4 text-center transition-all duration-500 delay-100"
            style={{
              opacity: showForm ? 0 : 1,
              transform: showForm ? "translateY(20px)" : "translateY(0)",
              pointerEvents: showForm ? "none" : "auto",
            }}
          >
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              {language === 'pt' 
                ? 'Preencha o formulário e nossa equipe entrará em contato para iniciar o processo de avaliação'
                : 'Fill out the form and our team will contact you to start the evaluation process'}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Acquisition;
