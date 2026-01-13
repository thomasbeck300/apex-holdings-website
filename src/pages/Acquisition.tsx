import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Send, CheckCircle2, Clock, Shield, TrendingUp, FileText } from 'lucide-react';

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
    
    // TODO: Implementar envio do formulário
    console.log('Form data:', formData);
    
    // Simular envio
    setTimeout(() => {
      setIsSubmitting(false);
      alert(language === 'pt' 
        ? 'Formulário enviado com sucesso! Entraremos em contato em até 72h.'
        : 'Form submitted successfully! We will contact you within 72h.'
      );
    }, 1000);
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

              <div className="flex flex-col items-start p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all">
                <div className="p-3 rounded-lg bg-foreground/5 mb-4">
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

      {/* Form Section */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
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

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full md:w-auto px-8 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-300 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
                    <>
                      <Send className="w-5 h-5" />
                      <span>{language === 'pt' ? 'Enviar Proposta' : 'Submit Proposal'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Acquisition;
