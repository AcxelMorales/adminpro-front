import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/Usuario.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario

  constructor(
    private _usuarioService: UsuarioService,
    private _modalUploadService: ModalUploadService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.usuario = this._usuarioService.usuario;

    this._modalUploadService.notification.subscribe(resp => {
      if (resp.hospital) return;

      if (resp.medico) return;

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

  public search(termino: string): void {
    this.router.navigate(['/search', termino]);
  }

}
