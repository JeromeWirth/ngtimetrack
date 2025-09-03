import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { VacationDay, VacationState } from '../models/vacation';
import { tap, catchError, of } from 'rxjs';
import { VacationService } from '../../core/services/vacation.service';

const initialState: VacationState = {
  requests: [],
  balance: 0,
  loading: false,
  error: null,
};

export const VacationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, vacationService = inject(VacationService)) => ({
    loadVacationRequests() {
      patchState(store, { loading: true, error: null });
      return vacationService.getVacationRequests().pipe(
        tap((requests: VacationDay[]) => {
          patchState(store, { requests, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of([]);
        })
      );
    },
    addVacationRequest(request: Omit<VacationDay, 'id' | 'status'>) {
      patchState(store, { loading: true, error: null });
      return vacationService.createVacationRequest(request).pipe(
        tap((newRequest: VacationDay) => {
          patchState(store, (state) => ({
            requests: [...state.requests, newRequest],
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    updateVacationRequest(id: number, updates: Partial<VacationDay>) {
      patchState(store, { loading: true, error: null });
      return vacationService.updateVacationRequest(id, updates).pipe(
        tap((updatedRequest: VacationDay) => {
          patchState(store, (state) => ({
            requests: state.requests.map((request) =>
              request.id === id ? updatedRequest : request
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
    deleteVacationRequest(id: number) {
      patchState(store, { loading: true, error: null });
      return vacationService.deleteVacationRequest(id).pipe(
        tap(() => {
          patchState(store, (state) => ({
            requests: state.requests.filter((request) => request.id !== id),
            loading: false,
          }));
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    // loadVacationBalance() {
    //   patchState(store, { loading: true, error: null });
    //   return vacationService.getVacationBalance().pipe(
    //     tap((data: { balance: number }) => {
    //       patchState(store, { balance: data.balance, loading: false });
    //     }),
    //     catchError(error => {
    //       patchState(store, { loading: false, error: error.message });
    //       return of(null);
    //     })
    //   );
    // },
  })),
  withComputed((store) => ({
    totalRequests: () => store.requests().length,
    approvedRequests: () =>
      store.requests().filter((r) => r.status === 'APPROVED').length,
    isLoading: () => store.loading(),
    hasError: () => !!store.error(),
  }))
);
