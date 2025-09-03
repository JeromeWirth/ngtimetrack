import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProjectStore } from '../../shared/stores/project.store';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="max-w-3xl mx-auto px-4 py-6">
      <div class="flex items-center justify-between mb-6">
        <h1 class="text-2xl font-semibold text-gray-800">Clients</h1>
      </div>

      <mat-card class="mb-6">
        <mat-card-header>
          <mat-card-title class="text-lg font-medium"
            >Add Client</mat-card-title
          >
        </mat-card-header>
        <mat-card-content>
          <form
            [formGroup]="clientForm"
            (ngSubmit)="onSubmit()"
            class="flex gap-3 items-end"
          >
            <mat-form-field class="flex-1">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" />
            </mat-form-field>

            <div>
              <button
                mat-raised-button
                color="primary"
                type="submit"
                [disabled]="!clientForm.valid || projectStore.isLoading()"
                class="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Add Client
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title class="text-lg font-medium"
            >Existing Clients</mat-card-title
          >
        </mat-card-header>
        <mat-card-content>
          <div class="space-y-2">
            @for (client of projectStore.clients(); track client.id) {
            <div
              class="p-3 bg-gray-50 rounded flex items-center justify-between"
            >
              <div class="text-gray-800">{{ client.name }}</div>
            </div>
            }
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [],
})
export class ClientsComponent implements OnInit {
  clientForm: FormGroup;
  projectStore = inject(ProjectStore);

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.projectStore.loadClients().subscribe();
  }

  onSubmit() {
    const formValue = this.clientForm.value;
    this.projectStore.addClient({ name: formValue.name }).subscribe(() => {
      this.clientForm.reset();
      this.projectStore.loadClients().subscribe(); // reload
    });
  }
}
