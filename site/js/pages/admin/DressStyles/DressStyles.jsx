import {
  Text, TextInput, Box, Button, DataTable, Tab, Tabs, Heading, Form, FormField, DropButton, List,
} from 'grommet';
import _ from 'lodash';
import styled from 'styled-components';
import React, { Component } from 'react';
import dressTypesStore from './dress_styles.store';
import PageFrame from '../../../views/PageFrame';
import TabWrapper from '../../../views/TabWrapper';
import FormGrid from '../../../views/FormGrid';
import FeatureEditor from '../../../views/FeatureEditor';
import Black from '../../../views/Black';

const dlfNames = (features) => _(features).map('name').uniq().sortBy()
  .value();

const DataTableWrapper = styled.div`
td, tr, th {
height: 2rem !important;
}
tbody {
outline: none !important;
}
`;

const tableColumns = (history) => [
  {
    property: 'id',
    header: 'ID',
    primary: true,
    sortable: true,
    render: (dressType) => (
      <Box align="end">
        {dressType.id}
      </Box>
    ),
  },
  {
    property: 'name',
    sortable: true,
    header: (
      <Box width="20rem">
        <Text className="table-header">Name</Text>
      </Box>
    ),
    render: (dressType) => (
      <Box width="20rem">
        {dressType.name}
      </Box>
    ),
  },
  {
    property: 'dress_type_features',
    header: (
      <Box>
        <Text className="table-header">Features</Text>
      </Box>
    ),
    render: (dressType) => (
      <Box>
        {Array.isArray(dressType.dress_type_features) && _.get(dressType, 'dress_type_features.length') ? (
          <DropButton
            size="small"
            pad={0}
            label={dlfNames(dressType.dress_type_features).length}
            dropAlign={({
              top: 'bottom',
              left: 'right',
            })}
            dropContent={(
              <List data={dlfNames(dressType.dress_type_features)}>
                {(name) => <Box fill="horizontal" justify="end">{name}</Box>}
              </List>
            )}
          />
        ) : <Box fill="horizontal" align="center">0</Box>}
      </Box>
    ),
  },
  {
    property: 'dress_type_blockers',
    header: (
      <Box>
        <Text className="table-header">Blockers</Text>
      </Box>
    ),
    render: (dressType) => (
      <Box>
        {Array.isArray(dressType.dress_type_bad_combos) && _.get(dressType, 'dress_type_bad_combos.length') ? (
          <DropButton
            size="small"
            pad={0}
            label={(dressType.dress_type_bad_combos).length}
            dropAlign={({
              top: 'bottom',
              left: 'right',
            })}
            dropContent={(
              <List data={(dressType.dress_type_bad_combos)}>
                {(combo) => (
                  <Box fill="horizontal" justify="end">
                    <pre>
                      {JSON.stringify(combo.combination, true, 2)}
                    </pre>
                  </Box>
                )}
              </List>
            )}
          />
        ) : <Box fill="horizontal" align="center">0</Box>}
      </Box>
    ),
  },
  {
    header: '',
    propertry: 'id',
    sortable: false,
    render: (dressType) => <Button size="small" onClick={() => history.push(`/admin/dress-styles/${dressType.id}`)} plain={false}>Edit</Button>,
  },
];

export default class DressStyles extends Component {
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
      dressTypes, tabIndex, newDressType,
    } = this.state;
    const { history } = this.props;

    return (
      <PageFrame>
        <Heading>Dress Styles</Heading>

        <Tabs
          focusIndicator={false}
          activeIndex={tabIndex}
          onActive={this.stream.do.setTabIndex}
          style={({ outline: 'none!important' })}
        >
          <Tab
            focusIndicator={false}
            className="no-outline"

            title="Dress Styles"
          >
            <TabWrapper>
              <Heading level={2}>Saved Dress Styles</Heading>
              <DataTableWrapper>
                <DataTable
                  sortable
                  primaryKey="id"
                  columns={tableColumns(history)}
                  data={dressTypes}
                />
              </DataTableWrapper>
            </TabWrapper>
          </Tab>
          <Tab
            focusIndicator={false}
            className="no-outline"
            title="Add a Dress Style"
          >
            <TabWrapper>
              <Form
                value={newDressType}
                onSubmit={this.stream.do.saveNewDressType}
                onChange={this.stream.do.updateNewDressType}
              >
                <Heading level={2}>Create a Dress Style</Heading>
                <FormGrid>
                  <Text>Name</Text>
                  <Box>
                    <FormField required name="name" />
                  </Box>
                  <Button
                    focusIndicator={false}
                    primary
                    plain={false}
                    type="submit"
                  >
                    <Black color="white">
                      Create a New Dress Style
                    </Black>
                  </Button>
                </FormGrid>
                <code>
                  <pre>
                    {JSON.stringify(newDressType, true, 2)}
                  </pre>
                </code>
              </Form>
            </TabWrapper>
          </Tab>
        </Tabs>
      </PageFrame>
    );
  }
}
