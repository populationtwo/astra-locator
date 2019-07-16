import { Component, OnInit, Input } from "@angular/core";
import { Location } from "../home-list/home-list.component";
import { LocatorDataService } from "../locator-data.service";

@Component({
  selector: "app-location-details",
  templateUrl: "./location-details.component.html",
  styleUrls: ["./location-details.component.css"]
})
export class LocationDetailsComponent implements OnInit {
  @Input() location: Location;

  constructor(private locatorDataService: LocatorDataService) {}

  public formVisible: boolean = false;
  public googleAPIKey: string = "AIzaSyD936k9N-wBb16mUfR7Mhy_C0cWzSbUx3w";

  public newReview = {
    author: "",
    rating: 5,
    reviewText: ""
  };

  public formError: string;

  private formIsValid(): boolean {
    if (
      this.newReview.author &&
      this.newReview.rating &&
      this.newReview.reviewText
    ) {
      return true;
    } else {
      return false;
    }
  }
  private resetAndHideReviewForm():void{
    this.formVisible = false;
    this.newReview.author = '';
    this.newReview.rating = 5;
    this.newReview.reviewText = '';
  }
  public onReviewSubmit(): void {
    this.formError = "";
    if (this.formIsValid()) {
      console.log(this.newReview);
      this.locatorDataService
        .addReviewByLocationId(this.location._id, this.newReview)
        .then(review => {
          console.log("Review saved", review);
          let reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;
          this.resetAndHideReviewForm();
        });
    } else {
      this.formError = "All fields required, please try again";
    }
  }

  ngOnInit() {}
}
