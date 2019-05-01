import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public table: string;
  public id: string;
  public oculto: string = 'oculto';

  public notification = new EventEmitter<any>();

  constructor() { }

  hideModal(): void {
    this.oculto = 'oculto';
    this.table = null;
    this.id = null;
  }

  showModal(table: string, id: string): void {
    this.oculto = '';
    this.table = table;
    this.id = id;
  }

}
