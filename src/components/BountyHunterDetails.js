import React from 'react';
import styled from 'styled-components';
import { Image, Table, Heading } from '@arwes/arwes';

const StyledContainer = styled.div`
  display: flex;
  justify-content: left;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const StyledImageContainer = styled.div`
  min-width: 100px;
  max-width: 200px;
  margin-right: 30px;
  @media (max-width: 500px) {
    max-width: 400px;
    margin-right: 0;
  }
`;

const StyledTable = styled(Table)`
  min-width: 250px;
  @media (max-width: 500px) {
    min-width: 200px;
  }
`;

const BountyHunterDetails = ({
  bountyHunter: {
    name, image, accuracy, speed, tracing,
  },
  renderDeveloper,
}) => (
  <StyledContainer>
    <StyledImageContainer>
      <Image animate resources={image}>
        {name}
      </Image>
    </StyledImageContainer>
    <div>
      <Heading node="h3">{`${name} Skills`}</Heading>
      <StyledTable
        animate
        headers={['Attributes', 'Points']}
        dataset={[
          ['Tracing', tracing],
          ['Speed', speed],
          ['Accuracy', accuracy],
        ]}
      />
      {renderDeveloper()}
    </div>
  </StyledContainer>
);

export default BountyHunterDetails;
