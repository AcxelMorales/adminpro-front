import { Injectable } from "@angular/core";
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: "root"
})
export class SidebarService {

  menu: any[] = [];

  constructor(
    private _usuarioService: UsuarioService
  ) { }
  
  loadMenu(): any[] {
    this.menu = this._usuarioService.menu;
    return this.menu;
  }

}
