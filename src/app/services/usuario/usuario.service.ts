import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.getStorage();
  }

  isLog(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  getStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  saveStorage(id: string, token: string, usuario: Usuario): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  createUser(usuario: Usuario): Observable<any> {
    return this.http.post(`${URL_SERVICE}/usuario`, usuario).pipe(
      map((resp: any) => {
        Swal.fire({
          title: 'Usuario creado',
          text: usuario.email,
          type: 'success'
        });

        return resp.usuario;
      }));
  }

  login(usuario: Usuario, recordar: boolean = false): Observable<Boolean> {
    if (recordar) localStorage.setItem('email', usuario.email);
    else localStorage.removeItem('email');

    return this.http.post(`${URL_SERVICE}/login`, usuario).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario);
        return true;
      }));
  }

  loginGoogle(token: string): Observable<Boolean> {
    return this.http.post(`${URL_SERVICE}/login/google`, { token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario)
        return true;
      })
    );
  }

  logOut(): void {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

}
