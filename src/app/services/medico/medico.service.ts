import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from 'src/app/models/Medico';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(
    private _http: HttpClient,
    private _usuariService: UsuarioService
  ) { }

  loadMedicos(desde: number): Observable<Object> {
    let url = URL_SERVICE + '/medico?since=' + desde;

    return this._http.get(url);
  }

  getMedico(id: string): Observable<any> {
    let url = URL_SERVICE + '/medico/' + id;

    return this._http.get(url).pipe(map((resp: any) => resp.medico));
  }

  searchMedico(termino: string): Observable<Object> {
    let url = URL_SERVICE + '/search/collection/medicos/' + termino;

    return this._http.get(url).pipe(
      map((resp: any) => resp.medicos));
  }

  deleteMedico(id: string): Observable<Object> {
    let url = URL_SERVICE + '/medico/' + id + '?token=' + this._usuariService.token;

    return this._http.delete(url);
  }

  saveMedico(medico: Medico): Observable<any> {
    let url = URL_SERVICE + '/medico';

    if (medico._id) {
      url += '/' + medico._id + '?token=' + this._usuariService.token;

      return this._http.put(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Médico actuzalizado correctamente`,
            showConfirmButton: false,
            timer: 1500
          });

          return resp.medico;
        }));
    } else {
      url += '?token=' + this._usuariService.token;

      return this._http.post(url, medico).pipe(
        map((resp: any) => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Médico ${medico.nombre} creado correctamente`,
            showConfirmButton: false,
            timer: 1500
          });
  
          return resp.medico
        }));
    }
  }
  
}
