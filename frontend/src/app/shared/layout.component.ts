import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar
      class="flex items-center px-4 py-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-md"
    >
      <div class="flex items-center gap-3">
        <a routerLink="/" class="text-lg font-semibold hover:opacity-90"
          >NgTimeTrack</a
        >
      </div>

      <div class="flex-1"></div>

      <nav class="flex items-center gap-2">
        <button
          mat-button
          routerLink="/dashboard"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Dashboard
        </button>
        <button
          mat-button
          routerLink="/time-entry"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Time Entry
        </button>
        <button
          mat-button
          routerLink="/projects"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Projects
        </button>
        <button
          mat-button
          routerLink="/clients"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Clients
        </button>
        <button
          mat-button
          routerLink="/vacations"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Vacations
        </button>
        <button
          mat-button
          routerLink="/login"
          class="text-white hover:bg-white/10 rounded px-3"
        >
          Login
        </button>
      </nav>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  // All layout styling moved to Tailwind utility classes in the template above.
})
export class LayoutComponent {}
