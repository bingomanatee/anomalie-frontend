import React, { useState, useEffect, useContext } from 'react';
import createAuth0Client from '@auth0/auth0-spa-js';
import ls from 'local-storage';
import _ from 'lodash';

function getUserFromLS() {
  const uString = ls.get('user');
  if (!uString) {
    return null;
  }
  try {
    return JSON.parse(uString);
  } catch (e) {
    return null;
  }
}

function setUserToLS(user) {
  if (!_.isObject(user)) {
    ls.remove('user');
  }
  try {
    ls.set('user', JSON.stringify(user));
  } catch (e) {
    ls.remove('user');
  }
}

function getIsAuthFromLS() {
  return ls.get('isAuth') === 'true';
}

function setIsAuthToLS(isAuth) {
  ls.set('isAuth', isAuth ? 'true' : 'false');
}

function getTokenFromLS() {
  const t = ls.get('token');
  if (!t) return null;
  try {
    return JSON.parse(t);
  } catch (err) {
    return null;
  }
}

function setTokenToLS(t) {
  if (!t) {
    ls.remove('token');
  } else {
    try {
      ls.set('token', JSON.stringify(t));
    } catch (e) {
      ls.remove('token');
    }
  }
}

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(getIsAuthFromLS);
  const [user, setUser] = useState(getUserFromLS());
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState();
  const [idToken, setIdToken] = useState(getTokenFromLS());
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserToLS(user);
    }
  }, [user]);

  useEffect(() => {
    setIsAuthToLS(isAuthenticated);
    if (isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setTokenToLS(idToken);
  }, [idToken]);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      if (
        window.location.search.includes('code=')
        && window.location.search.includes('state=')
      ) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      if (!getIsAuthFromLS()) {
        const localIsAuth = await auth0FromHook.isAuthenticated();
        setIsAuthenticated(localIsAuth);
        if (localIsAuth) {
          const localUser = await auth0FromHook.getUser();
          setUser(localUser);
        }
      }

      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const newUser = await auth0Client.getUser();
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const newUser = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(newUser);
  };
  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        getIdTokenClaims: (...p) => {
          if (idToken) {
            return idToken;
          }
          return auth0Client.getIdTokenClaims(...p)
            .then((token) => {
              console.log('id token: ', token);
              setIdToken(token);
              return token;
            });
        },
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => {
          setUserToLS(null);
          setIsAuthToLS(null);
          return auth0Client.logout(...p);
        },
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
