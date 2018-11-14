import { firebaseApiKey, githubClientID, githubClientSecret } from './secrets';

export const environment = {
  production: false,
  githubClientSecret,
  githubClientID,
  firebase: {
    apiKey: firebaseApiKey,
    authDomain: 'inkbucket-56716.firebaseapp.com',
    databaseURL: 'https://inkbucket-56716.firebaseio.com',
    projectId: 'inkbucket-56716',
    storageBucket: 'inkbucket-56716.appspot.com',
    messagingSenderId: '557604305533'
  }
};
