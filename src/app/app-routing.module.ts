import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@justlogin/express-ui';

const routes: Routes = [

  // UPDATE THIS PATH TO POINT TO YOUR DEFAULT ROUTE
  { path: '', redirectTo: 'hello-world', pathMatch: 'full' },

  // REMOVE THE FOLLOWING PATHS AND REPLACE THEM WITH YOUR OWN REQUIRED ROUTES
  {
    path: '', children:
      [
        { path: 'hello-world', loadChildren: () => import('./hello-world/hello-world.module').then(m => m.HelloWorldModule) },
        { path: 'secure-world', canActivate: [AuthGuard], loadChildren: () => import('./secure-world/secure-world.module').then(m => m.SecureWorldModule) },
      ]
  },

  { path: '**', redirectTo: '/404', pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
