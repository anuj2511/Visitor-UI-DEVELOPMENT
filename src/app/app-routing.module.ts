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

<<<<<<< Updated upstream
=======
  { path: 'invites', loadChildren: () => import('./invites/invites.module').then(m => m.InvitesModule) },

  { path: 'configuration', loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule) },

  { path: 'visitorprofile', loadChildren: () => import('./visitorprofile/visitorprofile.module').then(m => m.VisitorprofileModule) },

>>>>>>> Stashed changes
  { path: '**', redirectTo: '/404', pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
