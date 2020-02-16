import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";
import { ClienteService } from "src/app/services/cliente.service";
import { Router, ActivatedRoute } from "@angular/router";
import swal from "sweetalert2"; // alertas
import { Region } from "src/app/models/region";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  titulo: string = "Crear Cliente";
  cliente: Cliente = new Cliente();
  regiones: Region[];
  errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
    this.cargarRegiones();
  }

  cargarRegiones(): void {
    this.clienteService.getRegiones().subscribe(regiones => {
      this.regiones = regiones;
    });
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
    this.clienteService.create(this.cliente).subscribe(
      (response: any) => {
        this.router.navigate(["/clientes"]);
        swal.fire({
          title: "Nuevo Cliente",
          text: `Cliente ${response.cliente.nombre} creado con éxito`,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      (response: any) => {
        this.router.navigate(["/clientes"]);
        swal.fire({
          title: "Cliente editado",
          text: `Cliente ${response.cliente.nombre} actualizado con éxito`,
          icon: "success",
          confirmButtonText: "Aceptar"
        });
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }

  compararRegion(o1: Region, o2: Region): boolean {
    // obj1 => de la lista (ngFor)
    // obj2 => Asignado al cliente
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined
      ? false
      : o1.id === o2.id;
  }
}
