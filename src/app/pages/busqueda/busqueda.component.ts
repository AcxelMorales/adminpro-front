import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from 'src/app/config/config';
import { Usuario } from 'src/app/models/Usuario.model';
import { Medico } from 'src/app/models/Medico';
import { Hospital } from 'src/app/models/Hospital.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [`
  .w50 {
    width: 50px;
  }
  `]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.route.params.subscribe(params => {
      let termino = params['termino'];
      this.search(termino);
    });
  }

  ngOnInit(): void {
  }

  public search(termino: string): void {
    let url = `${URL_SERVICE}/search/all/` + termino;

    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }

}
