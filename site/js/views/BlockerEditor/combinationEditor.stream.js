import { ValueStream } from '@wonderlandlabs/looking-glass-engine';
import _ from 'lodash';
import uuid from 'uuid/v1';

export default function featureEditorStream(props) {
  const { combination: initialCombination, dressType, onChange } = props;

  return new ValueStream('combinationEditor')
    .property('combination', initialCombination || [], 'array')
    .watchFlat('combination', (s, combination) => {
      onChange(combination);
    })
    .property('dressType', dressType, 'object')
    .method('updateCombinationItem', (s, combinationItem, values) => {
      combinationItem.values = values;
      s.do.setCombination([...s.my.combination]);
    })
    .method('deleteCombinationItem', (s, uid) => {
      const combination = s.my.combination.filter((v) => v.uid !== uid);
      s.do.setCombination(combination);
    })
    .method('addCombination', (s, values = []) => {
      s.do.setCombination([...s.my.combination, {
        uid: uuid(),
        value: values,
      }]);
    });
}
