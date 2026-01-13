import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: {
    pt: string;
    en: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { pt: 'Início', en: 'Home' },
  'nav.about': { pt: 'Sobre Nós', en: 'About Us' },
  'nav.partners': { pt: 'Empresas Parceiras', en: 'Partner Companies' },
  'nav.segments': { pt: 'Segmentos', en: 'Segments' },
  'nav.contact': { pt: 'Contato', en: 'Contact' },

  // Hero
  'hero.title': { pt: 'Construindo Valor de Longo Prazo', en: 'Building Long-Term Value' },
  'hero.subtitle': { pt: 'Investimentos estratégicos e parcerias sólidas em múltiplos segmentos.', en: 'Strategic investments and solid partnerships across multiple segments.' },
  'hero.cta': { pt: 'Entre em Contato', en: 'Get in Touch' },

  // Home sections
  'home.positioning.title': { pt: 'Uma Holding Focada em Resultados', en: 'A Results-Driven Holding' },
  'home.positioning.text': { pt: 'Atuamos como estrutura central de governança e estratégia, unindo empresas de diferentes segmentos sob uma visão comum de excelência, crescimento sustentável e geração de valor para todos os stakeholders.', en: 'We operate as a central governance and strategy structure, uniting companies from different segments under a common vision of excellence, sustainable growth, and value creation for all stakeholders.' },

  'home.highlights.segments': { pt: 'Segmentos de Atuação', en: 'Business Segments' },
  'home.highlights.segments.desc': { pt: 'Diversificação estratégica em setores de alto potencial', en: 'Strategic diversification in high-potential sectors' },
  'home.highlights.partners': { pt: 'Empresas Parceiras', en: 'Partner Companies' },
  'home.highlights.partners.desc': { pt: 'Portfólio selecionado de empresas líderes', en: 'Curated portfolio of leading companies' },
  'home.highlights.vision': { pt: 'Quem somos', en: 'Who We Are' },
  'home.highlights.vision.desc': { pt: 'Conheça nossa história, valores e propósito', en: 'Discover our history, values and purpose' },

  // About
  'about.title': { pt: 'Sobre Nós', en: 'About Us' },
  'about.purpose.title': { pt: 'Nosso Propósito', en: 'Our Purpose' },
  'about.purpose.text': { pt: 'Existimos para criar valor duradouro através de investimentos estratégicos, governança eficiente e visão de longo prazo. Nossa missão é identificar, apoiar e potencializar empresas com potencial de impacto e crescimento sustentável.', en: 'We exist to create lasting value through strategic investments, efficient governance, and long-term vision. Our mission is to identify, support, and empower companies with potential for impact and sustainable growth.' },
  'about.vision.title': { pt: 'Visão de Futuro', en: 'Future Vision' },
  'about.vision.text': { pt: 'Ser reconhecida como uma holding de referência, admirada pela qualidade de seu portfólio, pela integridade de sua governança e pela capacidade de gerar valor consistente para investidores, parceiros e sociedade.', en: 'To be recognized as a reference holding company, admired for the quality of its portfolio, the integrity of its governance, and its ability to generate consistent value for investors, partners, and society.' },
  'about.governance.title': { pt: 'Governança', en: 'Governance' },
  'about.governance.text': { pt: 'Aplicamos as melhores práticas de governança corporativa, com estruturas claras de tomada de decisão, gestão de riscos e prestação de contas. Transparência e ética são pilares fundamentais de nossa atuação.', en: 'We apply best corporate governance practices, with clear decision-making structures, risk management, and accountability. Transparency and ethics are fundamental pillars of our operations.' },

  // Partners
  'partners.title': { pt: 'Empresas Parceiras', en: 'Partner Companies' },
  'partners.subtitle': { pt: 'Um portfólio cuidadosamente selecionado de empresas líderes em seus respectivos segmentos.', en: 'A carefully curated portfolio of leading companies in their respective segments.' },

  // Segments
  'segments.title': { pt: 'Segmentos de Atuação', en: 'Business Segments' },
  'segments.subtitle': { pt: 'Diversificação estratégica em setores de alto potencial de crescimento e impacto.', en: 'Strategic diversification in sectors with high growth potential and impact.' },

  // Contact
  'contact.title': { pt: 'Contato', en: 'Contact' },
  'contact.subtitle': { pt: 'Entre em contato conosco para discutir oportunidades de parceria e investimento.', en: 'Get in touch with us to discuss partnership and investment opportunities.' },
  'contact.form.name': { pt: 'Nome', en: 'Name' },
  'contact.form.email': { pt: 'E-mail', en: 'Email' },
  'contact.form.company': { pt: 'Empresa', en: 'Company' },
  'contact.form.message': { pt: 'Mensagem', en: 'Message' },
  'contact.form.submit': { pt: 'Enviar Mensagem', en: 'Send Message' },
  'contact.form.success': { pt: 'Mensagem enviada com sucesso.', en: 'Message sent successfully.' },

  // Footer
  'footer.rights': { pt: 'Todos os direitos reservados.', en: 'All rights reserved.' },
  'footer.tagline': { pt: 'Construindo valor de longo prazo.', en: 'Building long-term value.' },
  'footer.legal': { pt: 'Todos os direitos da TBPAR Holding reservados. As marcas, logotipos e direitos autorais das empresas parceiras pertencem aos seus respectivos proprietários. O uso de qualquer marca registrada não implica endosso por parte da TBPAR. Informações sujeitas a alterações sem aviso prévio.', en: 'All rights of TBPAR Holding reserved. Brands, logos and copyrights of partner companies belong to their respective owners. Use of any trademark does not imply endorsement by TBPAR. Information subject to change without notice.' },

  // Home - New sections
  'home.logocloud.title': { pt: 'Empresas de Excelência', en: 'Excellence Companies' },
  'home.map.title': { pt: 'Presença Global', en: 'Global Presence' },
  'home.map.subtitle': { pt: 'Conectando mercados e criando valor em escala internacional', en: 'Connecting markets and creating value on an international scale' },
  'home.team.title': { pt: 'Nossa Equipe', en: 'Our Team' },
  'home.team.subtitle': { pt: 'Profissionais experientes dedicados ao sucesso dos nossos investimentos', en: 'Experienced professionals dedicated to the success of our investments' },
  'home.testimonials.title': { pt: 'Depoimentos', en: 'Testimonials' },
  'home.testimonials.subtitle': { pt: 'O que nossos parceiros dizem sobre nós', en: 'What our partners say about us' },

  // Newsletter
  'newsletter.title': { pt: 'Receba Nossas Atualizações', en: 'Receive Our Updates' },
  'newsletter.subtitle': { pt: 'Fique por dentro de novos investimentos e insights estratégicos', en: 'Stay informed about new investments and strategic insights' },
  'newsletter.button': { pt: 'Inscrever', en: 'Subscribe' },
  'newsletter.success': { pt: 'Inscrição realizada!', en: 'Subscription successful!' },
  'newsletter.success.desc': { pt: 'Você receberá nossas atualizações em breve.', en: 'You will receive our updates soon.' },

  // CTA Section
  'cta.building': { pt: 'Construindo', en: 'Building' },
  'cta.words.solidity': { pt: 'solidez', en: 'solidity' },
  'cta.words.trust': { pt: 'confiança', en: 'trust' },
  'cta.words.credibility': { pt: 'credibilidade', en: 'credibility' },
  'cta.words.stability': { pt: 'estabilidade', en: 'stability' },
  'cta.words.longevity': { pt: 'longevidade', en: 'longevity' },
  'cta.description': { pt: 'Investimentos estratégicos e parcerias sólidas que geram valor sustentável. Nossa missão é identificar oportunidades e potencializar empresas com visão de longo prazo.', en: 'Strategic investments and solid partnerships that generate sustainable value. Our mission is to identify opportunities and empower companies with long-term vision.' },

  // About - Storytelling
  'about.founded': { pt: 'Criada em 2018', en: 'Founded in 2018' },
  'about.journey': { pt: 'Nossa Jornada', en: 'Our Journey' },
  
  'about.story.chapter1': { pt: 'Início da jornada com foco em investimentos estratégicos e geração de valor.', en: 'Beginning of the journey focused on strategic investments and value creation.' },
  'about.story.chapter1.title': { pt: 'Fundação', en: 'Foundation' },
  'about.story.chapter1.period': { pt: '2018', en: '2018' },
  'about.story.chapter1.company': { pt: 'Origem', en: 'Origin' },

  'about.story.chapter2': { pt: 'Crescimento regional com entrada estratégica no Norte do Brasil.', en: 'Regional growth with strategic entry into Northern Brazil.' },
  'about.story.chapter2.title': { pt: 'Expansão para o Norte', en: 'Northern Expansion' },
  'about.story.chapter2.period': { pt: '2020', en: '2020' },
  'about.story.chapter2.company': { pt: 'Maceió/AL', en: 'Maceió/AL' },

  'about.story.chapter3': { pt: 'Fortalecimento da presença na região Sul com novos escritórios estratégicos.', en: 'Strengthening presence in the South region with new strategic offices.' },
  'about.story.chapter3.title': { pt: 'Expansão para SC e PR', en: 'SC and PR Expansion' },
  'about.story.chapter3.period': { pt: '2021', en: '2021' },
  'about.story.chapter3.company': { pt: 'Florianópolis/SC e Curitiba/PR', en: 'Florianópolis/SC and Curitiba/PR' },

  'about.story.chapter4': { pt: 'Reposicionamento estratégico com mudança da matriz para Santa Catarina.', en: 'Strategic repositioning with headquarters relocation to Santa Catarina.' },
  'about.story.chapter4.title': { pt: 'Nova Sede', en: 'New Headquarters' },
  'about.story.chapter4.period': { pt: '2023', en: '2023' },
  'about.story.chapter4.company': { pt: 'Balneário Camboriú/SC', en: 'Balneário Camboriú/SC' },

  'about.story.chapter5': { pt: 'Entrada no maior mercado do país, consolidando presença nacional.', en: 'Entry into the country\'s largest market, consolidating national presence.' },
  'about.story.chapter5.title': { pt: 'Expansão para SP', en: 'SP Expansion' },
  'about.story.chapter5.period': { pt: '2025', en: '2025' },
  'about.story.chapter5.company': { pt: 'São Paulo/SP', en: 'São Paulo/SP' },

  'about.pillars.title': { pt: 'Nossos Pilares', en: 'Our Pillars' },
  'about.pillars.subtitle': { pt: 'Os valores que guiam cada decisão estratégica', en: 'The values that guide every strategic decision' },
  'about.pillars.governance': { pt: 'Governança', en: 'Governance' },
  'about.pillars.governance.desc': { pt: 'Estruturas claras de decisão, gestão de riscos e prestação de contas transparente.', en: 'Clear decision-making structures, risk management, and transparent accountability.' },
  'about.pillars.excellence': { pt: 'Excelência', en: 'Excellence' },
  'about.pillars.excellence.desc': { pt: 'Busca contínua por resultados superiores e melhores práticas de mercado.', en: 'Continuous pursuit of superior results and market best practices.' },
  'about.pillars.partnerships': { pt: 'Parcerias', en: 'Partnerships' },
  'about.pillars.partnerships.desc': { pt: 'Relacionamentos duradouros baseados em confiança e crescimento mútuo.', en: 'Lasting relationships based on trust and mutual growth.' },
  'about.pillars.vision': { pt: 'Visão', en: 'Vision' },
  'about.pillars.vision.desc': { pt: 'Planejamento estratégico de longo prazo alinhado com tendências globais.', en: 'Long-term strategic planning aligned with global trends.' },

  'about.metrics.transparency': { pt: 'Transparência', en: 'Transparency' },
  'about.metrics.compliance': { pt: 'Compliance', en: 'Compliance' },
  'about.metrics.certification': { pt: 'Certificação', en: 'Certification' },

  // Segments
  'segments.data.title': { pt: 'Decisões Baseadas em Dados', en: 'Data-Driven Decisions' },
  'segments.data.description': { pt: 'Analisamos métricas detalhadas mensalmente em cada segmento de atuação. Nossas decisões estratégicas são fundamentadas em dados concretos, garantindo resultados consistentes e crescimento sustentável para todos os stakeholders.', en: 'We analyze detailed metrics monthly in each business segment. Our strategic decisions are based on concrete data, ensuring consistent results and sustainable growth for all stakeholders.' },
  'segments.data.monthly': { pt: 'Mensal', en: 'Monthly' },
  'segments.data.monthly.desc': { pt: 'Análise de Performance', en: 'Performance Analysis' },
  'segments.data.kpis': { pt: 'KPIs Monitorados', en: 'Monitored KPIs' },
  'segments.data.monitoring': { pt: 'Monitoramento Contínuo', en: 'Continuous Monitoring' },

  // Marquee Stats
  'stats.assets': { pt: 'em Ativos', en: 'in Assets' },
  'stats.partners': { pt: 'Empresas Parceiras', en: 'Partner Companies' },
  'stats.segments': { pt: 'Segmentos', en: 'Segments' },
  'stats.experience': { pt: 'Anos de Experiência', en: 'Years of Experience' },
  'stats.success': { pt: 'Taxa de Sucesso', en: 'Success Rate' },

  // Contact
  'contact.available': { pt: 'Disponível para novas parcerias', en: 'Available for new partnerships' },
  'contact.work.title1': { pt: 'Vamos trabalhar', en: 'Let\'s work' },
  'contact.work.title2': { pt: 'juntos', en: 'together' },
  'contact.work.perfect': { pt: 'Perfeito', en: 'Perfect' },
  'contact.work.talk': { pt: 'Vamos conversar', en: 'Let\'s talk' },
  'contact.work.email': { pt: 'Enviar E-mail', en: 'Send Email' },
  'contact.work.description': { pt: 'Tem um projeto em mente? Adoraríamos ouvir sobre ele. Vamos criar algo excepcional juntos.', en: 'Have a project in mind? We\'d love to hear about it. Let\'s create something exceptional together.' },

  // Gallery / Projects
  'gallery.title': { pt: 'Projetos', en: 'Projects' },
  'gallery.delivered': { pt: 'Projetos Entregues', en: 'Delivered Projects' },
  'gallery.category.frigorifico': { pt: 'Frigoríficos', en: 'Cold Storage' },
  'gallery.category.pavilhao': { pt: 'Pavilhões', en: 'Warehouses' },
  'gallery.category.distribuidora': { pt: 'Distribuidoras de carne', en: 'Meat Distributors' },
  'gallery.category.escritorio': { pt: 'Escritórios', en: 'Offices' },
  
  // Common
  'common.learnmore': { pt: 'Saiba mais', en: 'Learn more' },

  // Team Member - Thomas Beck
  'team.thomas.name': { pt: 'Thomas Beck', en: 'Thomas Beck' },
  'team.thomas.role': { pt: 'CEO & Fundador', en: 'CEO & Founder' },
  'team.thomas.quote': { pt: 'Criar algo inspirador, passando segurança.', en: 'Creating something inspiring, providing security.' },

  // Testimonials 3D
  'testimonial.carlos.name': { pt: 'Carlos Silva', en: 'Carlos Silva' },
  'testimonial.carlos.role': { pt: 'CEO, TechCorp', en: 'CEO, TechCorp' },
  'testimonial.carlos.quote': { pt: 'Parceria estratégica que transformou nossos resultados!', en: 'Strategic partnership that transformed our results!' },

  'testimonial.ana.name': { pt: 'Ana Rodrigues', en: 'Ana Rodrigues' },
  'testimonial.ana.role': { pt: 'Diretora Financeira, InvestCo', en: 'CFO, InvestCo' },
  'testimonial.ana.quote': { pt: 'Governança exemplar e visão de longo prazo.', en: 'Exemplary governance and long-term vision.' },

  'testimonial.roberto.name': { pt: 'Roberto Mendes', en: 'Roberto Mendes' },
  'testimonial.roberto.role': { pt: 'Fundador, StartupHub', en: 'Founder, StartupHub' },
  'testimonial.roberto.quote': { pt: 'Profissionalismo e transparência em cada etapa.', en: 'Professionalism and transparency at every stage.' },

  'testimonial.marina.name': { pt: 'Marina Costa', en: 'Marina Costa' },
  'testimonial.marina.role': { pt: 'VP Operações, GlobalTrade', en: 'VP Operations, GlobalTrade' },
  'testimonial.marina.quote': { pt: 'Excelência operacional que gera valor consistente.', en: 'Operational excellence that generates consistent value.' },

  'testimonial.paulo.name': { pt: 'Paulo Santos', en: 'Paulo Santos' },
  'testimonial.paulo.role': { pt: 'CEO, TechSolutions', en: 'CEO, TechSolutions' },
  'testimonial.paulo.quote': { pt: 'Investimento que superou todas as expectativas!', en: 'Investment that exceeded all expectations!' },

  'testimonial.julia.name': { pt: 'Julia Martins', en: 'Julia Martins' },
  'testimonial.julia.role': { pt: 'Diretora, FinanceGroup', en: 'Director, FinanceGroup' },
  'testimonial.julia.quote': { pt: 'Equipe dedicada ao sucesso dos parceiros.', en: 'Team dedicated to partner success.' },

  'testimonial.fernando.name': { pt: 'Fernando Lima', en: 'Fernando Lima' },
  'testimonial.fernando.role': { pt: 'Fundador, BusinessCorp', en: 'Founder, BusinessCorp' },
  'testimonial.fernando.quote': { pt: 'Resultados impressionantes em poucos meses!', en: 'Impressive results in just a few months!' },

  'testimonial.beatriz.name': { pt: 'Beatriz Alves', en: 'Beatriz Alves' },
  'testimonial.beatriz.role': { pt: 'CEO, EnterpriseHub', en: 'CEO, EnterpriseHub' },
  'testimonial.beatriz.quote': { pt: 'Governança sólida e processos transparentes.', en: 'Solid governance and transparent processes.' },

  'testimonial.ricardo.name': { pt: 'Ricardo Souza', en: 'Ricardo Souza' },
  'testimonial.ricardo.role': { pt: 'Presidente, InvestGroup', en: 'President, InvestGroup' },
  'testimonial.ricardo.quote': { pt: 'Holding de referência no mercado brasileiro.', en: 'Reference holding company in the Brazilian market.' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}