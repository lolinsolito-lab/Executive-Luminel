import React from 'react';
import { ArrowLeft, Shield, Lock, FileText, Cookie, AlertTriangle } from 'lucide-react';

interface LegalPageProps {
    type: 'terms' | 'privacy' | 'cookies' | 'disclaimer';
    onBack: () => void;
}

const LEGAL_CONTENT = {
    terms: {
        icon: FileText,
        title: 'Termini di Servizio',
        lastUpdated: '31 Gennaio 2026',
        sections: [
            {
                title: '1. Natura del Servizio',
                content: `LUMINEL EXECUTIVE è una piattaforma di coaching e simulazione per lo sviluppo professionale. I contenuti e le strategie fornite hanno esclusivamente scopo educativo e di intrattenimento.

Il servizio utilizza intelligenza artificiale per fornire suggerimenti strategici basati su principi di leadership, negoziazione e sviluppo di carriera derivati da letteratura consolidata.

Non forniamo consulenza legale, finanziaria, lavoristica o psicologica. I nostri suggerimenti non sostituiscono il parere di professionisti qualificati.`
            },
            {
                title: '2. Abbonamenti e Pagamenti',
                content: `I pagamenti vengono elaborati tramite Stripe, inc. in modo sicuro e conforme agli standard PCI-DSS.

**Tier Disponibili:**
- THE GRINDER (Gratuito)
- THE STRATEGIST (€49/mese)
- THE EXECUTIVE (€299/mese)

La fatturazione è mensile e si rinnova automaticamente. Puoi cancellare in qualsiasi momento dalla dashboard. La cancellazione ha effetto alla fine del periodo di fatturazione corrente.`
            },
            {
                title: '3. Garanzia di Rimborso',
                content: `Offriamo una garanzia di rimborso di 30 giorni per i nuovi abbonati ai tier a pagamento. Se non sei soddisfatto del servizio, contattaci entro 30 giorni dalla prima sottoscrizione per ottenere un rimborso completo.

I rimborsi dopo i 30 giorni sono valutati caso per caso.`
            },
            {
                title: '4. Limitazioni di Responsabilità',
                content: `L'utente riconosce che:

- I risultati di carriera dipendono da molteplici fattori esterni al nostro controllo
- Non garantiamo promozioni, aumenti salariali o altri risultati specifici
- L'applicazione delle strategie è a completa discrezione e responsabilità dell'utente
- Non siamo responsabili per decisioni prese in base ai suggerimenti del servizio

LUMINEL EXECUTIVE è fornito "così com'è" senza garanzie di alcun tipo.`
            },
            {
                title: '5. Utilizzo Accettabile',
                content: `L'utente si impegna a:

- Non utilizzare il servizio per scopi illegali o non etici
- Non condividere le credenziali di accesso
- Non tentare di aggirare le limitazioni del proprio tier
- Non estrarre o redistribuire i contenuti premium

La violazione di questi termini può comportare la sospensione o terminazione dell'account.`
            },
            {
                title: '6. Proprietà Intellettuale',
                content: `Tutti i contenuti, inclusi testi, grafica, loghi, icone, immagini, clip audio, download digitali e software sono di proprietà di LUMINEL EXECUTIVE o dei suoi licenzianti.

The Neural Codex™, The Vault™ e Strategic Clearance Map™ sono marchi di LUMINEL EXECUTIVE.`
            }
        ]
    },
    privacy: {
        icon: Lock,
        title: 'Privacy Policy',
        lastUpdated: '31 Gennaio 2026',
        sections: [
            {
                title: '1. Titolare del Trattamento',
                content: `Il titolare del trattamento dei dati personali è LUMINEL EXECUTIVE.

Per qualsiasi domanda relativa alla privacy, contattaci a: privacy@luminel.io`
            },
            {
                title: '2. Dati Raccolti',
                content: `Raccogliamo i seguenti dati:

**Dati forniti dall'utente:**
- Email e nome (registrazione)
- Informazioni di pagamento (gestite da Stripe)
- Contenuto delle conversazioni con l'AI Coach

**Dati raccolti automaticamente:**
- Indirizzo IP e dati del dispositivo
- Dati di utilizzo e analytics
- Cookie tecnici e di preferenza`
            },
            {
                title: '3. Base Legale e Finalità',
                content: `Trattiamo i tuoi dati per:

- **Esecuzione del contratto**: Fornitura del servizio, gestione account, fatturazione
- **Consenso**: Comunicazioni marketing (solo se autorizzato)
- **Legittimo interesse**: Miglioramento del servizio, prevenzione frodi, analytics

Puoi ritirare il consenso in qualsiasi momento.`
            },
            {
                title: '4. Condivisione dei Dati',
                content: `Condividiamo i dati solo con:

- **Stripe** (pagamenti) - USA, Standard Contractual Clauses
- **Supabase** (database) - Server EU (Frankfurt)
- **Google AI** (Gemini) - Per le risposte AI, dati anonimizzati
- **Vercel** (hosting) - Server globali con edge computing

Non vendiamo mai i tuoi dati a terze parti.`
            },
            {
                title: '5. Conservazione dei Dati',
                content: `Conserviamo i dati per:

- Dati account: Durata del servizio + 3 anni
- Conversazioni AI: 12 mesi (poi anonimizzate)
- Dati di fatturazione: 10 anni (obbligo fiscale Italia)
- Log di sicurezza: 6 mesi`
            },
            {
                title: '6. I Tuoi Diritti (GDPR)',
                content: `Hai diritto a:

- **Accesso**: Richiedere copia dei tuoi dati
- **Rettifica**: Correggere dati inesatti
- **Cancellazione**: Richiedere eliminazione ("diritto all'oblio")
- **Portabilità**: Ricevere i dati in formato strutturato
- **Opposizione**: Opporti a determinati trattamenti
- **Limitazione**: Limitare il trattamento in specifici casi

Per esercitare questi diritti, contatta: privacy@luminel.io

Hai diritto a presentare reclamo al Garante per la Protezione dei Dati Personali.`
            }
        ]
    },
    cookies: {
        icon: Cookie,
        title: 'Cookie Policy',
        lastUpdated: '31 Gennaio 2026',
        sections: [
            {
                title: 'Cosa sono i Cookie',
                content: `I cookie sono piccoli file di testo che vengono memorizzati sul tuo dispositivo quando visiti un sito web. Ci aiutano a far funzionare il sito e a migliorare la tua esperienza.`
            },
            {
                title: 'Cookie che Utilizziamo',
                content: `**Cookie Tecnici (Essenziali)**
- Autenticazione e sessione
- Preferenze di visualizzazione
- Sicurezza CSRF

**Cookie Analitici**
- Vercel Analytics (anonimizzati)
- Tempo di sessione e pagine visitate

**Cookie di Terze Parti**
- Stripe (pagamenti)
- Supabase (autenticazione)

Non utilizziamo cookie pubblicitari o di profilazione.`
            },
            {
                title: 'Gestione dei Cookie',
                content: `Puoi gestire le preferenze cookie dal tuo browser. La disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del servizio.

Per maggiori informazioni, visita www.aboutcookies.org`
            }
        ]
    },
    disclaimer: {
        icon: AlertTriangle,
        title: 'Disclaimer',
        lastUpdated: '31 Gennaio 2026',
        sections: [
            {
                title: 'Natura Educativa',
                content: `LUMINEL EXECUTIVE è una piattaforma di coaching e simulazione strategica con finalità educative e di intrattenimento.

I contenuti sono ispirati a principi di leadership, negoziazione e psicologia comportamentale derivati da opere pubblicate come "Le 48 Leggi del Potere", "Atomic Habits" e altre fonti citate.`
            },
            {
                title: 'Non È Consulenza Professionale',
                content: `**Questo servizio NON fornisce:**
- Consulenza legale
- Consulenza finanziaria o fiscale
- Consulenza lavoristica o sindacale
- Supporto psicologico o terapeutico

Per questioni specifiche, rivolgiti sempre a professionisti qualificati e abilitati.`
            },
            {
                title: 'Nessuna Garanzia di Risultati',
                content: `Non garantiamo alcun risultato specifico inclusi ma non limitati a:
- Promozioni
- Aumenti salariali
- Miglioramenti nelle relazioni professionali
- Raggiungimento di obiettivi di carriera

I risultati dipendono da numerosi fattori esterni e dalle azioni individuali dell'utente.`
            },
            {
                title: 'Responsabilità dell\'Utente',
                content: `L'utente è l'unico responsabile di:
- Come applica le strategie suggerite
- Le conseguenze delle proprie azioni nel contesto lavorativo
- La valutazione dell'appropriatezza dei suggerimenti per la propria situazione

Consigliamo sempre di valutare attentamente ogni strategia prima di applicarla nel proprio contesto professionale.`
            },
            {
                title: 'Contenuti di Terzi',
                content: `Il Neural Codex include citazioni e principi derivati da opere di autori terzi. Tali contenuti sono utilizzati a scopo educativo e con attribuzione. I riferimenti a libri e autori non implicano endorsement o affiliazione.`
            }
        ]
    }
};

export const LegalPage: React.FC<LegalPageProps> = ({ type, onBack }) => {
    const content = LEGAL_CONTENT[type];
    const Icon = content.icon;

    return (
        <div className="min-h-screen bg-corp-onyx text-corp-platinum">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-corp-onyx/95 backdrop-blur-xl border-b border-corp-border">
                <div className="max-w-3xl mx-auto px-6 py-4 flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-white/5 rounded-full text-corp-silver hover:text-corp-gold transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <Icon size={20} className="text-corp-gold" />
                        <h1 className="font-display font-bold text-lg">{content.title}</h1>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="text-sm text-corp-silver mb-8">
                    Ultimo aggiornamento: {content.lastUpdated}
                </div>

                <div className="space-y-10">
                    {content.sections.map((section, i) => (
                        <section key={i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                            <h2 className="text-xl font-display font-bold text-corp-platinum mb-4 border-l-2 border-corp-gold pl-4">
                                {section.title}
                            </h2>
                            <div className="text-corp-silver leading-relaxed whitespace-pre-line pl-4">
                                {section.content}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-corp-border text-center">
                    <p className="text-corp-silver text-sm mb-4">
                        Per domande su questo documento, contattaci a:
                    </p>
                    <a href="mailto:legal@luminel.io" className="text-corp-gold hover:underline">
                        legal@luminel.io
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LegalPage;
