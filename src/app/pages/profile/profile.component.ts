import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/Usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imgUp: File;
  imgTemp: any;

  constructor(private _userService: UsuarioService) {
    this.usuario = this._userService.usuario;
  }

  ngOnInit(): void {
  }

  public save(usuario: Usuario): void {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._userService.updateUser(usuario).subscribe();
  }

  public selectImg(archivo: File): void {
    if (!archivo) {
      this.imgUp = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Advertencia',
        text: 'El archivo no es una imagen',
        type: 'warning'
      });

      this.imgTemp = null;
      return;
    }

    this.imgUp = archivo;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imgTemp = reader.result;
  }

  public changeImage(): void {
    this._userService.changeImg(this.imgUp, this.usuario._id);
  }

}
