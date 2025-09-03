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
import { ProjectStore } from '../../shared/stores/project.store';

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
    <div class="max-w-4xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Projects</h1>
      </div>

      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-lg font-medium"
            >Add Project</mat-card-title
          >
        </mat-card-header>
        <mat-card-content>
          <form
            [formGroup]="projectForm"
            (ngSubmit)="onSubmit()"
            class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
          >
            <mat-form-field class="w-full md:col-span-1">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <mat-form-field class="w-full md:col-span-1">
              <mat-label>Client</mat-label>
              <mat-select formControlName="clientId">
                @for (client of projectStore.clients(); track client.id) {
                <mat-option [value]="client.id">{{ client.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <mat-form-field class="w-full md:col-span-3">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description"></textarea>
            </mat-form-field>

            <div class="md:col-span-3 flex justify-end">
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!projectForm.valid || projectStore.isLoading()"
                class="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <h2 class="text-xl font-semibold mb-3">Projects List</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        @for (project of projectStore.projects(); track project.id) {
        <mat-card class="p-4">
          <mat-card-title class="font-medium text-lg">{{
            project.name
          }}</mat-card-title>
          <mat-card-subtitle class="text-sm text-gray-500">{{
            project.client && project.client.name
          }}</mat-card-subtitle>
          <mat-card-content class="mt-2 text-sm text-gray-700">{{
            project.description
          }}</mat-card-content>
        </mat-card>
        }
      </div>
    </div>
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
