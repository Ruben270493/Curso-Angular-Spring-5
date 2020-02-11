import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[] = [
    {id: 1, nombre: 'Rubén', apellido: 'Fernández de Castro', email: 'ruben@angular.es', createAt: '2020-02-11'},
    {id: 2, nombre: 'Trang', apellido: 'Bui', email: 'trang@angular.es', createAt: '2020-02-11'},
    {id: 3, nombre: 'Fernando', apellido: 'Fernández', email: 'fernando@angular.es', createAt: '2020-02-11'},
    {id: 4, nombre: 'Laura', apellido: 'Fernández', email: 'laura@angular.es', createAt: '2020-02-11'},
    {id: 5, nombre: 'Sergio', apellido: 'Gonzalez', email: 'sergio@angular.es', createAt: '2020-02-11'},
    {id: 6, nombre: 'Juan', apellido: 'Villazan', email: 'juan@angular.es', createAt: '2020-02-11'},
    {id: 7, nombre: 'Mariangeles', apellido: 'Perez', email: 'mariangeles@angular.es', createAt: '2020-02-11'},
    {id: 8, nombre: 'Mari', apellido: 'Carril', email: 'mari@angular.es', createAt: '2020-02-11'},
    {id: 9, nombre: 'Jose', apellido: 'Portugal', email: 'jose@angular.es', createAt: '2020-02-11'},
    {id: 10, nombre: 'Laura', apellido: 'Cuba', email: 'laura@angular.es', createAt: '2020-02-11'},
    {id: 11, nombre: 'Carlos', apellido: 'Lopez', email: 'carlos@angular.es', createAt: '2020-02-11'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
