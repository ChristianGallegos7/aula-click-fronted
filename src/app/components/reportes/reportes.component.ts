import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-reportes',
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <h2>Reportes</h2>
        <p>Aquí se mostrarán los reportes y estadísticas del sistema.</p>
      </div>
    </div>
  `,
  styles: [`
    h2 { margin-bottom: 1rem; }
    .layout { display: flex; min-height: 100vh; }
    .main-content { flex: 1; margin-left: 220px; padding: 32px 24px; background: #181f2a; color: #e0e6ed; }
    @media (max-width: 900px) {
      .layout { flex-direction: column; }
      .main-content { margin-left: 0; padding: 16px 4px; }
    }
  `],
  standalone: true,
  imports: [SidebarComponent]
})
export class ReportesComponent {}
