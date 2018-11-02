import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-edit-stats-form',
    templateUrl: './edit-stats-form.component.html',
    styleUrls: ['./edit-stats-form.component.css']
})
export class EditStatsFormComponent {
    @Input() player: Player;

    public editForm = this.formBuilder.group({
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

    public fieldsList = Object.keys(this.editForm.controls);

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            assists_per_game: [this.player.assists_per_game],
            blocks_per_game: [this.player.blocks_per_game],
            defensive_rebounds_per_game: [this.player.defensive_rebounds_per_game],
            field_goal_percentage: [this.player.field_goal_percentage],
            field_goals_attempted_per_game: [this.player.field_goals_attempted_per_game],
            field_goals_made_per_game: [this.player.field_goals_made_per_game],
            free_throw_percentage: [this.player.free_throw_percentage],
            games_played: [this.player.games_played],
            minutes_per_game: [this.player.minutes_per_game],
            offensive_rebounds_per_game: [this.player.offensive_rebounds_per_game],
            player_efficiency_rating: [this.player.player_efficiency_rating],
            points_per_game: [this.player.points_per_game],
            rebounds_per_game: [this.player.rebounds_per_game],
            steals_per_game: [this.player.steals_per_game],
            three_point_attempted_per_game: [this.player.three_point_attempted_per_game],
            three_point_made_per_game: [this.player.three_point_made_per_game],
            three_point_percentage: [this.player.three_point_percentage],
            turnovers_per_game: [this.player.turnovers_per_game]
        });
    }

    getTitle(teamName: string) {
        const splitTeamName = teamName.split('_');

        splitTeamName[0] = splitTeamName[0].charAt(0).toUpperCase() + splitTeamName[0].slice(1);

        return splitTeamName.join(' ');
    }

    getPlaceholder(teamName: string) {
        const splitTeamName = teamName.split('_').map((word: string) => {
            return word[0].toUpperCase();
        });

        return splitTeamName.join('');
    }
}