import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from '../core/token.service';

export interface LoginResponse {
  token: string;
  expiresAtUtc: string;
  roles: string[];
}

export interface MeResponse {
  userId: string;
  email: string;
  displayName: string;
  institutionId?: string;
  roles: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Guarda el rol principal del usuario en localStorage */
  set mainRole(role: string | null) {
    if (role) localStorage.setItem('main_role', role);
    else localStorage.removeItem('main_role');
  }
  get mainRole(): string | null {
    return localStorage.getItem('main_role');
  }
  /** Devuelve el payload decodificado del JWT actual */
  get tokenPayload(): any | null {
    return this.token.payload;
  }
  private base = `${environment.apiBase}/auth`;

  // Estado en memoria del perfil
  private meSubject = new BehaviorSubject<MeResponse | null>(null);
  me$ = this.meSubject.asObservable();

  constructor(private http: HttpClient, private token: TokenService) {}

  /** Inicia sesión contra /api/auth/login, guarda el JWT y retorna los roles para redirección inmediata */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.base}/login`, { email, password }).pipe(
      tap(res => this.token.token = res.token)
    );
  }

  /** Obtiene el perfil del usuario autenticado (/api/auth/me) */
  me(): Observable<MeResponse> {
    return this.http.get<MeResponse>(`${this.base}/me`).pipe(
      tap(profile => this.meSubject.next(profile))
    );
  }

  /** Cierra sesión en el cliente (limpia token y perfil) */
  logout(): void {
    this.token.clear();
    this.meSubject.next(null);
  }

  /** Helpers */
  get isLoggedIn(): boolean {
    return !!this.token.token && !this.token.isExpired;
  }

  hasRole(role: string): boolean {
    return this.token.hasRole(role);
  }
}
