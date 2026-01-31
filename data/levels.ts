import { TierConfig, TierPhase } from '../types';

// We group granular levels into the visual Tiers (A, B, C, D, F) for the modal
export const TIER_GROUPS = {
  A: {
    title: "TIER A",
    subtitle: "THE GRINDER",
    status: "COMPLETED",
    legacy: "La gavetta. Hai imparato a eseguire. Ora è storia.",
    roles: ["Analyst", "Junior"]
  },
  B: {
    title: "TIER B",
    subtitle: "THE SPECIALIST",
    status: "ACTIVE",
    mission: "Diventare insostituibile. Risolvere crisi. Uscire dalla Comfort Zone.",
    roles: ["Senior Consultant", "Team Lead"]
  },
  C: {
    title: "TIER C",
    subtitle: "THE OFFICER",
    status: "LOCKED",
    unlockReqs: ["Gestire un Budget > 50k€", "Delegare il 40% dell'operativo"],
    rewards: ["Salary: +20% Base", "Authority (Hire/Fire)", "Bonus MBO"],
    distanza: "12-18 Mesi (In-Cycle) o 6 Mesi (Kingmaker Path)"
  },
  D: {
    title: "TIER D",
    subtitle: "THE GENERAL",
    status: "LOCKED",
    unlockReqs: ["Portafoglio Multi-Milionario", "Brand Market Reputation"],
    rewards: ["Equity Options", "Revenue Share", "Global Influence"]
  },
  F: {
    title: "TIER F",
    subtitle: "THE PARTNER",
    status: "LOCKED",
    unlockReqs: ["Buy-in Equity", "Total Control"],
    rewards: ["You make the rules", "The End Game"]
  }
};

// Kept for system prompt context logic
export const GRANULAR_LADDER: TierConfig[] = [
  {
    id: 'A1',
    group: 'A',
    phase: TierPhase.FOUNDATION,
    roleName: "Junior Analyst",
    description: "Appena laureato. 0 autonomia.",
    mission: "Imparare Excel e stare zitto.",
    status: 'COMPLETED'
  },
  {
    id: 'B1',
    group: 'B',
    phase: TierPhase.DELIVERY,
    roleName: "Senior Consultant (Entry)",
    description: "Gestione piccoli stream. Autonomia tecnica totale.",
    mission: "Non far crollare il progetto quando il manager non c'è.",
    status: 'ACTIVE'
  },
  {
    id: 'C1',
    group: 'C',
    phase: TierPhase.MANAGEMENT,
    roleName: "Manager",
    description: "P&L di progetto. Gestione Cliente.",
    mission: "Vendere (Upselling) e proteggere la marginalità.",
    status: 'LOCKED'
  }
];