import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupPage } from './setup.page';
import {setupResolver} from "./setup.resolver";

const routes: Routes = [
  {
    path: '',
    component: SetupPage,
    resolve: { data: setupResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupPageRoutingModule {}
