import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AtencionComponent } from './atencion/atencion.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { CondicionComponent } from './condicion/condicion.component';
import { CronologiaComponent } from './cronologia/cronologia.component';
import { TipoComponent } from './tipo/tipo.component';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { ParametrizacionComponent } from './parametrizacion/parametrizacion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    MainComponent,
    NavbarComponent,
    SidebarComponent,
    AtencionComponent,
    HistorialesComponent,
    EmpleadosComponent,
    ConsultasComponent,
    CondicionComponent,
    CronologiaComponent,
    TipoComponent,
    DiagnosticosComponent,
    ParametrizacionComponent,
    SolicitudesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
