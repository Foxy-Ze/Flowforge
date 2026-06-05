// Ensure your .env file has this exact variable:
// VITE_GOOGLE_SHEETS_WEBHOOK_URL="your-webhook-url-here"
const WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL;

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface SubmitResponse {
  success: boolean;
  error?: string;
}

export const submitLead = async (leadData: LeadData): Promise<SubmitResponse> => {
  if (!WEBHOOK_URL) {
    console.error("Forge Error: VITE_GOOGLE_SHEETS_WEBHOOK_URL is missing from environment variables.");
    return { success: false, error: "System configuration error. Please try again later." };
  }

  try {
    // We use no-cors to bypass strict browser blocks when hitting Google Apps Script / external webhooks.
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    // With 'no-cors', the response is opaque, meaning we cannot read response.ok or response.status.
    // If the fetch executed without throwing a network error, the payload was successfully fired into the void.
    return { success: true };
    
  } catch (error: any) {
    console.error('Lead Service Error:', error);
    return { 
      success: false, 
      error: error.message || 'The connection to the forge timed out.' 
    };
  }
};