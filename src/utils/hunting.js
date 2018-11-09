import { DIFFICULTY, HUNTING_ITERATION_INTERVAL } from './settings';

const huntingIterations = [
  {
    name: 'tracing',
    hunterAttribute: 'tracing',
    developerAttribute: 'hiding',
  },
  {
    name: 'chasing',
    hunterAttribute: 'speed',
    developerAttribute: 'escaping',
  },
  {
    name: 'catching',
    hunterAttribute: 'accuracy',
    developerAttribute: 'avoiding',
  },
];

const pointsBydifficulty = {
  easy: -6,
  medium: -4,
  hard: -2,
  hardcore: -1,
};

const getPoints = points => Math.ceil(Math.random() * points);

const processingHuntingIteration = ({ iteration, bountyHunter, developer }) => {
  const bountyHunterPoints = getPoints(
    bountyHunter[iteration.hunterAttribute],
  );
  const developerPoints = getPoints(
    developer[iteration.developerAttribute],
  );
  const difference = bountyHunterPoints - developerPoints;
  return { difference, bountyHunterPoints, developerPoints };
};

const generateLog = ({
  iteration,
  bountyHunter,
  developer,
  bountyHunterPoints,
  developerPoints,
  isBountyHunterEliminated,
}) => (isBountyHunterEliminated
  ? `${bountyHunter.name} was elimanted by ${
    developer.name
  } with ${bountyHunterPoints} points against ${developerPoints} points`
  : `${bountyHunter.name} ${
    bountyHunterPoints - developerPoints >= 0 ? 'succeed' : 'failed'
  } in ${iteration.name} ${
    developer.name
  } with ${bountyHunterPoints} points against ${developerPoints} points`);

export function* hunting({ bountyHunter, developer }) {
  for (const iteration of huntingIterations) {  // eslint-disable-line
    const {
      difference,
      bountyHunterPoints,
      developerPoints,
    } = processingHuntingIteration({ iteration, bountyHunter, developer });

    // Bounty hunter could be eliminated by developer only
    // at the last step when they meet face to face
    const isBountyHunterEliminated = difference <= pointsBydifficulty[DIFFICULTY]
      && iteration.name === 'catching';

    const log = generateLog({
      iteration,
      bountyHunter,
      developer,
      bountyHunterPoints,
      developerPoints,
      isBountyHunterEliminated,
    });
    yield { log };
    if (difference < 0) {
      // Bounty hunter wins iteration if they have the same amount of points with developer
      return {
        isDeveloperCaught: false,
        isBountyHunterEliminated,
      };
    }
  }
  return { isDeveloperCaught: true, isBountyHunterEliminated: false };
}

export const startHunting = ({
  bountyHunter,
  developer,
  updateLogs,
  onHuntingFinish,
}) => {
  const huntingIterator = hunting({ bountyHunter, developer });
  const huntingInterval = setInterval(() => {
    const { value, done } = huntingIterator.next();
    if (done) {
      clearInterval(huntingInterval);
      const { isDeveloperCaught, isBountyHunterEliminated } = value;
      onHuntingFinish({ isDeveloperCaught, isBountyHunterEliminated });
    } else {
      const { log } = value;
      updateLogs(log);
    }
  }, HUNTING_ITERATION_INTERVAL);
};
