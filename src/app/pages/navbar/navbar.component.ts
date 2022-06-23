import { Component, OnInit } from '@angular/core';
import { EmpleadoModel } from 'src/app/models/empleado';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  sidebar: any;
  sidebarMobile: any;
  usuarioActual: EmpleadoModel = new EmpleadoModel();

  ngOnInit(): void {
    this.sidebar = document.querySelector('aside');
    this.sidebarMobile = document.querySelector('#sidebarMobile');
    this.usuarioActual = this.authService.usuario.usuario;
  }

  hiddenSidebar() {
    if (this.sidebar.classList.contains('sm:block')) {
      this.sidebar.classList.replace('sm:block', 'sm:hidden');
    } else {
      this.sidebar.classList.replace('sm:hidden', 'sm:block');
    }
    if (this.sidebarMobile.classList.contains('hidden')) {
      this.sidebarMobile.classList.remove('hidden');
    } else {
      this.sidebarMobile.classList.add('hidden');
    }
  }

}
