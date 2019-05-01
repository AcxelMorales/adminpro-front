import { Component, OnInit } from '@angular/core';

import { SidebarService, UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/Usuario.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor(
    public _service: SidebarService,
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;

    this._modalUploadService.notification.subscribe(resp => {
      this.usuario = resp.usuario;
    });
  }

  public logOut(): void {
    this._usuarioService.logOut();
  }

}
