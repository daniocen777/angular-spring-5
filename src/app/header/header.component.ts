import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  curso: string = "Angular con Spring 5";
  programador: string = "Danicode";

  constructor() {}

  ngOnInit() {}
}
