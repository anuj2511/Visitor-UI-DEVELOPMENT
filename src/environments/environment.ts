export const environment = {
  /**
   * Unique name this environment file belongs to
   */
  name: 'Development',

  /**
   * Set this to true for production builds
   */
  production: false,

  /**
   * Enable/disable logging to the browser console. This should be disabled in production builds
   */
  logging: true,

  /**
   * Not used
   */
  clientId: 'ng',

  /**
   * Add any application specific settings here
   */
  AppConfig: {
    /**
     * Any end-points the application needs access to should be added to the urls section
     */
    URLs: {},
  },

  /**
   * The following settings are used inside the express-ui component
   * WARNING :: DO NOT CHANGE THE SETTINGS WITHIN ExpressUi SECTION
   * PLEASE ADD APPLICATION SPECIFIC SETTINGS INTO THE AppConfig SECTION BELOW
   */
  ExpressUi: {
    /**
     * Define the root path of the Angular app. This should be the same as `base href` in index.html
     * This is used in menu.xml (baseUrl) to identify if the side menu link is internal for the application or external
     * NOTE: This section is intended for Express UI data only, don't add application specific variables here.
     */
    AppRootPath: '/scaffold',

    /**
     * The root url for the apis
     */
    ApiBaseUrl: 'https://apis.justlogindevelopment.xyz',

    /**
     * Api for the Membership Service
     */
    MembershipServiceApiUrl: 'https://apis.justlogindevelopment.xyz/membership/v2/',

    /**
     * Api for Identity Server
     */
    AuthServiceApiUrl: 'https://apis.justlogindevelopment.xyz/v1/auth/',

    /**
     * Url for the application login page
     */
    AppLoginUrl: 'https://www.justlogindevelopment.xyz/login.aspx',

    /**
     * Url for linking to Express application in side menu
     * 
     * Note: Used in version express-ui 0.4.1
     */
    ExpressAppUrl: 'https://express.justlogindevelopment.xyz/',

    /**
     * Use for linking to side-by-side Angular apps in side menu
     * 
     * Note: Used in version express-ui 0.4.1+
     */
    AppHostUrl: '/',

    /**
     * showAllMenus overrides the available menus shown to the user, it shows all menus. This must be set to false for production builds
     */
    ShowAllMenus: true,

    /**
     * Google Tracking Id for Googla Analytics
     */
    GoogleTrackID: 'xxx',

    /**
     * Environment Key for Floodgate feature flag service
     */
    FloodgateEnvironmentKey: 'xxx',

    /**
     * How often should the feature flags be refreshed
     */
    FloodgateRefreshInterval: 5 * 60,

    /**
     * Allow enabling and disabling of mixpanel
     */
    MixpanelEnabled: false,

    /**
     * Application Id for Mixpanel tracking
     */
    MixpanelApplicationId: 'xxx'
  },

  /**
   * Auth section is used for the development login modal
   */
  auth: {
    client_id: 'JustLogin',
    client_secret: 'JxrAjDoa2FqElO7IhrSrUJELhUckePEPVpaePlS_UST',
  }
};