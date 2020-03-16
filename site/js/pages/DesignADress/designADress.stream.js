import {ValueStream} from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import {API_ROOT} from '../../constants';
import loadDressTypes from '../../utils/loadDressTypes';
import combineFeatures from '../../utils/combineFeatures';

export default (props) => {
  const {history} = props;
  const ddStore = new ValueStream('dressDashboard')
    .property('user', null)
    .property('getIdToken', null)
    .watch('user', 'load')
    .watch('getIdToken', 'load')
    .watch('dressOptions', 'checkValid')
    .watch('dressOptions', 'updateImage')
    .property('valid', true, 'boolean')
    .method('comboMatches', (s, combo) => {
      console.log('checking combo ---- ', combo);
      const result = Object.keys(combo).reduce((valid, key) => {
        if (!valid) {
          console.log('skipping key ', key, '--- already invalid');
          return valid;
        }
        const value = combo[key];
        console.log('checking combo key:', key, 'value', value);
        if (s.my.dressOptions.get(key) === value) {
          console.log('--- matches', s.my.dressOptions.get(key));
          return true;
        }
        return false;
      }, true);
      console.log('combo', combo, 'matches with', s.my.dressOptions, result);
      return result;
    })
    .method('checkValid', (s) => {
      if (!s.my.dressType) {
        s.do.setValid(true);
      } else {
        console.log('======= checking combinations against', s.my.dressOptions);
        const invalid = s.my.dressType.dress_type_bad_combos.reduce((out, combo) => {
          if (out) {
            return out;
          }
          return s.do.comboMatches(combo.combination);
        }, false);
        s.do.setValid(!invalid);
      }
    })
    .method('featuresComplete', (s) => _(s.my.features)
      .map('name')
      .reduce((out, name) => {
        if (!out) {
          return out;
        }
        return !!s.my.dressOptions.get(name);
      }, true))
    .method('updateImage', (s) => {
      s.do.setImage('');
      if (!s.my.dressType) {
        return;
      }
      if (s.do.featuresComplete()) {
        const directory = s.my.dressType.image.replace(/\/.*/, '');
        const fields = _(s.my.features).map('name').sortBy()
          .reduce((out, key) => [...out, s.my.dressOptions.get(key).toLowerCase(), key.toLowerCase()], [])
          .join('_');
        s.do.setImage(`${directory}/${fields}.png`);
      } else {
        s.do.setImage(_.get(s.my.dressType, 'image', ''));
      }
    }, true)
    .property('image', '', 'string')
    .property('dressTypes', [], 'array')
    .property('dressTypeID', 0, 'integer')
    .watchFlat('dressTypeID', (s, id) => {
      if (!id) {
        s.do.setDressType(null);
      } else {
        s.do.setDressType(_.find(s.my.dressTypes, {id}));
      }
    })
    .method('changeDressType', (s) => {
      s.do.setDressTypeID(0);
    })
    .property('dressType', null)
    .property('features', [], 'array')
    .watchFlat('dressType', (s, dressType) => {
      s.do.setFeatures(combineFeatures(dressType.dress_type_features));
      s.do.setDressOptions(new Map());
      s.do.setImage(dressType.image);
      console.log('dress features are', s.my.features);
    })
    .method('loadDressTypes', async (s) => {
      const dressTypes = await loadDressTypes();
      s.do.setDressTypes(dressTypes);
      s.do.setDressTypesLoaded(true);
    })
    .property('dressTypesLoaded', false, 'boolean')
    .property('dresses', [], 'array')
    .method('load', async (s) => {
      if (s.my.dressesLoaded || !(s.my.user && s.my.getIdToken)) {
        console.log('bad load; not getting');
        return;
      }
      const accessToken = await s.my.getIdToken();
      if (!accessToken) {
        console.log('no access token');
        return;
      }
      const {data} = await axios.get(`${API_ROOT}dresses`, {
        headers: {
          Bearer: accessToken.__raw,
        },
      });
      s.do.setDresses(data);
      s.do.setDressesLoaded(true);
    })
    .method('saveDressChoice', async (s) => {
      if (!(s.my.dressTypeID && s.my.valid && s.do.featuresComplete())) {
        return;
      }

      const accessToken = await s.my.getIdToken();
      if (!accessToken) {
        console.log('no access token');
        return;
      }

      const features = {};
      s.my.dressOptions.forEach((value, key) => {
        features[key] = value;
      });
      const dress = {
        dress: {
          dress_type_id: s.my.dressTypeID,
          features,
        },
      };

      await axios.post(`${API_ROOT}dresses`, dress, {
        headers: {
          Bearer: accessToken.__raw,
        },
      });

      history.push('/my-dress-dashboard');
    })
    .property('dressesLoaded', false, 'boolean')
    .property('dressOptions', new Map())
    .method('chooseDressOption', (s, name, value) => {
      s.my.dressOptions.set(name, value);
      s.broadcast('dressOptions');
    })
    .method('designADress', () => {
      history.push('/design-a-dress');
    });

  ddStore.do.loadDressTypes();

  return ddStore;
};
