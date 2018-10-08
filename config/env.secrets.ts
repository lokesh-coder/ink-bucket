import { writeFile } from 'fs';
import { argv } from 'yargs';

require('dotenv').config();

const targetPath = `./src/environments/secrets.ts`;
const envConfigFile = `
export const githubClientSecret= '${process.env.GITHUB_CLIENT_SECRET}';
export const githubClientID= '${process.env.GITHUB_CLIENT_ID}';
export const firebaseApiKey= '${process.env.FIREBASE_API_KEY}';
`;
writeFile(targetPath, envConfigFile, function(err) {
  if (err) {
    console.log(err);
  }

  console.log(`secrets file generated at ${targetPath}`);
});
