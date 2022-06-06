import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitesRoutingModule } from './invites-routing.module';
import { InvitesComponent } from './invites.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids'; 
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [InvitesComponent],
  imports: [
    CommonModule,
    InvitesRoutingModule,
    GridAllModule,
    DateRangePickerModule,
    DataTablesModule
  ]
})
export class InvitesModule { }
