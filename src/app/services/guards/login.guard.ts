import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  canActivate(): boolean {
    if (this._usuarioService.isLog()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
