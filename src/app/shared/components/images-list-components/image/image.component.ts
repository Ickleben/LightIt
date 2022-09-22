import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Image } from '../../../../core/types/modals/Image';

@UntilDestroy()
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent {
  @Input() set image(item: Image) {
    this._image = item;
  }
  public _image: Image | null;
  constructor() {
    this._image = null;
  }
}
