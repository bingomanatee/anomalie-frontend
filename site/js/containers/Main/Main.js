import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Grommet, Box, Text } from 'grommet';

import { useAuth0 } from '../../react-auth0-spa';
import SiteHeader from '../SiteHeader';
import Content from '../../views/Content';

import MainGrid from './MainGrid';
import Black from '../../views/Black';
import theme from '../../theme';

// pages

import Home from '../../pages/Home';
import DressStyles from '../../pages/admin/DressStyles';
import DressStylesEdit from '../../pages/admin/DressStylesEdit/DressStylesEdit';
import DressDashboard from '../../pages/DressDashboard';
import DesignADress from '../../pages/DesignADress';
import NotLoggedIn from '../../pages/NotLoggedIn/NotLoggedIn';

export default () => {
  const {
    isAuthenticated,
  } = useAuth0();

  return (
    <main>
      <Grommet theme={theme} full>
        <MainGrid>
          <Box gridArea="header">
            <SiteHeader />
          </Box>
          <Box gridArea="main">
            <Content>
              <Switch>
                <Route path="/not-logged-in" component={NotLoggedIn} />
                {
                  (true || isAuthenticated) ? [
                    <Route path="/admin/dress-styles" exact component={DressStyles} />,
                    <Route path="/admin/dress-styles/:id" component={DressStylesEdit} />,
                  ] : ''
                }
                <Route path="/my-dress-dashboard" component={DressDashboard} />
                <Route path="/design-a-dress" component={DesignADress} />
                <Route path="/" exact component={Home} />
                <Route component={Home} />
              </Switch>
            </Content>
          </Box>
        </MainGrid>
      </Grommet>
    </main>
  );
};
