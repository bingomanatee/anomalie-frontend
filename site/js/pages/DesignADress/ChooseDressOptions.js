import React from 'react';
import {
  Box, Heading, Select, List, Image, Text,
} from 'grommet';
import _ from 'lodash';
import Black from '../../views/Black';

export default ({ stream, features }) => (
  <Box direction="column" gap="medium" fill>
    <Box direction="row" fill="horizontal">
      <Box width="50%">
        <Box pad="medium" corner="medium" align="stretch" elevation="large" direction="column" background="white" round="1rem">
          <Heading level="3">Dress Options</Heading>
          <List data={features}>
            {
              ({ name, options }) => (
                <Box direction="row" justify="start" align="baseline" fill="horizontal" gap="medium">
                  <Box width="8rem" align="start">
                    <Black>{name}</Black>
                  </Box>
                  <Box fill="horizontal" justify="stretch">
                    <Select
                      options={_.map(options, 'name')}
                      onChange={({ option }) => {
                        stream.do.chooseDressOption(name, option);
                      }}
                    />
                  </Box>
                </Box>
              )
            }
          </List>
        </Box>
      </Box>

      <Box width="50%" justify="center" align="center" round="1rem">
        {stream.my.valid ? '' : (
          <Text color="status-danger">
            <Black>This is not a valid combination</Black>
          </Text>
        )}
        {stream.my.valid && stream.my.image ? <Image fit="contain" src={`/img/dresses/${stream.my.image}`} /> : ''}
      </Box>
    </Box>
  </Box>
);
