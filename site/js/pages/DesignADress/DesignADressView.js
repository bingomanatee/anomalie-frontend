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
  history, dressTypesLoaded, dressType, features, stream, dressTypeID,
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

  return (
    <PageFrame dashboard>
      <Heading textAlign="center">Design a Dress</Heading>
      {!dressTypeID ? <ChooseDressType stream={stream} /> : (
        <Box direction="column">
          <Box fill="horizontal" justify="between" direction="row" align="baseline">
            <Heading level={2}>
              {' '}
              Dress Style: &quot;
              {_.get(dressType, 'name', '??')}
              &quot;
            </Heading>

            <div>
              <Button plain={false} size="small" color="black" focusIndicator={false} onClick={stream.do.changeDressType}>Change</Button>
            </div>
          </Box>
          <ChooseDressOptions features={features} stream={stream} />
          {stream.my.valid && stream.do.featuresComplete() ? (
            <Button primary plain={false} onClick={stream.do.saveDressChoice}>
              <Black color="white">Save Dress Choice</Black>
            </Button>
          ) : ''}
        </Box>
      )}
    </PageFrame>
  );
};
