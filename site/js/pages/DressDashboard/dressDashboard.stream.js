import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import { API_ROOT } from '../../constants';
import loadDressTypes from '../../utils/loadDressTypes';

export default (props) => {
  const { history } = props;
  const ddStore = new ValueStream('dressDashboard')
    .property('user', null)
    .property('getIdToken', null)
    .watch('user', 'load')
    .property('dressTypes', [], 'array')
    .method('loadDressTypes', async (s) => {
      const dressTypes = await loadDressTypes();
      s.do.setDressTypes(dressTypes);
    })
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

      console.log('dresses retrieved: ', data);
      s.do.setDresses(data);
      s.do.setDressesLoaded(true);
    })
    .method('designADress', () => {
      history.push('/design-a-dress');
    })
    .property('dressesLoaded', false);

  ddStore.do.loadDressTypes();

  return ddStore;
};
