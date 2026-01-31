import { GoogleGenAI, ChatSession } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';

let chatSession: ChatSession | null = null;

const getClient = (): GoogleGenAI | null => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  if (!apiKey) {
    // Silent fail or debug log only if dev
    if (import.meta.env.DEV) {
      console.warn("VITE_GOOGLE_API_KEY missing. Using Mock Mode.");
    }
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// V4.0 SANDBOX MOCK RESPONSES
const getMockResponse = (message: string): string => {
  const lowerMsg = message.toLowerCase();

  if (lowerMsg.includes("mail") || lowerMsg.includes("email") || lowerMsg.includes("scrivere")) {
    return `**SANDBOX SIMULATION COMPLETE.**
        
**INPUT ANALYSIS:**
*   **Tone:** Apologetic (Weak).
*   **Clarity:** 65%.

**PROBABILITY OF SUCCESS:**
🔴 **15%** (High risk of being ignored).

**THE KINGMAKER CORRECTION:**
Stai scrivendo come un Junior.
Ecco la versione corretta per il Tier C:

> "Ciao [Nome],
> 
> Ho analizzato i dati. I punti critici sono A e B.
> La mia raccomandazione è procedere con X per minimizzare i rischi.
> Attendo ok per procedere."

**IMPACT:**
[[PERFORMANCE: +15]] [[CAPITAL: +20]]`;
  }

  if (lowerMsg.includes("manager") || lowerMsg.includes("boss") || lowerMsg.includes("capo")) {
    return `**WAR ROOM TACTICS:**
        
Il tuo Manager è sotto pressione. Non vuole problemi, vuole soluzioni.

**SCENARIO:**
Se porti solo il problema, diventi una "Liability".

**STRATEGY:**
1.  Identifica il problema.
2.  Prepara 2 soluzioni.
3.  Chiedi solo l'approvazione finale.

**ACTION:**
"Ho notato X. Ho già preparato Y. Procedo?"

**IMPACT:**
[[CAPITAL: +45]]`;
  }

  if (lowerMsg.includes("promozione") || lowerMsg.includes("aumento") || lowerMsg.includes("soldi")) {
    return `**THE VAULT: SECURITY CLEARANCE GRANTED.**
*Retrieving 'Salary Negotiation Script v4.0' (Value: €299)...*

**WARNING:** Non usare argomentazioni personali ("Ho lavorato tanto").
Il mercato paga il VALORE, non lo SFORZO.

**THE SCRIPT:**
"Negli ultimi 6 mesi ho generato un risparmio di X sul progetto Y.
Il valore di mercato per questo output è Z.
Discutiamo l'adeguamento del compenso al prossimo ciclo per allinearlo al valore generato."

**LEVERAGE:**
Crea un'offerta concorrente simulata per aumentare l'urgenza.

**IMPACT:**
[[CAPITAL: +50]]`;
  }

  return `**WAR ROOM ANALYSIS (MOCK MODE):**
    
Ho analizzato la tua richiesta: "${message}".

*   **Observation:** Questo approccio è troppo operativo.
*   **Risk:** Rimanere bloccati nel Tier B (Specialist).
*   **Directve:** Sposta il focus su chi detiene il budget.

**SANDBOX PREDICTION:**
Probabilità di impatto politico: **Bassa (20%)**.
Devi alzare la posta.

[[CAPITAL: +5]]`;
};

export const initializeChat = async (): Promise<ChatSession | null> => {
  try {
    const ai = getClient();
    if (!ai) return null;

    const model = "gemini-3-flash-preview";

    chatSession = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (e) {
    console.warn("Failed to initialize Gemini API, switching to MOCK mode.", e);
    return null;
  }
};

export const sendMessageToCoach = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulazione tempo calcolo IA
    return getMockResponse(message);
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "SYSTEM ERROR: No response data received.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes("404") || error.message?.includes("not found") || error.message?.includes("fetch failed")) {
      return getMockResponse(message);
    }
    return "CRITICAL FAILURE: Connection to Corporate Grid lost. Please retry.";
  }
};