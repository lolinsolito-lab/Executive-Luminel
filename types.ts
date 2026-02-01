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
  companyName?: string;
  permissions?: { [key: string]: boolean };
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

  // V7 PHOENIX - Token System
  tokensUsed?: number;
  maxTokens?: number;
  tokensResetDate?: string;

  // V7.7 - Genesis Protocol
  currentSalary?: number;
  targetSalary?: number;
  mainEnemy?: string;
  location?: string; // e.g., 'Milan', 'London'
  genesisCompleted?: boolean;
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

// V10.1 CORE FEATURES
export interface BlackBookEntry {
  id: string;
  user_id: string;
  name: string;
  role: string;
  status: 'Ally' | 'Enemy' | 'Neutral' | 'Target';
  weakness?: string;
  leverage?: string;
  created_at: string;
}

export interface VaultItem {
  id: string;
  title: string;
  description: string;
  content_type: 'text' | 'pdf' | 'video_link' | 'audio_link';
  content_body?: string; // URL or Text
  required_tier: 'tourist' | 'mercenary' | 'partner';
  ai_tags: string[];
  is_active: boolean;
  is_preview: boolean;
  created_at: string;
}

export interface CodexLaw {
  id: string;
  title: string;
  description: string;
  category: 'Psychology' | 'Strategy' | 'Defense' | 'Offense';
  content: string; // Markdown
  isLocked?: boolean;
}