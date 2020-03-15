import React, { PureComponent } from 'react';
import {
  Table, TableRow, TableHeader, TableCell, TableBody, Text, Button, Box,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import optionsEditorStream from './optionsEditor.stream';
import TextInputWrapper from '../TextInputWrapper';
import Black from '../Black';

const OptionsEditorView = styled.section``;

export default class OptionsEditor extends PureComponent {
  constructor(p) {
    super(p);
    const stream = optionsEditorStream(p);
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
      console.log('optionsEditor error: ', err);
    });
  }

  render() {
    const { options } = this.state;
    return (
      <OptionsEditorView>
        <Table>
          <TableBody>
            {options.map((option) => (
              <TableRow key={option.uid}>
                <TableCell plain scope="row">
                  <Box pad="2"><TextInputWrapper key="value" value={option.name} pad={2} onChange={(value) => this.stream.do.updateOption(option, value)} /></Box>
                </TableCell>
                <TableCell plain>
                  <Button size="small" pad="small" color="status-critical" plain icon={<Black>&times;</Black>} onClick={() => this.stream.do.deleteOption(option.uid)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box>
          <Button size="small" plain onClick={this.stream.do.addOption} plain={false}>
            <Black><Text color="brand">+</Text></Black>
            {' Add Option'}
          </Button>
        </Box>
      </OptionsEditorView>
    );
  }
}
