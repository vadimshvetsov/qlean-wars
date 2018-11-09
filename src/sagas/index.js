import { takeLatest, takeEvery, call } from 'redux-saga/effects';

import struct from 'utils/sagas';
import { constants } from 'reducers';

export const fetchBountyHunters = () => ({ type: 'FETCH_BOUNTY_HUNTERS' });
export const fetchBountyHunter = payload => ({
  type: 'FETCH_BOUNTY_HUNTER',
  payload,
});

export const fetchDevelopers = () => ({ type: 'FETCH_DEVELOPERS' });
export const fetchDeveloper = payload => ({ type: 'FETCH_DEVELOPER', payload });

function* fetchBountyHuntersWorker() {
  yield call(struct.get, constants.bountyHuntersStructId, '/bounty_hunters');
}

function* fetchBountyHunterWorker({ payload: id }) {
  yield call(
    struct.get,
    constants.bountyHunterStructId(id),
    `/bounty_hunters/${id}`,
  );
}

function* fetchDevelopersWorker() {
  yield call(struct.get, constants.developersStructId, '/developers');
}

function* fetchDeveloperWorker({ payload: id }) {
  yield call(struct.get, constants.developerStructId(id), `/developers/${id}`);
}

export default function* root() {
  yield takeLatest('FETCH_BOUNTY_HUNTERS', fetchBountyHuntersWorker);
  yield takeEvery('FETCH_BOUNTY_HUNTER', fetchBountyHunterWorker);
  yield takeLatest('FETCH_DEVELOPERS', fetchDevelopersWorker);
  yield takeEvery('FETCH_DEVELOPER', fetchDeveloperWorker);
}
