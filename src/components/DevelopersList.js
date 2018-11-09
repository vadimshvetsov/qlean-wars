import React from 'react';
import styled from 'styled-components';
import {
  Heading, Link, Frame, Image,
} from '@arwes/arwes';

const StyledDevelopersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media (max-width: 450px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLinkContainer = styled.div`
  padding: 5px 10px;
`;

export default ({ developers, onClick, selectedDeveloperId }) => (developers.length > 0 ? (
  <div>
    <Heading node="h3">Select target</Heading>
    <StyledDevelopersContainer>
      {developers.map(({ id, name }) => (
        <Frame
          key={id}
          show={id === selectedDeveloperId}
          animate
          level={3}
          corners={2}
          onClick={onClick(id)}
        >
          <StyledLinkContainer>
            <Link key={id}>{name}</Link>
          </StyledLinkContainer>
        </Frame>
      ))}
    </StyledDevelopersContainer>
  </div>
) : (
  <div>
    <Heading node="h1">You Win</Heading>
    <Heading node="h3">
        Congratulations, bounty hunters have catched all Qlean frontend
        developers in the Galaxy
    </Heading>
    <Image resources="/images/jabba_satisfied.png"/>
  </div>
));
