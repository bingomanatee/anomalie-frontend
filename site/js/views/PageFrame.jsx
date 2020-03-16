import { Box } from 'grommet';
import React from 'react';

export default ({ children, dashboard }) => (
  <Box
    pad={({ vertical: 'medium', horizontal: 'large' })}
    background={dashboard ? 'dashboard' : null}
    direction="column"
    alignContent="stretch"
    fill="vertical"
    style={({ overflowY: 'auto' })}
  >
    {children}
  </Box>
);
