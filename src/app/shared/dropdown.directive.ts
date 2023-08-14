import { Directive, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective{
    @HostBinding('class.open') isOpen = false;  //bind to the class property of the element the directive is placed on
    constructor() {}
    @HostListener('click') toggleOpen() {  
        this.isOpen = !this.isOpen; //toggle the value of isOpen
    }
    
}