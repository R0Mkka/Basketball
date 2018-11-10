import { Component, OnInit, NgZone } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  public isLoading: boolean;
  public isBackdrop: boolean;

  private progressId: any;

  constructor(
    private progressBar: ProgressBarService, 
    private loading: LoadingService,
    private router: Router,
    private ngZone: NgZone) {
      this.progress = 0;
      this.isTeams = true;
      this.isFavorites = false;
      this.isBackdrop = false;
    }

  ngOnInit() {
    this.runProgressBar();
    this.subscribeOnLoadingEvent();
    this.subscribeOnNavigationStartEvent();
  }

  public changeContent($event: boolean): void {
    this.isTeams = $event;
  }

  public toggleFavoritesShow(favoritesState: boolean): void {
    this.isFavorites = favoritesState;
  }

  private runProgressBar(): void {
    this.progressBar.contentLoaded.subscribe(
      (value: number) => this.progress = value
    );

    this.ngZone.runOutsideAngular(() => {
      this.progressId = setInterval(() => {
        this.progress += this.generateRandomNumber(5);
  
        if (this.progress >= 90) {
          clearInterval(this.progressId);
        }
      }, 200);

    });
  }

  private generateRandomNumber(maxValue: number): number {
    return Math.round(Math.random() * maxValue);
  }

  private subscribeOnLoadingEvent(): void {
    this.loading.changeLoadingState.subscribe(
      loadingSettings => {
        this.isLoading = loadingSettings.isLoading;
        this.isBackdrop = loadingSettings.isBackdrop;
      }
    )
  }

  private subscribeOnNavigationStartEvent(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(
      () => this.isLoading = true
    );
  }
}

