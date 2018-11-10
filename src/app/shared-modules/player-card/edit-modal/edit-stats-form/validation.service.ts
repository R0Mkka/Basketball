import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ValidationService {
    @Output() checkFormStatus = new EventEmitter<boolean>();
    
    public formStatus = true;
    private fieldsSet: Set<string> = new Set();

    public setField(placeholder: string): void {
        this.fieldsSet.add(placeholder);
    }

    public removeField(placeholder: string) {
        this.fieldsSet.delete(placeholder);
    }

    public checkForValid(): void {
        this.formStatus = true;
        this.fieldsSet.forEach(() => {
            this.formStatus = false;
            return;
        });
    }

    public setInvalidStatus(): void {
        this.formStatus = false;
    }
}