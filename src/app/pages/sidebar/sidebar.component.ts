import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  //Menu de confifuracion
  menuConfiguracionesAbierto: boolean = false;

  sidebar: any;
  nombreRol: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  //HTML objects
  btnConfiguracion: any;
  btnConfiguracionMobile: any;

  ngOnInit(): void {
    this.authService.obtenerSidebar().subscribe(resp => {
      this.sidebar = resp.lista;
      this.nombreRol = resp.nombreRol;
    });
  }

  Logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  changeComponent(url: string, id: string) {
    let sideButtonUsuario = document.querySelector(`#sidebuttonusuario`);
    let sideButton = document.querySelector(`#sidebutton${id}`);
    if (id == 'usuario') {
      sideButtonUsuario?.classList.add('text-yellow-400');
    } else {
      sideButton?.classList.add('text-yellow-400');
    }
    for (let i = 0; i < this.sidebar.length; i++) {
      const element = this.sidebar[i];
      sideButton = document.querySelector(`#sidebutton${element.id}`);
      if (element.id != id) {
        sideButton?.classList.remove('text-yellow-400');
      } else if (id != 'usuario') {
        sideButtonUsuario?.classList.remove('text-yellow-400');
      }
    }
    if (this.menuConfiguracionesAbierto === true) {
      for (let i = 0; i < this.sidebar[1].submenus.length; i++) {
        const element = this.sidebar[1].submenus[i];
        sideButton = document.querySelector(`#sidebutton${element.subId}`);
        if (element.subId != id) {
          sideButton?.classList.remove('text-yellow-400');
        } else if (id != 'usuario') {
          sideButtonUsuario?.classList.remove('text-yellow-400');
        }
      }
    }
    this.router.navigate([url]);
  }

  openMenu(id: string) {
    let sideButtonUsuario = document.querySelector(`#sidebuttonusuario`);
    let sideButton = document.querySelector(`#sidebutton${id}`);
    if (id == 'usuario') {
      sideButtonUsuario?.classList.add('text-yellow-400');
    } else {
      sideButton?.classList.add('text-yellow-400');
    }
    for (let i = 0; i < this.sidebar.length; i++) {
      const element = this.sidebar[i];
      sideButton = document.querySelector(`#sidebutton${element.id}`);
      if (element.id != id) {
        sideButton?.classList.remove('text-yellow-400');
      } else if (id != 'usuario') {
        sideButtonUsuario?.classList.remove('text-yellow-400');
      }
    }
    this.btnConfiguracion = document.querySelector('#arrow');
    this.btnConfiguracionMobile = document.querySelector('#arrowMobile');
    if (this.btnConfiguracion.classList.contains('rotate-90') || this.btnConfiguracionMobile.classList.contains('rotate-90')) {
      this.btnConfiguracion.classList.remove('rotate-90');
      this.btnConfiguracionMobile.classList.remove('rotate-90');
      sideButton?.classList.remove('text-yellow-400');
      this.menuConfiguracionesAbierto = false;
    } else {
      this.btnConfiguracion.classList.add('rotate-90');
      this.btnConfiguracion.classList.add('transition');
      this.btnConfiguracionMobile.classList.add('rotate-90');
      this.btnConfiguracionMobile.classList.add('transition');
      this.menuConfiguracionesAbierto = true;
    }
  }

}
