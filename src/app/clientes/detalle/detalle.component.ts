import { Component, OnInit, Input } from "@angular/core";
import { ClienteService } from "src/app/services/cliente.service";
import { Cliente } from "src/app/models/cliente";
import { HttpEventType } from "@angular/common/http";

import swal from "sweetalert2"; // alertas
import { ModalService } from "src/app/services/modal.service";

@Component({
  selector: "detalle-cliente",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.css"]
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso: number = 0;

  constructor(
    private clienteService: ClienteService,
    public modalService: ModalService
  ) {}

  ngOnInit() {}

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf("image") < 0) {
      swal.fire({
        title: "Error al seleccionar imagen: ",
        text: "El archivo debe ser del tipo imagen",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire({
        title: "Error Upload: ",
        text: "Debe seleccionar una foto",
        icon: "error",
        confirmButtonText: "Aceptar"
      });
    } else {
      this.clienteService
        .subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificarUpload.emit(this.cliente);

            swal.fire({
              title: "La foto se ha subido completamente!",
              text: response.mensaje,
              icon: "success",
              confirmButtonText: "Aceptar"
            });
          }
        });
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
