import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FieldComponent),
            multi: true
        }
    ]
})
export class FieldComponent implements ControlValueAccessor {
    @Input() title: string;
    @Input() placeholder: string;

    public value: string;

    onChange(value: string) {
        this.writeValue(value);
    }

    onTouched = () => {};

    writeValue(value: string): void {
        this.value = value ? value : '';
    }    
    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onChange = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        console.log('SETDISABLED');
    }

    getTitle(teamName: string) {
        const splitTeamName = teamName.split('_');

        splitTeamName[0] = splitTeamName[0].charAt(0).toUpperCase() + splitTeamName[0].slice(1);

        return splitTeamName.join(' ');
    }

    getPlaceholder(teamName: string) {
        const splitTeamName = teamName.split('_').map((word: string) => {
            return word[0].toUpperCase();
        });

        return splitTeamName.join('');
    }    
}