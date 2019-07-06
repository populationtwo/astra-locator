import { Component, OnInit } from "@angular/core";
import { LocatorDataService } from "../locator-data.service";
import { GeolocationService } from "../geolocation.service";

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
  constructor(
    private locatorDataService: LocatorDataService,
    private geolocationService: GeolocationService
  ) {}
  public message: string;
  public locations: Location[];

  private getLocations(position: any): void {
    this.message = "Searching for nearby places";
    this.locatorDataService.getLocations().then(foundLocations => {
      this.message = foundLocations.length > 0 ? "" : "No locations found";
      this.locations = foundLocations;
    });
  }

  private showError(error: any): void {
    this.message = error.message;
  }
  private noGeo(): void {
    this.message = "Geolocation not supported by this browser.";
  }

  private getPosition(): void{
    this.message = 'Getting your location...';
    this.geolocationService.getPosition(
        this.getLocations,
        this.showError,
        this.noGeo
    )
  }

  ngOnInit() {
    this.getPosition();
  }
}
