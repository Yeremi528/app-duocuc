import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
 
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'register',
        loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
      },
      {
        path: 'tabs',
        loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule),
        canActivate: [AuthGuard] 
      },
      {
        path: '**',
        loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
      },
    
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
