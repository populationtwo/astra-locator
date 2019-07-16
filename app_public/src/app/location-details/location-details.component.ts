import { Component, OnInit, Input } from "@angular/core";
import { Location } from "../home-list/home-list.component";

@Component({
  selector: "app-location-details",
  templateUrl: "./location-details.component.html",
  styleUrls: ["./location-details.component.css"]
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;
  public formVisible: boolean = false;
  public googleAPIKey: string = "AIzaSyD936k9N-wBb16mUfR7Mhy_C0cWzSbUx3w";

  public newReview = {
    author: "",
    rating: 5,
    reviewText: ""
  };
  constructor() {}

  ngOnInit() {}
}
