import { put, call } from 'redux-saga/effects';
import { startStructFetch, stopStructFetch } from 'redux-struct';
import api from 'data/api';

const defaultFormatResponse = response => response.data;

function* structRequest(method, structId, url, payload, config = {}) {
  try {
    const { formatResponse = defaultFormatResponse, params = {} } = config;
    const apiConfig = { params };
    const apiCallParams = payload
      ? [url, payload, apiConfig]
      : [url, apiConfig];
    const apiRequest = () => api[method](...apiCallParams);
    yield put(startStructFetch(structId));
    const response = yield call(apiRequest);
    const data = formatResponse(response);
    yield put(stopStructFetch(structId, data));
    return { data };
  } catch (error) {
    yield put(stopStructFetch(structId, error));
    return { error };
  }
}

export default {
  get: (structId, url, config) => structRequest('get', structId, url, null, config),
  patch: (...args) => structRequest('patch', ...args),
  put: (...args) => structRequest('put', ...args),
  post: (...args) => structRequest('post', ...args),
  delete: (structId, url, config) => structRequest('delete', structId, url, null, config),
};
