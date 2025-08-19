import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  template: `
    <aside class="sidebar">
      <nav>
        <a routerLink="/admin/inicio" routerLinkActive="active">Inicio</a>
        <a routerLink="/admin/usuarios" routerLinkActive="active">Usuarios</a>
        <a routerLink="/admin/cursos" routerLinkActive="active">Cursos</a>
        <a routerLink="/admin/reportes" routerLinkActive="active">Reportes</a>
        <a (click)="logout()" class="logout">Cerrar sesión</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 220px;
      min-height: 100vh;
      background: #202636;
      color: #f5f6fa;
      padding: 32px 0 0 0;
      position: fixed;
      left: 0;
      top: 0;
      box-shadow: 2px 0 12px #0004;
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-right: 1px solid #2e3440;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 18px;
      width: 100%;
    }
    a {
      color: #e0e6ed;
      text-decoration: none;
      font-size: 1.1rem;
      padding: 12px 32px;
      border-left: 4px solid transparent;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
      background: transparent;
      letter-spacing: 0.5px;
    }
    a.active, a:hover {
      background: #2e3440;
      color: #fff;
      border-left: 4px solid #6ea8fe;
    }
    .logout {
      color: #ff6b6b;
      margin-top: 2rem;
      cursor: pointer;
      font-weight: 500;
    }
    .logout:hover {
      background: #2e3440;
      color: #fff;
    }
    @media (max-width: 900px) {
      .sidebar {
        width: 100vw;
        min-height: unset;
        position: static;
        flex-direction: row;
        padding: 0;
        box-shadow: none;
        border-right: none;
        border-bottom: 1px solid #2e3440;
      }
      nav {
        flex-direction: row;
        gap: 0;
        width: 100vw;
        justify-content: space-around;
      }
      a {
        padding: 10px 8px;
        font-size: 1rem;
        border-left: none;
        border-bottom: 2px solid transparent;
      }
      a.active, a:hover {
        border-left: none;
        border-bottom: 2px solid #6ea8fe;
      }
    }
  `],
  standalone: true,
  imports: [RouterModule]
})
export class SidebarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }
}
