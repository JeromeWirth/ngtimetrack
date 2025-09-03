import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthStore } from '../../shared/stores/auth.store';
import { DatePipe, CommonModule } from '@angular/common';
import { ProjectStore } from '../../shared/stores/project.store';
import { TimeEntryStore } from '../../shared/stores/time-entry.store';

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  template: `
    <div class="max-w-5xl mx-auto px-4 py-6">
      <header class="flex items-center justify-between mb-4">
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Arbeitszeit</h1>
          <div class="text-sm text-gray-500">{{ currentMonth }}</div>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">Current time</div>
          <div class="text-lg font-mono">{{ currentTime }}</div>
        </div>
      </header>

      <div class="bg-surface shadow rounded overflow-hidden">
        <div
          class="hidden md:grid grid-cols-12 gap-2 px-4 py-2 bg-gray-50 text-sm text-gray-600 font-medium"
        >
          <div class="col-span-2">Date</div>
          <div class="col-span-2">Project</div>
          <div class="col-span-2">Client</div>
          <div class="col-span-1">Start</div>
          <div class="col-span-1">End</div>
          <div class="col-span-1">Duration</div>
          <div class="col-span-3">Description</div>
        </div>

        <div class="divide-y">
          @for (day of days; track day.date) {
          <div
            class="grid grid-cols-1 md:grid-cols-12 gap-2 items-center px-4 py-3"
          >
            <div class="col-span-2 flex items-center">
              <div class="text-sm font-medium">
                {{ day.date | date : 'EEE, dd.MM' }}
              </div>
            </div>

            <div class="col-span-2">
              <mat-form-field appearance="outline" class="w-full">
                <mat-select
                  [value]="day.projectId"
                  (selectionChange)="day.projectId = $event.value"
                >
                  @for (project of projectStore.projects(); track project.id) {
                  <mat-option [value]="project.id">{{
                    project.name
                  }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>

            <div class="col-span-2">
              <mat-form-field appearance="outline" class="w-full">
                <mat-select
                  [value]="day.clientId"
                  (selectionChange)="day.clientId = $event.value"
                >
                  @for (client of projectStore.clients(); track client.id) {
                  <mat-option [value]="client.id">{{ client.name }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>

            <div class="col-span-1">
              <mat-form-field appearance="outline" class="w-full">
                <input
                  matInput
                  type="time"
                  [value]="day.startTime"
                  (input)="day.startTime = $any($event.target).value"
                />
              </mat-form-field>
            </div>

            <div class="col-span-1">
              <mat-form-field appearance="outline" class="w-full">
                <input
                  matInput
                  type="time"
                  [value]="day.endTime"
                  (input)="day.endTime = $any($event.target).value"
                />
              </mat-form-field>
            </div>

            <div class="col-span-1">
              <div class="text-sm">
                {{ day.duration ? day.duration + ' min' : '-' }}
              </div>
            </div>

            <div class="col-span-3">
              <mat-form-field appearance="outline" class="w-full">
                <textarea
                  matInput
                  rows="1"
                  [value]="day.description"
                  (input)="day.description = $any($event.target).value"
                ></textarea>
              </mat-form-field>
            </div>

            <div class="md:col-span-12 flex justify-end mt-2 md:mt-0">
              <button
                mat-stroked-button
                class="px-3 py-1 text-sm"
                (click)="saveEntry(day)"
                [disabled]="timeEntryStore.isLoading()"
              >
                Save
              </button>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class TimeEntryComponent implements OnInit, OnDestroy {
  currentTime = '';
  currentMonth = '';
  days: Array<any> = [];
  private timerId: any;

  timeEntryForm: FormGroup;
  timeEntryStore = inject(TimeEntryStore);
  projectStore = inject(ProjectStore);
  authStore = inject(AuthStore);

  constructor(private fb: FormBuilder) {
    this.timeEntryForm = this.fb.group({
      projectId: ['', Validators.required],
      clientId: ['', Validators.required],
      date: [new Date(), Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.timeEntryStore.loadTimeEntries().subscribe();
    this.projectStore.loadProjects().subscribe();
    this.projectStore.loadClients().subscribe();
    this.populateDaysForMonth(new Date());
    this.updateTime();
    this.timerId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  private updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    this.currentMonth = now.toLocaleString([], {
      month: 'long',
      year: 'numeric',
    });
  }

  private startOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  private endOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  private populateDaysForMonth(date: Date) {
    const start = this.startOfMonth(date);
    const end = this.endOfMonth(date);
    const days: any[] = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      days.push({
        date: new Date(d),
        projectId: '',
        clientId: '',
        startTime: '',
        endTime: '',
        description: '',
        duration: 0,
      });
    }
    this.days = days;
  }

  saveEntry(day: any) {
    // Simple client/project resolution
    const project = this.projectStore
      .projects()
      .find((p) => p.id === day.projectId);
    const client = this.projectStore
      .clients()
      .find((c) => c.id === day.clientId);
    if (!project || !client) {
      // silently ignore for now; ideally show validation
      return;
    }

    if (!day.startTime || !day.endTime) {
      return;
    }

    const date = day.date;
    const startTimeStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${
      day.startTime
    }:00`;
    const endTimeStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${
      day.endTime
    }:00`;
    const start = new Date(startTimeStr);
    const end = new Date(endTimeStr);
    const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes

    const entry = {
      project,
      client,
      startTime: startTimeStr,
      endTime: endTimeStr,
      duration,
      description: day.description,
    };

    this.timeEntryStore.addTimeEntry(entry).subscribe(() => {
      day.duration = duration;
    });
  }

  onSubmit() {
    const formValue = this.timeEntryForm.value;
    const project = this.projectStore
      .projects()
      .find((p) => p.id === formValue.projectId);
    const client = this.projectStore
      .clients()
      .find((c) => c.id === formValue.clientId);
    if (project && client) {
      const date = formValue.date;
      const startTimeStr = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${
        formValue.startTime
      }:00`;
      const endTimeStr = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${
        formValue.endTime
      }:00`;
      const start = new Date(startTimeStr);
      const end = new Date(endTimeStr);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
      const entry = {
        project,
        client,
        startTime: startTimeStr,
        endTime: endTimeStr,
        duration,
        description: formValue.description,
      };
      this.timeEntryStore.addTimeEntry(entry).subscribe(() => {
        this.timeEntryForm.reset();
        this.timeEntryForm.patchValue({ date: new Date() }); // reset date to today
      });
    }
  }
}
