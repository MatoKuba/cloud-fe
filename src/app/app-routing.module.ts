import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPageComponent } from './components/users/user-page/user-page.component';

const routes: Routes = [
  {
    path: "user",
    component: UserPageComponent
  },
  {
    path: "**",
    component: UserPageComponent
  }
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
