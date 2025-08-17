
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService, User } from '../../services/users.service';
import { RolesService, Role } from '../../services/roles.service';
import { SidebarComponent } from '../shared/sidebar.component';

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
      Id: this.editingUser.Id,
      Nombre: this.editingUser.nombre,
      Apellido: this.editingUser.apellido,
      Email: this.editingUser.email,
      Rol: this.editingUser.rol, // O ajusta si roles es string o array
      Activo: this.editingUser.activo
    };
    this.usersService.update(this.editingUser.Id, userToSend).subscribe({
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
  guardian: any = { firstName: '', lastName: '', email: '', phoneNumber: '' };
  roles: Role[] = [];
  rolesLoading = false;
  selectedRoleId: string | null = null;

  constructor(private usersService: UsersService, private rolesService: RolesService) {}
  openAddUserModal() {
    this.addingUser = true;
    this.addError = '';
  this.newUser = { Nombre: '', Apellido: '', Email: '', Rol: '', Activo: true };
    this.guardian = { firstName: '', lastName: '', email: '', phoneNumber: '' };
    this.selectedRoleId = null;
    this.loadRoles();
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
        this.rolesLoading = false;
      },
      error: () => {
        this.roles = [];
        this.rolesLoading = false;
      }
    });
  }

  saveAddUser() {
    if (!this.newUser.Nombre || !this.newUser.Apellido || !this.newUser.Email || !this.newUser.Rol) {
      this.addError = 'Completa todos los campos obligatorios y selecciona un rol.';
      return;
    }
    this.addLoading = true;
    this.addError = '';
    const userToSend = {
      nombre: this.newUser.Nombre,
      apellido: this.newUser.Apellido,
      email: this.newUser.Email,
      rol: this.newUser.Rol,
      activo: this.newUser.Activo
    };
    this.usersService.create(userToSend).subscribe({
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
    const role = this.roles.find(r => r.roleId === this.selectedRoleId);
    return role ? role.name : '';
  }

  getGuardianRoleId(): string | null {
    const guardianRole = this.roles.find(r => r.name === 'Guardian');
    return guardianRole ? guardianRole.roleId : null;
  }

  ngOnInit() {
    this.fetchUsers();
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
    this.usersService.delete(user.Id).subscribe({
      next: () => this.fetchUsers(),
      error: () => alert('No se pudo eliminar el usuario')
    });
  }

  getRolesString(user: User): string {
    return user.rol || '';
  }
}
