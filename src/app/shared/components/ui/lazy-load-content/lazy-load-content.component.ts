import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-lazy-load-content',
  templateUrl: './lazy-load-content.component.html',
  styleUrls: ['./lazy-load-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyLoadContentComponent {
  @ViewChild('scrollContainer')
  public scrollContainerRef: ElementRef;

  @Output()
  public loadMore: EventEmitter<{ offset: number }>;

  @Input()
  public isLoading: boolean;
  @Input()
  public total: number = 0;
  @Input()
  public loadedTotal: number = 0;

  constructor() {
    this.loadMore = new EventEmitter<{ offset: number }>();
    this.isLoading = false;
    this.scrollContainerRef = new ElementRef(null);
  }

  public get htmlElem(): HTMLElement {
    return this.scrollContainerRef.nativeElement;
  }

  public handleScroll($event: any) {
    const maxScroll = this.htmlElem.scrollHeight;
    const currentScroll = this.htmlElem.scrollTop + this.htmlElem.offsetHeight;
    if (
      currentScroll > maxScroll * 0.7 &&
      !this.isLoading &&
      this.loadedTotal < this.total
    ) {
      this.loadMore.emit({
        offset: this.loadedTotal,
      });
    }
  }
}
