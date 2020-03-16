import React from 'react';
import {
  Box, Text, List, Heading, Button
} from 'grommet';
import Loader from 'react-loader-spinner';
import Black from '../../views/Black';

export default ({ stream, dresses, dressesLoaded }) => {
  return (
    <Box margin="medium" elevation="medium" align="center" background="white" pad="medium">
      <Heading level={2}>Dresses</Heading>
      {
        dressesLoaded ? (
          <>
            <List data={dresses}>
              {(dress) => (
                <Box pad="medium">
                  <Black>{dress.dress_type.name}</Black>
                </Box>
              )}
            </List>
            {dresses.length ? '' : (
              <Text>
                You have not designed any dresses.
              </Text>
            )}

            <Button margin="large" primary plain={false} onClick={stream.do.designADress}>
              <Text color="white">Design a Dress</Text>
            </Button>
          </>
        ) : (
          <Loader
            type="Puff"
            color="red"
            height={100}
            width={100}
          />
        )
      }
    </Box>
  );
};
