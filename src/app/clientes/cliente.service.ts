import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente.js';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  public getClientes():Cliente[] {
    return CLIENTES;
  }

}
