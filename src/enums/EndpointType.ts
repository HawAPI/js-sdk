export const Endpoints = {
  actor: 'actors',
  character: 'characters',
  episode: 'episodes',
  game: 'games',
  location: 'locations',
  season: 'seasons',
  soundtrack: 'soundtracks',
};

export type EndpointType = keyof typeof Endpoints;
