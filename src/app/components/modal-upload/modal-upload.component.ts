import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirImagenService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imgUp: File;
  imgTemp: any;

  constructor(
    private _uploadService: SubirImagenService,
    public _modalUploadService: ModalUploadService
    ) { }

  ngOnInit(): void {
  }

  public closeModal(): void {
    this.imgTemp = null;
    this.imgUp = null;

    this._modalUploadService.hideModal();
  }

  public selectImg(archivo: File): void {
    if (!archivo) {
      this.imgUp = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      Swal.fire({
        title: 'Advertencia',
        text: 'El archivo no es una imagen',
        type: 'warning'
      });

      this.imgTemp = null;
      return;
    }

    this.imgUp = archivo;

    let reader = new FileReader();
    let urlImgTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imgTemp = reader.result;
  }

  uploadImage(): void {
    this._uploadService.uploadFile(this.imgUp, this._modalUploadService.table, this._modalUploadService.id)
      .then(resp => {
        this._modalUploadService.notification.emit(resp);
        this.closeModal();
      })
      .catch(err => console.error(err));
  }

}
