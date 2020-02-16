import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";
import { HttpClientModule } from "@angular/common/http"; // http
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NoFountComponent } from "./no-fount/no-fount.component";
import { FormComponent } from "./clientes/form/form.component";

import localeES from "@angular/common/locales/es"; // idioma
import { registerLocaleData } from "@angular/common";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DetalleComponent } from './clientes/detalle/detalle.component';

// INternacionalización
registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientesComponent,
    NoFountComponent,
    FormComponent,
    PaginatorComponent,
    DetalleComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [{provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule {}
