# Guia de Atualização - Empresas Parceiras

## Como adicionar/atualizar empresas

Todas as informações das empresas parceiras estão centralizadas no arquivo `partners.ts`.

### Estrutura de cada empresa:

```typescript
{
  id: 'nome-da-empresa',           // ID único
  slug: 'nome-da-empresa',          // URL amigável
  name: 'Nome da Empresa',          // Nome exibido
  logo: '/imgs/logo.png',           // Opcional: caminho do logo
  description: {
    pt: 'Descrição curta em português',
    en: 'Short description in English',
  },
  segment: {
    pt: 'Segmento em português',
    en: 'Segment in English',
  },
  fullDescription: {
    pt: 'Descrição completa e detalhada da empresa em português',
    en: 'Full and detailed description of the company in English',
  },
  mapConnections: [
    {
      start: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' },
      end: { lat: 40.7128, lng: -74.0060, label: 'New York' },
    },
    // Adicione mais conexões conforme necessário
  ],
  regions: {
    pt: ['Brasil', 'Estados Unidos', 'Europa'],
    en: ['Brazil', 'United States', 'Europe'],
  },
  gallery: [                                 // Opcional: array de URLs de imagens
    'https://exemplo.com/imagem1.jpg',
    'https://exemplo.com/imagem2.jpg',
    'https://exemplo.com/imagem3.jpg',
    'https://exemplo.com/imagem4.jpg',
  ],
  externalLink: 'https://siteempresa.com',  // Opcional
}
```

### Coordenadas principais (para o mapa):

#### Brasil
- São Paulo: `{ lat: -23.5505, lng: -46.6333, label: 'São Paulo' }`
- Balneário Camboriú: `{ lat: -26.9925, lng: -48.6347, label: 'Balneário Camboriú' }`
- Florianópolis: `{ lat: -27.5954, lng: -48.5480, label: 'Florianópolis' }`
- Curitiba: `{ lat: -25.4284, lng: -49.2733, label: 'Curitiba' }`
- Maceió: `{ lat: -9.6658, lng: -35.7353, label: 'Maceió' }`

#### Internacional
- New York: `{ lat: 40.7128, lng: -74.0060, label: 'New York' }`
- London: `{ lat: 51.5074, lng: -0.1278, label: 'London' }`
- Dubai: `{ lat: 25.2048, lng: 55.2708, label: 'Dubai' }`
- Singapore: `{ lat: 1.3521, lng: 103.8198, label: 'Singapore' }`
- Tokyo: `{ lat: 35.6762, lng: 139.6503, label: 'Tokyo' }`

### Exemplo de adição:

```typescript
'nova-empresa': {
  id: 'nova-empresa',
  slug: 'nova-empresa',
  name: 'Nova Empresa Ltda',
  description: {
    pt: 'Descrição breve da empresa',
    en: 'Brief company description',
  },
  segment: { pt: 'Tecnologia', en: 'Technology' },
  fullDescription: {
    pt: 'Texto longo sobre a empresa...',
    en: 'Long text about the company...',
  },
  mapConnections: [
    {
      start: { lat: -26.9925, lng: -48.6347, label: 'Balneário Camboriú' },
      end: { lat: -23.5505, lng: -46.6333, label: 'São Paulo' },
    },
  ],
  regions: {
    pt: ['Santa Catarina', 'São Paulo'],
    en: ['Santa Catarina', 'São Paulo'],
  },
  externalLink: 'https://novaempresa.com.br',
},
```

### Onde os dados são usados:

1. **Página de listagem** (`/partners`): Mostra os cards de todas as empresas
2. **Página individual** (`/partners/[slug]`): Mostra detalhes completos de cada empresa
   - Hero com nome e descrição completa
   - Mapa de presença global
   - Regiões de atuação
   - Galeria de imagens (se houver)
   - CTA para link externo (se houver)

### Após adicionar/modificar:

Não é necessário alterar mais nenhum arquivo! O sistema automaticamente:
- Exibirá o card na página de listagem
- Criará a rota individual para a empresa
- Renderizará o mapa com as conexões configuradas
