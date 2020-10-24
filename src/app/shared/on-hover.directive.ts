import { Directive, Host, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appOnHover]'
})
export class OnHoverDirective {

  @HostBinding('style.backgroundColor') bgColor = 'transparent';
  @HostBinding('style.font-weight') fontWeight = 'initial';

  @HostListener('mouseenter') onMouseEnter(){

    this.bgColor = 'aqua';
    this.fontWeight = 'bold';

  }

  @HostListener('mouseleave') onMouseLeave(){

    this.bgColor = 'transparent';
    this.fontWeight = 'initial';
  }
  constructor() { }

}
