/* eslint-disable camelcase */
import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function blockerEditorStream(props) {
  const { value, onChange } = props;
  const dtbcs = (value.dress_type_bad_combos || [])
    .map((bc) => ({ uid: uuid(), ...bc }));

  console.log('initializing dtbs as ', dtbcs);

  return new ValueStream('blockerEditor')
    .property('dress_type_bad_combos', dtbcs, 'array')
    .property('dressType', value || {}, 'object')
    .watchFlat('dress_type_bad_combos', (s, dress_type_bad_combos) => {
      onChange({ target: { value: dress_type_bad_combos } });
    })
    .method('updateBlocker', (s, uid, blocker) => {
      s.do.setDress_type_bad_combos(s.my.dress_type_bad_combos.map((b) => {
        if (b.uid === uid || (blocker.id && (blocker.id === b.id))) {
          return blocker;
        }
        return b;
      }));
    })
    .method('deleteBlocker', (s, uid) => {
      s.do.setDress_type_bad_combos(s.my.dress_type_bad_combos.filter((v) => v.uid !== uid));
    })
    .method('addBlocker', (s) => {
      s.do.setDress_type_bad_combos([...s.my.dress_type_bad_combos, {
        uid: uuid(),
        combination: {},
      }]);
    });
}
