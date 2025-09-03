export interface VacationDay {
  id: number;
  userId: number;
  startDate: string;
  endDate: string;
  type: 'VACATION' | 'SICK';
  status: 'PENDING' | 'APPROVED' | 'DENIED';
  reason?: string;
}

export interface VacationState {
  requests: VacationDay[];
  balance: number;
  loading: boolean;
  error: string | null;
}
