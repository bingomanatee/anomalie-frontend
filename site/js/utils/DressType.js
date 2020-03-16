import { proppify } from '@wonderlandlabs/propper';

class DressType {}

proppify(DressType)
  .addProp('name', '', 'string')
  .addProp('blockers', () => [], 'array')
  .addProp('dress_type_features', () => [], 'array')
  .addProp('features', () => [], 'array')
  .addProp('dress_type_bad_combos', () => [], 'array');

export default DressType;
