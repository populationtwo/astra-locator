import { Component, OnInit } from "@angular/core";
import { LocatorDataService } from "../locator-data.service";

export class Location {
  _id: string;
  name: string;
  distance: number;
  address: string;
  rating: number;
  facilities: string[];
}

@Component({
  selector: "app-home-list",
  templateUrl: "./home-list.component.html",
  styleUrls: ["./home-list.component.css"]
})
export class HomeListComponent implements OnInit {
  constructor(private locatorDataService: LocatorDataService) {}

  locations: Location[];

  ngOnInit() {
    this.getLocations();
  }

  private getLocations(): void {
    this.locatorDataService
      .getLocations()
      .then(foundLocations => (this.locations = foundLocations));
  }
}
