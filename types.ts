export type GranularLevel = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2' | 'C1' | 'C2' | 'D' | 'F';

export enum TierPhase {
  FOUNDATION = "THE GRINDER",
  DELIVERY = "THE SPECIALIST",
  MANAGEMENT = "THE OFFICER",
  LEADERSHIP = "THE GENERAL",
  PARTNER = "THE PARTNER"
}

export type SubscriptionTier = 'GRINDER' | 'STRATEGIST' | 'EXECUTIVE';

export interface UserProfile {
  id?: string;
  email?: string;
  name: string;
  level: GranularLevel;
  role: string;
  subscription: SubscriptionTier;
  isAdmin?: boolean;

  // Dual Metric System
  performanceXP: number;
  maxPerformanceXP: number;

  politicalCapital: number;
  maxPoliticalCapital: number;

  nextReviewDate: string;
  outOfCycleWindow: 'CLOSED' | 'OPEN' | 'PENDING';

  skills: string[];
}

export interface Message {
  id: string;
  role: 'user' | 'model' | 'system';
  content: string;
  timestamp: Date;
}

export interface SimulationState {
  isLoading: boolean;
  error: string | null;
}