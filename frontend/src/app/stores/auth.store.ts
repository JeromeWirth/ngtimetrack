import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { User, AuthState } from '../models/user';
import { tap, catchError, of } from 'rxjs';

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    login(credentials: { email: string; password: string }) {
      patchState(store, { loading: true, error: null });
      return authService.login(credentials).pipe(
        tap((response: any) => {
          const token = response.token;
          const role = response.role;
          const user = { role } as User;
          localStorage.setItem('token', token);
          patchState(store, { user, token, loading: false });
        }),
        catchError(error => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    register(userData: { email: string; password: string }) {
      patchState(store, { loading: true, error: null });
      return authService.register(userData).pipe(
        tap((response: any) => {
          patchState(store, { loading: false });
        }),
        catchError(error => {
          patchState(store, { loading: false, error: error.message });
          return of(null);
        })
      );
    },
    logout() {
      localStorage.removeItem('token');
      patchState(store, initialState);
    },
    loadUserFromToken() {
      const token = localStorage.getItem('token');
      if (token) {
        // Assuming we can decode or fetch user from token
        // For now, placeholder
        patchState(store, { token });
      }
    },
  })),
  withComputed((store) => ({
    isAuthenticated: () => !!store.token(),
    isLoading: () => store.loading(),
    hasError: () => !!store.error(),
  }))
);
