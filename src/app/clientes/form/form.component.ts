import { Component, OnInit } from "@angular/core";
import { Cliente } from "src/app/models/cliente";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnInit {
  titulo: string = "Crear Cliente";
  cliente: Cliente = new Cliente();

  constructor() {}

  ngOnInit() {}

  create(): void {
    console.log(this.cliente);
  }
}
