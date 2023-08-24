const HawAPI = require('../../dist/index.min.cjs');

const client = HawAPI.createClient({
  endpoint: 'http://localhost:8080/api',
  inMemoryCache: false,
});

client
  .getAll('actor')
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
