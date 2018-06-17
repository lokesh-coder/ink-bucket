const writeFile = require('write');

const fileContent = ` /* secret!! */
  export const githubClientSecret = '';
  export const githubClientID = '';
`;
writeFile('./src/environments/secrets.ts', fileContent, err => {
  if (err) console.log('Error while creating secrets file.', err);
});
