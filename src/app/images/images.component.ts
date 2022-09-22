import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ImagesService } from '../services/images-services/images.service';
import { Image } from '../core/types/modals/Image';
import { ResponseImages } from '../core/types/modals/ResponseImages';
import { IImagesParams } from '../core/types/interfaces/IImagesParams';

@UntilDestroy()
@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImagesComponent implements OnInit {
  public _images: Image[];
  public _params: IImagesParams;
  public _total: number;
  public _isLoading: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly imagesListService: ImagesService,
    private readonly cdRef: ChangeDetectorRef
  ) {
    this._images = [];
    this._total = 0;
    this._isLoading = false;
    this._params = {
      limit: 9,
      offset: 0,
    };
  }
  ngOnInit() {
    this.getImages(this.params);
  }

  get images(): Image[] {
    return this._images;
  }

  get params(): IImagesParams {
    return this._params;
  }

  get total(): number {
    return this._total;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  public getImages(params: IImagesParams) {
    const typeRequest = 'q' in params ? 'search' : 'trending';
    this.imagesListService
      .getImages(typeRequest, params)
      .pipe(untilDestroyed(this))
      .subscribe((res: ResponseImages) => {
        this._images = [...this._images, ...res.data];
        this._total = res.pagination.total_count;
        this._isLoading = false;
        this.cdRef.detectChanges();
      });
  }

  public toggleFilter(event: string) {
    this._images = [];
    this._params = {
      limit: 9,
      offset: 0,
      q: event,
    };
    if (!event) delete this._params.q;
    this.getImages(this.params);
  }

  public loadMore(event: { offset: number }) {
    this._params = {
      ...this.params,
      ...event,
    };
    this._isLoading = true;
    this.getImages(this.params);
  }
}
