import React, { Component } from 'react';
import { connect } from 'react-redux';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import {
  Project,
  Loading,
  Button,
  List,
  Paragraph,
  Line,
  withStyles,
} from '@arwes/arwes';

import axios from 'data/api';
import * as mapDispatchToProps from 'sagas';
import { startHunting } from 'utils/hunting';

import BountyHunterProvider from 'modules/BountyHunterProvider';
import DevelopersProvider from 'modules/DevelopersProvider';
import DeveloperProvider from 'modules/DeveloperProvider';

import BountyHunterDetails from 'components/BountyHunterDetails';
import DeveloperDetails from 'components/DeveloperDetails';
import DevelopersList from 'components/DevelopersList';

const eliminateBountyHunter = id => axios.delete(`/bounty_hunters/${id}`);
const catchDeveloper = id => axios.delete(`/developers/${id}`);

const styles = () => ({
  line: {
    marginTop: '10px',
  },
  backButton: {
    marginBottom: '30px',
  },
  huntButton: {
    margin: '20px 20px 0 0',
  },
});

const StyledContainer = styled.div`
  margin: 0 auto;
  max-width: 992px;
`;

const StyledContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLogsContainer = styled.div`
  margin-top: 20px;
`;

const StyledSmallSpinnerContainer = styled.div`
  margin-top: 20px;
`;

const navigateToBountyHunters = () => {
  navigate(`${process.env.PUBLIC_URL}/hunters`);
};

class Hunter extends Component {
  state = {
    selectedDeveloperId: null,
    isHuntingInProgress: false,
    logs: [],
  };

  selectDeveloper = id => () => {
    this.setState({ selectedDeveloperId: id });
  };

  beginHunting = ({ bountyHunter, developer }) => () => {
    this.setState({ isHuntingInProgress: true, logs: [] });
    startHunting({
      bountyHunter,
      developer,
      updateLogs: this.updateLogs,
      onHuntingFinish: this.onHuntingFinish,
      interval: 1000,
    });
  };

  updateLogs = (log) => {
    this.setState(({ logs }) => ({ logs: [...logs, log] }));
  };

  onHuntingFinish = ({ isDeveloperCaught, isBountyHunterEliminated }) => {
    const { id, fetchBountyHunters, fetchDevelopers } = this.props;
    if (isDeveloperCaught) {
      catchDeveloper(this.state.selectedDeveloperId).then(fetchDevelopers);
    }
    if (isBountyHunterEliminated) {
      eliminateBountyHunter(id).then(fetchBountyHunters);
      navigateToBountyHunters();
    }
    this.setState({
      isHuntingInProgress: false,
      ...(isDeveloperCaught && { selectedDeveloperId: null }),
    });
  };

  render() {
    const { id, classes } = this.props;
    const { selectedDeveloperId, isHuntingInProgress, logs } = this.state;
    return (
      <StyledContainer>
        <Button
          animate
          onClick={navigateToBountyHunters}
          className={classes.backButton}
        >
          Back to Bounty Hunters
        </Button>
        <BountyHunterProvider
          id={id}
          renderLoader={() => <Loading animate full/>}
        >
          {bountyHunter => (
            <Project animate header={bountyHunter.name}>
              <StyledContent>
                <div>
                  <BountyHunterDetails
                    bountyHunter={bountyHunter}
                    renderDeveloper={() => selectedDeveloperId && (
                    <DeveloperProvider
                      id={selectedDeveloperId}
                      renderLoader={() => <Loading animate/>}
                    >
                      {developer => (
                            <>
                              <DeveloperDetails developer={developer}/>
                              <Button
                                className={classes.huntButton}
                                disabled={isHuntingInProgress}
                                onClick={this.beginHunting({
                                  bountyHunter,
                                  developer,
                                })}
                              >
                                Start Hunting
                              </Button>
                            </>
                      )}
                    </DeveloperProvider>
                    )}
                  />
                  {(isHuntingInProgress || logs.length > 0) && (
                    <StyledLogsContainer>
                      <List>
                        {logs.map(log => (
                          <div key={log}>
                            <Paragraph>{log}</Paragraph>
                            <Line
                              animate
                              layer="secondary"
                              className={classes.line}
                            />
                          </div>
                        ))}
                        {isHuntingInProgress && (
                          <StyledSmallSpinnerContainer>
                            <Loading animate small/>
                          </StyledSmallSpinnerContainer>
                        )}
                      </List>
                    </StyledLogsContainer>
                  )}
                </div>
                <DevelopersProvider renderLoader={() => <Loading animate/>}>
                  {developers => (
                    <DevelopersList
                      developers={developers}
                      onClick={this.selectDeveloper}
                      selectedDeveloperId={selectedDeveloperId}
                    />
                  )}
                </DevelopersProvider>
              </StyledContent>
            </Project>
          )}
        </BountyHunterProvider>
      </StyledContainer>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(Hunter));
