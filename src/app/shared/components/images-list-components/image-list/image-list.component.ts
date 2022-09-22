import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Image } from '../../../../core/types/modals/Image';

@UntilDestroy()
@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageListComponent {
  @Output()
  public loadMore: EventEmitter<{ offset: number }>;

  @Input() set arrOfImages(items: Image[]) {
    this._images = items;
  }

  @Input() set setTotal(total: number) {
    this._total = total;
  }

  @Input() set loading(loading: boolean) {
    this._loading = loading;
  }

  public _images: Image[];
  public _total: number;
  public _loading: boolean;

  constructor() {
    this.loadMore = new EventEmitter();
    this._total = 0;
    this._loading = false;
    this._images = [];
  }

  get images(): Image[] {
    return this._images;
  }

  get total(): number {
    return this._total;
  }

  get isLoading(): boolean {
    return this._loading;
  }

  public toggleLoadMore(event: { offset: number }) {
    this._loading = true;
    this.loadMore.emit(event);
  }
}
