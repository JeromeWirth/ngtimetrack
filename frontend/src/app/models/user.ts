export interface User {
  id?: number;
  email?: string;
  role: 'EMPLOYEE' | 'HR' | 'ADMIN';
  vacationBalance?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
