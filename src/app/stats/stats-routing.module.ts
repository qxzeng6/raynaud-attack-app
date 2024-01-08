import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsPage } from './stats.page';
import {statsResolver} from "./stats.resolver";

const routes: Routes = [
  {
    path: '',
    component: StatsPage,
    resolve: { data: statsResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatsPageRoutingModule {}
