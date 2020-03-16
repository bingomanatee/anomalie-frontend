import React from 'react';
import {
  Box, Heading, Select, List,
} from 'grommet';
import _ from 'lodash';
import Black from '../../views/Black';

export default ({ stream, features }) => (
  <Box direction="column" gap="medium" fill>
    <Box direction="row" fill="horizontal">
      <Box width="50%">
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
                      stream.do.chooseOption(name, option);
                    }}
                  />
                </Box>
              </Box>
            )
          }
        </List>
      </Box>

      <Box width="50%">
        Image
      </Box>
    </Box>
  </Box>
);
