import { PureComponent } from 'react';
import { Box, CheckBox, Select } from 'grommet';
import TextInputWrapper from '../TextInputWrapper';
import Black from '../Black';

export default class ConditionItem extends PureComponent {
  render() {
    const {
      name, value, options, setValue,
    } = this.props;

    return (
      <Box direction="row">
        <Black>{name}</Black>
        <Select
          options={['(none)', ...options]}
          value={value}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    );
  }
}
