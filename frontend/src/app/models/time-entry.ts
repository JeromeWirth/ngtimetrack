import { Project, Client } from './project';

export interface TimeEntry {
  id: number;
  userId: number;
  project: Project;
  client: Client;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  description: string;
}

export interface TimeEntryState {
  entries: TimeEntry[];
  loading: boolean;
  error: string | null;
}
