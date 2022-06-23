import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { resolve } from 'dns';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  //Formularios
  empleadoFormulario = this.formBuilder.group({
    nombre1: ['', Validators.required],
    nombre2: [''],
    apellido1: ['', Validators.required],
    apellido2: [''],
    tipo: ['', Validators.required],
    titulo_abreviado: ['', Validators.required],
    foto: [''],
    password: [''],
    email: ['', [Validators.required, Validators.email]],
    titulo: ['', Validators.required],
  })

  pathFoto: any = '';
  imagenSubir: any = '';

  //Objetos HTML
  inputPass: any;
  inputUsuario: any;
  labelDatosUsuario: any;
  labelCopiarDatos: any;
  btnNuevoEmpleado: any;
  btnAgregarEmpleado: any;

  constructor(private formBuilder: FormBuilder, private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.inputPass = document.querySelector('#inputPass');
    this.inputUsuario = document.querySelector('#inputUsuario');
    this.labelDatosUsuario = document.querySelector('#labelDatosUsuario');
    this.labelCopiarDatos = document.querySelector('#labelCopiarDatos');
    this.btnNuevoEmpleado = document.querySelector('#btnNuevoEmpleado');
    this.btnAgregarEmpleado = document.querySelector('#btnAgregarEmpleado');
  }

  copiarPass() {
    this.inputPass.select();
    document.execCommand("copy");
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
    });
    reader.readAsDataURL(fileNueva);
  }

  campoEsValido(campo: string) {
    return this.empleadoFormulario.controls[campo].errors && this.empleadoFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.empleadoFormulario.invalid) {
      this.empleadoFormulario.markAllAsTouched();
      return;
    }
    this.empleadoFormulario.patchValue({
      foto: this.imagenSubir
    });
    this.empleadosService.postEmpleado(this.empleadoFormulario.value).subscribe(resp => {
      this.inputPass.value = resp.password;
      this.inputUsuario.value = resp.usuario;
      this.labelCopiarDatos.classList.remove('hidden');
      this.labelDatosUsuario.classList.add('hidden');
      this.btnAgregarEmpleado.classList.add('hidden');
      this.btnNuevoEmpleado.classList.remove('hidden');
      Swal.fire('Correcto', 'campo creado correctamente', 'success');
    })
  }

  nuevoEmpleado() { }
}
