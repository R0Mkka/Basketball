import { Component, OnInit } from '@angular/core';

import { ProgressBarService } from 'src/app/shared-modules/progress-bar/progress-bar.service';
import { LoadingService } from 'src/app/shared-modules/loading/loading.service';

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

  public isLoading: boolean;
  public isBackdrop: boolean;

  private progressId: any;

  constructor(private progressBar: ProgressBarService, private loading: LoadingService) {
    this.progress = 0;
    this.isTeams = true;
    this.isFavorites = false;
    this.isClearFavorites = false;

    this.isLoading = true;
    this.isBackdrop = false;
  }

  ngOnInit() {
    this.runProgressBar();
    this.progressBar.contentLoaded.subscribe(
      (value: number) => this.progress = value
    );
    this.subsribeOnLoadingEvent();
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

  private runProgressBar(): void {
    this.progressId = setInterval(() => {
      this.progress += Math.round(Math.random() * 5);

      if (this.progress >= 90) {
        clearInterval(this.progressId);
      }
    }, 200);
  }

  private subsribeOnLoadingEvent(): void {
    this.loading.changeLoadingState.subscribe(
      loadingSettings => {
        this.isLoading = loadingSettings.isLoading;
        this.isBackdrop = loadingSettings.isBackdrop;
      }
    )
  }
}

