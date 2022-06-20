import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  sidebar: any;
  nombreRol: string = '';

  constructor(private router: Router, private authService: AuthService) { }

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
    this.router.navigate([url]);
  }

}
