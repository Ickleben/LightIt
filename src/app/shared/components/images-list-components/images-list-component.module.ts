import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImageSidebarComponent } from './images-sidebar/image-sidebar.component';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageComponent } from './image/image.component';
import { UiModule } from '../ui/ui.module';

const COMPONENTS = [ImageSidebarComponent, ImageListComponent, ImageComponent];

@NgModule({
  imports: [CommonModule, RouterModule, UiModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class ImagesListComponentModule {}
