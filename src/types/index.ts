export type Line = 'western' | 'central' | 'harbour' | 'metro';

export type CrowdLevel = 'light' | 'moderate' | 'crowded';

export type ConfidenceMode = 'new-rider' | 'commuter';

export type TrainSpeed = 'Fast' | 'Slow';

export type TicketClass = 'second' | 'first';

export type TicketType = 'single' | 'return' | 'monthly' | 'quarterly';

export type TicketStatus = 'valid' | 'active' | 'expired';

export interface Station {
  id: string;
  name: string;
  line: Line;
}

export interface Route {
  from: Station;
  to: Station;
  line: Line;
  speed: TrainSpeed;
  platform?: string;
  bestBus?: string;
  nextTrainMin: number;
  followingTrainMin: number;
  crowdLevel: CrowdLevel;
}

export interface Ticket {
  id: string;
  from: string;
  to: string;
  class: TicketClass;
  type: TicketType;
  status: TicketStatus;
  price: number;
  validUntil?: string;
  purchasedAt?: string;
  expiresAt?: string;
  daysLeft?: number;
}

export interface NotificationSetting {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
}

export type NavTab = 'home' | 'tickets' | 'explore';

export type ExploreTab = 'plan' | 'network' | 'basics';

export type TicketsTab = 'my-tickets' | 'buy';
