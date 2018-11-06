import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-edit-stats-form',
    templateUrl: './edit-stats-form.component.html',
    styleUrls: ['./edit-stats-form.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EditStatsFormComponent),
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStatsFormComponent implements OnInit, ControlValueAccessor {
    public editPlayerForm: FormGroup;
    public fieldsList: string[];

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.setPlayerForm();
        this.fieldsList = Object.keys(this.editPlayerForm.value);
    }

    writeValue(player: Player): void {
        if(!player) {
            return;
        }

        this.setPlayerForm(player);
    }

    registerOnChange(fn: any): void { }
    registerOnTouched(fn: any): void { }
    setDisabledState?(isDisabled: boolean): void { }

    public getTitle(fieldName: string): string {
        const splitFieldName = fieldName.split('_');

        splitFieldName[0] = splitFieldName[0].charAt(0).toUpperCase() + splitFieldName[0].slice(1);

        return splitFieldName.join(' ');
    }

    public getPlaceholder(fieldName: string): string {
        const splitFieldName = fieldName.split('_').map((word: string) => {
            return word[0].toUpperCase();
        });

        return splitFieldName.join('');
    }

    private setPlayerForm(player?: Player): void {
        if (!player) {
            this.editPlayerForm = this.formBuilder.group({
                assists_per_game: [''],
                blocks_per_game: [''],
                defensive_rebounds_per_game: [''],
                field_goal_percentage: [''],
                field_goals_attempted_per_game: [''],
                field_goals_made_per_game: [''],
                free_throw_percentage: [''],
                games_played: [''],
                minutes_per_game: [''],
                offensive_rebounds_per_game: [''],
                player_efficiency_rating: [''],
                points_per_game: [''],
                rebounds_per_game: [''],
                steals_per_game: [''],
                three_point_attempted_per_game: [''],
                three_point_made_per_game: [''],
                three_point_percentage: [''],
                turnovers_per_game: ['']
            });
        } else {
            this.editPlayerForm.patchValue(player);
        }
    }
}