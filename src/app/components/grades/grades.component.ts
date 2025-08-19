import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../shared/sidebar.component';
import { CursosService, Curso } from '../../services/cursos.service';
import { UsersService, User } from '../../services/users.service';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent implements OnInit {
  cursos: Curso[] = [];
  profesores: User[] = [];
  loading = false;
  error = '';
  adding = false;
  editing: Curso | null = null;
  form: Partial<Curso> = { nombre: '', profesorId: '' };

  constructor(private cursosService: CursosService, private usersService: UsersService) {}

  ngOnInit() {
    this.fetchProfesores();
    this.fetchCursos();
  }

  fetchProfesores() {
    this.usersService.getAll().subscribe({
      next: users => {
        this.profesores = users.filter(u => u.rol && u.rol.toLowerCase() === 'profesor');
      },
      error: () => {
        this.profesores = [];
      }
    });
  }

  fetchCursos() {
    this.loading = true;
    this.cursosService.getCursos().subscribe({
      next: cursos => {
        this.cursos = cursos;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar materias';
        this.loading = false;
      }
    });
  }

  startAdd() {
    this.adding = true;
    this.editing = null;
    this.form = { nombre: '', profesorId: this.profesores.length ? this.profesores[0].id : '' };
  }

  startEdit(curso: Curso) {
    this.editing = { ...curso };
    this.adding = false;
    this.form = { nombre: curso.nombre, profesorId: curso.profesorId };
  }

  getProfesorNombre(id: string | undefined) {
    const prof = this.profesores.find(p => p.id === id);
    return prof ? prof.nombre + ' ' + prof.apellido : id || '';
  }

  cancel() {
    this.adding = false;
    this.editing = null;
    this.form = { nombre: '', profesorId: '' };
    this.error = '';
  }

  save() {
    if (!this.form.nombre || !this.form.profesorId) {
      this.error = 'Completa todos los campos';
      return;
    }
    if (this.editing) {
  this.cursosService.update(this.editing.id, this.form).subscribe({
        next: () => {
          this.cancel();
          this.fetchCursos();
        },
        error: () => this.error = 'No se pudo actualizar la materia'
      });
    } else {
  this.cursosService.create(this.form).subscribe({
        next: () => {
          this.cancel();
          this.fetchCursos();
        },
        error: () => this.error = 'No se pudo crear la materia'
      });
    }
  }

  delete(curso: Curso) {
    if (!confirm(`¿Eliminar materia ${curso.nombre}?`)) return;
  this.cursosService.delete(curso.id).subscribe({
      next: () => this.fetchCursos(),
      error: () => this.error = 'No se pudo eliminar la materia'
    });
  }
}
