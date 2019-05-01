import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [`
    .w50 {
      width: 50px;
    }
    .w70 {
      width: 70px;
    }
  `]
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  total: number = 0;
  cargando: boolean = true;

  constructor(
    private _usuarioService: UsuarioService,
    private _modalUpload: ModalUploadService
    ) { }

  ngOnInit(): void {
    this.cargarUsers();

    this._modalUpload.notification
      .subscribe(resp => this.cargarUsers());
  }

  public cargarUsers(): void {
    this.cargando = true;

    this._usuarioService.loadUsers(this.desde)
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
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
    this.cargarUsers();
  }

  public searchUser(termino: string): void {
    if (termino.length <= 0) {
      this.cargarUsers();
      return;
    }

    this._usuarioService.searchUsers(termino)
      .subscribe((usuarios: any) => {
        console.log(usuarios);
        this.usuarios = usuarios
      });
  }

  public deleteUser(usuario: Usuario): void {
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire({
        title: 'Error',
        text: 'No se puede borrar a si mismo',
        type: 'error'
      });
      return;
    }

    Swal.fire({
      title: '¿Esta seguro?',
      text: "Esta a punto de eliminar a " + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.deleteUser(usuario._id).subscribe(resp => {
          this.cargarUsers();
        });

        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Usuario eliminado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  public saveUser(usuario: Usuario): void {
    this._usuarioService.updateUser(usuario).subscribe();
  }

  public showModal(id: string): void {
    this._modalUpload.showModal('usuarios', id);
  }

}
