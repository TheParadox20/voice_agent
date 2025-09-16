export interface Campaign {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'scheduled' | 'completed' | 'paused' | 'draft';
  type: 'inbound' | 'outbound';
  totalContacts?: number;
  completedContacts?: number;
}