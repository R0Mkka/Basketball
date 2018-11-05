import { Component, OnInit } from '@angular/core';

import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public progress: number;
  public isTeams: boolean;
  public isFavorites: boolean;
  public isClearFavorites: boolean;

  private progressId: any;

  constructor(private progressBar: ProgressBarService) {
    this.progress = 0;
    this.isTeams = true;
    this.isFavorites = false;
    this.isClearFavorites = false;
  }

  ngOnInit() {
    this.runProgressBar();
    this.progressBar.contentLoaded.subscribe(
      value => this.progress = value
    );
  }

  public changeContent($event: boolean): void {
    this.isTeams = $event;
  }

  public toggleFavoritesShow(favoritesState: boolean): void {
    this.isFavorites = favoritesState;
  }

  public clearFavorites(): void {
    this.isClearFavorites = true;
    setTimeout(() => {
      this.isClearFavorites = false;
    }, 1000);
  }

  private contentLoaded(): void {
    this.progress = 100;

    clearInterval(this.progressId);
  }

  private runProgressBar(): void {
    this.progressId = setInterval(() => {
      this.progress++;

      if (this.progress >= 90) {
        clearInterval(this.progressId);
      }
    }, 40);
  }
}

