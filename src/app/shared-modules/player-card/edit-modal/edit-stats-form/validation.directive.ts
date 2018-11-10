import { Directive, ElementRef, HostListener } from '@angular/core';

import { ValidationService } from './validation.service';

@Directive({
    selector: '[validation]'
})
export class ValidationDirective {

    constructor(
        private element: ElementRef,
        private validation: ValidationService) { }

    @HostListener('input') onInput() {
        const value = this.element.nativeElement.value;
        if (value.trim() == '') {
            this.validation.setInvalidStatus();
            this.validation.setField(this.element.nativeElement.getAttribute('placeholder'));
        } else {
            this.validation.removeField(this.element.nativeElement.getAttribute('placeholder'));
            this.validation.checkForValid();
        }

        this.validation.checkFormStatus.emit(this.validation.formStatus);
    }
}