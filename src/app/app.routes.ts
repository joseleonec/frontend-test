import { Routes } from '@angular/router';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { CuentaListComponent } from './components/cuentas/cuenta-list/cuenta-list.component';
import { CuentaFormComponent } from './components/cuentas/cuenta-form/cuenta-form.component';
import { MovimientoListComponent } from './components/movimientos/movimiento-list/movimiento-list.component';
import { MovimientoFormComponent } from './components/movimientos/movimiento-form/movimiento-form.component';
import { ReporteViewComponent } from './components/reportes/reporte-view/reporte-view.component';

export const routes: Routes = [
  { path: 'clientes',           component: ClienteListComponent },
  { path: 'clientes/create',    component: ClienteFormComponent },
  { path: 'clientes/edit/:id',  component: ClienteFormComponent },
  { path: 'cuentas',            component: CuentaListComponent },
  { path: 'cuentas/create',     component: CuentaFormComponent },
  { path: 'cuentas/edit/:id',   component: CuentaFormComponent },
  { path: 'movimientos',        component: MovimientoListComponent },
  { path: 'movimientos/create', component: MovimientoFormComponent },
  { path: 'reportes',           component: ReporteViewComponent },
  { path: '',                   redirectTo: 'clientes', pathMatch: 'full' }
];
