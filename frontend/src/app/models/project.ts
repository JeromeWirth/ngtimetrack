import { User } from './user';

export interface Client {
  id: number;
  name: string;
  description?: string;
}

export interface Project {
  id: number;
  name: string;
  client: Client;
  description?: string;
  users: User[]; // but in backend it's List<User>
}

export interface ProjectState {
  projects: Project[];
  clients: Client[];
  loading: boolean;
  error: string | null;
}
