import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SlideToggleService {
    @Output() stateChaged = new EventEmitter<boolean>();

    public changeState(isTeams: boolean): void {
        this.stateChaged.emit(isTeams);
    }
}