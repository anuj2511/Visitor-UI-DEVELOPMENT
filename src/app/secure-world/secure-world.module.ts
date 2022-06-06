import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureWorldRoutingModule } from './secure-world-routing.module';
import { SecureWorldComponent } from './secure-world.component';


@NgModule({
  declarations: [SecureWorldComponent],
  imports: [
    CommonModule,
    SecureWorldRoutingModule
  ]
})
export class SecureWorldModule { }
