import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente.js";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({ "Content-type": "application/json" });
  constructor(private httpClient: HttpClient) {}

  // Tranformar a un stream (observable)
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.urlEndPoint, cliente, {
      headers: this.httpHeaders
    });
  }

  getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(
      `${this.urlEndPoint}/${cliente.id}`,
      cliente,
      {
        headers: this.httpHeaders
      }
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders
    });
  }
}
