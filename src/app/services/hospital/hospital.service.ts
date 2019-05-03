import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from 'src/app/models/Hospital.model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string = '';

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) {
    this.token = this._usuarioService.token;
  }

  loadHospitales(): Observable<Object> {
    let url = URL_SERVICE + '/hospital';

    return this._http.get(url);
  }

  getHospital(id: string): Observable<Object> {
    let url = URL_SERVICE + '/hospital/' + id;

    return this._http.get(url);
  }

  searchHospital(termino: string): Observable<Object> {
    let url = URL_SERVICE + '/search/collection/hospitales/' + termino;

    return this._http.get(url).pipe(
      map((resp: any) => resp.hospitales)
    );
  }

  deleteHospital(id: string): Observable<Object> {
    let url = URL_SERVICE + '/hospital/' + id + '?token=' + this.token;

    return this._http.delete(url);
  }

  updateHospital(hospital: Hospital): Observable<any> {
    let url = URL_SERVICE + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this._http.put(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Hospital actualizado correctamente',
          showConfirmButton: false,
          timer: 1500
        })

        return resp.hospital;
      })
    );
  }

  createHospital(hospital: Hospital): Observable<any> {
    let url = URL_SERVICE + '/hospital?token=' + this.token;

    return this._http.post(url, hospital).pipe(
      map((resp: any) => {
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: `Hospital ${hospital.nombre} creado correctamente`,
          showConfirmButton: false,
          timer: 1500
        })

        return resp.hospital;
      }));
  }

}
