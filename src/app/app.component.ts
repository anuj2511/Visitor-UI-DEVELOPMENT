import { Component } from '@angular/core';
import { Router, GuardsCheckEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import jwt_decode from "jwt-decode";
import { environment } from '../environments/environment';
import { CookiestorageService, LogService, FloodgateService, MixpanelService } from '@justlogin/express-ui';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Angular Scaffold';

  IsAuthenticated: boolean = false;
  AuthToken: string = null;

  constructor(
    private router: Router,
    private cookieStorageService: CookiestorageService,
    private logger: LogService,
    private mixpanelService: MixpanelService,
    private floodgateService: FloodgateService) {
    this.logger.WriteLog(this.IsAuthenticated.toString(), "IsAuthenticated >>>");

    this.router.events.pipe(filter(event => event instanceof GuardsCheckEnd)
    ).subscribe(event => {
      // this.logger.WriteLog('>> GuardsCheckEnd <<');

      this.AuthToken = this.cookieStorageService.getAccessToken();

      if (this.AuthToken) {
        // Check the token has not expired
        if (this.tokenExpired(this.AuthToken)) {
          console.warn("Token expired, redirecting user to login.");
          this.forceLogout();
          return;
        }

        this.IsAuthenticated = true;

        // Decode token to get user data
        const decodedToken: any = jwt_decode(this.AuthToken);

        const user = {
          name: decodedToken.name,
          Email: decodedToken.WorkEmail,
          'Company Guid': decodedToken.CompanyGUID,
          'Company Name': decodedToken.CompanyName,
          Username: decodedToken.Username,
          'User Guid': decodedToken.UserGUID
        };

        // Set user details for feature flags
        floodgateService.setUser(user['User Guid'], user['Email'], {
          Username: user['Username'],
          CompanyGuid: user['Company Guid'],
          Name: user['name']
        });

        // Initiate mixpanel
        mixpanelService.setUserIdentifier(decodedToken.UserGUID);
        mixpanelService.setUserProperties(user);
      }
      else {
        // Keep this in else as to not trigger UI update if token is valid
        this.IsAuthenticated = false;

        this.forceLogout();
      }

      this.logger.WriteLog(this.IsAuthenticated.toString(), "IsAuthenticated >>>");
    });
  }

  /**
   * Check to see if a token as expired
   * @param token token to check
   * @returns returns true if token has expired
   */
  private tokenExpired(token: String): boolean {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  /**
   * Force the user to be logged out because of invalid token
   */
  private forceLogout(): void {
    this.destroyAuth();

    // Redirect to login page
    if (environment.name === 'Production') {
      alert("Sorry your session has expired, please login again.");
      window.location.href = `${environment.ExpressUi.AppLoginUrl}?error=invalid_token`;
    }
    else {
      console.warn(`DEVELOPMENT MODE: Redirecting to ${environment.ExpressUi.AppLoginUrl}?error=invalid_token`);
      alert(`DEVELOPMENT MODE: You would usually be redirected to ${environment.ExpressUi.AppLoginUrl}?error=invalid_token if this was production`);
    }
  }

  /**
   * Destroy all authentication related tokens/cookies
   */
  private destroyAuth(): void {
    this.cookieStorageService.removeToken();
    this.cookieStorageService.deleteItem("Auth");
    this.cookieStorageService.deleteItem("__AppUserGuid");
    this.cookieStorageService.deleteItem("__AppCompanyGuid");
  }
}
