import { Injectable } from '@angular/core';

const KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  get token(): string | null { return localStorage.getItem(KEY); }
  set token(v: string | null) {
    if (v) localStorage.setItem(KEY, v);
    else localStorage.removeItem(KEY);
  }
  clear() { localStorage.removeItem(KEY); }

  get payload(): any | null {
    const t = this.token; if (!t) return null;
    const parts = t.split('.'); if (parts.length !== 3) return null;
    try { return JSON.parse(this.decodeBase64Url(parts[1])); } catch { return null; }
  }

  get isExpired(): boolean {
    const p = this.payload; if (!p?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return p.exp <= now;
  }
  hasRole(role: string): boolean {
    const p = this.payload; if (!p) return false;
    // roles llegan como ClaimTypes.Role → suelen venir como "role" o "roles"
    const roles = ([] as string[]).concat(p['role'] || []).concat(p['roles'] || []);
    return roles.includes(role);
  }

  decodeBase64Url(str: string): string {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = str.length % 4;
    if (pad) str += '='.repeat(4 - pad);
    return atob(str);
  }

}
