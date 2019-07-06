import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"]
})
export class HomepageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public pageContent = {
    header: {
      title: "Locator",
      strapline: "Find places to work with wifi near you!"
    },
    sidebar:
      "Looking for wifi and a seat? Locator helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Locator help you find the place you're looking for."
  };
}
