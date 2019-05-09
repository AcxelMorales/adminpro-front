import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> | boolean {
    let token = this._usuarioService.token;
    let payload = JSON.parse(atob(token.split('.')[1]));
    let expire = this.expire(payload.exp);

    if (expire) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.renew(payload.exp);
  }

  private expire(fecha: number): boolean {
    let now = new Date().getTime() / 1000;

    if (fecha < now) return true;
    else return false;
  }

  private renew(fecha: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let tokenExp = new Date(fecha * 1000);
      let now = new Date();

      now.setTime(now.getTime() + (4 * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        resolve(true);
      } else {
        this._usuarioService.renewToken()
          .subscribe(() => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }
    });
  }

}
