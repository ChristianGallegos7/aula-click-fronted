import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Curso {
  id: string;
  nombre: string;
  profesorId?: string;
}

@Injectable({ providedIn: 'root' })
export class CursosService {
  private base = `${environment.apiBase}/Curso`;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.base);
  }

  getById(id: string): Observable<Curso> {
    return this.http.get<Curso>(`${this.base}/${id}`);
  }

  create(curso: Partial<Curso>): Observable<Curso> {
    return this.http.post<Curso>(this.base, curso);
  }

  update(id: string, curso: Partial<Curso>): Observable<void> {
    return this.http.put<void>(`${this.base}/${id}`, curso);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
