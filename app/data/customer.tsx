export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  languagePreference?: string;
  lastInteraction?: Date | null;
  satisfactionRating?: number | string;
  segment?: 'vip' | 'regular' | 'new';
}