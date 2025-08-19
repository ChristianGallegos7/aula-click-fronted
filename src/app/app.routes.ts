import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';


export const routes: Routes = [
  { path: 'admin/reportes', loadComponent: () => import('./components/reportes/reportes.component').then(m => m.ReportesComponent) },
  { path: 'login', component: LoginComponent },
  { path: 'admin/inicio', loadComponent: () => import('./components/admin-inicio/admin-inicio.component').then(m => m.AdminInicioComponent) },
  { path: 'admin/usuarios', loadComponent: () => import('./components/admin-usuarios/admin-usuarios.component').then(m => m.AdminUsuariosComponent) },
  { path: 'profesor/inicio', loadComponent: () => import('./components/profesor-inicio/profesor-inicio.component').then(m => m.ProfesorInicioComponent) },
  { path: 'representante/inicio', loadComponent: () => import('./components/representante-inicio/representante-inicio.component').then(m => m.RepresentanteInicioComponent) },
  { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'admin/cursos', loadComponent: () => import('./components/grades/grades.component').then(m => m.GradesComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: '' }
];
