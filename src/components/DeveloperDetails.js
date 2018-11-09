import React from 'react';
import styled from 'styled-components';
import { Table, Heading } from '@arwes/arwes';

const StyledTable = styled(Table)`
  min-width: 250px;
  @media (max-width: 500px) {
    min-width: 200px;
  }
`;

const DeveloperDetails = ({
  developer: {
    name, escaping, avoiding, hiding,
  },
}) => (
  <div>
    <Heading node="h3">{`${name} Skills`}</Heading>
    <StyledTable
      animate
      headers={['Attributes', 'Points']}
      dataset={[
        ['Hiding', hiding],
        ['Escaping', escaping],
        ['Avoiding', avoiding],
      ]}
    />
  </div>
);

export default DeveloperDetails;
