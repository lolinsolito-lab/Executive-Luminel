import { VaultItem } from '../types';

export const VAULT_DEFAULTS: VaultItem[] = [
    {
        id: 'v1',
        title: 'Il "Kill Switch" Salariale',
        description: 'Template email per forzare un aumento del 30% sfruttando una controfferta fantasma. Da usare con estrema cautela.',
        content_type: 'pdf',
        content_body: 'https://example.com/kill-switch-template', // Placeholder
        is_preview: true,
        is_active: true,
        required_tier: 'STRATEGIST',
        created_at: new Date().toISOString(),
        ai_tags: ['Salary', 'Negotiation', 'Risk']
    },
    {
        id: 'v2',
        title: 'Protocollo "Ghost Exit"',
        description: 'Guida passo-passo per lasciare un\'azienda tossica senza bruciare ponti, mantenendo la reputazione intatta e rubando i contatti chiave.',
        content_type: 'video_link', // Changed from 'video' to 'video_link' based on inferred type usage
        content_body: 'https://youtu.be/placeholder',
        is_preview: true,
        is_active: true,
        required_tier: 'EXECUTIVE',
        created_at: new Date().toISOString(),
        ai_tags: ['Exit Strategy', 'Reputation', 'Network']
    },
    {
        id: 'v3',
        title: 'Lo Shadow P&L',
        description: 'Foglio di calcolo per tracciare il VERO valore che porti all\'azienda (vs quello che ti riconoscono). Armati di numeri per la performance review.',
        content_type: 'text', // Changed from 'spreadsheet' to available type, maybe 'text' or 'pdf'
        content_body: '# SHADOW P&L TEMPLATE...',
        is_preview: true,
        is_active: true,
        required_tier: 'STRATEGIST',
        created_at: new Date().toISOString(),
        ai_tags: ['Finance', 'Leverage', 'Analytics']
    },
    {
        id: 'v4',
        title: 'Blacklist Database (Global)',
        description: 'Lista aggiornata delle società di recruiting "bruciate" e dei manager tossici segnalati dalla community Executive.',
        content_type: 'audio_link', // Changed from 'database'
        content_body: 'https://placeholder.audio',
        is_preview: true,
        is_active: true,
        required_tier: 'EXECUTIVE',
        created_at: new Date().toISOString(),
        ai_tags: ['Intel', 'Blacklist', 'Warning']
    }
];
