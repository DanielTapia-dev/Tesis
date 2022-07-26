import { Component, OnInit } from '@angular/core';
import { DiagnosticosService } from 'src/app/services/diagnosticos.service';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.css']
})
export class DiagnosticosComponent implements OnInit {

  constructor(private codigosCieServices: DiagnosticosService) { }

  pageActual: any = 1;
  maxPage: number = 30;

  ngOnInit(): void {
    this.cargarCodigos();
  }

  codigos: any = [];

  cargarCodigos() {
    this.codigosCieServices.getDiagnosticos().subscribe(resp => {
      this.codigos = resp;
      console.log(this.codigos);
    });
  }

}
