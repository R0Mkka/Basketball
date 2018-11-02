export interface Player {
  assists_per_game: string;
  blocks_per_game: string;
  defensive_rebounds_per_game: string;
  field_goal_percentage: string;
  field_goals_attempted_per_game: string;
  field_goals_made_per_game: string;
  free_throw_percentage: string;
  games_played: string;
  image: string;
  team_image: string;
  minutes_per_game: string;
  name: string;
  offensive_rebounds_per_game: string;
  player_efficiency_rating: string;
  points_per_game: string;
  rebounds_per_game: string;
  steals_per_game: string;
  team_acronym: string;
  team_name: string;
  three_point_attempted_per_game: string;
  three_point_made_per_game: string;
  three_point_percentage: string;
  turnovers_per_game: string;
  is_favorite: boolean;
}

export const defaultPlayer = {
  assists_per_game: '',
  blocks_per_game: '',
  defensive_rebounds_per_game: '',
  field_goal_percentage: '',
  field_goals_attempted_per_game: '',
  field_goals_made_per_game: '',
  free_throw_percentage: '',
  games_played: '',
  minutes_per_game: '',
  offensive_rebounds_per_game: '',
  player_efficiency_rating: '',
  points_per_game: '',
  rebounds_per_game: '',
  steals_per_game: '',
  three_point_attempted_per_game: '',
  three_point_made_per_game: '',
  three_point_percentage: '',
  turnovers_per_game: ''
}