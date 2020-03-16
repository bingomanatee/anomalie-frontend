import {
  Text, TextInput, Box, Button,
} from 'grommet';
import React, { Component } from 'react';
import betaStore from './dressDashboard.stream';
import PageFrame from '../../views/PageFrame';
import DashboardView from './DashboardView';

export default class DressDashboard extends Component {
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
    const { history } = this.props;
    return (
      <DashboardView history={history} {...this.state} stream={this.stream} />
    );
  }
}

