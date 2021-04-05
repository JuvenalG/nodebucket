/**
 * Title: app-routing.module.ts
 * Author: Professor Krasso
 * Date: 21 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: passes array that holds all routes
 */


import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { BaseLayoutComponent } from './shared/base-layout/base-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: '',          // HomeComponent is guarded by authGuard and displays the login page with authguard revealing the homecomponent upon authorization
        component: HomeComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "about-us",
        component: AboutUsComponent
      }

    ]
  },
  {
    path: "session",  //session is used as a boolean object and if false will display the login component
    component: AuthLayoutComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      },
    ]
  },

    {
      path: 'not-found',
      component: NotFoundComponent
    },
    {
      path: '**',  //used to navigate to 404 error page whenever an undefiend url is inputted
      redirectTo: '/not-found'
    }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, enableTracing: false, scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
