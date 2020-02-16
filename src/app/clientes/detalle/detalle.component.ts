import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import Swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  @Input()
  public cliente:Cliente;
  public titulo:string = "Detalle del cliente";
  private fotoSeleccionada:File;
  public progreso:number = 0;

  constructor(private clienteService:ClienteService, private modalService:ModalService) { }

  ngOnInit() {}

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

  public cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }

}
