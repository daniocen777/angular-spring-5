import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2"; // alertas

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  titulo: string = "Crear Cliente";
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params["id"];
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente: Cliente) => {
          this.cliente = cliente;
        });
      }
    });
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente: Cliente) => {
      this.router.navigate(["/clientes"]);
      swal.fire({
        title: "Nuevo Cliente",
        text: `Cliente ${cliente.nombre} creado con éxito`,
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe((cliente: Cliente) => {
      this.router.navigate(["/clientes"]);
      swal.fire({
        title: "Cliente editado",
        text: `Cliente ${cliente.nombre} actualizado con éxito`,
        icon: "success",
        confirmButtonText: "Aceptar"
      });
    });
  }
}
