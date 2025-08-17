import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="main-nav">
      <a routerLink="/admin/inicio" routerLinkActive="active">Inicio</a>
      <a routerLink="/admin/usuarios" routerLinkActive="active">Usuarios</a>
      <a routerLink="/notas" routerLinkActive="active">Cursos</a>
      <a routerLink="/reportes" routerLinkActive="active">Reportes</a>
      <a (click)="logout()" class="logout">Cerrar sesión</a>
    </nav>
  `,
  styles: [`
    .main-nav { display: flex; gap: 1rem; background: #f8f9fa; padding: 10px 20px; border-radius: 8px; margin-bottom: 20px; }
    .main-nav a { text-decoration: none; color: #007bff; font-weight: 500; }
    .main-nav a.active { color: #0056b3; border-bottom: 2px solid #007bff; }
    .main-nav .logout { color: #dc3545; cursor: pointer; margin-left: auto; }
  `],
  standalone: true
})
export class NavComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }
}
