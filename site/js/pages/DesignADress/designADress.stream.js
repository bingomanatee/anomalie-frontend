import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import _ from 'lodash';
import { API_ROOT } from '../../constants';
import loadDressTypes from '../../utils/loadDressTypes';

export default (props) => {
  const { history } = props;
  const ddStore = new ValueStream('dressDashboard')
    .property('user', null)
    .property('getIdToken', null)
    .watch('user', 'load')
    .property('dressTypes', [], 'array')
    .property('dressTypeID', 0, 'integer')
    .method('changeDressType', (s) => {
      s.do.setDressTypeID(0);
    })
    .method('dressType', (s) => {
      const id = s.my.dressTypeID;
      return _.find(s.my.dressTypes, { id });
    })
    .method('loadDressTypes', async (s) => {
      const dressTypes = await loadDressTypes();
      s.do.setDressTypes(dressTypes);
      s.do.setDressTypesLoaded(true);
    })
    .property('dressTypesLoaded', false, 'boolean')
    .property('dresses', [], 'array')
    .method('load', async (s) => {
      if (!(s.my.user && s.my.getIdToken)) {
        console.log('bad load; not getting');
        return;
      }
      const accessToken = await s.my.getIdToken();
      if (!accessToken) {
        console.log('no access token');
        return;
      }
      console.log('access token gotten: ', accessToken.__raw);
      const { data } = await axios.get(`${API_ROOT}dresses`, {
        headers: {
          Bearer: accessToken.__raw,
        },
      });

      s.do.setDresses(data);
      s.do.setDressesLoaded(true);
    })
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
