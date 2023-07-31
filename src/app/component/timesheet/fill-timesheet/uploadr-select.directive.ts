import {
  Directive,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appUploadrSelect]',
})
export class UploadrSelectDirective {
  @Output()
  public fileSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

  protected element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element;
  }

  @HostListener('change')
  public onChange(): any {
    const files = this.element.nativeElement.files;
    this.fileSelected.emit(files);
  }
}
