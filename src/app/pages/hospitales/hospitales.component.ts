import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/Hospital.model';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [`
    .w50 {
      width: 50px;
    }
    .w70 {
      width: 70px;
    }
  `]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  total: number = 0;
  cargando: boolean = true;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUpload: ModalUploadService
  ) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this._modalUpload.notification.subscribe(() => this.cargarHospitales());
  }

  public cargarHospitales(): void {
    this.cargando = true;

    this._hospitalService.loadHospitales()
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      });
  }

  public searchHospital(termino: string): void {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService.searchHospital(termino)
      .subscribe((hospitales: any) => this.hospitales = hospitales);
  }

  public deleteHospital(hospital: Hospital): void {
    Swal.fire({
      title: '¿Esta seguro?',
      text: "Esta a punto de eliminar el hospital " + hospital.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.deleteHospital(hospital._id).subscribe(resp => this.cargarHospitales());

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Hospital eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  public saveHospital(hospital: Hospital): void {
    this._hospitalService.updateHospital(hospital).subscribe();
  }

  public showModal(id: string): void {
    this._modalUpload.showModal('hospitales', id);
  }

  public async createHospital() {
    const ipAPI = 'https://api.ipify.org?format=json'

    const inputValue = fetch(ipAPI)
      .then(response => response.json())
      .then(data => data.ip)

    const { value: nombre } = await Swal.fire({
      title: 'Nombre del Hospital',
      input: 'text',
      inputValue: inputValue,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debes de escribir un nombre!'
        }
      }
    })

    const hospital = new Hospital(nombre);

    this._hospitalService.createHospital(hospital).subscribe(resp => this.cargarHospitales());
  }

}
