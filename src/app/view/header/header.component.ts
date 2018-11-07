import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { SortPlayersService } from 'src/app/core/sort-players/sort-players.service';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';
import { LoadingService } from 'src/app/shared-modules/loading/loading.service';
import { SlideToggleService } from 'src/app/core/slide-toggle/slide-toggle.serivce';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public isTeams: boolean;

  private routerLink: string;
  private navigationStart: Observable<NavigationStart>;

  constructor(
    private cdRef: ChangeDetectorRef,
    private sortPlayersService: SortPlayersService,
    private storage: LocalStorageService,
    private router: Router,
    private loading: LoadingService,
    private slideToggle: SlideToggleService) {
      this.navigationStart = router.events.pipe(
        filter(event => event instanceof NavigationStart)
      ) as Observable<NavigationStart>;
    }

  ngOnInit() {
    this.subscribeOnNavigationStartEvent();
    this.subscribeOnToggleChanges();
  }

  public clearFavorites(): void {
    const message = 'Do you really want to clear your favorites list?';

    if (confirm(message)) {
      this.storage.clear();
    }
  }

  public sortPlayersByField(fieldName: string): void {
    this.loading.show(true);
    this.sortPlayersService.sortPlayersList(fieldName);
  }

  public checkUrlForFavorites(): boolean {
    return !!~this.router.url.indexOf('favorites');
  }

  public checkUrlForPlayers(): boolean {
    return !~this.router.url.indexOf('players');
  }

  public changeContent(): void {
    this.routerLink = (this.isTeams) ? '/players' : '/teams'; 
    this.isTeams = !this.isTeams;

    if (this.routerLink === '/players' || this.routerLink === '/teams') {
      this.loading.show(false);
      this.router.navigate(
        [this.routerLink]
      );
    }
  }

  public goToFavorites(): void {
    if (!this.checkUrlForFavorites()) {
      this.loading.show(false);
    }
  }

  private subscribeOnNavigationStartEvent(): void {
    this.navigationStart.subscribe(
      event => {
        this.routerLink = event.url;
        this.isTeams = this.routerLink === '/teams' || this.routerLink === '/';
        if (!this.cdRef['destroyed']) {
          this.cdRef.detectChanges();
        }
      }
    );
  }

  private subscribeOnToggleChanges(): void {
    this.slideToggle.stateChaged.subscribe(
      (isTeamsState: boolean) => {
        this.isTeams = isTeamsState;
        if (!this.cdRef['destroyed']) {
          this.cdRef.detectChanges();
        }
      }
    );
  }
}
