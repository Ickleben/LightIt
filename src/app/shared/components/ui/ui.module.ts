import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from '../../../services/categories/categories.service';
import { LazyLoadContentComponent } from './lazy-load-content/lazy-load-content.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [CategoriesComponent, LazyLoadContentComponent],
  exports: [CategoriesComponent, LazyLoadContentComponent],
  providers: [CategoriesService],
})
export class UiModule {}
