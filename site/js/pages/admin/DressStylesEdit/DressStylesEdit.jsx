import {
  Text, TextInput, Box, Button, DataTable, Tab, Tabs, Heading, Form, FormField, DropButton, List,
} from 'grommet';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';
import React, { Component } from 'react';
import dressTypesStore from './dressStylesEdit.store';
import PageFrame from '../../../views/PageFrame';
import FormGrid from '../../../views/FormGrid';
import FeatureEditor from '../../../views/FeatureEditor/FeatureEditor';
import BlockerEditor from '../../../views/BlockerEditor';
import Black from '../../../views/Black';

const dlfNames = (features) => _(features).map('name').uniq().sortBy()
  .value();

const DataTableWrapper = styled.div`
td, tr, th {
height: 2rem !important;
}
`;

export default class DressStylesEdit extends Component {
  constructor(props) {
    // const { match } = props;
    super(props);

    this.stream = dressTypesStore(props);

    this.state = { ...this.stream.state };
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
      console.log('dressTypesStore error: ', err);
    });
  }

  render() {
    const {
      loaded,
      name,
    } = this.state;

    return (
      <PageFrame>
        <Heading>
          <Link to="/admin/dress-styles">Dress Styles</Link>
          :
          {loaded ? name || 'unnamed' : '...'}
        </Heading>
        {
          loaded ? (
            <Form
              value={this.stream.my.dressType}
              onSubmit={this.stream.do.save}
              onChange={this.stream.do.update}
            >
              <FormGrid>
                <Text>Name</Text>
                <Box>
                  <FormField required name="name" />
                </Box>

                <Text>Features</Text>
                <FormField
                  component={FeatureEditor}
                  name="dress_type_features"
                />

                <Text>Prohibited Combinations</Text>
                <FormField
                  component={BlockerEditor}
                  name="dress_type_bad_combos"
                />

                <span>&nbsp;</span>
                <Button
                  focusIndicator={false}
                  primary
                  plain={false}
                  type="submit"
                >
                  <Black color="white">
                    Save Dress Style
                  </Black>
                </Button>
              </FormGrid>
              <code>
                <pre>
                  {JSON.stringify(this.stream.my.dressType)}
                </pre>
              </code>
            </Form>
          ) : <div>Loading...</div>
        }
      </PageFrame>
    );
  }
}

/**
 *
 *
 <Text>Features</Text>
 <FormField
 component={BlockerEditor}
 name="dress_type_features"
 />

 *
 <Text>Blockers</Text>
 <FormField
 component={BlockerEditor}
 name="dress_type_bad_combos"
 />
 * */
