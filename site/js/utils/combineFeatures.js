import _ from 'lodash';
import uuid from 'uuid/v1';

export default (features) => {
  const list = _.groupBy(features, 'name');
  Object.keys(list).forEach((key) => {
    list[key] = _(list[key]).map('value').uniq().sortBy()
      .value();
  });
  return _.reduce(list, (out, options, name) => [...out, {
    uid: uuid(),
    name,
    options: options.map((name) => ({
      name,
      uid: uuid(),
    })),
  }], []);
};
