import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[appShowImage]'
})
export class ShowImageDirective {
    private display = 'none';

    @HostBinding('style.display') get getDisplay() {
        return this.display;
    }

    @HostListener('load') onLoad() {
        this.display = 'block';
    }
}