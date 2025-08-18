import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService, User } from '../../services/users.service';
import { RolesService, Role } from '../../services/roles.service';
import { RepresentantesService, Representante } from '../../services/representantes.service';
import { SidebarComponent } from '../shared/sidebar.component';
import { CursosService, Curso } from '../../services/cursos.service';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrls: ['./admin-usuarios.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent]
})
export class AdminUsuariosComponent implements OnInit {
  editingUser: User | null = null;
  editLoading = false;
  editError = '';
  cursos: Curso[] = [];
  cursosLoading = false;
  cursosSeleccionados: string[] = [];

  editUser(user: User) {
    // Clonar para no modificar el array hasta guardar
    this.editingUser = { ...user };
    this.editError = '';
  }

  cancelEdit() {
    this.editingUser = null;
    this.editError = '';
  }

  saveEdit() {
    if (!this.editingUser) return;
    this.editLoading = true;
    this.editError = '';
    // Enviar solo los campos requeridos por el DTO UserEditDto
    const userToSend = {
      id: this.editingUser.id,
      nombre: this.editingUser.nombre,
      apellido: this.editingUser.apellido,
      email: this.editingUser.email,
      rol: this.editingUser.rol,
      activo: this.editingUser.activo
    };
    this.usersService.update(userToSend.id, userToSend).subscribe({
      next: updated => {
        this.editLoading = false;
        this.editingUser = null;
        this.fetchUsers();
      },
      error: err => {
        this.editLoading = false;
        this.editError = 'No se pudo guardar los cambios';
      }
    });
  }
  users: User[] = [];
  loading = false;
  error = '';

  // Estado para agregar usuario
  addingUser = false;
  addLoading = false;
  addError = '';
  newUser: any = { Nombre: '', Apellido: '', Email: '', Rol: '', Activo: true };
  guardian: any = { nombre: '', apellido: '', email: '' };
  representantes: Representante[] = [];
  representanteSeleccionado: string = '';
  crearNuevoTutor = false;
  roles: Role[] = [];
  rolesLoading = false;

  constructor(
    private usersService: UsersService,
    private rolesService: RolesService,
    private representantesService: RepresentantesService,
    private cursosService: CursosService
  ) {}
  openAddUserModal() {
    this.addingUser = true;
    this.addError = '';
    this.newUser = { Nombre: '', Apellido: '', Email: '', Rol: '', Activo: true };
    this.guardian = { nombre: '', apellido: '', email: '' };
    this.representanteSeleccionado = '';
    this.crearNuevoTutor = false;
    this.newUser.Rol = '';
    this.cursosSeleccionados = [];
    this.loadRoles();
    this.loadRepresentantes();
    this.loadCursos();
  }

  loadCursos() {
    this.cursosLoading = true;
    this.cursosService.getCursos().subscribe({
      next: cursos => {
        this.cursos = cursos;
        this.cursosLoading = false;
      },
      error: () => {
        this.cursos = [];
        this.cursosLoading = false;
      }
    });
  }

  loadRepresentantes() {
    this.representantes = [];
    this.representantesService.getAll().subscribe({
      next: reps => this.representantes = reps,
      error: () => this.representantes = []
    });
  }


  cancelAddUser() {
    this.addingUser = false;
    this.addError = '';
  }

  loadRoles() {
    this.rolesLoading = true;
    this.rolesService.getAll().subscribe({
      next: roles => {
        
        this.roles = roles;
        console.log(this.roles);
        this.rolesLoading = false;
      },
      error: () => {
        this.roles = [];
        this.rolesLoading = false;
      }
    });
  }

  async saveAddUser() {
    if (!this.newUser.Nombre || !this.newUser.Apellido || !this.newUser.Email || !this.newUser.Rol) {
      this.addError = 'Completa todos los campos obligatorios y selecciona un rol.';
      return;
    }
    if (this.newUser.Rol === 'Estudiante') {
      if (!this.crearNuevoTutor && !this.representanteSeleccionado) {
        this.addError = 'Selecciona o crea un tutor.';
        return;
      }
      if (this.crearNuevoTutor && (!this.guardian.nombre || !this.guardian.apellido || !this.guardian.email)) {
        this.addError = 'Completa los datos del tutor.';
        return;
      }
    }
    this.addLoading = true;
    this.addError = '';
    let representanteId = '';
    if (this.newUser.Rol === 'Estudiante') {
      if (this.crearNuevoTutor) {
        // Crear el representante primero
        try {
          const rep = await this.representantesService.create({
            nombre: this.guardian.nombre,
            apellido: this.guardian.apellido,
            email: this.guardian.email,
            preferenciaNotificaciones: '',
            activo: true
          }).toPromise();
          if (!rep || !rep.id) {
            throw new Error('Respuesta inválida del backend al crear tutor');
          }
          representanteId = rep.id;
          // Refrescar lista de representantes
          this.loadRepresentantes();
        } catch (e) {
          this.addLoading = false;
          this.addError = 'No se pudo crear el tutor';
          return;
        }
      } else {
        representanteId = this.representanteSeleccionado;
      }
    }
    let payload: any = {
      nombre: this.newUser.Nombre,
      apellido: this.newUser.Apellido,
      email: this.newUser.Email,
      rol: this.newUser.Rol,
      activo: this.newUser.Activo
    };
    if (this.newUser.Rol === 'Estudiante') {
      payload.representanteId = representanteId;
      payload.cursosIds = this.cursosSeleccionados;
    }
    this.usersService.create(payload).subscribe({
      next: () => {
        this.addLoading = false;
        this.addingUser = false;
        this.fetchUsers();
      },
      error: err => {
        this.addLoading = false;
        this.addError = 'No se pudo crear el usuario';
      }
    });
  }

  getSelectedRoleName(): string {
    return this.newUser.Rol || '';
  }



  ngOnInit() {
    this.fetchUsers();
    this.loadRepresentantes();
    this.loadCursos();
  }

  fetchUsers() {
    this.loading = true;
    this.usersService.getAll().subscribe({
      next: users => {
        this.users = users;
        console.log(this.users);
        console.log(this.users)
        this.loading = false;
      },
      error: err => {
        this.error = 'Error al cargar usuarios';
        this.loading = false;
      }
    });
  }

  deleteUser(user: User) {
    if (!confirm(`¿Eliminar usuario ${user.nombre || user.email}?`)) return;
  this.usersService.delete(user.id).subscribe({
      next: () => this.fetchUsers(),
      error: () => alert('No se pudo eliminar el usuario')
    });
  }

  getRolesString(user: User): string {
    return user.rol || '';
  }
}
