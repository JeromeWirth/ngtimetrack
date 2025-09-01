import { Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { ClientsComponent } from './clients.component';
import { DashboardComponent } from './dashboard.component';
import { LayoutComponent } from './layout.component';
import { ProjectsComponent } from './projects.component';
import { TimeEntryComponent } from './time-entry.component';
import { VacationsComponent } from './vacations.component';

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
