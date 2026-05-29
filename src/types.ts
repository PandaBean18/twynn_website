export interface Feature {
  id: string;
  index: string;
  title: string;
  description: string;
  target: 'creators' | 'brands' | 'both';
}

export interface WaitlistEntry {
  email: string;
  name: string;
  role: 'creator' | 'brand';
  socialUrl?: string;
  timestamp: string;
}

export type ActiveTab = 'all' | 'creators' | 'brands';