import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ImagesComponent } from './images.component';
import { ImagesService } from '../services/images-services/images.service';
import { ImagesRoutingModule } from './images-routing.module';
import { ImagesListComponentModule } from '../shared/components/images-list-components/images-list-component.module';

@NgModule({
  declarations: [ImagesComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    ImagesListComponentModule,
  ],
  providers: [ImagesService],
})
export class ImagesModule {}
