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
  menu: any[] = [];

  constructor(
    public _service: SidebarService,
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;
    this.menu = this._service.loadMenu();

    this._modalUploadService.notification.subscribe(resp => {
      if (resp.hospital) return;

      if (resp.medico) return;

      if (this.usuario._id === resp.usuario._id) {
        this.usuario = resp.usuario;
        this.usuario.img = resp.usuario.img;
      } else {
        this.usuario = this._usuarioService.usuario; 
      }
    });
  }

  public logOut(): void {
    this._usuarioService.logOut();
  }

}
