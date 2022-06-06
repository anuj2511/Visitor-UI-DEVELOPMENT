import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvitesComponent } from './invites.component';

const routes: Routes = [{ path: '', component: InvitesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvitesRoutingModule { }
