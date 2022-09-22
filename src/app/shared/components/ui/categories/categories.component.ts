import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CategoriesService } from '../../../../services/categories/categories.service';
import { Category } from '../../../../core/types/modals/Category';

@UntilDestroy()
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  @Output()
  public changeTag: EventEmitter<string>;

  private _categories: Category[];
  private readonly _selectedCategories: string[];

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this._categories = [];
    this._selectedCategories = [];
    this.changeTag = new EventEmitter();
  }
  ngOnInit() {
    this.categoriesService
      .getCategories()
      .pipe(untilDestroyed(this))
      .subscribe((categories) => {
        this._categories = categories;
        this.cdRef.detectChanges();
      });
  }

  get categories(): Category[] {
    return this._categories;
  }

  get selectedCategories(): string[] {
    return this._selectedCategories;
  }

  public indexOfSelected(category: Category): number {
    return this.selectedCategories.indexOf(category.name_encoded);
  }

  public toggleCategory(category: Category) {
    const indexOfSelected = this.indexOfSelected(category);
    if (indexOfSelected >= 0) {
      this.selectedCategories.splice(indexOfSelected, 1);
    } else {
      this.selectedCategories.push(category.name_encoded);
      this.checkLengthAndCut();
    }
    this.changeValue();
  }

  public checkLengthAndCut() {
    if (this.selectedCategories.length === 4) this.selectedCategories.shift();
  }

  public changeValue() {
    const search = this.selectedCategories.join(' ');
    this.changeTag.emit(search);
  }
}
