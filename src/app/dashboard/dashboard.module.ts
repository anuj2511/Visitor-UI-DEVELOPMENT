import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids'; 
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DataTablesModule } from 'angular-datatables';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    GridAllModule,
    DateRangePickerModule,
    DataTablesModule,
    Ng2OrderModule
  ]
})
export class DashboardModule { }
