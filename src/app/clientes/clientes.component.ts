import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  public clientes:Cliente[];

  constructor(
    private clienteService:ClienteService, 
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      params => {
        let page:number = +params.get('page');  

        if (!page)
          page = 0;
          
        this.clienteService.getClientes(page).subscribe(
          response => this.clientes = response.content as Cliente[]
        );
      }
    );
  }

  public delete(cliente:Cliente):void {
    const swalWithBootstrapButtons = swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro?',
      text: `¿Estás seguro de que deseas eliminar el cliente ${cliente.nombre}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, eliminar!',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              `El cliente ${cliente.nombre} ha sido eliminado correctamente.`,
              'success'
            );
          }
        );
      } 
    })
  }

}
