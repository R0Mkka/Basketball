import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  progress = 0;
  isTeams = true;

  private progressId: number;

  changeContent($event: boolean) {
    this.isTeams = $event;
  }

  ngOnInit() {
    this.runProgressBar();
  }

  teamsLoaded() {
    this.progress = 100;

    clearInterval(this.progressId);
  }

  private runProgressBar() {
    this.progressId = setInterval(() => {
      this.progress++;

      if (this.progress >= 100) {
        clearInterval(this.progressId);
      }
    }, 30);
  }
}

