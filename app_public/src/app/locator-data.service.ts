import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location, Review } from "./location";
import { environment } from "../environments/environment";
import { AuthResponse } from "./authresponse";
import {User} from "./user";

@Injectable({
  providedIn: "root"
})
export class LocatorDataService {
  constructor(private http: HttpClient) {}

  private apiBaseUrl = environment.apiBaseUrl;

  public getLocations(lat: number, lng: number): Promise<Location[]> {
    const maxDistance: number = 20;
    const url: string = `${
      this.apiBaseUrl
    }/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location[])
      .catch(this.handleError);
  }

  public getLocationById(locationId: string): Promise<Location> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as Location)
      .catch(this.handleError);
  }

  public addReviewByLocationId(
    locationId: string,
    formData: any
  ): Promise<Review> {
    const url: string = `${this.apiBaseUrl}/locations/${locationId}/reviews`;
    return this.http
      .post(url, formData)
      .toPromise()
      .then(response => response as any)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("Something has gone wrong", error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }
}
