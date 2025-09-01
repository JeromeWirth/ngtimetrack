import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
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

@Component({
  selector: 'app-time-entry',
  standalone: true,
  imports: [
    NgFor,
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
            <mat-select formControlName="project">
              <mat-option value="project1">Project 1</mat-option>
              <mat-option value="project2">Project 2</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field>
            <mat-label>Client</mat-label>
            <mat-select formControlName="client">
              <mat-option value="client1">Client 1</mat-option>
              <mat-option value="client2">Client 2</mat-option>
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
            [disabled]="!timeEntryForm.valid"
          >
            Save
          </button>
        </form>
      </mat-card-content>
    </mat-card>
    <h2>Recent Entries</h2>
    <ul>
      <li *ngFor="let entry of timeEntries">
        {{ entry.description }} - {{ entry.startTime }} to {{ entry.endTime }}
      </li>
    </ul>
  `,
  styles: [],
})
export class TimeEntryComponent {
  timeEntryForm: FormGroup;
  timeEntries: any[] = [];

  constructor(private fb: FormBuilder) {
    this.timeEntryForm = this.fb.group({
      project: ['', Validators.required],
      client: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  onSubmit() {
    this.timeEntries.push(this.timeEntryForm.value);
    this.timeEntryForm.reset();
  }
}
