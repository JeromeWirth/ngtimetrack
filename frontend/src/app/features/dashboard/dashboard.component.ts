import { Component, OnInit, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../shared/stores/auth.store';
import { TimeEntryStore } from '../../shared/stores/time-entry.store';
import { UserStore } from '../../shared/stores/user.store';
import { VacationStore } from '../../shared/stores/vacation.store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-5xl mx-auto px-4 py-6">
      @if (authStore.user()?.role === 'HR' || authStore.user()?.role ===
      'ADMIN') {
      <h1 class="text-2xl font-semibold mb-4">HR Dashboard</h1>

      <div class="bg-surface shadow rounded p-4">
        <h2 class="text-lg font-medium mb-3">
          Employee Report Status (This Month)
        </h2>
        <div class="divide-y">
          @for (user of userStore.users(); track user.id) {
          <div class="py-2 flex items-center justify-between">
            <div class="text-sm text-gray-200">{{ user.email }}</div>
            <div class="text-sm">
              @if (hasReportedThisMonth(user.id!)) {
              <span class="text-green-400">Reported</span>
              } @else {
              <span class="text-red-400">Not Reported</span>
              }
            </div>
          </div>
          }
        </div>
      </div>

      } @else {
      <h1 class="text-2xl font-semibold mb-4">Employee Dashboard</h1>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-surface shadow rounded p-4">
          <div class="text-sm text-gray-400">Total Hours Tracked</div>
          <div class="text-2xl font-semibold">
            {{ totalHours() | number : '1.0-1' }} hrs
          </div>
        </div>
        <div class="bg-surface shadow rounded p-4">
          <div class="text-sm text-gray-400">Vacation Balance</div>
          <div class="text-2xl font-semibold">
            {{ authStore.user()?.vacationBalance || 0 }} days
          </div>
        </div>
      </div>

      <div class="bg-surface shadow rounded p-4">
        <h3 class="text-lg font-medium mb-3">Recent Time Entries</h3>
        <div class="divide-y">
          @for (entry of recentEntries(); track entry.id) {
          <div class="py-3 flex items-center justify-between">
            <div>
              <div class="text-sm font-medium">{{ entry.description }}</div>
              <div class="text-xs text-gray-400">
                {{ entry.startTime | date : 'short' }}
              </div>
            </div>
            <div class="text-sm text-gray-200">
              {{ entry.duration / 60 | number : '1.1-2' }} h
            </div>
          </div>
          }
        </div>
      </div>
      }
    </div>
  `,
  styles: [],
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
