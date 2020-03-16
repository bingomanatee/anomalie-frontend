import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import axios from 'axios';
import { API_ROOT } from '../../constants';
import loadDressTypes from '../../utils/loadDressTypes';

export default (props) => {
  const { history } = props;
  const ddStore = new ValueStream('dressDashboard')
    .property('user', null)
    .property('getIdToken', null) // note this is quirky:
    // this is a function we retrieve from the authb0  and store as a property to use later.
    .watch('user', 'load')
    .property('dressTypes', [], 'array')
    .method('loadDressTypes', async (s) => {
      const dressTypes = await loadDressTypes();
      s.do.setDressTypes(dressTypes);
    })
    .property('dresses', [], 'array')
    .method('deleteDress', async (s, dress) => {
      const headers = await s.do.headers();
      if (!headers.Bearer) {
        return;
      }
      await axios.delete(`${API_ROOT}dresses/${dress.id}`, {
        headers,
      });

      s.do.load();
    })
    .method('headers', async (s) => {
      if (!(s.my.user && s.my.getIdToken)) {
        return {};
      }
      const accessToken = await s.my.getIdToken();
      if (!accessToken) {
        return {};
      }
      return {
        Bearer: accessToken.__raw,
      };
    })
    .method('load', async (s) => {
      const headers = await s.do.headers();
      if (!headers.Bearer) {
        return;
      }

      const { data } = await axios.get(`${API_ROOT}dresses`, {
        headers,
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
