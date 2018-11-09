import React from 'react';
import { Project, Loading, withStyles } from '@arwes/arwes';

import './styles.css';

import BountyHuntersProvider from 'modules/BountyHuntersProvider';
import BountyHuntersList from 'components/BountyHuntersList';

const styles = () => ({
  container: {
    maxWidth: '320px',
    margin: '0 auto',
  },
});

const Hunters = ({ classes }) => (
  <Project
    animate
    header="Jabba's the Hutt Communicator"
    className={classes.container}
  >
    <BountyHuntersProvider renderLoader={() => <Loading animate/>}>
      {({ bountyHunters, onBountyHunterClick }) => (
        <BountyHuntersList
          bountyHunters={bountyHunters}
          onClick={onBountyHunterClick}
        />
      )}
    </BountyHuntersProvider>
  </Project>
);

export default withStyles(styles)(Hunters);
