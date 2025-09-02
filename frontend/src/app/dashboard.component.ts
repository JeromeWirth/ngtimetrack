import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from './stores/auth.store';
import { TimeEntryStore } from './stores/time-entry.store';
import { VacationStore } from './stores/vacation.store';
import { UserStore } from './stores/user.store';
import { TimeEntry } from './models/time-entry';
import { User } from './models/user';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      @if (authStore.user()?.role === 'HR' || authStore.user()?.role ===
      'ADMIN') {
      <h1>HR Dashboard</h1>
      <div class="hr-overview">
        <h2>Employee Report Status (This Month)</h2>
        <ul>
          @for (user of userStore.users(); track user.id) {
          <li>
            {{ user.email }} - @if (hasReportedThisMonth(user.id!)) { Reported }
            @else { Not Reported }
          </li>
          }
        </ul>
      </div>
      } @else {
      <h1>Employee Dashboard</h1>
      <div class="summary">
        <div class="stat">
          <h3>Total Hours Tracked</h3>
          <p>{{ totalHours() }} hours</p>
        </div>
        <div class="stat">
          <h3>Vacation Balance</h3>
          <p>{{ authStore.user()?.vacationBalance || 0 }} days</p>
        </div>
      </div>
      <div class="recent-entries">
        <h3>Recent Time Entries</h3>
        <ul>
          @for (entry of recentEntries(); track entry.id) {
          <li>
            {{ entry.description }} - {{ entry.duration / 60 }} hours on
            {{ entry.startTime | date }}
          </li>
          }
        </ul>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 20px;
      }
      .summary {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
      .stat {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 4px;
      }
      .recent-entries ul {
        list-style: none;
        padding: 0;
      }
      .recent-entries li {
        padding: 5px 0;
        border-bottom: 1px solid #eee;
      }
      .hr-overview ul {
        list-style: none;
        padding: 0;
      }
      .hr-overview li {
        padding: 5px 0;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  authStore = inject(AuthStore);
  timeEntryStore = inject(TimeEntryStore);
  vacationStore = inject(VacationStore);
  userStore = inject(UserStore);

  totalHours = computed(() => {
    const entries = this.timeEntryStore.entries();
    return entries.reduce((sum, entry) => sum + entry.duration, 0) / 60;
  });

  recentEntries = computed(() => {
    const entries = this.timeEntryStore.entries();
    return entries.slice(-5).reverse(); // last 5, most recent first
  });

  ngOnInit() {
    this.timeEntryStore.loadTimeEntries().subscribe();
    this.vacationStore.loadVacationRequests().subscribe();
    if (
      this.authStore.user()?.role === 'HR' ||
      this.authStore.user()?.role === 'ADMIN'
    ) {
      this.userStore.loadUsers().subscribe();
      this.timeEntryStore.loadAllTimeEntries().subscribe();
    }
  }

  hasReportedThisMonth(userId: number): boolean {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const entries = this.timeEntryStore.entries();
    return entries.some((entry) => {
      const entryDate = new Date(entry.startTime);
      return (
        entry.userId === userId &&
        entryDate.getMonth() === currentMonth &&
        entryDate.getFullYear() === currentYear
      );
    });
  }
}
