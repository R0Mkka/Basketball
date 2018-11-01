import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Player } from 'src/app/dataTypes/player';

@Component({
    selector: 'app-edit-form',
    templateUrl: './edit-form.component.html',
    styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
    @Input() player: Player;

    public editForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.editForm = this.formBuilder.group({
            assistsPerGame: [this.player.assists_per_game],
            blocksPerGame: [this.player.blocks_per_game],
            defensiveReboundsPerGame: [this.player.defensive_rebounds_per_game],
            fieldGoalPercentage: [this.player.field_goal_percentage],
            fieldGoalsAttemptedPerGame: [this.player.field_goals_attempted_per_game],
            fieldGoalsMadePerGame: [this.player.field_goals_made_per_game],
            freeThrowPercentage: [this.player.free_throw_percentage],
            gamesPlayed: [this.player.games_played],
            minutesPerGame: [this.player.minutes_per_game],
            offensiveReboundsPerGame: [this.player.offensive_rebounds_per_game],
            playerEfficiencyRating: [this.player.player_efficiency_rating],
            pointsPerGame: [this.player.points_per_game],
            reboundsPerGame: [this.player.rebounds_per_game],
            stealsPerGame: [this.player.steals_per_game],
            threePointAttemptedPerGame: [this.player.three_point_attempted_per_game],
            threePointMadePerGame: [this.player.three_point_made_per_game],
            threePointPercentage: [this.player.three_point_percentage],
            turnoversPerGame: [this.player.turnovers_per_game]
        });
    }
}