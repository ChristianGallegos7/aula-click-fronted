import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
export interface Curso {
  id: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CursosService {
  private base = `${environment.apiBase}/Curso`;

  constructor(private http: HttpClient) {}

  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.base);
  }
}
