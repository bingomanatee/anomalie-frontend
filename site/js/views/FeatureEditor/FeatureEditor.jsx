import React, { PureComponent } from 'react';
import {
  DataTable, Button, Box, Text,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import featureEditorStream from './featureEditor.stream';
import TextInputWrapper from '../TextInputWrapper';
import Black from '../Black';

const FeatureEditorView = styled.section`
`;

const dataGridColumns = (stream) => [
  { property: 'id', header: 'ID', primary: true },
  {
    property: 'name',
    header: 'Name',
    sortable: true,
    render: ({ name, value, id }) => (
      <TextInputWrapper
        value={name}
        onChange={(name) => stream.do.updateRecordName(id, name)}
      />
    ),
  },
  {
    property: 'value',
    header: 'Value',
    sortable: true,
    render: ({ name, value, id }) => (
      <TextInputWrapper
        value={value}
        onChange={(value) => stream.do.updateRecordValue(id, value)}
      />
    ),
  },
];
export default class FeatureEditor extends PureComponent {
  constructor(p) {
    super(p);
    const stream = featureEditorStream(p);
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
    const { dress_type_features } = this.state;
    return (
      <FeatureEditorView>

        <Box gap="medium" justify="center" fill="horizontal" margin="small" align="center">
          <DataTable sortable data={dress_type_features} columns={dataGridColumns(this.stream)} />
          <Button size="small" plain={false} fill={false} focusIndicator={false} onClick={this.stream.do.addFeature}>
            <Black><Text color="brand">+</Text></Black>
            Add Combination
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
