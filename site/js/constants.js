/* eslint-disable import/prefer-default-export */

const NODE_ENV = process.env.NODE_ENV || 'default';
console.log('NODE_ENV: ', NODE_ENV);
export const API_ROOT = ({
  development: 'http://localhost:3000/',
  default: 'http://heroku.com/',
})[NODE_ENV];
