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
  'hero.subtitle': { pt: 'Investimentos estratégicos e parcerias sólidas em múltiplos segmentos de atuação.', en: 'Strategic investments and solid partnerships across multiple business segments.' },
  'hero.cta': { pt: 'Entre em Contato', en: 'Get in Touch' },

  // Home sections
  'home.positioning.title': { pt: 'Uma Holding Focada em Resultados', en: 'A Results-Driven Holding' },
  'home.positioning.text': { pt: 'Atuamos como estrutura central de governança e estratégia, unindo empresas de diferentes segmentos sob uma visão comum de excelência, crescimento sustentável e geração de valor para todos os stakeholders.', en: 'We operate as a central governance and strategy structure, uniting companies from different segments under a common vision of excellence, sustainable growth, and value creation for all stakeholders.' },
  
  'home.highlights.segments': { pt: 'Segmentos de Atuação', en: 'Business Segments' },
  'home.highlights.segments.desc': { pt: 'Diversificação estratégica em setores de alto potencial', en: 'Strategic diversification in high-potential sectors' },
  'home.highlights.partners': { pt: 'Empresas Parceiras', en: 'Partner Companies' },
  'home.highlights.partners.desc': { pt: 'Portfólio selecionado de empresas líderes', en: 'Curated portfolio of leading companies' },
  'home.highlights.vision': { pt: 'Visão Estratégica', en: 'Strategic Vision' },
  'home.highlights.vision.desc': { pt: 'Planejamento de longo prazo e governança sólida', en: 'Long-term planning and solid governance' },

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