import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TimeEntryStore } from './stores/time-entry.store';
import { ProjectStore } from './stores/project.store';
import { AuthStore } from './stores/auth.store';

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
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
            <mat-label>Start Time</mat-label>
            <input matInput formControlName="startTime" type="datetime-local" />
          </mat-form-field>
          <mat-form-field>
            <mat-label>End Time</mat-label>
            <input matInput formControlName="endTime" type="datetime-local" />
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
    const project = this.projectStore.projects().find(p => p.id === formValue.projectId);
    const client = this.projectStore.clients().find(c => c.id === formValue.clientId);
    if (project && client) {
      const start = new Date(formValue.startTime);
      const end = new Date(formValue.endTime);
      const duration = (end.getTime() - start.getTime()) / (1000 * 60); // minutes
      const entry = {
        project,
        client,
        startTime: formValue.startTime,
        endTime: formValue.endTime,
        duration,
        description: formValue.description,
      };
      this.timeEntryStore.addTimeEntry(entry).subscribe(() => {
        this.timeEntryForm.reset();
      });
    }
  }
}
