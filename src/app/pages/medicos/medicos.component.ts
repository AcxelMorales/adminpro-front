import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/Medico';
import { MedicoService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [`
  .w50 {
    width: 50px;
  }
  .w70 {
    width: 70px;
  }
`]
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  total: number = 0;
  cargando: boolean = true;
  desde: number = 0;

  constructor(
    private _medicoService: MedicoService
  ) { }

  ngOnInit(): void {
    this.cargarMedicos();
  }

  public cargarMedicos(): void {
    this.cargando = true;

    this._medicoService.loadMedicos(this.desde)
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.medicos = resp.medicos;
        this.cargando = false;
      });
  }

  public searchMedico(termino: string): void {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.searchMedico(termino)
      .subscribe((medicos: any) => {
        this.medicos = medicos
      });
  }

  public deleteMedico(medico: Medico): void {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Esta a punto de eliminar a el médico " + medico.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._medicoService.deleteMedico(medico._id).subscribe(resp => this.cargarMedicos());

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Médico eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  public changeSince(valor: number): void {
    let desde = this.desde + valor;

    if (desde >= this.total) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }

}
