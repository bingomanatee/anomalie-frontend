/* eslint-disable import/prefer-default-export */

const NODE_ENV = process.env.NODE_ENV || 'production';
console.log('------ NODE_ENV: ', NODE_ENV);
export const API_ROOT = ({
  development: 'http://localhost:3000/',
  production: 'https://anomalie-dressmaker.herokuapp.com/',
})[NODE_ENV];
