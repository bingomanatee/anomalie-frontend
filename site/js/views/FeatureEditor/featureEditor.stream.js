/* eslint-disable camelcase */
import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function featureEditorStream(props) {
  const { value, onChange } = props;

  return new ValueStream('featureEditor')
    .method('addFeature', (s) => {
      s.my.dress_type_features.push(
        {
          id: uuid(),
          name: 'new feature',
          value: 'value',
        },
      );
      console.log('pushed');
      s.do.setDress_type_features([...s.my.dress_type_features]);
    })
    .method('updateRecordName', (s, id, name) => {
      const record = _.find(s.my.dress_type_features, { id });
      if (record) {
        record.name = name;
      }
    })
    .method('updateRecordValue', (s, id, value) => {
      const record = _.find(s.my.dress_type_features, { id });
      if (record) {
        record.value = value;
      }
    })
    .property('dress_type_features', value || [], 'array')
    .watchFlat('dress_type_features', (s, value) => {
      onChange({ target: { value } });
    });
}
