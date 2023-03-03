import { Component, OnInit } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { Cliente } from 'src/app/models/clientes';
import { Consulta, ConsultaModel } from 'src/app/models/consulta';
import { CondicionService } from 'src/app/services/condicion.service';
import { ConsultasService } from 'src/app/services/consultas.service';
import { CronologiaService } from 'src/app/services/cronologia.service';
import { DiagnosticosService } from 'src/app/services/diagnosticos.service';
import { HistoriasService } from 'src/app/services/historias.service';
import { PacientesService } from 'src/app/services/pacientes.service';
import { TipoService } from 'src/app/services/tipo.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {


  clienteSeleccionado: any = {
    cedruc: '',
    descrip: '',
    direcci: '',
    email1: '',
    seq_ciu: '',
    telefon1: ''
  };
  historiaSeleccionada: any = {
    nrohistoria: '',
    descrip: '',
    sexo: '',
    discapacidad: '',
    fechanac: '',
  };
  historiaBasePropia: any = {

  };
  buscadorCedula: boolean = true;
  buscadorNombre: boolean = false;
  inputBuscadorCedula: any;
  inputBuscadorNombre: any;
  pageActual: any = 1;
  maxPage: number = 30;
  clientes: Cliente[] = [];
  ciuCliente: any = '';
  cliente: any = {};
  consultas: Consulta[] = [];
  consultaActual: ConsultaModel = new ConsultaModel();
  edadActual: any;
  fechaConsultaActual: any;
  diagnosticoActual: any = {
    descripcion: ''
  };
  cronologiaActual: string = '';
  condicionActual: string = '';
  tipoActual: string = '';
  numeroConsultaActual: number = 0;

  //Objetos HTML
  checkCedula: any;
  checkNombre: any;
  selectTipoSangre: any;
  orientacionSexual: any;
  discapacidad: any;
  edad: any;
  edadNueva: any;
  btnAgregarConsulta: any;
  tablaNuevaConsulta: any;
  motivoConsulta: any;
  antecedentes: any;
  signosVitales: any;
  examenFisico: any;
  diagnostico: any;
  tratamiento: any;
  btnMontivoConsulta: any;
  btnAntecedentes: any;
  btnSignosVitales: any;
  btnExamenFisico: any;
  btnDiagnostico: any;
  btnTratamiento: any;
  tablaHistorial: any;
  vistaConsultaPaciente: any;
  vistaHistorialesPacientes: any;

  constructor(private pacientesService: PacientesService, private historiasService: HistoriasService, private consultasService: ConsultasService, private diagnosticosService: DiagnosticosService, private cronologiaService: CronologiaService,
    private condicionService: CondicionService, private tipoService: TipoService) { }

  ngOnInit(): void {
    this.checkCedula = document.querySelector('#cbox1');
    this.checkNombre = document.querySelector('#cbox2');
    this.btnAgregarConsulta = document.querySelector('#btnAgregarConsulta');
    this.tablaNuevaConsulta = document.querySelector('#tablaNuevaConsulta');
    this.motivoConsulta = document.querySelector('#motivoConsulta');
    this.antecedentes = document.querySelector('#antecedentes');
    this.signosVitales = document.querySelector('#signosVitales');
    this.examenFisico = document.querySelector('#examenFisico');
    this.diagnostico = document.querySelector('#diagnostico');
    this.tratamiento = document.querySelector('#tratamiento');
    this.btnMontivoConsulta = document.querySelector('#btnMontivoConsulta');
    this.btnAntecedentes = document.querySelector('#btnAntecedentes');
    this.btnSignosVitales = document.querySelector('#btnSignosVitales');
    this.btnExamenFisico = document.querySelector('#btnExamenFisico');
    this.btnDiagnostico = document.querySelector('#btnDiagnostico');
    this.btnTratamiento = document.querySelector('#btnTratamiento');
    this.tablaHistorial = document.querySelector('#tablaHistorial');
    this.vistaHistorialesPacientes = document.querySelector('#vistaHistorialesPacientes');
    this.vistaConsultaPaciente = document.querySelector('#vistaConsultaPaciente');
    console.log(this.historiaSeleccionada);
  }

  cargarClientes() {
    this.inputBuscadorCedula = document.querySelector('#inputBuscadorCedula');
    this.inputBuscadorNombre = document.querySelector('#inputBuscadorNombre');
    this.pageActual = 1;
    this.clientes = [];
    if (this.buscadorCedula == true) {
      let parametroBusqueda = this.inputBuscadorCedula.value;
      if (parametroBusqueda == '') {
        parametroBusqueda = 'vacio';
        this.pacientesService.getClientesCedula(parametroBusqueda).subscribe(resp => {
          this.clientes = resp;
        });
      } else {
        this.pacientesService.getClientesCedula(parametroBusqueda).subscribe(resp => {
          this.clientes = resp;
        });
      }
    } else if (this.buscadorNombre == true) {
      let parametroBusqueda = this.inputBuscadorNombre.value;
      parametroBusqueda = parametroBusqueda.toUpperCase();
      let parametroFinal = `CLi.descrip LIKE '%`;
      for (let index = 0; index < parametroBusqueda.length; index++) {
        const element = parametroBusqueda[index];
        if (element != ' ') {
          parametroFinal = parametroFinal + element;
        } else {
          parametroFinal = parametroFinal + `%' AND Cli.descrip LIKE '%`;
        }
      }
      parametroFinal = parametroFinal + `%'`;
      const formData = {
        condicion: parametroFinal
      }
      if (parametroBusqueda == '') {
        parametroBusqueda = 'vacio';
        this.pacientesService.getClientesNombre(formData).subscribe(resp => {
          this.clientes = resp;
        });
      } else {
        this.pacientesService.getClientesNombre(formData).subscribe(resp => {
          this.clientes = resp;
        });
      }
    }

  }

  onEnter() {
    this.cargarClientes();
    this.clienteSeleccionado = {
      cedruc: '',
      descrip: '',
      direcci: '',
      email1: '',
      seq_ciu: '',
      telefon1: ''
    };
  }

  cambiarBuscador(check: string) {
    switch (check) {
      case 'nombre':
        this.buscadorCedula = false;
        this.buscadorNombre = true;
        break;
      case 'cedula':
        this.buscadorCedula = true;
        this.buscadorNombre = false;
        break;
      default:
        break;
    }
  }

  cargarHistoria(ciu_per: number, cliente: any) {
    this.ciuCliente = ciu_per;
    this.cliente = cliente;
    this.pacientesService.getHistoriales(ciu_per).subscribe(resp => {
      console.log(resp);
      if (resp.length == 0) {
        this.clienteSeleccionado = {
          cedruc: '',
          descrip: '',
          direcci: '',
          email1: '',
          seq_ciu: '',
          telefon1: ''
        };
        this.historiaSeleccionada = {};
        Swal.fire('La historia clinica aún no ha sido creada', '', 'error');
      } else {
        this.clienteSeleccionado = cliente;
        this.historiaSeleccionada = resp[0];
        if (this.historiaSeleccionada.genero == 1) {
          this.historiaSeleccionada = {
            ...this.historiaSeleccionada,
            genero: 'Masculino'
          }
        } else {
          this.historiaSeleccionada = {
            ...this.historiaSeleccionada,
            genero: 'Femenino'
          }
        }
        console.log(this.historiaSeleccionada.fechanac);
        this.historiaBasePropia.grupo_sanguineo = '';
        this.historiasService.getHistoriasPorId(ciu_per).subscribe(respHistoriaPropia => {
          if (respHistoriaPropia.length == 0) {
            const formData = {
              ciu_per: ciu_per,
              nrohistoria: this.historiaSeleccionada.nrohistoria,
              sexo: this.historiaSeleccionada.genero,
              discapacidad: 'NO',
              orientacion_sexual: 'Heterosexual',
              grupo_sanguineo: 'NN',
              fecha_nacimiento: this.historiaSeleccionada.fechanac,
              nombre: this.clienteSeleccionado.descrip
            }
            console.log(formData);
            this.historiasService.postHistoria(formData).subscribe(respHistoria => {
              this.historiaBasePropia = respHistoria;
              this.selectTipoSangre = document.querySelector('#tipoSangre');
              this.selectTipoSangre.value = this.historiaBasePropia.grupo_sanguineo;
              this.orientacionSexual = document.querySelector('#orientacionSexual');
              this.orientacionSexual.value = this.historiaBasePropia.orientacion_sexual;
              this.discapacidad = document.querySelector('#discapacidad');
              this.discapacidad.value = this.historiaBasePropia.discapacidad;
              this.edadNueva = document.querySelector('#edad');
            });
          } else {
            this.historiaBasePropia = respHistoriaPropia[0];
            this.edadNueva = document.querySelector('#edad');
          }
          this.abrirTablaHistorial();
        })
      }
    })
  }

  abrirTablaHistorial() {
    this.consultasService.getConsultas(this.historiaBasePropia.id).subscribe(resp => {
      this.consultas = resp;
      this.tablaHistorial.classList.remove('hidden');
    })
  }

  peticionBorrar(idConsulta: number, fecha: any) {
    Swal.fire({
      title: `La solicitud de borrar debe ser aprobada por un administrador.`,
      text: '¿Esta seguro de enviar la solicitud?',
      showDenyButton: true,
      confirmButtonText: 'Enviar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      const formaData = {
        fecha: fecha,
        id_consulta_per: idConsulta
      }
      if (result.isConfirmed) {
        this.consultasService.getSolicitud(idConsulta).subscribe(res => {
          if (res.length == 0) {
            this.consultasService.postSolicitud(formaData).subscribe(res => {
              Swal.fire({
                text: 'La solicitud fue enviada, si es aprobada la consulta dejará de aparecer en el historial.',
                icon: 'success'
              })
            }, err => {
              Swal.fire({
                text: 'La solicitud no pudo ser enviada',
                icon: 'error'
              })
            });
          }
          Swal.fire({
            text: 'La solicitud ya existe, por favor contacte con soporte.',
            icon: 'info'
          })
        })
      } else if (result.isDenied) {
        this.cargarHistoria(this.ciuCliente, this.cliente);
        Swal.fire({
          text: 'La solicitud no fue enviada',
          icon: 'info'
        })
      }
    })
  }

  cargarConsulta(fecha: any, idConsulta: number, consulta: Consulta, index: number) {
    const moment = require('moment-timezone');
    let fechaConsulta = consulta.fecha;
    const opciones: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaComputador = moment();
    const fechaActualEcuador = fechaComputador.tz('America/Guayaquil').format('YYYY/MM/DD');
    let fechaActual = new Date(fechaActualEcuador);
    let fechaNacimiento = new Date(this.historiaSeleccionada.fechanac);
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    if (meses < 0 || (meses === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    this.fechaConsultaActual = fechaConsulta;
    this.consultasService.obtenerConsulta(consulta.id).subscribe(resp => {
      this.consultaActual = resp;
    });
    this.numeroConsultaActual = consulta.total - index;
    this.consultaActual.fecha = this.consultaActual.fecha[0] + this.consultaActual.fecha[1] + this.consultaActual.fecha[2] + this.consultaActual.fecha[3] + this.consultaActual.fecha[4] + this.consultaActual.fecha[5] + this.consultaActual.fecha[6]
      + this.consultaActual.fecha[7] + this.consultaActual.fecha[8] + this.consultaActual.fecha[9];
    this.vistaConsultaPaciente.classList.remove('hidden');
    this.vistaHistorialesPacientes.classList.add('hidden');
    this.diagnosticosService.getDescripcion(consulta.codigo_cie10_per).subscribe(resp => {
      this.diagnosticoActual = resp;
      console.log(this.diagnosticoActual);
    })
    this.cronologiaService.getCronologiaUnica(consulta.id_cronologia_per).subscribe(resp => {
      if (resp.length > 0) {
        this.cronologiaActual = resp[0].nombre;
      } else {
        this.cronologiaActual = '';
      }
    })
    this.condicionService.getCondicionUnica(consulta.id_condicion_per).subscribe(resp => {
      if (resp.length > 0) {
        this.condicionActual = resp[0].nombre;
      } else {
        this.condicionActual = '';
      }
    })
    this.tipoService.getTipoUnico(consulta.id_tipo_per).subscribe(resp => {
      if (resp.length > 0) {
        this.tipoActual = resp[0].nombre;
      } else {
        this.tipoActual = '';
      }
    })
  }



  imprimirPdf(fecha: any, idConsulta: number, consulta: Consulta, index: number) {
    const moment = require('moment-timezone');
    this.consultaActual = consulta;
    this.numeroConsultaActual = consulta.total - index;
    let fechaConsulta = consulta.fecha;
    const opciones: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaComputador = moment();
    const fechaActualEcuador = fechaComputador.tz('America/Guayaquil').format('YYYY/MM/DD');
    let fechaActual = new Date(fechaActualEcuador);
    let fechaNacimiento = new Date(this.historiaSeleccionada.fechanac);
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    let meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
    if (meses < 0 || (meses === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    this.edadActual = edad;
    this.fechaConsultaActual = this.consultaActual.fecha;
    let paginaUnica = 90;
    this.consultasService.obtenerConsulta(consulta.id).subscribe(resp => {
      this.consultaActual = resp;
      consulta = resp;
      this.diagnosticosService.getDescripcion(consulta.codigo_cie10_per).subscribe(resp => {
        this.diagnosticoActual = resp;
        console.log(this.diagnosticoActual);
        this.cronologiaService.getCronologiaUnica(consulta.id_cronologia_per).subscribe(resp => {
          if (resp.length > 0) {
            this.cronologiaActual = resp[0].nombre;
          } else {
            this.cronologiaActual = '';
          }
          this.condicionService.getCondicionUnica(consulta.id_condicion_per).subscribe(resp => {
            if (resp.length > 0) {
              this.condicionActual = resp[0].nombre;
            } else {
              this.condicionActual = '';
            }
            this.tipoService.getTipoUnico(consulta.id_tipo_per).subscribe(resp => {
              if (resp.length > 0) {
                this.tipoActual = resp[0].nombre;
              } else {
                this.tipoActual = '';
              }
              const dd: any = {
                footer: function (currentPage: any, pageCount: any) {
                  if (currentPage == pageCount) {
                    return [
                      {
                        table: {
                          widths: [190],
                          headerRows: 1,
                          body: [
                            [{ text: ``, style: 'tableHeader' }],
                            [{ text: `${consulta.empleado}\n${consulta.titulo}`, alignment: 'center', style: 'firma' }],
                          ]
                        },
                        layout: 'headerLineOnly',
                        margin: [205, 50, 0, 0]
                      },
                      {
                        text: `${currentPage.toString()} de ${pageCount}`,
                        style: 'firma',
                        margin: [60, 0, 0, 0]
                      },
                      ,
                    ]
                  }
                  return {
                    columns: [
                      currentPage.toString() + ' de ' + pageCount,
                    ], margin: [60, 70, 0, 0], style: 'firma'
                  }
                },
                header: function (currentPage: any, pageCount: any, pageSize: any) {
                  return [
                    {
                      image: 'logo',
                      width: 100,
                      absolutePosition: { x: 60, y: 40 }
                    },
                    {
                      image: 'logoLatacunga',
                      width: 100,
                      absolutePosition: { x: 433, y: 50 }
                    },
                    { canvas: [{ type: 'line', x1: 60, y1: 82, x2: 535, y2: 82, lineWidth: 1 }] },
                  ]
                },
                pageMargins: [60, 89, 60, 134],
                content: [
                  {
                    alignment: 'center',
                    text: ['HISTORIA CLÍNICA'],
                    style: 'bigheader',
                    margin: [0, 0, 0, 5]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Código: `, style: 'subheader' },
                      { text: `${this.historiaSeleccionada.nrohistoria}    `, style: 'normal' },
                      { text: `Nombre de médico: `, style: 'subheader' },
                      { text: `${consulta.empleado}.`, style: 'normal' }
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Fecha de consulta: `, style: 'subheader' },
                      { text: `${fechaConsulta}`, style: 'normal' },
                    ],
                  },
                  {
                    alignment: 'left',
                    text: ['I. FICHA DE IDENTIFICACIÓN'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Paciente: `, style: 'subheader' },
                      { text: `${this.clienteSeleccionado.descrip}.  `, style: 'normal' },
                      { text: `Edad: `, style: 'subheader' }, { text: `${edad}  `, style: 'normal' },
                      { text: `Sexo: `, style: 'subheader' },
                      { text: `${this.historiaSeleccionada.genero}.  `, style: 'normal' },
                    ],
                    margin: [0, 4, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Fecha de nacimiento: `, style: 'subheader' },
                      { text: `${fechaNacimiento.toLocaleDateString('es-EC', opciones)}.  `, style: 'normal' },
                      { text: `Discapacidad: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.discapacidad}  `, style: 'normal' },
                      { text: `Tipo de sangre: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.grupo_sanguineo}  `, style: 'normal' },
                      { text: `Orientación sexual: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.orientacion_sexual}.  `, style: 'normal' },
                      { text: `Dirección: `, style: 'subheader' },
                      { text: `${this.clienteSeleccionado.direcci}.`, style: 'normal' }
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['II. MOTIVO DE CONSULTA'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${consulta.motivo_atencion}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Enfermedad actual: `, style: 'subheader' },
                      { text: `${consulta.enfermedad_actual}    `, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['III. ANTECEDENTES'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${consulta.antecedentes}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['IV. SIGNOS VITALES'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    style: 'tableExample',
                    table: {
                      widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                      body: [
                        [{ text: 'Peso (kg)', style: 'subheader' }, { text: 'Talla (m)', style: 'subheader' }, { text: 'IMC', style: 'subheader' }, { text: 'Pr. Sist', style: 'subheader' }, { text: 'Dist.', style: 'subheader' }, { text: 'Temp (°C)', style: 'subheader' }, { text: 'FC', style: 'subheader' }, { text: 'Sat', style: 'subheader' }, { text: 'FR', style: 'subheader' }],
                        [{ text: this.consultaActual.talla, style: 'normal' }, { text: this.consultaActual.talla, style: 'normal' }, { text: this.consultaActual.imc, style: 'normal' }, { text: this.consultaActual.prsist, style: 'normal' }, { text: this.consultaActual.prdist, style: 'normal' }, { text: this.consultaActual.temp, style: 'normal' }, { text: this.consultaActual.fc, style: 'normal' }, { text: this.consultaActual.sat, style: 'normal' }, { text: this.consultaActual.fr, style: 'normal' }]
                      ]
                    },
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VI. EXAMEN FÍSICO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${consulta.examen_fisico}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Resultado de exámenes: `, style: 'subheader' },
                      { text: `${consulta.resultados_examenes}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VII. DIAGNOSTICO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Código CIE10: `, style: 'subheader' },
                      { text: `${consulta.codigo_cie10_per}.`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Enfermedad CIE10: `, style: 'subheader' },
                      { text: `${this.diagnosticoActual.descripcion}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Cronología: `, style: 'subheader' },
                      { text: `${this.cronologiaActual}.  `, style: 'normal' },
                      { text: `Condición: `, style: 'subheader' },
                      { text: `${this.condicionActual}.  `, style: 'normal' },
                      { text: `Tipo: `, style: 'subheader' },
                      { text: `${this.tipoActual}.  `, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Observación: `, style: 'subheader' },
                      { text: `${consulta.observacion_signos}.`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VIII. TRATAMIENTO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${consulta.tratamiento}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 100]
                  }
                ]
                ,
                styles: {
                  bigheader: {
                    fontSize: 14,
                    bold: true
                  },
                  header: {
                    fontSize: 12,
                    bold: true
                  },
                  subheader: {
                    fontSize: 11,
                    bold: true
                  },
                  normal: {
                    fontSize: 11,
                    bold: false
                  },
                  firma: {
                    fontSize: 10,
                    bold: false
                  },
                  small: {
                    fontSize: 10,
                    bold: false
                  }
                },
                images: {
                  logo: environment.logo,
                  logoLatacunga: environment.logoLatacunga
                }
              }
              pdfMake.createPdf(dd).open();
            })
          })
        })
      })
    });

  }

  imprimirPdf2() {
    this.consultasService.obtenerConsulta(this.consultaActual.id).subscribe(resp => {
      const consultaPdf = this.consultaActual;
      this.consultaActual = resp;
      const moment = require('moment-timezone');
      const opciones: any = { year: 'numeric', month: 'long', day: 'numeric' };
      let fechaConsulta = this.consultaActual.fecha;
      const fechaComputador = moment();
      const fechaActualEcuador = fechaComputador.tz('America/Guayaquil').format('YYYY/MM/DD');
      let fechaActual = new Date(fechaActualEcuador);
      let fechaNacimiento = new Date(this.historiaSeleccionada.fechanac);
      let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
      let meses = fechaActual.getMonth() - fechaNacimiento.getMonth();
      if (meses < 0 || (meses === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }
      this.edadActual = edad;
      this.diagnosticosService.getDescripcion(this.consultaActual.codigo_cie10_per).subscribe(resp => {
        this.diagnosticoActual = resp;
        console.log(this.diagnosticoActual);
        this.cronologiaService.getCronologiaUnica(this.consultaActual.id_cronologia_per).subscribe(resp => {
          if (resp.length > 0) {
            this.cronologiaActual = resp[0].nombre;
          } else {
            this.cronologiaActual = '';
          }
          this.condicionService.getCondicionUnica(this.consultaActual.id_condicion_per).subscribe(resp => {
            if (resp.length > 0) {
              this.condicionActual = resp[0].nombre;
            } else {
              this.condicionActual = '';
            }
            this.tipoService.getTipoUnico(this.consultaActual.id_tipo_per).subscribe(resp => {
              if (resp.length > 0) {
                this.tipoActual = resp[0].nombre;
              } else {
                this.tipoActual = '';
              }
              console.log(`${this.consultaActual.empleado}\n${this.consultaActual.titulo}`);
              const dd: any = {
                footer: function (currentPage: any, pageCount: any) {
                  if (currentPage == pageCount) {
                    return [
                      {
                        table: {
                          widths: [190],
                          headerRows: 1,
                          body: [
                            [{ text: ``, style: 'tableHeader' }],
                            [{ text: `${consultaPdf.empleado}\n${consultaPdf.titulo}`, alignment: 'center', style: 'firma' }],
                          ]
                        },
                        layout: 'headerLineOnly',
                        margin: [205, 50, 0, 0]
                      },
                      {
                        text: `${currentPage.toString()} de ${pageCount}`,
                        style: 'firma',
                        margin: [60, 0, 0, 0]
                      },
                      ,
                    ]
                  }
                  return {
                    columns: [
                      currentPage.toString() + ' de ' + pageCount,
                    ], margin: [60, 70, 0, 0], style: 'firma'
                  }
                },
                header: function (currentPage: any, pageCount: any, pageSize: any) {
                  return [
                    {
                      image: 'logo',
                      width: 100,
                      absolutePosition: { x: 60, y: 40 }
                    },
                    {
                      image: 'logoLatacunga',
                      width: 100,
                      absolutePosition: { x: 433, y: 50 }
                    },
                    { canvas: [{ type: 'line', x1: 60, y1: 82, x2: 535, y2: 82, lineWidth: 1 }] },
                  ]
                },
                pageMargins: [60, 89, 60, 134],
                content: [
                  {
                    alignment: 'center',
                    text: ['HISTORIA CLÍNICA'],
                    style: 'bigheader',
                    margin: [0, 0, 0, 5]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Código: `, style: 'subheader' },
                      { text: `${this.historiaSeleccionada.nrohistoria}    `, style: 'normal' },
                      { text: `Nombre de médico: `, style: 'subheader' },
                      { text: `${this.consultaActual.empleado}.`, style: 'normal' }
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Fecha de consulta: `, style: 'subheader' },
                      { text: `${this.fechaConsultaActual}`, style: 'normal' },
                    ],
                  },
                  {
                    alignment: 'left',
                    text: ['I. FICHA DE IDENTIFICACIÓN'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Paciente: `, style: 'subheader' },
                      { text: `${this.clienteSeleccionado.descrip}.  `, style: 'normal' },
                      { text: `Edad: `, style: 'subheader' }, { text: `${this.edadActual}  `, style: 'normal' },
                      { text: `Sexo: `, style: 'subheader' },
                      { text: `${this.historiaSeleccionada.genero}.  `, style: 'normal' },
                    ],
                    margin: [0, 4, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Fecha de nacimiento: `, style: 'subheader' },
                      { text: `${fechaNacimiento.toLocaleDateString('es-EC', opciones)}.  `, style: 'normal' },
                      { text: `Discapacidad: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.discapacidad}  `, style: 'normal' },
                      { text: `Tipo de sangre: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.grupo_sanguineo}  `, style: 'normal' },
                      { text: `Orientación sexual: `, style: 'subheader' },
                      { text: `${this.historiaBasePropia.orientacion_sexual}.  `, style: 'normal' },
                      { text: `Dirección: `, style: 'subheader' },
                      { text: `${this.clienteSeleccionado.direcci}.`, style: 'normal' }
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['II. MOTIVO DE CONSULTA'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${this.consultaActual.motivo_atencion}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Enfermedad actual: `, style: 'subheader' },
                      { text: `${this.consultaActual.enfermedad_actual}    `, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['III. ANTECEDENTES'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${this.consultaActual.antecedentes}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['IV. SIGNOS VITALES'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    style: 'tableExample',
                    table: {
                      widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*'],
                      body: [
                        [{ text: 'Peso (kg)', style: 'subheader' }, { text: 'Talla (m)', style: 'subheader' }, { text: 'IMC', style: 'subheader' }, { text: 'Pr. Sist', style: 'subheader' }, { text: 'Dist.', style: 'subheader' }, { text: 'Temp (°C)', style: 'subheader' }, { text: 'FC', style: 'subheader' }, { text: 'Sat', style: 'subheader' }, { text: 'FR', style: 'subheader' }],
                        [{ text: this.consultaActual.talla, style: 'normal' }, { text: this.consultaActual.talla, style: 'normal' }, { text: this.consultaActual.imc, style: 'normal' }, { text: this.consultaActual.prsist, style: 'normal' }, { text: this.consultaActual.prdist, style: 'normal' }, { text: this.consultaActual.temp, style: 'normal' }, { text: this.consultaActual.fc, style: 'normal' }, { text: this.consultaActual.sat, style: 'normal' }, { text: this.consultaActual.fr, style: 'normal' }]
                      ]
                    },
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VI. EXAMEN FÍSICO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${this.consultaActual.examen_fisico}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Resultado de exámenes: `, style: 'subheader' },
                      { text: `${this.consultaActual.resultados_examenes}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VII. DIAGNOSTICO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Código CIE10: `, style: 'subheader' },
                      { text: `${this.consultaActual.codigo_cie10_per}.`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Enfermedad CIE10: `, style: 'subheader' },
                      { text: `${this.diagnosticoActual.descripcion}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Cronología: `, style: 'subheader' },
                      { text: `${this.cronologiaActual}.  `, style: 'normal' },
                      { text: `Condición: `, style: 'subheader' },
                      { text: `${this.condicionActual}.  `, style: 'normal' },
                      { text: `Tipo: `, style: 'subheader' },
                      { text: `${this.tipoActual}.  `, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `Observación: `, style: 'subheader' },
                      { text: `${this.consultaActual.observacion_signos}.`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                  {
                    alignment: 'left',
                    text: ['VIII. TRATAMIENTO'],
                    style: 'header',
                    margin: [0, 15, 0, 0]
                  },
                  {
                    alignment: 'justify',
                    text: [
                      { text: `${this.consultaActual.tratamiento}`, style: 'normal' },
                    ],
                    margin: [0, 1, 0, 0]
                  },
                ],
                styles: {
                  bigheader: {
                    fontSize: 14,
                    bold: true
                  },
                  header: {
                    fontSize: 12,
                    bold: true
                  },
                  subheader: {
                    fontSize: 11,
                    bold: true
                  },
                  normal: {
                    fontSize: 11,
                    bold: false
                  },
                  firma: {
                    fontSize: 10,
                    bold: false
                  },
                  small: {
                    fontSize: 10,
                    bold: false
                  }
                },
                images: {
                  logo: environment.logo,
                  logoLatacunga: environment.logoLatacunga
                }
              }
              pdfMake.createPdf(dd).open();
            })
          })
        })
      })
    })

  }

  abrirVistaHistorial() {
    this.vistaConsultaPaciente.classList.add('hidden');
    this.vistaHistorialesPacientes.classList.remove('hidden');
  }

  cambiarHistoria(parametroDeCambio: string) {
    Swal.fire({
      title: 'Esta seguro de cambiar los datos del paciente?',
      showDenyButton: true,
      confirmButtonText: 'Continuar',
      denyButtonText: `Salir`,
    }).then((result) => {
      // Read more about isConfirmed, isDenied below 
      if (result.isConfirmed) {
        if (parametroDeCambio == 'grupo_sanguineo') {
          this.historiasService.putHistoria(this.selectTipoSangre.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        } else if (parametroDeCambio == 'discapacidad') {
          this.historiasService.putHistoria(this.discapacidad.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        } else if (parametroDeCambio == 'orientacion_sexual') {
          this.historiasService.putHistoria(this.orientacionSexual.value, this.historiaBasePropia.id, parametroDeCambio).subscribe(resp => {
            Swal.fire(`${resp.mensaje}`, '', 'success');
          });
        }
      } else if (result.isDenied) {
        this.cargarHistoria(this.ciuCliente, this.cliente);
        Swal.fire('Los datos no fueron cambiados', '', 'info')
      }
    })
  }

}
