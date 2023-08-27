export const Endpoints = {
  actors: 'actors',
  characters: 'characters',
  episodes: 'episodes',
  games: 'games',
  locations: 'locations',
  seasons: 'seasons',
  soundtracks: 'soundtracks',
};

export type EndpointType = keyof typeof Endpoints;
