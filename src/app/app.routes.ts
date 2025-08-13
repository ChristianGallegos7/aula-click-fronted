import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'notas', canActivate: [authGuard, roleGuard], data: { roles: ['Admin','Teacher'] }, loadComponent: () => import('./components/grades/grades.component').then(m => m.GradesComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: '' }
];
