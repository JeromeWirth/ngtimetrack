import { of } from 'rxjs';
import { AuthService } from './auth.service';
import { describe, vi, beforeEach, it, expect } from 'vitest';

describe('AuthService (unit)', () => {
  let service: AuthService;
  const mockHttp = {
    post: vi.fn(),
  };

  beforeEach(() => {
    service = new AuthService(mockHttp as any);
  });

  it('should login user', () => {
    const credentials = { email: 'a', password: 'b' };
    const mockResponse = { token: 'x' };
    mockHttp.post.mockReturnValueOnce(of(mockResponse));

    service.login(credentials).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    expect(mockHttp.post).toHaveBeenCalledWith(
      'http://localhost:8080/api/auth/login',
      credentials
    );
  });
});

// it('should register user', () => {
//   const mockResponse = { message: 'User registered successfully!' };
//   const userData = { email: 'test@example.com', password: 'password' };

//   service.register(userData).subscribe((response) => {
//     expect(response).toEqual(mockResponse);
//   });

//   const req = httpMock.expectOne('http://localhost:8080/api/auth/signup');
//   expect(req.request.method).toBe('POST');
//   expect(req.request.body).toEqual(userData);
//   req.flush(mockResponse);
// });
