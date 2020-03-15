/* eslint-disable camelcase */
import React, { PureComponent } from 'react';
import {
  Table, TableRow, TableHeader, TableCell, TableBody, Text, Button, Box, List,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import blockerEditorStream from './blockerEditor.stream';
import Black from '../Black';
import BlockerItemEditor from './BlockerItemEditor';

const BlockerEditorView = styled.section``;

export default class BlockerEditor extends PureComponent {
  constructor(p) {
    super(p);
    this.stream = blockerEditorStream(p);
    this.state = { ...this.stream.value };
  }

  componentWillUnmount() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  componentDidMount() {
    this._sub = this.stream.subscribe((s) => {
      this.setState(s.value);
    }, (err) => {
      console.log('featureEditor error: ', err);
    });
  }

  render() {
    const { dress_type_bad_combos, value } = this.state;
    return (
      <Box>
        <List data={dress_type_bad_combos}>
          {(blocker) => (
            <Box key={blocker.uid}>
              <BlockerItemEditor
                key={blocker.id || blocker.uid}
                blockerItem={blocker}
                dressType={value}
                onChange={(updatedBlocker) => {
                  console.log('updating blocker with ', updatedBlocker);
                  this.stream.do.updateBlocker(updatedBlocker.uid, updatedBlocker);
                }}
              />
            </Box>
          )}
        </List>
        <Button size="small" plain={false} onClick={this.stream.do.addBlocker}>
          <Black color="brand">
            +
          </Black>
          Add Blocker
        </Button>
      </Box>
    );
  }
}
