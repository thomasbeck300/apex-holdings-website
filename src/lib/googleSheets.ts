/**
 * Função para enviar dados para Google Sheets via Google Apps Script Web App
 * 
 * Para configurar:
 * 1. Crie um Google Apps Script com o código fornecido abaixo
 * 2. Publique como Web App
 * 3. Configure a URL no arquivo .env ou diretamente aqui
 * 
 * Código do Google Apps Script:
 * 
 * function doPost(e) {
 *   const sheet = SpreadsheetApp.openById('SEU_SPREADSHEET_ID').getActiveSheet();
 *   const data = JSON.parse(e.postData.contents);
 *   
 *   // Adiciona timestamp
 *   data.timestamp = new Date().toISOString();
 *   
 *   // Converte objeto em array na ordem das colunas
 *   const row = [
 *     data.timestamp,
 *     data.formType || '',
 *     ...Object.values(data.fields)
 *   ];
 *   
 *   sheet.appendRow(row);
 *   return ContentService.createTextOutput(JSON.stringify({success: true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 */

// URL do Google Apps Script Web App
// Substitua pela URL do seu script publicado
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || '';

export interface FormSubmissionData {
  formType: 'acquisition' | 'trademark';
  fields: Record<string, string>;
}

/**
 * Envia dados do formulário para Google Sheets
 */
export async function submitToGoogleSheets(data: FormSubmissionData): Promise<{ success: boolean; error?: string }> {
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL não configurada. Configure VITE_GOOGLE_SCRIPT_URL no .env');
    return { success: false, error: 'Google Script URL não configurada' };
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script não retorna CORS headers adequados
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Com no-cors, não podemos verificar a resposta, mas assumimos sucesso
    // Se precisar de verificação real, use um proxy ou configure CORS no Google Apps Script
    return { success: true };
  } catch (error) {
    console.error('Erro ao enviar para Google Sheets:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
}

/**
 * Formata dados do formulário de Aquisição para envio
 */
export function formatAcquisitionData(formData: Record<string, string>): FormSubmissionData {
  return {
    formType: 'acquisition',
    fields: {
      razaoSocial: formData.razaoSocial || '',
      nomeFantasia: formData.nomeFantasia || '',
      cnpj: formData.cnpj || '',
      endereco: formData.endereco || '',
      socios: formData.socios || '',
      regimeTributacao: formData.regimeTributacao || '',
      faturamentoMedio: formData.faturamentoMedio || '',
      estoqueMedio: formData.estoqueMedio || '',
      imobilizado: formData.imobilizado || '',
      contasPagar: formData.contasPagar || '',
      passivosOcultos: formData.passivosOcultos || '',
      valorVendaSugerido: formData.valorVendaSugerido || '',
      aluguel: formData.aluguel || '',
      motivoVenda: formData.motivoVenda || '',
    },
  };
}

/**
 * Formata dados do formulário de Registro de Marca para envio
 */
export function formatTrademarkData(formData: Record<string, string>): FormSubmissionData {
  return {
    formType: 'trademark',
    fields: {
      marca: formData.marca || '',
      descricao: formData.descricao || '',
      classe: formData.classe || '',
      nome: formData.nome || '',
      cpfCnpj: formData.cpfCnpj || '',
      email: formData.email || '',
      telefone: formData.telefone || '',
      observacoes: formData.observacoes || '',
    },
  };
}
