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
    <h1>Clients</h1>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Add Client</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="clientForm" (ngSubmit)="onSubmit()">
          <mat-form-field>
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" />
          </mat-form-field>
          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="!clientForm.valid || projectStore.isLoading()"
          >
            Add Client
          </button>
        </form>
      </mat-card-content>
    </mat-card>
    <mat-card>
      <mat-card-header>
        <mat-card-title>Existing Clients</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <mat-list>
          @for (client of projectStore.clients(); track client.id) {
          <mat-list-item>{{ client.name }}</mat-list-item>
          }
        </mat-list>
      </mat-card-content>
    </mat-card>
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
