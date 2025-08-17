import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.css'
})
export class GradesComponent {}
