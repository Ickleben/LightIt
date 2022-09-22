import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-image-sidebar',
  templateUrl: './image-sidebar.component.html',
  styleUrls: ['./image-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageSidebarComponent {
  @Output()
  public changeFilter: EventEmitter<string>;

  constructor() {
    this.changeFilter = new EventEmitter();
  }

  public toggleFilter(event: string) {
    this.changeFilter.emit(event);
  }
}
