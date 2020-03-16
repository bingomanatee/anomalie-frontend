import {
  Text, TextInput, Box, Button,
} from 'grommet';
import React, { Component } from 'react';
import betaStore from './designADress.stream';
import PageFrame from '../../views/PageFrame';
import DesignADressView from './DesignADressView';

export default class DesignADress extends Component {
  constructor(props) {
    // const { match } = props;
    super(props);

    this.stream = betaStore(props);

    this.state = { ...this.stream.value };
  }

  componentWillUnmount() {
    if (this._sub) this._sub.unsubscribe();
  }

  componentDidMount() {
    this._sub = this.stream.subscribe((s) => {
      this.setState(s.value);
    }, (err) => {
      console.log('beta stream error: ', err);
    });
  }

  render() {
    return (
      <DesignADressView history={this.props.history} {...this.state} stream={this.stream} />
    );
  }
}
