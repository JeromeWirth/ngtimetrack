import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthStore } from './auth.store';
import { AuthService } from '../auth.service';
import { App } from '../app';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('AuthStore', () => {
  let store: InstanceType<typeof AuthStore>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, App],
      providers: [AuthStore, AuthService],
    });
    store = TestBed.inject(AuthStore);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should login successfully', async () => {
    const credentials = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'jwt-token', user: { role: 'EMPLOYEE' } };

    const loginPromise = store.login(credentials).toPromise();
    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    await loginPromise;
    expect(store.token()).toBe('jwt-token');
    expect(store.user()?.role).toBe('EMPLOYEE');
    expect(store.loading()).toBe(false);
  });

  it('should handle login error', async () => {
    const credentials = { email: 'test@example.com', password: 'wrong' };

    try {
      const loginPromise = store.login(credentials).toPromise();
      const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
      req.error(new ErrorEvent('error'));
      await loginPromise;
    } catch (error) {
      expect(store.error()).toBeTruthy();
      expect(store.loading()).toBe(false);
    }
  });

  it('should register successfully', async () => {
    const userData = { email: 'test@example.com', password: 'password' };
    const mockResponse = { message: 'User registered successfully!' };

    const registerPromise = store.register(userData).toPromise();
    const req = httpMock.expectOne('http://localhost:8080/api/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    await registerPromise;
    expect(store.loading()).toBe(false);
  });

  it('should logout', () => {
    store.logout();
    expect(store.token()).toBe(null);
    expect(store.user()).toBe(null);
  });

  it('should compute isAuthenticated', async () => {
    expect(store.isAuthenticated()).toBe(false);
    // Simulate login
    const credentials = { email: 'test@example.com', password: 'password' };
    const mockResponse = { token: 'jwt-token', user: { role: 'EMPLOYEE' } };

    const loginPromise = store.login(credentials).toPromise();
    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    req.flush(mockResponse);

    await loginPromise;
    expect(store.isAuthenticated()).toBe(true);
  });
});
