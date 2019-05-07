import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService
  ) { }

  canActivate(): boolean {
    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }
    else {
      this._usuarioService.logOut();
      return false;
    }
  }

}
