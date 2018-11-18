# Qlean Wars
Demo was created for consider the difference between using redux
for server requests and react-cache approach with Suspense (new React API).
# About game
You play the role of Jabba The Hutt who responsible for catching all Qlean
frontend developers and delivering them to the new office.
With communicator you can give an orders to bounty hunters
to trace, chase and catch a developer.
All bounty hunters and developers have skills for hunting and avoiding to be catched.
When you start a hunt your bounty hunter needs to win all 3 stages of hunting.
At each stage you can get random number from 1 to your skill point for this stage
and it compares with developer random number. Who has the higher number is a winner.
At the third stage developer can beat the bounty hunter with having more points
and he will leave the bounty hunters list.
# Installation
```bash
npm i && npm start
```
# Deploy to github pages
```bash
npm run deploy
```
# Change to react-cache and Suspense approach
```bash
git fetch origin suspense && git checkout suspense && npm i && npm start
```
Here is [PR](https://github.com/vadimshvetsov/qlean-wars/pull/1) to see the code difference
