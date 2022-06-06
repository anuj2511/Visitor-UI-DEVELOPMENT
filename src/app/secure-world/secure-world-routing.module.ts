import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecureWorldComponent } from './secure-world.component';

const routes: Routes = [
  { path: '', component: SecureWorldComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureWorldRoutingModule { }
