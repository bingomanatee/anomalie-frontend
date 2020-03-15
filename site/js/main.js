import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';
import Main from './containers/Main';
import config from './auth_config.json';
import { Auth0Provider } from './react-auth0-spa';

const root = document.getElementById('root');

// @TODO: paranoid code for validating root.

const MainWrapper = withRouter(({ history }) => {
  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  }; return (
    <Auth0Provider
      domain={config.domain}
      client_id={config.clientId}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Main />
    </Auth0Provider>
  );
});

const load = () => render(
  <BrowserRouter>
    <MainWrapper />
  </BrowserRouter>,
  root,
);

// why the indirect load? because if the user isn't logged in we chuck them without engaging any render actions.

load();
