import { Injectable } from "@angular/core";
import { CLIENTES } from "../data/clientes.json";
import { Cliente } from "../models/cliente.js";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  constructor(private httpClient: HttpClient) {}

  // Tranformar a un stream (observable)
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlEndPoint);
  }
}
