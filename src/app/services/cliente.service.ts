import { Injectable } from "@angular/core";
import { CLIENTES } from "../data/clientes.json";
import { Cliente } from "../models/cliente.js";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  constructor() {}

  // Tranformar a un stream (observable)
  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}
