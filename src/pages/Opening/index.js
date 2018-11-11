import React, { Component } from 'react';
import { navigate } from '@reach/router';
import './opening.css';

/**
 *  Star Wars opening was forked and transformed to React component from Christopher Kade
 *  code and here is the link to his amazing article
 *  https://dev.to/christopherkade/developing-the-star-wars-opening-crawl-in-htmlcss-2j9e
 */

const audio = new Audio('/sounds/theme.mp3');
const title = 'Episode I';
const subtitle = 'THE PHANTOM MENACE';

class Opening extends Component {
  componentDidMount() {
    this.autoplay = setTimeout(() => {
      audio.play();
    }, 9000);
    this.redirectToHunters = setTimeout(() => {
      this.skipOnboarding();
    }, 65000);
  }

  componentWillUnmount() {
    clearTimeout(this.autoplay);
    clearTimeout(this.redirectToHunters);
    audio.pause();
    audio.currentTime = 0;
  }

  skipOnboarding = () => {
    navigate('/hunters');
  };

  render() {
    return (
      <div className="container">
        <div className="skip-onboarding" onClick={this.skipOnboarding}>
          {'Skip >'}
        </div>
        <section className="intro">
          <p>
            A long time ago, in a galaxy far,
            <br/>
            far away....
          </p>
        </section>
        <section className="logo">
          <svg width="738px" height="341px" viewBox="0 0 738 341" version="1.1">
            <g
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
              fontFamily="SFDistantGalaxyOutline"
              fontSize="200"
              fontWeight="normal"
            >
              <text id="QLEAN-WARS" fill="#FFE81F">
                <tspan x="-1.30078125" y="135">
                  QLEAN
                </tspan>
                <tspan x="32.8300781" y="339">
                  WARS
                </tspan>
              </text>
            </g>
          </svg>
        </section>
        <div id="board">
          <div id="content">
            <p id="title">{title}</p>
            <p id="subtitle">{subtitle}</p>
            <br/>
            <p>
              Turmoil has engulfed the Earth. The taxation of trade routes to
              outlying star systems is in dispute. Hoping to resolve the matter
              with a moving to another office, Qlean has lost all frontend
              developers among the galaxy.
              <br/>
              <br/>
              While the congress of the Republic endlessly debates this alarming
              chain of events, escunk has secretly gave a task to Jabba the Hutt,
              a powerful crime lord within the galaxy, to regain the loss....
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Opening;
