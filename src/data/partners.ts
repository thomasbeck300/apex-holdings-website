// Interface para os dados da empresa
export interface PartnerData {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description: {
    pt: string;
    en: string;
  };
  segment: {
    pt: string;
    en: string;
  };
  segmentId: string;
  fullDescription: {
    pt: string;
    en: string;
  };
  mapConnections: Array<{
    start: { lat: number; lng: number; label: string };
    end: { lat: number; lng: number; label: string };
  }>;
  regions: {
    pt: string[];
    en: string[];
  };
  gallery?: string[];
  externalLink?: string;
  isSubdomain?: boolean;
}

// Dados das empresas parceiras - DADOS REAIS
export const partnersData: Record<string, PartnerData> = {
  // ====== ESCRITÓRIOS DE PRESTAÇÃO DE SERVIÇOS ======
  'leao-gestao-empresarial': {
    id: 'leao-gestao-empresarial',
    slug: 'leao-gestao-empresarial',
    name: 'Leão Gestão Empresarial',
    logo: '/imgs/logotipos/6.webp',
    description: {
      pt: 'Escritório de gestão empresarial com soluções completas para todos os estados brasileiros.',
      en: 'Business management office with complete solutions for all Brazilian states.',
    },
    segment: { pt: 'Escritórios de Prestação de Serviços', en: 'Service Provision Offices' },
    segmentId: 'service-offices',
    fullDescription: {
      pt: 'A Leão Gestão Empresarial é uma empresa especializada em gestão empresarial, oferecendo consultoria estratégica, gestão de processos, planejamento financeiro e soluções personalizadas para empresas de diversos portes. Com presença nacional, atendemos clientes em todos os estados brasileiros, proporcionando eficiência operacional e crescimento sustentável através de metodologias comprovadas e equipe altamente qualificada.',
      en: 'Leão Gestão Empresarial is a company specialized in business management, offering strategic consulting, process management, financial planning and customized solutions for companies of various sizes. With a national presence, we serve clients in all Brazilian states, providing operational efficiency and sustainable growth through proven methodologies and a highly qualified team.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Região Sul', 'Região Sudeste', 'Região Centro-Oeste', 'Região Nordeste', 'Região Norte'],
      en: ['South Region', 'Southeast Region', 'Central-West Region', 'Northeast Region', 'North Region'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80',
    ],
    externalLink: 'https://www.gestaoleao.com.br/',
  },

  'lge-tec': {
    id: 'lge-tec',
    slug: 'lge-tec',
    name: 'LGE Tec',
    logo: '/imgs/logotipos/1.webp',
    description: {
      pt: 'Desenvolvimento de aplicativos inovadores com tecnologia de ponta para todo o Brasil.',
      en: 'Development of innovative applications with cutting-edge technology throughout Brazil.',
    },
    segment: { pt: 'Escritórios de Prestação de Serviços', en: 'Service Provision Offices' },
    segmentId: 'service-offices',
    fullDescription: {
      pt: 'A LGE Tec é uma empresa de tecnologia especializada na criação e desenvolvimento de aplicativos móveis e web de alta performance. Combinamos design intuitivo, arquitetura robusta e as mais recentes tecnologias para entregar soluções digitais que transformam negócios. Nossa equipe multidisciplinar atende clientes em todo território nacional, desenvolvendo desde aplicativos corporativos até plataformas de e-commerce e sistemas personalizados.',
      en: 'LGE Tec is a technology company specialized in creating and developing high-performance mobile and web applications. We combine intuitive design, robust architecture and the latest technologies to deliver digital solutions that transform businesses. Our multidisciplinary team serves clients throughout the national territory, developing everything from corporate applications to e-commerce platforms and custom systems.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Região Sul', 'Região Sudeste', 'Região Centro-Oeste', 'Região Nordeste', 'Região Norte'],
      en: ['South Region', 'Southeast Region', 'Central-West Region', 'Northeast Region', 'North Region'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80',
    ],
    isSubdomain: true,
  },

  'imap-marcas-patentes': {
    id: 'imap-marcas-patentes',
    slug: 'imap-marcas-patentes',
    name: 'IMAP Marcas e Patentes',
    logo: '/imgs/logotipos/4.webp',
    description: {
      pt: 'Registro e proteção de marcas e patentes em todo território nacional.',
      en: 'Trademark and patent registration and protection throughout the national territory.',
    },
    segment: { pt: 'Escritórios de Prestação de Serviços', en: 'Service Provision Offices' },
    segmentId: 'service-offices',
    fullDescription: {
      pt: 'IMAP Marcas e Patentes é especializada em propriedade intelectual, oferecendo serviços completos de registro, proteção e gestão de marcas e patentes. Com expertise técnica e jurídica, auxiliamos empresas e empreendedores a protegerem seus ativos intangíveis, realizando pesquisas de viabilidade, depósitos junto ao INPI, acompanhamento processual e estratégias de defesa. Atuamos em todos os estados brasileiros, garantindo segurança jurídica e proteção da identidade de sua marca.',
      en: 'IMAP Marcas e Patentes specializes in intellectual property, offering complete services for registration, protection and management of trademarks and patents. With technical and legal expertise, we help companies and entrepreneurs protect their intangible assets, conducting feasibility studies, filing with INPI, procedural monitoring and defense strategies. We operate in all Brazilian states, ensuring legal security and protection of your brand identity.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Região Sul', 'Região Sudeste', 'Região Centro-Oeste', 'Região Nordeste', 'Região Norte'],
      en: ['South Region', 'Southeast Region', 'Central-West Region', 'Northeast Region', 'North Region'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    ],
    isSubdomain: true,
  },

  'seven-marketing': {
    id: 'seven-marketing',
    slug: 'seven-marketing',
    name: 'Seven – Gestora de Marketing',
    logo: '/imgs/logotipos/8.webp',
    description: {
      pt: 'Gestão estratégica de marketing com resultados comprovados em todo o Brasil.',
      en: 'Strategic marketing management with proven results throughout Brazil.',
    },
    segment: { pt: 'Escritórios de Prestação de Serviços', en: 'Service Provision Offices' },
    segmentId: 'service-offices',
    fullDescription: {
      pt: 'A Seven é uma gestora de marketing especializada em estratégias digitais, branding e performance. Desenvolvemos campanhas integradas que conectam marcas ao seu público-alvo, utilizando dados e criatividade para gerar resultados mensuráveis. Nossa expertise inclui marketing digital, gestão de redes sociais, mídia paga, SEO, inbound marketing e consultoria estratégica. Atendemos clientes de diversos segmentos em todo território nacional, impulsionando crescimento e fortalecimento de marcas.',
      en: 'Seven is a marketing management company specialized in digital strategies, branding and performance. We develop integrated campaigns that connect brands to their target audience, using data and creativity to generate measurable results. Our expertise includes digital marketing, social media management, paid media, SEO, inbound marketing and strategic consulting. We serve clients from various segments throughout the national territory, driving growth and brand strengthening.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Região Sul', 'Região Sudeste', 'Região Centro-Oeste', 'Região Nordeste', 'Região Norte'],
      en: ['South Region', 'Southeast Region', 'Central-West Region', 'Northeast Region', 'North Region'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=800&q=80',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
      'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&q=80',
    ],
  },

  // ====== CONSTRUTORA E INCORPORADORA ======
  'mt-concept': {
    id: 'mt-concept',
    slug: 'mt-concept',
    name: 'MT Concept',
    logo: '/imgs/logotipos/10.webp',
    description: {
      pt: 'Construtora e incorporadora de alto padrão nos estados do Rio Grande do Sul e Santa Catarina.',
      en: 'High-standard construction and real estate developer in Rio Grande do Sul and Santa Catarina states.',
    },
    segment: { pt: 'Construtora e Incorporadora', en: 'Construction & Real Estate' },
    segmentId: 'construction',
    fullDescription: {
      pt: 'A MT Concept é uma construtora e incorporadora renomada por seus empreendimentos de alto padrão e design inovador. Atuamos no desenvolvimento de projetos residenciais e comerciais que unem arquitetura contemporânea, tecnologia sustentável e acabamento premium. Com forte presença nos estados do Rio Grande do Sul e Santa Catarina, entregamos empreendimentos que valorizam a qualidade de vida, localização privilegiada e excelência construtiva, consolidando-nos como referência no mercado imobiliário da região Sul.',
      en: 'MT Concept is a construction and real estate developer renowned for its high-standard developments and innovative design. We operate in the development of residential and commercial projects that combine contemporary architecture, sustainable technology and premium finishes. With a strong presence in the states of Rio Grande do Sul and Santa Catarina, we deliver developments that value quality of life, privileged location and construction excellence, establishing ourselves as a reference in the real estate market in the South region.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Rio Grande do Sul', 'Santa Catarina', 'Porto Alegre', 'Florianópolis', 'Balneário Camboriú'],
      en: ['Rio Grande do Sul', 'Santa Catarina', 'Porto Alegre', 'Florianópolis', 'Balneário Camboriú'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80',
    ],
    externalLink: 'https://www.mtconcept.com.br/',
  },

  'tbpar-empreendimentos': {
    id: 'tbpar-empreendimentos',
    slug: 'tbpar-empreendimentos',
    name: 'TBPAR Empreendimentos',
    logo: '/imgs/logotipos/2.webp',
    description: {
      pt: 'Desenvolvimento imobiliário de excelência com foco em lançamentos e vendas estratégicas.',
      en: 'Excellence in real estate development focused on strategic launches and sales.',
    },
    segment: { pt: 'Construtora e Incorporadora', en: 'Construction & Real Estate' },
    segmentId: 'construction',
    fullDescription: {
      pt: 'TBPAR Empreendimentos atua no desenvolvimento de projetos imobiliários premium, focando em empreendimentos residenciais e comerciais de alto valor agregado. Nossa expertise abrange desde a concepção do projeto, análise de viabilidade, construção até a comercialização e entrega. Oferecemos lançamentos exclusivos, acompanhamento de vendas personalizado e gestão completa do ciclo imobiliário. Com padrão construtivo elevado e design contemporâneo, criamos espaços que unem funcionalidade, estética e valorização patrimonial.',
      en: 'TBPAR Empreendimentos operates in the development of premium real estate projects, focusing on high value-added residential and commercial developments. Our expertise ranges from project conception, feasibility analysis, construction to commercialization and delivery. We offer exclusive launches, personalized sales follow-up and complete management of the real estate cycle. With high construction standards and contemporary design, we create spaces that combine functionality, aesthetics and asset appreciation.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Santa Catarina', 'Rio Grande do Sul', 'Balneário Camboriú', 'Florianópolis'],
      en: ['Santa Catarina', 'Rio Grande do Sul', 'Balneário Camboriú', 'Florianópolis'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    isSubdomain: true,
  },

  // ====== LOGÍSTICA TERRESTRE ======
  'conecta-cargas': {
    id: 'conecta-cargas',
    slug: 'conecta-cargas',
    name: 'Conecta Cargas e Conexões',
    logo: '/imgs/logotipos/7.webp',
    description: {
      pt: 'Logística terrestre internacional com expansão planejada para América e Eurásia.',
      en: 'International land logistics with planned expansion to Americas and Eurasia.',
    },
    segment: { pt: 'Logística Terrestre', en: 'Land Logistics' },
    segmentId: 'logistics',
    fullDescription: {
      pt: 'Conecta Cargas e Conexões é uma empresa de logística terrestre em expansão internacional estratégica. Com cronograma robusto de crescimento, iniciamos operações no Brasil (março/2026), expandindo para Paraguai, Argentina e Chile (setembro/2026), Estados Unidos (fevereiro/2027) e Eurásia (dezembro/2027). Oferecemos soluções completas de transporte rodoviário, gestão de frota, rastreamento em tempo real e consultoria logística. Nossa infraestrutura moderna e equipe especializada garantem entregas eficientes, seguras e dentro do prazo em múltiplos continentes.',
      en: 'Conecta Cargas e Conexões is a land logistics company in strategic international expansion. With a robust growth schedule, we begin operations in Brazil (March/2026), expanding to Paraguay, Argentina and Chile (September/2026), United States (February/2027) and Eurasia (December/2027). We offer complete road transport solutions, fleet management, real-time tracking and logistics consulting. Our modern infrastructure and specialized team ensure efficient, safe and on-time deliveries across multiple continents.',
    },
    mapConnections: [
      { start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, end: { lat: -25.2637, lng: -57.5759, label: 'Assunção' } },
      { start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, end: { lat: -34.6037, lng: -58.3816, label: 'Buenos Aires' } },
      { start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, end: { lat: -33.4489, lng: -70.6693, label: 'Santiago' } },
      { start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' }, end: { lat: 40.7128, lng: -74.0060, label: 'New York' } },
      { start: { lat: 40.7128, lng: -74.0060, label: 'New York' }, end: { lat: 55.7558, lng: 37.6173, label: 'Moscow' } },
    ],
    regions: {
      pt: ['Brasil', 'Paraguai', 'Argentina', 'Chile', 'EUA', 'Eurásia'],
      en: ['Brazil', 'Paraguay', 'Argentina', 'Chile', 'USA', 'Eurasia'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
      'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80',
      'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?w=800&q=80',
    ],
  },

  // ====== COMODITIES / AGRONEGÓCIO ======
  'tbpar-agrobusiness': {
    id: 'tbpar-agrobusiness',
    slug: 'tbpar-agrobusiness',
    name: 'TB PAR Agrobusiness',
    logo: '/imgs/logotipos/9.png',
    description: {
      pt: 'Comercialização e trading de commodities agrícolas com atuação internacional.',
      en: 'Agricultural commodity trading and commercialization with international operations.',
    },
    segment: { pt: 'Comodities', en: 'Commodities' },
    segmentId: 'agribusiness',
    fullDescription: {
      pt: 'A TB PAR Agrobusiness é uma empresa especializada na comercialização e trading de commodities agrícolas, operando nos principais mercados nacionais e internacionais. Atuamos na compra, venda e exportação de grãos, cereais, oleaginosas e insumos agropecuários, conectando produtores brasileiros aos mercados globais com eficiência logística e inteligência de mercado. Nossa equipe combina expertise em trading, gestão de risco e consultoria agronômica para maximizar o valor da cadeia produtiva e garantir segurança nas operações. Com presença estratégica no agronegócio brasileiro, contribuímos para o desenvolvimento sustentável do setor e a geração de divisas para o país.',
      en: 'TB PAR Agrobusiness is a company specialized in the commercialization and trading of agricultural commodities, operating in the main national and international markets. We operate in the purchase, sale and export of grains, cereals, oilseeds and agricultural inputs, connecting Brazilian producers to global markets with logistical efficiency and market intelligence. Our team combines expertise in trading, risk management and agronomic consulting to maximize the value of the production chain and ensure operational safety. With a strategic presence in Brazilian agribusiness, we contribute to the sustainable development of the sector and the generation of foreign exchange for the country.',
    },
    mapConnections: [
      { start: { lat: -15.7801, lng: -47.9292, label: 'Brasília' }, end: { lat: -34.6037, lng: -58.3816, label: 'Buenos Aires' } },
      { start: { lat: -15.7801, lng: -47.9292, label: 'Brasília' }, end: { lat: 40.7128, lng: -74.0060, label: 'New York' } },
      { start: { lat: -15.7801, lng: -47.9292, label: 'Brasília' }, end: { lat: 39.9042, lng: 116.4074, label: 'Beijing' } },
      { start: { lat: -15.7801, lng: -47.9292, label: 'Brasília' }, end: { lat: 51.5074, lng: -0.1278, label: 'London' } },
    ],
    regions: {
      pt: ['Brasil', 'América do Sul', 'América do Norte', 'Europa', 'Ásia'],
      en: ['Brazil', 'South America', 'North America', 'Europe', 'Asia'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
      'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80',
    ],
  },

  // ====== TERRAPLANAGEM E OBRAS PESADAS ======
  'agroplantio': {
    id: 'agroplantio',
    slug: 'agroplantio',
    name: 'Agroplantio',
    logo: '/imgs/logotipos/11.webp',
    description: {
      pt: 'Terraplanagem, obras pesadas e soluções agrícolas especializadas no Sul do Brasil.',
      en: 'Earthmoving, heavy construction and specialized agricultural solutions in Southern Brazil.',
    },
    segment: { pt: 'Terraplanagem e Obras Pesadas', en: 'Earthmoving & Heavy Construction' },
    segmentId: 'earthmoving',
    fullDescription: {
      pt: 'A Agroplantio é uma empresa especializada em terraplanagem, obras pesadas e soluções agrícolas integradas. Atuamos em grandes projetos de movimentação de terra, preparação de solo, implantação de infraestrutura rural, licitações públicas e privadas, além de plantação e replantio de eucalipto. Com frota própria de maquinário pesado e equipe técnica experiente, operamos principalmente nos estados do Rio Grande do Sul e Santa Catarina, oferecendo serviços de alta qualidade para empreendimentos rurais, industriais e de infraestrutura.',
      en: 'Agroplantio is a company specialized in earthmoving, heavy construction and integrated agricultural solutions. We operate in large earthmoving projects, soil preparation, rural infrastructure implementation, public and private bidding, as well as eucalyptus plantation and replanting. With our own fleet of heavy machinery and experienced technical team, we operate mainly in the states of Rio Grande do Sul and Santa Catarina, offering high-quality services for rural, industrial and infrastructure projects.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Rio Grande do Sul', 'Santa Catarina', 'Porto Alegre', 'Florianópolis'],
      en: ['Rio Grande do Sul', 'Santa Catarina', 'Porto Alegre', 'Florianópolis'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80',
    ],
    externalLink: 'https://www.agroplantio.com/agroplantio',
  },

  // ====== FINANCEIRA / ESC ======
  'bc-capital': {
    id: 'bc-capital',
    slug: 'bc-capital',
    name: 'BC Capital',
    logo: '/imgs/logotipos/5.webp',
    description: {
      pt: 'Empresa Simples de Crédito com soluções financeiras completas em Santa Catarina.',
      en: 'Simple Credit Company with complete financial solutions in Santa Catarina.',
    },
    segment: { pt: 'Financeira / ESC', en: 'Financial / Simple Credit' },
    segmentId: 'financial',
    fullDescription: {
      pt: 'BC Capital é uma Empresa Simples de Crédito (ESC) especializada em soluções financeiras personalizadas. Oferecemos empréstimos consignados para CLT, empréstimos com garantia para pessoas jurídicas, gestão e negociação de ativos federais no valor aproximado de R$ 4 bilhões, além de compra e venda de precatórios federais. Com sede em Santa Catarina, combinamos expertise financeira, agilidade processual e taxas competitivas para atender empresas e indivíduos que buscam crédito seguro e consultoria financeira estratégica.',
      en: 'BC Capital is a Simple Credit Company (ESC) specialized in personalized financial solutions. We offer payroll loans for employees, secured loans for legal entities, management and negotiation of federal assets worth approximately R$ 4 billion, as well as buying and selling federal precatories. Based in Santa Catarina, we combine financial expertise, procedural agility and competitive rates to serve companies and individuals seeking secure credit and strategic financial consulting.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Santa Catarina', 'Balneário Camboriú', 'Florianópolis', 'Brasília (Operações)'],
      en: ['Santa Catarina', 'Balneário Camboriú', 'Florianópolis', 'Brasília (Operations)'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80',
      'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&q=80',
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80',
    ],
    isSubdomain: true,
  },

  // ====== FUSÕES E AQUISIÇÕES ======
  'tbpar-participacoes': {
    id: 'tbpar-participacoes',
    slug: 'tbpar-participacoes',
    name: 'TBPAR Participações',
    logo: '/imgs/logotipos/3.webp',
    description: {
      pt: 'Fusões e aquisições estratégicas em todo território nacional.',
      en: 'Strategic mergers and acquisitions throughout the national territory.',
    },
    segment: { pt: 'Fusões e Aquisições', en: 'Mergers & Acquisitions' },
    segmentId: 'ma',
    fullDescription: {
      pt: 'TBPAR Participações é especializada em operações de fusões e aquisições (M&A) no mercado brasileiro. Atuamos na identificação, avaliação, negociação e estruturação de transações estratégicas para empresas que buscam crescimento inorgânico, consolidação de mercado ou desinvestimento. Com presença nacional e profundo conhecimento setorial, oferecemos assessoria completa em due diligence, valuation, modelagem financeira e integração pós-fusão. Nossa expertise conecta compradores e vendedores, gerando valor e oportunidades de negócio em todos os estados brasileiros.',
      en: 'TBPAR Participações specializes in mergers and acquisitions (M&A) operations in the Brazilian market. We operate in the identification, evaluation, negotiation and structuring of strategic transactions for companies seeking inorganic growth, market consolidation or divestment. With national presence and deep sectoral knowledge, we offer complete advisory in due diligence, valuation, financial modeling and post-merger integration. Our expertise connects buyers and sellers, generating value and business opportunities in all Brazilian states.',
    },
    mapConnections: [
      { start: { lat: -28.7, lng: -50.0, label: 'Brasil' }, end: { lat: -28.7, lng: -50.0, label: 'Brasil' } },
    ],
    regions: {
      pt: ['Região Sul', 'Região Sudeste', 'Região Centro-Oeste', 'Região Nordeste', 'Região Norte'],
      en: ['South Region', 'Southeast Region', 'Central-West Region', 'Northeast Region', 'North Region'],
    },
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
    ],
  },
};

// Lista simplificada para a página de listagem
export const partnersList = Object.values(partnersData).map(partner => ({
  slug: partner.slug,
  name: partner.name,
  description: partner.description,
  segment: partner.segment,
  logo: partner.logo,
}));

// Dados dos segmentos
export interface SegmentData {
  id: string;
  name: {
    pt: string;
    en: string;
  };
  description: {
    pt: string;
    en: string;
  };
  partners: string[]; // array de partner IDs
}

export const segmentsData: Record<string, SegmentData> = {
  'service-offices': {
    id: 'service-offices',
    name: {
      pt: 'Escritórios de Prestação de Serviços',
      en: 'Service Provision Offices',
    },
    description: {
      pt: 'Soluções empresariais completas incluindo gestão, tecnologia, propriedade intelectual e marketing.',
      en: 'Complete business solutions including management, technology, intellectual property and marketing.',
    },
    partners: ['leao-gestao-empresarial', 'lge-tec', 'imap-marcas-patentes', 'seven-marketing'],
  },
  'construction': {
    id: 'construction',
    name: {
      pt: 'Construtora e Incorporadora',
      en: 'Construction & Real Estate',
    },
    description: {
      pt: 'Desenvolvimento imobiliário de alto padrão com foco em empreendimentos residenciais e comerciais.',
      en: 'High-standard real estate development focused on residential and commercial projects.',
    },
    partners: ['mt-concept', 'tbpar-empreendimentos'],
  },
  'logistics': {
    id: 'logistics',
    name: {
      pt: 'Logística Terrestre',
      en: 'Land Logistics',
    },
    description: {
      pt: 'Transporte e logística internacional com expansão estratégica global.',
      en: 'International transport and logistics with strategic global expansion.',
    },
    partners: ['conecta-cargas'],
  },
  'agribusiness': {
    id: 'agribusiness',
    name: {
      pt: 'Comodities',
      en: 'Commodities',
    },
    description: {
      pt: 'Comercialização e trading de commodities agrícolas com presença nos mercados globais.',
      en: 'Agricultural commodity trading and commercialization with presence in global markets.',
    },
    partners: ['tbpar-agrobusiness'],
  },
  'earthmoving': {
    id: 'earthmoving',
    name: {
      pt: 'Terraplanagem e Obras Pesadas',
      en: 'Earthmoving & Heavy Construction',
    },
    description: {
      pt: 'Movimentação de terra, infraestrutura rural e soluções agrícolas especializadas.',
      en: 'Earthmoving, rural infrastructure and specialized agricultural solutions.',
    },
    partners: ['agroplantio'],
  },
  'financial': {
    id: 'financial',
    name: {
      pt: 'Financeira / ESC',
      en: 'Financial / Simple Credit',
    },
    description: {
      pt: 'Crédito empresarial, gestão de ativos e soluções financeiras personalizadas.',
      en: 'Business credit, asset management and personalized financial solutions.',
    },
    partners: ['bc-capital'],
  },
  'ma': {
    id: 'ma',
    name: {
      pt: 'Fusões e Aquisições',
      en: 'Mergers & Acquisitions',
    },
    description: {
      pt: 'Assessoria estratégica em operações de M&A e reestruturação empresarial.',
      en: 'Strategic advisory in M&A operations and corporate restructuring.',
    },
    partners: ['tbpar-participacoes'],
  },
};
