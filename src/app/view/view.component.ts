import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  progress = 0;
  isTeams = true;
  isFavorites = false;

  private progressId: any;

  ngOnInit() {
    this.runProgressBar();
  }

  changeContent($event: boolean) {
    this.isTeams = $event;
  }

  toggleFavoritesShow(showFavorites: boolean) {
    this.isFavorites = showFavorites;
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
    }, 40);
  }
}

