import { Component, EventEmitter, Input, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Player } from 'src/app/dataTypes/player';
import { icons } from 'src/app/config/icons';

import { ValidationService } from './edit-stats-form/validation.service';
import { LocalStorageService } from 'src/app/core/local-storage/local-storage.service';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditModalComponent implements OnInit {
  @Input() set playerSettings(player: Player) {
    if (!player) {
      return;
    }

    if (this.storage.has(player.name)) {
      this.player = JSON.parse(this.storage.get(player.name));
      this.player.image = player.image;
      this.player.team_image = player.team_image;
      this.player.is_favorite = player.is_favorite;
    } else {
      this.player = player;
    }

    this.playerControl.patchValue(this.player);
  };
  @Output() favoriteStateChanged = new EventEmitter<boolean>();
  @Output() modalClosed = new EventEmitter<any>();

  public player: Player;
  public saveImage: string;
  public favoriteStateImage: string;
  public playerControl: FormControl;

  constructor(
    private validation: ValidationService,
    private storage: LocalStorageService) {
      this.saveImage = icons.save.enabled;
      this.playerControl = new FormControl('');
    }

  ngOnInit() {
    this.favoriteStateImage = (this.player.is_favorite)
      ? icons.favorite.active
      : icons.favorite.inactive;

    this.subscribeOnSaveButtonStateChanges();
  }

  public toggleFavoriteState(): void {
    this.player.is_favorite = !this.player.is_favorite;
    this.favoriteStateChanged.emit(this.player.is_favorite);
    this.toggleHeartColor();
  }

  public savePlayerStats(): void {
    if (this.validation.formStatus) {
      this.modalClosed.emit();

      const session = sessionStorage;
      this.storage.set(this.player.name, session.getItem(this.player.name));
    }
  }

  private toggleHeartColor(): void {
    if (this.favoriteStateImage === icons.favorite.inactive) {
      this.favoriteStateImage = icons.favorite.active;
    } else {
      this.favoriteStateImage = icons.favorite.inactive;
    }
  }

  private subscribeOnSaveButtonStateChanges(): void {
    this.validation.checkFormStatus.subscribe(
      (formStatus: boolean) => {
        this.saveImage = (formStatus)
          ? icons.save.enabled
          : icons.save.disabled; 
      }
    )
  }
}
