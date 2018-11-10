import React, { Suspense } from 'react';

import cache, { developerResource } from 'store/cache';

const AsyncDeveloper = ({ id, children }) => {
  const data = developerResource.read(cache, id);
  return children(data.data);
};

const DeveloperProvider = ({ id, renderLoader, children }) => (
  <Suspense fallback={renderLoader()}>
    <AsyncDeveloper id={id}>{children}</AsyncDeveloper>
  </Suspense>
);

export default DeveloperProvider;
