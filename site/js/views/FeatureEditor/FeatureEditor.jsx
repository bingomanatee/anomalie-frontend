import React, { PureComponent } from 'react';
import {
  Table, TableRow, TableHeader, TableCell, TableBody, Text, Button, Box,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import featureEditorStream from './featureEditor.stream';
import TextInputWrapper from '../TextInputWrapper';
import Black from '../Black';
import OptionsEditor from './OptionsEditor';

const FeatureEditorView = styled.section`
outline: none !important;
`;

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
    const { features } = this.state;
    return (
      <FeatureEditorView>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                <Text pad="2">Name</Text>
              </TableCell>
              <TableCell scope="col" border="bottom">
                <Text pad="2">Options</Text>
              </TableCell>
              <TableCell scope="col" border="bottom">
                &nbsp;
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {features.map((feature, i) => (
              <TableRow key={feature.uid}>
                <TableCell scope="row" verticalAlign="top" border="bottom">
                  <Box pad="2"><TextInputWrapper key="value" pad={2} value={feature.name} onChange={(value) => this.stream.do.updateFeatureName(value, i)} /></Box>
                </TableCell>
                <TableCell verticalAlign="top" border="bottom">
                  <Text pad="2"><OptionsEditor options={feature.options} onChange={(options) => this.stream.do.updateFeatureOptions(options, i)} /></Text>
                </TableCell>
                <TableCell verticalAlign="top" border="bottom">
                  <Box pad="2">
                    <Button size="small" pad="small" color="status-critical" plain={false} onClick={() => this.stream.do.deleteFeature(feature.uid)}>
                      <Box gap="medium" direction="row">
                        <Black>&times;</Black>
                        <Text>Delete Feature</Text>
                      </Box>
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box pad="medium" align="end" fill="horizontal">
          <Button size="small" fill={false} onClick={this.stream.do.addFeature} plain={false}><span>Add a Feature</span></Button>
        </Box>
      </FeatureEditorView>
    );
  }
}
