import { EpisodeModel, createClient } from '@hawapi/js-sdk';
// const { EpisodeModel, createClient } = require('@hawapi/js-sdk');

(async () => {
  // Remove 'endpoint' option to call the real API
  const client = createClient({ endpoint: 'http:/localhost:8080/api' });
  const res = await client.getRandom<EpisodeModel>('episodes');
  console.log(res);
})();
