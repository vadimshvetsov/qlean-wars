import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { omit } from 'ramda';

import { RESPONSE_DELAY } from 'utils/settings';
import {
  bountyHunters as bountyHuntersFromDB,
  developers as developersFromDB,
} from './db';

let bountyHunters = bountyHuntersFromDB;
let developers = developersFromDB;

const mock = new MockAdapter(axios);

mock.onGet('/bounty_hunters').reply(
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        Object.values(bountyHunters).map(({ id, name }) => ({ id, name })),
      ]);
    }, RESPONSE_DELAY);
  }),
);

mock.onGet(/\/bounty_hunters\/\d+/).reply(({ url }) => {
  const id = url.split('/').pop();
  if (!bountyHunters[id]) return [404];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, bountyHunters[id]]);
    }, RESPONSE_DELAY);
  });
});

mock.onDelete(/\/bounty_hunters\/\d+/).reply(({ url }) => {
  const id = url.split('/').pop();
  if (!bountyHunters[id]) return [404];
  bountyHunters = omit([id], bountyHunters);
  return [200, bountyHunters[id]];
});

mock.onGet('/developers').reply(
  () => new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        200,
        Object.values(developers).map(({ id, name }) => ({ id, name })),
      ]);
    }, RESPONSE_DELAY);
  }),
);

mock.onGet(/\/developers\/\d+/).reply(({ url }) => {
  const id = url.split('/').pop();
  if (!developers[id]) return [404];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([200, developers[id]]);
    }, RESPONSE_DELAY);
  });
});

mock.onDelete(/\/developers\/\d+/).reply(({ url }) => {
  const id = url.split('/').pop();
  if (!developers[id]) return [404];
  developers = omit([id], developers);
  return [200, developers[id]];
});

export default axios;
