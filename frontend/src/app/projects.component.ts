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
import { ProjectStore } from './stores/project.store';

@Component({
  selector: 'app-projects',
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
    <h1>Projects</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add Project</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="projectForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
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
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description"></textarea>
          </mat-form-field>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!projectForm.valid || projectStore.isLoading()"
          >
            Save
          </button>
        </form>
      </mat-card-content>
    </mat-card>
    <h2>Projects List</h2>
    <ul>
      @for (project of projectStore.projects(); track project.id) {
      <li>{{ project.name }}</li>
      }
    </ul>
  `,
  styles: [],
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  projectStore = inject(ProjectStore);

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      clientId: ['', Validators.required],
      description: [''],
      users: [[]],
    });
  }

  ngOnInit() {
    this.projectStore.loadProjects().subscribe();
    this.projectStore.loadClients().subscribe();
  }

  onSubmit() {
    const formValue = this.projectForm.value;
    const client = this.projectStore
      .clients()
      .find((c) => c.id === formValue.clientId);
    if (client) {
      const project = {
        name: formValue.name,
        client,
        description: formValue.description,
        users: [],
      };
      this.projectStore.addProject(project).subscribe(() => {
        this.projectForm.reset();
      });
    }
  }
}
