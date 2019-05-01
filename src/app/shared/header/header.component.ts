import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/Usuario.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario

  constructor(
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;

    this._modalUploadService.notification.subscribe(resp => {
      if (this.usuario._id === resp.usuario._id) {
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
