import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProgressBarService {
    @Output() contentLoaded = new EventEmitter<number>();

    public emitContentLoaded() {
        this.contentLoaded.emit(100);
    }
}