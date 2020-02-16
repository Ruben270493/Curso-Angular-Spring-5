import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public cliente:Cliente;
  public titulo:string = "Detalle del cliente";
  private fotoSeleccionada:File;

  constructor(private clienteService:ClienteService, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
        let id:number = +params.get('id');
        if (id) {
          this.clienteService.getCliente(id).subscribe(cliente => {
            this.cliente = cliente;
          });
        }
    });
  }

  public seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
  }

  public subirFoto() {
    this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
      this.cliente = cliente;
      Swal.fire("¡Imagen subida!", `La imagen ${this.cliente.foto} se ha subido correctamente`, "success");
    });
  }

}
