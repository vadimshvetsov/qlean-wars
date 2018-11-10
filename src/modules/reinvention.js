import axios from 'data/api';

const fetchBountyHunters = () => axios.get('/bounty_hunters');

export const cache = {};

export const AsyncBountyHunters = ({ children }) => {
  const data = cache.bountyHunters;
  if (!data) {
    const promise = fetchBountyHunters().then(
      (response) => { cache.bountyHunters = response; },
    );
    throw promise;
  }
  return children({ bountyHunters: data.data });
};
