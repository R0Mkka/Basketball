import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() stateChanged = new EventEmitter<boolean>();

  isTeams = true;

  constructor() { }

  changeContent() {
    this.isTeams = !this.isTeams;
    this.stateChanged.emit(this.isTeams);
  }

}
