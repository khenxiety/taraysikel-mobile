import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[text-ellipsis]',
})
export class TextEllipsisDirective {
  @Input('text-ellipsis') length: number =0;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const content = this.el.nativeElement.innerHTML.trim();
    if (content.length > this.length) {
      const ellipsis = '...';
      const truncatedContent = content.slice(0, this.length) + ellipsis;
      this.el.nativeElement.innerHTML = truncatedContent;
      this.el.nativeElement.setAttribute('title', content);
    }
  }
}
