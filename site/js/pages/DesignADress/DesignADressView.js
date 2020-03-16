import React from 'react';
import {
  Box, Heading, Text, Button,
} from 'grommet';
import _ from 'lodash';
import PageFrame from '../../views/PageFrame';
import { useAuth0 } from '../../react-auth0-spa';
import Black from '../../views/Black';
import DressList from './DressList';
import ChooseDressType from './ChooseDressType';
import ChooseDressOptions from './ChooseDressOptions';
import combineFeatures from '../../utils/combineFeatures';

export default ({
  history, dressTypesLoaded, dressTypes, stream, dressTypeID,
}) => {
  const {
    user, isAuthenticated, loading, getIdTokenClaims,
  } = useAuth0();

  if (!isAuthenticated) {
    history.push('/not-logged-in');
    return '';
  }

  if (loading || !dressTypesLoaded) {
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
      stream.do.setGetIdToken(getIdTokenClaims);
      stream.do.setUser(user);
    });
  }

  const dressType = stream.do.dressType();
  return (
    <PageFrame dashboard>
      <Heading textAlign="center">Design a Dress</Heading>
      {!dressTypeID ? <ChooseDressType stream={stream} /> : (
        <Box direction="column">
          <Box fill="horizontal" justify="between" direction="row">
            <Heading level={2}>
              {' '}
              Dress Style: &quot;
              {_.get(dressType, 'name', '??')}
              &quot;
            </Heading>

            <Button size="small" onClick={stream.do.changeDressType}>Change</Button>
          </Box>
          <ChooseDressOptions features={combineFeatures(dressType.dress_type_features)} stream={stream} />
        </Box>
      )}
    </PageFrame>
  );
};
