import React, { PureComponent } from 'react';
import {
  DataTable, Button, Box, Text,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import blockerEditorStream from './blockerEditor.stream';
import TextAreaWrapper from '../TextAreaWrapper';
import Black from '../Black';

const FeatureEditorView = styled.section`
`;

const dataGridColumns = (stream) => [
  { property: 'id', header: 'ID', primary: true },
  {
    property: 'combination',
    header: 'Combination',
    width: '50%',
    render: ({ combination, id }) => (
      <TextAreaWrapper
        value={combination}
        onChange={(value) => stream.do.updateRecordCombination(id, value)}
      />
    ),
  },
  {
    property: 'invalid',
    header: 'Valid',
    render: ({ invalid }) => {
      if (!invalid) {
        return <Text color="status-ok">Valid JSON</Text>;
      }
      return <Text color="status-danger">Invalid JSON</Text>;
    },
  },
  {
    property: 'delete',
    render: ({ id }) => (
      <Box justify="center">
        <Button fill={false} size="small" plain={false} onClick={() => stream.do.deleteRow(id)}>
          <Black color="red">&times;</Black>
          Delete
        </Button>
      </Box>
    ),
  },
];
export default class BlockerEditor extends PureComponent {
  constructor(p) {
    super(p);
    const stream = blockerEditorStream(p);
    this.stream = stream;
    this.state = { ...stream.value };
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
    const { dress_type_bad_combos } = this.state;
    return (
      <FeatureEditorView>

        <Box gap="medium" justify="center" fill="horizontal" margin="small" align="center">
          <DataTable sortable data={dress_type_bad_combos} columns={dataGridColumns(this.stream)} />
          <Button size="small" plain={false} fill={false} focusIndicator={false} onClick={this.stream.do.addCombo}>
            <Black><Text color="brand">+</Text></Black>
            Add Prohibition
          </Button>
        </Box>

        <Text margin="large">
          These combinations are pairs of name/values such as "size":
          "small" that when combined create a set of
          properties (name) that can be set
          to one of the provided values for that property.
        </Text>
      </FeatureEditorView>
    );
  }
}

//
