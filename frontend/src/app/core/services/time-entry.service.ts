import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TimeEntry } from '../../shared/models/time-entry';

@Injectable({
  providedIn: 'root',
})
export class TimeEntryService {
  private apiUrl = 'http://localhost:8080/api/time-entries';

  constructor(private http: HttpClient) {}

  getTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(this.apiUrl);
  }

  getAllTimeEntries(): Observable<TimeEntry[]> {
    return this.http.get<TimeEntry[]>(`${this.apiUrl}/all`);
  }

  createTimeEntry(
    entry: Omit<TimeEntry, 'id' | 'userId'>
  ): Observable<TimeEntry> {
    return this.http.post<TimeEntry>(this.apiUrl, entry);
  }

  updateTimeEntry(
    id: number,
    entry: Partial<TimeEntry>
  ): Observable<TimeEntry> {
    return this.http.put<TimeEntry>(`${this.apiUrl}/${id}`, entry);
  }

  deleteTimeEntry(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
