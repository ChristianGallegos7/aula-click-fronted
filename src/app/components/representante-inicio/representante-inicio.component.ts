import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-representante-inicio',
  standalone: true,
  template: `
    <div class="representante-container">
      <header class="representante-header">
        <h1>Portal del Representante</h1>
        <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
      </header>
      
      <main class="representante-content">
        <div class="welcome-card">
          <h2>Bienvenido, Representante</h2>
          <p>Consulta el progreso académico de tus representados</p>
        </div>
        
        <div class="representante-actions">
          <div class="action-card">
            <h3>Mis Representados</h3>
            <p>Ver información de estudiantes a cargo</p>
            <button class="action-btn">Ver Representados</button>
          </div>
          
          <div class="action-card">
            <h3>Calificaciones</h3>
            <p>Consultar notas y evaluaciones</p>
            <button class="action-btn">Ver Notas</button>
          </div>
          
          <div class="action-card">
            <h3>Asistencia</h3>
            <p>Revisar registro de asistencia</p>
            <button class="action-btn">Ver Asistencia</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .representante-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .representante-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .logout-btn { padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .welcome-card { background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .representante-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .action-card { background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; }
    .action-btn { padding: 10px 20px; background: #ffc107; color: #212529; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class RepresentanteInicioComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }
}
