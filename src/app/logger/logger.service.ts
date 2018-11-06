import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Logger {
    public log(message: string): void {
        console.log(`[LOG MESSAGE]: ${message}`);
    }

    public error(message: string): void {
        console.error(`[ERROR MESSAGE]: ${message}`);
    }
}