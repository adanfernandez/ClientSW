import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CommonUrls } from './shared/common-urls';
import { HomeComponent } from './home/home.component';
import { NotFoundModule } from './not-found/not-found.module';
import { GuardsComponent } from './shared/guards/guards.component';

const routes: Routes = [
  {
    path: CommonUrls.HOME,
    canActivate: [GuardsComponent],
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
      path: CommonUrls.LOGIN,
      loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
      path: CommonUrls.REGISTER,
      loadChildren: () => import('./register/register.module').then(module => module.RegisterModule)
  },
  {
      path: CommonUrls.PANEL,
      canActivate: [GuardsComponent],
      loadChildren: () => import('./panel/panel.module').then(module => module.PanelModule)
  },
  {
    path: CommonUrls.NONE,
    redirectTo: CommonUrls.HOME,
    pathMatch: 'full',
  },
  {
    path: CommonUrls.ANY,
    loadChildren: () => import('./not-found/not-found.module').then(module => module.NotFoundModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }