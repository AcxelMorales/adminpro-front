import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/Usuario.model';
import { Router } from '@angular/router';

declare function init();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private _usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    init();

    this.form = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.isSame('password', 'password2') });
  }

  public register(): void {
    if (this.form.invalid) return;

    if (!this.form.value.condiciones) {
      Swal.fire({
        title: 'Importante',
        text: 'Debes de aceptar las condiciones',
        type: 'warning'
      });
      return;
    }

    let usuario = new Usuario(
      this.form.value.nombre,
      this.form.value.email,
      this.form.value.password
    );

    this._usuarioService.createUser(usuario).subscribe(resp => this.router.navigate(['/login']));
  }

  public isSame(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if (pass1 === pass2) return null;

      return { iguales: true };
    };
  }

}
