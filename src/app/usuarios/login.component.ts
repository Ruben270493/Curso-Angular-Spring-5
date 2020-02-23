import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public titulo:string = 'Iniciar sesión';
  usuario:Usuario;

  constructor() {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  public login():void {
    if (this.usuario.username == null || this.usuario.password == null) {
      Swal.fire('Error logIn', 'El username y la password no pueden estar vacíos.', 'error');
    }
  }

}
