import React, { Suspense } from 'react';
import { navigate } from '@reach/router';

import cache, { bountyHuntersResource } from 'store/cache';

// import { AsyncBountyHunters } from './reinvention';
const AsyncBountyHunters = ({ children }) => {
  const data = bountyHuntersResource.read(cache);
  return children({ bountyHunters: data.data });
};

const onBountyHunterClick = id => () => {
  navigate(`${process.env.PUBLIC_URL}/hunters/${id}`);
};

const BountyHuntersProvider = ({ children, renderLoader }) => (
  <Suspense fallback={renderLoader()}>
    <AsyncBountyHunters>
      {data => children({ ...data, onBountyHunterClick })}
    </AsyncBountyHunters>
  </Suspense>
);

export default BountyHuntersProvider;
