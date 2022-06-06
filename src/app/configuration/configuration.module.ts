import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { GridAllModule } from '@syncfusion/ej2-angular-grids'; 
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    GridAllModule,
    DataTablesModule
  ]
})
export class ConfigurationModule { }
