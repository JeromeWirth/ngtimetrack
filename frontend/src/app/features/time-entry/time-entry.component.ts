import { Component, inject, OnInit } from '@angular/core';
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
  ],
  template: `
    <h1>Time Entry</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add Time Entry</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="timeEntryForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>Project</mat-label>
            <mat-select formControlName="projectId">
              @for (project of projectStore.projects(); track project.id) {
              <mat-option [value]="project.id">{{ project.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Client</mat-label>
            <mat-select formControlName="clientId">
              @for (client of projectStore.clients(); track client.id) {
              <mat-option [value]="client.id">{{ client.name }}</mat-option>
              }
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Date</mat-label>
            <input matInput [matDatepicker]="picker" formControlName="date" />
            <mat-datepicker-toggle
              matSuffix
              [for]="picker"
            ></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Start Time</mat-label>
            <input matInput type="time" formControlName="startTime" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>End Time</mat-label>
            <input matInput type="time" formControlName="endTime" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description"></textarea>
          </mat-form-field>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!timeEntryForm.valid || timeEntryStore.isLoading()"
          >
            Save
          </button>
        </form>
      </mat-card-content>
    </mat-card>
    <h2>Recent Entries</h2>
    <ul>
      @for (entry of timeEntryStore.entries(); track entry.id) {
      <li>
        {{ entry.description }} - {{ entry.startTime }} to {{ entry.endTime }}
      </li>
      }
    </ul>
  `,
  styles: [],
})
export class TimeEntryComponent implements OnInit {
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
