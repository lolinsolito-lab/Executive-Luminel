// THE NEURAL CODEX - Strategy Cards Library
// Wisdom from elite books transformed into actionable INTEL

export interface StrategyCard {
  id: string;
  source: 'power' | 'habits' | 'psychology' | 'ceo' | 'ikigai';
  sourceName: string;
  lawNumber?: number;
  title: string;
  subtitle: string;
  action: string;
  context: string[];  // When to apply
  impact: {
    performance?: number;
    capital?: number;
  };
  tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';
}

// 48 LAWS OF POWER - Political Strategy
const POWER_CARDS: StrategyCard[] = [
  {
    id: 'power-1',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 1,
    title: 'Non Oscurare Mai il Maestro',
    subtitle: 'Never Outshine the Master',
    action: 'In meeting, presenta la tua idea come sviluppo dell\'idea del Manager. "Come suggeriva Lei..."',
    context: ['meeting', 'presentazione', 'idea'],
    impact: { capital: 20 },
    tier: 'STRATEGIST'
  },
  {
    id: 'power-3',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 3,
    title: 'Nascondi le Tue Intenzioni',
    subtitle: 'Conceal Your Intentions',
    action: 'Non rivelare mai il tuo obiettivo finale. Parla di "esplorare opzioni" invece di "voglio quella promozione".',
    context: ['negoziazione', 'carriera', 'promozione'],
    impact: { capital: 25 },
    tier: 'STRATEGIST'
  },
  {
    id: 'power-4',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 4,
    title: 'Dì Sempre Meno del Necessario',
    subtitle: 'Always Say Less than Necessary',
    action: 'Oggi in call, parla solo quando interrogato. Osserva il potere del silenzio.',
    context: ['call', 'meeting', 'presentazione'],
    impact: { capital: 15 },
    tier: 'GRINDER'
  },
  {
    id: 'power-6',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 6,
    title: 'Attira l\'Attenzione ad Ogni Costo',
    subtitle: 'Court Attention at All Costs',
    action: 'Sii il primo a parlare in riunione. Arriva con un dato sorprendente che nessuno conosce.',
    context: ['meeting', 'visibilità', 'brand'],
    impact: { capital: 30, performance: 10 },
    tier: 'EXECUTIVE'
  },
  {
    id: 'power-9',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 9,
    title: 'Vinci con le Azioni, Mai con gli Argomenti',
    subtitle: 'Win Through Actions, Never Arguments',
    action: 'Invece di difenderti verbalmente, presenta risultati. I numeri parlano.',
    context: ['conflitto', 'critica', 'difesa'],
    impact: { performance: 20, capital: 15 },
    tier: 'STRATEGIST'
  },
  {
    id: 'power-15',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 15,
    title: 'Annichilisci Totalmente il Nemico',
    subtitle: 'Crush Your Enemy Totally',
    action: 'Se devi vincere una battaglia politica, non lasciare spazio a rivincite. Documenta tutto.',
    context: ['conflitto', 'politica', 'competizione'],
    impact: { capital: 40 },
    tier: 'EXECUTIVE'
  },
  {
    id: 'power-16',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 16,
    title: 'Usa l\'Assenza per Aumentare Rispetto',
    subtitle: 'Use Absence to Increase Respect',
    action: 'Non essere sempre disponibile. Crea scarsità della tua presenza.',
    context: ['disponibilità', 'valore', 'rispetto'],
    impact: { capital: 25 },
    tier: 'EXECUTIVE'
  },
  {
    id: 'power-33',
    source: 'power',
    sourceName: '48 Leggi del Potere',
    lawNumber: 33,
    title: 'Scopri il Punto Debole di Ognuno',
    subtitle: 'Discover Each Man\'s Weakness',
    action: 'Osserva cosa motiva il tuo stakeholder: ego, paura, ambizione? Usa quella leva.',
    context: ['negoziazione', 'influenza', 'stakeholder'],
    impact: { capital: 35 },
    tier: 'EXECUTIVE'
  }
];

// ATOMIC HABITS - Productivity Engine
const HABITS_CARDS: StrategyCard[] = [
  {
    id: 'habits-2min',
    source: 'habits',
    sourceName: 'Atomic Habits',
    title: 'La Regola dei 2 Minuti',
    subtitle: 'The 2-Minute Rule',
    action: 'Apri il file e scrivi solo il titolo. L\'inerzia farà il resto.',
    context: ['procrastinazione', 'task', 'blocco'],
    impact: { performance: 10 },
    tier: 'GRINDER'
  },
  {
    id: 'habits-stack',
    source: 'habits',
    sourceName: 'Atomic Habits',
    title: 'Habit Stacking',
    subtitle: 'Dopo [X] faccio [Y]',
    action: 'Dopo il caffè mattutino, scrivi le 3 priorità del giorno. Zero eccezioni.',
    context: ['routine', 'mattina', 'produttività'],
    impact: { performance: 15 },
    tier: 'GRINDER'
  },
  {
    id: 'habits-environment',
    source: 'habits',
    sourceName: 'Atomic Habits',
    title: 'Design Your Environment',
    subtitle: 'L\'ambiente batte la volontà',
    action: 'Rimuovi distrazioni dalla scrivania. Metti il telefono in un\'altra stanza durante il deep work.',
    context: ['focus', 'distrazione', 'ambiente'],
    impact: { performance: 20 },
    tier: 'STRATEGIST'
  },
  {
    id: 'habits-identity',
    source: 'habits',
    sourceName: 'Atomic Habits',
    title: 'Identity-Based Habits',
    subtitle: 'Non "voglio", ma "sono"',
    action: 'Non dire "voglio essere promosso". Di\' "sono un leader". Agisci di conseguenza.',
    context: ['mindset', 'identità', 'leadership'],
    impact: { capital: 15, performance: 10 },
    tier: 'STRATEGIST'
  }
];

// DARK PSYCHOLOGY - Defense Shield
const PSYCHOLOGY_CARDS: StrategyCard[] = [
  {
    id: 'psych-gaslighting',
    source: 'psychology',
    sourceName: 'Psicologia Oscura',
    title: 'Difesa Anti-Gaslighting',
    subtitle: 'Riconoscere la manipolazione',
    action: 'Qualcuno ti fa dubitare della realtà? Rispondi: "Cosa intendi esattamente?" e documenta.',
    context: ['manipolazione', 'conflitto', 'dubbio'],
    impact: { capital: 20 },
    tier: 'STRATEGIST'
  },
  {
    id: 'psych-passive',
    source: 'psychology',
    sourceName: 'Psicologia Oscura',
    title: 'Neutralizzare il Passivo-Aggressivo',
    subtitle: 'Smontare senza scontro',
    action: 'Di fronte a sarcasmo mascherato, chiedi chiarimenti pubblicamente: "Puoi elaborare?"',
    context: ['sarcasmo', 'conflitto', 'meeting'],
    impact: { capital: 25 },
    tier: 'STRATEGIST'
  },
  {
    id: 'psych-mirror',
    source: 'psychology',
    sourceName: 'Psicologia Oscura',
    title: 'Tecnica dello Specchio',
    subtitle: 'Rifletti le emozioni',
    action: 'Ripeti le ultime 3 parole dell\'interlocutore. Crea connessione istantanea.',
    context: ['negoziazione', 'empatia', 'rapport'],
    impact: { capital: 15 },
    tier: 'GRINDER'
  }
];

// DIARY OF A CEO - Leadership Vision
const CEO_CARDS: StrategyCard[] = [
  {
    id: 'ceo-4hours',
    source: 'ceo',
    sourceName: 'Diary of a CEO',
    title: 'La Regola delle 4 Ore',
    subtitle: 'Un CEO decide, non esegue',
    action: 'Un CEO non lavora 12 ore. Prende decisioni migliori in 4. Delega l\'esecuzione.',
    context: ['burnout', 'overwork', 'delega'],
    impact: { performance: 25 },
    tier: 'EXECUTIVE'
  },
  {
    id: 'ceo-uncomfortable',
    source: 'ceo',
    sourceName: 'Diary of a CEO',
    title: 'Comfort Zone è la Death Zone',
    subtitle: 'Growth happens at the edge',
    action: 'Fai oggi una cosa che ti terrorizza professionalmente. Quella è la direzione giusta.',
    context: ['crescita', 'paura', 'sfida'],
    impact: { performance: 20, capital: 15 },
    tier: 'STRATEGIST'
  }
];

// IKIGAI - Anti-Burnout Shield
const IKIGAI_CARDS: StrategyCard[] = [
  {
    id: 'ikigai-why',
    source: 'ikigai',
    sourceName: 'Ikigai',
    title: 'Ricorda il Tuo Perché',
    subtitle: 'Freedom, not slavery',
    action: 'Stai facendo questo per la libertà, non per essere uno schiavo meglio pagato.',
    context: ['burnout', 'stress', 'motivazione'],
    impact: { performance: 15 },
    tier: 'GRINDER'
  },
  {
    id: 'ikigai-flow',
    source: 'ikigai',
    sourceName: 'Ikigai',
    title: 'Trova il Tuo Flow State',
    subtitle: 'Perdersi nel lavoro',
    action: 'Identifica l\'attività in cui perdi la cognizione del tempo. Fai più di quella.',
    context: ['produttività', 'passione', 'focus'],
    impact: { performance: 25 },
    tier: 'STRATEGIST'
  }
];

// Export all cards
export const NEURAL_CODEX: StrategyCard[] = [
  ...POWER_CARDS,
  ...HABITS_CARDS,
  ...PSYCHOLOGY_CARDS,
  ...CEO_CARDS,
  ...IKIGAI_CARDS
];

// Get card by context
export const getCardByContext = (context: string): StrategyCard | undefined => {
  const lowerContext = context.toLowerCase();
  return NEURAL_CODEX.find(card => 
    card.context.some(c => lowerContext.includes(c))
  );
};

// Get random card for tier
export const getDailyCard = (tier: 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE'): StrategyCard => {
  const tierHierarchy = {
    'GRINDER': ['GRINDER'],
    'STRATEGIST': ['GRINDER', 'STRATEGIST'],
    'EXECUTIVE': ['GRINDER', 'STRATEGIST', 'EXECUTIVE']
  };
  
  const availableTiers = tierHierarchy[tier];
  const availableCards = NEURAL_CODEX.filter(card => availableTiers.includes(card.tier));
  
  // Use date as seed for daily consistency
  const today = new Date().toISOString().split('T')[0];
  const seed = today.split('-').reduce((a, b) => a + parseInt(b), 0);
  const index = seed % availableCards.length;
  
  return availableCards[index];
};

// Get card by source book
export const getCardsBySource = (source: StrategyCard['source']): StrategyCard[] => {
  return NEURAL_CODEX.filter(card => card.source === source);
};
