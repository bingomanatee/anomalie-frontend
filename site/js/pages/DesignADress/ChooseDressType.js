import React from 'react';
import styled from 'styled-components';
import {
  List, Box, Text, Heading, Button, Image,
} from 'grommet';
import Black from '../../views/Black';

const ChoiceWrappers = styled.section`
   display: grid;
  grid-template-columns: 1fr 1fr; 1fr
  grid-gap: 1rem;
`;

export default ({ stream }) => (
  <Box>
    <Heading level={3}>Choose a dress type.</Heading>
    <ChoiceWrappers>
      {stream.my.dressTypes.map(({ name, id, image }) => (
        <Box pad="medium" corner="medium" key={ id } align="stretch" elevation="large" direction="column" background="white" round="1rem">
          <Box height="10rem">
            <Image key={id} fit="contain" src={`/img/dresses/${image}`} />
          </Box>

          <Box pad="small">
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
        </Box>
      ))}
    </ChoiceWrappers>
  </Box>
);
