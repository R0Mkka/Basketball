import { Component } from '@angular/core';

@Component({
    selector: 'app-loading',
    templateUrl: './loading-modal.component.html',
    styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
    isLoading = false;
}