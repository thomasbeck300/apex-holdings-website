# Configuração do Google Sheets para Formulários

Este guia explica como configurar o Google Sheets para receber os dados dos formulários de Aquisição e Registro de Marca.

## Passo 1: Criar o Google Spreadsheet

1. Acesse [Google Sheets](https://sheets.google.com)
2. Crie uma nova planilha
3. Na primeira linha, adicione os cabeçalhos das colunas:

### Para Formulário de Aquisição:
```
Timestamp | Tipo | Razão Social | Nome Fantasia | CNPJ | Endereço | Sócios | Regime Tributação | Faturamento Médio | Estoque Médio | Imobilizado | Contas a Pagar | Passivos Ocultos | Valor Venda Sugerido | Aluguel | Motivo Venda
```

### Para Formulário de Registro de Marca:
```
Timestamp | Tipo | Marca | Descrição | Classe | Nome/Razão Social | CPF/CNPJ | Email | Telefone | Observações
```

**Nota:** Você pode criar duas planilhas separadas ou usar uma única planilha com ambas as abas.

## Passo 2: Criar o Google Apps Script

1. No Google Sheets, vá em **Extensões** > **Apps Script**
2. Cole o seguinte código:

```javascript
// Substitua 'SEU_SPREADSHEET_ID' pelo ID da sua planilha
// Você encontra o ID na URL: https://docs.google.com/spreadsheets/d/SEU_SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'SEU_SPREADSHEET_ID';

// Nome da aba (sheet) onde os dados serão salvos
const SHEET_NAME_ACQUISITION = 'Aquisição';
const SHEET_NAME_TRADEMARK = 'Registro de Marca';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // Determina qual aba usar baseado no tipo de formulário
    let sheet;
    if (data.formType === 'acquisition') {
      sheet = spreadsheet.getSheetByName(SHEET_NAME_ACQUISITION) || spreadsheet.insertSheet(SHEET_NAME_ACQUISITION);
      
      // Adiciona cabeçalhos se a planilha estiver vazia
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp',
          'Tipo',
          'Razão Social',
          'Nome Fantasia',
          'CNPJ',
          'Endereço',
          'Sócios',
          'Regime Tributação',
          'Faturamento Médio',
          'Estoque Médio',
          'Imobilizado',
          'Contas a Pagar',
          'Passivos Ocultos',
          'Valor Venda Sugerido',
          'Aluguel',
          'Motivo Venda'
        ]);
      }
      
      // Adiciona timestamp
      const row = [
        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        'Aquisição',
        data.fields.razaoSocial || '',
        data.fields.nomeFantasia || '',
        data.fields.cnpj || '',
        data.fields.endereco || '',
        data.fields.socios || '',
        data.fields.regimeTributacao || '',
        data.fields.faturamentoMedio || '',
        data.fields.estoqueMedio || '',
        data.fields.imobilizado || '',
        data.fields.contasPagar || '',
        data.fields.passivosOcultos || '',
        data.fields.valorVendaSugerido || '',
        data.fields.aluguel || '',
        data.fields.motivoVenda || ''
      ];
      
      sheet.appendRow(row);
      
    } else if (data.formType === 'trademark') {
      sheet = spreadsheet.getSheetByName(SHEET_NAME_TRADEMARK) || spreadsheet.insertSheet(SHEET_NAME_TRADEMARK);
      
      // Adiciona cabeçalhos se a planilha estiver vazia
      if (sheet.getLastRow() === 0) {
        sheet.appendRow([
          'Timestamp',
          'Tipo',
          'Marca',
          'Descrição',
          'Classe',
          'Nome/Razão Social',
          'CPF/CNPJ',
          'Email',
          'Telefone',
          'Observações'
        ]);
      }
      
      // Adiciona timestamp
      const row = [
        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        'Registro de Marca',
        data.fields.marca || '',
        data.fields.descricao || '',
        data.fields.classe || '',
        data.fields.nome || '',
        data.fields.cpfCnpj || '',
        data.fields.email || '',
        data.fields.telefone || '',
        data.fields.observacoes || ''
      ];
      
      sheet.appendRow(row);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Dados salvos com sucesso'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Função para testar (opcional)
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    message: 'Google Apps Script está funcionando!',
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}
```

3. Substitua `SEU_SPREADSHEET_ID` pelo ID da sua planilha (encontrado na URL)
4. Salve o script (Ctrl+S ou Cmd+S)
5. Dê um nome ao projeto (ex: "Formulários Website")

## Passo 3: Publicar como Web App

1. No editor do Apps Script, clique em **Implantar** > **Nova implantação**
2. Clique no ícone de engrenagem ⚙️ ao lado de "Tipo" e selecione **Aplicativo da Web**
3. Configure:
   - **Descrição:** "API para receber dados dos formulários"
   - **Executar como:** "Eu"
   - **Quem tem acesso:** "Qualquer pessoa"
4. Clique em **Implantar**
5. **Copie a URL da Web App** (algo como: `https://script.google.com/macros/s/...`)
6. Clique em **Autorizar acesso** e siga as instruções

## Passo 4: Configurar no Projeto

1. Crie um arquivo `.env` na raiz do projeto (se não existir)
2. Adicione a seguinte linha:

```env
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/SUA_URL_AQUI/exec
```

3. Substitua `SUA_URL_AQUI` pela URL copiada no passo anterior
4. Reinicie o servidor de desenvolvimento

## Testando

1. Preencha um dos formulários no site
2. Envie o formulário
3. Verifique se os dados aparecem na planilha do Google Sheets

## Troubleshooting

### Erro: "Google Script URL não configurada"
- Verifique se o arquivo `.env` existe e contém `VITE_GOOGLE_SCRIPT_URL`
- Reinicie o servidor de desenvolvimento após criar/modificar o `.env`

### Erro: "Erro ao enviar formulário"
- Verifique se a URL do script está correta
- Verifique se o script foi publicado corretamente
- Verifique se o acesso está configurado como "Qualquer pessoa"
- Abra o console do navegador (F12) para ver erros detalhados

### Dados não aparecem na planilha
- Verifique se o ID da planilha está correto no script
- Verifique se as abas existem ou se o script tem permissão para criá-las
- Verifique os logs do Apps Script em **Execuções**

## Segurança

⚠️ **Importante:** A URL do Google Apps Script será visível no código do cliente. Para maior segurança em produção:

1. Use um proxy/backend próprio que chame o Google Apps Script
2. Implemente rate limiting no Google Apps Script
3. Adicione validação de origem (referer) no script
4. Considere usar autenticação adicional

Para adicionar validação de origem no script:

```javascript
function doPost(e) {
  // Verificar origem (opcional, mas recomendado)
  const allowedOrigins = ['https://seudominio.com', 'http://localhost:5173'];
  const referer = e.parameter.referer || '';
  
  // ... resto do código
}
```
