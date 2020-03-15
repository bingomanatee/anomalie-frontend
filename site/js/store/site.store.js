import { ValueStream } from '@wonderlandlabs/looking-glass-engine';

import { useAuth0 } from './react-auth0-spa';

const {
  user, isAuthenticated, loginWithRedirect, logout,
} = useAuth0();

const SiteStore = new ValueStream('siteStore')
  .method('inc', (s) => s.setCount(s.my.count + 1))
  .property('user', user)
  .method('logout', (s) => {
    logout();
    s.do.setUser(null);
  })
  .property('count', 1, 'integer');

export default SiteStore;
