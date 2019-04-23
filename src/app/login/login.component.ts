import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/Usuario.model';

declare function init();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;
  auth2: any;

  constructor(private _router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    init();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) this.recuerdame = true;
  }

  public googleInit(): void {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '699916597734-gvfrn5tv6mndm15ckk8mr9je7q29dcs8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  private attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(resp => window.location.href = '#/dashboard');
    });
  }

  public enter(form: NgForm): void {
    if (form.invalid) return;

    let usuario = new Usuario(null, form.value.email, form.value.password);
    this._usuarioService.login(usuario, form.value.recuerdame)
      .subscribe(correcto => this._router.navigate(['/dashboard']));
  }

}
