import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from '@reach/router';
import styled from 'styled-components';
import { ThemeProvider, createTheme, Arwes } from '@arwes/arwes';
import { SoundsProvider, createSounds } from '@arwes/sounds';

import configureStore from 'store/configureStore';

import Opening from 'pages/Opening';
import Hunters from 'pages/Hunters';
import Hunter from 'pages/Hunter';

const store = configureStore();

const StyledContainer = styled.div`
  margin: 30px;
`;

const sounds = {
  shared: { volume: 1 },
  players: {
    click: {
      sound: { src: ['/sounds/click.mp3'] },
    },
    typing: {
      sound: { src: ['/sounds/typing.mp3'] },
      settings: { oneAtATime: true },
    },
    deploy: {
      sound: { src: ['/sounds/deploy.mp3'] },
      settings: { oneAtATime: true },
    },
  },
};

const HuntersRoutes = () => (
  <ThemeProvider theme={createTheme({})}>
    <SoundsProvider sounds={createSounds(sounds)}>
      <Arwes
        animate
        background="/images/background.jpg"
        pattern="/images/glow.png"
      >
        <StyledContainer>
          <Router>
            <Hunters path="/"/>
            <Hunter path=":id"/>
          </Router>
        </StyledContainer>
      </Arwes>
    </SoundsProvider>
  </ThemeProvider>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Opening path="/"/>
        <HuntersRoutes path="hunters/*"/>
      </Router>
    </Provider>
  );
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App/>, rootElement);