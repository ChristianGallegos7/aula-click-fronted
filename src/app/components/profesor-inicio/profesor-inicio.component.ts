import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesor-inicio',
  standalone: true,
  template: `
    <div class="profesor-container">
      <header class="profesor-header">
        <h1>Portal del Profesor</h1>
        <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
      </header>
      
      <main class="profesor-content">
        <div class="welcome-card">
          <h2>Bienvenido, Profesor</h2>
          <p>Gestiona tus clases, estudiantes y calificaciones</p>
        </div>
        
        <div class="profesor-actions">
          <div class="action-card">
            <h3>Mis Clases</h3>
            <p>Ver y gestionar las clases asignadas</p>
            <button class="action-btn">Ver Clases</button>
          </div>
          
          <div class="action-card">
            <h3>Estudiantes</h3>
            <p>Lista de estudiantes y seguimiento</p>
            <button class="action-btn">Ver Estudiantes</button>
          </div>
          
          <div class="action-card">
            <h3>Calificaciones</h3>
            <p>Registrar y consultar notas</p>
            <button class="action-btn">Gestionar Notas</button>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .profesor-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
    .profesor-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .logout-btn { padding: 8px 16px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .welcome-card { background: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
    .profesor-actions { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
    .action-card { background: white; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px; }
    .action-btn { padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; }
  `]
})
export class ProfesorInicioComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('auth_token');
    sessionStorage.removeItem('auth_token');
    this.router.navigateByUrl('/login');
  }
}
