const express = require('express');
const  {buildSchema} = require('graphql');
const graphqlHTTP = require('express-graphql');
const btoa = require('btoa');
const fetch = require('node-fetch');
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);
const root = {
  hello: () => 'hello, world!'
};
const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
const username = `baamosk`;
const password = `Jajuka888`;
const auth = btoa(username + `:` + password);
const Authorization = {headers: { Authorization: `Basic ${auth}` }};

app.post('/data', (req, res) => {

  let search = 'hou';
  const URL = `https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/cumulative_player_stats.json?team=${search}`;

  return fetch(URL, Authorization)
  // .then(resp => resp.text())
  .then(data => data.json())
  .then(json => res.json(json.cumulativeplayerstats.playerstatsentry))
  .catch(err => console.error(err));
})

app.listen(8080);

app.get('/', (req, res) =>{
  console.log('hello');
});


//USED for validation
// const username = `baamosk`;
// const password = `Jajuka888`;
// const auth = btoa(username + `:` + password);
// const Authorization = {headers: { Authorization: `Basic ${auth}` }};

// const players = 'stephen-curry';
// const team = '';

// export const fetchPlayers = (search) => {
//   //This gets the roster for GSW game 4 on 5/22
//   //const URL = 'https://www.mysportsfeeds.com/api/feed/pull/nba/2017-playoff/roster_players.json?fordate=20170522&team=gsw&player';
//   const URL = `https://www.mysportsfeeds.com/api/feed/pull/nba/2016-2017-regular/cumulative_player_stats.json?playerstats=2PA,2PM,3PA,3PM,FTA,FTM,PTS/G,AST/G,STL/G,REB/G,TOV/G&player=${search}`;
//   return dispatch => {
//     dispatch(requestPlayers());
//     //second arg in fetch can be opts
//     fetch(URL, Authorization)
//     .then(response => response.json())
//     .then(res => dispatch(recievePlayers(res.cumulativeplayerstats.playerstatsentry)))
//     .catch(err => console.log(err));
//   };
// };