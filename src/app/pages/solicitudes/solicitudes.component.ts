import { Component, OnInit } from '@angular/core';
import { ConsultasService } from 'src/app/services/consultas.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.css']
})
export class SolicitudesComponent implements OnInit {

  pageActual: any = 1;
  maxPage: number = 30;
  solicitudes: any = [];

  constructor(
    private consultasService: ConsultasService
  ) { }

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.consultasService.getSolicitudes().subscribe(res => {
      console.log(res);
      this.solicitudes = res;
      console.log(this.solicitudes);
    })
  }

  activar(solicitud: any) {
    const formData = {
      estado: true,
      id: solicitud.id_consulta_per
    };
    this.consultasService.cambiarEstadoConsulta(formData).subscribe(res => {
      const orderIndex = this.solicitudes.indexOf(solicitud);
      this.solicitudes[orderIndex].estado = true;
      console.log(orderIndex);
    });
  }
  
  desactivar(solicitud: any) {
    const formData = {
      estado: false,
      id: solicitud.id_consulta_per
    };
    this.consultasService.cambiarEstadoConsulta(formData).subscribe(res => {
      const orderIndex = this.solicitudes.indexOf(solicitud);
      this.solicitudes[orderIndex].estado = false;
    });
  }
}
