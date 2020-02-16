import { Component, OnInit } from "@angular/core";
import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";
import swal from "sweetalert2"; // alertas
import { ActivatedRoute } from "@angular/router";
import { ModalService } from "../services/modal.service";

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  paginador: any;
  clienteSeleccionado: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    /*  this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    }); */
    this.getClientesPageable();
  }

  getClientesPageable() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get("page");
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientesPageable(page).subscribe(data => {
        this.clientes = data.content;
        this.paginador = data;
      });
    });
    // Suscribir al emiter
    this.modalService.notificarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });
    });
  }

  delete(cliente: Cliente): void {
    swal
      .fire({
        title: "¿Está segur@?",
        text: `¿Está seguro de querer eliminar al cliente ${cliente.nombre}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar"
      })
      .then(result => {
        if (result.value) {
          this.clienteService
            .delete(cliente.id)
            .subscribe((response: Cliente) => {
              this.clientes = this.clientes.filter(cli => cli !== cliente);
              swal.fire(
                "¡Eliminado!",
                `El cliente ${cliente.nombre} fue eliminado`,
                "success"
              );
            });
        }
      });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
