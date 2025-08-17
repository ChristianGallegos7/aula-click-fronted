import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-admin-inicio',
  standalone: true,
  imports: [SidebarComponent],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <header class="admin-header">
          <h1 style="color: aliceblue;">Panel de Administración</h1>
        </header>
        <main class="admin-content">
          <div class="welcome-card">
            <h2>Bienvenido, Administrador</h2>
            <p>Gestiona usuarios, cursos y configuraciones del sistema</p>
          </div>
          <div class="admin-actions">
            <div class="action-card">
              <h3>Gestión de Usuarios</h3>
              <p>Administrar profesores, estudiantes y representantes</p>
              <button class="action-btn" (click)="goToUsuarios()">Ir a Usuarios</button>
            </div>
            <div class="action-card">
              <h3>Gestión de Cursos</h3>
              <p>Crear y administrar cursos y materias</p>
              <button class="action-btn" (click)="goToCursos()">Ir a Cursos</button>
            </div>
            <div class="action-card">
              <h3>Reportes</h3>
              <p>Ver estadísticas y reportes del sistema</p>
              <button class="action-btn" (click)="goToReportes()">Ver Reportes</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout {
      display: flex;
      min-height: 100vh;
      background: #23283a;
    }
    .main-content {
      flex: 1;
      margin-left: 220px;
      padding: 40px 32px 32px 32px;
      background: linear-gradient(135deg, #262c3a 60%, #2e3440 100%);
      min-height: 100vh;
    }
    .admin-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      border-bottom: 1.5px solid #3a4256;
      padding-bottom: 12px;
    }
    .welcome-card {
      background: #f5f6fa;
      color: #23283a;
      padding: 24px 28px;
      border-radius: 12px;
      margin-bottom: 36px;
      box-shadow: 0 2px 16px #0001;
      border-left: 5px solid #6ea8fe;
    }
    .admin-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 28px;
    }
    .action-card {
      background: #fff;
      border: 1.5px solid #e0e6ed;
      border-radius: 10px;
      padding: 28px 22px 22px 22px;
      color: #23283a;
      box-shadow: 0 2px 12px #0001;
      transition: box-shadow 0.2s, border 0.2s;
      position: relative;
    }
    .action-card h3 {
      color: #22304a;
      margin-bottom: 10px;
      font-weight: 700;
    }
    .action-card p {
      color: #3a4256;
      margin-bottom: 18px;
    }
    .action-card:hover {
      box-shadow: 0 4px 24px #6ea8fe33;
      border: 1.5px solid #6ea8fe;
    }
    .action-btn {
      padding: 10px 24px;
      background: #6ea8fe;
      color: #fff;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      box-shadow: 0 1px 4px #0001;
      transition: background 0.2s, color 0.2s;
    }
    .action-btn:hover {
      background: #22304a;
      color: #6ea8fe;
      border: 1px solid #6ea8fe;
    }
    @media (max-width: 900px) {
      .layout { flex-direction: column; }
      .main-content { margin-left: 0; padding: 16px 4px; }
    }
  `]
})
export class AdminInicioComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }

  goToUsuarios() {
    this.router.navigateByUrl('/admin/usuarios');
  }

  goToCursos() {
    this.router.navigateByUrl('/cursos');
  }

  goToReportes() {
    this.router.navigateByUrl('/reportes');
  }
}
