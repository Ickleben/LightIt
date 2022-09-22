import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagesComponent } from './images.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ImagesRoutingModule {}
