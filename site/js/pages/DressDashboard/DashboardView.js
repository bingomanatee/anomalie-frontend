import React from 'react';
import {
  Box, Heading, Text, Button,
} from 'grommet';
import PageFrame from '../../views/PageFrame';
import { useAuth0 } from '../../react-auth0-spa';
import Black from '../../views/Black';
import DressList from './DressList';

export default ({
  history, dressesLoaded, dresses, stream,
}) => {
  const {
    user, isAuthenticated, loading, getIdTokenClaims,
  } = useAuth0();

  if (!isAuthenticated) {
    history.push('/not-logged-in');
    return '';
  }

  if (loading) {
    return (
      <PageFrame dashboard>
        <Box fill align="center">
          <Heading><Black>Loading</Black></Heading>
          <Text>
            Please wait...
          </Text>
        </Box>
      </PageFrame>
    );
  }

  if (user !== stream.my.user) {
    requestAnimationFrame(() => {
      console.log('getting set up');
      stream.do.setGetIdToken(getIdTokenClaims);
      stream.do.setUser(user);
    });
  }

  return (
    <PageFrame dashboard>
      <Heading textAlign="center"><Black>My Dress Dashboard</Black></Heading>
      <DressList dresses={dresses} dressesLoaded={dressesLoaded} stream={stream} />
    </PageFrame>
  );
};
