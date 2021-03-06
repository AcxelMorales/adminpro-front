import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirImagenService,
  HospitalService,
  MedicoService,
  LoginGuard,
  AdminGuard,
  TokenGuard
} from './service.index';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    SubirImagenService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuard,
    AdminGuard,
    TokenGuard
  ]
})
export class ServiceModule { }
