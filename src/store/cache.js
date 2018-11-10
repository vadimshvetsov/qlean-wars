import { createCache, createResource } from 'react-cache';

import axios from 'data/api';

const cache = createCache();

const fetchBountyHunters = () => axios.get('/bounty_hunters');
const fetchBountyHunter = id => axios.get(`/bounty_hunters/${id}`);
const fetchDevelopers = () => axios.get('/developers');
const fetchDeveloper = id => axios.get(`/developers/${id}`);

export const bountyHuntersResource = createResource(fetchBountyHunters);
export const bountyHunterResource = createResource(fetchBountyHunter);
export const developersResource = createResource(fetchDevelopers);
export const developerResource = createResource(fetchDeveloper);

export default cache;
