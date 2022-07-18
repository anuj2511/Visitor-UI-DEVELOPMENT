import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@justlogin/express-ui';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
//new imports
//import { GridModule } from '@syncfusion/ej2-angular-grids';
// import { GridAllModule } from '@syncfusion/ej2-angular-grids'; 
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ExampleComponent } from './example/example.component';
import { DataTablesModule } from 'angular-datatables';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { ToastrModule } from 'ngx-toastr';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  // return new TranslateHttpLoader(httpClient);
  return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    ExampleComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    // GridAllModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    LayoutModule.forRoot(environment), // Inject the environemnt config into the Express layout component
   
    DateRangePickerModule,
    DataTablesModule,
    Ng2OrderModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true
    }),
    NguiAutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }