import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { LayoutComponent } from './shared/layout.component';
import { ClientsComponent } from './features/clients/clients.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ProjectsComponent } from './features/projects/projects.component';
import { TimeEntryComponent } from './features/time-entry/time-entry.component';
import { VacationsComponent } from './features/vacations/vacations.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'time-entry', component: TimeEntryComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'vacations', component: VacationsComponent },
    ],
  },
];
