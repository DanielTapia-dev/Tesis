import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ValidarAdminGuard } from '../guards/validar-admin.guard';
import { ValidarPaginaGuard } from '../guards/validar-pagina.guard';
import { ValidarPersonalMedicoGuard } from '../guards/validar-personal-medico.guard';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { AtencionComponent } from './atencion/atencion.component';
import { CondicionComponent } from './condicion/condicion.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { CronologiaComponent } from './cronologia/cronologia.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiagnosticosComponent } from './diagnosticos/diagnosticos.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { MainComponent } from './main/main.component';
import { ParametrizacionComponent } from './parametrizacion/parametrizacion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { TipoComponent } from './tipo/tipo.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'atencion',
        component: AtencionComponent,
        canActivate: [ValidarTokenGuard, ValidarPersonalMedicoGuard],
        canLoad: [ValidarTokenGuard, ValidarPersonalMedicoGuard]
      },
      {
        path: 'historiales',
        component: HistorialesComponent,
        canActivate: [ValidarPaginaGuard, ValidarTokenGuard],
        canLoad: [ValidarPaginaGuard, ValidarTokenGuard]
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'consultas',
        component: ConsultasComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'solicitudes',
        component: SolicitudesComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'diagnosticos',
        component: DiagnosticosComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'parametrizacion',
        component: ParametrizacionComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'consultas',
        component: ConsultasComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'cronologia',
        component: CronologiaComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'condicion',
        component: CondicionComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: 'tipo',
        component: TipoComponent,
        canActivate: [ValidarAdminGuard, ValidarTokenGuard],
        canLoad: [ValidarAdminGuard, ValidarTokenGuard]
      },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [ValidarTokenGuard],
        canLoad: [ValidarTokenGuard]
      },
      {
        path: '**',
        redirectTo: ''
      },
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class PagesRoutingModule { }
