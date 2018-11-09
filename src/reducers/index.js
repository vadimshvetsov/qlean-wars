import { combineReducers } from 'redux';
import { getStruct, reducer as struct } from 'redux-struct';

export const constants = {
  bountyHuntersStructId: 'bountyHunters',
  bountyHunterStructId: id => `bountyHunters/${id}`,
  developersStructId: 'developers',
  developerStructId: id => `developers/${id}`,
};

export const selectors = {
  getBountyHunters: getStruct(constants.bountyHuntersStructId),
  getBountyHunter: id => getStruct(constants.bountyHunterStructId(id)),
  getDevelopers: getStruct(constants.developersStructId),
  getDeveloper: id => getStruct(constants.developerStructId(id)),
};

export default combineReducers({
  struct,
});
