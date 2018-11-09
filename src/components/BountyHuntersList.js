import React from 'react';
import { Heading, Link, Image } from '@arwes/arwes';

export default ({ bountyHunters, onClick }) => (bountyHunters.length > 0 ? (
  bountyHunters.map(({ id, name }) => (
    <Heading node="h3" key={id} onClick={onClick(id)}>
      <Link>{name}</Link>
    </Heading>
  ))
) : (
  <div>
    <Heading node="h1">You Lost</Heading>
    <Heading node="h3">
        All Bounty Hunters were eliminated when they had tried to catch Qlean
        Frontend Developers
    </Heading>
    <Image resources="/images/jabba_dissapointed.png"/>
  </div>
));
