import React, { Suspense } from 'react';

import cache, { bountyHunterResource } from 'store/cache';

const AsyncBountyHunter = ({ children, id }) => {
  const data = bountyHunterResource.read(cache, id);
  return children(data.data);
};

const BountyHunterProvider = ({ id, children, renderLoader }) => (
  <Suspense fallback={renderLoader()}>
    <AsyncBountyHunter id={id}>{children}</AsyncBountyHunter>
  </Suspense>
);

export default BountyHunterProvider;
