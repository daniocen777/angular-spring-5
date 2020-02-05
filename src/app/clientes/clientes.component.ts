import { Component, OnInit } from "@angular/core";
import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/cliente.service";
import swal from "sweetalert2"; // alertas

@Component({
  selector: "app-clientes",
  templateUrl: "./clientes.component.html",
  styleUrls: ["./clientes.component.css"]
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
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
}
