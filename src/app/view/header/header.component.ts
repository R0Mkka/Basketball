import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { filter, retry, tap, catchError } from 'rxjs/operators';

import { PlayerListService } from '../content/player-list/player-list.service';
import { SortPlayersService } from 'src/app/core/sort-players/sort-players.service';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

import { Player } from 'src/app/dataTypes/player';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isTeams: boolean;

  private routerLink: string;
  private navigationStart: Observable<NavigationStart>;

  constructor(private playerListService: PlayerListService,
              private sortPlayersService: SortPlayersService,
              private storage: LocalStorageService,
              private router: Router) {
    this.navigationStart = router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ) as Observable<NavigationStart>;
  }

  ngOnInit() {
    this.navigationStart.subscribe(
      event => {
        this.routerLink = event.url;
        this.isTeams = this.routerLink === '/teams' || this.routerLink === '/';
      }
    );
  }

  public clearFavorites(): void {
    const answer = confirm("Do you really want to clear your favorites list?")

    if (answer) {
      this.storage.clear();

      this.playerListService.getPlayers().pipe(
        retry(3),
        tap(
          (players: Player[]) => {
            players.forEach((player: Player) => player.is_favorite = false);
          }
        ),
        catchError(() => ([]))
      );
    }
  }

  public sortPlayersByField(fieldName: string): void {
    this.sortPlayersService.getSortedPlayersList(fieldName);
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
      this.router.navigate(
        [this.routerLink]
      );
    }
  }
}
