import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Role {
  roleId: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class RolesService {
  private base = `${environment.apiBase}/Roles`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Role[]> {
    return this.http.get<Role[]>(this.base);
  }
}
