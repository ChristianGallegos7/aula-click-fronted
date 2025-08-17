import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, MeResponse } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false]
  });

  showPassword = false;
  loading = false;
  error = '';

  onSubmit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const { email, password, remember } = this.form.value;

    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        console.log('Respuesta del login:', res);

        let roles = res.roles;
        if (!roles || roles.length === 0) {
          const tokenPayload = this.auth.tokenPayload;
          console.log('Token payload:', tokenPayload);
          roles = ([] as string[]).concat(tokenPayload?.['role'] || []).concat(tokenPayload?.['roles'] || []);
        }

        console.log('Roles finales:', roles);

        // Si hay más de un rol, podrías mostrar un selector de rol aquí
        let mainRole = null;
        if (roles && roles.length > 0) {
          // Prioridad: Administrador > Profesor > Representante > Estudiante
          if (roles.includes('Administrador')) mainRole = 'Administrador';
          else if (roles.includes('Profesor')) mainRole = 'Profesor';
          else if (roles.includes('Representante')) mainRole = 'Representante';
          else if (roles.includes('Estudiante')) mainRole = 'Estudiante';
          else mainRole = roles[0];
        }
        this.auth.mainRole = mainRole;
        // Redirigir según el rol principal
        switch (mainRole) {
          case 'Administrador':
            this.router.navigateByUrl('/admin/inicio');
            break;
          case 'Profesor':
            this.router.navigateByUrl('/profesor/inicio');
            break;
          case 'Representante':
            this.router.navigateByUrl('/representante/inicio');
            break;
          case 'Estudiante':
            this.router.navigateByUrl('/dashboard'); // O a la página de estudiante si existe
            break;
          default:
            this.router.navigateByUrl('/dashboard');
        }
      }
      ,
      error: (e) => {
        this.error = e?.error?.message || e?.message || 'Credenciales inválidas';
        this.loading = false;
      }
    });
  }
}
