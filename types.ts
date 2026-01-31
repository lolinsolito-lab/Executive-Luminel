export type GranularLevel = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2' | 'C1' | 'C2' | 'D' | 'F';

export enum TierPhase {
  FOUNDATION = "THE GRINDER",
  DELIVERY = "THE SPECIALIST",
  MANAGEMENT = "THE OFFICER",
  LEADERSHIP = "THE GENERAL",
  PARTNER = "THE PARTNER"
}

export type SubscriptionTier = 'GUEST' | 'AGENT' | 'EXECUTIVE';

export interface TierConfig {
  id: GranularLevel; 
  group: 'A' | 'B' | 'C' | 'D' | 'F'; 
  phase: TierPhase;
  roleName: string;
  description: string;
  mission: string;
  legacy?: string; 
  unlockReqs?: string[]; 
  rewards?: string[]; 
  status: 'COMPLETED' | 'ACTIVE' | 'LOCKED' | 'GOD_MODE';
}

export interface UserProfile {
  name: string;
  level: GranularLevel;
  role: string;
  subscription: SubscriptionTier;
  
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