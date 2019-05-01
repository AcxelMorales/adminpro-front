import { Routes, RouterModule } from "@angular/router";

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

import { LoginGuard } from '../services/service.index';

const pagesRoutes: Routes = [
  {
    path: "",
    component: PagesComponent,
    canActivate: [LoginGuard],
    children: [
      { path: "dashboard", component: DashboardComponent, data: { title: 'Dashboard' } },
      { path: "progress", component: ProgressComponent, data: { title: 'Progress' } },
      { path: "graficas1", component: Graficas1Component, data: { title: 'Gráficas' } },
      { path: "rxjs", component: RxjsComponent, data: { title: 'RxJS' } },
      { path: "account-settings", component: AccountSettingsComponent, data: { title: 'Settings Theme' } },
      { path: "profile", component: ProfileComponent, data: { title: 'Perfil de Usuario' } },
      { path: "users", component: UsuariosComponent, data: { title: 'Mantenimiento de Usuarios' } },
      { path: "", redirectTo: "/dashboard", pathMatch: "full" }
    ]
  }
];

export const pages_routes = RouterModule.forChild(pagesRoutes);