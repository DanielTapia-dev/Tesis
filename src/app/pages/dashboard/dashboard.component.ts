import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadosService } from '../../services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService, private empleadosService: EmpleadosService) {
  }

  usuario: any;
  contraseniaUno: string = '';
  contraseniaDos: string = '';
  nuevaContrasenia: boolean = false;
  imagenSubir: any;

  ngOnInit(): void {
    this.cargarUsuario();
  }

  activarContrasenia() {
    if (this.nuevaContrasenia == true) {
      this.nuevaContrasenia = false;
    } else {
      this.nuevaContrasenia = true;
    }
  }

  cargarUsuario() {
    this.usuario = this.authService.usuario.usuario;
    setTimeout(() => {
      const imagen: any = document.getElementById("imagenEmpleado");
      imagen.src = this.usuario.foto;
    }, 300);
  }

  guardarDatos() {
    this.empleadosService.putEmpleado(this.usuario).subscribe(res => {
      Swal.fire({
        text: 'Datos actualizados correctamente',
        icon: 'success'
      })
    }, err => {
      Swal.fire({
        text: 'No se pudieron actualizar los datos',
        icon: 'error'
      })
    });
  }

  guardarNuevaContrasenia() {
    if (this.contraseniaUno == this.contraseniaDos) {
      this.nuevaContrasenia = false;
      Swal.fire({
        text: 'Si coinciden',
        icon: 'success'
      })
    }else {
      Swal.fire({
        text: 'No coinciden',
        icon: 'error'
      })
    }
  }

  cambiarImagen(file: any) {
    this.imagenSubir = 'nueva';
    const inputImagen: any = document.getElementById("inputImagen");
    let fileNueva: any = inputImagen.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const imagen: any = document.getElementById("imagenEmpleado");
      imagen.src = event.target.result;
      this.imagenSubir = event.target.result;
      this.usuario.foto = this.imagenSubir;
    });
    reader.readAsDataURL(fileNueva);
  }
}
