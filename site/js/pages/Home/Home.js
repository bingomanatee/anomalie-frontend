import React from 'react';
import {
  Carousel, Image, Stack, Text, Box, Heading, Button
} from 'grommet';
import _ from 'lodash';
import PageFrame from '../../views/PageFrame';
import Black from '../../views/Black';

export default ({ history }) => (
  <div>
    <Stack interactive="last">
      <Carousel fill play={2500}>
        {_.range(1, 5).map((key) => (
          <Image key={key} fit="cover" src={`/img/carousel/LP${key}HD.png`} />
        ))}
      </Carousel>
      <Box align="center" justify="center" margin="large">
        <Heading textAlign="center" size="4rem">
          <Black color="white">
            Why settle?
            <br />
            Create a wedding dress that's 100% you.
          </Black>
        </Heading>
        <Text size="2rem">
          <Black color="white">
            Discover how we helped half-a-million brides say "yes" to the perfect dress.
          </Black>
        </Text>
        <Button
          focusIndicator={false} margin="large" primary plain={false} onClick={() => history.push('/my-dress-dashboard')}>
          <Black color="white">My Dress Dashboard</Black>
        </Button>
      </Box>
    </Stack>
  </div>
);
