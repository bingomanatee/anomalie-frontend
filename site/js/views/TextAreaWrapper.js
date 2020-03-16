import React, { useState, useEffect } from 'react';
import { TextArea } from 'grommet';
import _ from 'lodash';

export default (props) => {
  const { value, onChange } = props;
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    if (onChange && (typeof onChange === 'function')) {
      console.log('text area change:', inputValue);
      onChange(inputValue);
    }
  }, [inputValue]);
  return (
    <TextArea
      value={inputValue}
      onChange={
        (e) => {
          setInputValue(_.get(e, 'target.value', ''));
        }
      }
    />
  );
};
