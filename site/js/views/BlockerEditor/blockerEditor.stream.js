/* eslint-disable camelcase */
import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function blockerEditorStream(props) {
  const { value, onChange } = props;

  console.log('new beStream, value = ', value);

  return new ValueStream('featureEditor')
    .method('addCombo', (s) => {
      s.do.setDress_type_bad_combos([...s.my.dress_type_bad_combos, {
        id: uuid(),
        combination: '{"property": "value", "property2": "value2"}',
        invalid: false,
      }]);
    })
    .method('deleteRow', (s, removeId) => {
      s.do.setDress_type_bad_combos(s.my.dress_type_bad_combos.filter(({ id }) => id !== removeId));
    })
    .method('updateRecordCombination', (s, id, combination) => {
      const record = _.find(s.my.dress_type_bad_combos, { id });
      if (record) {
        console.log('updating combination ', combination);
        record.combination = combination;
        try {
          JSON.parse(combination);
          record.invaid = false;
        } catch (err) {
          record.invalid = true;
        }
        s.do.setDress_type_bad_combos([...s.my.dress_type_bad_combos]);
      } else {
        console.log('cannot find record id:', id);
      }
    })
    .property('dress_type_bad_combos', value || [], 'array')
    .watchFlat('dress_type_bad_combos', (s, value) => {
      onChange({ target: { value } });
    });
}
