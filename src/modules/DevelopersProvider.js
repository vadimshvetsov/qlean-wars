import React, { Suspense } from 'react';

import cache, { developersResource } from 'store/cache';

const AsyncDevelopers = ({ children }) => {
  const data = developersResource.read(cache);
  return children(data.data);
};

const DevelopersProvider = ({ renderLoader, children }) => (
  <Suspense fallback={renderLoader()}>
    <AsyncDevelopers>{children}</AsyncDevelopers>
  </Suspense>
);

export default DevelopersProvider;
