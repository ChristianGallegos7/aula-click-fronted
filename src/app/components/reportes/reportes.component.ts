import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SidebarComponent } from '../shared/sidebar.component';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  PieController, // <-- IMPORTANTE
} from 'chart.js';
import { UsersService } from '../../services/users.service';
import { CursosService } from '../../services/cursos.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [SidebarComponent, BaseChartDirective],
  template: `
    <div class="layout">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <h2>Reportes</h2>
        <div class="charts-container">
          <div class="chart-card">
            <h3>Usuarios por rol</h3>
            <canvas baseChart
              [data]="usuariosPorRolData"
              type="pie"
              [options]="pieChartOptions"
              [plugins]="pieChartPlugins">
            </canvas>
          </div>
          <div class="chart-card">
            <h3>Materias registradas</h3>
            <canvas baseChart
              [data]="materiasData"
              type="pie"
              [options]="pieChartOptions"
              [plugins]="pieChartPlugins">
            </canvas>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    h2 { margin-bottom: 1.5rem; color: #1976d2; }
    .layout { display: flex; min-height: 100vh; }
    .main-content { flex: 1; margin-left: 220px; padding: 32px 24px; background: #fff; color: #222; }
    .charts-container { display: flex; gap: 32px; flex-wrap: wrap; justify-content: flex-start; }
    .chart-card {
      background: #f4f8ff;
      border-radius: 14px;
      box-shadow: 0 2px 12px #1976d211;
      padding: 28px 18px 18px 18px;
      max-width: 420px;
      min-width: 320px;
      margin-bottom: 32px;
      flex: 1 1 340px;
    }
    .chart-card h3 {
      color: #1976d2;
      text-align: center;
      margin-bottom: 18px;
      font-size: 1.15rem;
      font-weight: 600;
    }
    @media (max-width: 900px) {
      .layout { flex-direction: column; }
      .main-content { margin-left: 0; padding: 16px 4px; }
      .charts-container { flex-direction: column; gap: 18px; }
    }
  `]
})
export class ReportesComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  usuariosPorRolData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [] };
  materiasData: ChartData<'pie', number[], string | string[]> = { labels: [], datasets: [] };

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#1976d2', font: { size: 15 } }
      }
    }
  };
  pieChartPlugins = [];

  constructor(
    private usersService: UsersService,
    private cursosService: CursosService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Registrar los elementos y el controlador SOLO en el navegador (evita errores con SSR)
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(PieController, ArcElement, Tooltip, Legend);
    }
  }

  ngOnInit() {
    this.loadUsuariosPorRol();
    this.loadMaterias();
  }

  loadUsuariosPorRol() {
    this.usersService.getAll().pipe(take(1)).subscribe(users => {
      const rolesCount: Record<string, number> = {};
      users.forEach(u => {
        rolesCount[u.rol] = (rolesCount[u.rol] ?? 0) + 1;
      });

      const labels = Object.keys(rolesCount);
      const data = Object.values(rolesCount);

      this.usuariosPorRolData = {
        labels,
        datasets: [{
          data,
          backgroundColor: this.colorsFor(labels.length)
        }]
      };

      this.chart?.update();
    });
  }

  loadMaterias() {
    this.cursosService.getCursos().pipe(take(1)).subscribe(materias => {
      const labels = materias.map(m => m.nombre);

      this.materiasData = {
        labels,
        datasets: [{
          data: labels.map(() => 1),
          backgroundColor: this.colorsFor(labels.length)
        }]
      };

      this.chart?.update();
    });
  }

  /** Devuelve una paleta de N colores (recicla si N > base.length) */
  private colorsFor(n: number): string[] {
    const base = ['#1976d2','#388e3c','#fbc02d','#d32f2f','#7b1fa2','#0288d1','#ffa000','#455a64','#8d6e63','#5e35b1'];
    const out: string[] = [];
    for (let i = 0; i < n; i++) out.push(base[i % base.length]);
    return out;
  }
}
