import { Component, OnInit } from "@angular/core";
import { LocatorDataService } from "../locator-data.service";
import { Location } from "../location";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-details-page",
  templateUrl: "./details-page.component.html",
  styleUrls: ["./details-page.component.css"]
})
export class DetailsPageComponent implements OnInit {
  constructor(
    private locatorDataService: LocatorDataService,
    private route: ActivatedRoute
  ) {}

  newLocation: Location;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get("locationId");
          return this.locatorDataService.getLocationById(id);
        })
      )
      .subscribe((newLocation: Location) => {
        this.newLocation = newLocation;
        this.pageContent.header.title = newLocation.name;
        this.pageContent.sidebar = `${
          newLocation.name
        } is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.\n\nIf you've been and you like it - or if you don't - please leave a review to help other people just like you.`;
      });
  }

  public pageContent = {
    header: {
      title: "",
      strapline: ""
    },
    sidebar: ""
  };
}