import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { TimeEntryService } from '../time-entry.service';
import { TimeEntry, TimeEntryState } from '../models/time-entry';
import { tap, catchError, of } from 'rxjs';

const initialState: TimeEntryState = {
  entries: [],
  loading: false,
  error: null,
};

export const TimeEntryStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, timeEntryService = inject(TimeEntryService)) => ({
    loadTimeEntries() {
      patchState(store, { loading: true, error: null });
      return timeEntryService.getTimeEntries().pipe(
        tap((entries: TimeEntry[]) => {
          patchState(store, { entries, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of([]);
        })
      );
    },
    addTimeEntry(entry: Omit<TimeEntry, 'id' | 'userId'>) {
      patchState(store, { loading: true, error: null });
      return timeEntryService.createTimeEntry(entry).pipe(
        tap((newEntry: TimeEntry) => {
          patchState(store, (state) => ({
            entries: [...state.entries, newEntry],
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    updateTimeEntry(id: number, updates: Partial<TimeEntry>) {
      patchState(store, { loading: true, error: null });
      return timeEntryService.updateTimeEntry(id, updates).pipe(
        tap((updatedEntry: TimeEntry) => {
          patchState(store, (state) => ({
            entries: state.entries.map((entry) =>
              entry.id === id ? updatedEntry : entry
            ),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    deleteTimeEntry(id: number) {
      patchState(store, { loading: true, error: null });
      return timeEntryService.deleteTimeEntry(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            entries: state.entries.filter((entry) => entry.id !== id),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
  })),
  withComputed((store) => ({
    totalEntries: () => store.entries().length,
    isLoading: () => store.loading(),
    hasError: () => !!store.error(),
  }))
);
