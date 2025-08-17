import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface User {
  Id: string;
  institutionId?: string;
  email: string;
  nombre: string;
  apellido: string;
  phoneNumber?: string;
  activo: boolean;
  displayName?: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  private base = `${environment.apiBase}/Users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.base);
    
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  create(user: Partial<User>): Observable<User> {
    return this.http.post<User>(this.base, user);
  }

  update(id: string, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
