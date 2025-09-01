import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VacationDay } from './models/vacation';

@Injectable({
  providedIn: 'root',
})
export class VacationService {
  private apiUrl = 'http://localhost:8080/api/vacations';

  constructor(private http: HttpClient) {}

  getVacationRequests(): Observable<VacationDay[]> {
    return this.http.get<VacationDay[]>(this.apiUrl);
  }

  createVacationRequest(
    request: Omit<VacationDay, 'id' | 'status'>
  ): Observable<VacationDay> {
    return this.http.post<VacationDay>(this.apiUrl, request);
  }

  updateVacationRequest(
    id: number,
    updates: Partial<VacationDay>
  ): Observable<VacationDay> {
    return this.http.put<VacationDay>(`${this.apiUrl}/${id}`, updates);
  }

  deleteVacationRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // getVacationBalance(): Observable<{ balance: number }> {
  //   return this.http.get<{ balance: number }>(`${this.apiUrl}/balance`);
  // }
}
