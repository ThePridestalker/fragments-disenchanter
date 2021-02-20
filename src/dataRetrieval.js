const { execSync } = require('child_process');
const leagueClientProcessData = execSync(
  "wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline"
);
const cmdOutput = leagueClientProcessData.toString('utf-8');
// console.log(cmdOutput);

const portMatch = cmdOutput.match(/--app-port=([0-9]*)/);
const passwordMatch = cmdOutput.match(/--remoting-auth-token=([\w\-_]*)/);
const port = portMatch[1];
const password = passwordMatch[1];
const host = 'https://127.0.0.1';
const username = 'riot';

// console.log('PORT', port);
// console.log('PASSWORD', password);

const baseUrl = `${host}:${port}`;

const StringToBase64 = (string) => {
  return Buffer.from(string).toString('base64');
};
const token = `${StringToBase64(`${username}:${password}`)}`;
// console.log('TOKEN', token);

module.exports = {
  token,
  baseUrl,
};
