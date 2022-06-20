import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ValidarAdminGuard } from '../guards/validar-admin.guard';
import { ValidarPaginaGuard } from '../guards/validar-pagina.guard';
import { ValidarPersonalMedicoGuard } from '../guards/validar-personal-medico.guard';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { AtencionComponent } from './atencion/atencion.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmpleadosComponent } from './empleados/empleados.component';
import { HistorialesComponent } from './historiales/historiales.component';
import { MainComponent } from './main/main.component';

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
