import React, { PureComponent } from 'react';
import {
  Button, Box, Text,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import { useAuth0 } from '../../react-auth0-spa';

export default ({ history }) => {
  const {
    user, isAuthenticated, loginWithPopup, logout,
  } = useAuth0();

  return (
    <Box pad="large" direction="row">
      <Button
        focusIndicator={false}
        onClick={(e) => {
          history.push('/');
        }}

        plain
      >
        <Text margin="medium">Home</Text>
      </Button>
      {isAuthenticated ? [
        <Button
          focusIndicator={false}
          plain
          onClick={(e) => {
            history.push('/my-dress-dashboard');
          }}
        >
          <Text pad="medium">Dashboard</Text>
        </Button>,
        (
        <Button
          focusIndicator={false}
          plain

          onClick={(e) => {
            history.push('/admin/dress-styles');
          }}
        >
          <Box pad="medium" style={{ textTransform: 'uppercase' }}>Dress Styles</Box>
        </Button>
      )] : ''}
      <Button
        plain
        focusIndicator={false}

        onClick={() => {
          if (isAuthenticated) {
            logout({
              returnTo: window.location.origin,
            });
          } else {
            loginWithPopup();
          }
        }}
      >
        {isAuthenticated ? `${_.get(user, 'name', 'You')}(Log Out)` : 'Log in'}
      </Button>
    </Box>
  );
};
