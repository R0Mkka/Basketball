import { Injectable, Output, EventEmitter } from '@angular/core';

interface LoadingSettings {
    isLoading: boolean;
    isBackdrop: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    @Output() changeLoadingState = new EventEmitter<LoadingSettings>();

    private settings: LoadingSettings;

    public show(isBackdrop: boolean): void {
        this.settings = {
            isLoading: true,
            isBackdrop
        }

        this.changeLoadingState.emit(this.settings);
    }

    public hide(): void {
        this.settings = {
            isLoading: false,
            isBackdrop: false
        }

        this.changeLoadingState.emit(this.settings);
    }
}