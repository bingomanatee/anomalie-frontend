/* eslint-disable camelcase */
import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import combineFeatures from '../../../utils/combineFeatures';
import { API_ROOT } from '../../../constants';

export default (props) => {
  const id = _.get(props, 'match.params.id', 0);
  const { history } = props;
  const dressTypes = new ValueStream('dressStylesEdit')
    .property('name', '', 'string')
    .property('features', [], 'array')
    .property('image', '', 'string')
    .property('blockers', [], 'array')
    .property('dress_type_bad_combos', [], 'array')
    .watchFlat('dress_type_bad_combos', (s, combos) => {
      combos.forEach((c) => {
        if (!_.isString(c.combination)) {
          c.combination = JSON.stringify(c.combination, true, 2);
        }
      });
    })
    .property('dress_type_features', [], 'array')
    .property('id', id, 'integer')
    .property('dressType', null)
    .method('updateDressType', (s) => {
      const dressType = {
        id: s.my.id,
        features: s.my.features,
        blockers: s.my.blockers,
        image: s.my.image,
        dress_type_features: s.my.dress_type_features,
        dress_type_bad_combos: s.my.dress_type_bad_combos,
        name: s.my.name,
      };
      s.do.setDressType(dressType);
    })
    .method('save', (s, event) => {
      const dress_type = _.get(event, 'value');
      dress_type.features = combineFeatures(dress_type.dress_type_features);
      dress_type.blockers = [...dress_type.dress_type_bad_combos];
      console.log('----------- SAVING', dress_type);
      axios.put(`${API_ROOT}dress_types/${id}`, { dress_type })
        .then(() => history.push('/admin/dress-styles'))
        .catch((err) => {
          console.log('save error:', err);
          s.do.load();
        });
    })
    .method('update', (s, dressType) => {
      const {
        name, image, dress_type_bad_combos, dress_type_features,
      } = dressType;
      if (s.my.name !== name) {
        s.do.setName(name);
      }
      if (s.my.image !== image) {
        s.do.setImage(image);
      }
      if (!_.eq(s.my.dress_type_bad_combos, dress_type_bad_combos)) {
        s.do.setDress_type_bad_combos(dress_type_bad_combos);
      }
      if (!_.eq(s.my.dress_type_features !== dress_type_features)) {
        s.do.setDress_type_features(dress_type_features);
      }
    })
    .property('loaded', false, 'boolean')
    .method('readData', (s, dressType) => {
      const {
        name, image, dress_type_bad_combos, dress_type_features,
      } = dressType;

      s.do.setName(name);
      s.do.setImage(image);
      s.do.setDress_type_bad_combos(dress_type_bad_combos || []);
      s.do.setDress_type_features(dress_type_features || []);
    }, true)
    .method('load', (s) => {
      axios.get(`${API_ROOT}dress_types/${id}`)
        .then(({ data }) => {
          console.log('loaded ----', data);
          s.do.readData(data);
          s.do.updateDressType();
          s.do.setLoaded(true);
        })
        .catch((err) => {
          console.log('dress types load error: ', err);
        });
    });

  dressTypes.do.load();
  return dressTypes;
};
