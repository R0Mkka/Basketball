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
  isClearFavorites = false;

  private progressId: any;

  ngOnInit() {
    this.runProgressBar();
  }

  onActivate($event) {
    for (let key in $event) {
      if (key === 'progressBar') {
        const progressBar = $event[key];

        const tempInterval = setInterval(() => {
          if ($event[key].value === 100) {
            this.teamsLoaded();
            clearInterval(tempInterval);
          }
        }, 100);
      }
    }
  }

  changeContent($event: boolean) {
    this.isTeams = $event;
  }

  toggleFavoritesShow(favoritesState: boolean) {
    this.isFavorites = favoritesState;
  }

  clearFavorites() {
    this.isClearFavorites = true;
    setTimeout(() => {
      this.isClearFavorites = false;
    }, 1000);
  }

  teamsLoaded() {
    this.progress = 100;

    clearInterval(this.progressId);
  }

  private runProgressBar() {
    this.progressId = setInterval(() => {
      this.progress++;

      if (this.progress >= 90) {
        clearInterval(this.progressId);
      }
    }, 40);
  }
}

