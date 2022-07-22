import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { resolve } from 'dns';
import { EspecialidadModel } from 'src/app/models/especialidad';
import { SucursalModel } from 'src/app/models/sucursal';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { environment } from 'src/environments/environment';
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
    id_especialidad_per: ['', Validators.required],
    id_sucursal_per: ['', Validators.required],
    titulo_abreviado: ['', Validators.required],
    foto: [environment.imagenUser],
    password: [''],
    email: ['', [Validators.required, Validators.email]],
    titulo: ['', Validators.required],
  })

  pathFoto: any = '';
  imagenSubir: any = '';
  especialidades: EspecialidadModel[] = [];
  sucursales: SucursalModel[] = [];

  //Objetos HTML
  inputPass: any;
  inputUsuario: any;
  labelDatosUsuario: any;
  labelCopiarDatos: any;
  btnNuevoEmpleado: any;
  btnAgregarEmpleado: any;

  constructor(private formBuilder: FormBuilder, private empleadosService: EmpleadosService, private especialidadService: EspecialidadService, private sucursalesService: SucursalService) { }

  ngOnInit(): void {
    this.inputPass = document.querySelector('#inputPass');
    this.inputUsuario = document.querySelector('#inputUsuario');
    this.labelDatosUsuario = document.querySelector('#labelDatosUsuario');
    this.labelCopiarDatos = document.querySelector('#labelCopiarDatos');
    this.btnNuevoEmpleado = document.querySelector('#btnNuevoEmpleado');
    this.btnAgregarEmpleado = document.querySelector('#btnAgregarEmpleado');

    //Cargando listas iniciales para nuevo empleado
    this.cargarEspecialidad();
    this.cargarSucursales();
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

  cargarEspecialidad() {
    this.especialidadService.obtenerEspecialidades().subscribe(resp => {
      this.especialidades = resp;
    });
  }

  cargarSucursales() {
    this.sucursalesService.obtenerSucursales().subscribe(resp => {
      this.sucursales = resp;
    })
  }

  guardar() {
    console.log(this.empleadoFormulario.value);
    if (this.empleadoFormulario.invalid) {
      this.empleadoFormulario.markAllAsTouched();
      return;
    }
    if (this.imagenSubir != '') {
      this.empleadoFormulario.patchValue({
        foto: this.imagenSubir
      });
    }
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
