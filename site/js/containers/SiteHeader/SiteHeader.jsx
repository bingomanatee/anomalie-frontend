import React, { PureComponent } from 'react';
import {
  Box, Heading, Text, Button,
} from 'grommet';

import Navigation from '../Navigation';

export default class SiteHeader extends PureComponent {
  render() {
    const { history } = this.props;

    return (
      <Box
        direction="row"
        gap="medium"
        pad="medium"
        align="center"
        alignContent="stretch"
        as="header"
        fill="horizontal"
        justify="between"
        elevation="medium"
      >
        <Box
          focusIndicator={false}
          basis="300px"
          direction="row"
          className="logo"
          align="start"
          gap="small"
          className="no-outline"

          onClick={() => history.push('/')}
        >
          <img src="/img/logo.svg" />
          <Heading
            as="div"
            size="20px"
            color="black"
            style={({ letterSpacing: '4px', lineHeight: 1.4, fontFamily: '"Anomalie Sans Black", "Helvetica Neue", Helvetica, sans-serif' })}
          >
            ANOMALIE
          </Heading>
        </Box>

        <Navigation />
      </Box>
    );
  }
}
