import React, { PureComponent } from 'react';
import {
  Table, TableRow, TableHeader, TableCell, TableBody, Text, Button, Box,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import TextItemInputWrapper from '../TextInputWrapper';
import TextAreaWrapper from '../TextAreaWrapper';
import Black from '../Black';

const BlockerItemView = styled.section``;

export default class BlockerItemEditor extends PureComponent {
  constructor(p) {
    super(p);
    this.setCombination = this.setCombination.bind(this);
    this.state = { valid: false };
  }

  setCombination(condition) {
    try {
      const j = JSON.parse(condition);
      const newBlocker = { ...this.props.blockerItem };
      newBlocker.combination = JSON.stringify(j, true, 2);
      this.props.onChange(newBlocker);
      this.setState({ valid: true });
    } catch (err) {
      this.setState({ valid: false });
    }
  }

  render() {
    const { blockerItem } = this.props;
    const { valid } = this.state;
    return (
      <BlockerItemView>
        <TextAreaWrapper placeholder={'bad matches - JSON: ex - {"color": "red", "size": "large"}'} rows={3} value={blockerItem.condition} onChange={this.setCombination} />
        {valid ? '' : <Text color="status-danger">Invalid JSON</Text>}
      </BlockerItemView>
    );
  }
}
