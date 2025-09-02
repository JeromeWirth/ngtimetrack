import {
  signalStore,
  withState,
  withMethods,
  withComputed,
  patchState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { UserService } from '../user.service';
import { User, UserState } from '../models/user';
import { tap, catchError, of } from 'rxjs';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    loadUsers() {
      patchState(store, { loading: true, error: null });
      return userService.getAllUsers().pipe(
        tap((users: User[]) => {
          patchState(store, { users, loading: false });
        }),
        catchError((error) => {
          patchState(store, { loading: false, error: error.message });
          return of([]);
        })
      );
    },
  })),
  withComputed((store) => ({
    totalUsers: () => store.users().length,
    isLoading: () => store.loading(),
    hasError: () => !!store.error(),
  }))
);
