import React from 'react';
import {
  Box, Text, List, Heading, Button, Image,
} from 'grommet';
import Loader from 'react-loader-spinner';
import _ from 'lodash';
import Black from '../../views/Black';
import dressImageURL from '../../utils/dressImageURL';

function featureMap(dressFeatures) {
  return _.reduce(dressFeatures, (out, { name, value }) => ({ ...out, [name]: value }), {});
}

export default ({ stream, dresses, dressesLoaded }) => (
  <Box margin="medium" elevation="medium" align="center" background="white" pad="medium">
    <Heading level={2}>Dresses</Heading>
    {
        dressesLoaded ? (
          <>
            <List data={dresses}>
              {(dress) => (
                <Box pad="medium" justify="stretch">
                  <Box direction="row" align="baseline" justify="between" fill="horizontal">
                    <Heading fill="horizontal" justify="between" textAlign="center" level={3}>{dress.dress_type.name}</Heading>
                    <Button plain size="small" focusIndicator={false} onClick={() => stream.do.deleteDress(dress)}>
                      <Box direction="row" align="baseline" justify="between" gap="small">
                        <Text color="status-error"><Black>&times;</Black></Text>
                        <Text>Remove Design</Text>
                      </Box>
                    </Button>
                  </Box>
                  <Box height="10rem">
                    <Image fit="contain" src={`img/dresses/${dressImageURL(dress.dress_type, featureMap(dress.dress_features))}`} />
                  </Box>
                  <List data={dress.dress_features} border={{ color: 'white' }} pad="3px">
                    {({ name, value }) => (
                      <Box direction="row" gap="large" fill="horizontal">
                        <Box width="50%" align="end">
                          <Text size="small">
                            <Black allCaps>{name}</Black>
                          </Text>
                        </Box>
                        <Box width="50%">
                          <Text size="small">{value}</Text>
                        </Box>
                      </Box>
                    )}
                  </List>
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
