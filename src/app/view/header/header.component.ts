import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { PlayerListService } from '../content/player-list/player-list.service';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isTeams: boolean;

  private routerLink: string;
  private navStart: Observable<NavigationStart>;

  constructor(private playerListService: PlayerListService,
              private storage: LocalStorageService,
              private router: Router) {
    this.navStart = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationStart>; 
  }

  ngOnInit() {
    this.navStart.subscribe(
      event => {
        this.routerLink = event.url;
        this.isTeams = this.routerLink === '/teams';
      } 
    );
  }

  clearFavorites() {
    const answer = confirm("Do you really want to clear your favorites list?")

    if (answer) {
      this.storage.clear();
    }
  }

  changeContent() {
    this.routerLink = (this.isTeams) ? '/players' : '/teams'; 
    this.isTeams = !this.isTeams;

    if (this.routerLink === '/players' || this.routerLink === '/teams') {
      this.router.navigate(
        [this.routerLink]
      );
    }
  }
}
