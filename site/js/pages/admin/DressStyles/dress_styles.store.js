/* eslint-disable camelcase */
import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import { API_ROOT } from '../../../constants';
import loadDressTypes from '../../../utils/loadDressTypes';

const newDressType = () => ({ name: 'a new dress type', features: [] });
export default (props) => {
  const dressTypes = new ValueStream('dressTypes')
    .property('dressTypes', [], 'array')
    .property('tabIndex', 0, 'integer')
    .property('newDressType', newDressType(), 'object')
    .method('saveNewDressType', (s, event) => {
      const value = _.get(event, 'value');
      if (!value) {
        return;
      }
      s.do.setTabIndex(0);
      s.do.setNewDressType(newDressType());
      axios.post(`${API_ROOT}dress_types/`, { dress_type: value })
        .then(s.do.load)
        .catch((err) => {
          console.log('save error:', err);
          s.do.load();
        });
    })
    .method('update', (s, event) => {
      const data = _.get(event, 'target.value');
      if (!data) {
        return;
      }
      const { name, dress_type_features, dress_type_bad_combos } = data;
      if (s.my.name !== name) {
        s.do.setName(name);
      }
      if (s.my.dress_type_features !== dress_type_features) {
        s.do.setDress_type_features(dress_type_features);
      }
      if (s.my.dress_type_bad_combos !== dress_type_bad_combos) {
        s.do.setDress_type_bad_combos(dress_type_bad_combos);
      }
    }, true)
    .method('updateNewDressType', (s, value) => {
      Object.assign(s.my.newDressType, value);
    })
    .method('featureChanged', (s, data) => {
      const features = _.get(data, 'target.value');
      if (Array.isArray(features)) {
        s.my.newDressType.features = features;
        s.do.setNewDressType(s.my.newDressType);
      }
    })
    .method('load', async (s) => {
      const dressTypes = await loadDressTypes();
      s.do.setDressTypes(dressTypes);
    });

  dressTypes.do.load();
  return dressTypes;
};
