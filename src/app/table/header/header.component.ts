import { Component, ElementRef, HostBinding } from '@angular/core';

@Component({
  selector: 'th[app-table-header]',
  templateUrl: './header.component.html',
  standalone: true,
  styles: `
  :host { text-align: left; }
  `
})
export class HeaderComponent {
  
  @HostBinding('style.display.none')
  isHidden: boolean = false;

  constructor(
    public elementRef: ElementRef
  ) {}
}
