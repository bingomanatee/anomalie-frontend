import React from 'react';

import {
  List, Box, Text, Heading, Button,
} from 'grommet';
import Black from '../../views/Black';

export default ({ stream }) => (
  <Box>
    <Heading level={3}>Choose a dress type.</Heading>
    <List data={stream.my.dressTypes} gap="medium">
      {({ name, id }) => (
        <Box pad="medium">
          <Button onClick={() => stream.do.setDressTypeID(id)} padding="medium" background="light-3" plain={false}>
            <Black>
              {name}
              {' '}
              (
              {id}
              )
            </Black>
          </Button>
        </Box>
      )}
    </List>
  </Box>
);
