import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisitorprofileRoutingModule } from './visitorprofile-routing.module';
import { VisitorprofileComponent } from './visitorprofile.component';


@NgModule({
  declarations: [VisitorprofileComponent],
  imports: [
    CommonModule,
    VisitorprofileRoutingModule
  ]
})
export class VisitorprofileModule { }
