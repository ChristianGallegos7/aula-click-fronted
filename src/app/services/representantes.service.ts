import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Representante {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  preferenciaNotificaciones?: string;
  activo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class RepresentantesService {
  private base = `${environment.apiBase}/Representante`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Representante[]> {
    return this.http.get<Representante[]>(this.base);
  }

  create(representante: Partial<Representante>): Observable<Representante> {
    return this.http.post<Representante>(this.base, representante);
  }
}
