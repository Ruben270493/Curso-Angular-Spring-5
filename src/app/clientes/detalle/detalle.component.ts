import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  public cliente:Cliente;
  public titulo:string = "Detalle del cliente";
  private fotoSeleccionada:File;
  public progreso:number = 0;

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
    this.progreso = 0;
    this.fotoSeleccionada = event.target.files[0];
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      Swal.fire('¡Error!', 'El archivo debe ser una imagen','error');
      this.fotoSeleccionada = null;
    }
  }

  public subirFoto() {
    if (!this.fotoSeleccionada) {
      Swal.fire('¡Error!', 'Debe seleccionar una imagen','error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if(event.type == HttpEventType.Response) {
          let response:any = event.body;
          this.cliente = response.cliente as Cliente;
          Swal.fire("¡Imagen subida!", `La imagen ${this.cliente.foto} se ha subido correctamente`, "success");
        }
      });
    }
  }

}
