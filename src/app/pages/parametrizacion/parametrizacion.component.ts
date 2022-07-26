import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CondicionService } from 'src/app/services/condicion.service';
import { CronologiaService } from 'src/app/services/cronologia.service';
import { SucursalService } from 'src/app/services/sucursal.service';
import { TipoService } from 'src/app/services/tipo.service';

@Component({
  selector: 'app-parametrizacion',
  templateUrl: './parametrizacion.component.html',
  styleUrls: ['./parametrizacion.component.css']
})
export class ParametrizacionComponent implements OnInit {

  pageActual: any = 1;
  maxPage: number = 30;

  //Formularios
  sucursalFormulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    direccion: [''],
    estado: ['', Validators.required]
  })

  cronologiaFormulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    estado: [true]
  })

  condicionFormulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    estado: [true]
  })

  tipoFormulario = this.formBuilder.group({
    nombre: ['', Validators.required],
    estado: [true]
  })

  //Variables HTML
  Sucursales: any;
  Cronologias: any;
  Condiciones: any;
  Tipo: any;

  //Listas
  sucursales: any = [];
  cronologias: any = [];
  condiciones: any = [];
  tipos: any = [];


  constructor(private formBuilder: FormBuilder, private sucursalesService: SucursalService, private cronologiaService: CronologiaService, private condicionService: CondicionService, private tipoService: TipoService) { }

  ngOnInit(): void {
    this.Sucursales = document.querySelector('#Sucursales');
    this.Cronologias = document.querySelector('#Cronologias');
    this.Condiciones = document.querySelector('#Condiciones');
    this.Tipo = document.querySelector('#Tipo');
  }

  interfazSucursal() {
    this.Sucursales.classList.remove('hidden');
    this.Cronologias.classList.add('hidden');
    this.Condiciones.classList.add('hidden');
    this.Tipo.classList.add('hidden');
    this.cargarSucursales();
  }

  interfazCronologia() {
    this.Sucursales.classList.add('hidden');
    this.Cronologias.classList.remove('hidden');
    this.Condiciones.classList.add('hidden');
    this.Tipo.classList.add('hidden');
    this.cargarCronologia();
  }

  interfazCondicion() {
    this.Sucursales.classList.add('hidden');
    this.Cronologias.classList.add('hidden');
    this.Condiciones.classList.remove('hidden');
    this.Tipo.classList.add('hidden');
    this.cargarCondiciones();
  }

  interfazTipo() {
    this.Sucursales.classList.add('hidden');
    this.Cronologias.classList.add('hidden');
    this.Condiciones.classList.add('hidden');
    this.Tipo.classList.remove('hidden');
    this.cargarTipos();
  }

  cargarSucursales() {
    this.sucursalesService.obtenerSucursales().subscribe(resp => {
      this.sucursales = resp;
      console.log(this.sucursales);
    });
  };

  cargarCronologia() {
    this.cronologiaService.getCronologiasActivas().subscribe(resp => {
      this.cronologias = resp;
      console.log(resp);
    });
  }

  cargarCondiciones() {
    this.condicionService.getCondiciones().subscribe(resp => {
      this.condiciones = resp;
    });
  }

  cargarTipos() {
    this.tipoService.getTipos().subscribe(resp => {
      this.tipos = resp;
    });
  }

  guardarSucursal() {

  }
}
