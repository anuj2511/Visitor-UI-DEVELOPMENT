import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorprofileComponent } from './visitorprofile.component';

const routes: Routes = [{ path: '', component: VisitorprofileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisitorprofileRoutingModule { }
