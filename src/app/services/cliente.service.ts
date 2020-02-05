import { Injectable } from "@angular/core";
import { Cliente } from "../models/cliente.js";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import swal from "sweetalert2"; // alertas

@Injectable({
  providedIn: "root"
})
export class ClienteService {
  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({ "Content-type": "application/json" });

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Tranformar a un stream (observable)
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlEndPoint);
  }

  create(cliente: Cliente): Observable<any> {
    return this.httpClient
      .post<any>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          // 400 => BAD_REQUEST
          if (e.status == 400) {
            return throwError(e);
          }

          swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: "error",
            confirmButtonText: "Aceptar"
          });
          return throwError(e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(["/clientes"]);
        swal.fire({
          title: e.error.mensaje,
          text: e.error.error,
          icon: "error",
          confirmButtonText: "Aceptar"
        });
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.httpClient
      .put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          if (e.status == 400) {
            return throwError(e);
          }

          swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: "error",
            confirmButtonText: "Aceptar"
          });
          return throwError(e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.httpClient
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders
      })
      .pipe(
        catchError(e => {
          swal.fire({
            title: e.error.mensaje,
            text: e.error.error,
            icon: "error",
            confirmButtonText: "Aceptar"
          });
          return throwError(e);
        })
      );
  }
}
