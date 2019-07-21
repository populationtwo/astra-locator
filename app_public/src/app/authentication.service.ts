import { Inject, Injectable } from "@angular/core";
import { BROWSER_STORAGE } from "./storage";
import { LocatorDataService } from "./locator-data.service";
import { User } from "./user";
import { AuthResponse } from "./authresponse";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private locatorDataService: LocatorDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem("locator-token");
  }

  public saveToken(token: string): void {
    this.storage.setItem("locator-token", token);
  }

  public login(user: User): Promise<any> {
    return this.locatorDataService
      .login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }
  public register(user: User): Promise<any> {
    return this.locatorDataService
      .register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem("locator-token");
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split(".")[1]));
      return { email, name } as User;
    }
  }
}
