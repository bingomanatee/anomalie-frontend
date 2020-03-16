import {
  Box, Button, Heading, Text,
} from 'grommet';
import React from 'react';
import Black from '../../views/Black';
import PageFrame from '../../views/PageFrame';
import { useAuth0 } from '../../react-auth0-spa';

export default ({ history }) => {
  const {
    user, isAuthenticated, loginWithRedirect, loading, getIdTokenClaims,
  } = useAuth0();
  return (
    <PageFrame dashboard>
      <Box fill align="center">
        <Heading><Black>Not Logged In</Black></Heading>
        <Text>
          {'Please '}
          <Button
            size="small"
            margin="medium"
            primary
            plain={false}
            onClick={loginWithRedirect}
          >
            <Text color="white">Log In</Text>
          </Button>
          {' to continue.'}
        </Text>
      </Box>
    </PageFrame>
  );
};
