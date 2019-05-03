import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../models/Hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/service.index';
import { Medico } from 'src/app/models/Medico';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _modalService: ModalUploadService
  ) {
    let params = this.activatedRoute.params.subscribe(resp => {
      let id = resp['id'];
      if (id !== 'new') this.getMedico(id);
    });
  }

  ngOnInit(): void {
    this._hospitalService.loadHospitales()
      .subscribe((resp: any) => this.hospitales = resp.hospitales);

    this._modalService.notification.subscribe(resp => this.medico.img = resp.medico.img);
  }

  public saveMedico(f: NgForm): void {
    if (f.invalid) return;

    this._medicoService.saveMedico(this.medico)
      .subscribe(resp => {
        this.medico._id = resp._id;
        this.router.navigate(['/doctor', this.medico._id]);
      });
  }

  public changeHospital(id: string): void {
    this._hospitalService.getHospital(id)
      .subscribe((resp: any) => this.hospital = resp.hospital);
  }

  public getMedico(id: string): void {
    this._medicoService.getMedico(id)
      .subscribe(medico => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.changeHospital(this.medico.hospital);
      });
  }

  public changePicture(): void {
    this._modalService.showModal('medicos', this.medico._id);
  }

}
