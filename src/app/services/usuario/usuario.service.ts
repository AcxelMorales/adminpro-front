import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { SubirImagenService } from '../upload/subir-imagen.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private _uploadService: SubirImagenService
  ) {
    this.getStorage();
  }

  isLog(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  getStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  saveStorage(id: string, token: string, usuario: Usuario, menu: any): void {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
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
      })).pipe(
        catchError(err =>
          of([
            console.log(err),
            Swal.fire({
              title: err.error.message,
              text: err.error.errors.errors.email.message,
              type: 'error'
            })
          ])
        )
      );;
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) localStorage.setItem('email', usuario.email);
    else localStorage.removeItem('email');

    return this.http.post(`${URL_SERVICE}/login`, usuario).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })).pipe(
        catchError(err =>
          of([
            Swal.fire({
              title: 'Error',
              text: err.error.message,
              type: 'error'
            })
          ])
        )
      );
  }

  loginGoogle(token: string): Observable<Boolean> {
    return this.http.post(`${URL_SERVICE}/login/google`, { token }).pipe(
      map((resp: any) => {
        this.saveStorage(resp.id, resp.token, resp.usuario, resp.menu)
        return true;
      })
    );
  }

  logOut(): void {
    this.token = '';
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  updateUser(usuario: Usuario): Observable<any> {
    let url = URL_SERVICE + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (usuario._id === this.usuario._id) {
          let usuarioDB = resp.usuario;
          this.saveStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Usuario actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        return true;
      })
    );
  }

  changeImg(file: File, id: string): void {
    this._uploadService.uploadFile(file, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;

        Swal.fire({
          title: 'Imagen Actualizada',
          text: this.usuario.nombre,
          type: 'success'
        });

        this.saveStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(err => console.error(err));
  }

  loadUsers(desde: number = 0): Observable<Object> {
    let url = URL_SERVICE + '/usuario?since=' + desde;

    return this.http.get(url);
  }

  searchUsers(termino: string): Observable<Object> {
    let url = URL_SERVICE + '/search/collection/usuarios/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios)
    );
  }

  deleteUser(id: string): Observable<Object> {
    let url = URL_SERVICE + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url);
  }

}
