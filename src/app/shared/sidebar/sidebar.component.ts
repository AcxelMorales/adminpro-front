import { Component, OnInit } from '@angular/core';

import { SidebarService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(public _service: SidebarService, private _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  public logOut(): void {
    this._usuarioService.logOut();
  }

}
