import _ from 'lodash';

export default (dressType, features) => {
  const directory = dressType.image.replace(/\/.*/, '');
  const fields = _(Array.from(Object.keys(features))).sortBy()
    .reduce((out, key) => [...out, features[key].toLowerCase(), key.toLowerCase()], [])
    .join('_');
  return `${directory}/${fields}.png`;
};
